const Orders = require("../models/order")
const Discounts = require("../models/discount");
const Payments = require("../models/payment");
const Users = require("../models/user");
const Ratings = require("../models/comment");

const OrderItems = require("../models/orderItem");
const { checkDiscountValidity } = require("../services/discountService");
const moment = require('moment');
const crypto = require('crypto');
const querystring = require('qs');
const sendEmail = require("../config/mail");
const orderItem = require("../models/orderItem");
const { log } = require("console");
require("dotenv").config();

const getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, order_id } = req.query;

    let filter = {};

    if (order_id) {
      filter._id = order_id;
    }
  
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const [orders, totalCount] = await Promise.all([
      Orders.find(filter)
        .skip(skip)
        .limit(limitNumber)
        .sort({ createdAt: -1 }),
      Orders.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    res
      .status(200)
      .json({ status: true, orders, totalPages, currentPage: pageNumber });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
const getAllOrdersTrash = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const orders = await Orders.findWithDeleted({})
      .skip(skip)
      .limit(limitNumber)
      .sort({ createdAt: -1 })


    let newOrders = orders.filter((item) => item.deleted === true);

    const totalPages = Math.ceil(newOrders.length / limit);

    res
      .status(200)
      .json({ status: true, orders: newOrders, totalPages, currentPage: pageNumber });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Order id is required" });
    }

    const order = await Orders.findById(id);

    if (!order) {
      return res
        .status(404)
        .json({ status: false, message: "Order not found" });
    }

    res.status(200).json({ status: true, order });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getOrderByUserId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Id is required" });
    }

    const orders = await Orders.find({
      user_id: id
    });

    res.status(200).json({ status: true, orders });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getOrderDetialById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Order id is required" });
    }

    const orderDetails = await orderItem.find({
      order_id: id
    }).populate({ path: "variant_id", populate: { path: "color size" } })

    return res.status(200).json({ status: true, orderDetails });

  } catch (error) {

  }
}
const createOrder = async (req, res) => {
  try {
    let { user_id, name, email, address, phone, discount, delivery, note, total_payment, carts = [] } = req.body;

    if (discount) {
      const checkDiscount = await checkDiscountValidity(discount, req?.user?._id);

      if (!checkDiscount.status) {
        return res.status(400).json({ status: false, message: checkDiscount.message })
      }
    }

    if (!user_id) {
      const checkEmail = await Users.findOne({ email });

      if (checkEmail) {
        return res.status(400).json({ status: false, message: "Email này đã tồn tại trên hệ thống của cửa hàng." });
      }

      const newUser = await Users.create({
        firstName: name,
        lastName: name,
        userName: name,
        email,
        phone,
      });

      user_id = newUser._id;
    }

    const [updatedDiscount, newOrder] = await Promise.all([Discounts.findOneAndUpdate({ code: discount }, {
      $push: { usedBy: user_id },
      $inc: { quantity: -1 },
    }, { new: true }), Orders.create({
      user_id,
      receiver: {
        name,
        phone,
        address,
        email
      },
      discount,
      delivery,
      note,
      discount,
      total_payment: +total_payment
    })])

    await Promise.all(carts.map(async (element) => {
      await OrderItems.create({
        order_id: newOrder._id,
        variant_id: element.variant_id._id,
        quantity: element.quantity,
        price: element.variant_id.price,
        sale: element.variant_id.sale,
      });
    }))

    return res.status(200).json({ status: true, data: newOrder });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
const updateOrder = async (req, res) => {
  try {
    const id = req.params.id;

    const order = await Orders.findById({ _id: id });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const updatedOrder = await Orders.findByIdAndUpdate({ _id: id }, req.body, { new: true });

    return res.status(200).json({ status: true, data: updatedOrder, message: "Order updated successfully" });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
const deleteSoftOrders = async (req, res) => {
  try {
    const ids = req.body;

    if (ids.length === 0) {
      return res
        .status(400)
        .json({ status: false, message: "Product ids is required" });
    }

    const deletedOrders = await Orders.delete({ _id: { $in: ids } });

    if (deletedOrders) {
      return res
        .status(200)
        .json({ status: true, message: "Order deleted successfully" });

    } else {
      return res
        .status(400)
        .json({ status: false, message: "Failed to delete Order" });
    }

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
const deleteSoftOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ status: false, message: "Order id is required" });
    }

    const order = await Orders.delete({ _id: id });

    if (!order) {
      return res
        .status(404)
        .json({ status: false, message: "Order not found" });
    }

    return res
      .status(200)
      .json({ status: true, message: "Order deleted successfully" });


  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
const destroyOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ status: false, message: "Order id is required" });
    }

    const order = await Orders.deleteOne({ _id: id });

    if (!order) {
      return res
        .status(404)
        .json({ status: false, message: "Order not found" });
    }

    return res
      .status(200)
      .json({ status: true, message: "Order deleted successfully" });


  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
const restoreOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ status: false, message: "Order id is required" });
    }

    const order = await Orders.restore({ _id: id });

    if (!order) {
      return res
        .status(404)
        .json({ status: false, message: "Order not found" });
    }

    return res
      .status(200)
      .json({ status: true, message: "Order restored successfully" });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
const checkRatingOrderStatus = async (req, res) => {
  try {
    const { user_id, variant_id } = req.body;

    if (!user_id || !variant_id) {
      return res.status(400).json({ status: false, message: "User id and variant id are required" });
    }

    const [orders, ratings] = await Promise.all([Orders.find({
      user_id,
      status: { $in: ["Delivered", "Completed"] }
    }), Ratings.find({ variant_id })]);

    let newRatings = ratings.flatMap((rating) => {
      return rating.comments
    })

    let checkUserRating = newRatings.find(rating => rating.user_id.toString() === user_id.toString());

    if (orders.length === 0) {
      return res.status(200).json({ status: false });
    }

    const orderIds = orders.map(order => order._id);

    // Tìm OrderItem với variant_id và order_id trong danh sách orderIds
    const data = await OrderItems.findOne({
      variant_id,
      order_id: { $in: orderIds }
    });

    if (!data) {
      return res.status(200).json({ status: false });
    }

    if (!checkUserRating && data) {
      return res.status(200).json({ status: true });
    } else {
      return res.status(200).json({ status: false });
    }

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
const verificationOrder = async (req, res) => {
  try {
    const id = req.params.id;

    const order = await Orders.findByIdAndUpdate({ _id: id }, { status: 'Confirmed' }, { new: true });

    const emailSubject = "Chi tiết đơn hàng và lời cảm ơn từ Your Company";
    const emailText = "";

    const emailHTML = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">
          <div style="background-color: #4CAF50; color: white; padding: 20px;">
            <h2 style="margin: 0;">Chi tiết đơn hàng và lời cảm ơn</h2>
          </div>
          <div style="padding: 20px;">
            <p>Kính chào ${order.receiver.name},</p>
            <p>Cảm ơn bạn đã đặt hàng tại Your Company. Dưới đây là thông tin chi tiết đơn hàng của bạn:</p>
            <h3 style="color: #4CAF50;">Chi tiết đơn hàng:</h3>
            <ul style="list-style: none; padding: 0;">
              <li><strong>Mã đơn hàng:</strong> ${order._id}</li>
              <li><strong>Ngày đặt hàng:</strong> ${new Date(order.createdAt).toLocaleDateString()}</li>
              <li><strong>Trạng thái:</strong> ${order.status}</li>
              <li><strong>Trạng thái thanh toán:</strong> ${order.status_payment}</li>
              <li><strong>Phương thức giao hàng:</strong> ${order.delivery}</li>
              <li><strong>Tổng tiền thanh toán:</strong> ${order.total_payment.toLocaleString('vi-VN')} VND</li>
            </ul>
            <h3 style="color: #4CAF50;">Thông tin người gửi:</h3>
            <ul style="list-style: none; padding: 0;">
              <li><strong>Tên:</strong> ${order.sender.name}</li>
              <li><strong>Số điện thoại:</strong> ${order.sender.phone}</li>
              <li><strong>Địa chỉ:</strong> ${order.sender.address}</li>
              <li><strong>Email:</strong> ${order.sender.email}</li>
            </ul>
            <h3 style="color: #4CAF50;">Thông tin người nhận:</h3>
            <ul style="list-style: none; padding: 0;">
              <li><strong>Tên:</strong> ${order.receiver.name}</li>
              <li><strong>Số điện thoại:</strong> ${order.receiver.phone}</li>
              <li><strong>Địa chỉ:</strong> ${order.receiver.address}</li>
              <li><strong>Email:</strong> ${order.receiver.email}</li>
            </ul>
            <p>Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi.</p>
            <p>Trân trọng,</p>
            <p>Your Company</p>
          </div>
          <div style="background-color: #f9f9f9; padding: 10px 20px; text-align: center; border-top: 1px solid #ddd;">
            <p style="margin: 0; font-size: 12px; color: #777;">© 2024 Your Company. All rights reserved.</p>
          </div>
        </div>
      </div>
    `;

    await sendEmail(order.receiver.email, emailSubject, emailText, emailHTML);

    return res.redirect(process.env.URL_CLIENT);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
const sendEmailToUser = async (req, res) => {
  try {
    const data = req.body;

    if (!data) {
      return res.status(400).json({ message: "Data is required" });
    }

    const emailSubject = data.status === 'Pending' ? "Xác nhận đơn hàng từ Your Company" : "Chi tiết đơn hàng và lời cảm ơn từ Your Company";
    const emailText = "";

    const confirmationButton = data.status === 'Pending' ? `
      <a href="${process.env.URL_ADMIN}/api/order/${data._id}/verificationorder" style="display: inline-block; padding: 10px 20px; color: white; background-color: #4CAF50; text-decoration: none; border-radius: 5px; margin-top: 20px;">
        Xác nhận đơn hàng
      </a>
    ` : '';

    const emailHTML = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">
          <div style="background-color: #4CAF50; color: white; padding: 20px;">
            <h2 style="margin: 0;">${data.status === 'Pending' ? 'Xác nhận đơn hàng' : 'Chi tiết đơn hàng và lời cảm ơn'}</h2>
          </div>
          <div style="padding: 20px;">
            <p>Kính chào ${data.receiver.name},</p>
            <p>Cảm ơn bạn đã đặt hàng tại Your Company. Dưới đây là thông tin chi tiết đơn hàng của bạn:</p>
            <h3 style="color: #4CAF50;">Chi tiết đơn hàng:</h3>
            <ul style="list-style: none; padding: 0;">
              <li><strong>Mã đơn hàng:</strong> ${data._id}</li>
              <li><strong>Ngày đặt hàng:</strong> ${new Date(data.createdAt).toLocaleDateString()}</li>
              <li><strong>Trạng thái:</strong> ${data.status}</li>
              <li><strong>Trạng thái thanh toán:</strong> ${data.status_payment}</li>
              <li><strong>Phương thức giao hàng:</strong> ${data.delivery}</li>
              <li><strong>Tổng tiền thanh toán:</strong> ${data.total_payment.toLocaleString('vi-VN')} VND</li>
            </ul>
            <h3 style="color: #4CAF50;">Thông tin người gửi:</h3>
            <ul style="list-style: none; padding: 0;">
              <li><strong>Tên:</strong> ${data.sender.name}</li>
              <li><strong>Số điện thoại:</strong> ${data.sender.phone}</li>
              <li><strong>Địa chỉ:</strong> ${data.sender.address}</li>
              <li><strong>Email:</strong> ${data.sender.email}</li>
            </ul>
            <h3 style="color: #4CAF50;">Thông tin người nhận:</h3>
            <ul style="list-style: none; padding: 0;">
              <li><strong>Tên:</strong> ${data.receiver.name}</li>
              <li><strong>Số điện thoại:</strong> ${data.receiver.phone}</li>
              <li><strong>Địa chỉ:</strong> ${data.receiver.address}</li>
              <li><strong>Email:</strong> ${data.receiver.email}</li>
            </ul>
            ${confirmationButton}
            <p>Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi.</p>
            <p>Trân trọng,</p>
            <p>Your Company</p>
          </div>
          <div style="background-color: #f9f9f9; padding: 10px 20px; text-align: center; border-top: 1px solid #ddd;">
            <p style="margin: 0; font-size: 12px; color: #777;">© 2024 Your Company. All rights reserved.</p>
          </div>
        </div>
      </div>
    `;

    await sendEmail(data.receiver.email, emailSubject, emailText, emailHTML);

    return res.status(200).json({ status: true, message: "Email sent successfully" });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
const createPaymentUrlVnPay = async (req, res) => {
  try {

    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');

    let ipAddr = req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    let tmnCode = process.env.VNP_TMNCODE;
    let secretKey = process.env.VNP_HASHSERCET;
    let vnpUrl = process.env.VNP_URL;
    let returnUrl = process.env.VNP_RETURNURL;

    let orderId = req.body.order_id;
    let amount = req.body.total_payment;
    let bankCode = "";

    let locale = null;
    if (locale === null || locale === '') {
      locale = 'vn';
    }
    let currCode = 'VND';
    let vnp_Params = {};

    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    vnp_Params['vnp_ExpireDate'] = moment().add(15, 'minutes').format('YYYYMMDDHHmmss');

    if (bankCode !== null && bankCode !== '') {
      vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    res.json({ paymentUrl: vnpUrl });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
const resultPayment = async (req, res) => {
  try {
    let vnp_Params = req.query;

    let secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    let tmnCode = process.env.VNP_TMNCODE;
    let secretKey = process.env.VNP_HASHSERCET;

    let signData = querystring.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");

    if (secureHash === signed) {

      if (vnp_Params['vnp_ResponseCode'] === '00') {

        const paymentInfo = new Payments({
          orderId: vnp_Params['vnp_TxnRef'],
          amount: vnp_Params['vnp_Amount'],
          bankCode: vnp_Params['vnp_BankCode'],
          transactionNo: vnp_Params['vnp_TransactionNo'],
          responseCode: vnp_Params['vnp_ResponseCode'],
          transactionStatus: vnp_Params['vnp_TransactionStatus'],
          payDate: vnp_Params['vnp_PayDate'],
          paymentMethod: 'VNPay', // Thêm trường phân biệt phương thức thanh toán
          additionalInfo: {
            cardType: vnp_Params['vnp_CardType'],
            orderInfo: vnp_Params['vnp_OrderInfo'],
            tmnCode: vnp_Params['vnp_TmnCode']
          }
        });

        await paymentInfo.save();

        res.redirect(process.env.URL_CLIENT + '/thanks?orderId=' + vnp_Params['vnp_TxnRef'] + '&paymentStatus=' + vnp_Params['vnp_ResponseCode']);
      } else {
        res.redirect(process.env.URL_CLIENT + '/thanks?orderId=' + vnp_Params['vnp_TxnRef']);
      }
    } else {
      res.redirect(process.env.URL_CLIENT + '/thanks?orderId=' + vnp_Params['vnp_TxnRef']);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}
const getAllOrdersStatistic = async (req, res) => {
  try {

    const { page = 1, limit = 10, status, startDate, endDate } = req.query;

    const filter = {}

    if (status && status !== 'all') {
      filter.status = status
    }

    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    } else if (startDate && !endDate) {
      filter.createdAt = {
        $gte: new Date(startDate)
      }
    } else if (!startDate && endDate) {
      filter.createdAt = {
        $lte: new Date(endDate)
      }
    }

    let skip = (page - 1) * limit;

    const orders = await Orders.findWithDeleted(filter).skip(skip).limit(limit).sort({ createdAt: 1 });

    const totalRecords = await Orders.countDocumentsWithDeleted(filter)

    const totalPages = Math.ceil(totalRecords / limit);

    return res.status(200).json({ status: true, orders, totalPages, currentPage: page });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
const statisticsBestSeller = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    // Find orders with Delivered or Completed status
    const orderSuccess = await Orders.findWithDeleted({
      $or: [{ status: "Delivered" }, { status: "Completed" }]
    });

    // Extract the order IDs
    const newOrderSuccess = orderSuccess.map((order) => order._id);

    // Find order items for each successful order
    let orderItems = await Promise.all(
      newOrderSuccess.map(async (order) => {
        return orderItem.find({ order_id: order }).populate({ path: "variant_id", populate: { path: "product_id" } });
      })
    );

    // Flatten the array of arrays
    orderItems = orderItems.flat();

    const bestSellers = orderItems.reduce((acc, item) => {
      const { variant_id, quantity } = item;
      if (!acc[variant_id]) {
        acc[variant_id] = { variant_id, totalQuantity: 0 };
      }
      acc[variant_id].totalQuantity += quantity;
      return acc;
    }, {});

    // Convert the object to an array and sort by totalQuantity
    const sortedBestSellers = Object.values(bestSellers).sort((a, b) => b.totalQuantity - a.totalQuantity);

    let newData = sortedBestSellers.filter(item => item.variant_id !== null).map((item, index) => {
      return item.variant_id
    }).slice(0, limit)

    return res.status(200).json({ status: true, variants: newData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const statisticsQuantityOrdersByDay = async (req, res) => {
  const startOfMonth = moment().startOf('month').toDate();
  const endOfMonth = moment().endOf('month').toDate();

  try {
    const orders = await Orders.aggregate([
      { $match: { createdAt: { $gte: startOfMonth, $lte: endOfMonth } } },
      {
        $group: {
          _id: { $dayOfMonth: "$createdAt" },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const orderData = Array.from({ length: moment().daysInMonth() }, (_, i) => {
      const day = i + 1;
      const dayOrder = orders.find(o => o._id === day);
      return dayOrder ? dayOrder.count : 0;
    });

    res.json(orderData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching order data' });
  }
}
const statisticsRevenuesOrdersByDay = async (req, res) => {
  const startOfMonth = moment().startOf('month').toDate();
  const endOfMonth = moment().endOf('month').toDate();

  try {
    const revenues = await Orders.aggregate([
      { $match: { createdAt: { $gte: startOfMonth, $lte: endOfMonth } } },
      {
        $group: {
          _id: { $dayOfMonth: "$createdAt" },
          totalRevenue: { $sum: "$total_payment" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const revenueData = Array.from({ length: moment().daysInMonth() }, (_, i) => {
      const day = i + 1;
      const dayRevenue = revenues.find(r => r._id === day);
      return dayRevenue ? dayRevenue.totalRevenue : 0;
    });

    res.json(revenueData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching revenue data' });
  }
}
const countOrder = async (req, res) => {
  try {

    const count = await Orders.countDocumentsWithDeleted();

    return res.status(200).json(count);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
const totalPaymentSuccessOrder = async (req, res) => {
  try {
    const orderSuccess = await Orders.findWithDeleted({ $or: [{ status: "Delivered" }, { status: "Completed" }] });

    const totalPaymentSuccess = orderSuccess.reduce((total, order) => total + order.total_payment, 0);

    return res.status(200).json(totalPaymentSuccess);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createOrder,
  createPaymentUrlVnPay,
  resultPayment,
  updateOrder,
  sendEmailToUser,
  verificationOrder,
  getAllOrders,
  getOrderById,
  getOrderByUserId,
  getOrderDetialById,
  deleteSoftOrder,
  deleteSoftOrders,
  checkRatingOrderStatus,
  getAllOrdersTrash,
  destroyOrder,
  restoreOrder,
  getAllOrdersStatistic,
  statisticsQuantityOrdersByDay,
  statisticsRevenuesOrdersByDay,
  countOrder,
  totalPaymentSuccessOrder,
  statisticsBestSeller
};
