const mongoose = require("mongoose");

export default mongoose.model("Invocador", {
  id: { type: String },
  nome: {
    type: String,
  },
  accountId: { type: String },
  puuid: { type: String },
  profileIconId: { type: Number },
  revisionDate: { type: Date },
  summonerLevel: { type: Number },
});
