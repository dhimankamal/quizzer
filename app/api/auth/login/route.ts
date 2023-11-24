import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const loginUser = async (email: string, password: string): Promise<string> => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET || "");
  return token;
};

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const token = await loginUser(email, password);
    console.log("token", token);
    return NextResponse.json({ token });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error: `${error}` });
  }
}
