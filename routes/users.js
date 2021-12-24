var express = require('express');
var router = express.Router();

const user_handler=require("../Controllers/user_controller.js");

/* GET users listing. */
router.get('/', (req,res)=> user_handler.get_all_users(req,res));
router.post('/', (req,res)=>  user_handler.add_user(req,res));

router.put('/addparticipant', (req,res)=>  user_handler.add_participant(req,res));

router.get('/:userid', (req,res)=>  user_handler.get_user(req,res));
router.put('/:userid', (req,res)=>  user_handler.update_user(req,res));



module.exports = router;
