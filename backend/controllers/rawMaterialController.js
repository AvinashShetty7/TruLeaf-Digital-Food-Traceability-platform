import RawMaterial from "../models/RawMaterial.model.js";
import User from "../models/User.model.js";

// const addRawMaterial = async (req, res) => {

//   try {
//     const {
//       name,
//       quantity,
//       unit,
//       location,
//       harvestDate,
//       expiryDate,
//       pricePerUnit,
//       qualityGrade,
//     } = req.body;

//     if (!name || !quantity || !unit || !pricePerUnit) {
//       return res.status(400).json({
//         message:
//           "All required fields (name, quantity, unit, price, image) must be provided.",
//       });
//     }

//     const farmerId = req.user?._id;
//     const farmer = await User.findById(farmerId);

//     if (!farmer) {
//       return res.status(404).json({ message: "Farmer not found." });
//     }

//     if (farmer.role !== "farmer") {
//       return res
//         .status(403)
//         .json({ message: "Only farmers can add raw materials." });
//     }

//     const newMaterial = new RawMaterial({
//       name,
//       quantity,
//       unit,
//       location,
//       harvestDate,
//       expiryDate,
//       pricePerUnit,
//       qualityGrade: qualityGrade || "A",
//       //   farmer: farmerId,
//     });

//     await newMaterial.save();

//     res.status(201).json({
//       success: true,
//       message: "✅ Raw material added successfully!",
//       rawMaterial: newMaterial,
//     });
//   } catch (error) {
//     console.error("❌ Erro raw material:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error while adding raw material",
//       error: error.message,
//     });
//   }
// };

const getRawMaterialsByFarmer = async (req, res) => {
  try {
    const farmerId = req.user._id;

    const materials = await RawMaterial.find({ farmer: farmerId }).sort({
      createdAt: -1,
    });

    if (materials.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No raw materials added yet.",
        materials: [],
      });
    }

    res.status(200).json({
      success: true,
      count: materials.length,
      materials,
    });
  } catch (error) {
    console.error("❌ Error fetching farmer materials:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching farmer materials",
      error: error.message,
    });
  }
};

const getAllRawMaterials = async (req, res) => {
  try {
    const materials = await RawMaterial.find()
      .populate("farmer", "name email phone") // get farmer details
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json({
      success: true,
      count: materials.length,
      materials,
    });
  } catch (error) {
    console.error("❌ Error fetching raw materials:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching raw materials",
      error: error.message,
    });
  }
};

const getAllavailableRawMaterials = async (req, res) => {
  try {
    const materials = await RawMaterial.find({status:"available"})
      .populate("farmer", "name email phone") // get farmer details
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json({
      success: true,
      count: materials.length,
      materials,
    });
  } catch (error) {
    console.error("❌ Error fetching raw materials:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching raw materials",
      error: error.message,
    });
  }
};

const getmyreservedraws = async (req, res) => {
  try {
    const materials = await RawMaterial.find({status:"reserved",requestedBy:req.user._id})
      .populate("farmer", "name email phone") // get farmer details
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json({
      success: true,
      count: materials.length,
      materials,
    });
  } catch (error) {
    console.error("❌ Error fetching raw materials:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching raw materials",
      error: error.message,
    });
  }
};

const getmyconsumedraws = async (req, res) => {
  try {
    const materials = await RawMaterial.find({status:"consumed",manufacturer:req.user._id})
      .populate("farmer", "name email phone") // get farmer details
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json({
      success: true,
      count: materials.length,
      materials,
    });
  } catch (error) {
    console.error("❌ Error fetching raw materials:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching raw materials",
      error: error.message,
    });
  }
};

const getmybuyedraws= async (req, res) => {
  try {
    const materials = await RawMaterial.find({status:"sold",manufacturer:req.user._id})
      .populate("farmer", "name email phone") // get farmer details
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json({
      success: true,
      count: materials.length,
      materials,
    });
  } catch (error) {
    console.error("❌ Error fetching raw materials:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching raw materials",
      error: error.message,
    });
  }
};

const getSingleRawMaterial = async (req, res) => {
  try {
    const { batchCode } = req.params;
    console.log(batchCode);

    // if (!batchCode.match(/^[0-9a-fA-F]{24}$/)) {
    //   return res
    //     .status(400)
    //     .json({ message: "Invalid raw material ID format" });
    // }

    const material = await RawMaterial.findOne({ batchCode }).populate(
      "farmer",
      "name email phone role"
    );
    console.log(material);

    if (!material) {
      return res.status(404).json({ message: "Raw material not found" });
    }

    // if (
    //   req.user.role === "farmer" &&
    //   material.farmer.batchCode.toString() !== req.user.batchCode.toString()
    // ) {
    //   return res
    //     .status(403)
    //     .json({ message: "You are not authorized to view this material" });
    // }

    res.status(200).json({
      success: true,
      rawMaterial: material,
    });
  } catch (error) {
    console.error("❌ Error fetching single raw material:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching raw material details",
      error: error.message,
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { batchCode } = req.params;
    const { status } = req.body;
    const manufacturerId = req.user._id; // ⭐ From auth middleware

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    // Find item first
    const material = await RawMaterial.findOne({ batchCode });

    if (!material) {
      return res.status(404).json({ message: "Raw material not found" });
    }

    let updateFields = { status };

    if (status === "reserved") {
      updateFields.requestedBy = manufacturerId;
    }

    if (status === "sold") {
      // If item was NOT reserved before → BLOCK
      if (!material.requestedBy) {
        return res.status(400).json({
          message:
            "Cannot mark as sold. No manufacturer has reserved this item.",
        });
      }

      // If requestedBy exists → assign manufacturer field
      updateFields.manufacturer = material.requestedBy;
      updateFields.requestedBy = null;
    }

    // Perform update
    const updated = await RawMaterial.findOneAndUpdate(
      { batchCode },
      updateFields,
      { new: true }
    );

    res.json({
      message: "Status updated successfully",
      rawMaterial: updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteRawMaterial = async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ Validate ID
    if (!mongoose.isValidObjectId(id)) {
      return res
        .status(400)
        .json({ message: "Invalid raw material ID format" });
    }

    // 2️⃣ Find material
    const material = await RawMaterial.findById(id);
    if (!material) {
      return res.status(404).json({ message: "Raw material not found" });
    }

    // 3️⃣ Authorization check
    const isOwnerFarmer =
      req.user?.role === "farmer" &&
      material.farmer.toString() === req.user._id.toString();
    const isAdmin = req.user?.role === "admin";

    if (!isOwnerFarmer && !isAdmin) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this material." });
    }

    // 4️⃣ Delete material
    await RawMaterial.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "✅ Raw material deleted successfully.",
      deletedId: id,
    });
  } catch (error) {
    console.error("❌ Error deleting raw material:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting raw material.",
      error: error.message,
    });
  }
};

const markAsConsumed = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res
        .status(400)
        .json({ message: "Invalid raw material ID format" });
    }

    const material = await RawMaterial.findById(id);
    if (!material) {
      return res.status(404).json({ message: "Raw material not found" });
    }

    if (material.status === "consumed") {
      return res
        .status(400)
        .json({ message: "This material is already marked as consumed." });
    }

    if (material.status === "expired") {
      return res
        .status(400)
        .json({ message: "Cannot consume expired material." });
    }

    const allowedRoles = ["manufacturer", "admin"];
    if (!allowedRoles.includes(req.user?.role)) {
      return res.status(403).json({
        message: "Only manufacturers or admins can mark materials as consumed.",
      });
    }

    material.status = "consumed";
    material.lastUpdated = new Date();

    await material.save();

    res.status(200).json({
      success: true,
      message: `✅ Raw material "${material.name}" marked as consumed.`,
      rawMaterial: material,
    });
  } catch (error) {
    console.error("❌ Error marking material as consumed:", error);
    res.status(500).json({
      success: false,
      message: "Server error while marking material as consumed",
      error: error.message,
    });
  }
};

 const getmanufacturerbuyedraws = async (req, res) => {
  try {
    const manufacturerId = req.user._id; // or from req.user.id
    
    const materials = await RawMaterial.find({
      manufacturer: manufacturerId,   // ⭐ filter raws belonging to manufacturer
      status: "sold"              // optional (only reserved or available)
    });

    res.json({ materials });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export {
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
};
