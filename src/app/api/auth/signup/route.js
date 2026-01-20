import bcrypt from "bcrypt"
import { NextResponse } from "next/server"

export async function POST(req) {
  const { name, email, password } = await req.json()

  const hashedPassword = await bcrypt.hash(password, 10)

  await saveUserToDB({
    name,
    email,
    password: hashedPassword,
  })

  return NextResponse.json({ success: true })
}
