import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Search, Filter, ChevronDown, Star, Truck, Shield } from "lucide-react";

const RawMaterialList = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [rawMaterials, setRawMaterials] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  useEffect(() => {
    const fetchRawMaterials = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/rawmaterial/allraws`);
        setRawMaterials(response.data.materials);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching raw materials:", error);
        setLoading(false);
      }
    };
    fetchRawMaterials();
  }, []);

  let filteredData =
    statusFilter === "all"
      ? rawMaterials
      : rawMaterials.filter((item) => item.status === statusFilter);

  filteredData = filteredData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-lg font-semibold text-gray-700">
            Loading materials...
          </p>
        </div>
      </div>
    );
  }

  const statusColors = {
    available: "bg-emerald-50 text-emerald-700 border-emerald-200",
    reserved: "bg-amber-50 text-amber-700 border-amber-200",
    sold: "bg-red-50 text-red-700 border-red-200",
    delivered: "bg-blue-50 text-blue-700 border-blue-200",
    consumed: "bg-gray-50 text-gray-700 border-gray-200",
    expired: "bg-orange-50 text-orange-700 border-orange-200",
  };

  const statusIcons = {
    available: "✓",
    reserved: "◆",
    sold: "✕",
    delivered: "→",
    consumed: "⊗",
    expired: "⚠",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Raw Materials</h1>
          <p className="text-blue-100 text-lg">
            Discover premium quality materials for your business
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Search & Filter Bar */}
        <div className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Search Box */}
            <div className="md:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white appearance-none cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                statusFilter === "all"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300"
              }`}
            >
              All Materials
            </button>
            {[
              "available",
              "reserved",
              "sold",
              "delivered",
              "consumed",
              "expired",
            ].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-full font-medium transition-all capitalize ${
                  statusFilter === status
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-sm text-gray-600">
          Showing{" "}
          <span className="font-semibold text-gray-900">
            {filteredData.length}
          </span>{" "}
          materials
        </div>

        {/* Grid */}
        {filteredData.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredData.map((item) => (
              <Link
                key={item.batchCode}
                to={`/singlerawdetails/${item.batchCode}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col border border-gray-100 hover:border-blue-300"
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  {/* Status Badge */}
                  <div
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold border ${
                      statusColors[item.status] || statusColors.available
                    } flex items-center gap-1 shadow-md`} >
                    <span>{statusIcons[item.status]}</span>
                    {item.status}
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-4 flex flex-col flex-grow">
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {item.name}
                  </h3>

                  {/* Details Grid */}
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Quantity:</span>
                      <span className="font-semibold text-gray-900">
                        {item.quantity} {item.unit}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Grade:</span>
                      <span className="font-semibold text-gray-900">
                        {item.qualityGrade}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-100 my-3"></div>

                  {/* Price Section */}
                  {item.pricePerUnit && (
                    <div className="mb-3">
                      <p className="text-2xl font-bold text-blue-600">
                        ₹{item.pricePerUnit}
                        <span className="text-sm text-gray-500 font-normal">
                          /{item.unit}
                        </span>
                      </p>
                    </div>
                  )}

                  {/* CTA Button */}
                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg">
                    View Details
                  </button>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg font-medium">
              No materials found
            </p>
            <p className="text-gray-400 mt-2">
              Try adjusting your filters or search term
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RawMaterialList;
