import jwt from "jsonwebtoken";
import { CreateError } from "./error.js";

export const verifyToken = (req, res, next) => {
  // Extract token from Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(CreateError(401, "You are not authenticated!"));
  }

  // Extract token from the header
  const token = authHeader.split(" ")[1];
  // Verify the token
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(CreateError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};

//add verify token to all needed api /////////////////////////////////////////////

export const decodeToken = (token) => {
  try {
    // Decode the token without verification
    const decoded = jwt.decode(token);
    return decoded;
  } catch (error) {
    throw new Error("Failed to decode token");
  }
};
