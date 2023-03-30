// router for api

import express from "express";
import appLogger from "../middleware/appLogger";
const apiRouter:express.Router = express.Router();

apiRouter.get("/",appLogger,(req:express.Request,res:express.Response)=>{
    res.status(200).send("Welcome to api home page");
});

apiRouter.get("/test",(req,res)=>{
    res.status(200).send("WElcome to api test page");
});

export default apiRouter;