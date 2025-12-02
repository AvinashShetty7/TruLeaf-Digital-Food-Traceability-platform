import express from "express";
import upload from "../middleware/upload.js"
import {
  createProduct,
  getMyProducts,
  getAllProducts,
  getSingleProduct,
  // updateProductStatus,
  // deleteProduct,
  // getProductTrace,
} from "../controllers/productController.js";
import { checkAuth} from "../middleware/authMiddleware.js"

const router = express.Router();

// Manufacturer-only
router.post("/create",checkAuth,upload.single("imageUrl"),createProduct);
router.get("/manufacturer",checkAuth, getMyProducts);

// // Admin + Manufacturer
router.get("/manufacturer/allproduct",checkAuth, getAllProducts);
router.get("/singleproduct/:id",getSingleProduct);
// router.put("/update-status/:id", authMiddleware, roleCheck(["manufacturer"]), updateProductStatus);
// router.delete("/delete/:id", authMiddleware, roleCheck(["manufacturer", "admin"]), deleteProduct);

// // Public trace (QR code)
// router.get("/trace/:productCode", getProductTrace);

export default router;
