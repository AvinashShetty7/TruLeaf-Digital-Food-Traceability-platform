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
  getAllavailableRawMaterials,
  getmyreservedraws,
  getmyconsumedraws,
  getmybuyedraws,
} from "../controllers/rawMaterialController.js";

// import { authMiddleware, roleCheck } from "../middlewares/authMiddleware.js";
const router = express.Router();

// router.post("/create", addRawMaterial);  
router.get("/myraws", getRawMaterialsByFarmer);


// // Manufacturer/Admin view
router.get("/allraws",getAllRawMaterials);
router.get("/allavailableraws",getAllavailableRawMaterials);
router.get("/singleraw/:batchCode",getSingleRawMaterial);
router.get("/mybuyedraws",getmanufacturerbuyedraws);
router.get("/myreservedraws",getmyreservedraws);
router.get("/myconsumedraws",getmyconsumedraws);
router.get("/buyedraws",getmybuyedraws);






// // Update/Delete
router.put("/update/:batchCode", updateStatus);
router.delete("/delete/:id",deleteRawMaterial);

// // Mark as consumed (by manufacturer)
router.put("/mark-consumed/:id",  markAsConsumed);

export default router;
