const Carts = require("../models/cart");
const Variants = require("../models/variant");
const { io } = require("../config/socket.io");
const upsertCart = async (req, res) => {
  try {
    const { user_id, variant_id, quantity } = req.body;

    if (!user_id || !variant_id || !quantity) {
      return res
        .status(400)
        .json({ status: false, message: "Please fill in all fields" });
    }

    const variantById = await Variants.findById({ _id: variant_id });

    if (!variantById) {
      return res
        .status(404)
        .json({ status: false, message: "Variant not found" });
    }

    if (variantById.quantity < quantity) {
      return res
        .status(400)
        .json({ status: false, message: "Quantity is not available" });
    }

    const checkCart = await Carts.findOne({ user_id, variant_id });

    if (checkCart) {
      await Carts.findOneAndUpdate(
        { user_id, variant_id },
        { quantity: checkCart.quantity + quantity }
      );
    } else {
      await Carts.create({ user_id, variant_id, quantity });
    }

    variantById.quantity -= quantity;
    await variantById.save();

    io.emit("updateCart");

    return res
      .status(200)
      .json({ status: true, message: "Cart updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const upDateQuantity = async (req, res) => {
  try {
    const { user_id, variant_id, quantity } = req.body;

    const variant = await Variants.findById({ _id: variant_id });

    if (!variant) {
      return res.status(404).json({ message: "Variant not found" });
    }

    const cart = await Carts.findOne({ user_id, variant_id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    if (cart.quantity < quantity) {
      variant.quantity -= quantity - cart.quantity;
    } else {
      variant.quantity += cart.quantity - quantity;
    }

    await Promise.all([
      Carts.findOneAndUpdate({ user_id, variant_id }, { quantity }),
      variant.save(),
    ]);

    io.emit("updateCart");

    return res
      .status(200)
      .json({ status: true, message: "Cart updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteCart = async (req, res) => {
  try {
    const { user_id, variant_id, quantity } = req.body;

    const variant = await Variants.findById({ _id: variant_id });

    if (!variant) {
      return res.status(404).json({ message: "Variant not found" });
    }

    // Tăng số lượng sản phẩm
    variant.quantity += quantity;

    await variant.save();

    // Xóa sản phẩm khỏi giỏ hàng của người dùng
    const cart = await Carts.findOneAndDelete({ user_id, variant_id });

    if (!cart) {
      return res.status(404).json({ status: false, message: "Cart not found" });
    }
    io.emit("updateCart");
    return res
      .status(200)
      .json({ status: true, message: "Cart deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCartByUserId = async (req, res) => {
  try {
    const user_id = req.query.user_id;

    if (!user_id) {
      return res
        .status(400)
        .json({ status: false, message: "Please fill in all fields" });
    }

    const carts = await Carts.find({ user_id }).populate({
      path: "variant_id",
      populate: [{ path: "product_id" }, { path: "color" }, { path: "size" }],
    });

    return res.status(200).json({ status: true, carts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const mergeCart = async (req, res) => {
  try {
    const { user_id, data } = req.body;

    data.forEach(async (element) => {
      const checkCart = await Carts.findOne({
        user_id,
        variant_id: element.variant_id._id,
      });

      const checkQuantity = await Variants.findOne({
        _id: element.variant_id._id,
      });

      let quantity = element.quantity;

      if (checkQuantity.quantity < element.quantity) {
        quantity = checkQuantity.quantity;
      }

      if (checkCart) {
        await Carts.findOneAndUpdate(
          { user_id, variant_id: element.variant_id._id },
          { quantity: checkCart.quantity + quantity }
        );
      } else {
        await Carts.create({
          user_id,
          variant_id: element.variant_id._id,
          quantity: quantity,
        });
      }

      checkQuantity.quantity -= quantity;
      await checkQuantity.save();
    });

    io.emit("updateCart");

    return res
      .status(200)
      .json({ status: true, message: "Cart merged successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const checkInventory = async (req, res) => {
  try {
    const data = req.body;

    let check = false;

    const result = await Promise.all(
      data.map(async (element) => {
        const checkQuantity = await Variants.findOne({
          _id: element.variant_id._id,
        });

        let quantity = element.quantity;

        if (checkQuantity.quantity < element.quantity) {
          quantity = checkQuantity.quantity;
          check = true;
        }

        return { ...element, quantity };
      })
    );

    return res.status(200).json({ status: true, result, check });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteAllCartByUserId = async (req, res) => {
  try {
    const user_id = req.params.id

    await Carts.deleteMany({ user_id: user_id })

    return res.status(200).json({ status: true, message: "Delete cart success" })

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

module.exports = {
  upsertCart,
  getCartByUserId,
  upDateQuantity,
  deleteCart,
  mergeCart,
  checkInventory,
  deleteAllCartByUserId
};
