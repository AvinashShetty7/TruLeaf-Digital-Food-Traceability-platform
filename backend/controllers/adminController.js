import User from "../models/User.model.js";
import RawMaterial from "../models/RawMaterial.model.js";

const getstatistics = async (req, res) => {
  try {
    console.log(",mmmmmmmmmmmmmmmmmmmmm");

    // 1️⃣ Aggregate user stats
    const totalUsers = await User.countDocuments();
    const totalFarmers = await User.countDocuments({ role: "farmer" });
    const totalManufacturers = await User.countDocuments({
      role: "manufacturer",
    });
    const totalAdmins = await User.countDocuments({ role: "admin" });

    const verifiedUsers = await User.countDocuments({ verified: true });
    const pendingUsers = await User.countDocuments({ verified: false });

    // 2️⃣ Aggregate raw material stats
    const totalRawMaterials = await RawMaterial.countDocuments();
    const availableMaterials = await RawMaterial.countDocuments({
      status: "available",
    });
    const consumedMaterials = await RawMaterial.countDocuments({
      status: "consumed",
    });
    const expiredMaterials = await RawMaterial.countDocuments({
      status: "expired",
    });

    // 4️⃣ Return dashboard summary
    res.status(200).json({
      success: true,
      message: "✅ Admin dashboard data fetched successfully",
      stats: {
        users: {
          total: totalUsers,
          verified: verifiedUsers,
          pending: pendingUsers,
          farmers: totalFarmers,
          manufacturers: totalManufacturers,
          admins: totalAdmins,
        },
        materials: {
          total: totalRawMaterials,
          available: availableMaterials,
          consumed: consumedMaterials,
          expired: expiredMaterials,
        },
      },
    });
  } catch (error) {
    console.error("❌ Error fetching admin dashboard data:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching admin dashboard data",
      error: error.message,
    });
  }
};

const verifyProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { verifiedStatus, remarks } = req.body;

    // 1️⃣ Validate product ID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid product ID format." });
    }

    // 2️⃣ Find product
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // 3️⃣ Check if already verified
    if (
      product.verificationStatus === "approved" &&
      verifiedStatus === "approved"
    ) {
      return res
        .status(400)
        .json({ message: "Product is already verified and approved." });
    }

    // 4️⃣ Update verification details
    product.verificationStatus = verifiedStatus; // 'approved' or 'rejected'
    product.verifiedBy = req.user._id;
    product.verifiedAt = new Date();
    if (remarks) product.verificationRemarks = remarks;

    await product.save();

    // 5️⃣ Respond success
    res.status(200).json({
      success: true,
      message:
        verifiedStatus === "approved"
          ? `✅ Product "${product.name}" has been approved by admin.`
          : `❌ Product "${product.name}" has been rejected.`,
      product,
    });
  } catch (error) {
    console.error("❌ Error verifying product:", error);
    res.status(500).json({
      success: false,
      message: "Server error while verifying product.",
      error: error.message,
    });
  }
};

const verifyfarmer = async (req, res) => {
  try {
    const farmer = await User.findByIdAndUpdate(
      req.params.id,
      { verified: true },
      { new: true }
    );
    res.json({ success: true, farmer });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const verifymanufacturer = async (req, res) => {
  try {
    const manufacturer = await User.findByIdAndUpdate(
      req.params.id,
      { verified: true },
      { new: true }
    );
    res.json({ success: true, manufacturer });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const pendingfarmers = async (req, res) => {
  try {
    const farmers = await User.find({ role: "farmer", verified: false });
    res.json({ success: true, farmers });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const pendingmanufacturers = async (req, res) => {
  try {
    const manufacturers = await User.find({
      role: "manufacturer",
      verified: false,
    });
    res.json({ success: true, manufacturers });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get all farmers
const getAllFarmers = async (req, res) => {
  try {
    console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmm");

    const farmers = await User.find({ role: "farmer" }).sort({ createdAt: -1 });

    res.json({
      success: true,
      farmers,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching farmers",
      error: err.message,
    });
  }
};

const getAllManufacturers = async (req, res) => {
  try {
    const manufacturers = await User.find({ role: "manufacturer" }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      manufacturers,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching manufacturers",
      error: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user first
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // If FARMER → delete raw materials created by farmer
    if (user.role === "farmer") {
      await RawMaterial.deleteMany({ farmer: userId });
    }

    // If MANUFACTURER → delete products created by manufacturer
    if (user.role === "manufacturer") {
      await Product.deleteMany({ manufacturer: userId });
    }

    // Delete the user
    await User.findByIdAndDelete(userId);

    res.json({
      success: true,
      message: `${user.role} deleted successfully`,
    });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: err.message,
    });
  }
};

export {
  getstatistics,
  verifyProduct,
  verifyfarmer,
  verifymanufacturer,
  pendingfarmers,
  pendingmanufacturers,
  getAllFarmers,
  getAllManufacturers,
  deleteUser,
};
