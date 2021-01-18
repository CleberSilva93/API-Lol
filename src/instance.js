const axios = require('axios');
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

module.exports.instance = instance;