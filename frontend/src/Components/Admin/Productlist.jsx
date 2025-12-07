import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { X, QrCode, Info } from "lucide-react";

export default function Productlist() {
  const API_URL = import.meta.env.VITE_API_URL;
  // const MANUFACTURER_ID = "691a0664cee641dce9ba2a2e"; // replace with auth

  const [products, setProducts] = useState([]);
  const [selectedQR, setSelectedQR] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/product/manufacturer/allproduct`,
          { withCredentials: true }
        );
        setProducts(res.data.products || []);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "created":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "packaged":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-100 to-teal-50">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-7 px-6 shadow-xl overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <QrCode className="w-6 h-6" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-3 leading-tight">
          Products
          </h1>
         
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
        {/* No Products State */}
        {products.length === 0 && (
          <div className="text-center py-16 md:py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white rounded-full shadow-lg mb-6">
              <QrCode className="w-8 h-8 md:w-10 md:h-10 text-gray-400" />
            </div>
            <p className="text-gray-700 text-lg md:text-xl font-bold mb-2">
              No Products Yet
            </p>
            <p className="text-gray-500 text-sm md:text-base max-w-sm mx-auto">
              You haven't created any products yet. Start by creating your first product to get traceability going.
            </p>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-green-300 hover:-translate-y-2 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative h-48 md:h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Status Badge */}
                <div
                  className={`absolute top-4 right-4 px-4 py-2 rounded-full text-xs md:text-sm font-bold border-2 ${getStatusColor(
                    product.status
                  )} shadow-lg backdrop-blur-sm capitalize`}
                >
                  {product.status}
                </div>

                {/* Hover Overlay Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/95 backdrop-blur-sm rounded-full p-4 shadow-xl">
                    <QrCode className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 md:p-6 flex flex-col flex-grow">
                {/* Title */}
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-700 transition-colors">
                  {product.name}
                </h2>

                {/* Batch Code */}
                <p className="text-xs md:text-sm text-gray-500 font-mono mb-3 bg-gray-100 px-2 py-1 rounded-lg inline-w-fit w-fit">
                  Batch: {product.batchNumber || product.productCode}
                </p>

                {/* Details Grid */}
                <div className="space-y-2 mb-4 text-xs md:text-sm flex-grow">
                  <div className="flex justify-between items-center bg-green-50 px-3 py-2 rounded-lg border border-green-100">
                    <span className="text-gray-600 font-medium">Quantity:</span>
                    <span className="font-bold text-gray-900">
                      {product.quantity} {product.unit}
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-blue-50 px-3 py-2 rounded-lg border border-blue-100">
                    <span className="text-gray-600 font-medium">Category:</span>
                    <span className="font-bold text-gray-900">
                      {product.category || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100 my-3 md:my-4"></div>

                {/* Buttons */}
                <div className="flex gap-2 md:gap-3 w-full">
                  {/* View QR Button */}
                  <button
                    onClick={() => setSelectedQR(product.qrCode)}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-2.5 md:py-3 rounded-lg font-bold text-sm md:text-base transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2 group/btn"
                  >
                    <QrCode className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="hidden sm:inline">View QR</span>
                    <span className="sm:hidden">QR</span>
                  </button>

                  {/* View Details Button */}
                  <Link
                    to={`/TraceProduct/${product._id}`}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2.5 md:py-3 rounded-lg font-bold text-sm md:text-base transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2 group/btn"
                  >
                    <Info className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="hidden sm:inline">Details</span>
                    <span className="sm:hidden">Info</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QR Code Modal */}
      {selectedQR && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl text-center max-w-sm w-full border border-gray-200 animate-in fade-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-6 md:py-8 px-6 rounded-t-3xl flex items-center justify-between">
              <h3 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                <QrCode className="w-6 h-6 md:w-7 md:h-7" />
                QR Code
              </h3>
              <button
                onClick={() => setSelectedQR(null)}
                className="hover:bg-white/20 transition-colors p-1 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8">
              <p className="text-gray-600 text-sm md:text-base mb-6 font-medium">
                Scan this code to trace your product
              </p>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border-2 border-gray-200 mb-6">
                <img
                  src={selectedQR}
                  alt="QR Code"
                  className="w-64 h-64 mx-auto object-contain"
                />
              </div>

              <button
                onClick={() => setSelectedQR(null)}
                className="w-full px-6 py-3 md:py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-bold text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// export default function Productlist() {
//   const API_URL = import.meta.env.VITE_API_URL;
//   // const MANUFACTURER_ID = "691a0664cee641dce9ba2a2e"; // replace with auth

//   const [products, setProducts] = useState([]);
//   const [selectedQR, setSelectedQR] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get(
//           `${API_URL}/api/product/manufacturer/allproduct`,{withCredentials:true} 
//         );
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
//         <h1 className="text-3xl font-extrabold text-green-800 mb-8 text-center">
//           My Products
//         </h1>

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
