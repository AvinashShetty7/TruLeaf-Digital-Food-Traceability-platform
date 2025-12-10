import Trace from "../models/Trace.model.js";
import Product from "../models/Product.model.js";


 const createTraceRecord = async (req, res) => {
  try {
    const { productId, message } = req.body;

    // 1️⃣ Validate product
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 2️⃣ Check ownership
    if (product.manufacturer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to add trace for this product" });
    }

    // 3️⃣ Create trace record
    const trace = new Trace({
      product: product._id,
      productCode: product.productCode,
      status: product.status || "created",
      message: message || "New product created",
      updatedBy: req.user._id,
      timestamp: new Date(),
    });

    await trace.save();

    // 4️⃣ Update trace history in product (optional, keeps both in sync)
    product.traceHistory.push({
      status: product.status,
      updatedBy: req.user._id,
      timestamp: new Date(),
    });
    await product.save();

    res.status(201).json({
      success: true,
      message: "✅ Trace record created successfully",
      trace,
    });
  } catch (error) {
    console.error("❌ Error creating trace record:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating trace record",
      error: error.message,
    });
  }
};

export {createTraceRecord}