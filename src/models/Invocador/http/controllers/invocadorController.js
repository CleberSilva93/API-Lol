const Invocador = require("../../services/invocador");

class InvocadorController {
  async invocador(req, res) {
    try {
      const nome = req.params.nome;
      const invocador = await Invocador.buscaPorNome(nome);
      return res.status(200).json(invocador);
    } catch (error) {
      return res.status(error.response.status).json({ error: error.message });
    }
  }
}

module.exports = new InvocadorController();
