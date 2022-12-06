const {Schema, model} = require("mongoose");

const taskSchema = new Schema({
    id: {type:Number, index:1},
    taskName: String,
    taskDetails: String,
    status: {enum:['New','In-progress','Done']},
    priority: {enum:['Low','Medium','High']},
    type: {enum:['Bug','Feature']},
    assigneeId: [{type:Number}],
    creatorId: Number
},{collection:'Tasks', versionKey:false})

const boardSchema = new Schema({
    BoardId : {type: Number, unique: 1, index:1},
    BoardName : String,
    Tasks: Array
},{collection:'Tasks', versionKey:false})

const Task = model('Task', taskSchema);
const Board = model('Board',boardSchema);

module.exports = {Task,Board};