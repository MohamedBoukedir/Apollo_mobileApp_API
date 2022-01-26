var express = require("express");
var router = express.Router();
const auth = require("../middelwares/auth");

const SharedNote_handler = require("../Controllers/Note_controller.js");

router.post("/add", (req, res) => SharedNote_handler.add_Note(req, res));
router.post("/getNotes", (req, res) => SharedNote_handler.get_Notes(req, res));

module.exports = router;
