const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const projectSchema = new Schema({
    title :{
        type :String
    },
    description :{
        type:String
    }
    ,
    tasks : {
        type :Array, // array of task
    },
    users :{
        type :Array,
    }
},{timestamps :true})

var Projectdb=mongoose.model('project',projectSchema);
module.exports =Projectdb;