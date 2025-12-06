import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../db/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "farmer_documents",
    resource_type: "auto",
    allowed_formats: ["jpg", "jpeg", "png", "pdf"],
  },
});

const upload = multer({ storage });

export default upload;
