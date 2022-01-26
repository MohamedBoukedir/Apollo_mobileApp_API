const Userdb = require("../Models/User.js");
const Projectdb = require("../Models/Project");
const Notedb = require("../Models/Note");

function add_Note(req, res) {
  Notedb.create(req.body)
    .then(() => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end();
    })
    .catch(function (error) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end();
    });
}
async function get_Notes(req, res) {
  let task_id = req.body.task_id;
  let project_id = req.body.project_id;

  if (task_id != "") {
    let allNotes = await Notedb.find({ task_id: task_id });
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(allNotes);
  } else {
    let allNotes = await Notedb.find({ project_id: project_id });
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(allNotes);
  }
  res.end();
}
exports.add_Note = add_Note;
exports.get_Notes = get_Notes;

//req.params.
