const dbConnect = require("../../lib/mongodb");
const User = require ("../../models/User");
const bcrypt = require("bcrypt");
const { NextResponse } = require("next/server");

export async function POST(req) {
  const { name, email, password } = await req.json()

  console.log(name, email, password);
  if (!name || !email || !password) {
    return NextResponse.json({ message: "Enter all the details" }, { status: 400 })
  }

  await dbConnect();
   
  const user = await User.findOne({email});
  if(user){
    return NextResponse.json({ message: "This user is already exists" }, { status: 401 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const person = await User.create({
    name,email,password:hashedPassword
  })

  return NextResponse.json({ success: true, message:person })
}