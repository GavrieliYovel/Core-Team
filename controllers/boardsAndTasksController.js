const TaskManagerDAL = require('../taskManagerDAL');
const {boardStatistics} = require('../boardStatistic');
const {URL} = require('url');
const  boards_client=require('../client');
const task_client = require('../taskclient');
const Logger = require("../Logger");
const logger = new Logger();
const taskManagerDAL = new TaskManagerDAL();

error = (res) => {
    res.writeHeader(404);
    res.write('Bad request');
    res.end();
}

exports.boardController = {
    errorHandler: (req, res) => {
        error(res);
    },
    renderHomePage: (req, res) => {
        res.end(boards_client);
    },
    getTasksByBoard: (req, res) => {
        const boardId = req.params.id;
        const data = taskManagerDAL.getAllTaskByBoard(boardId);
        if (data == "error")
        {
            error(res);
            return;
        }

        res.writeHeader(200);
        res.end(JSON.stringify(data));
        // let dataAndStats = boardStatistics(boardId);
        // dataAndStats.tasks = data;
        // logger.log("getTasksByBoard");
        // res.write(task_client);
        // res.end(JSON.stringify(dataAndStats));

    },
    getBoards: (req, res) => {
        const data = taskManagerDAL.getAllBoards();
        logger.log("getBoards");
        res.writeHeader(200);
        res.end(JSON.stringify(data));
    },
    updateBoard: (req, res) => {
        taskManagerDAL.updateBoard(req.body);
        logger.log("updateBoard");
        res.end('done');
    },
    createNewBoard: (req, res) => {
        taskManagerDAL.createNewBoard(req.body);
        logger.log("createNewBoard");
        res.end('done');
    },
    createNewTask: (req, res) => {
        taskManagerDAL.createNewTask(req.body);
        logger.log("createNewTask");
        res.end('done');
    },
    updateTask: (req, res) => {
        taskManagerDAL.updateTask(req.body);
        logger.log("updateTask");
        res.end('done');

    },
    deleteTask: (req, res) => {
        if(taskManagerDAL.deleteTask(req.body) == "error") {
            console.error('task not found');
            return;
        }
        logger.log("deleteTask");
        res.end('done');

    },
    deleteBoard: (req, res) => {
        taskManagerDAL.deleteBoard(req.body);
        logger.log("deleteBoard");
        res.end('done');

    },
    filterBoardByParameters: (req, res) => {
        const data =taskManagerDAL.filterTasks(req.body,  req.params.id);
        res.end( JSON.stringify(data));
    },
    exportBoardToCSV : (req , res)  => {
        const boardId =getId(req, 'boardId');
        const data = taskManagerDAL.exportToCsv(boardId);
        logger.log("exportBoardToCSV");
        if (data == "error")
        {
            error(res);
            logger.log("bad request exportBoardToCSV");
            return;
        }
    },
    getEmployeeByBoard: (req, res) => {
        const data = taskManagerDAL.getEmployees(req.params.id);
        console.log(data);
        res.end(JSON.stringify(data));
    }
}