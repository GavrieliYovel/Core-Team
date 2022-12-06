const { Router } = require('express');
const { boardsController } = require('../controllers/boardsController');

const boardsRouter = new Router();
boardsRouter.get('/csv/:id', boardsController.exportBoardToCSV);
boardsRouter.get('/:id', boardsController.getBoard);
boardsRouter.get('/', boardsController.getBoards);

boardsRouter.put('/tasks', boardsController.updateTask);
boardsRouter.put('/', boardsController.updateBord);

boardsRouter.delete('/tasks', boardsController.deleteTask);
boardsRouter.delete('/:id', boardsController.deleteBoard);

boardsRouter.post('/tasks', boardsController.createNewTask);
boardsRouter.post('/', boardsController.createNewBoard);


module.exports = { boardsRouter };