import Product from "../models/product.model.js";
import mongoose from "mongoose";



export const getProducts = async(req , res) => {
    try{
        const products = await Product.find({});//find({}) {}means list out all the products
        console.log(products)
        res.status(200).json({success:true , message:"All the products..."})
    }
    catch(error){
        console.error("error in finding all products" , error.message)
        res.status(500).json({success:false , message:"Error..."})
        
    }

}


export const postProducts = async (req , res)=>{
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

}

export const deleteProducts = async (req , res) => {
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
}

export const updateProducts = async (req , res) => {
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
}