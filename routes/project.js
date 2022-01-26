var express = require("express");
var router = express.Router();
const auth = require("../middelwares/auth");

const project_handler = require("../Controllers/project_controller.js");

router.post("/add", auth, (req, res) => project_handler.add_project(req, res));
router.post("/getProjectes", auth, (req, res) =>
  project_handler.get_projectes(req, res)
);
module.exports = router;
