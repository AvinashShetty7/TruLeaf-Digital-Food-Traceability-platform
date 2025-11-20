import express from "express";
import upload from "../middleware/upload.js"
import {
  createProduct,
  // getMyProducts,
  // getAllProducts,
  // getSingleProduct,
  // updateProductStatus,
  // deleteProduct,
  // getProductTrace,
} from "../controllers/productController.js";
// import { authMiddleware, roleCheck } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Manufacturer-only
router.post("/create",upload.single("imageUrl"),createProduct);
// router.get("/myproducts", authMiddleware, roleCheck(["manufacturer"]), getMyProducts);

// // Admin + Manufacturer
// router.get("/all", authMiddleware, roleCheck(["admin", "manufacturer"]), getAllProducts);
// router.get("/:id", authMiddleware, getSingleProduct);
// router.put("/update-status/:id", authMiddleware, roleCheck(["manufacturer"]), updateProductStatus);
// router.delete("/delete/:id", authMiddleware, roleCheck(["manufacturer", "admin"]), deleteProduct);

// // Public trace (QR code)
// router.get("/trace/:productCode", getProductTrace);

export default router;
