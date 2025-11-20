import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  // 🔹 Basic Info
  name: { type: String, required: true },
  description: { type: String },     // ⭐ Added
  category: { type: String },        // ⭐ Added

  // 🔹 Batch Number (optional)
  batchNumber: { type: String },     // ⭐ Added

  // 🔹 Unique Product/Batch Code
  productCode: { type: String,  unique: true },

  // 🔹 Manufacturer Reference
  manufacturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // 🔹 Manufacturing Location
  manufacturingLocation: { type: String },   // ⭐ Added

  // 🔹 Raw Materials used
  rawMaterials: [
    { type: mongoose.Schema.Types.ObjectId, ref: "RawMaterial", required: true }
  ],

  consumedRawDetails: [
    {
      rawMaterialId: { type: mongoose.Schema.Types.ObjectId, ref: "RawMaterial" },
      batchCode: String,
      name: String,
      quantityUsed: Number,
      unit: String,
      harvestDate: Date,
      farmer: {
        farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        name: String,
        phone: String,
        village: String,
        district: String,
        state: String,
      },
    },
  ],

  // 🔹 Production details
  quantity: { type: Number, required: true },
  unit: {
    type: String,
    enum: ["kg", "litre", "ton", "pcs"],
    default: "kg",
  },

  // 🔹 Product lifecycle
  status: {
    type: String,
    enum: ["created", "in_production", "packaged", "shipped", "delivered"],
    default: "created",
  },

  // 🔹 Images & QR codes
  imageUrl: { type: String, required: true },
  qrCode: { type: String },
  qrTracePayload: { type: Object },   // ⭐ Added

  // 🔹 Dates
  productionDate: { type: Date, default: Date.now },
  expiryDate: { type: Date },

  traceHistory: [
    {
      status: String,
      timestamp: { type: Date, default: Date.now },
      updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],

  createdAt: { type: Date, default: Date.now },
});

// 🔹 Auto-generate productCode before save
productSchema.pre("save", function (next) {
  if (!this.productCode) {
    const prefix = this.name.substring(0, 3).toUpperCase();
    const random = Math.floor(1000 + Math.random() * 9000);
    const year = new Date().getFullYear();
    this.productCode = `${prefix}-${year}-${random}`;
  }
  next();
});

export default mongoose.model("Product", productSchema);
