import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

export default function Fetchallraws() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/rawmaterial/allavailableraws`,
          { withCredentials: true }
        );
        setItems(res.data.materials || []);
      } catch (error) {
        console.log("Error fetching raw materials", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  let filteredData = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-7  px-6 shadow-xl overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
          </div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex items-center gap-3 mb-4">
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-3 leading-tight">
              Raw Crops
            </h1>
            <p>Reserve your crops now!</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mt-5 mb-8 sm:mb-10 lg:mb-12">
          <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search materials by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 sm:pl-12 pr-4 sm:pr-5 py-2.5 sm:py-3 lg:py-3.5 rounded-lg sm:rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:border-blue-500 bg-white transition-all duration-200 text-sm sm:text-base placeholder:text-slate-400"
          />
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center min-h-96">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-blue-600"></div>
              <p className="text-slate-600 text-sm sm:text-base font-medium">
                Loading raw materials...
              </p>
            </div>
          </div>
        ) : filteredData.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 lg:py-32">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-100 to-slate-100 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m0 10v10l8 4m0-10l8 4"
                />
              </svg>
            </div>
            <p className="text-center text-slate-700 text-base sm:text-lg font-semibold mb-1">
              No raw materials found
            </p>
            <p className="text-center text-slate-500 text-xs sm:text-sm max-w-xs">
              Try adjusting your search or check back later
            </p>
          </div>
        ) : (
          // Product Grid - 2 columns on mobile, responsive on larger screens
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {filteredData.map((item) => (
              <Link
                to={`/manu/singlerawdetails/${item.batchCode}`}
                key={item.batchCode}
                className="group bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden hover:-translate-y-1 sm:hover:-translate-y-2 flex flex-col h-full"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 h-24 sm:h-28 md:h-36 lg:h-44 flex-shrink-0">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>

                {/* Content Section */}
                <div className="p-2.5 sm:p-3.5 md:p-4 lg:p-5 flex flex-col flex-grow gap-2 sm:gap-2.5">
                  {/* Product Name */}
                  <h2 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-slate-900 line-clamp-2 group-hover:text-blue-700 transition-colors duration-200">
                    {item.name}
                  </h2>

                  {/* Batch Code */}
                  <p className="text-xs sm:text-xs md:text-sm text-blue-600 font-semibold truncate">
                    Batch:{" "}
                    <span className="text-slate-700">{item.batchCode}</span>
                  </p>

                  {/* Details Section */}
                  <div className="space-y-1.5 sm:space-y-2 text-slate-700 text-xs sm:text-xs md:text-sm flex-grow">
                    {/* Status */}
                    <div className="flex items-start gap-1.5 sm:gap-2">
                      <span className="font-semibold text-slate-800 flex-shrink-0 pt-0.5">
                        Status:
                      </span>
                      <span
                        className={`inline-block text-xs sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full flex-shrink-0 ${
                          item.status === "available"
                            ? "bg-emerald-100 text-emerald-700"
                            : item.status === "sold"
                            ? "bg-red-100 text-red-700"
                            : item.status === "reserved"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-1.5 sm:gap-2">
                      <span className="font-semibold text-slate-800">
                        Price:
                      </span>
                      <span className="text-blue-700 font-bold text-xs sm:text-xs md:text-sm lg:text-base">
                        ₹{item.pricePerUnit}
                      </span>
                      <span className="text-slate-500 text-xs">
                        per {item.unit}
                      </span>
                    </div>

                    {/* Unit */}
                    <div className="flex items-baseline gap-1.5 sm:gap-2">
                      <span className="font-semibold text-slate-800">
                        Unit:
                      </span>
                      <span className="text-slate-700 font-medium">
                        {item.unit}
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-2 sm:pt-3 mt-auto border-t border-slate-100">
                    <div className="text-xs sm:text-xs md:text-sm font-bold text-blue-600 group-hover:text-blue-700 flex items-center gap-1.5 transition-colors duration-200">
                      View Details
                      <svg
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-200 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { Search } from "lucide-react";

// export default function Fetchallraws() {
//   const API_URL = import.meta.env.VITE_API_URL;

//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(
//           `${API_URL}/api/rawmaterial/allavailableraws`,
//           { withCredentials: true }
//         );
//         setItems(res.data.materials || []);
//       } catch (error) {
//         console.log("Error fetching raw materials", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//  let filteredData = items.filter((item) =>
//     item.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 px-3 sm:px-4 md:px-6 lg:px-8 py-5 sm:py-6 md:py-8 lg:py-10">
//       <div className="w-full max-w-7xl mx-auto">
//         <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-blue-900 mb-8 sm:mb-10 md:mb-12 text-center tracking-tight">
//           Available  Raw Materials
//         </h1>
//         {/*search bar*/}
//         <div className="md:col-span-2 relative mb-6">
//           <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//           <input
//             type="text"
//             placeholder="Search materials..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all"
//           />
//         </div>

//         {loading ? (
//           <div className="flex justify-center items-center min-h-96">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//           </div>
//         ) : filteredData.length === 0 ? (
//           <div className="text-center py-16">
//             <p className="text-gray-600 text-base sm:text-lg md:text-xl">
//               No raw materials found.
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
//             {filteredData.map((item) => (
//               <Link
//                 to={`/manu/singlerawdetails/${item.batchCode}`}
//                 key={item.batchCode}
//                 className="group bg-white border border-gray-100 shadow-md hover:shadow-lg sm:hover:shadow-xl transition-all rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden hover:-translate-y-1 sm:hover:-translate-y-2 flex flex-col h-full"
//               >
//                 <div className="relative overflow-hidden bg-gray-200 h-24 sm:h-28 md:h-36 lg:h-44">
//                   <img
//                     src={item.imageUrl}
//                     alt={item.name}
//                     className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//                   />
//                 </div>

//                 <div className="p-2 sm:p-3 md:p-4 lg:p-5 flex flex-col flex-grow">
//                   <h2 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-blue-900 mb-0.5 sm:mb-1 md:mb-1.5 line-clamp-2">
//                     {item.name}
//                   </h2>

//                   <p className="text-xs text-blue-600 mb-1.5 sm:mb-2 md:mb-3 font-semibold truncate">
//                     Batch: {item.batchCode}
//                   </p>

//                   <div className="space-y-0.5 sm:space-y-1 text-gray-700 text-xs sm:text-sm md:text-base flex-grow">
//                     <p>
//                       <span className="font-semibold text-gray-800">
//                         Status:
//                       </span>{" "}
//                       <span
//                         className={`text-xs sm:text-sm font-medium px-2 py-0.5 rounded-full ${
//                           item.status === "available"
//                             ? "bg-green-100 text-green-700"
//                             : item.status === "sold"
//                             ? "bg-red-100 text-red-700"
//                             : item.status === "reserved"
//                             ? "bg-yellow-100 text-yellow-700"
//                             : "bg-gray-100 text-gray-700"
//                         }`}
//                       >
//                         {item.status}
//                       </span>
//                     </p>

//                     <p>
//                       <span className="font-semibold text-gray-800">
//                         Price:
//                       </span>{" "}
//                       <span className="text-blue-700 font-bold">
//                         ₹{item.pricePerUnit}
//                       </span>
//                     </p>

//                     <p>
//                       <span className="font-semibold text-gray-800">Unit:</span>{" "}
//                       {item.unit}
//                     </p>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
