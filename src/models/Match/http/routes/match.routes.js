const matchRouter = require('express').Router();
const matchController = require('../controllers/matchController');

matchRouter.get('/:matchId',matchController.match);

module.exports = matchRouter;