// const { errorHandler,showAllBoards,getTasksByBoard,
//     createNewTask, createNewBoard, deleteBoard,deleteTask,
//     filterBoardByParameters, updateTask,updateBoard, exportBoardToCSV, renderHomePage } = require('./controller');

const { Router } = require('express');
const {boardsAndTasksController} = require('../controllers/boardsAndTasksController');
const boardsAndTasksRouter = new Router() ;
const boardJson = require('../res/tasks.json');



boardsAndTasksRouter.get('/',boardsAndTasksController.renderHomePage);
boardsAndTasksRouter.get('/boards',boardsAndTasksController.showAllBoards);
boardsAndTasksRouter.get('/boards/:BoardId',boardsAndTasksController.getTasksByBoard);
boardsAndTasksRouter.post('/boards',boardsAndTasksController.createNewBoard);
boardsAndTasksRouter.post('/boards/:id', boardsAndTasksController.createNewTask);
boardsAndTasksRouter.post('/boards/:id/:filter',boardsAndTasksController.filterBoardByParameters);
boardsAndTasksRouter.put('boards/:id',boardsAndTasksController.updateBoard);
boardsAndTasksRouter.put('board/:id/tasks/:id',boardsAndTasksController.updateTask);
boardsAndTasksRouter.delete('board/:id',boardsAndTasksController.deleteBoard);
boardsAndTasksRouter.delete('board/:id/tasks/:id',boardsAndTasksController.deleteTask);




module.exports = {boardsAndTasksRouter};