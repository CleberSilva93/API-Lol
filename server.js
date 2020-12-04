var customExpress = require("./config/customExpress");
var cors = require("cors");
require('dotenv').config();

var app = customExpress();

app.use(cors());

app.listen(3000, () => {
  console.log("Servidor online!");
});
