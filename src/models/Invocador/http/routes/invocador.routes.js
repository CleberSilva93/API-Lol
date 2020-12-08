const invocadorRouter = require("express").Router();
const invocadorController = require("../controllers/invocadorController");

invocadorRouter.get("/:nome", invocadorController.invocador);

module.exports = invocadorRouter;
