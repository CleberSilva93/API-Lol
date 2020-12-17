const Dragon = require("../../services/Dragon");

class DragonControllers {
  async iconProfile(req, res) {
    try {
      const path = await Dragon.iconProfilePath(req.params.profileIconId);
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

  async iconChampion(req, res) {
    try {
      const path = await Dragon.iconChampionPath(req.params.champion);
      res.set("Content-Type", "image/png");
      res.sendFile(path);
      return;
    } catch (error) {
      return res.status(error.status).json({ error: error.message });
    }
  }

  async rankedEmblem(req, res) {
    try {
      const path = await Dragon.rankedEmblemPath(req.params.tier);
      res.set("Content-Type", "image/png");
      res.sendFile(path);
    } catch (error) {
      return res.status(error.status).json({ error: error.message });
    }
  }

  async rankedFlag(req, res) {
    try {
      const path = await Dragon.rankedFlagPath(req.params.tier);
      res.set("Content-type", "image/png");
      res.sendFile(path);
    } catch (error) {
      return res.status(error.status).json({ error: error.message });
    }
  }
}

module.exports = new DragonControllers();
