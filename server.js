var express = require("express");
var cors = require("cors");

var app = express();

app.use(express.json());

app.use(cors());

app.listen(3000, () => {
  console.log("Servidor online!");
});
