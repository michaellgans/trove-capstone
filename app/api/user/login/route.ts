// Route to handle child user login
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@/prisma";

/**
 * 
 * @param req - Request Object
 * @param res - Response Object
 * 
 * @returns - JSON Web Token for Child User Authentication
 */
export default async function login(req: NextApiRequest, res: NextApiResponse) {
  // If request is not POST method, return 405 error
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Pull username and password from request body
  const { username, password } = req.body;

  try {
    // Retrieve Child User from DB
    const child = await prisma.child_user.findUnique({
      where: { username },
    });

    // If no user found, or if password doesn't match, return 401 Unauthorized
    if (!child || !(await bcrypt.compare(password, child.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create JWT
    const token = jwt.sign(
      { id: child.id, name: child.name, username: child.username },
      process.env.AUTH_SECRET!,
      { expiresIn: "1h" }
    );

    // Return Token and User Info
    return res.status(200).json({
      token,
      user: {
        id: child.id,
        username: child.username,
        name: child.name,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
}
