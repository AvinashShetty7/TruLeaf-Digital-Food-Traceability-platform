🌱 TruLeaf – Digital Food Traceability Platform

TruLeaf is a "MERN stack–based digital food traceability system" designed to ensure transparency, trust, and safety across the food supply chain by connecting farmers, manufacturers, and consumers through
QR-based product tracking.


🚀 Project Overview

TruLeaf allows:
Farmers to list raw materials.
Manufacturers to purchase raw materials, create finished products, and generate QR codes.
Consumers to scan QR codes and verify the entire journey of a food product from farm to factory.

This system ensures authenticity, prevents fraud, and increases consumer trust.


🛠️ Tech Stack
 Frontend:
- React.js (Vite)
- Tailwind CSS
- Axios
- Lucide Icons
- React Router DOM

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer (File Upload)
- Cloudinary (Image Storage)

👥 User Roles

- 👨‍🌾 Farmer
- 🏭 Manufacturer
- 🛍️ Customer
- 👨‍💼 Admin

Each role has different access and functionality.

✨ Key Features

✅ Authentication & Security
- User Registration & Login
- OTP Verification
- JWT-based Authentication
- Role-based Access Control
- Secure Cookies with `withCredentials`

✅ Farmer Module
- Upload Raw Materials
- View Listed Materials
- Manage Stock
- Update Availability Status

✅ Manufacturer Module
- View Available Raw Materials
- Purchase Raw Materials
- Create Products
- Generate QR Codes
- Product Tracking Dashboard

 ✅ Product Traceability
- Complete Trace History
- Farmer → Manufacturer → Consumer Flow
- Scan QR to View:
  - Product Details
  - Raw Material Details
  - Farmer Information
  - Manufacturing & Expiry Dates
  - Product Movement Timeline

✅ Admin Panel
- User Verification (KYC)
- Monitor All Activities
- Block or Approve Users
- Data Management

✅ Responsive Design
- Fully Mobile Compatible
- Optimized for Tablets & Desktop


📸 Screenshots
<img width="1831" height="910" alt="image" src="https://github.com/user-attachments/assets/4db13c83-291a-4a8f-9ac3-3e7301fb4757" />

1️⃣ Clone the Repository

git clone https://github.com/your-username/truleaf.git
cd truleaf

Backend setup
cd backend
npm install

Backend .env file
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
CLOUDINARY_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

npm start

Frontend setup
cd frontend
npm install
npm run dev



🔐 Security Features

JWT Token Authentication

Role-based Dashboards

Secure QR Data Verification

Encrypted Password Storage

Backend Validation & Authorization Middleware


For any query contact 
shettyavinasha2004@gmail.com




