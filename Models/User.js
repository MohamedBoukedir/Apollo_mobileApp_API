
const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const userSchema = new Schema({
    name :{
        type :String
    },
    password :{
        type:String
    },
    email  :{
        type :String
    },
    projectes : {
        type :Array,
    }
},{timestamps :true})

var Userdb=mongoose.model('user',userSchema);
module.exports =Userdb;