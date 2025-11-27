import { connectDB } from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try {
        await connectDB();
        const allEnquiries = await Enquiry.find({}).sort({createdAt:-1});
        return NextResponse.json({allEnquiries: allEnquiries},{status:200});
        
    } catch (error) {
        console.log("Error In fetching Enquiries", error);
        return NextResponse.json({error:"Something went wrong"},{status:200});
    }
}