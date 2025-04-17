import mongoose from "mongoose";

const productschema = new mongoose.Schema({
    name:{
        type:String, //type for name
        required:true // is it required
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },

}, {
    timestamps: true // this will make sure whenever product is created it will have createdAt , updatedAt field
});

const Product = mongoose.model("Product" , productschema); // telling monggose to create model(collection) named Product and should have schema as passed.

export default Product;