const routes = require("express").Router();
const summonerRoutes = require("./models/Summoner/http/routes/summoner.routes");
const dragonRoutes = require("./models/DataDragon/http/routes/dragon.routes");

routes.use("/summoner", summonerRoutes);
routes.use("/datadragon", dragonRoutes);

module.exports = routes;
