// User model

import mongoose from "mongoose";

interface IUSer {
    full_name : string;
    email : string;
    password : string;
    token : string;
}

const userSchema = new mongoose.Schema({
    full_name : String,
    email : String,
    password : String,
    token : String
});

export default mongoose.model<IUSer>("user",userSchema);