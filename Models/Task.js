
const mongoose =require('mongoose');
const Schema =mongoose.Schema;
const taskSchema = new Schema({
   description :String,
   finished :Boolean,
   project_id :String
},{timestamps :true})

var taskdb=mongoose.model('task',taskSchema);
module.exports =taskdb;
