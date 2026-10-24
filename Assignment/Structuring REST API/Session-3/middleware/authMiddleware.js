import jwt from "jsonwebtoken";

const SECRET_KEY = "my_secret_key";

export const verifyToken = (req, res, next) => {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists
    if (!authHeader) {
      return res.status(401).json({
        message: "Token is required",
      });
    }

    // Expected format:
    // Authorization: Bearer eyJhbGciOi...
    const parts = authHeader.split(" ");

    // TASK 5 IMPROVEMENT:
    // Validate Bearer token format before verification
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        message: "Invalid Authorization format",
      });
    }

    const token = parts[1];

    // Verify token
    const decoded = jwt.verify(token, SECRET_KEY);

    // Attach decoded data to request
    req.user = decoded;

    next();

  } catch (error) {

    // TASK 4 - Expired token
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Session expired, please login again",
      });
    }

    // Invalid token
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};