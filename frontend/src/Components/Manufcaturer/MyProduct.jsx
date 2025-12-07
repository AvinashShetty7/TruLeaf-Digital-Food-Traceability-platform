import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { QrCode } from "lucide-react";

export default function MyProducts() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [products, setProducts] = useState([]);
  const [selectedQR, setSelectedQR] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/product/manufacturer`, {
          withCredentials: true,
        });
        setProducts(res.data.products || []);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white mb-8 sm:mb-10 lg:mb-12 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl">
          {/* Animated Background Blobs */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-48 sm:w-72 h-48 sm:h-72 bg-emerald-400 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-teal-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>

          {/* Header Content */}
          <div className="relative z-10 p-6 sm:p-8 lg:p-10">
            <div className="flex items-start gap-3 sm:gap-4 mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md rounded-xl sm:rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <QrCode className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-1 sm:mb-2">
                  My Products
                </h1>
                <p className="text-emerald-100 text-xs sm:text-sm font-medium">Manage and track your product inventory</p>
              </div>
            </div>
          </div>
        </div>

        {/* No Products State */}
        {products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 sm:py-20 lg:py-32">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-center text-slate-700 text-base sm:text-lg font-semibold mb-2">
              You haven't created any products yet.
            </p>
            <p className="text-center text-slate-500 text-xs sm:text-sm max-w-xs">
              Start by adding your first product to build your inventory
            </p>
          </div>
        )}

        {/* Product Grid - 2 columns on mobile, 3 on tablet/desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6 xl:gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-slate-200 rounded-lg sm:rounded-2xl shadow-md hover:shadow-xl hover:border-emerald-300 transition-all duration-300 overflow-hidden group flex flex-col"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden bg-slate-100 h-28 sm:h-36 lg:h-48 flex-shrink-0">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {/* Status Badge */}
                <div className="absolute top-1.5 sm:top-3 right-1.5 sm:right-3">
                  <span
                    className={`inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-bold shadow-lg ${
                      product.status === "created"
                        ? "bg-blue-500 text-white"
                        : product.status === "packaged"
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-500 text-white"
                    }`}
                  >
                    {product.status}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-3 sm:p-4 lg:p-5 flex-grow flex flex-col">
                {/* Product Name */}
                <h2 className="text-xs sm:text-sm lg:text-lg font-bold text-slate-900 line-clamp-2 mb-1 sm:mb-2 group-hover:text-emerald-700 transition-colors duration-200">
                  {product.name}
                </h2>

                {/* Batch Number */}
                <p className="text-xs sm:text-xs lg:text-sm text-slate-500 mb-1.5 sm:mb-2 font-medium">
                  <span className="text-slate-600">Batch:</span>{" "}
                  <span className="font-semibold text-slate-800">{product.batchNumber || product.productCode}</span>
                </p>

                {/* Quantity with Icon */}
                <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 6H6.28l-.31-1.243A1 1 0 005 3H3z" />
                  </svg>
                  <p className="text-xs sm:text-xs lg:text-sm text-slate-600">
                    <span className="font-bold text-slate-900">{product.quantity}</span> <span className="text-slate-500">{product.unit}</span>
                  </p>
                </div>

                {/* Category */}
                <p className="text-xs sm:text-xs lg:text-sm text-slate-600 mb-2 sm:mb-2.5">
                  <span className="font-semibold text-slate-700">Category:</span>{" "}
                  <span className="text-slate-600">{product.category || "N/A"}</span>
                </p>

                {/* Spacer */}
                <div className="flex-grow"></div>

                {/* Action Buttons */}
                <div className="flex gap-1.5 sm:gap-2 pt-2.5 sm:pt-3 lg:pt-4 border-t border-slate-100 mt-2.5 sm:mt-3">
                  {/* View QR Button - Primary */}
                  <button
                    onClick={() => setSelectedQR(product.qrCode)}
                    className="flex-1 inline-flex items-center justify-center gap-1 text-xs sm:text-xs lg:text-sm font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-2.5 sm:px-3 py-1.5 sm:py-2 lg:py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 group/btn"
                  >
                    <QrCode className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">QR</span>
                  </button>

                  {/* View Details Button - Secondary */}
                  <Link
                    to={`/TraceProduct/${product._id}`}
                    className="flex-1 inline-flex items-center justify-center gap-1 text-xs sm:text-xs lg:text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 sm:px-3 py-1.5 sm:py-2 lg:py-2.5 rounded-lg transition-all duration-200 hover:shadow-md active:scale-95 group/btn"
                  >
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Details</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* QR Code Modal Popup */}
        {selectedQR && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 sm:p-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl text-center max-w-sm w-full p-4 sm:p-6 lg:p-8 transform transition-all duration-200 scale-100">
              {/* Modal Header */}
              <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <QrCode className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                  </div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900">Product QR Code</h3>
                </div>
                <button
                  onClick={() => setSelectedQR(null)}
                  className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* QR Code Image Container */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-5 rounded-xl mb-4 sm:mb-6 border-2 border-slate-200">
                <img
                  src={selectedQR}
                  alt="QR Code"
                  className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 mx-auto border-4 border-white rounded-lg shadow-lg"
                />
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedQR(null)}
                className="w-full px-4 py-2.5 sm:py-3 lg:py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-lg transition-all duration-200 hover:shadow-lg active:scale-95 text-sm sm:text-base"
              >
                Close Modal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { QrCode } from "lucide-react";

// export default function MyProducts() {
//   const API_URL = import.meta.env.VITE_API_URL;

//   const [products, setProducts] = useState([]);
//   const [selectedQR, setSelectedQR] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/api/product/manufacturer`, {
//           withCredentials: true,
//         });
//         setProducts(res.data.products || []);
//       } catch (error) {
//         console.log("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 p-6">
//       <div className="max-w-6xl mx-auto">
//         <div className="relative bg-gradient-to-r mb-7 from-green-600 via-emerald-600 to-teal-600 text-white py-4 px-6 shadow-xl overflow-hidden">
//           <div className="absolute inset-0 opacity-10">
//             <div className="absolute top-0 right-0 w-96 h-96 bg-green-400 rounded-full blur-3xl"></div>
//             <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
//           </div>
//           <div className="max-w-6xl mx-auto relative z-10">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
//                 <QrCode className="w-6 h-6" />
//               </div>
//             </div>
//             <h1 className="text-4xl md:text-5xl font-black mb-3 leading-tight">
//               My Products
//             </h1>
//           </div>
//         </div>

//         {/* No Products */}
//         {products.length === 0 && (
//           <p className="text-center text-gray-600 text-lg">
//             You haven't created any products yet.
//           </p>
//         )}

//         {/* Product Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {products.map((product) => (
//             <div
//               key={product._id}
//               className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all"
//             >
//               {/* Image */}
//               <img
//                 src={product.imageUrl}
//                 alt={product.name}
//                 className="w-full h-48 object-cover rounded-t-2xl"
//               />

//               {/* Info */}
//               <div className="p-5">
//                 <h2 className="text-xl font-bold text-green-800">
//                   {product.name}
//                 </h2>
//                 <p className="text-sm text-gray-500">
//                   Batch: {product.batchNumber || product.productCode}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   {product.quantity} {product.unit}
//                 </p>

//                 <p className="mt-2 text-sm">
//                   <span className="font-semibold">Category:</span>{" "}
//                   {product.category || "N/A"}
//                 </p>

//                 <p
//                   className={`mt-1 text-sm font-semibold ${
//                     product.status === "created"
//                       ? "text-blue-700"
//                       : product.status === "packaged"
//                       ? "text-green-700"
//                       : "text-gray-700"
//                   }`}
//                 >
//                   Status: {product.status}
//                 </p>
//               </div>

//               {/* Buttons */}
//               <div className="flex justify-between items-center px-5 pb-4">
//                 {/* View QR */}
//                 <button
//                   onClick={() => setSelectedQR(product.qrCode)}
//                   className="text-sm bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
//                 >
//                   View QR
//                 </button>

//                 {/* View Details */}
//                 <Link
//                   to={`/TraceProduct/${product._id}`}
//                   className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
//                 >
//                   Details
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* QR Popup */}
//         {selectedQR && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//             <div className="bg-white p-5 rounded-xl shadow-xl text-center">
//               <h3 className="text-lg font-bold mb-3">Product QR Code</h3>

//               <img
//                 src={selectedQR}
//                 alt="QR Code"
//                 className="w-56 h-56 mx-auto mb-4 border rounded-xl"
//               />

//               <button
//                 onClick={() => setSelectedQR(null)}
//                 className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
