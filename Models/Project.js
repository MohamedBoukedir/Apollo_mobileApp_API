const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const projectSchema = new Schema({
    title :{
        type :String
    },
    description :{
        type:String
    },
    userid :{
        type :String,
    },
    tasks :Array,
},{timestamps :true})

var Projectdb=mongoose.model('project',projectSchema);
module.exports =Projectdb;