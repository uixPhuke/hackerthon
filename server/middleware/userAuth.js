const jwt = require("jsonwebtoken");
const User = require("../model/userSchema"); // Adjust the path if needed

const authenticate = async (req, res, next) => {
  const token = req.header("Authorization");
    console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Authentication token required" });
  }

  try {
  
    // Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // Find the user by ID
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user info to req.user
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticate;