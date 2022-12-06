const fs = require('fs');
const Path = require('path');
const { EventEmitter } = require('events');


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

}