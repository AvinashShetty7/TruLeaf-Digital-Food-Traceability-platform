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
  // const [sortBy, setSortBy] = useState("popular");

  useEffect(() => {
    const fetchRawMaterials = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/rawmaterial/allraws`, { withCredentials: true });
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-blue-600"></div>
          <p className="text-lg font-semibold text-gray-700">
            Loading materials...
          </p>
          <p className="text-sm text-gray-500">Please wait while we fetch the latest items</p>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-5 px-6 shadow-xl overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-400/30 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
          </div>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl">
            Discover premium quality materials sourced directly from trusted farmers
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        {/* Search & Filter Bar */}
        <div className="mb-12 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Box */}
            <div className="md:col-span-2 relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="text"
                placeholder="Search materials by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 md:py-4 rounded-xl border-2 border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-300 font-medium placeholder-gray-400"
              />
            </div>

            {/* Sort Dropdown */}
            {/* <div className="relative group">
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none group-focus-within:text-blue-600 transition-colors" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 md:py-4 pr-10 rounded-xl border-2 border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white appearance-none cursor-pointer transition-all duration-300 font-medium"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div> */}
          </div>

          {/* Status Filter */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200">
            <p className="text-sm font-bold text-gray-700 mb-4 block md:hidden">Filter by Status:</p>
            <div className="flex flex-wrap gap-2 md:gap-3">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-4 py-2 md:px-5 md:py-2.5 rounded-full font-semibold text-sm md:text-base transition-all duration-300 ${
                  statusFilter === "all"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-400 hover:shadow-md"
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
                  className={`px-4 py-2 md:px-5 md:py-2.5 rounded-full font-semibold text-sm md:text-base capitalize transition-all duration-300 ${
                    statusFilter === status
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                      : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-400 hover:shadow-md"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8 flex items-center justify-between">
          <div className="text-sm md:text-base text-gray-600 font-medium">
            Showing{" "}
            <span className="font-bold text-gray-900 text-base md:text-lg">
              {filteredData.length}
            </span>{" "}
            {filteredData.length === 1 ? "material" : "materials"}
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500 bg-white px-3 py-2 rounded-lg border border-gray-200">
            <Shield className="w-4 h-4" />
            <span>Verified Suppliers</span>
          </div>
        </div>

        {/* Grid */}
        {filteredData.length > 0 ? (
          <div className="grid gap-4 md:gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredData.map((item) => (
              <Link
                key={item.batchCode}
                to={`/admin/Singlerawview/${item.batchCode}`}
                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col border border-gray-200 hover:border-blue-400 hover:-translate-y-2"
              >
                {/* Image Container */}
                <div className="relative h-40 md:h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Status Badge */}
                  <div
                    className={`absolute top-3 right-3 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold border-2 ${
                      statusColors[item.status] || statusColors.available
                    } flex items-center gap-1.5 shadow-lg backdrop-blur-sm`}
                  >
                    <span className="text-sm">{statusIcons[item.status]}</span>
                    <span className="capitalize font-bold">{item.status}</span>
                  </div>

                  {/* Hover Overlay Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/95 backdrop-blur-sm rounded-full p-3 md:p-4 shadow-xl">
                      <Truck className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-3 md:p-5 flex flex-col flex-grow">
                  {/* Title */}
                  <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                    {item.name}
                  </h3>

                  {/* Details Grid */}
                  <div className="space-y-1.5 md:space-y-2 mb-3 md:mb-4 text-xs md:text-sm">
                    <div className="flex justify-between items-center bg-gray-50 px-2 md:px-3 py-1.5 rounded-lg">
                      <span className="text-gray-600 font-medium">Qty:</span>
                      <span className="font-bold text-gray-900">
                        {item.quantity} {item.unit}
                      </span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 px-2 md:px-3 py-1.5 rounded-lg">
                      <span className="text-gray-600 font-medium">Grade:</span>
                      <span className="font-bold text-gray-900 bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md">
                        {item.qualityGrade}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-100 my-2 md:my-3"></div>

                  {/* Price Section */}
                  {item.pricePerUnit && (
                    <div className="mb-3 md:mb-4">
                      <p className="text-xl md:text-2xl font-black text-blue-600">
                        ₹{item.pricePerUnit}
                        <span className="text-xs md:text-sm text-gray-500 font-semibold">
                          /{item.unit}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 md:py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full mb-6">
              <Search className="w-8 h-8 md:w-10 md:h-10 text-gray-400" />
            </div>
            <p className="text-gray-700 text-lg md:text-xl font-bold mb-2">
              No materials found
            </p>
            <p className="text-gray-500 text-sm md:text-base max-w-sm mx-auto">
              Try adjusting your filters or search term to discover more products
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RawMaterialList;



// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { Search, Filter, ChevronDown, Star, Truck, Shield } from "lucide-react";

// const RawMaterialList = () => {
//   const API_URL = import.meta.env.VITE_API_URL;
//   const [rawMaterials, setRawMaterials] = useState([]);
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState("popular");

//   useEffect(() => {
//     const fetchRawMaterials = async () => {
//       try {
//         const response = await axios.get(`${API_URL}/api/rawmaterial/allraws`, { withCredentials: true });
//         setRawMaterials(response.data.materials);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching raw materials:", error);
//         setLoading(false);
//       }
//     };
//     fetchRawMaterials();
//   }, []);

//   let filteredData =
//     statusFilter === "all"
//       ? rawMaterials
//       : rawMaterials.filter((item) => item.status === statusFilter);

//   filteredData = filteredData.filter((item) =>
//     item.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 flex items-center justify-center">
//         <div className="text-center space-y-4">
//           <div className="inline-flex items-center justify-center">
//             <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-blue-600 shadow-lg"></div>
//           </div>
//           <p className="text-lg font-semibold text-gray-700">
//             Loading materials...
//           </p>
//           <p className="text-sm text-gray-500">Please wait while we fetch the latest inventory</p>
//         </div>
//       </div>
//     );
//   }

//   const statusColors = {
//     available: "bg-emerald-50 text-emerald-700 border-emerald-200",
//     reserved: "bg-amber-50 text-amber-700 border-amber-200",
//     sold: "bg-red-50 text-red-700 border-red-200",
//     delivered: "bg-blue-50 text-blue-700 border-blue-200",
//     consumed: "bg-gray-50 text-gray-700 border-gray-200",
//     expired: "bg-orange-50 text-orange-700 border-orange-200",
//   };

//   const statusIcons = {
//     available: "✓",
//     reserved: "◆",
//     sold: "✕",
//     delivered: "→",
//     consumed: "⊗",
//     expired: "⚠",
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
//       {/* Header Section */}
//       <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-16 px-6 shadow-2xl relative overflow-hidden">
//         <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 -z-10"></div>
//         <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400 rounded-full blur-3xl opacity-20 -z-10"></div>
//         <div className="max-w-7xl mx-auto relative z-10">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-lg flex items-center justify-center">
//               <Truck className="w-6 h-6" />
//             </div>
//           </div>
//           {/* <h1 className="text-5xl md:text-6xl font-black mb-3 leading-tight">
//             Raw Materials
//           </h1> */}
//           <p className="text-blue-100 text-xl font-medium max-w-2xl">
//             Discover premium quality materials sourced directly from farmers for your business needs
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-6 py-16">
//         {/* Search & Filter Section */}
//         <div className="mb-12 space-y-6">
//           {/* Search & Sort Row */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {/* Search Box */}
//             <div className="md:col-span-2 relative group">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl blur opacity-0 group-focus-within:opacity-30 transition-opacity duration-300"></div>
//               <div className="relative">
//                 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-blue-600" />
//                 <input
//                   type="text"
//                   placeholder="Search by material name, type, or batch..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full pl-12 pr-5 py-4 rounded-xl border-2 border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white hover:border-gray-300 transition-all duration-300 text-base placeholder-gray-400 font-medium"
//                 />
//               </div>
//             </div>

//             {/* Sort Dropdown */}
//             <div className="relative group">
//               <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none transition-transform group-focus-within:rotate-180 group-focus-within:text-blue-600 duration-300" />
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="w-full px-4 py-4 pr-12 rounded-xl border-2 border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white appearance-none cursor-pointer hover:border-gray-300 transition-all duration-300 text-base font-medium text-gray-900"
//               >
//                 <option value="popular">⭐ Most Popular</option>
//                 <option value="price-low">💰 Price: Low to High</option>
//                 <option value="price-high">💎 Price: High to Low</option>
//                 <option value="newest">🆕 Newest First</option>
//               </select>
//             </div>
//           </div>

//           {/* Status Filter Chips */}
//           <div className="flex flex-wrap gap-3">
//             <button
//               onClick={() => setStatusFilter("all")}
//               className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 whitespace-nowrap ${
//                 statusFilter === "all"
//                   ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200 scale-105"
//                   : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 shadow-sm"
//               }`}
//             >
//               All Materials
//             </button>
//             {[
//               "available",
//               "reserved",
//               "sold",
//               "delivered",
//               "consumed",
//               "expired",
//             ].map((status) => (
//               <button
//                 key={status}
//                 onClick={() => setStatusFilter(status)}
//                 className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 capitalize whitespace-nowrap ${
//                   statusFilter === status
//                     ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200 scale-105"
//                     : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 shadow-sm"
//                 }`}
//               >
//                 {status}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Results Header */}
//         <div className="mb-8 flex items-center justify-between bg-white rounded-xl px-6 py-4 border border-gray-200 shadow-sm">
//           <div className="text-base text-gray-700 font-medium">
//             Found <span className="font-bold text-blue-600 text-lg">{filteredData.length}</span> {filteredData.length === 1 ? "material" : "materials"}
//           </div>
//           <div className="text-sm text-gray-500">
//             {statusFilter !== "all" && `Status: ${statusFilter}`}
//           </div>
//         </div>

//         {/* Materials Grid */}
//         {filteredData.length > 0 ? (
//           <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-max">
//             {filteredData.map((item) => (
//               <Link
//                 key={item.batchCode}
//                 to={`/admin/Singlerawview/${item.batchCode}`}
//                 className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col border-2 border-gray-100 hover:border-blue-300 hover:-translate-y-2 active:scale-95"
//               >
//                 {/* Image Container */}
//                 <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
//                   <img
//                     src={item.imageUrl}
//                     alt={item.name}
//                     className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500 ease-out"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

//                   {/* Status Badge */}
//                   <div
//                     className={`absolute top-4 right-4 px-4 py-2 rounded-full text-xs font-bold border-2 ${
//                       statusColors[item.status] || statusColors.available
//                     } flex items-center gap-1.5 shadow-xl backdrop-blur-sm bg-opacity-95 transform transition-all duration-300 group-hover:scale-110`}
//                   >
//                     <span className="text-sm">{statusIcons[item.status]}</span>
//                     <span className="capitalize font-bold">{item.status}</span>
//                   </div>

//                   {/* Quality Badge */}
//                   <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-sm font-bold text-xs text-gray-900 shadow-lg">
//                     Grade: {item.qualityGrade}
//                   </div>
//                 </div>

//                 {/* Content Container */}
//                 <div className="p-6 flex flex-col flex-grow space-y-4">
//                   {/* Title */}
//                   <div>
//                     <h3 className="text-xl font-black text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight">
//                       {item.name}
//                     </h3>
//                     <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Batch: {item.batchCode}</p>
//                   </div>

//                   {/* Details Grid */}
//                   <div className="space-y-3 bg-gray-50 rounded-lg p-4 border border-gray-100">
//                     <div className="flex justify-between items-center">
//                       <span className="text-sm font-semibold text-gray-600">Quantity</span>
//                       <span className="font-black text-gray-900 text-lg">
//                         {item.quantity} <span className="text-xs font-bold text-gray-500">{item.unit}</span>
//                       </span>
//                     </div>
//                     <div className="h-px bg-gradient-to-r from-gray-200 to-transparent"></div>
//                   </div>

//                   {/* Price Section */}
//                   {item.pricePerUnit && (
//                     <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
//                       <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Price Per Unit</p>
//                       <p className="text-3xl font-black text-blue-700">
//                         ₹{item.pricePerUnit}
//                         <span className="text-xs font-bold text-blue-600 ml-1">
//                           / {item.unit}
//                         </span>
//                       </p>
//                     </div>
//                   )}

//                   {/* CTA Button */}
//                   <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 active:scale-95 mt-2 flex items-center justify-center gap-2">
//                     <span>View Details</span>
//                     <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
//                   </button>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-20 px-6">
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
//               <Filter className="w-10 h-10 text-blue-600" />
//             </div>
//             <p className="text-2xl font-bold text-gray-900 mb-2">
//               No materials found
//             </p>
//             <p className="text-gray-600 text-lg max-w-md mx-auto">
//               Try adjusting your filters or search term to find what you're looking for
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RawMaterialList;






// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { Search, Filter, ChevronDown, Star, Truck, Shield } from "lucide-react";

// const RawMaterialList = () => {
//   const API_URL = import.meta.env.VITE_API_URL;
//   const [rawMaterials, setRawMaterials] = useState([]);
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState("popular");

//   useEffect(() => {
//     const fetchRawMaterials = async () => {
//       try {
//         const response = await axios.get(`${API_URL}/api/rawmaterial/allraws`,{withCredentials:true} );
//         setRawMaterials(response.data.materials);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching raw materials:", error);
//         setLoading(false);
//       }
//     };
//     fetchRawMaterials();
//   }, []);

//   let filteredData =
//     statusFilter === "all"
//       ? rawMaterials
//       : rawMaterials.filter((item) => item.status === statusFilter);

//   filteredData = filteredData.filter((item) =>
//     item.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
//           <p className="text-lg font-semibold text-gray-700">
//             Loading materials...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const statusColors = {
//     available: "bg-emerald-50 text-emerald-700 border-emerald-200",
//     reserved: "bg-amber-50 text-amber-700 border-amber-200",
//     sold: "bg-red-50 text-red-700 border-red-200",
//     delivered: "bg-blue-50 text-blue-700 border-blue-200",
//     consumed: "bg-gray-50 text-gray-700 border-gray-200",
//     expired: "bg-orange-50 text-orange-700 border-orange-200",
//   };

//   const statusIcons = {
//     available: "✓",
//     reserved: "◆",
//     sold: "✕",
//     delivered: "→",
//     consumed: "⊗",
//     expired: "⚠",
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
//       {/* Header Section */}
//       <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-6 shadow-lg">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-4xl md:text-5xl font-bold mb-2">Raw Materials</h1>
//           <p className="text-blue-100 text-lg">
//             Discover premium quality materials for your business
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-6 py-12">
//         {/* Search & Filter Bar */}
//         <div className="mb-10">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             {/* Search Box */}
//             <div className="md:col-span-2 relative">
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search materials..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all"
//               />
//             </div>

//             {/* Sort Dropdown */}
//             <div className="relative">
//               <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white appearance-none cursor-pointer"
//               >
//                 <option value="popular">Most Popular</option>
//                 <option value="price-low">Price: Low to High</option>
//                 <option value="price-high">Price: High to Low</option>
//                 <option value="newest">Newest First</option>
//               </select>
//             </div>
//           </div>

//           {/* Status Filter */}
//           <div className="flex flex-wrap gap-2">
//             <button
//               onClick={() => setStatusFilter("all")}
//               className={`px-4 py-2 rounded-full font-medium transition-all ${
//                 statusFilter === "all"
//                   ? "bg-blue-600 text-white shadow-md"
//                   : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300"
//               }`}
//             >
//               All Materials
//             </button>
//             {[
//               "available",
//               "reserved",
//               "sold",
//               "delivered",
//               "consumed",
//               "expired",
//             ].map((status) => (
//               <button
//                 key={status}
//                 onClick={() => setStatusFilter(status)}
//                 className={`px-4 py-2 rounded-full font-medium transition-all capitalize ${
//                   statusFilter === status
//                     ? "bg-blue-600 text-white shadow-md"
//                     : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300"
//                 }`}
//               >
//                 {status}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Results Count */}
//         <div className="mb-6 text-sm text-gray-600">
//           Showing{" "}
//           <span className="font-semibold text-gray-900">
//             {filteredData.length}
//           </span>{" "}
//           materials
//         </div>

//         {/* Grid */}
//         {filteredData.length > 0 ? (
//           <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//             {filteredData.map((item) => (
//               <Link
//                 key={item.batchCode}
//                 to={`/admin/Singlerawview/${item.batchCode}`}
//                 className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col border border-gray-100 hover:border-blue-300"
//               >
//                 {/* Image Container */}
//                 <div className="relative h-48 overflow-hidden bg-gray-100">
//                   <img
//                     src={item.imageUrl}
//                     alt={item.name}
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

//                   {/* Status Badge */}
//                   <div
//                     className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold border ${
//                       statusColors[item.status] || statusColors.available
//                     } flex items-center gap-1 shadow-md`} >
//                     <span>{statusIcons[item.status]}</span>
//                     {item.status}
//                   </div>
//                 </div>

//                 {/* Content Container */}
//                 <div className="p-4 flex flex-col flex-grow">
//                   {/* Title */}
//                   <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
//                     {item.name}
//                   </h3>

//                   {/* Details Grid */}
//                   <div className="space-y-2 mb-4 text-sm">
//                     <div className="flex justify-between items-center">
//                       <span className="text-gray-600">Quantity:</span>
//                       <span className="font-semibold text-gray-900">
//                         {item.quantity} {item.unit}
//                       </span>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className="text-gray-600">Grade:</span>
//                       <span className="font-semibold text-gray-900">
//                         {item.qualityGrade}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Divider */}
//                   <div className="border-t border-gray-100 my-3"></div>

//                   {/* Price Section */}
//                   {item.pricePerUnit && (
//                     <div className="mb-3">
//                       <p className="text-2xl font-bold text-blue-600">
//                         ₹{item.pricePerUnit}
//                         <span className="text-sm text-gray-500 font-normal">
//                           /{item.unit}
//                         </span>
//                       </p>
//                     </div>
//                   )}

//                   {/* CTA Button */}
//                   <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg">
//                     View Details
//                   </button>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <p className="text-gray-500 text-lg font-medium">
//               No materials found
//             </p>
//             <p className="text-gray-400 mt-2">
//               Try adjusting your filters or search term
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RawMaterialList;
