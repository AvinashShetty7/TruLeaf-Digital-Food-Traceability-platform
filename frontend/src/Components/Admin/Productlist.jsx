import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Productlist() {
  const API_URL = import.meta.env.VITE_API_URL;
  const MANUFACTURER_ID = "691a0664cee641dce9ba2a2e"; // replace with auth

  const [products, setProducts] = useState([]);
  const [selectedQR, setSelectedQR] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/product/manufacturer/${MANUFACTURER_ID}`
        );
        setProducts(res.data.products || []);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-green-800 mb-8 text-center">
          My Products
        </h1>

        {/* No Products */}
        {products.length === 0 && (
          <p className="text-center text-gray-600 text-lg">
            You haven't created any products yet.
          </p>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all"
            >
              {/* Image */}
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-2xl"
              />

              {/* Info */}
              <div className="p-5">
                <h2 className="text-xl font-bold text-green-800">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-500">
                  Batch: {product.batchNumber || product.productCode}
                </p>
                <p className="text-sm text-gray-600">
                  {product.quantity} {product.unit}
                </p>

                <p className="mt-2 text-sm">
                  <span className="font-semibold">Category:</span>{" "}
                  {product.category || "N/A"}
                </p>

                <p
                  className={`mt-1 text-sm font-semibold ${
                    product.status === "created"
                      ? "text-blue-700"
                      : product.status === "packaged"
                      ? "text-green-700"
                      : "text-gray-700"
                  }`}
                >
                  Status: {product.status}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex justify-between items-center px-5 pb-4">
                {/* View QR */}
                <button
                  onClick={() => setSelectedQR(product.qrCode)}
                  className="text-sm bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
                >
                  View QR
                </button>

                {/* View Details */}
                <Link
                  to={`/TraceProduct/${product._id}`}
                  className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* QR Popup */}
        {selectedQR && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-5 rounded-xl shadow-xl text-center">
              <h3 className="text-lg font-bold mb-3">Product QR Code</h3>

              <img
                src={selectedQR}
                alt="QR Code"
                className="w-56 h-56 mx-auto mb-4 border rounded-xl"
              />

              <button
                onClick={() => setSelectedQR(null)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
