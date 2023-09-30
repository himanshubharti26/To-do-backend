const {Schema, model} = require("mongoose");


const  taskSchema = new Schema({
    id:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:false,
        default:""
    },
    dueDate:{
        type: Date,
        required:false,
        default:new Date()
    },
    status:{
        type:String,
        required:false,
        default:"INCOMPLETE"
    }
})

const TaskModel = model("tasks",taskSchema);

module.exports =  TaskModel;