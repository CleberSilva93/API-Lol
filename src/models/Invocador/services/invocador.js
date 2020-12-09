// const invocador = require("../controllers/invocadorController");
const champions = require("../../../assets/champions.json");
require("dotenv").config({
  path: ".env",
});
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
    let winRate = 0;
    const partidas = await instance.get(
      `/match/v4/matchlists/by-account/${invocador.accountId}?endIndex=10`
    );

    Object.entries(partidas.data.matches).map(async (partida) => {
      let matchId = partida[1].gameId;
      let dadosPartida = await instance.get(`/match/v4/matches/${matchId}`);

      // Identifica o particpante na partida
      let dadosParticipante = dadosPartida.data.participantIdentities.find(
        (participant) => participant.player.summonerName === invocador.name
      );

      // Captura as informações do participante dentro da partida
      dadosParticipante = await dadosPartida.data.participants.find(
        (participant) =>
          participant.participantId === dadosParticipante.participantId
      );

      // transforma unix em uma data
      let dataDoGame = new Date(dadosPartida.data.gameCreation);

      // Adicionar nesse objeto todos os elementos que precisamos retornar
      let dadosParticipanteNaPartida = {
        win: dadosParticipante.stats.win,
        duration: dadosPartida.data.gameDuration, // Está em segundos
      };

      // contando quantas partidas são vitoriosas
      if (dadosParticipanteNaPartida.win) {
        winRate++;
      }
      partida[1].dados = dadosParticipanteNaPartida;
      partida[1].timestamp =
        dataDoGame.getDate() +
        "/" +
        (dataDoGame.getMonth() + 1) +
        "/" +
        dataDoGame.getFullYear();
    });
    this.championImages(partidas.data.matches);

    const masterias = await instance.get(
      `/champion-mastery/v4/champion-masteries/by-summoner/${invocador.id}`
    );
    return {
      invocador,
      partidas: partidas.data.matches,
      winRate: winRate * 10,
      masterias: masterias.data.slice(0, 5),
      imagemPerfil: `/iconePerfil/${invocador.profileIconId}`,
    };
  }

  async buscaPorNome(nome) {
    const invocador = await instance.get(
      `/summoner/v4/summoners/by-name/${encodeURIComponent(nome)}`
    );
    const dados = await this.dadosInvocador(invocador.data);
    return dados;
  }
}

module.exports = new Invocador();
