import { NextRequest, NextResponse } from "next/server";
import { checkAuthorization } from "../utils/checkAuthorization";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "@/lib/db";

const getProfile = async (decodedToken: JwtPayload) => {
  try {
    const profile = await prisma.user.findUnique({
      where: { id: decodedToken.userId },
    });
    if (profile) {
      profile.password = "";
      return NextResponse.json(
        { message: "Authorized request", user: profile },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
};

export async function GET(request: NextRequest) {
  return checkAuthorization(request, getProfile);
}
