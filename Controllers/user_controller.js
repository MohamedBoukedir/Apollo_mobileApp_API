
const Userdb = require('../Models/User.js');
var ObjectId = require('mongodb').ObjectID;


function get_all_users(req, res) {
    Userdb.find({})
        .then((users) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(users);
        })
        .catch((err) => {
            console.log(err);
            res.statusCode = 201;
            res.end();
        })
}
function add_user(req, res) {
    Userdb.create(req.body)
        .then((user) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end();
        })
        .catch((err) => {
            res.statusCode = 201;
            res.end()
        });
}
function get_user(req, res) {
    var id = req.params.userid;
    Userdb.findById({_id:ObjectId(id.toString())})
        .then((user) =>{
            console.log(user);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user);
        })
        .catch((err)=> res.end());
}
function update_user(req,res){
    const id=req.params.userid;
    Userdb.findByIdAndUpdate(id, {
        $set: { "projectes" : req.body }
    }, { new: true }).then(() => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end();
    });
}
function add_participant(req,res){
    var data=req.body[0];
    Userdb.updateOne({"email" : data.email}, {
        $push : { "projectes" : data.project }
    }, { new: true }).then(() => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end();
    }).catch((err)=>{
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end();
    });
}

exports.get_all_users = get_all_users;
exports.add_user = add_user;

exports.get_user = get_user;
exports.update_user=update_user;
exports.add_participant=add_participant;

//req.params.leaderId