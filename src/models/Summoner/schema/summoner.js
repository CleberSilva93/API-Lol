const mongoose = require("mongoose");

export default mongoose.model("Summoner", {
  id: { type: String },
  name: {
    type: String,
  },
  accountId: { type: String },
  puuid: { type: String },
  profileIconId: { type: Number },
  revisionDate: { type: Date },
  summonerLevel: { type: Number },
});
