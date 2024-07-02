const configCors = (app) => {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.URL_CLIENT);
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT,PATCH, DELETE, OPTIONS, "
    );

    res.header("Access-Control-Allow-Credentials", true);
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
    );

    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }

    next();
  });
};

module.exports = configCors;