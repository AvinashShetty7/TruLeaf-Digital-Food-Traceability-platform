import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Package, Truck, Leaf, Calendar, CheckCircle, MapPin, Phone, Mail } from "lucide-react";

export default function TraceProduct() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/product/singleproduct/${id}`, { withCredentials: true });
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
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-100 to-teal-50 flex items-center justify-center px-6">
        <div className="text-center space-y-4">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-green-200 border-t-green-600"></div>
          <p className="text-lg md:text-xl font-bold text-gray-700">
            Loading trace data...
          </p>
          <p className="text-sm text-gray-500">Please wait while we fetch product information</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-100 to-teal-50 flex items-center justify-center px-6">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
            <Package className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-lg md:text-xl font-bold text-gray-900">
            Product Not Found
          </p>
          <p className="text-sm text-gray-600 max-w-sm">
            The product you're looking for doesn't exist or has been removed
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-100 to-teal-50 px-4 md:px-6 py-8 md:py-12">
      <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
        {/* HEADER SECTION */}
        <div className="text-center space-y-4 md:space-y-6">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-green-100 rounded-full mb-4">
            <span className="text-sm font-semibold text-green-700">📦 Product Traceability</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent leading-tight">
            TruLeaf
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Complete supply chain transparency from farm to your hands
          </p>
        </div>

        {/* QR CODE SECTION */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-10 border border-gray-100 text-center">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
            Scan to Verify
          </h2>
          <div className="inline-flex items-center justify-center p-4 md:p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-200">
            <img
              src={product.qrCode}
              alt="QR Code"
              className="w-40 h-40 md:w-56 md:h-56 object-contain"
            />
          </div>
          <p className="text-xs md:text-sm text-gray-500 mt-4 font-medium">
            Scan with any smartphone camera to verify authenticity
          </p>
        </div>

        {/* PRODUCT DETAILS */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg p-6 md:p-8 border border-green-100 hover:shadow-xl transition-shadow">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Package className="w-6 h-6 text-green-600" />
            Product Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-green-50 rounded-xl p-4 md:p-5 border border-green-100">
              <p className="text-xs md:text-sm text-gray-600 font-semibold uppercase tracking-wide">Product Name</p>
              <p className="text-base md:text-lg font-bold text-gray-900 mt-1">{product.name}</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 md:p-5 border border-green-100">
              <p className="text-xs md:text-sm text-gray-600 font-semibold uppercase tracking-wide">Product Code</p>
              <p className="text-base md:text-lg font-mono font-bold text-green-700 mt-1">{product.productCode}</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 md:p-5 border border-blue-100">
              <p className="text-xs md:text-sm text-gray-600 font-semibold uppercase tracking-wide">Quantity</p>
              <p className="text-base md:text-lg font-bold text-gray-900 mt-1">
                {product.quantity} <span className="text-sm text-gray-600">{product.unit}</span>
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 md:p-5 border border-blue-100">
              <p className="text-xs md:text-sm text-gray-600 font-semibold uppercase tracking-wide">Category</p>
              <p className="text-base md:text-lg font-bold text-gray-900 mt-1">{product.category || "N/A"}</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 md:p-5 border border-purple-100 md:col-span-2">
              <p className="text-xs md:text-sm text-gray-600 font-semibold uppercase tracking-wide flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Manufacturing Location
              </p>
              <p className="text-base md:text-lg font-bold text-gray-900 mt-1">{product.manufacturingLocation || "N/A"}</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 md:p-5 border border-amber-100">
              <p className="text-xs md:text-sm text-gray-600 font-semibold uppercase tracking-wide flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Production Date
              </p>
              <p className="text-base md:text-lg font-bold text-gray-900 mt-1">
                {product.productionDate
                  ? new Date(product.productionDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                  : "N/A"}
              </p>
            </div>
            <div className="bg-red-50 rounded-xl p-4 md:p-5 border border-red-100">
              <p className="text-xs md:text-sm text-gray-600 font-semibold uppercase tracking-wide flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Expiry Date
              </p>
              <p className="text-base md:text-lg font-bold text-gray-900 mt-1">
                {product.expiryDate
                  ? new Date(product.expiryDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* MANUFACTURER DETAILS */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg p-6 md:p-8 border border-blue-100 hover:shadow-xl transition-shadow">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Truck className="w-6 h-6 text-blue-600" />
            Manufacturer
          </h2>

          <div className="space-y-3 md:space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 md:p-5 border border-blue-200">
              <p className="text-xs md:text-sm text-gray-600 font-semibold uppercase tracking-wide">Company Name</p>
              <p className="text-base md:text-lg font-bold text-gray-900 mt-1">{product.manufacturer?.name || "N/A"}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div className="bg-white rounded-xl p-4 md:p-5 border-2 border-blue-200 flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-600 font-semibold uppercase">Email</p>
                  <p className="text-sm md:text-base font-semibold text-gray-900 mt-1 break-all">{product.manufacturer?.email || "N/A"}</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 md:p-5 border-2 border-blue-200 flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-600 font-semibold uppercase">Phone</p>
                  <p className="text-sm md:text-base font-semibold text-gray-900 mt-1">{product.manufacturer?.phone || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RAW MATERIALS */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg p-6 md:p-8 border border-amber-100 hover:shadow-xl transition-shadow">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Leaf className="w-6 h-6 text-amber-600" />
            Raw Materials Used
          </h2>

          <div className="space-y-4 md:space-y-6">
            {product.consumedRawDetails.map((rm, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 md:p-6 border-2 border-amber-200 hover:shadow-md transition-all"
              >
                {/* Raw Material Header */}
                <div className="bg-white rounded-xl p-3 md:p-4 mb-4 border border-amber-100">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs md:text-sm text-gray-600 font-semibold uppercase">Raw Material</p>
                      <p className="text-lg md:text-xl font-bold text-gray-900 mt-1">{rm.name}</p>
                    </div>
                    <div className="inline-flex items-center px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs md:text-sm font-bold">
                      Batch {index + 1}
                    </div>
                  </div>
                </div>

                {/* Material Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
                  <div className="bg-white rounded-lg p-3 md:p-4 border border-amber-100">
                    <p className="text-xs text-gray-600 font-semibold uppercase">Batch Code</p>
                    <p className="text-sm md:text-base font-mono font-bold text-amber-700 mt-1">{rm.batchCode}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 md:p-4 border border-amber-100">
                    <p className="text-xs text-gray-600 font-semibold uppercase">Quantity Used</p>
                    <p className="text-sm md:text-base font-bold text-gray-900 mt-1">
                      {rm.quantityUsed} <span className="text-xs text-gray-600">{rm.unit}</span>
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-3 md:p-4 border border-amber-100 md:col-span-2">
                    <p className="text-xs text-gray-600 font-semibold uppercase flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Harvest Date
                    </p>
                    <p className="text-sm md:text-base font-bold text-gray-900 mt-1">
                      {rm.harvestDate
                        ? new Date(rm.harvestDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                        : "N/A"}
                    </p>
                  </div>
                </div>

                {/* Farmer Info */}
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-4 md:p-5 border-2 border-green-300">
                  <p className="font-bold text-green-900 text-sm md:text-base mb-3 flex items-center gap-2">
                    <Leaf className="w-5 h-5" />
                    Farmer Information
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-white/70 rounded-lg p-3 backdrop-blur-sm">
                      <p className="text-xs text-green-700 font-semibold uppercase">Name</p>
                      <p className="text-sm md:text-base font-bold text-gray-900 mt-1">{rm.farmer?.name || "N/A"}</p>
                    </div>
                    <div className="bg-white/70 rounded-lg p-3 backdrop-blur-sm flex items-center gap-2">
                      <Phone className="w-4 h-4 text-green-700 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs text-green-700 font-semibold uppercase">Phone</p>
                        <p className="text-sm md:text-base font-bold text-gray-900 mt-1 break-all">{rm.farmer?.phone || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PRODUCT TIMELINE */}
        {/* <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg p-6 md:p-8 border border-purple-100 hover:shadow-xl transition-shadow">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-purple-600" />
            Product Timeline
          </h2>

          <div className="relative space-y-3 md:space-y-4 pl-4 md:pl-6 border-l-4 border-gradient-to-b from-purple-400 to-purple-600">
            {product.traceHistory.map((entry, index) => (
              <div key={index} className="relative">
                
                <div className="absolute -left-7 md:-left-8 top-2 md:top-3 w-5 h-5 md:w-6 md:h-6 bg-purple-600 rounded-full border-4 border-white shadow-md"></div>

               
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 md:p-5 border border-purple-200 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
                    <p className="font-bold text-base md:text-lg text-purple-900 uppercase tracking-wide">
                      {entry.status}
                    </p>
                    <p className="text-xs md:text-sm text-gray-600 font-semibold whitespace-nowrap">
                      {new Date(entry.timestamp).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Footer Note */}
        <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl md:rounded-3xl p-4 md:p-6 border-2 border-green-300 text-center">
          <p className="text-sm md:text-base text-green-900 font-semibold">
            ✓ All information verified and encrypted for your security
          </p>
        </div>
      </div>
    </div>
  );
}



// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// export default function TraceProduct() {
//   const API_URL = import.meta.env.VITE_API_URL;
//   const { id } = useParams();

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadProduct = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/api/product/singleproduct/${id}`,{withCredentials:true});
//         setProduct(res.data.product);
//       } catch (err) {
//         console.log("Trace fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadProduct();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center text-xl font-semibold">
//         Loading trace data...
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="h-screen flex items-center justify-center text-xl text-red-600">
//         Product not found
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-green-50 p-6">
//       <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
//         {/* PRODUCT TITLE */}
//         <h1 className="text-3xl font-extrabold text-green-800 text-center mb-6">
//           {product.name} – Traceability Report
//         </h1>

//         {/* QR CODE */}
//         <div className="flex justify-center mb-8">
//           <img
//             src={product.qrCode}
//             alt="QR Code"
//             className="w-48 h-48 border shadow-lg rounded-xl"
//           />
//         </div>

//         {/* PRODUCT DETAILS */}
//         <div className="border rounded-xl p-6 mb-8 bg-green-50">
//           <h2 className="text-xl font-bold text-green-800 mb-3">
//             Product Details
//           </h2>

//           <p>
//             <b>Product Name:</b> {product.name}
//           </p>
//           <p>
//             <b>Product Code:</b> {product.productCode}
//           </p>
//           <p>
//             <b>Quantity:</b> {product.quantity} {product.unit}
//           </p>
//           <p>
//             <b>Category:</b> {product.category || "N/A"}
//           </p>
//           <p>
//             <b>Manufacturing Location:</b>{" "}
//             {product.manufacturingLocation || "N/A"}
//           </p>
//           <p>
//             <b>Production Date:</b>{" "}
//             {product.productionDate
//               ? new Date(product.productionDate).toLocaleDateString()
//               : "N/A"}
//           </p>
//           <p>
//             <b>Expiry Date:</b>{" "}
//             {product.expiryDate
//               ? new Date(product.expiryDate).toLocaleDateString()
//               : "N/A"}
//           </p>
//         </div>

//         {/* MANUFACTURER DETAILS */}
//         <div className="border rounded-xl p-6 mb-8 bg-blue-50">
//           <h2 className="text-xl font-bold text-blue-800 mb-3">
//             Manufacturer Details
//           </h2>

//           <p>
//             <b>Name:</b> {product.manufacturer?.name}
//           </p>
//           <p>
//             <b>Email:</b> {product.manufacturer?.email}
//           </p>
//           <p>
//             <b>Phone:</b> {product.manufacturer?.phone}
//           </p>
//         </div>

//         {/* RAW MATERIALS */}
//         <div className="border rounded-xl p-6 mb-8 bg-yellow-50">
//           <h2 className="text-xl font-bold text-yellow-800 mb-3">
//             Raw Materials Used
//           </h2>

//           {product.consumedRawDetails.map((rm, index) => (
//             <div
//               key={index}
//               className="border p-4 mb-4 rounded-lg bg-white shadow-sm"
//             >
//               <p>
//                 <b>Name:</b> {rm.name}
//               </p>
//               <p>
//                 <b>Batch Code:</b> {rm.batchCode}
//               </p>
//               <p>
//                 <b>Quantity Used:</b> {rm.quantityUsed} {rm.unit}
//               </p>
//               <p>
//                 <b>Harvest Date:</b>{" "}
//                 {rm.harvestDate
//                   ? new Date(rm.harvestDate).toLocaleDateString()
//                   : "N/A"}
//               </p>

//               {/* Farmer Info */}
//               <div className="mt-2 p-3 bg-green-100 rounded-lg">
//                 <p className="font-semibold text-green-800">
//                   Farmer Information
//                 </p>
//                 <p>
//                   <b>Name:</b> {rm.farmer?.name}
//                 </p>
//                 <p>
//                   <b>Phone:</b> {rm.farmer?.phone}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* PRODUCT TIMELINE */}
//         <div className="border rounded-xl p-6 bg-purple-50">
//           <h2 className="text-xl font-bold text-purple-800 mb-3">
//             Product Timeline
//           </h2>

//           <ul className="list-disc ml-6">
//             {product.traceHistory.map((entry, index) => (
//               <li key={index} className="mb-2">
//                 <b>{entry.status.toUpperCase()}</b> –{" "}
//                 {new Date(entry.timestamp).toLocaleString()}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }
