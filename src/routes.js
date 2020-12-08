const routes = require("express").Router();
const invocadorRoute = require("./models/Invocador/http/routes/invocador.routes");
const dragonRoutes = require("./models/DataDragon/http/routes/dragon.routes");

routes.use("/invocador", invocadorRoute);
routes.use("/datadragon", dragonRoutes);

module.exports = routes;
