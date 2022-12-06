const Logger = require("../logger/Logger");
const logger = new Logger();
const BoardsRepository = require("../repositories/boardsrepository");
const boardsRepository = new BoardsRepository();



exports.boardsController = {

    getBoards(req, res) {
        logger.log("Getting all boards");
        res.status(200).json(boardsRepository.getAllBoards());
    },

    getBoard(req, res) {     
        const result = boardsRepository.searchBoard(req.params.id);
        if (result == null) {
            const msg = 'Error! boarder no ' + req.params.id + ' was not found!';
            Error(msg);
            res.status(400).json(msg);
        }
        else {
            logger.log("get board");
            res.status(200).json(result);
        }  
    },

    updateBord(req, res) {
        const ifExits = boardsRepository.searchBoard(req.body.id);
        if(ifExits == null) {
            const msg = 'Error! boarder no ' + req.body.id + ' was not found!';
            Error(msg);
            res.status(400).json(msg)
        }
        else {
            boardsRepository.updateBoard(req.body);
            logger.log("update a board");
            res.status(200).json('Board no ' + req.body.id + ' was updated');
        }
    },

    deleteBoard(req, res) {
        console.log(req.params.id);
        const ifExits = boardsRepository.searchBoard(req.params.id);
        if(ifExits == null) {
            console.log(2);
            const msg = 'Error! boarder no ' + req.params.id + ' was not found!';
            Error(msg);
            res.status(400).json(msg)
        }
        else {
            boardsRepository.deleteBoard(req.params);
            logger.log("delete a board");
            res.status(200).json('Board no ' + req.params.id + ' is deleted');
        }
    },

    createNewBoard(req, res) {
        boardsRepository.createNewBoard(req.body);
        logger.log("add a new board");
        res.status(200).json('The board is created');
    }

}