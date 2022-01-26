var express = require("express");
var router = express.Router();
const auth = require("../middelwares/auth");

const task_handler = require("../Controllers/tasks_controller.js");

router.post("/add", auth, (req, res) => task_handler.add_task(req, res));
router.put("/update", auth, (req, res) => task_handler.update_task(req, res));
module.exports = router;
