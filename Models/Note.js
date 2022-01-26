const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema(
  {
    note: String,
    project_id: String,
    userName: String,
    task_id: String,
  },
  { timestamps: true }
);

var Notedb = mongoose.model("Note", NoteSchema);
module.exports = Notedb;
