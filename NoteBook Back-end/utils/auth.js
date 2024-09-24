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
    // split token
    // Decode the token without verification
    const decoded = jwt.decode(token);
    return decoded;
  } catch (error) {
    throw new Error("Failed to decode token");
  }
};

// export const decodeToken = (authorizationHeader) => {
//   if (!authorizationHeader) {
//     throw new Error("Authorization header is missing!");
//   }

//   // Ensure the token contains the 'Bearer ' prefix
//   const token = authorizationHeader.split(" ")[1];
//   if (!token) {
//     throw new Error("Token not found in the authorization header!");
//   }

//   // Verify and decode the token using the secret key
//   const secretKey = process.env.JWT_SECRET; // Ensure this is defined in your environment variables
//   if (!secretKey) {
//     throw new Error("JWT secret key is not defined!");
//   }

//   return jwt.verify(token, secretKey); // Verify and decode the token
// };
