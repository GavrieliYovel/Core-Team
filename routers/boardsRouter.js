const { Router } = require('express');
const { boardsController } = require('../controllers/boardsController');

const boardsRouter = new Router();
boardsRouter.get('/', boardsController.getBoards);
boardsRouter.get('/:id', boardsController.getBoard);

boardsRouter.put('/', boardsController.updateBord);

boardsRouter.delete('/:id', boardsController.deleteBoard);

boardsRouter.post('/', boardsController.createNewBoard);

module.exports = { boardsRouter };