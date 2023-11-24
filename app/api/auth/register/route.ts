import { prisma } from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request: Request) {
  try {
    const { email, password, name, role } = await request.json();
    console.log("email>>>", email, password, name, role)
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role
      },
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET || "");
    return NextResponse.json({ token });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error: `${error}` });
  }
}
