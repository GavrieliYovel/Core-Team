const { Router } = require('express');
const { boardDbController } = require('../controllers/boardsController');

const boardsRouter = new Router();
boardsRouter.get('/statistics/:id', boardDbController.getBoardStatistics)
boardsRouter.get('/csv/:id', boardDbController.exportBoardToCSV);
boardsRouter.get('/:id', boardDbController.getBoardById);
boardsRouter.get('/', boardDbController.getBoards);

boardsRouter.put('/tasks', boardDbController.updateTask);
boardsRouter.put('/', boardDbController.updateBoard);

boardsRouter.delete('/tasks', boardDbController.deleteTask);
boardsRouter.delete('/', boardDbController.deleteBoard);

boardsRouter.post('/tasks/filter', boardDbController.filterBoardByParameters);
boardsRouter.post('/tasks', boardDbController.createNewTask);
boardsRouter.post('/', boardDbController.createNewBoard);




module.exports = { boardsRouter };
