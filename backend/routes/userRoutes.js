import express from "express";
import {
  registerUser,
  loginUser,
  resendOTP,
  verifyOtp,
  validLogin,
  logoutUser,
  getPendingUsers,
  verifyUserByAdmin,
  getAllUsers,
  deleteUser,
  checkdocssubmission
} from "../controllers/userController.js";
import { checkAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/resend-otp",resendOTP);
router.post("/verify-otp",verifyOtp);

// Authenticated
router.get("/validlogin",checkAuth,validLogin);
router.get("/docssubmitted",checkAuth,checkdocssubmission);
router.post("/logout",checkAuth,logoutUser);

// // Admin-only
router.get("/pending-users",checkAuth,getPendingUsers);
router.put("/verify-user/:id",checkAuth,verifyUserByAdmin);
router.get("/all",checkAuth,getAllUsers);
router.delete("/delete/:id",checkAuth,deleteUser);

export default router;





// router.get("/pending-users", roleCheck(["admin"]), getPendingUsers);
// router.put("/verify/:id", roleCheck(["admin"]), verifyUserByAdmin);
// router.get("/all", roleCheck(["admin"]), getAllUsers);
// router.delete("/delete/:id",roleCheck(["admin"]), deleteUser);