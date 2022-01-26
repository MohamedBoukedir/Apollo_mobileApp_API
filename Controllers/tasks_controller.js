const taskdb = require("../Models/Task.js");

function add_task(req, res) {
  taskdb
    .create(req.body)
    .then((task) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        id: task._id,
        description: task.description,
        finished: task.finished,
        project_id: task.project_id,
      });
    })
    .catch(function (error) {
      console.log(error.message);
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end();
    });
}
function update_task(req, res) {
  taskdb
    .findOneAndUpdate(
      {
        _id: req.body.id,
      },
      req.body
    )
    .then(() => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end();
    })
    .catch(function (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end();
    });
}

exports.add_task = add_task;
exports.update_task = update_task;
