import express from "express";
import upload from "../middleware/upload.js"
import {
  createProduct,
  getMyProducts,
  getAllProducts,
  getSingleProduct,
} from "../controllers/productController.js";
import { checkAuth} from "../middleware/authMiddleware.js"

const router = express.Router();

// Manufacturer-only
router.post("/create",checkAuth,upload.single("imageUrl"),createProduct);
router.get("/manufacturer",checkAuth, getMyProducts);

// // Admin + Manufacturer
router.get("/manufacturer/allproduct",checkAuth, getAllProducts);
router.get("/singleproduct/:id",getSingleProduct);


export default router;
