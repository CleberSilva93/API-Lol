require("dotenv").config({
  path: ".env",
});
const express = require("express");
const cors = require("cors");
const rateLimiterMiddleware = require("./shared/http/middlewares/rateLimiterMiddleware");
const resetData = require("./shared/utils/resetData");
const requestIp = require("request-ip");
require("./database/mongodb");
class AppController {
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
    this.resetData = resetData;
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(requestIp.mw());
    this.express.use(rateLimiterMiddleware);
  }

  routes() {
    this.express.use(require("./shared/http/routes/routes"));
  }
}

module.exports = new AppController().express;
