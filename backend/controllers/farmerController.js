import User from "../models/User.model.js";
import RawMaterialModel from "../models/RawMaterial.model.js";

export const uploadKYC = async (req, res) => {
  try {
    // const userId = req.userId; // must come from auth middleware
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not found" });

    const docsToAdd = [];

    if (req.files.aadhar) {
      docsToAdd.push({
        documentType: "Aadhar Card",
        documentUrl: req.files.aadhar[0].path,
      });
    }

    if (req.files.kisanCard) {
      docsToAdd.push({
        documentType: "Kisan Card",
        documentUrl: req.files.kisanCard[0].path,
      });
    }

    if (req.files.landRecord) {
      docsToAdd.push({
        documentType: "Land Record",
        documentUrl: req.files.landRecord[0].path,
      });
    }

    if (req.files.selfie) {
      docsToAdd.push({
        documentType: "Selfie",
        documentUrl: req.files.selfie[0].path,
      });
    }

    // Add all documents to the user's document array
    user.documents.push(...docsToAdd);

    await user.save();

    res.status(200).json({
      success: true,
      message: "KYC documents uploaded successfully!",
      uploadedDocuments: docsToAdd,
      allDocuments: user.documents,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const createRawMaterial = async (req, res) => {
  try {
    const farmerId = req.user._id;

    // find farmer (optional - good to validate)
    const user = await User.findById(farmerId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "Farmer not found" });

    // Read text fields from req.body
    const {
      name,
      quantity,
      unit,
      location,
      harvestDate,
      expiryDate,
      qualityGrade,
      pricePerUnit,
      status,
    } = req.body;

    let imageUrl = "";
    imageUrl = req.file.path;

    // Build new RawMaterial doc
    const raw = new RawMaterialModel({
      name,
      quantity,
      unit,
      location,
      harvestDate: harvestDate ? new Date(harvestDate) : undefined,
      expiryDate: expiryDate ? new Date(expiryDate) : undefined,
      imageUrl,
      qualityGrade,
      pricePerUnit: pricePerUnit ? Number(pricePerUnit) : undefined,
      status: status || "Available",
      farmer: user,
    });

    await raw.save();

    // Optionally push to user's rawMaterials array (if your User schema stores them)
    if (user) {
      if (!user.rawMaterials) user.rawMaterials = [];
      user.rawMaterials.push(raw._id);
      await user.save();
    }

    res.status(201).json({
      success: true,
      message: "Raw material created and image uploaded to Cloudinary",
      data: raw,
    });
  } catch (error) {
    console.error("createRawMaterial error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
