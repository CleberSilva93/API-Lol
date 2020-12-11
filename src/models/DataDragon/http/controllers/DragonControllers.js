const Dragon = require("../../services/Dragon");

class DragonControllers {
  async iconeperfil(req, res) {
    try {
      const path = await Dragon.icon(req.params.profileIconId);
      res.set("Content-Type", "image/png");
      res.sendFile(path);
      return;
    } catch (error) {
      return res.status(error.status).json({ error: error.message });
    }
  }

  async splashMobile(req, res) {
    try {
      const path = await Dragon.splashMobilePath(req.params.champion);
      res.set("Content-Type", "image/jpg");
      res.sendFile(path);
      return;
    } catch (error) {
      return res.status(error.status).json({ error: error.message });
    }
  }

  async splashDesktop(req, res) {
    try {
      const path = await Dragon.splashDesktopPath(req.params.champion);
      res.set("Content-Type", "image/jpg");
      res.sendFile(path);
      return;
    } catch (error) {
      return res.status(error.status).json({ error: error.message });
    }
  }

  async iconeChampion(req, res) {
    try {
      const path = await Dragon.iconeChampionPath(req.params.champion);
      res.set("Content-Type", "image/png");
      res.sendFile(path);
      return;
    } catch (error) {
      return res.status(error.status).json({ error: error.message });
    }
  }

  async rankedEmblem(req,res){
    try{
      const path = await Dragon.rankedEmblemPath(req.params.tier);
      res.set("Content-Type", "image/png");
      res.sendFile(path);
    }catch(error){
      return res.status(error.status).json({ error: error.message });
    }
  }
}

module.exports = new DragonControllers();
