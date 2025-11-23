import express from "express";
import upload from "../middleware/upload.js";
import {
  // addRawMaterial,
  getRawMaterialsByFarmer,
  getAllRawMaterials,
  getSingleRawMaterial,
  updateStatus,
  deleteRawMaterial,
  markAsConsumed,
  getmanufacturerbuyedraws,
} from "../controllers/rawMaterialController.js";

// import { authMiddleware, roleCheck } from "../middlewares/authMiddleware.js";
const router = express.Router();

// router.post("/create", addRawMaterial);  
router.get("/myraws", getRawMaterialsByFarmer);


// // Manufacturer/Admin view
router.get("/allraws",getAllRawMaterials);
router.get("/:batchCode",getSingleRawMaterial);
router.get("/mybuyedraws/:manufacturerid",getmanufacturerbuyedraws);


// // Update/Delete
router.put("/update/:batchCode", updateStatus);
router.delete("/delete/:id",deleteRawMaterial);

// // Mark as consumed (by manufacturer)
router.put("/mark-consumed/:id",  markAsConsumed);

export default router;
