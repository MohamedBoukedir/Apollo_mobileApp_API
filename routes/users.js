var express = require('express');
var router = express.Router();
const auth = require("../middelwares/auth");



const user_handler=require("../Controllers/user_controller.js");

/* GET users listing. */
router.get('/',auth, (req,res)=> user_handler.get_all_users(req,res));
router.post('/',auth, (req,res)=>  user_handler.add_user(req,res));

router.put('/addparticipant',auth, (req,res)=>  user_handler.add_participant(req,res));

router.get('/:userid', auth,(req,res)=>  user_handler.get_user(req,res));
router.put('/:userid', auth,(req,res)=>  user_handler.update_user(req,res));




module.exports = router;
