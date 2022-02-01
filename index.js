const express = require('express');

require('dotenv').config();

// Using Node.js `require()`
const mongoose = require('mongoose');

const Books = require("./API/Book");
const Authors = require("./API/Author");
const Publication = require("./API/Publication");


//const database =require('./database');

const booky=express();

booky.use(express.json());


//Establish db connection

mongoose.connect( process.env.MONGO_URL).then(()=> console.log("Connection Establish 🔥!!!"));


 booky.use("/book",Books);
 booky.use("/author",Authors);
 booky.use("/book",Publication);



booky.listen(3000, ()=>{
    console.log("Server is running 🚀")
});