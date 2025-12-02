import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function TraceProduct() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/product/singleproduct/${id}`,{withCredentials:true});
        setProduct(res.data.product);
      } catch (err) {
        console.log("Trace fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl font-semibold">
        Loading trace data...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center text-xl text-red-600">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        {/* PRODUCT TITLE */}
        <h1 className="text-3xl font-extrabold text-green-800 text-center mb-6">
          {product.name} – Traceability Report
        </h1>

        {/* QR CODE */}
        <div className="flex justify-center mb-8">
          <img
            src={product.qrCode}
            alt="QR Code"
            className="w-48 h-48 border shadow-lg rounded-xl"
          />
        </div>

        {/* PRODUCT DETAILS */}
        <div className="border rounded-xl p-6 mb-8 bg-green-50">
          <h2 className="text-xl font-bold text-green-800 mb-3">
            Product Details
          </h2>

          <p>
            <b>Product Name:</b> {product.name}
          </p>
          <p>
            <b>Product Code:</b> {product.productCode}
          </p>
          <p>
            <b>Quantity:</b> {product.quantity} {product.unit}
          </p>
          <p>
            <b>Category:</b> {product.category || "N/A"}
          </p>
          <p>
            <b>Manufacturing Location:</b>{" "}
            {product.manufacturingLocation || "N/A"}
          </p>
          <p>
            <b>Production Date:</b>{" "}
            {product.productionDate
              ? new Date(product.productionDate).toLocaleDateString()
              : "N/A"}
          </p>
          <p>
            <b>Expiry Date:</b>{" "}
            {product.expiryDate
              ? new Date(product.expiryDate).toLocaleDateString()
              : "N/A"}
          </p>
        </div>

        {/* MANUFACTURER DETAILS */}
        <div className="border rounded-xl p-6 mb-8 bg-blue-50">
          <h2 className="text-xl font-bold text-blue-800 mb-3">
            Manufacturer Details
          </h2>

          <p>
            <b>Name:</b> {product.manufacturer?.name}
          </p>
          <p>
            <b>Email:</b> {product.manufacturer?.email}
          </p>
          <p>
            <b>Phone:</b> {product.manufacturer?.phone}
          </p>
        </div>

        {/* RAW MATERIALS */}
        <div className="border rounded-xl p-6 mb-8 bg-yellow-50">
          <h2 className="text-xl font-bold text-yellow-800 mb-3">
            Raw Materials Used
          </h2>

          {product.consumedRawDetails.map((rm, index) => (
            <div
              key={index}
              className="border p-4 mb-4 rounded-lg bg-white shadow-sm"
            >
              <p>
                <b>Name:</b> {rm.name}
              </p>
              <p>
                <b>Batch Code:</b> {rm.batchCode}
              </p>
              <p>
                <b>Quantity Used:</b> {rm.quantityUsed} {rm.unit}
              </p>
              <p>
                <b>Harvest Date:</b>{" "}
                {rm.harvestDate
                  ? new Date(rm.harvestDate).toLocaleDateString()
                  : "N/A"}
              </p>

              {/* Farmer Info */}
              <div className="mt-2 p-3 bg-green-100 rounded-lg">
                <p className="font-semibold text-green-800">
                  Farmer Information
                </p>
                <p>
                  <b>Name:</b> {rm.farmer?.name}
                </p>
                <p>
                  <b>Phone:</b> {rm.farmer?.phone}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* PRODUCT TIMELINE */}
        <div className="border rounded-xl p-6 bg-purple-50">
          <h2 className="text-xl font-bold text-purple-800 mb-3">
            Product Timeline
          </h2>

          <ul className="list-disc ml-6">
            {product.traceHistory.map((entry, index) => (
              <li key={index} className="mb-2">
                <b>{entry.status.toUpperCase()}</b> –{" "}
                {new Date(entry.timestamp).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
