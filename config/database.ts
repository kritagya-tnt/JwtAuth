//connect to the database

require("dotenv").config();
import mongoose from "mongoose";

exports.connect = ()=>{
    mongoose.connect(process.env.MONGO_URL || "");
}