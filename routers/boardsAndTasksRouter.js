const {Router} = require('express');
const { boardController } = require('../controllers/boardsAndTasksController');
const { boardDbController } = require ('../controllers/board.ctrl');

const boardRouter = new Router();

//GET
boardRouter.get('/boards', boardDbController.getBoards);
boardRouter.get('/boards/:id', boardDbController.getBoardById);
// boardRouter.get('/boards', boardController.getBoards);
// boardRouter.get('/boards/:id', boardController.getTasksByBoard);
// boardRouter.get('/boards/:id/employees', boardController.getEmployeeByBoard);


//POST
boardRouter.post('/boards', boardDbController.createNewBoard);
// boardRouter.post('/boards', boardController.createNewBoard);
boardRouter.post('/boards/:id', boardController.createNewTask);
boardRouter.post('/boards/:id/filter', boardController.filterBoardByParameters)

//PUT
boardRouter.put('/boards/:id', boardController.updateBoard);
boardRouter.put('/boards/:id/tasks/:tid', boardController.updateTask);

//DELETE
boardRouter.delete('/boards', boardController.deleteBoard);
boardRouter.delete('/boards/:id', boardController.deleteTask);

module.exports = { boardRouter };