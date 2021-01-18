const Match = require('../../services/match');

class MatchController{
    async match(req,res){
        try{
            const matchId = req.params.matchId;
            const match = await Match.matchData(matchId);
            return res.status(200).json(match);
        }catch(error) {
            return res.status(error.status).json({ error: error.message });
        }
    }
}

module.exports = new MatchController();