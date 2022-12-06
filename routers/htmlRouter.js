const { Router } = require('express');
const { htmlController } = require('../controllers/htmlController');

const htmlRouter = new Router();
htmlRouter.get('/index', htmlController.getLogin);
htmlRouter.get('/boards', htmlController.getHome);
htmlRouter.get('/tasks', htmlController.getTasksList);


module.exports = { htmlRouter };