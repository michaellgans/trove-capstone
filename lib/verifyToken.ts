// Verifies token for mobile app authentication
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

interface DecodedToken extends JwtPayload {
  id: string;
  name: string;
  username: string;
}

export default async function verifyToken(req: NextRequest): Promise<JwtPayload> {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ error: "Authorization Header Missing" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.AUTH_SECRET!) as DecodedToken;
    return decodedToken;
  } catch (error) {
    return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
  }
}
