const mongoose = require("mongoose")
require('dotenv').config();


const dbConnect=()=>{
    try{
        const conn = mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@food-app-cluster.lzey1qe.mongodb.net/food-app-client?retryWrites=true&w=majority&appName=food-app-cluster`,

        );
        console.log("Database Connected Successfully")
    }
    catch(error){
        console.log("Database error")
        throw new Error(error);
    }
};

module.exports=dbConnect;