import { useState } from "react";
import { Menu, X } from "lucide-react";
import axios from "axios";

// export default function FarmerKYCPage() {
//   const [open, setOpen] = useState(false);

//   const [aadhar, setAadhar] = useState(null);
//   const [kisan, setKisan] = useState(null);
//   const [land, setLand] = useState(null);
//   const [selfie, setSelfie] = useState(null);

//   const handleSubmit = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("aadhar", aadhar);
//       formData.append("kisanCard", kisan);
//       formData.append("landRecord", land);
//       formData.append("selfie", selfie);

//       const res = await axios.post(
//         "http://localhost:3000/api/farmer/upload-kyc",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       alert(res.data.message);
//     } catch (err) {
//       console.error(err);
//       alert("Upload failed. Check console for details.");
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
      
//       {/* Sidebar */}
//       <div
//         className={`fixed z-20 top-0 left-0 h-full w-64 bg-white shadow-xl p-5 transition-transform duration-300 
//         lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
//       >
//         <h2 className="text-xl font-bold mb-6">Farmer Panel</h2>

//         <nav className="space-y-4">
//           <a
//             href="#add-docs"
//             className="block p-2 rounded-lg hover:bg-gray-200 font-medium"
//           >
//             Add Documents
//           </a>
//         </nav>
//       </div>

//       {/* Mobile Menu Button */}
//       <button
//         className="lg:hidden absolute top-4 left-4 z-30 bg-white p-2 rounded-md shadow"
//         onClick={() => setOpen(!open)}
//       >
//         {open ? <X size={28} /> : <Menu size={28} />}
//       </button>

//       {/* Main Content */}
//       <div className="flex-1 p-6 lg:ml-64">
//         <h1 className="text-2xl font-bold mb-6">Upload KYC Documents</h1>

//         {/* Card */}
//         <div id="add-docs" className="max-w-xl bg-white shadow-lg rounded-xl p-6">
//           <div className="space-y-5">
            
//             <div>
//               <label className="font-medium">Aadhar Card Photo</label>
//               <input 
//                 type="file" 
//                 onChange={(e) => setAadhar(e.target.files[0])}
//                 className="w-full mt-1 border p-2 rounded-md bg-gray-50" />
//             </div>

//             <div>
//               <label className="font-medium">Kisan Card</label>
//               <input 
//                 type="file" 
//                 onChange={(e) => setKisan(e.target.files[0])}
//                 className="w-full mt-1 border p-2 rounded-md bg-gray-50" />
//             </div>

//             <div>
//               <label className="font-medium">Land Record (Proof)</label>
//               <input 
//                 type="file" 
//                 onChange={(e) => setLand(e.target.files[0])}
//                 className="w-full mt-1 border p-2 rounded-md bg-gray-50" />
//             </div>

//             <div>
//               <label className="font-medium">Selfie of Farmer</label>
//               <input 
//                 type="file" 
//                 accept="image/*" 
//                 capture="user"
//                 onChange={(e) => setSelfie(e.target.files[0])}
//                 className="w-full mt-1 border p-2 rounded-md bg-gray-50" />
//             </div>

//             {/* Submit Button */}
//             <button
//               onClick={handleSubmit}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-lg font-medium mt-4"
//             >
//               Submit Documents
//             </button>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import { Menu, X } from "lucide-react";
// import axios from "axios";

export default function FarmerKYCPage() {
  const [open, setOpen] = useState(false);

  const [aadhar, setAadhar] = useState(null);
  const [kisan, setKisan] = useState(null);
  const [land, setLand] = useState(null);
  const [selfie, setSelfie] = useState(null);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("aadhar", aadhar);
      formData.append("kisanCard", kisan);
      formData.append("landRecord", land);
      formData.append("selfie", selfie);

      const res = await axios.post(
        "http://localhost:3000/api/farmer/upload-kyc",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Upload failed. Check console for details.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 text-gray-800">

      {/* Main Content */}
      <div className="flex-1 px-6 py-10 ">
        <h1 className="text-3xl font-bold text-green-800 mb-8 text-center lg:text-2xl">
          Upload KYC Documents
        </h1>
        <p className="text-3xl font-bold text-red-800 mb-8 text-center lg:text-2xl" >upload documents if not,if already uploaded Your documents verification is in progress</p>

        {/* Upload Card */}
        <div
          id="add-docs"
          className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-100"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aadhar Card Photo
              </label>
              <input
                type="file"
                onChange={(e) => setAadhar(e.target.files[0])}
                className="block w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kisan Card
              </label>
              <input
                type="file"
                onChange={(e) => setKisan(e.target.files[0])}
                className="block w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Land Record (Proof)
              </label>
              <input
                type="file"
                onChange={(e) => setLand(e.target.files[0])}
                className="block w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selfie of Farmer
              </label>
              <input
                type="file"
                accept="image/*"
                capture="user"
                onChange={(e) => setSelfie(e.target.files[0])}
                className="block w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md text-lg font-semibold shadow-sm transition-all"
            >
              Submit Documents
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


