import jwt from "jsonwebtoken";
import User from "../models/User.model.js";


export const checkAuth = async (req, res, next) => {

  try {
    const token = req.cookies?.tokenid;
    console.log(token);
      
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 3️⃣ Find user from decoded token
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // 4️⃣ Attach user info to request
    req.user = user;
    
    // 5️⃣ Continue to next middleware/route
    next();
  } catch (error) {
    console.error("❌ Auth Middleware Error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
