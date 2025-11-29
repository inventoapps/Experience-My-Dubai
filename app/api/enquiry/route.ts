import { connectDB } from "@/lib/mongodb";
import Enquiry from "@/models/Enquiry";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, email, phone, guests, arrivalDate, comments, pageUrl } = body;

    if (!name || !email || !pageUrl) {
      return NextResponse.json(
        { message: "All fields are required!" },
        { status: 400 }
      );
    }

    const enquiry = await Enquiry.create({
      name,
      email,
      phone,
      guests,
      arrivalDate,
      comments: comments || "",
      pageUrl,
    });

    

    await resend.emails.send({
      from: "onboarding@resend.dev", 
      to: "rohitjuyalp205@gmail.com",
      subject: `New Enquiry from ${name}`,
      replyTo: email,
      html: `
        <h3>New enquiry received!</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Guests:</strong> ${guests}</p>
        <p><strong>Arrival Date:</strong> ${arrivalDate}</p>
        <p><strong>Comments:</strong> ${comments || "No comments"}</p>
        <p><strong>Page URL:</strong> ${pageUrl}</p>
      `,
    });

    return NextResponse.json(
      {
        message: "Enquiry Created Successfully",
        enquiry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Enquiry POST Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
