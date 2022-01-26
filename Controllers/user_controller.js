const Userdb = require("../Models/User.js");
const Projectdb = require("../Models/Project");

async function add_participant(req, res) {
  let projectid = req.body.projectid;
  let participantEmail = req.body.email;
  console.log(projectid, participantEmail);
  let users = await Userdb.findOne({ email: participantEmail });
  if (users) {
    Projectdb.findOneAndUpdate(
      { _id: projectid },
      { $addToSet: { usersid: participantEmail } },
      function (error) {
        if (error) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end();
        } else {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end();
        }
      }
    );
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end();
  }
}

exports.add_participant = add_participant;

//req.params.
