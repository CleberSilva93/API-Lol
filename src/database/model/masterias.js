const mongoose = require("mongoose");

module.exports = mongoose.model("Masterias", {
  idInvocador: { type: String },
  championId: {
    type: Number,
  },
  championLevel: { type: Number },
  lastPlayTime: { type: Number },
  championPointsSinceLastLevel: { type: Number },
  championPointsUntilNextLevel: { type: Number },
  chestGranted: { type: Boolean },
  tokensEarned: { type: Number },
  summonerId: { type: String },
});
