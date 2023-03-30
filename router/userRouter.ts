//router for users

require("dotenv").config();
import express from "express";
import User from "../model/user";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import appLogger from "../middleware/appLogger";
const userRouter:express.Router = express.Router();

/*
    @usage : test url
    @url : http://localhost:3000/user/
    @method : get
    @fields : none
    @access : PUBLIC
*/

userRouter.get("/",appLogger,(req:express.Request,res:express.Response)=>{
    res.status(200).send("Welcome to user home page");
    //200 status code means success
});

/*
    @usage : to check the form data
    @url : http://localhost:3000/user/login
    @method : post
    @fields : name , password
    @access : PUBLIC
*/

userRouter.post("/register",async (req,res)=>{
    try {
        const {full_name, email, password} = req.body;

        if(!(full_name && email && password)){
            //400 status code means bad request/client error
            res.status(400).send("Input fields required");
        }

        //check if user already exist
        const oldUser = await User.findOne({email});
        if(oldUser){
            //409 is conflict error
            return res.send(409).send("User already exist.");
        }

        let encrypted_password:string = await bcrypt.hash(password,10); 

        //create user 
        const user = await User.create({
            full_name,
            email,
            password : encrypted_password,
        });

        //token
        const token = jwt.sign({email},
            process.env.PRIV_KEY || "");
        
        user.token = token;
        
        //201 is new resource created
        res.status(201).json({
            full_name : user.full_name,
            email : user.email,
            token : user.token
        });
    }catch(e){
        console.log(e);
    }
})


userRouter.post("/login",async (req,res)=>{
    try {
        const {email, password} = req.body;

        if(!(email && password)){
            // 400 is bad request/ client side error
            res.status(400).send("Enter both email and password");
        }

        const user = await User.findOne({email});

        if(user && (await bcrypt.compare(password,user.password))){
            const token = jwt.sign(
                {email},
                process.env.PRIV_KEY || ""
            );
            user.token = token;
            res.status(200).json({
                full_name : user.full_name,
                email : user.email,
                token : user.token
            });
        }
        res.status(400).send("Invalid Credentials");
    }catch(e){
        console.log(e);
    }
});


export default userRouter;