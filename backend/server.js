import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/db.js"

import userRoutes from "./routes/userRoutes.js";
import rawMaterialRoutes from "./routes/rawMaterialRoutes.js";
import imageRoutes from "./routes/imageRoutes.js"
import productRoutes from "./routes/productRoutes.js";
// import traceabilityRoutes from "./routes/traceabilityRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());

// Connect DB
connectDB();

// Routes
app.use("/api/user", userRoutes);
app.use("/api/rawmaterial", rawMaterialRoutes);
app.use("/api/farmer", imageRoutes);
app.use("/api/product", productRoutes);
// app.use("/api/trace", traceabilityRoutes);
// app.use("/api/admin", adminRoutes);

// Default
app.get("/", (req, res) => res.send("Food Supply Chain API Running ✅"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));






