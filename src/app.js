require("dotenv").config({
  path: ".env",
});

const express = require("express");
const cors = require("cors");
const rateLimiterMiddleware = require("./shared/http/middlewares/rateLimiterMiddleware");
const requestIp = require("request-ip");

class AppController {
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(requestIp.mw());
    this.express.use(rateLimiterMiddleware);
  }

  routes() {
    this.express.use(require("./routes"));
  }
}

module.exports = new AppController().express;
