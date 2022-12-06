const fs = require('fs');
const Path = require('path');
const { EventEmitter } = require('events');
const converter = require('json-2-csv');


module.exports = class BoardsRepository extends EventEmitter {
    constructor() {
        super();
        this.connectBoardJSON();
    }

    connectBoardJSON() {
        const data = require('../data/boards.json');
        this.setBoards(data);
        this.on('updateBoards', () => {
            fs.writeFile(Path.join(__dirname, '../data/boards.json'), JSON.stringify(this.data), 'utf8', err => {
                if (err) 
                    throw err;
                console.log('File has been saved!');
            });
        });
        this.on('error', () => {
            console.log("Error");
        })
        return this;
    }

    setBoards(data) {
        this.data = data;
        this.emit('updateBoards');
    }

    getAllBoards() {
        return this.data;
    }

    searchBoard(id) {
        for (const key in this.data) { 
            if (this.data[key].BoardId == id) {
                return this.data[key];
            }       
        }
        return null;
    }
    

    updateBoard(payload) {
        this.data.find(board => board.BoardId == payload.id).BoardName = payload.name;
        this.emit('updateBoards');
    }


    createNewBoard(payload) {
        let newID = 1;
        if (this.data.length > 0)
            newID = this.data[this.data.length - 1].BoardId + 1;

        const newBoard = {
            BoardId: newID,
            BoardName: payload.BoardName,
            Tasks: [],
            Employees: []
        }
        this.setBoards([...this.data, newBoard]);
    }

    deleteBoard(payload) {
        this.data = this.data.filter(board => board.BoardId != payload.id);
        this.emit('updateBoards');
    }


    /************createTasks******************/
    setTaskByBoard(boardId,data) {
        this.data.find(board => board.BoardId == boardId).Tasks = data;
    }
    updateTaskByBoard(payload, boardId){
        this.setTaskByBoard(boardId, [...this.data.find(board => board.BoardId == boardId).Tasks, payload]);
        this.emit('updateBoards');
    }
    createNewTask(payload) {
        let newID = 1;
        if (this.data.find(board => board.BoardId == payload.BoardId).Tasks.length > 0)
            newID = this.data.find(board => board.BoardId == payload.BoardId).Tasks[this.data.find(board => board.BoardId == payload.BoardId).Tasks.length - 1].TaskId + 1;
        console.log(newID);
        const newTask = {
            TaskId: newID,
            TaskName: payload.TaskName,
            TaskDetails: payload.TaskDetails,
            Status: payload.Status,
            Priority: payload.Priority,
            Type: payload.Type,
            Assignee: payload.Assignee,
            Creator: payload.Creator
        }
        console.log(newTask);
        this.updateTaskByBoard(newTask, payload.BoardId);
    }
    updateTask(payload){
        console.log(payload.TaskId)
        if (payload.hasOwnProperty('Type'))
            this.data.find(board => board.BoardId == payload.BoardId).Tasks.find(task => task.TaskId == payload.TaskId).Type = payload.Type;
        if (payload.hasOwnProperty('Priority'))
            this.data.find(board => board.BoardId == payload.BoardId).Tasks.find(task => task.TaskId == payload.TaskId).Priority = payload.Priority;
        if (payload.hasOwnProperty('TaskName'))
            this.data.find(board => board.BoardId == payload.BoardId).Tasks.find(task => task.TaskId == payload.TaskId).TaskName = payload.TaskName;
        if (payload.hasOwnProperty('TaskDetails'))
            this.data.find(board => board.BoardId == payload.BoardId).Tasks.find(task => task.TaskId == payload.TaskId).TaskDetails = payload.TaskDetails;
        if (payload.hasOwnProperty('Assignee'))
            this.data.find(board => board.BoardId == payload.BoardId).Tasks.find(task => task.TaskId == payload.TaskId).Assignee = payload.Assignee;
        if (payload.hasOwnProperty('Status'))
            this.data.find(board => board.BoardId == payload.BoardId).Tasks.find(task => task.TaskId == payload.TaskId).Status = payload.Status;
        this.emit('updateBoards');
    }
    deleteTask(payload) {

        if(this.data.find(board => board.BoardId == payload.BoardId) &&
            this.data.find(board => board.BoardId == payload.BoardId).Tasks.find(task => task.TaskId == payload.TaskId)) {
            this.data.find(board => board.BoardId == payload.BoardId).Tasks = this.data.find(board => board.BoardId == payload.BoardId).Tasks.filter(task => task.TaskId != payload.TaskId);
            this.emit('updateBoards');
        }
        else {
            this.emit('error');
            return "error";
        }
    }
    exportToCsv(boardId){
        let ListToDo=this.data.find(board => board.BoardId == boardId).Tasks;
        converter.json2csv(ListToDo, (err, csv) => {
            if (err) {
                throw err
            }
            fs.writeFileSync('tasks.csv', csv);
        })
    }
}