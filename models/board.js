const {Schema, model} = require("mongoose");

const taskSchema = new Schema({
    TaskId: {type:Number, index:1},
    TaskName: String,
    TaskDetails: String,
    Status: String,
    Priority: String,
    Type: String,
    Assignee: String,
    Creator: String
})
const boardSchema = new Schema({
    BoardId : {type: Number, unique: 1, index:1},
    BoardName : String,
    Tasks: Array
    // Employees: Array
},{collection:'Boards', versionKey:false})

const Task = model('Task', taskSchema);
const Board = model('Board',boardSchema);

module.exports = {Task,Board};
