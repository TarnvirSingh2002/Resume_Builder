// const User = require ("../../models/User");
// const bcrypt = require("bcrypt");
// const { NextResponse } = require("next/server");

// export async function POST(req) {
//   const { name, email, password } = await req.json()

//   console.log(name, email, password);
//   if (!name || !email || !password) {
//     return NextResponse.json({ message: "Enter all the details" }, { status: 400 })
//   }

//   await dbConnect();
   
//   const user = await User.findOne({email});
//   if(user){
//     return NextResponse.json({ message: "This user is already exists" }, { status: 401 })
//   }

//   const hashedPassword = await bcrypt.hash(password, 10)

//   const person = await User.create({
//     name,email,password:hashedPassword
//   })

//   return NextResponse.json({ success: true, message:person })
// }

import bcrypt from "bcrypt"
import { NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import User from "@/models/User"

export const runtime = "nodejs" // IMPORTANT for mongoose

export async function POST(req) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Enter all the details" },
        { status: 400 }
      )
    }

    await dbConnect()

    const user = await User.findOne({ email })
    if (user) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const person = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    return NextResponse.json({
      success: true,
      user: {
        id: person._id,
        name: person.name,
        email: person.email,
      },
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    )
  }
}
