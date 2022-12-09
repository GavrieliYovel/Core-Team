const { Router } = require('express');
const { sessionDbController } = require('../controllers/sessionController');
const sessionRouter = new Router();

sessionRouter.post('/login', sessionDbController.login);
sessionRouter.get('/logout', sessionDbController.logout);
sessionRouter.get('/checkUser', sessionDbController.getUser);

module.exports = { sessionRouter };
