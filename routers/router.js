const {Router} = require('express');
const { boardController } = require('../controllers/controller');

const boardRouter = new Router();

boardRouter.get('/boards', boardController.getBoards);  //
boardRouter.get('/boards/:id', boardController.getTasksByBoard);       // localhost:8080/api/orders/6
boardRouter.post('/boards', boardController.createNewBoard);         //
boardRouter.put('/boards/:id', boardController.createNewTask);       //
boardRouter.delete('/boards', boardController.deleteBoard);    //
boardRouter.delete('/boards/:id', boardController.deleteTask);    //

module.exports = { boardRouter };