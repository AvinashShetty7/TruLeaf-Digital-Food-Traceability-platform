import mongoose from "mongoose";

const rawMaterialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  batchCode: { type: String, unique: true },
  quantity: { type: Number, required: true },
  unit: { type: String, enum: ["kg", "litre", "ton", "pcs"], default: "kg" },

  farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  location: { type: String },

  harvestDate: { type: Date },
  expiryDate: { type: Date },

  imageUrl: { type: String, required: true, default: "d/" },
  qualityGrade: {
    type: String,
    enum: ["A", "B", "C", "Rejected"],
    default: "A",
  },

  pricePerUnit: { type: Number },
  //   verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  //   geoCoordinates: {
  //     latitude: { type: Number },
  //     longitude: { type: Number },
  //   },
  requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  // qrCode: { type: String },
  status: {
    type: String,
    enum: ["available","reserved","sold","delivered","consumed", "expired"],
    default: "available",
  },

  createdAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
  manufacturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

// Auto-batchCode generation
rawMaterialSchema.pre("save", function (next) {
  if (!this.batchCode) {
    const prefix = this.name.substring(0, 3).toUpperCase();
    const random = Math.floor(1000 + Math.random() * 9000);
    const year = new Date().getFullYear();
    this.batchCode = `${prefix}-${year}-${random}`;
  }
  next();
});

export default mongoose.model("RawMaterial", rawMaterialSchema);
