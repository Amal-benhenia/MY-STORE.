const express=require('express');
const Product = require('../models/Product');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken');
const router = express.Router();

// CREATE
//url:http://localhost:5000/api/products/
router.post('/', verifyTokenAndAdmin,  async(req, res)=>{
const newProdcut = new Product(req.body)
try {
   const savedProduct = await newProdcut.save()
   res.status(200).json(savedProduct)
} catch (err) {
    res.status(500).json(err)
}
})


//UPDATE
//url:http://localhost:5000/api/products/
router.put('/:id', verifyTokenAndAdmin, async(req,res)=>{
 
 try {
     const updatedProduct = await Product.findByIdAndUpdate( 
         req.params.id, 
         {$set: req.body
         }, {new : true})
     res.status(200).json(updatedProduct)
    } catch(err){
        res.status(500).json(err)
    }
})
//DELETE
//url:http://localhost:5000/api/products/
router.delete('/:id', verifyTokenAndAdmin, async(req,res)=> {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json('Product has been deleted')
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET Product
//url:http://localhost:5000/api/products/find/:id
router.get('/find/:id', async(req,res)=> {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch (err) {
        res.status(500).json(err)
    }
})
//GET ALL PRODUCTS
//url:http://localhost:5000/api/products/
//url:http://localhost:5000/api/products?new=true returning the latest users indicated in limit()
//url:http://localhost:5000/api/products?category=man returning the product within the category man for example
router.get('/', async(req,res)=> {
    const qNew = req.query.new
    const qCategory = req.query.category
    try {
        let products ;
     if (qNew){
        products = await Product.find().sort({createdAt : -1}).limit(1)
     } else if (qCategory){
        products = await Product.find({categories:{
            $in: [qCategory]
        }})
     } else {
         products = await Product.find()
     }
        
        
        res.status(200).json(products)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router