const projectdb = require("../Models/Project.js");
const taskdb = require("../Models/Task");

// SMLSDF
async function add_project(req, res) {
  const project = await projectdb.create({
    title: req.body.project.title,
    description: req.body.project.description,
    usersid: [req.body.project.users_id[0]],
  });
  let tasks = req.body.tasks;
  for (var i = 0; i < tasks.length; i++) {
    tasks[i].project_id = project._id;
  }
  taskdb
    .insertMany(tasks)
    .then(function () {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end();
    })
    .catch(function (error) {
      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      res.end();
    });
}
async function get_projectes(req, res) {
  const email = req.body.email;
  try {
    const userProjects = [];
    const tasks = await taskdb.find({});
    const projectes = await projectdb.find({});
    projectes.forEach((project) => {
      let usersemails = project.usersid;
      usersemails.forEach((useremail) => {
        if (useremail == email) {
          tasks.forEach((task) => {
            if (task.project_id == project._id) {
              task.id = task._id;
              project.tasks.push(task);
            }
          });
          userProjects.push({
            title: project.title,
            description: project.description,
            users_id: project.usersid,
            id: project._id,
            tasks: project.tasks,
          });
          return;
        }
      });
    });
    return res.status(200).json(userProjects);
  } catch (err) {
    res.status(500);
    res.end();
  }
}

exports.get_projectes = get_projectes;
exports.add_project = add_project;
