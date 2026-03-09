import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {

    // get token from header
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "Access denied. No token provided."
      });
    }

    // remove Bearer from token
    const actualToken = token.split(" ")[1];

    // verify token
    const decoded = jwt.verify(actualToken, "secretkey");

    // attach user info to request
    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid token"
    });
  }
};

// export default authMiddleware;