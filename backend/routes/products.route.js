import express from "express"
import Product from "../models/product.model.js";
import { postProducts, getProducts,  updateProducts, deleteProducts } from "../controller/controller.product.js"

const router = express.Router();


//get endpoint
router.get("/" , getProducts);


//post endpoint
router.post("/" , postProducts);


//delete endpoint
router.delete("/:id" ,deleteProducts );


//update endpoint , can use patch as well
router.put("/:id" ,updateProducts );




export default router;