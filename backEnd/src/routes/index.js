const user = require("./user");

const router = (app) => {
  app.use("/", user);
};

module.exports = router;
