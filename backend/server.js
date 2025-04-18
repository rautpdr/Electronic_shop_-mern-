//entry point for API
import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import Productrouter from './routes/products.route.js';

const app = express();//creating express object

app.use(express.json());//allows to use JSON data in body.

app.use("/api/products" , Productrouter);

dotenv.config()// to create endpoints

const PORT = process.env.PORT || 5000

//console.log(process.env.MONGO_URI); //for debugging


//listen to port 5000
app.listen(PORT , ()=>{
    connectDB(); //calling connectDB from db.js to estabilish connection

    console.log("Server is running on port 5000 http://localhost:"+PORT);
});