const {Board,Task} = require('../models/board');

exports.boardDbController = {
    async getBoards(req, res) {
        await Board.find({}).exec()
            .then(docs => {
                res.json(docs)
            })
            .catch(err => {
                console.log(`Error getting data from DB:${err}`)
            });
    },
    async getBoardById(req, res) {
        console.log("Board Id ="+req.params.id);
        await Board.find({BoardId:req.params.id}).exec()
            .then(docs => {
                console.log(docs[0]);
                res.json(docs[0])
            })
            .catch(err => {
                console.log(`Error getting data from DB:${err}`)
            });
    },
    async createNewBoard(req, res) {
        await Board.find({}).sort(`-BoardId`).limit(1).exec()
            .then(docs => {
                let newId = 1;
                if (docs.length == 1)
                    newId = docs[0].BoardId + 1;
                const newBoard = new Board({
                    BoardId: newId,
                    BoardName: req.body.BoardName,
                    Tasks: []
                });
                const result = newBoard.save();
                if (result) {
                    res.json(result);
                } else {
                    res.status(404).send("Error saving board");
                }
            })
            .catch(err => {
                console.log(`Error getting data from DB:${err}`)
            });
    },
    async createNewTask(req, res) {
        await Board.find({BoardId: req.body.BoardId}).exec()
            .then(async board => {
                if (board.length == 1) {
                    let taskId = 1;
                    if (board[0].Tasks.length > 0)
                        taskId = board[0].Tasks[board[0].Tasks.length - 1].TaskId + 1;
                    const newTask = new Task({
                        TaskId: taskId,
                        TaskName: req.body.TaskName,
                        TaskDetails: req.body.TaskDetails,
                        Status: req.body.Status,
                        Priority: req.body.Status,
                        Type: req.body.Type,
                        Assignee: req.body.Assignee,
                        Creator: req.body.Creator
                    });
                    board[0].Tasks.push(newTask);
                    const result = await Board.findOneAndUpdate({BoardId: req.body.BoardId}, board[0]);
                    res.json(result);
                }
            })
            .catch(err => {
                console.log(`Error getting data from DB:${err}`)
            });
    },
    async updateBoard(req, res) {
        await Board.find({BoardId: req.body.BoardId}).exec()
            .then(async board => {
                if (board.length == 1) {
                    board[0].BoardName = req.body.BoardName;
                    const result = await Board.findOneAndUpdate({BoardId: req.body.BoardId}, board[0]);
                    res.json(result);
                }
            })
            .catch(err => {
                console.log(`Error getting data from DB:${err}`)
            });
    },
    async deleteBoard(req, res) {
        const result = await Board.findOneAndDelete({BoardId: req.body.BoardId});
        res.json("");
    },
    async deleteTask(req, res) {
        await Board.find({BoardId: req.body.BoardId})
            .then (async board => {
                if (board.length == 1) {
                    board[0].Tasks = board[0].Tasks.filter(task => task.TaskId != req.body.TaskId);
                    await Board.findOneAndUpdate({BoardId: req.body.BoardId}, board[0]);
                    res.json(`Task ${req.body.TaskId} deleted`);
                }
            })
            .catch(err => {
                console.log(`Error getting data from DB:${err}`)
            });
    },
    async filterBoardByParameters(req, res) {
        await Board.find({BoardId: req.body.BoardId})
            .then ( board => {
                if (board.length == 1) {
                    if (req.body.hasOwnProperty('Priority'))
                        board[0].Tasks = board[0].Tasks.filter(task => task.Priority === req.body.Priority);
                    if (req.body.hasOwnProperty('Assignee'))
                        board[0].Tasks = board[0].Tasks.filter(task => task.Assignee === req.body.Assignee);
                    if (req.body.hasOwnProperty('Type'))
                        board[0].Tasks = board[0].Tasks.filter(task => task.Type === req.body.Type);
                    if (req.body.hasOwnProperty('Status'))
                        board[0].Tasks = board[0].Tasks.filter(task => task.Status === req.body.Status);
                    res.json(board[0].Tasks);
                }
            })
            .catch(err => {
                console.log(`Error getting data from DB:${err}`)
            });
    },
    async updateTask(req, res) {
        await Board.find({BoardId: req.body.BoardId})
            .then(async board => {
                if (board.length == 1) {
                    if (req.body.hasOwnProperty('TaskDetails'))
                        board[0].Tasks.find(task => task.TaskId == req.body.TaskId).TaskDetails = req.body.TaskDetails;
                    if (req.body.hasOwnProperty('Assignee'))
                        board[0].Tasks.find(task => task.TaskId == req.body.TaskId).Assignee = req.body.Assignee;
                    if (req.body.hasOwnProperty('Status'))
                        board[0].Tasks.find(task => task.TaskId == req.body.TaskId).Status = req.body.Status;
                    if (req.body.hasOwnProperty('TaskName'))
                        board[0].Tasks.find(task => task.TaskId == req.body.TaskId).TaskName = req.body.TaskName;
                    if (req.body.hasOwnProperty('Priority'))
                        board[0].Tasks.find(task => task.TaskId == req.body.TaskId).Priority = req.body.Priority;
                    if (req.body.hasOwnProperty('Type'))
                        board[0].Tasks.find(task => task.TaskId == req.body.TaskId).Type = req.body.Type;
                    if (req.body.hasOwnProperty('Priority'))
                        board[0].Tasks.find(task => task.TaskId == req.body.TaskId).Priority = req.body.Priority;

                    await Board.findOneAndUpdate({BoardId: req.body.BoardId}, board[0]);
                    res.json(board[0]);
                }
            })
            .catch(err => {
                console.log(`Error getting data from DB:${err}`)
            });
    }
}

// function boardChecks(id) {
//     const ifExits = boardsRepository.searchBoard(id);
//     if(ifExits == null) {
//         return 'Error! boarder no ' + id + ' is not found!';
//     }
//     return true;
// }
//
//
// exports.boardsController = {
//
//     getBoards(req, res) {
//         logger.log("Getting all boards");
//         res.status(200).json(boardsRepository.getAllBoards());
//     },
//
//     getBoard(req, res) {
//         const result = boardChecks(req.params.id);
//         if (result != true) {
//             res.status(400).send(result);
//         }
//         else {
//             logger.log("getting board no " + req.params.id);
//             res.status(200).json(boardsRepository.searchBoard(req.params.id));
//         }
//     },
//
//     updateBord(req, res) {
//         const result = boardChecks(req.body.id);
//         if(result !=  true) {
//             res.status(400).send(msg);
//         }
//         else {
//             boardsRepository.updateBoard(req.body);
//             logger.log("update a board no " +  req.body.id);
//             res.status(200).send('Board no ' + req.body.id + ' is updated');
//         }
//     },
//
//     deleteBoard(req, res) {
//         const result = boardChecks(req.body.id);
//         if(result != true) {
//             res.status(400).send(result);
//         }
//         else {
//             boardsRepository.deleteBoard(req.body);
//             logger.log("delete a board");
//             res.status(200).send('Board no ' + req.body.id + ' is deleted');
//         }
//     },
//
//     createNewBoard(req, res) {
//         boardsRepository.createNewBoard(req.body);
//         logger.log("creating a new board");
//         res.status(200).send('The board is created');
//     },
//
//     createNewTask(req,res) {
//         const result = boardChecks(req.body.BoardId);
//         if(result != true) {
//             res.status(400).send(result);
//         } else {
//             boardsRepository.createNewTask(req.body);
//             logger.log("adding a new task");
//             res.status(200).send('The task is added to the bord');
//         }
//     },
//
//     deleteTask(req, res) {
//         console.log(req.body);
//         const result = boardChecks(req.body.BoardId);
//         if(result != true) {
//             res.status(400).send(result);
//         } else if(boardsRepository.deleteTask(req.body) == false) {
//             res.status(400).send('task no ' + req.body.TaskId + ' is not found');
//         } else {
//             logger.log('task no ' + req.body.TaskId + ' is deleted');
//             res.status(200).send('task no ' + req.body.TaskId + ' is deleted');
//         }
//     },
//
//     updateTask(req,res) {
//         const result = boardChecks(req.body.BoardId);
//         if(result != true) {
//             res.status(400).send(result);
//         } else {
//             boardsRepository.updateTask(req.body);
//             logger.log("updateTask");
//             res.status(200).send('Tasks no ' + req.body.TaskId + " is edited");
//         }
//
//     },
//
//     exportBoardToCSV(req , res) {
//         const result = boardChecks(req.params.id);
//         if(result != true) {
//             res.status(400).send(result);
//         }
//         else {
//             try {
//                 const csv = boardsRepository.exportToCsv(req.params.id);
//                 logger.log("exportBoardToCSV");
//                 res.attachment("tasks.csv");
//                 res.status(200).send(csv);
//             } catch (error) {
//                 logger.log("error");
//                 res.status(400).send("Faild to export board no " + req.params.id + " tasks list to csv. Error: " + error);
//             }
//         }
//     }
// }

