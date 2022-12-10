const {Board,Task} = require('../models/board');
const { IncomingWebhook } = require('@slack/webhook');
const Logger = require('../logger/Logger');
const logger = new Logger();
const fs = require('fs');
const { Parser } = require('json2csv');
const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);
const json2csvParser = new Parser();


// Send the notification
async function notifySlack(message) {
    await webhook.send({
        text: message
    });
};

exports.boardDbController = {
    //Get all boards from DB
    async getBoards(req, res) {
        await Board.find({}).exec()
            .then(boards => {
                res.json(boards);
            })
            .catch(err => {
                logger.log(`Error getting data from DB:${err}`);
            });
    },
    //Get all board details {boardId, boardName, tasks[]} from DB
    async getBoardById(req, res) {
        await Board.find({boardId:req.params.id}).exec()
            .then(board => {
                const currentBoard = board[0];
                res.json(currentBoard);
            })
            .catch(err => {
                logger.log(`Error getting data from DB:${err}`);
            });
    },
    //Creating new board and insert it to DB
    async createNewBoard(req, res) {
        await Board.find({}).sort(`-boardId`).limit(1).exec()
            .then(board => {
                let newId = 1;
                if (board.length == 1) {
                    let lastBoardOnDb = board[0];
                    newId = lastBoardOnDb.boardId + 1;
                }
                const newBoard = new Board({
                    boardId: newId,
                    boardName: req.body.boardName,
                    tasks: []
                });
                const result = newBoard.save();
                if (result)
                    res.send(`boardId ${newId} add successfully`);
                else
                    res.status(404).send("Error saving board");

            })
            .catch(err => {
                logger.log(`Error getting data from DB:${err}`)
            });
    },
    //Creating new task assign it to specific board and insert it to DB
    async createNewTask(req, res) {
        await Board.find({boardId: req.body.boardId}).exec()
            .then(async board => {
                if (board.length == 1) {
                    let taskId = 1; //initialize taskId to 1
                    let currentBoard = board[0];
                    if (currentBoard.tasks.length > 0)
                        taskId = currentBoard.tasks[currentBoard.tasks.length - 1].taskId + 1;
                    const newTask = new Task({
                        taskId: taskId,
                        taskName: req.body.taskName,
                        taskDetails: req.body.taskDetails,
                        status: req.body.status,
                        priority: req.body.priority,
                        type: req.body.type,
                        assignee: req.body.assignee,
                        creator: req.session.userName
                    });
                    currentBoard.tasks.push(newTask);

                    const result = await Board.findOneAndUpdate({boardId: req.body.boardId}, currentBoard);
                    if (result)
                        res.send(`taskId ${taskId} add successfully`);
                    else
                        res.status(404).send("Error saving task");
                }
            })
            .catch(err => {
                logger.log(`Error getting data from DB:${err}`)
            });
    },
    //Update board name in DB
    async updateBoard(req, res) {
        await Board.find({boardId: req.body.boardId}).exec()
            .then(async board => {
                if (board.length == 1) {
                    let currentBoard = board[0];
                    let oldName = currentBoard.boardName;
                    currentBoard.boardName = req.body.boardName;
                    const result = await Board.findOneAndUpdate({boardId: req.body.boardId}, currentBoard);
                    if(result) {
                        let message = `Board "${oldName}" is now called "${currentBoard.boardName}"`;
                        await notifySlack(message);
                        logger.log(message);
                        res.send(result);
                    } else {
                        res.status(404).send(`Error update boardId ${req.body.boardId}`);
                    }

                }
            })
            .catch(err => {
                logger.log(`Error getting data from DB:${err}`)
            });
    },
    //Delete board from DB (Only managers can delete)
    async deleteBoard(req, res) {
        if(req.session.userRole == "Manager"){
            let board = await Board.findOneAndDelete({boardId: req.body.boardId});
            let message = `Board "${board.boardName}" deleted by ${req.session.userName}`;
            await notifySlack(message);
            logger.log(message);
            res.send(message);
        } else {
            logger.log(`${req.session.userName} attempted to delete board number ${req.body.boardId}`);
            res.send("You do not have permission to delete boards");
        }

    },
    //Delete task from board from DB (Only managers can delete)
    async deleteTask(req, res) {
        await Board.find({boardId: req.body.boardId})
            .then (async board => {
                if (board.length == 1) {
                    let currentBoard = board[0];
                    let taskName = currentBoard.tasks.find(task => task.taskId == req.body.taskId).taskName;
                    if (req.session.userRole == "Manager") {
                        let message = `TaskId "${taskName}" on board "${currentBoard.boardName}" has been deleted by ${req.session.userName}`;
                        currentBoard.tasks = currentBoard.tasks.filter(task => task.taskId != req.body.taskId);
                        await Board.findOneAndUpdate({boardId: req.body.boardId}, currentBoard);
                        await notifySlack(message);
                        logger.log(message);
                        res.send(message);
                    } else {
                        logger.log(`${req.session.userName} attempted to delete task "${taskName}" in board "${currentBoard.boardName}"`);
                        res.send("You do not have permission to delete tasks");
                    }
                }
            })
            .catch(err => {
                logger.log(`Error getting data from DB:${err}`)
            });
    },
    //Get task from board by specific filtering {priority and/or assignee and/or type and/or status}
    async filterBoardByParameters(req, res) {
        await Board.find({boardId: req.body.boardId})
            .then ( board => {
                if (board.length == 1) {
                    let currentBoard = board[0];
                    if (req.body.hasOwnProperty('priority'))
                        currentBoard.tasks = currentBoard.tasks.filter(task => task.priority === req.body.priority);
                    if (req.body.hasOwnProperty('assignee'))
                        currentBoard.tasks = currentBoard.tasks.filter(task => task.assignee === req.body.assignee);
                    if (req.body.hasOwnProperty('type'))
                        currentBoard.tasks = currentBoard.tasks.filter(task => task.type === req.body.type);
                    if (req.body.hasOwnProperty('status'))
                        currentBoard.tasks = currentBoard.tasks.filter(task => task.status === req.body.status);
                    logger.log(`filterBoardByParameters on ${currentBoard.boardName}`);
                    res.json(currentBoard);
                }
            })
            .catch(err => {
                logger.log(`Error getting data from DB:${err}`)
            });
    },
    //Update task properties in DB
    async updateTask(req, res) {
        await Board.find({boardId: req.body.boardId})
            .then(async board => {
                if (board.length == 1) {
                    let currentBoard = board[0];
                    let task = currentBoard.tasks.find(task => task.taskId == req.body.taskId);
                    let update ='';
                    update += '\n*Task Name*: '+task.taskName;
                    if (req.body.hasOwnProperty('taskName')){
                        update += ':arrow_right:'+req.body.taskName;
                        currentBoard.tasks.find(task => task.taskId == req.body.taskId).taskName = req.body.taskName;
                    }
                    update += '\n*Task Details*: '+task.taskDetails;
                    if (req.body.hasOwnProperty('taskDetails')){
                        update += ':arrow_right:'+req.body.taskDetails;
                        currentBoard.tasks.find(task => task.taskId == req.body.taskId).taskDetails = req.body.taskDetails;
                    }
                    update += '\n*status*: '+task.status;
                    if (req.body.hasOwnProperty('status')) {
                        update += ':arrow_right:'+req.body.status;
                        currentBoard.tasks.find(task => task.taskId == req.body.taskId).status = req.body.status;
                    }
                    update += '\n*priority*: '+task.priority;
                    if (req.body.hasOwnProperty('priority')){
                        update += ':arrow_right:'+req.body.priority;
                        currentBoard.tasks.find(task => task.taskId == req.body.taskId).priority = req.body.priority;
                    }
                    update += '\n*assignee*: '+task.assignee;
                    if (req.body.hasOwnProperty('assignee')) {
                        update += ':arrow_right:'+req.body.assignee;
                        currentBoard.tasks.find(task => task.taskId == req.body.taskId).assignee = req.body.assignee;
                    }
                    update += '\n*type*: '+task.type;
                    if (req.body.hasOwnProperty('type')){
                        update += ':arrow_right:'+req.body.type;
                        currentBoard.tasks.find(task => task.taskId == req.body.taskId).type = req.body.type;
                    }
                    let message = `${req.session.userName} updated task "${task.taskName}" on board "${currentBoard.boardName}"`;
                    await Board.findOneAndUpdate({boardId: req.body.boardId}, board[0]);
                    await notifySlack(message+update);
                    logger.log(message);
                    res.send(message);
                }
            })
            .catch(err => {
                logger.log(`Error getting data from DB:${err}`)
            });
    },
    //Export specific board into CSV and download it
    async exportBoardToCSV(req,res) {
        await Board.find({boardId: req.params.id}).exec()
            .then(board => {

                if(board.length == 1) {
                    try {
                        let currentBoard = board[0]
                        let csv   = json2csvParser.parse(currentBoard.tasks);
                        fs.writeFileSync(currentBoard.boardName + '-board tasks.csv', csv, function(err) {
                            if(err) {
                                throw err;
                            }
                        });
                        logger.log("exportBoardToCSV");
                        res.attachment(currentBoard.boardName + "-board tasks.csv");
                        res.status(200).send(csv);
                    } catch (e) {
                        logger.log("error with csv export");
                        res.status(400).send("Faild to export board no " + req.params.id + " tasks list to csv. msg:" + e);
                    }
                } else {
                    logger.log("error with csv export");
                    res.status(400).send("Faild to export board's tasks list to csv.");
                }
            });
    },
    //Get board statistics of Priority and Status from a specific board:
    async getBoardStatistics(req, res) {
        await Board.find({boardId: req.params.id}).exec()
            .then(board => {
                if(board.length == 1) {
                    let currentBoard = board[0];
                    let tasks = currentBoard.tasks;
                    let statusTask = [0, 0, 0];  //status[0] = To-Do, status[1] = In Progress, status[2] = Done
                    let priorityTask = [0, 0, 0]; //prior[0] = Low, prior[1] = Medium, prior[2] = High

                    for (const task of tasks) {
                        switch (task.status) {
                            case "To-do":
                                statusTask[0]++;
                                break;
                            case "In-progress":
                                statusTask[1]++;
                                break;
                            case "Done":
                                statusTask[2]++;
                                break;
                            default:
                                break;
                        }
                        switch (task.priority) {
                            case "Low":
                                priorityTask[0]++;
                                break;
                            case "Medium":
                                priorityTask[1]++;
                                break;
                            case "High":
                                priorityTask[2]++;
                                break;
                            default:
                                break;
                        }
                    }

                    let Charts = [{
                        type: 'doughnut',
                        data: {
                            labels: [
                                'To-Do',
                                'In-Progress',
                                'Done'
                            ],
                            datasets: [{
                                label: 'My First Dataset',
                                data: [statusTask[0], statusTask[1], statusTask[2]],
                                backgroundColor: [
                                    'rgb(255, 99, 132)',
                                    'rgb(54, 162, 235)',
                                    'rgb(255, 205, 86)'
                                ],
                                hoverOffset: 6
                            }]
                        }
                    },
                    {
                        type: 'bar',
                        data: {
                            labels: ['Low', 'Medium', 'High'],
                            datasets: [{
                                label: '# of Votes',
                                data: [priorityTask[0], priorityTask[1], priorityTask[2]],
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    }]
                    res.json(Charts);
                }
            })

    }
}
