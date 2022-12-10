const { Router } = require('express');
const { sessionDbController } = require('../controllers/sessionController');
const sessionRouter = new Router();

//GET
sessionRouter.get('/logout', sessionDbController.logout);
sessionRouter.get('/checkUser', sessionDbController.getUser);

//POST
sessionRouter.post('/login', sessionDbController.login);


module.exports = { sessionRouter };
