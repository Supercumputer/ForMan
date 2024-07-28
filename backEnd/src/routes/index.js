const auth = require("./auth");
const user = require("./user");
const role = require("./role");
const groupRole = require("./groupRole");
const category = require("./category");
const brand = require("./brand");
const product = require("./product");
const variant = require("./variant");
const comment = require("./comment");
const discount = require("./discount");
const size = require("./size");
const color = require("./color");
const order = require("./order");
const cart = require("./cart");
const address = require("./address");

const router = (app) => {
  app.use("/api/auth", auth);
  app.use("/api/role", role);
  app.use("/api/grouprole", groupRole);
  app.use("/api/user", user);
  app.use("/api/category", category);
  app.use("/api/brand", brand);
  app.use("/api/product", product);
  app.use("/api/variant", variant);
  app.use("/api/comment", comment);
  app.use("/api/discount", discount);
  app.use("/api/order", order);
  app.use("/api/size", size);
  app.use("/api/color", color);
  app.use("/api/color", color);
  app.use("/api/cart", cart);
  app.use("/api/address", address);
};
module.exports = router;
