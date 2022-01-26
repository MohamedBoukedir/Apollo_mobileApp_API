var express = require("express");
var router = express.Router();
const auth = require("../middelwares/auth");

const user_handler = require("../Controllers/user_controller.js");

router.put("/addParticipant", auth, (req, res) =>
  user_handler.add_participant(req, res)
);
/* GET users listing. */

module.exports = router;
