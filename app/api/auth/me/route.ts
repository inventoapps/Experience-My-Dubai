import { connectDB } from '@/lib/mongodb'
import User from '@/models/user'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'


export async function  GET(req:NextRequest) {
    try {
        await connectDB();
        const token = req.cookies.get('token')?.value;

        if(!token){
            return NextResponse.json({user:null},{status:401});
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET!) as {id : string};

        const user = await User.findById(decoded.id).select('-password');
        return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}