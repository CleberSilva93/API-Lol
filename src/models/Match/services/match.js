const {instance} = require("../../../instance.js");

class Match{
    async matchData(matchId){
        try{
            let match = await instance.get(`/match/v4/matches/${matchId}`);
            return match.data;
        }catch(error){
            console.log("an error has occurred: " + error.response.status);
            throw {
                message: error.message,
                status: error.response.status,
            };
        }
    }
}

module.exports = new Match();