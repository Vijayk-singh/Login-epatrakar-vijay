var express = require('express');
var router = express.Router();
var User = require("../models/usersModel");
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
// var fetchid = require('../Middlew/middlew');
// const { token } = require('morgan');
/* GET home page. */
var JWT_SECRET ='youk$t^a&pxg%l';


router.post('/', async function(req, res, next) {
    
//   res.send('my name is api');
  var {name,password} = req.body;
  let success = false;
  console.log("hello")
  let userr = await User.findOne({name} );
  if(!userr){
    return res.status(400).json({error: "invalid user cred"});
  }
  else {console.log(userr.password)
  const passwordCompare = await bcrypt.compare(password, userr.password);
  if(!passwordCompare){
    success = false
    return res.status(400).json({error: "invalid user cred"});
  }
  // const data = {
  //   user:userr._id,
  // }
  const data = userr._id;
let z =data;
  
  const authtoken = jwt.sign({id:userr._id}, JWT_SECRET,{expiresIn: '24h'});
    success = true;

    const {n} = jwt.verify(authtoken,JWT_SECRET);
    //m= n._id
    res.json({ z, authtoken,success })
    console.log(z)

}

});

//get user


module.exports = router;