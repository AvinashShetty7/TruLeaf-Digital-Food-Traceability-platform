import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function TraceProduct() {
  const { id } = useParams();
  const API_URL = import.meta.env.VITE_API_URL;

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/product/${id}`);
        setProduct(res.data.product);
      } catch (error) {
        console.log("Error fetching product", error);
      }
    };
    fetchData();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-700 text-xl">Loading traceability...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl p-8 rounded-2xl border">
        <h1 className="text-3xl font-extrabold text-green-800 text-center mb-6">
          Product Traceability
        </h1>

        {/* PRODUCT INFO */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-green-700 mb-2">Product Information</h2>

          <img
            src={product.imageUrl}
            alt="Product"
            className="w-32 h-32 rounded-lg border mb-3"
          />

          <p><strong>Name:</strong> {product.name}</p>
          <p><strong>Product Code:</strong> {product.productCode}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Batch Number:</strong> {product.batchNumber}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Quantity:</strong> {product.quantity} {product.unit}</p>
          <p><strong>Manufacturing Location:</strong> {product.manufacturingLocation}</p>
          <p><strong>Expiry Date:</strong> {product.expiryDate?.split("T")[0]}</p>
        </div>

        {/* MANUFACTURER INFO */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-green-700 mb-2">Manufacturer Details</h2>
          <p><strong>Name:</strong> {product.manufacturer.name}</p>
          <p><strong>Email:</strong> {product.manufacturer.email}</p>
          <p><strong>Phone:</strong> {product.manufacturer.phone}</p>
          <p><strong>Address:</strong> {product.manufacturer.address}</p>
        </div>

        {/* RAW MATERIAL INFO */}
        <h2 className="text-xl font-bold text-green-700 mb-3">Raw Materials Used</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {product.consumedRawDetails.map((rm, index) => (
            <div key={index} className="bg-green-50 p-4 rounded-xl border shadow">
              <p><strong>Name:</strong> {rm.name}</p>
              <p><strong>Batch Code:</strong> {rm.batchCode}</p>
              <p><strong>Quantity Used:</strong> {rm.quantityUsed} {rm.unit}</p>
              <p><strong>Harvest Date:</strong> {rm.harvestDate?.split("T")[0]}</p>

              {/* Farmer Info */}
              <div className="mt-3 bg-green-100 p-3 rounded-lg border">
                <strong>Farmer:</strong>
                <p>Name: {rm.farmer.name}</p>
                <p>Phone: {rm.farmer.phone}</p>
                <p>Village: {rm.farmer.village}</p>
                <p>District: {rm.farmer.district}</p>
                <p>State: {rm.farmer.state}</p>
              </div>
            </div>
          ))}
        </div>

        {/* QR CODE */}
        <div className="mt-8 text-center">
          <h2 className="text-xl font-bold mb-2 text-green-700">QR Code</h2>
          <img
            src={product.qrCode}
            alt="Product QR"
            className="w-48 h-48 mx-auto border rounded-xl shadow"
          />
        </div>
      </div>
    </div>
  );
}
