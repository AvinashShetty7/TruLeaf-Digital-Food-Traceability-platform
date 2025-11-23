import express from "express";
import {
  verifyfarmer,
  pendingfarmers,
  pendingmanufacturers,
  verifymanufacturer,
  getstatistics,
  getAllFarmers,
  getAllManufacturers,
  deleteUser,
} from "../controllers/adminController.js"
// import { authMiddleware, roleCheck } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Admin-only
// router.get("/dashboard", authMiddleware, roleCheck(["admin"]), getDashboardData);
router.get("/stats",getstatistics);
router.put("/verify-farmer/:id",verifyfarmer);
router.put("/verify-manufacturer/:id",verifymanufacturer);
router.get("/farmers/pending",pendingfarmers);
router.get("/manufacturers/pending",pendingmanufacturers);
router.get("/allfarmers",getAllFarmers);
router.get("/allmanufacturers",getAllManufacturers);
router.delete("/deleteuser/:id",deleteUser);




// router.get("/logs", authMiddleware, roleCheck(["admin"]), getLogs);

export default router;
