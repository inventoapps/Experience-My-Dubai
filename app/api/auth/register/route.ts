import User from "@/models/user";
import { error } from "console";
import { NextRequest,NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";


export async function POST(req:NextRequest) {
    try {
        const {name,phone,email,password} = await req.json();

        if(!name || !phone || !email || !password){
            return NextResponse.json({error:"All Fields are required"},{status:400});
        }

        await connectDB();

         const existingUser = await User.findOne({email});

        if(existingUser){
            return NextResponse.json({error:"User already exists"},{status:400});
        }

        await User.create({
        name,
        phone,
        email,
        password,
    });

       return NextResponse.json({message:"User Created"},{status:200});

        
    } catch (error) {
        console.log("Error in Registering User", error);
        return NextResponse.json({error:"Internal Server Error"},{status:500});     
    }
}
