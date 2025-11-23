import { useEffect, useState } from "react";
import axios from "axios";

export default function VerifyFarmers() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch farmers who are not verified
  useEffect(() => {
    const loadFarmers = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/admin/farmers/pending`);
        setFarmers(res.data.farmers || []);
      } catch (err) {
        console.log("Error loading farmers", err);
      } finally {
        setLoading(false);
      }
    };
    loadFarmers();
  }, []);

  const verifyFarmer = async (id) => {
    try {
      await axios.put(`${API_URL}/api/admin/verify-farmer/${id}`);
      alert("Farmer verified successfully!");
      setFarmers(farmers.filter((f) => f._id !== id)); // remove from pending list
    } catch (err) {
      console.log(err);
      alert("Verification failed");
    }
  };

  if (loading) {
    return (
      <div className="text-center text-lg font-semibold mt-10">
        Loading farmers...
      </div>
    );
  }

  if (farmers.length === 0) {
    return (
      <div className="text-center text-gray-600 text-lg mt-10">
        No pending farmer verifications 🎉
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Pending Farmer Verification
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        {farmers.map((farmer) => (
          <div
            key={farmer._id}
            className="bg-white p-6 shadow rounded-xl border space-y-4"
          >
            <div>
              <h2 className="text-xl font-bold text-green-900">{farmer.name}</h2>
              <p>Email: {farmer.email}</p>
              <p>Phone: {farmer.phone}</p>
              <p className="text-sm">Role: {farmer.role}</p>
            </div>

            {/* Documents Preview */}
            <div className="grid grid-cols-2 gap-3">
              {farmer.documents.map((doc, index) => (
                <div key={index} className="space-y-1 text-center">
                  <p className="font-medium text-sm">{doc.documentType}</p>
                  <img
                    src={doc.documentUrl}
                    alt={doc.documentType}
                    className="w-full h-32 object-cover rounded shadow"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => verifyFarmer(farmer._id)}
              className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
            >
              Verify Farmer ✔
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
