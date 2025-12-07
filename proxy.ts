import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(req: NextRequest) {

  const url = req.nextUrl;
  const token = req.cookies.get("token")?.value;
  const adminToken = req.cookies.get('adminToken')?.value;
  // const key = url.searchParams.get("key");


  // // ADMIN PROTECTED ROUTE
  // if (url.pathname.startsWith("/admin")) {
  //   // Block admin if key is missing or wrong
  //   if (key !== process.env.MY_SECRET_ADMIN_KEY) {
  //     return NextResponse.redirect(new URL("/", req.url));
  //   }

  //  // Key is valid → allow admin pages to load
  //   return NextResponse.next();
  // }


  if(url.pathname.startsWith('/admin')){
    if(!adminToken){
      return NextResponse.redirect(new URL('/authorization/login'));
    }


    try {
      const decoded = jwt.verify(adminToken, process.env.ADMIN_JWT_SECRET!);
       
      if(typeof decoded !== "string"){
         req.nextUrl.searchParams.set('admin', decoded.role);
      }
      return NextResponse.next();
      
    } catch (error) {
       return NextResponse.redirect(new URL('/authorization/login'));
    }
  }


  
  // USER PROTECTED ROUTE (DASHBOARD)
  if (url.pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);

      if (typeof decoded !== "string") {
        req.nextUrl.searchParams.set("userId", decoded.id);
      }

      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
