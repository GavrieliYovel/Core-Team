const {Schema, model} = require("mongoose");

const taskSchema = new Schema({
    taskId: {type:Number, index:1},
    taskName: String,
    taskDetails: String,
    status:{type:String, enum:("To-do","In-progress","Done")},
    priority: {type:String, enum:("Low","Medium","High")},
    type: {type:String, enum:("Bug","Feature")},
    assignee: String,
    creator: String
})
const boardSchema = new Schema({
    boardId : {type: Number, unique: 1, index:1},
    boardName : String,
    tasks: Array
    // Employees: Array
},{collection:'Boards', versionKey:false})

const Task = model('Task', taskSchema);
const Board = model('Board',boardSchema);

module.exports = {Task,Board};
