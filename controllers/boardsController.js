const Logger = require("../logger/Logger");
const logger = new Logger();
const BoardsRepository = require("../repositories/boardsrepository");
const boardsRepository = new BoardsRepository();


function boardChecks(id) {
    const ifExits = boardsRepository.searchBoard(id);
    if(ifExits == null) {
        return 'Error! boarder no ' + id + ' is not found!';    
    }
    return true;
}


exports.boardsController = {

    getBoards(req, res) {
        logger.log("Getting all boards");
        res.status(200).json(boardsRepository.getAllBoards());
    },

    getBoard(req, res) {     
        const result = boardChecks(req.params.id);
        if (result != true) {
            res.status(400).send(result);
        }
        else {
            logger.log("getting board no " + req.params.id);
            res.status(200).json(boardsRepository.searchBoard(req.params.id));
        }  
    },

    updateBord(req, res) {
        const result = boardChecks(req.body.id);
        if(result !=  true) {
            res.status(400).send(msg);
        }
        else {
            boardsRepository.updateBoard(req.body);
            logger.log("update a board no " +  req.body.id);
            res.status(200).send('Board no ' + req.body.id + ' is updated');
        }
    },

    deleteBoard(req, res) {
        const result = boardChecks(req.body.id);
        if(result != true) {
            res.status(400).send(result);
        }
        else {
            boardsRepository.deleteBoard(req.body);
            logger.log("delete a board");
            res.status(200).send('Board no ' + req.body.id + ' is deleted');
        }
    },

    createNewBoard(req, res) {
        boardsRepository.createNewBoard(req.body);
        logger.log("creating a new board");
        res.status(200).send('The board is created');
    },

    createNewTask(req,res) {
        const result = boardChecks(req.body.BoardId);
        if(result != true) {
            res.status(400).send(result);
        } else {
            boardsRepository.createNewTask(req.body);
            logger.log("adding a new task");
            res.status(200).send('The task is added to the bord');
        }
    },

    deleteTask(req, res) {
        console.log(req.body);
        const result = boardChecks(req.body.BoardId);
        if(result != true) {
            res.status(400).send(result);
        } else if(boardsRepository.deleteTask(req.body) == false) {
            res.status(400).send('task no ' + req.body.TaskId + ' is not found');
        } else {
            logger.log('task no ' + req.body.TaskId + ' is deleted');
            res.status(200).send('task no ' + req.body.TaskId + ' is deleted');
        }
    },

    updateTask(req,res) {
        const result = boardChecks(req.body.BoardId);
        if(result != true) {
            res.status(400).send(result);
        } else {
            boardsRepository.updateTask(req.body);
            logger.log("updateTask");
            res.status(200).send('Tasks no ' + req.body.TaskId + " is edited");
        }
       
    },

    exportBoardToCSV(req , res) {
        const result = boardChecks(req.params.id);
        if(result != true) {
            res.status(400).send(result);
        }
        else {
            try {
                const csv = boardsRepository.exportToCsv(req.params.id);
                logger.log("exportBoardToCSV");
                res.attachment("tasks.csv");
                res.status(200).send(csv);
            } catch (error) {
                logger.log("error");
                res.status(400).send("Faild to export board no " + req.params.id + " tasks list to csv. Error: " + error);
            }
        }
    }
}

