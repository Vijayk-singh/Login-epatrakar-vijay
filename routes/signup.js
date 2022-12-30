var express = require("express");
var router = express.Router();
var User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');

var JWT_SECRET ='youk$t^a&pxg%l';
/* GET home page. */
router.post("/", async function (req, res, next) {
  //res.send('my name is api');
  var uname = req.body.name;
  var password = req.body.password;
  console.log(uname)
  let user = await User.findOne({ name: req.body.name });
  if (user) {
    return res.status(400).json({ error: "Sorry a user with this email already exists" })
  }
  // Encryption of the string password
  const salt = await bcrypt.genSalt(10);
  const hashp = await bcrypt.hash(password, salt);

   user = await User.create({
    name: uname,
    password: hashp,
  });
  res.json(user)
  const data = {
    user: {
      id: User.id
    }
  }
  
//   const authtoken = jwt.sign({id:user._id}, JWT_SECRET,{expiresIn: '24h'});
//   res.json({ authtoken })
});

module.exports = router;