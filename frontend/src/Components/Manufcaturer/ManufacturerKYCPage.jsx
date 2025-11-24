import { useState } from "react";
import { Menu, X } from "lucide-react";
import axios from "axios";

export default function ManufacturerKYCPage() {
  const [open, setOpen] = useState(false);

  const [aadhar, setAadhar] = useState(null);
  const [GSTCertificate, setGSTCertificate] = useState(null);
  const [FactoryAddressProof, setFactoryAddressProof] = useState(null);
  const [FactoryPhoto, setFactoryPhoto] = useState(null);
  const [FSSAILicense, setFSSAILicense] = useState(null);


  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("aadhar", aadhar);
      formData.append("GSTCertificateCard", GSTCertificate);
      formData.append("FactoryAddressProofRecord", FactoryAddressProof);
      formData.append("FactoryPhoto", FactoryPhoto);
      formData.append("FSSAILicense",FSSAILicense)

      const res = await axios.post(
        "http://localhost:3000/api/farmer/uploadManufacturer-kyc",
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
         <h1 className="text-3xl font-bold text-green-800 mb-8 text-center lg:text-2xl">Upload KYC Documents</h1>
        <p className="text-3xl font text-red-800 mb-8 text-center lg:text-2xl" >upload documents if not,if already uploaded Your documents verification is in progress</p>

        {/* Card */}
         <div
          id="add-docs"
          className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-100"
        >
          <div className="space-y-5">
            
            <div>
              <label className="font-medium">Aadhar Card Photo</label>
              <input 
                type="file" 
                onChange={(e) => setAadhar(e.target.files[0])}
                className="w-full mt-1 border p-2 rounded-md bg-gray-50" />
            </div>

            <div>
              <label className="font-medium">GSTCertificate Card</label>
              <input 
                type="file" 
                onChange={(e) => setGSTCertificate(e.target.files[0])}
                className="w-full mt-1 border p-2 rounded-md bg-gray-50" />
            </div>

            <div>
              <label className="font-medium">FactoryAddressProof Record (Proof)</label>
              <input 
                type="file" 
                onChange={(e) => setFactoryAddressProof(e.target.files[0])}
                className="w-full mt-1 border p-2 rounded-md bg-gray-50" />
            </div>

            <div>
              <label className="font-medium">FactoryPhoto of Farmer</label>
              <input 
                type="file" 
                accept="image/*" 
                capture="user"
                onChange={(e) => setFactoryPhoto(e.target.files[0])}
                className="w-full mt-1 border p-2 rounded-md bg-gray-50" />
            </div>
            <div>
              <label className="font-medium">Fssail licence </label>
              <input 
                type="file" 
                accept="image/*" 
                capture="user"
                onChange={(e) => setFSSAILicense(e.target.files[0])}
                className="w-full mt-1 border p-2 rounded-md bg-gray-50" />
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
