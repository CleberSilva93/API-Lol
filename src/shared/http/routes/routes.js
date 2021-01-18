const routes = require("express").Router();
const summonerRoutes = require("../../../models/Summoner/http/routes/summoner.routes");
const dragonRoutes = require("../../../models/DataDragon/http/routes/dragon.routes");
const matchRoutes = require("../../../models/Match/http/routes/match.routes");

routes.use("/summoner", summonerRoutes);
routes.use("/datadragon", dragonRoutes);
routes.use("/match", matchRoutes);

module.exports = routes;
