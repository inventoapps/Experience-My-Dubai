import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      
      const secret = process.env.ADMIN_JWT_SECRET;
      if (!secret) throw new Error("Missing ADMIN_JWT_SECRET");

      const token = jwt.sign(
        { email, role: "admin" },
        secret,
        { expiresIn: "7d" }
      );

      const res = NextResponse.json({ message: "Logged In" }, { status: 201 });
      res.cookies.set("adminToken", token, 
        { httpOnly: true , 
          secure:process.env.NODE_ENV === "production" ,
          sameSite:"none"
        
        });

      return res;
    }

    return NextResponse.json({ message: "Invalid Credential" }, { status: 401 });

  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
