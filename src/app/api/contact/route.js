const { NextResponse } = require("next/server");
const dbConnect = require("../lib/mongodb.js");              // default export
const ContactSubmission = require("../models/ContactSubmission.js"); // default export

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json(); // safer than destructuring directly
    const { fullName, email, subject, message } = body;

    console.log("Received data:", { fullName, email, subject, message });

    // Basic validation
    if (!fullName?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    const submission = await ContactSubmission.create({
      fullName: fullName.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    console.log("New submission saved:", submission._id);

    return NextResponse.json(
      { 
        success: true,
        message: "Thank you! Your message has been received."
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving contact:", error);
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to save message. Please try again later."
      },
      { status: 500 }
    );
  }
}