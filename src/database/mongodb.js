const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Banco de dados conectado");
  }
);
