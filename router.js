// const { errorHandler,showAllBoards,getTasksByBoard,
//     createNewTask, createNewBoard, deleteBoard,deleteTask,
//     filterBoardByParameters, updateTask,updateBoard, exportBoardToCSV, renderHomePage } = require('./controller');
const url = require('url');
const express = require('express');
const app = express();
const boardJson = require('./res/tasks.json');
//
// const ROUTES = {
//     GET: {
//         '/home': renderHomePage,
//         '/boards' : showAllBoards,
//         '/boards/id': getTasksByBoard
//     },
//     POST: {
//         '/boards': createNewBoard,
//         '/boards/id': createNewTask,
//         '/boards/id/filter': filterBoardByParameters
//     },
//     PUT: {
//         '/boards/id': updateBoard,
//         '/boards/id/tasks/id': updateTask
//     },
//     DELETE:{
//         '/boards/id': deleteBoard,
//         '/boards/id/tasks/id': deleteTask
//     }
// };

app.get('/',(req,res)=> res.send('Server root'));
app.get('/boards',(req,res)=> {});
app.get('/boards/:BoardId',(req,res)=> {
    const urlPart = url.parse(req.url,true);
    const boardId = urlPart.query.boardId;

    const foundBoard = boardJson.Boards.find(board => {
        return board.BoardId == boardId;
    });
    if(foundBoard){
        res.status(200);
    } else {
        res.status(200).json({"Error":"Board not found "})
    }
    res.send(`Showing results for boardId: ${req.params.BoardId}`);
})
app.post('/boards',(req,res)=> {
    const{ newBoard = []} = req.body;
    res.json({success: 1});
})





module.exports = (req, res) => {
    const pathName = new URL(req.url, `http://${req.headers.host}`).pathname;
    const handler = ROUTES[req.method][pathName];
    if (!handler) {
        return errorHandler(req, res);
    }

    return handler(req, res);
};