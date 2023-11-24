
require("dotenv").config();   //for using environment variable which increases security
const express = require('express');
const app=express();
const mongoose = require('mongoose');
require("./db/conn")
const cors = require('cors');

const cloudinary=require("cloudinary");

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})

const cookieParser =require("cookie-parser")

const userrouter=require("./routes/user");
const bookrouter=require("./routes/book");



// app.use(express.json());
app.use(express.json({ limit: '10mb' }));  //so that payload too large error won't come
app.use(cookieParser("")); 
app.use(cors());

app.use("/user",userrouter);
app.use("/book",bookrouter);

const port=process.env.PORT;

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
    
});


