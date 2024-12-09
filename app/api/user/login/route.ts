// Route to handle child user login
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@/prisma";

/**
 * 
 * @param req - Request Object
 * 
 * @returns - JSON Web Token for Child User Authentication
 */
export default async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Pull username and password from request body
    const { username, password } = body;

    // Retrieve Child User from DB
    const child = await prisma.child_user.findUnique({
      where: { username },
    });

    // If no user found, or if password doesn't match, return 401 Unauthorized
    if (!child || !(await bcrypt.compare(password, child.password))) {
      return NextResponse.json({ error: "Invalid Credentials" }, { status: 401 });
    }

    // Create JWT
    const token = jwt.sign(
      { id: child.id, name: child.name, username: child.username },
      process.env.AUTH_SECRET!,
      { expiresIn: "1h" }
    );

    // Return Token and User Info
    return NextResponse.json(token, { status: 200 }); // token or { token }?
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
