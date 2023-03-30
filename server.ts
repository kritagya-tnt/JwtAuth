require("dotenv").config();
import express from "express";
import apiRouter from "./router/apiRouter";
import userRouter from "./router/userRouter";
require("./config/database").connect();
///////////////////
// can alsi be done above connection from here like this
//import mongoose from "mongoose";
//mongoose.connect(process.env.MONGO_URL || "");
//const db = mongoose.connection;
//db.on("connected",()=> console.log("DAtabase connected"));
///////////////////

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}));

//middleware can be used like this to which apply to all routes
//app.use(appLogger);

app.get("/",(req,res)=>{
    res.send("hello welcome");
});

//using router i.e apiRouter and userRouter
app.use("/api",apiRouter);
app.use("/user",userRouter);

app.listen(3000,()=>{
    console.log("Server running in 3000");
});