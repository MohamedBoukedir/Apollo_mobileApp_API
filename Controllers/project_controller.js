const projectdb = require('../Models/Project.js');
const taskdb=require('../Models/Task');

async function add_project(req, res) {
    const project=await projectdb.create({
        title :req.body.project.title,
        description :req.body.project.description,
        userid :req.body.project.user_id
    });
    let tasks=req.body.tasks;
    for(var i=0;i<tasks.length;i++){
        tasks[i].project_id=project._id;
    }
    console.log(tasks);
    taskdb.insertMany(tasks)
    .then(function(){ 
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end();
    }).catch(function(error){ 
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end();
    });
}

exports.add_project= add_project;