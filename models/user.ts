import mongoose from "mongoose";
import bcrypt from "bcryptjs";

interface IUser {
    name : string;
    phone : string;
    email : string;
    password : string;
    isAdmin : boolean;
    _id? : mongoose.Types.ObjectId;
    createdAt? : Date;
    updatedAt? : Date;
}


const userSchema = new mongoose.Schema<IUser>({
    name : {type : String , required:true},
    phone : {type : String, required:true},
    email : {type:String , required:true},
    password : {type:String, required:true},
    isAdmin : {type:Boolean, default:false},
},{timestamps:true});

const User = mongoose.models?.user || mongoose.model<IUser>('User',userSchema);

export default User;