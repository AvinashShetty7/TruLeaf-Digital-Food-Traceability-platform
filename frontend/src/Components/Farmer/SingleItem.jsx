import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function SingleItem() {
  const { batchCode } = useParams();
  const API_URL = import.meta.env.VITE_API_URL;

  const [item, setItem] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const openDirections = (address) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      address
    )}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/rawmaterial/singleraw/${batchCode}`, {
          withCredentials: true,
        });
        setItem(res.data.rawMaterial);
        setStatus(res.data.rawMaterial.status);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching item", error);
        setLoading(false);
      }
    };
    fetchItem();
  }, [batchCode]);

  const updateStatus = async () => {
    try {
      const res = await axios.put(
        `${API_URL}/api/rawmaterial/update/${batchCode}`,
        {
          status,
        },
        { withCredentials: true }
      );
      alert(res.data.message || "Status Updated");
    } catch (err) {
      alert("Error updating status");
    }
  };

  const getStatusColor = (stat) => {
    const colors = {
      available: "bg-emerald-100 text-emerald-800 border-emerald-300",
      reserved: "bg-amber-100 text-amber-800 border-amber-300",
      sold: "bg-red-100 text-red-800 border-red-300",
      delivered: "bg-blue-100 text-blue-800 border-blue-300",
      consumed: "bg-gray-100 text-gray-800 border-gray-300",
      expired: "bg-orange-100 text-orange-800 border-orange-300",
    };
    return colors[stat] || colors.available;
  };

  const getStatusBadgeColor = (stat) => {
    const colors = {
      available: "bg-emerald-600",
      reserved: "bg-amber-600",
      sold: "bg-red-600",
      delivered: "bg-blue-600",
      consumed: "bg-gray-600",
      expired: "bg-orange-600",
    };
    return colors[stat] || colors.available;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mb-4"></div>
          <p className="text-lg font-semibold text-gray-700">
            Loading material details...
          </p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800">Item not found</p>
          <p className="text-gray-600 mt-2">
            The material you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <span>Raw Materials</span>
          <span>›</span>
          <span className="text-blue-600 font-semibold">{item.name}</span>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Images & Details */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="relative mb-6 rounded-2xl overflow-hidden shadow-xl bg-white">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

              {/* Status Badge */}
              <div
                className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-bold shadow-lg border text-white ${getStatusBadgeColor(
                  status
                )}`}
              >
                ✓ {status.charAt(0).toUpperCase() + status.slice(1)}
              </div>

              {/* Grade Badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold text-gray-900 shadow-md">
                ⭐ Grade: {item.qualityGrade}
              </div>
            </div>

            {/* Key Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100 hover:shadow-lg transition">
                <p className="text-xs text-gray-600 mb-1 uppercase font-semibold">
                  Quantity
                </p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  {item.quantity}
                </p>
                <p className="text-xs text-gray-500 mt-1">{item.unit}</p>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100 hover:shadow-lg transition">
                <p className="text-xs text-gray-600 mb-1 uppercase font-semibold">
                  Price
                </p>
                <p className="text-xl sm:text-2xl font-bold text-green-600">
                  ₹{item.pricePerUnit}
                </p>
                <p className="text-xs text-gray-500 mt-1">/unit</p>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100 hover:shadow-lg transition">
                <p className="text-xs text-gray-600 mb-1 uppercase font-semibold">
                  Total Value
                </p>
                <p className="text-xl sm:text-2xl font-bold text-blue-600">
                  ₹{(item.pricePerUnit * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Specifications Section */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-600">
                📋 Specifications
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-gray-600 uppercase font-bold mb-2">
                    Location
                  </p>
                  <p className="text-base font-semibold text-gray-900 flex items-center gap-2">
                    📍 {item.location}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-600 uppercase font-bold mb-2">
                    Quality Grade
                  </p>
                  <p className="text-base font-semibold text-gray-900">
                    {item.qualityGrade}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-600 uppercase font-bold mb-2">
                    Harvest Date
                  </p>
                  <p className="text-base font-semibold text-gray-900">
                    📅{" "}
                    {item.harvestDate ? item.harvestDate.slice(0, 10) : "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-600 uppercase font-bold mb-2">
                    Expiry Date
                  </p>
                  <p className="text-base font-semibold text-gray-900">
                    ⏰ {item.expiryDate ? item.expiryDate.slice(0, 10) : "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-600 uppercase font-bold mb-2">
                    Batch Code
                  </p>
                  <p className="text-base font-mono font-bold text-blue-600 break-all">
                    {item.batchCode}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-600 uppercase font-bold mb-2">
                    Stock Status
                  </p>
                  <p
                    className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(
                      status
                    )}`}
                  >
                    {status}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            {item.description && (
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  📝 Description
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {item.description}
                </p>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Summary Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl p-6 shadow-lg">
              <p className="text-sm opacity-90 mb-2">TOTAL VALUE</p>
              <p className="text-4xl font-bold mb-6">
                ₹{(item.pricePerUnit * item.quantity).toLocaleString()}
              </p>
              <div className="space-y-3 text-sm opacity-90 border-t border-blue-400 pt-4">
                <div className="flex justify-between">
                  <span>Unit Price</span>
                  <span className="font-bold">₹{item.pricePerUnit}</span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity</span>
                  <span className="font-bold">
                    {item.quantity} {item.unit}
                  </span>
                </div>
              </div>
            </div>

            {/* Status Update Card */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                ⚙️ Update Status
              </h3>

              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition mb-4 bg-white font-medium text-gray-900 text-sm"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="available">✓ Available</option>
                <option value="sold">✕ Sold</option>
                <option value="expired">⚠ Expired</option>
              </select>

              <button
                onClick={updateStatus}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 text-sm sm:text-base"
              >
                💾 Save Status
              </button>
            </div>

            {/* Supplier Info Card */}
            {item.farmer && (
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  🚜 Supplier Info
                </h3>

                <div className="space-y-3">
                  {item.farmer.name && (
                    <div>
                      <p className="text-xs text-gray-600 uppercase font-bold mb-1">
                        Supplier Name
                      </p>
                      <p className="font-semibold text-gray-900 text-sm">
                        {item.farmer.name}
                      </p>
                    </div>
                  )}

                  {item.farmer.phone && (
                    <a
                      href={`tel:${item.farmer.phone}`}
                      className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition text-blue-600 font-medium text-sm"
                    >
                      <span>📞</span>
                      <span>{item.farmer.phone}</span>
                    </a>
                  )}

                  {item.farmer?.email && (
                    <a
                      href={`mailto:${item.farmer.email}`}
                      className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition text-blue-600 font-medium text-sm"
                    >
                      <span>✉️</span>
                      <span className="truncate">{item.farmer.email}</span>
                    </a>
                  )}

                  {/* Google Maps Button */}
                  {item.location && (
                    <button
                      onClick={() => openDirections(item.location)}
                      className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold py-3 px-4 rounded-lg transition-all duration-200 border border-red-200 text-sm"
                    >
                      📍 View on Google Maps
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Features Card */}
            {/* <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                ✨ Features
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                  <div className="bg-emerald-100 p-2 rounded-lg text-lg">
                    🛡️
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      Quality Assured
                    </p>
                    <p className="text-xs text-gray-600">
                      Grade: {item.qualityGrade}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                  <div className="bg-blue-100 p-2 rounded-lg text-lg">🚚</div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      Fast Delivery
                    </p>
                    <p className="text-xs text-gray-600">Efficient logistics</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg text-lg">🎖️</div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      Certified
                    </p>
                    <p className="text-xs text-gray-600 break-all">
                      ID: {item.batchCode}
                    </p>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
