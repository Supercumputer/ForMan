const Discounts = require("../models/discount");
const checkDiscountValidity = async (discountCode, userId = null) => {

  const checkDiscount = await Discounts.findOne({ code: discountCode });

  if (!checkDiscount) {
    return { status: false, message: "Discount not found" };
  }

  const now = new Date();

  if (now > checkDiscount.validTo && checkDiscount.quantity > 0) {
    return { status: false, message: "Discount đã hết hạn sử dụng." };
  }

  if (checkDiscount.status === "InActive") {
    return { status: false, message: "Discount chưa được kích hoạt." };
  }

  if (checkDiscount.quantity <= 0 && now <= checkDiscount.validTo) {
    return { status: false, message: "Discount đã hết số lượng." };
  }

  if (userId && checkDiscount.usedBy.includes(userId)) {
    return { status: false, message: "Bạn đã sử dụng discount này." };
  }

  return { status: true, discount: checkDiscount };
};

const updateDiscounts = async () => {

  const ListDiscounts = await Discounts.find({});

  const now = new Date();

  ListDiscounts.forEach(async (discount) => {

    if (now > discount.validTo && discount.quantity > 0) {
      discount.status = "Expired";
    } else if (discount.quantity <= 0 && now <= discount.validTo) {
      discount.status = "Inactive";
    } else if (discount.quantity > 0 && now <= discount.validTo) {
      if (discount.usedBy.length > 0) {
        discount.status = "Used";
      } else {
        discount.status = "Active";
      }
    }

    await discount.save();
  });

}

module.exports = { checkDiscountValidity, updateDiscounts };