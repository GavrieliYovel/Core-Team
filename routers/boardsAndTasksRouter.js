const {Router} = require('express');
const { boardController } = require('../controllers/boardsAndTasksController');

const boardRouter = new Router();

//GET
boardRouter.get('/boards', boardController.getBoards);
boardRouter.get('/boards/:id', boardController.getTasksByBoard);

//POST
boardRouter.post('/boards', boardController.createNewBoard);
boardRouter.post('/boards/:id', boardController.createNewTask);
boardRouter.post('/boards/:id/filter', boardController.filterBoardByParameters)

//PUT
boardRouter.put('/boards/:id', boardController.updateBoard);
boardRouter.put('/boards/:id/tasks/:tid', boardController.updateTask);

//DELETE
boardRouter.delete('/boards', boardController.deleteBoard);
boardRouter.delete('/boards/:id', boardController.deleteTask);

module.exports = { boardRouter };