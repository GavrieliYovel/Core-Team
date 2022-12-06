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
    createNewBoard(req,res) {
        Board.find({}).sort(`-BoardId`).limit(1)
            .then(docs => {
                let newId = docs[0].BoardId + 1;
                const newBoard = new Board({
                    BoardId : newId,
                    BoardName : req.body.BoardName,
                    Tasks: []
                });
                const result = newBoard.save();
                if(result){
                    res.json(result);
                } else{
                    res.status(404).send("Error saving board");
                }
            })
            .catch(err => {
                const newBoard = new Board({
                    BoardId : 1,
                    BoardName : req.body.BoardName,
                    Tasks: []
                });
                const result = newBoard.save();
                if(result){
                    res.json(result);
                } else{
                    res.status(404).send("Error saving board");
                }
        });

    }
}
