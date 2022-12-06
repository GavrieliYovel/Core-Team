const {Schema, model} = require("mongoose");

const boardSchema = new Schema({
    BoardId : {type: Number, unique: 1, index:1},
    BoardName : String,
    Tasks: Array
    // Employees: Array
},{collection:'Boards', versionKey:false})

const Task = model('Task', taskSchema);
const Board = model('Board',boardSchema);

module.exports = {Task,Board};
