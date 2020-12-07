const routes = require("express").Router();
const invocadorController = require("./controllers/invocadorController");
const path = require('path');
const request = require('request');

routes.get("/invocador/:nome", invocadorController.invocador);

routes.get("/iconePerfil/:profileIconId", function(req, res){
    res.set('Content-Type', 'image/png');
    res.sendFile(path.resolve(`src/assets/dragontail-10.24.1/10.24.1/img/profileicon/${req.params.profileIconId}.png`));
});



module.exports = routes;
