import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (token: string) => {
  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, JWT_SECRET || "");
    return decoded;
  } catch (error) {
    // If the token is invalid or expired, an error will be thrown
    return null;
  }
};

export function checkAuthorization(
  request: NextRequest,
  next: (accessToken: JwtPayload) => void
) {
  const token = request.headers.get("authorization");
  const accessToken = (token || "").replace("Bearer ", "");

  const decodedToken = verifyToken(accessToken);

  if (!accessToken || !decodedToken) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  return next(decodedToken as JwtPayload);
}
