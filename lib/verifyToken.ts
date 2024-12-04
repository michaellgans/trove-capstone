// Verifies token for mobile app authentication
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function verifyToken(req: NextApiRequest, res: NextApiResponse): Promise<any> {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.AUTH_SECRET!);
    return decodedToken;
  } catch (error) {
    return res.status(403).json({ error: "Invalid token" });
  }
}
