require("dotenv").config({
  path: ".env",
});
// const invocador = require("../controllers/invocadorController");
const makeMinutes = require("../../../shared/utils/makeMinutes");
const champions = require("../../../assets/champions.json");
const modelinvocation = require("../../../database/model/Invocador");

const modelpartidas = require("../../../database/model/partidas");

const modelmasterias = require("../../../database/model/masterias");

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
class Invocador {
  async championImages(partidas) {
    await Object.entries(partidas).map((partida) => {
      let champ = champions.find(
        (champion) => parseInt(champion.key) === partida[1].champion
      );
      partida[1].champion = champ;
    });
  }

  async dadosInvocador(invocador) {
    try {
      let dados = [];
      let winRate = 0;
      let partidas = await instance.get(
        `/match/v4/matchlists/by-account/${invocador.accountId}?endIndex=10`
      );

      for (let partida of partidas.data.matches) {
        let game = await instance.get(`/match/v4/matches/${partida.gameId}`);
        let dadosParticipantes = game.data.participantIdentities.find(
          (participant) => participant.player.summonerName === invocador.name
        );

        let dadosParticipante = game.data.participants.find(
          (participant) =>
            participant.participantId === dadosParticipantes.participantId
        );

        let dataDoGame = new Date(game.data.gameCreation);

        let dadosParticipanteNaPartida = {
          win: dadosParticipante.stats.win,
          duration: makeMinutes(game.data.gameDuration),
          kda:
            dadosParticipante.stats.kills +
            "/" +
            dadosParticipante.stats.deaths +
            "/" +
            dadosParticipante.stats.assists,
        };
        if (dadosParticipanteNaPartida.win) {
          winRate++;
        }
        game.data = partida;
        game.data.dados = dadosParticipanteNaPartida;
        game.data.timestamp =
          dataDoGame.getDate() +
          "/" +
          (dataDoGame.getMonth() + 1) +
          "/" +
          dataDoGame.getFullYear();
        dados.push(game.data);
      }
      await this.championImages(dados);

      const masterias = await instance.get(
        `/champion-mastery/v4/champion-masteries/by-summoner/${invocador.id}`
      );
      return {
        invocador,
        imagemPerfil: `/datadragon/iconePerfil/${invocador.profileIconId}`,
        winRate: winRate * 10,
        partidas: dados,
        masterias: await masterias.data.slice(0, 5),
      };
    } catch (error) {
      console.log("Ocorreu um erro " + error.message);
      throw new Error({ error: error.message });
    }
  }

  async capturarRank(summonerId) {
    let dados = await instance.get(
      `/league/v4/entries/by-summoner/${summonerId}`
    );

    dados.data.forEach((q) => {
      q.emblem = `/datadragon/ranked-emblems/${q.tier}-${q.rank}`;
      q.flag = `/datadragon/ranked-flags/${q.tier}`;
    });
    return dados.data;
  }

  async buscaPorNome(nome) {
    try {
      let dados = await this.findMongoDb(nome);
      if (!dados) {
        dados = await instance.get(
          `/summoner/v4/summoners/by-name/${encodeURIComponent(nome)}`
        );

        dados = await this.dadosInvocador(dados.data);
        let rank = await this.capturarRank(dados.masterias[1].summonerId);
        dados.invocador.rank = rank;
        dados = await this.saveMongoDb(dados);
      }
      return {
        invocador: dados.invocador,
        winRate: dados.invocador.winRate,
        imagemPerfil: dados.invocador.imagemPerfil,
        partidas: dados.partida,
        masterias: dados.masteria,
      };
    } catch (error) {
      console.log("Ocorreu um " + error.message);
      return { error: error.message };
    }
  }

  async saveMongoDb(dados) {
    try {
      let invocador = new modelinvocation({
        id: dados.invocador.id,
        accountId: dados.invocador.accountId,
        puuid: dados.invocador.puuid,
        name: dados.invocador.name,
        profileIconId: dados.invocador.profileIconId,
        revisionDate: dados.invocador.revisionDate,
        summonerLevel: dados.invocador.summonerLevel,
        winRate: dados.winRate,
        imagemPerfil: dados.imagemPerfil,
        rank: dados.invocador.rank.map((rank) => {
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
          };
        }),
      });

      await dados.partidas.forEach(async function (partida) {
        let retorno = new modelpartidas({
          idInvocador: dados.invocador.id,
          platformId: partida.platformId,
          gameId: partida.gameId,
          champion: {
            key: partida.champion.key,
            imagem: {
              splashDesktop: partida.champion.imagem.splashDesktop,
              splashMobile: partida.champion.imagem.splashMobile,
              icone: partida.champion.imagem.icone,
            },
          },
          queue: partida.queue,
          season: partida.season,
          timestamp: partida.timestamp,
          role: partida.role,
          lane: partida.lane,
          dados: {
            win: partida.dados.win,
            duration: partida.dados.duration,
            kda: partida.dados.kda,
          },
        });
        await retorno.save();
      });

      await dados.masterias.forEach(async function (masteria) {
        let retorno = new modelmasterias({
          idInvocador: dados.invocador.id,
          championId: masteria.championId,
          championLevel: masteria.championLevel,
          lastPlayTime: masteria.lastPlayTime,
          championPointsSinceLastLevel: masteria.championPointsSinceLastLevel,
          championPointsUntilNextLevel: masteria.championPointsUntilNextLevel,
          chestGranted: masteria.chestGranted,
          tokensEarned: masteria.tokensEarned,
          summonerId: masteria.summonerId,
        });
        await retorno.save();
      });

      await invocador.save();

      var partida = await partidas.find({
        idInvocador: dados.invocador.id,
      });

      var masteria = await masterias.find({
        idInvocador: dados.invocador.id,
      });

      return { invocador, partida, masteria };
    } catch (error) {
      console.log(error.message);
      throw new Error({ error: error.message });
    }
  }

  async findMongoDb(name) {
    let retorno = await modelinvocation.find({
      name: { $regex: name, $options: "i" },
    });
    if (retorno.length == 0) {
      return false;
    }
    var partida = await modelpartidas.find({
      idInvocador: retorno[0].id,
    });

    var masteria = await modelmasterias.find({
      idInvocador: retorno[0].id,
    });
    return { invocador: retorno[0], partida, masteria };
  }
}

module.exports = new Invocador();
