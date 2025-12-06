import { useState } from "react";
import { Menu, X } from "lucide-react";
import axios from "axios";
import { useEffect } from "react";

export default function FarmerKYCPage() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [aadhar, setAadhar] = useState(null);
  const [kisan, setKisan] = useState(null);
  const [land, setLand] = useState(null);
  const [selfie, setSelfie] = useState(null);
  const [authChecking, setAuthChecking] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkdocssumitted = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/user/docssubmitted`, {
          withCredentials: true,
        });
        console.log(res.data.user.documents.length);
        if (res.data.user.documents.length == 0) {
          setAuthChecking(true);
        }
      } catch (error) {
        console.log("error:", error);
      }
    };
    checkdocssumitted();
  }, []);

  const handleSubmit = async () => {
    try {
      if (loading) return;
      setLoading(true);
      const formData = new FormData();
      formData.append("aadhar", aadhar);
      formData.append("kisanCard", kisan);
      formData.append("landRecord", land);
      formData.append("selfie", selfie);

      const res = await axios.post(
        `${API_URL}/api/farmer/upload-kyc`,
        formData,
        {
          withCredentials: true,
        }
      );
      alert(res.data.message);

    } catch (err) {
      console.error(err);
      alert("Upload failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  if (!authChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-100 to-teal-50 flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-lg">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
            Documents Submitted
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed max-w-xl mx-auto">
            Thank you for submitting your documents! Our verification team is carefully reviewing them now. We'll notify you as soon as the verification process is complete.
          </p>
          <div className="flex justify-center gap-3 pt-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
              <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-green-700">Under Review</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (authChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-100 to-teal-50 px-6 py-12">
        {/* Main Container */}
        <div className="max-w-3xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-green-100 rounded-full mb-4">
              <span className="text-sm font-semibold text-green-700">🌾 Farmer KYC Verification</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent leading-tight">
              Complete Your Verification
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Please upload your documents to verify your farmer account and start listing your crops
            </p>
          </div>

          {/* Document Upload Card */}
          <div
            id="add-docs"
            className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
          >
            {/* Card Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-8 md:px-12 md:py-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Required Documents
              </h2>
              <p className="text-green-100 mt-2 font-medium">
                All fields are mandatory for verification
              </p>
            </div>

            {/* Card Body */}
            <div className="p-8 md:p-12 space-y-8">
              {/* Document 1 - Aadhar */}
              <div className="group">
                <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full text-xs font-bold">1</span>
                  Aadhar Card Photo
                </label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={(e) => setAadhar(e.target.files[0])}
                    className="w-full px-4 py-3 md:py-4 border-2 border-gray-200 rounded-xl bg-gray-50 font-medium text-gray-700 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:bg-white transition-all duration-300 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">📄</span>
                </div>
                {aadhar && <p className="text-xs text-green-600 font-semibold mt-2">✓ File selected: {aadhar.name}</p>}
              </div>

              {/* Document 2 - Kisan Card */}
              <div className="group">
                <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full text-xs font-bold">2</span>
                  Kisan Card
                </label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={(e) => setKisan(e.target.files[0])}
                    className="w-full px-4 py-3 md:py-4 border-2 border-gray-200 rounded-xl bg-gray-50 font-medium text-gray-700 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:bg-white transition-all duration-300 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">🎫</span>
                </div>
                {kisan && <p className="text-xs text-green-600 font-semibold mt-2">✓ File selected: {kisan.name}</p>}
              </div>

              {/* Document 3 - Land Record */}
              <div className="group">
                <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full text-xs font-bold">3</span>
                  Land Record (Proof)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={(e) => setLand(e.target.files[0])}
                    className="w-full px-4 py-3 md:py-4 border-2 border-gray-200 rounded-xl bg-gray-50 font-medium text-gray-700 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:bg-white transition-all duration-300 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">🗺️</span>
                </div>
                {land && <p className="text-xs text-green-600 font-semibold mt-2">✓ File selected: {land.name}</p>}
              </div>

              {/* Document 4 - Selfie */}
              <div className="group">
                <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full text-xs font-bold">4</span>
                  Selfie of Farmer
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    capture="user"
                    onChange={(e) => setSelfie(e.target.files[0])}
                    className="w-full px-4 py-3 md:py-4 border-2 border-gray-200 rounded-xl bg-gray-50 font-medium text-gray-700 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:bg-white transition-all duration-300 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">🤳</span>
                </div>
                {selfie && <p className="text-xs text-green-600 font-semibold mt-2">✓ File selected: {selfie.name}</p>}
              </div>

              {/* Submit Button */}
              <div className="pt-8 border-t border-gray-200">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white py-4 md:py-5 rounded-xl text-lg md:text-xl font-bold shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="animate-spin inline-block w-5 h-5 border-3 border-white border-t-transparent rounded-full"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <span>✓</span>
                      Submit Documents
                    </>
                  )}
                </button>
                <p className="text-xs md:text-sm text-gray-500 text-center mt-4">
                  Your information is encrypted and secure. Estimated verification time: 24-48 hours
                </p>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-8 p-4 md:p-6 bg-blue-50 border border-blue-200 rounded-2xl">
            <div className="flex gap-3">
              <span className="text-xl md:text-2xl flex-shrink-0">🔒</span>
              <div>
                <p className="text-sm md:text-base font-semibold text-blue-900">
                  Your data is protected
                </p>
                <p className="text-xs md:text-sm text-blue-700 mt-1">
                  All documents are encrypted and stored securely in compliance with data protection regulations
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


// import { useState } from "react";
// import { Menu, X } from "lucide-react";
// import axios from "axios";
// import { useEffect } from "react";

// export default function FarmerKYCPage() {
//   const API_URL = import.meta.env.VITE_API_URL;
//   const [aadhar, setAadhar] = useState(null);
//   const [kisan, setKisan] = useState(null);
//   const [land, setLand] = useState(null);
//   const [selfie, setSelfie] = useState(null);
//   const [authChecking, setAuthChecking] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const checkdocssumitted = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/api/user/docssubmitted`, {
//           withCredentials: true,
//         });
//         console.log(res.data.user.documents.length);
//         if (res.data.user.documents.length == 0) {
//           setAuthChecking(true);
//         }
//       } catch (error) {
//         console.log("error:", error);
//       }
//     };
//     checkdocssumitted();
//   }, []);

//   const handleSubmit = async () => {
//     try {
//       if (loading) return; 
//       setLoading(true);
//       const formData = new FormData();
//       formData.append("aadhar", aadhar);
//       formData.append("kisanCard", kisan);
//       formData.append("landRecord", land);
//       formData.append("selfie", selfie);

//       const res = await axios.post(
//         `${API_URL}/api/farmer/upload-kyc`,
//         formData,
//         {
//           withCredentials: true,
//         }
//       );
//       alert(res.data.message);

//     } catch (err) {
//       console.error(err);
//       alert("Upload failed. Check console for details.");
//     }finally{
//       setLoading(false);
//     }
//   };
//   if (!authChecking) {
//     return (
//       <div className="flex min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 text-gray-800">
//         <p className="text-3xl font-bold text-green-800 mb-8 mt-50 ml-20 text-center lg:text-2xl">
//           Thanks for submitting your documents! Our team is reviewing them now.
//           We’ll notify you as soon as verification is complete.
//         </p>
//       </div>
//     );
//   }
//   if (authChecking) {
//     return (
//       <div className="flex min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 text-gray-800">
//         {/* Main Content */}
//         <div className="flex-1 px-6 py-10 ">
//           <h1 className="text-3xl font-bold text-green-800 mb-8 text-center lg:text-2xl">
//             Upload KYC Documents
//           </h1>
//           {/* <p className="text-3xl font-bold text-red-800 mb-8 text-center lg:text-2xl">
//           upload documents if not,if already uploaded Your documents
//           verification is in progress
//         </p> */}

//           {/* Upload Card */}
//           <div
//             id="add-docs"
//             className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-100"
//           >
//             <div className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Aadhar Card Photo
//                 </label>
//                 <input
//                   type="file"
//                   onChange={(e) => setAadhar(e.target.files[0])}
//                   className="block w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Kisan Card
//                 </label>
//                 <input
//                   type="file"
//                   onChange={(e) => setKisan(e.target.files[0])}
//                   className="block w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Land Record (Proof)
//                 </label>
//                 <input
//                   type="file"
//                   onChange={(e) => setLand(e.target.files[0])}
//                   className="block w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Selfie of Farmer
//                 </label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   capture="user"
//                   onChange={(e) => setSelfie(e.target.files[0])}
//                   className="block w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
//                 />
//               </div>

//               {/* Submit Button */}

//               <button
//                 onClick={handleSubmit}
//                 className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md text-lg font-semibold shadow-sm transition-all"
//               >
//                  {loading ? "Processing..." : "Submit"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
