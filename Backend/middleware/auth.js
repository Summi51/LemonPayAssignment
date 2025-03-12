const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userID = decoded.userID; // Attach userID to the request
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Unauthorized: Invalid token" });
  }
};

module.exports = { auth };

