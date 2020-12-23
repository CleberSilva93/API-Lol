const Summoner = require("../../services/summoner");

class SummonerController {
  async summoner(req, res) {
    try {
      const name = req.params.name;
      const summoner = await Summoner.SearchByName(name);
      return res.status(200).json(summoner);
    } catch (error) {
      return res.status(error.status).json({ error: error.message });
    }
  }
}

module.exports = new SummonerController();
