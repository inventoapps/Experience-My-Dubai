import User from "@/models/user";
import { error } from "console";
import { NextRequest,NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import jwt from 'jsonwebtoken'


export async function POST(req:NextRequest) {
    try {
        const {name,phone,email,password} = await req.json();

      

        if(!name || !phone || !email || !password){
            return NextResponse.json({message:"All Fields are required"},{status:400});
        }

        await connectDB();

        const existingUser = await User.findOne({email});

        if(existingUser){
            return NextResponse.json({message:"User already exists"},{status:400});
        }
        
        const user = await User.create({
        name,
        phone,
        email,
        password,
    });

       const token = jwt.sign(
             { id: user._id, isAdmin: user.isAdmin },
             process.env.JWT_SECRET!,
             { expiresIn: "7d" }
        );
       

       const res =  NextResponse.json({message:"User Created" , data : user },{status:200});
        res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res;

        
    } catch (error) {
        console.log("Error in Registering User", error);
        return NextResponse.json({error:"Internal Server Error"},{status:500});     
    }
}
