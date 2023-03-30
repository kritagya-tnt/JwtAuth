// acts as a middleware used to authenticate the users

import express from "express";
import jwt from "jsonwebtoken";

let appLogger = (req:express.Request,res:express.Response,next:express.NextFunction)=>{
    const token = req.body.token || req.query.token || req.headers["access-token"];

    if(!token){
        //403 is forbidden
        return res.status(403).send("Token required");
    }
    try{
        let foundUser = jwt.verify(token, process.env.PRIV_KEY || "");
        
        req.user = foundUser;
    }catch(e){
        //401 is unauthorized
        return res.status(401).send("Invalid token");
    }
    return next();
}

export default appLogger;