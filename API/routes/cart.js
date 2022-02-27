const express=require('express');
const Cart = require('../models/Cart');
const { find } = require('../models/Product');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const router = express.Router();

// CREATE
//url:http://localhost:5000/api/carts
router.post('/', verifyToken,  async(req, res)=>{
    const newCart = new Cart(req.body)
    try {
       const savedCart = await newCart.save()
       res.status(200).json(savedCart)
    } catch (err) {
        res.status(500).json(err)
    }
    })
    
    
    //UPDATE
    //url:http://localhost:5000/api/carts/:id
   
    router.put('/:id', verifyTokenAndAuthorization, async(req,res)=>{
     
     try {
         const updatedCart = await Cart.findByIdAndUpdate( 
             req.params.id, 
             {$set: req.body
             }, {new : true})
         res.status(200).json(updatedCart)
        } catch(err){
            res.status(500).json(err)
        }
    })
    //DELETE
     //url:http://localhost:5000/api/carts/:id

    router.delete('/:id', verifyTokenAndAuthorization, async(req,res)=> {
        try {
            await Cart.findByIdAndDelete(req.params.id)
            res.status(200).json('Product has been deleted')
        } catch (err) {
            res.status(500).json(err)
        }
    })
    
    //GET USER CART
     //url:http://localhost:5000/api/carts/userId
    router.get('/find/:userId', verifyTokenAndAuthorization, async(req,res)=> {
        try {
            const cart = await Cart.findOne({ userID: req.params.userId})
            res.status(200).json(cart)
        } catch (err) {
            res.status(500).json(err)
        }
    })
    // GET ALL
     //url:http://localhost:5000/api/carts/
    router.get('/', verifyTokenAndAdmin, async(req,res)=>{
        try {
          const carts = await Cart.find()
          res.status(200).json(carts)  
        } catch (err) {
          res.status(500).json(err)  
        }
    })

module.exports = router