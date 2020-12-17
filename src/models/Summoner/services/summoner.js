require("dotenv").config({
  path: ".env",
});
// const invocador = require("../controllers/invocadorController");
const makeMinutes = require("../../../shared/utils/makeMinutes");
const champions = require("../../../assets/champions.json");
const modelSummoner = require("../../../database/models/Summoner");

const modelMatches = require("../../../database/models/Matches");

const modelMasterias = require("../../../database/models/Masterias");

const axios = require("axios");
const devKey = process.env.DEV_KEY;
const instance = axios.create({
  baseURL: "https://br1.api.riotgames.com/lol",
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
    "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    "X-Riot-Token": devKey,
  },
});
class Summoner {
  async championImages(Matches) {
    await Object.entries(Matches).map((match) => {
      let champ = champions.find(
        (champion) => parseInt(champion.key) === match[1].champion
      );
      match[1].champion = champ;
    });
  }

  async dataSummoner(summoner) {
    try {
      let data = [];
      let winRate = 0;
      let matches = await instance.get(
        `/match/v4/matchlists/by-account/${summoner.accountId}?endIndex=10`
      );

      for (let match of matches.data.matches) {
        let game = await instance.get(`/match/v4/matches/${match.gameId}`);
        let dataParticipants = game.data.participantIdentities.find(
          (participant) => participant.player.summonerName === summoner.name
        );

        let dataParticipant = game.data.participants.find(
          (participant) =>
            participant.participantId === dataParticipants.participantId
        );

        let dateGame = new Date(game.data.gameCreation);

        let dataParticipantOnMatch = {
          win: dataParticipant.stats.win,
          duration: makeMinutes(game.data.gameDuration),
          kda:
            dataParticipant.stats.kills +
            "/" +
            dataParticipant.stats.deaths +
            "/" +
            dataParticipant.stats.assists,
        };
        if (dataParticipantOnMatch.win) {
          winRate++;
        }
        game.data = match;
        game.data.data = dataParticipantOnMatch;
        game.data.timestamp =
          dateGame.getDate() +
          "/" +
          (dateGame.getMonth() + 1) +
          "/" +
          dateGame.getFullYear();
        data.push(game.data);
      }
      await this.championImages(data);

      const masterias = await instance.get(
        `/champion-mastery/v4/champion-masteries/by-summoner/${summoner.id}`
      );
      return {
        summoner,
        imagemPerfil: `/datadragon/iconePerfil/${summoner.profileIconId}`,
        winRate: winRate * 10,
        matches: data,
        masterias: await masterias.data.slice(0, 5),
      };
    } catch (error) {
      console.log("an error has occurred: " + error.message);
      throw new Error({ error: error.message });
    }
  }

  async takeRank(summonerId) {
    let data = await instance.get(
      `/league/v4/entries/by-summoner/${summonerId}`
    );

    data.data.forEach((q) => {
      q.emblem = `/datadragon/ranked-emblems/${q.tier}-${q.rank}`;
      q.flag = `/datadragon/ranked-flags/${q.tier}`;
    });
    return data.data;
  }

  async SearchByName(name) {
    try {
      let data = await this.findMongoDb(name);
      if (!data) {
        data = await instance.get(
          `/summoner/v4/summoners/by-name/${encodeURIComponent(name)}`
        );
        data = await this.dataSummoner(data.data);
        let rank = await this.takeRank(data.masterias[1].summonerId);
        data.summoner.rank = rank;
        data = await this.saveOnMongoDb(data);
      }
      return {
        invocador: data.summoner,
        winRate: data.summoner.winRate,
        imagemPerfil: data.summoner.imagemPerfil,
        partidas: data.match,
        masterias: data.masteria,
      };
    } catch (error) {
      console.log("an error has occurred: " + error.message);
      return { error: error.message };
    }
  }

  async saveOnMongoDb(data) {
    try {
      let summoner = new modelSummoner({
        id: data.summoner.id,
        accountId: data.summoner.accountId,
        puuid: data.summoner.puuid,
        name: data.summoner.name,
        profileIconId: data.summoner.profileIconId,
        revisionDate: data.summoner.revisionDate,
        summonerLevel: data.summoner.summonerLevel,
        winRate: data.winRate,
        imagemPerfil: data.imagemPerfil,
        rank: data.summoner.rank.map((rank) => {
          return {
            leagueId: rank.leagueId,
            queueType: rank.queueType,
            tier: rank.tier,
            rank: rank.rank,
            summonerId: rank.summonerId,
            summonerName: rank.summonerName,
            leaguePoints: rank.leaguePoints,
            wins: rank.wins,
            losses: rank.losses,
            veteran: rank.veteran,
            inactive: rank.inactive,
            freshBlood: rank.freshBlood,
            hotStreak: rank.hotStreak,
            emblem: rank.emblem,
            flag: rank.flag,
          };
        }),
      });

      await data.matches.forEach(async function (match) {
        let response = new modelMatches({
          summonerId: data.summoner.id,
          platformId: match.platformId,
          gameId: match.gameId,
          champion: {
            key: match.champion.key,
            imagem: {
              splashDesktop: match.champion.imagem.splashDesktop,
              splashMobile: match.champion.imagem.splashMobile,
              icone: match.champion.imagem.icone,
            },
          },
          queue: match.queue,
          season: match.season,
          timestamp: match.timestamp,
          role: match.role,
          lane: match.lane,
          dados: {
            win: match.data.win,
            duration: match.data.duration,
            kda: match.data.kda,
          },
        });
        await response.save();
      });

      await data.masterias.forEach(async function (masteria) {
        let response = new modelMasterias({
          idSummoner: data.summoner.id,
          championId: masteria.championId,
          championLevel: masteria.championLevel,
          lastPlayTime: masteria.lastPlayTime,
          championPointsSinceLastLevel: masteria.championPointsSinceLastLevel,
          championPointsUntilNextLevel: masteria.championPointsUntilNextLevel,
          chestGranted: masteria.chestGranted,
          tokensEarned: masteria.tokensEarned,
          summonerId: masteria.summonerId,
        });
        await response.save();
      });

      await summoner.save();

      var match = await modelMatches.find({
        summonerId: data.summoner.id,
      });
      console.log(match);

      var masteria = await modelMasterias.find({
        summonerId: data.summoner.id,
      });
      console.log(masteria);

      return { summoner, match, masteria };
    } catch (error) {
      console.log("an error has occurred " + error.message);
      throw new Error({ error: error.message });
    }
  }

  async findMongoDb(name) {
    let response = await modelSummoner.find({
      name: { $regex: name, $options: "i" },
    });
    if (response.length == 0) {
      return false;
    }
    var match = await modelMatches.find({
      idSummoner: response[0].id,
    });

    var masteria = await modelMasterias.find({
      idSummoner: response[0].id,
    });
    return { summoner: response[0], match, masteria };
  }
}

module.exports = new Summoner();
