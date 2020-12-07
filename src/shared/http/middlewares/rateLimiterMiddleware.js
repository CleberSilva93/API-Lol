const { RateLimiterMemory } = require("rate-limiter-flexible");

const opts = {
  duration: 1,
  points: 5,
};

const rateLimiter = new RateLimiterMemory(opts);

const rateLimiterMiddleware = (req, res, next) => {
  rateLimiter
    .consume(req.clientIp)
    .then(() => {
      console.log(req.clientIp);
      next();
    })
    .catch(() => {
      res.status(429).send("Too Many Requests");
    });
};

module.exports = rateLimiterMiddleware;
