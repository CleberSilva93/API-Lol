const mongoose = require("mongoose");
module.exports = mongoose.model("Partidas", {
  idInvocador: { type: String },
  platformId: { type: String },
  gameId: {
    type: Number,
  },
  champion: {
    key: { type: String },
    imagem: {
      splashDesktop: { type: String },
      splashMobile: { type: String },
      icone: { type: String },
    },
  },
  queue: { type: Number },
  season: { type: Number },
  timestamp: { type: String },
  role: { type: String },
  lane: { type: String },
  dados: {
    win: { type: Boolean },
    duration: { type: String },
    kda: { type: String },
  },
});
