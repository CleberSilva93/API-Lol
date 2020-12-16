const app = require("./app");
require("./database/mongodb");

app.listen(process.env.PORT || 3000, () => {
  console.log("Está online!");
});
