import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import verifyToken from "../lib/verifyToken";

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
}));

jest.mock("next/server", () => ({
  NextRequest: jest.fn(),
  NextResponse: {
    json: jest.fn(),
  },
}));

describe("verifyToken function", () => {
  let req: NextRequest;

  beforeEach(() => {
    req = {
      headers: new Map(),
    } as unknown as NextRequest;
  });

  it("should return decoded token for a valid token", async () => {
    const mockToken = "validToken";
    const mockDecodedToken = {
      id: "123",
      name: "John Doe",
      username: "johndoe",
    };

    req.headers.set("authorization", `Bearer ${mockToken}`);
    (jwt.verify as jest.Mock).mockResolvedValue(mockDecodedToken);

    const result = await verifyToken(req);

    expect(result).toEqual(mockDecodedToken);
    expect(jwt.verify).toHaveBeenCalledWith(mockToken, process.env.AUTH_SECRET);
  });

  it("should return error if authorization header is missing", async () => {
    req.headers.delete("authorization");

    const result = await verifyToken(req);

    expect(result).toEqual(
      NextResponse.json({ error: "Authorization Header Missing" }, { status: 401 })
    );
  });

  it("should return error if token is invalid", async () => {
    const mockToken = "invalidToken";
    req.headers.set("authorization", `Bearer ${mockToken}`);

    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error("Invalid Token");
    });
  
    const result = await verifyToken(req);
  
    expect(result).toEqual(
      NextResponse.json({ error: "Invalid Token" }, { status: 401 })
    );
  });
});
