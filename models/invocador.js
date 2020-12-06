const invocador = require('../controllers/invocador');
const axios = require('axios');
const devKey = process.env.DEV_KEY;
const instance = axios.create({
    baseURL: 'https://br1.api.riotgames.com/lol',
    headers: {
        "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Riot-Token": devKey
    }
})



class Invocador{

    async dadosInvocador(invocador){
        const partidas = await instance.get(`/match/v4/matchlists/by-account/${invocador.accountId}?endIndex=10`);
        const masterias = await instance.get(`/champion-mastery/v4/champion-masteries/by-summoner/${invocador.id}`);
        return {invocador, partidas: partidas.data.matches, masterias: masterias.data.slice(0,5)};
    }


    async buscaPorNome(nome){
        const invocador = await instance.get(`/summoner/v4/summoners/by-name/${nome}`);
        const dados = await this.dadosInvocador(invocador.data);
        return dados
    }
}

module.exports = new Invocador;