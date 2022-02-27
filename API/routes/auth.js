const express=require('express');
const User = require('../models/User');
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
//REGISTER
//url:http://localhost:5000/api/auth/register
router.post('/register', async (req,res)=>{
    
    const newUser = new User({
        username : req.body.username,
        email : req.body.email,
        password : await bcrypt.hash(req.body.password, 10)

    })
    try {
        const savedUser = await newUser.save() 
        const token = jwt.sign({ userId: savedUser._id }, process.env.SECRET_PASS);
        res.status(201).json({savedUser, token})
    } catch (err) {
        res.status(500).json(err)
    }
})
//LOGIN
//url:http://localhost:5000/api/auth/login
router.post('/login', async (req, res)=>{
const {email, password} = req.body;
try {
    let user = await User.findOne({ email})
    if  (!user) {
    return res.status(404).json({ msg: "this email has no account"})
    }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res.status(400).json({ msg: "wrong credentials"})
  } 
  const token = jwt.sign(
      {userId : user._id }, process.env.SECRET_PASS , {
          expiresIn : "7days",
      }
  )
  res.status(200).json({user, token})
} catch (error) {
  res.status(500).json({ msg : error.message})  
}
})
module.exports = router