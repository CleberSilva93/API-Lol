const routes = require("express").Router();
const invocadorController = require("./controllers/invocadorController");
const path = require('path');
const request = require('request');

routes.get("/invocador/:nome", invocadorController.invocador);

routes.get("/iconePerfil/:profileIconId", function(req, res){
    res.set('Content-Type', 'image/png');
    res.sendFile(path.resolve(`src/assets/dragontail-10.24.1/10.24.1/img/profileicon/${req.params.profileIconId}.png`));
});

routes.get("/iconeChampion/:champion", function(req, res){
    res.set('Content-Type', 'image/png');
    res.sendFile(path.resolve(`src/assets/dragontail-10.24.1/10.24.1/img/champion/${req.params.champion}.png`));
});

routes.get("/splash/desktop/:champion", function (req, res){
    res.set('Content-Type', 'image/jpg');
    res.sendFile(path.resolve(`src/assets/dragontail-10.24.1/img/champion/splash/${req.params.champion}_0_desktop.jpg`));
});

routes.get("/splash/mobile/:champion", function (req, res){
    res.set('Content-Type', 'image/jpg');
    res.sendFile(path.resolve(`src/assets/dragontail-10.24.1/img/champion/splash/${req.params.champion}_0_mobile.jpg`));
});


module.exports = routes;
