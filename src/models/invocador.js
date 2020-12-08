// const invocador = require("../controllers/invocadorController");
const champions = require('../assets/champions.json');
require("dotenv").config({
  path: ".env",
});
const axios = require("axios");
const devKey = process.env.DEV_KEY;
const instance = axios.create({
  baseURL: "https://br1.api.riotgames.com/lol",
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
    "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    "X-Riot-Token": devKey,
  },
});

class Invocador {

  async championImages(partidas){
    await Object.entries(partidas).map(partida => {
      let champ = champions.find(champion => parseInt(champion.key) === partida[1].champion);
      partida[1].champion = champ;
    });
  }


  async dadosInvocador(invocador) {
    const partidas = await instance.get(
      `/match/v4/matchlists/by-account/${invocador.accountId}?endIndex=10`
    );

    this.championImages(partidas.data.matches);

    const masterias = await instance.get(
      `/champion-mastery/v4/champion-masteries/by-summoner/${invocador.id}`
    );
    return {
      invocador,
      partidas: partidas.data.matches,
      masterias: masterias.data.slice(0, 5),
      imagemPerfil: `/iconePerfil/${invocador.profileIconId}`
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
