const routeDragon = require("express").Router();
const dragonControllers = require("../controllers/DragonControllers");

routeDragon.get("/iconProfile/:profileIconId", dragonControllers.iconProfile);
routeDragon.get("/iconeChampion/:champion", dragonControllers.iconChampion);
routeDragon.get("/splash/mobile/:champion", dragonControllers.splashMobile);
routeDragon.get("/splash/desktop/:champion", dragonControllers.splashDesktop);
routeDragon.get("/ranked-emblems/:tier", dragonControllers.rankedEmblem);
routeDragon.get("/ranked-flags/:tier", dragonControllers.rankedFlag);

module.exports = routeDragon;
