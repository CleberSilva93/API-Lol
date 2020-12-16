const { Mongoose } = require("mongoose");

require("./invocador");

const invocador = Mongoose.model("invocador");

var invador = new invocador();
