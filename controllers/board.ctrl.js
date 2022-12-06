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
        console.log(req.params.id);
        await Board.find({BoardId:req.params.id}).exec()
            .then(docs => {
                res.json(docs)
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
        await Board.find({BoardId: req.params.id}).exec()
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
                    const result = await Board.findOneAndUpdate({BoardId: req.params.id}, board[0]);
                    res.json(result);
                }
            })
            .catch(err => {
                console.log(`Error getting data from DB:${err}`)
            });
    },
    async updateBoard(req, res) {
        await Board.find({BoardId: req.params.id}).exec()
            .then(async board => {
                if (board.length == 1) {
                    board[0].BoardName = req.body.BoardName;
                    const result = await Board.findOneAndUpdate({BoardId: req.params.id}, board[0]);
                    res.json(result);
                }
            })
            .catch(err => {
                console.log(`Error getting data from DB:${err}`)
            });
    },
    async deleteBoard(req, res) {
        const result = await Board.findOneAndDelete({BoardId: req.body.BoardId});
        res.json(result);
    },
    async deleteTask(req, res) {
        await Board.find({BoardId: req.params.id})
            .then (async board => {
                if (board.length == 1) {
                    board[0].Tasks = board[0].Tasks.filter(task => task.TaskId != req.body.TaskId);
                    const result = await Board.findOneAndUpdate({BoardId: req.params.id}, board[0]);
                    res.json(result);
                }
            })
            .catch(err => {
                console.log(`Error getting data from DB:${err}`)
            });
    },
    async filterBoardByParameters(req, res) {
        await Board.find({BoardId: req.params.id})
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
        await Board.find({BoardId: req.params.id})
            .then(async board => {
                if (board.length == 1) {
                    if (req.body.hasOwnProperty('TaskDetails'))
                        board[0].Tasks.find(task => task.TaskId == req.body.TaskId).TaskDetails = req.body.TaskDetails;
                    if (req.body.hasOwnProperty('Assignee'))
                        board[0].Tasks.find(task => task.TaskId == req.body.TaskId).Assignee = req.body.Assignee;
                    if (req.body.hasOwnProperty('Status'))
                        board[0].Tasks.find(task => task.TaskId == req.body.TaskId).Status = req.body.Status;
                    await Board.findOneAndUpdate({BoardId: req.params.id}, board[0]);
                    res.json(board[0]);
                }
            })
            .catch(err => {
                console.log(`Error getting data from DB:${err}`)
            });
    }
}
