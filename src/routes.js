const routes = require("express").Router();
const invocadorController = require("./controllers/invocadorController");

routes.get("/invocador/:nome", invocadorController.invocador);

module.exports = routes;
