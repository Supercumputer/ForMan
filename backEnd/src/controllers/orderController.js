const Orders = require("../models/Order");
const Users = require("../models/user");
const OrderItems = require("../models/orderItem");
const getAllOrder = async (req, res) => {
  try {
    const Orders = await Orders.find({});

    res.status(200).json({ status: true, Orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Order id is required" });
    }

    const Order = await Orders.findById(id);

    if (!Order) {
      return res
        .status(404)
        .json({ status: false, message: "Order not found" });
    }

    res.status(200).json({ status: true, Order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createOrder = async (req, res) => {
  try {
    const {
      user_id = null,
      discount,
      delivery,
      email,
      phone,
      address,
      name,
      total,
      total_payment,
    } = req.body;

    if (
      !discount ||
      !total_payment ||
      !email ||
      !phone ||
      !address ||
      !name ||
      !total
    ) {
      return res
        .status(400)
        .json({ status: false, message: "Please fill in all fields" });
    }

    let userData = null;

    if (!user_id) {

      const checkEmail = await Users.findOne({ email: email });

      if (checkEmail) {
        return res
          .status(400)
          .json({ status: false, message: "Email already exists" });
      }

      const user = {
        userName: "@" + name,
        firstName: name,
        lastName: name,
        email: email,
        phone: phone,
        address: address,
        password: 12345678,
      };

      userData = await Users.create(user);
    } else {
      userData = await Users.findById({ _id: user_id });
    }

    const order = {
      user_id: userData._id,
      receiver: {
        receiver_name: name,
        receiver_phone: phone,
        receiver_address: address,
        receiver_email: email,
      },
      total: total,
      delivery: delivery,
      discount: discount,
      total_payment: total_payment,
    };

    const newOrder = await OrderItems.create({});

    const newOrderItem = ""
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Order id is required" });
    }

    const { OrderName } = req.body;

    if (!OrderName) {
      return res
        .status(400)
        .json({ status: false, message: "Please fill in all fields" });
    }

    const existingOrder = await Orders.findOne({ _id: id });

    if (!existingOrder) {
      return res
        .status(404)
        .json({ status: false, message: "Order not found" });
    }

    const updatedOrder = await Orders.updateOne(
      {
        _id: id,
      },
      { ...req.body, logo: req.file?.path || existingOrder.logo },
      { new: true }
    );

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ status: false, message: "Order not found" });
    }

    res
      .status(200)
      .json({ status: true, message: "Order updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ status: false, message: "Order id is required" });
    }

    const deletedOrder = await Orders.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res
        .status(404)
        .json({ status: false, message: "Order not found" });
    }

    res
      .status(200)
      .json({ status: true, message: "Order deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const deleteOrders = async (req, res) => {
  try {
    const ids = req.body;

    if (ids.length === 0) {
      return res
        .status(400)
        .json({ status: false, message: "Order ids is required" });
    }

    const deletedOrders = await Orders.deleteMany({ _id: { $in: ids } });

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
};

module.exports = {
  createOrder,
};
