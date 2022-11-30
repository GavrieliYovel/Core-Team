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
        let body = [];
        let board;

        req
            .on('error', logger.log(err))
            .on('data', chunk => body.push(chunk))
            .on('end', () => {
                body = Buffer.concat(body).toString();
                board = JSON.parse(body);
                taskManagerDAL.updateBoard(board);
                logger.log("updateBoard");
                res.end('done');
            })
    },
    createNewBoard: (req, res) => {
        let body = [];
        let board;

        req
            .on('error', err => logger.log(err))
            .on('data', chunk => body.push(chunk))
            .on('end', () => {
                body = Buffer.concat(body).toString();
                board = JSON.parse(body);
                taskManagerDAL.createNewBoard(board);
                logger.log("createNewBoard");
                res.end('done');
            })
    },
    createNewTask: (req, res) => {
        let body = [];
        let task;
        const boardId = req.params.id;

        req
            .on('error', err => logger.log(err))
            .on('data', chunk => body.push(chunk))
            .on('end', () => {
                body = Buffer.concat(body).toString();
                task = JSON.parse(body);
                taskManagerDAL.createNewTask(task,boardId);
                logger.log("createNewTask");
                res.end('done');
            })
    },
    updateTask: (req, res) => {
        let body = [];
        let task;

        req
            .on('error', err => logger.log(err))
            .on('data', chunk => body.push(chunk))
            .on('end', () => {
                body = Buffer.concat(body).toString();
                task = JSON.parse(body);
                taskManagerDAL.updateTask(task);
                logger.log("updateTask");
                res.end('done');
            })
    },
    deleteTask: (req, res) => {
        let body = [];
        let ids;
        req
            .on('error', err => logger.log(err))
            .on('data', chunk => body.push(chunk))
            .on('end', () => {
                body = Buffer.concat(body).toString();
                ids = JSON.parse(body);
                if(taskManagerDAL.deleteTask(ids) == "error") {
                    // error(res);
                    console.error('task not found');
                    return;
                }
                logger.log("deleteTask");
                res.end('done');
            })
        res.end('done');

    },
    deleteBoard: (req, res) => {
        let body = [];
        let boardId;
        req
            .on('error', err => logger.log(err))
            .on('data', chunk => body.push(chunk))
            .on('end', () => {
                body = Buffer.concat(body).toString();
                boardId = JSON.parse(body);
                taskManagerDAL.deleteBoard(boardId);
                logger.log("deleteBoard");
                res.end('done');
            })
    },
    filterBoardByParameters: (req, res) => {
        let body = [];
        let task;
        req
            .on('error', err => logger.log(err))
            .on('data', chunk => body.push(chunk))
            .on('end', () => {
                body = Buffer.concat(body).toString();
                task = JSON.parse(body);
                res.writeHeader(200);
                logger.log("filterBoardByParameters");
                res.end(JSON.stringify(taskManagerDAL.filterTasks(task)));
            })
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
    }
}

// console.log(taskManagerDAL.getAllTaskByBoard(2));