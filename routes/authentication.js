var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const projectdb = require("../Models/Project.js");
const taskdb = require("../Models/Task");

const User = require("../Models/User");

router.post("/login", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { password, email } = req.body;
    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5h",
        }
      );
      // save user token
      user.token = token;
      // user
      // user projects
      const userProjects = [];
      const tasks = await taskdb.find({});
      const projectes = await projectdb.find({});
      projectes.forEach((project) => {
        if (project.userid == user.email) {
          tasks.forEach((task) => {
            if (task.project_id == project._id) {
              project.tasks.push(task);
            }
          });
          userProjects.push(project);
        }
      });
      return res.status(200).json({
        user: user._id,
        name: user.name,
        password: user.password,
        projects: userProjects,
        email: user.email,
        token: user.token,
      });
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

router.post("/register", async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const { name, password, email } = req.body;
    // Validate user input
    if (!(email && password && name)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedUserPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      name: name,
      email: email.toLowerCase(), // sanitize
      password: encryptedUserPassword,
      projectes: [],
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "5h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(200);
    res.end();
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

module.exports = router;
