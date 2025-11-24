import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Otpmodel from "../models/Otp.model.js";

dotenv.config();

// REGISTER CONTROLLER
const registerUser = async (req, res) => {
  
  try {
    const { name, email, phone, password, role } = req.body;    

    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }


    const tempUser = await Otpmodel.create({
      email,
    });

    const otp = Math.floor(100000 + Math.random() * 900000);
    tempUser.otp = otp;
    tempUser.otpExpiry = Date.now() + 1 * 60 * 1000; // expires in 5 minutes
    await tempUser.save();

    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_EMAIL,
        pass: process.env.BREVOSMTP_API_KEY,
      },
    });

    const mailOptions = {
      from: process.env.MY_EMAIL,
      to: email,
      subject: "Your Verification OTP",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      success: true,
      message:
        "✅ OTP sent to your email for verification.",
      user: {
        name: tempUser.name,
        email: tempUser.email,
        role: tempUser.role,
      },
    });
  } catch (error) {
    console.error("❌ Error registering user:", error);
    res.status(500).json({
      message: "Server error during registration",
      error: error.message,
    });
  }
};

// verify-otp CONTROLLER
const verifyOtp = async (req, res) => {
  try {

    const {  otp, email,formData} = req.body;
    

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const tempuser = await Otpmodel.findOne({ email });
    if (!tempuser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!tempuser.otp || !tempuser.otpExpiry) {
      return res.status(400).json({ message: "OTP not requested or expired" });
    }

    if (Date.now() > tempuser.otpExpiry) {
      tempuser.otp = undefined;
      tempuser.otpExpiry = undefined;
      await tempuser.save();
      return res
        .status(400)
        .json({ message: "OTP expired. Please resend a new one." });
    }

    if ( tempuser.otp !== otp) {
      return res
        .status(400)
        .json({ message: "Invalid OTP. Please try again." });
    }
    
    const hashedPassword = await bcrypt.hash(formData.password, 10);
       
    const user = await User.create({
      name:formData.name,
      email,
      phone:formData.phone,
      password:hashedPassword,
      role:formData.role,

    });

    user.emailVerified = true;
    await user.save();
    await Otpmodel.deleteOne({ email });


    res.status(200).json({
      message: "✅ Email verified successfully! You can now log in.",
    });
  } catch (error) {
    console.error("❌ Error verifying OTP:", error);
    res.status(500).json({
      message: "Server error during OTP verification",
      error: error.message,
    });
  }
};

//  RESEND OTP CONTROLLER
const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const tempuser = await Otpmodel.findOne({ email });
    if (!tempuser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (tempuser.otpExpiry && Date.now() < tempuser.otpExpiry) {
      const remaining = Math.ceil((tempuser.otpExpiry - Date.now()) / 1000);
      return res.status(400).json({
        message: `OTP already sent. Please wait ${remaining} seconds before requesting a new one.`,
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    tempuser.otp = otp;
    tempuser.otpExpiry = Date.now() + 5 * 60 * 1000; // valid for 5 min
    await tempuser.save();

    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_EMAIL,
        pass: process.env.BREVOSMTP_API_KEY,
      },
    });

    const mailOptions = {
      from: process.env.MY_EMAIL,
      to: email,
      subject: "Your New Verification OTP",
      text: `Your new OTP is ${otp}. It will expire in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Resent OTP ${otp} to ${email}`);

    res.status(200).json({
      success: true,
      message: "✅ New OTP sent successfully to your email.",
    });
  } catch (error) {
    console.error("❌ Error resending OTP:", error);
    res.status(500).json({
      success: false,
      message: "Server error during OTP resend",
      error: error.message,
    });
  }
};

//login controller
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // 1 day expiry
    );

    res.cookie("tokenid", token, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      message: "✅ Login successful",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        verified: user.verified,
      },
    });
  } catch (error) {
    console.error("❌ Error logging in:", error);
    res
      .status(500)
      .json({ message: "Server error during login", error: error.message });
  }
};


const logoutUser = async (req, res) => {
  try {
    // 1️⃣ Clear the authentication cookie (tokenid)
    res.clearCookie("tokenid", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // 2️⃣ Respond success
    res.status(200).json({
      success: true,
      message: "✅ Logged out successfully.",
    });
  } catch (error) {
    console.error("❌ Error during logout:", error);
    res.status(500).json({
      success: false,
      message: "Server error during logout.",
      error: error.message,
    });
  }
};

const getPendingUsers = async (req, res) => {
  try {
    // if (req.user?.role !== "admin") {
    //   return res.status(403).json({ message: "Access denied. Admins only." });
    // }

    const pendingUsers = await User.find({ verified: false })
      .select("-password ") // exclude sensitive fields
      .sort({ createdAt: -1 }); // newest first

    if (!pendingUsers.length) {
      return res.status(200).json({
        success: true,
        message: "No pending users found.",
        pendingUsers: [],
      });
    }

    res.status(200).json({
      success: true,
      count: pendingUsers.length,
      pendingUsers,
    });
  } catch (error) {
    console.error("❌ Error fetching pending users:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching pending users.",
      error: error.message,
    });
  }
};

const verifyUserByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { verified } = req.body; // true = approve, false = reject

    // 1️⃣ Validate MongoDB ID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    // 2️⃣ Ensure only admin can perform this
    // if (req.user?.role !== "admin") {
    //   return res.status(403).json({ message: "Access denied. Admins only." });
    // }

    // 3️⃣ Find the user
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 4️⃣ If user already verified, block duplicate action
    if (user.verified && verified) {
      return res.status(400).json({ message: "User is already verified." });
    }

    // 5️⃣ Update verified status (true/false)
    user.verified = verified;
    await user.save();

    res.status(200).json({
      success: true,
      message: verified
        ? `✅ ${user.name} has been verified successfully.`
        : `❌ ${user.name} has been rejected.`,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        verified: user.verified,
      },
    });
  } catch (error) {
    console.error("❌ Error verifying user by admin:", error);
    res.status(500).json({
      success: false,
      message: "Server error while verifying user.",
      error: error.message,
    });
  }
};


const getAllUsers = async (req, res) => {
  try {
    // 1️⃣ Optional: restrict to admin
    if (req.user?.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    // 2️⃣ Fetch all users (exclude sensitive info)
    const users = await User.find()
      .select("-password -otp -otpExpiry")
      .sort({ createdAt: -1 });

    // 3️⃣ If no users
    if (!users.length) {
      return res.status(200).json({
        success: true,
        message: "No users found.",
        users: [],
      });
    }

    // 4️⃣ Success response
    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("❌ Error fetching all users:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching users.",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ Validate ID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    // 2️⃣ Find user
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3️⃣ Authorization check
    const isAdmin = req.user?.role === "admin";
    const isSelf = req.user?._id.toString() === id.toString();

    if (!isAdmin && !isSelf) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this user." });
    }

    // 4️⃣ Optional cleanup — if farmer, delete their raw materials
    if (user.role === "farmer") {
      await RawMaterial.deleteMany({ farmer: id });
      console.log(`🧹 Deleted all raw materials for farmer ${user.name}`);
    }

    // 5️⃣ Delete user
    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: `✅ User "${user.name}" deleted successfully.`,
      deletedUser: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ Error deleting user:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting user",
      error: error.message,
    });
  }
};


const validLogin = async (req, res) => {
  try {
    // 1️⃣ Read token from cookie
    const token = req.cookies?.tokenid;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token found. Please log in." });
    }

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️⃣ Fetch user from DB
    const user = await User.findById(decoded.userId).select(
      "-password -otp -otpExpiry"
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // 4️⃣ Check if admin verified account
    if (!user.verified) {
      return res.status(403).json({
        success: false,
        message: "Account pending admin approval.",
      });
    }

    // 5️⃣ Return valid session data
    res.status(200).json({
      success: true,
      message: "✅ Valid login session.",
      user,
    });
  } catch (error) {
    console.error("❌ Error validating login:", error);
    res.status(401).json({
      success: false,
      message: "Invalid or expired session. Please log in again.",
    });
  }
};

export {
  registerUser,
  loginUser,
  verifyOtp,
  resendOTP,
  getPendingUsers,
  verifyUserByAdmin,
  getAllUsers,
  deleteUser,
  logoutUser,
  validLogin,
};
