const app = require("./app");
const cron = require("node-cron");
const Masteries = require("./database/models/Masteries");
const Summoner = require("./database/models/Summoner");
const Matches = require("./database/models/Matches");
require("./database/mongodb");

cron.schedule("*/45 * * * *", () => {
  console.log("Atualização executada!" + new Date());
  Masteries.collection.drop();
  Summoner.collection.drop();
  Matches.collection.drop();
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server online!✅");
});
