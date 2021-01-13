const cron = require("node-cron");
const Masteries = require("./../../models/Summoner/schema/Masteries");
const Summoner = require("./../../models/Summoner/schema/Summoner");
const Matches = require("./../../models/Summoner/schema/Matches");
require("./../../database/mongodb");

const resetData = cron.schedule("*/45 * * * *", () => {
  console.log("Atualização executada!" + new Date());
  Masteries.collection.drop();
  Summoner.collection.drop();
  Matches.collection.drop();
});

module.exports = resetData;
