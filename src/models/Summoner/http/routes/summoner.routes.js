const summonerRouter = require("express").Router();
const summonerController = require("../controllers/summonerController");

summonerRouter.get("/:name", summonerController.summoner);

module.exports = summonerRouter;
