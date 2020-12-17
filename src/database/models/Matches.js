const mongoose = require("mongoose");
module.exports = mongoose.model("Matches", {
  summonerId: { type: String },
  platformId: { type: String },
  gameId: {
    type: Number,
  },
  champion: {
    key: { type: String },
    image: {
      splashDesktop: { type: String },
      splashMobile: { type: String },
      icon: { type: String },
    },
  },
  queue: { type: Number },
  season: { type: Number },
  timestamp: { type: String },
  role: { type: String },
  lane: { type: String },
  data: {
    win: { type: Boolean },
    duration: { type: String },
    kda: { type: String },
  },
});
