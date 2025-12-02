import Product from "../models/Product.model.js";
import RawMaterial from "../models/RawMaterial.model.js";
import mongoose from "mongoose";
import User from "../models/User.model.js";
import dotenv from "dotenv";
dotenv.config();


/**
 * ✅ Create Product Controller
 * Route: POST /api/product/create
 * Access: Manufacturer only
 */
import QRCode from "qrcode";

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      batchNumber,
      manufacturingLocation,
      rawMaterials,
      quantity,
      unit,
      expiryDate,
      productionDate,
    } = req.body;

    

    // 1️⃣ Basic validation
    if (!name || !rawMaterials || !quantity || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Name, raw materials, quantity, and image are required.",
      });
    }

    // Parse raw materials
    const parsedMaterials =
      typeof rawMaterials === "string"
        ? JSON.parse(rawMaterials)
        : rawMaterials;
    console.log(parsedMaterials, "xxxxxxxxxxxx");

    if (!Array.isArray(parsedMaterials) || parsedMaterials.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one raw material is required.",
      });
    }

    // 2️⃣ Validate manufacturer (from token)
    const manufacturer = await User.findById(req.user._id).select(
      "name email phone role"
    );

    if (!manufacturer) {
      return res.status(400).json({
        success: false,
        message: "Invalid Manufacturer",
      });
    }

    // 3️⃣ Fetch & validate raw materials
    const validMaterials = await RawMaterial.find({
      _id: { $in: parsedMaterials },
      manufacturer:req.user._id, // must belong to manufacturer
      status: "sold", // manufacturer reserved these raws
      expiryDate: { $gte: new Date() }, // not expired
    }).populate("farmer", "name phone");

    console.log(validMaterials);

    if (validMaterials.length !== parsedMaterials.length) {
      return res.status(400).json({
        success: false,
        message:
          "Some raw materials are invalid, expired, or not reserved for this manufacturer.",
      });
    }

    // 4️⃣ Build consumedRawDetails snapshot
    const consumedRawDetails = validMaterials.map((rm) => ({
      rawMaterialId: rm._id,
      batchCode: rm.batchCode,
      name: rm.name,
      quantityUsed: rm.quantity, // manufacturer used full raw quantity
      unit: rm.unit,
      harvestDate: rm.harvestDate,
      farmer: {
        farmerId: rm.farmer._id,
        name: rm.farmer.name,
        phone: rm.farmer.phone,
      },
    }));
    
    
    
    // 5️⃣ Create product
    const newProduct = new Product({
      name,
      description,
      category,
      batchNumber,
      manufacturingLocation,
      manufacturer: req.user._id,
      rawMaterials: parsedMaterials,
      consumedRawDetails,
      quantity,
      unit,
      imageUrl: req.file.path,
      productionDate,
      expiryDate,
      status: "created",
    });
    
    console.log(newProduct);
    
    await newProduct.save();

    // 6️⃣ Create QR payload
    const qrPayload = {
      // productId: newProduct._id,
      // productCode: newProduct.productCode,
      traceUrl: `${process.env.FRONTEND_URL}/traceproduct/${newProduct._id}`,

      // productDetails: {
      //   name: newProduct.name,
      //   description: newProduct.description,
      //   category: newProduct.category,
      //   batchNumber: newProduct.batchNumber,
      //   manufacturingLocation: newProduct.manufacturingLocation,
      //   quantity: newProduct.quantity,
      //   unit: newProduct.unit,
      //   expiryDate: newProduct.expiryDate,
      //   imageUrl: newProduct.imageUrl,
      // },

      // manufacturerDetails: {
      //   name: manufacturer.name,
      //   email: manufacturer.email,
      //   phone: manufacturer.phone,
      // },

      // rawMaterialsUsed: consumedRawDetails,
    };

    // 7️⃣ Generate QR Image (Base64)
    // const qrImage = await QRCode.toDataURL(JSON.stringify(qrPayload));
    const qrImage = await QRCode.toDataURL(qrPayload.traceUrl);



    newProduct.qrCode = qrImage;
    newProduct.qrTracePayload = qrPayload;

    await newProduct.save();

    // 8️⃣ Mark raw materials as consumed
    await RawMaterial.updateMany(
      { _id: { $in: parsedMaterials } },
      { $set: { status: "consumed" } }
    );

    res.status(201).json({
      success: true,
      message: "Product created successfully with QR Code",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating product",
      error: error.message,
    });
  }
};

/**
 * ✅ Get All Products Created by Logged-in Manufacturer
 * Route: GET /api/product/myproducts
 * Access: Manufacturer only
 */
const getMyProducts = async (req, res) => {
  try {
    const id = req.user._id;

    const products = await Product.find({ manufacturer: id });

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching manufacturer products:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


/**
 * ✅ Get All Products
 * Route: GET /api/product/all
 * Access: Admin and Manufacturer
 */
const getAllProducts = async (req, res) => {
  
  try {
    let products;

    // 1️⃣ If Admin → fetch all products
    if (req.user.role === "admin") {
      products = await Product.find()
        .populate("manufacturer", "name email role") // who made it
        .populate("rawMaterials", "name batchCode qualityGrade status") // used materials
        .sort({ createdAt: -1 });
    }
    // 2️⃣ If Manufacturer → fetch only their products
    else if (req.user.role === "manufacturer") {
      products = await Product.find({ manufacturer: req.user._id })
        .populate("rawMaterials", "name batchCode qualityGrade status")
        .sort({ createdAt: -1 });
    }

    // 3️⃣ If no products
    if (!products || products.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No products found.",
        products: [],
      });
    }

    // 4️⃣ Respond
    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("❌ Error fetching all products:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching products.",
      error: error.message,
    });
  }
};

/**
 * ✅ Get Single Product (with full trace details)
 * Route: GET /api/product/:id
 * Access: Authenticated users (admin or manufacturer)
 */


const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id)
      .populate("manufacturer", "name email phone")
      .populate({
        path: "rawMaterials",
        populate: {
          path: "farmer",
          select: "name phone email",
        },
      });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error fetching single product:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching product",
    });
  }
};


/**
 * ✅ Update Product Status (Manufacturer)
 * Route: PUT /api/product/update-status/:id
 * Access: Manufacturer only
 */
const updateProductStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { newStatus } = req.body;

    // 1️⃣ Validate product ID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid product ID format." });
    }

    // 2️⃣ Validate new status
    const validStatuses = [
      "created",
      "in_production",
      "packaged",
      "shipped",
      "delivered",
    ];
    if (!validStatuses.includes(newStatus)) {
      return res.status(400).json({
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    // 3️⃣ Find product
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // 4️⃣ Ensure the manufacturer owns this product
    if (product.manufacturer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to update this product.",
      });
    }

    // 5️⃣ Prevent invalid backward transitions (optional)
    const statusOrder = {
      created: 1,
      in_production: 2,
      packaged: 3,
      shipped: 4,
      delivered: 5,
    };

    if (statusOrder[newStatus] < statusOrder[product.status]) {
      return res.status(400).json({
        message: `You cannot move product backward (from ${product.status} to ${newStatus}).`,
      });
    }

    // 6️⃣ Update status and add trace history
    product.status = newStatus;
    product.traceHistory.push({
      status: newStatus,
      updatedBy: req.user._id,
      timestamp: new Date(),
    });

    await product.save();

    // 7️⃣ Return success
    res.status(200).json({
      success: true,
      message: `✅ Product status updated to "${newStatus}".`,
      product,
    });
  } catch (error) {
    console.error("❌ Error updating product status:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating product status.",
      error: error.message,
    });
  }
};

/**
 * ✅ Delete Product Controller
 * Route: DELETE /api/product/delete/:id
 * Access: Manufacturer (own products) or Admin
 */
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ Validate product ID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid product ID format." });
    }

    // 2️⃣ Find product
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // 3️⃣ Check authorization
    if (
      req.user.role === "manufacturer" &&
      product.manufacturer.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this product." });
    }

    // 4️⃣ Optional cleanup — set related raw materials back to "available"
    if (product.rawMaterials && product.rawMaterials.length > 0) {
      await RawMaterial.updateMany(
        { _id: { $in: product.rawMaterials } },
        { $set: { status: "available" } }
      );
    }

    // 5️⃣ Delete the product
    await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: `✅ Product "${product.name}" deleted successfully.`,
    });
  } catch (error) {
    console.error("❌ Error deleting product:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting product.",
      error: error.message,
    });
  }
};

/**
 * ✅ Public Product Traceability View
 * Route: GET /api/product/trace/:productCode
 * Access: Public (No authentication required)
 */
// const getProductTrace = async (req, res) => {
//   try {
//     const { productCode } = req.params;

//     // 1️⃣ Find product by productCode
//     const product = await Product.findOne({ productCode })
//       .populate("manufacturer", "name email role")
//       .populate({
//         path: "rawMaterials",
//         select: "name batchCode qualityGrade status farmer",
//         populate: {
//           path: "farmer",
//           select: "name email role",
//           model: User,
//         },
//       })
//       .populate("traceHistory.updatedBy", "name role")
//       .lean();

//     if (!product) {
//       return res
//         .status(404)
//         .json({ success: false, message: "❌ Product not found." });
//     }

//     // 2️⃣ Prepare public trace response
//     const traceData = {
//       name: product.name,
//       productCode: product.productCode,
//       status: product.status,
//       quantity: product.quantity,
//       unit: product.unit,
//       manufacturer: {
//         name: product.manufacturer?.name,
//         email: product.manufacturer?.email,
//       },
//       rawMaterials: product.rawMaterials?.map((rm) => ({
//         name: rm.name,
//         batchCode: rm.batchCode,
//         qualityGrade: rm.qualityGrade,
//         status: rm.status,
//         farmer: {
//           name: rm.farmer?.name,
//           email: rm.farmer?.email,
//         },
//       })),
//       traceHistory: product.traceHistory?.map((h) => ({
//         status: h.status,
//         updatedBy: h.updatedBy?.name || "System",
//         role: h.updatedBy?.role || "-",
//         timestamp: h.timestamp,
//       })),
//       productionDate: product.productionDate,
//       expiryDate: product.expiryDate,
//       imageUrl: product.imageUrl,
//       qrCode: product.qrCode,
//     };

//     res.status(200).json({
//       success: true,
//       message: "✅ Product traceability data fetched successfully.",
//       trace: traceData,
//     });
//   } catch (error) {
//     console.error("❌ Error fetching product trace:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error while fetching product trace.",
//       error: error.message,
//     });
//   }
// };

export {
  createProduct,
  getMyProducts,
  getAllProducts,
  getSingleProduct,
  updateProductStatus,
  deleteProduct,
  // getProductTrace,
};
