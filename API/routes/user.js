const express=require('express');
const User = require('../models/User');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken');
const router = express.Router();

//UPDATE
//url:http://localhost:5000/api/users/:id 
router.put('/:id', verifyTokenAndAuthorization, async(req,res)=>{
 if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 10)
 }
 try {
     const updatedUser = await User.findByIdAndUpdate( 
         req.params.id, 
         {$set: req.body
         }, {new : true})
     res.status(200).json(updatedUser)
    } catch(err){
        res.status(500).json(err)
    }
})
//DELETE
//url:http://localhost:5000/api/users/delete/:id 
router.delete('/:id', verifyTokenAndAuthorization, async(req,res)=> {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('User has been deleted')
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET USER
//url:http://localhost:5000/api/users/find/:id 
router.get('/find/:id', verifyTokenAndAdmin, async(req,res)=> {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET AUTH USER
//url:http://localhost:5000/api/users/profile/:id 
router.get('/profile/:id', verifyToken, async(req,res)=> {
    try {
        //  const user = await User.findById(req.params.id)
        res.status(200).json({user:req.user})
    } catch (err) {
        res.status(500).json(err)
        clg(err)
    }
})
//GET THE AUTHENTIFIED USER
//url:http://localhost:5000/api/users/logged
router.get('/logged',verifyTokenAndAuthorization, async(req,res)=>{
    try {
        res.status(200).json({user:req.user})
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET ALL USERS
//url:http://localhost:5000/api/users/
//url:http://localhost:5000/api/users?new=true returning the latest 5 users
router.get('/', verifyTokenAndAdmin, async(req,res)=> {
    const query = req.query.new
    try {
        const users = query 
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find()
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET USERS STATS
//url:http://localhost:5000/api/users/stats
router.get('/stats', verifyTokenAndAdmin, async(req,res)=>{
const date = new Date()
const lastYear = new Date(date.setFullYear(date.getFullYear() -1 ))

try {
  const data = await User.aggregate([
      {$match : {createdAt : {$gte: lastYear}}},
      {$project: {month : {$month : `$createdAt`}}},
      {$group: {_id : `$month`, total : { $sum: 1} }}
  ]) 
  res.status(200).json(data)  
} catch (err) {
    res.status(500).json(err)
}
})
module.exports = router