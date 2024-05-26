const express = require("express");
require("dotenv").config();
const app = express();
const router = require("./routes/index.js");
const port = process.env.PORT || 3000;

router(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
