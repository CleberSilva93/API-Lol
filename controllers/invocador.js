const Invocador = require('../models/invocador');

module.exports = app => {
    app.get('/invocador/:nome', async (req,res) => {
        const nome = req.params.nome;
        const invocador = await Invocador.buscaPorNome(nome);
        console.log(invocador);
        res.sendStatus(200);
    })
}