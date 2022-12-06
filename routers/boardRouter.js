const {Router} = require('express');
const { boardDbController } = require ('../controllers/board.ctrl');

const boardRouter = new Router();

//GET
boardRouter.get('/boards', boardDbController.getBoards);
boardRouter.get('/boards/:id', boardDbController.getBoardById);

// boardRouter.get('/boards/:id/employees', boardController.getEmployeeByBoard);


//POST
boardRouter.post('/boards', boardDbController.createNewBoard);
boardRouter.post('/boards/:id', boardDbController.createNewTask);
boardRouter.post('/boards/:id/filter', boardDbController.filterBoardByParameters);


//PUT
boardRouter.put('/boards/:id', boardDbController.updateBoard);
boardRouter.put('/boards/:id/tasks/:tid', boardDbController.updateTask);

//DELETE
boardRouter.delete('/boards', boardDbController.deleteBoard);
boardRouter.delete('/boards/:id', boardDbController.deleteTask);

module.exports =  {boardRouter};
