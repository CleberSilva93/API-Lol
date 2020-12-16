const routeDragon = require("express").Router();
const DragonControllers = require("../controllers/DragonControllers");

routeDragon.get("/iconePerfil/:profileIconId", DragonControllers.iconeperfil);
routeDragon.get("/iconeChampion/:champion", DragonControllers.iconeChampion);
routeDragon.get("/splash/mobile/:champion", DragonControllers.splashMobile);
routeDragon.get("/splash/desktop/:champion", DragonControllers.splashDesktop);
routeDragon.get("/ranked-emblems/:tier", DragonControllers.rankedEmblem);
routeDragon.get("/ranked-flags/:tier", DragonControllers.rankedFlag);

module.exports = routeDragon;
