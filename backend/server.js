//entry point for API
import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';
import mongoose from 'mongoose';

const app = express();//creating express object

app.use(express.json());//allows to use JSON data in body.

dotenv.config()// to create endpoints

//get endpoint
app.get("/api/products" , async(req , res) => {
    try{
        const products = await Product.find({});//find({}) {}means list out all the products
        console.log(products)
        res.status(200).json({success:true , message:"All the products..."})
    }
    catch(error){
        console.error("error in finding all products" , error.message)
        res.status(500).json({success:false , message:"Error..."})
        
    }

});


//post endpoint
app.post("/api/products" , async (req , res)=>{
    const product = req.body; //user will send this data

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false , message : "Please fill all fields" });
    }
    const newProduct = new Product(product);//creates new product , Product = collection named Product , product = user data

    try{
        await newProduct.save(); //save to db
        res.status(201).json({success:true , data:newProduct});
    }catch(error){
        console.error("error in creating product" , error.message)
        res.status(500).json({success:false , message : "Error in saving product" });
    }

});


//delete endpoint
app.delete("/api/products/:id" , async (req , res) => {
    const {id} = req.params
    //console.log("id" , id); //debug

    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true , message : "Product deleted" });
    }
    catch(error){
        console.error("error in deleting product" , error.message)
        res.status(500).json({success:false , message : "Error in deleting product" });
    }
});


//update endpoint , can use patch as well
app.put("/api/products/:id" , async (req , res) => {
    const {id} = req.params
    //console.log(id);

    if(!mongoose.Types.ObjectId.isValid(id)){ //checking if id is valid or not
        return res.status(400).json({success:false , message : "Invalid id" });
    }

    try{
        const product = await Product.findByIdAndUpdate(id , req.body , {new : true});
        res.status(200).json({success:true , message:"updated successfully"});
    }
    catch(error){
        console.error("error in updating product" , error.message);
        res.status(500).json({success:false , message : "Error in updating product" });
    }
});

//console.log(process.env.MONGO_URI); //for debugging


//listen to port 5000
app.listen(5000 , ()=>{
    connectDB(); //calling connectDB from db.js to estabilish connection

    console.log("Server is running on port 5000 http://localhost:5000");
});