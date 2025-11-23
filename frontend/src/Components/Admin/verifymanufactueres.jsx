import { useEffect, useState } from "react";
import axios from "axios";

export default function VerifyManufacturers() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [manufacturers, setmanufacturers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch manufacturers who are not verified
  useEffect(() => {
    const loadmanufacturers = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/admin/manufacturers/pending`);
        setmanufacturers(res.data.manufacturers || []);
      } catch (err) {
        console.log("Error loading manufacturers", err);
      } finally {
        setLoading(false);
      }
    };
    loadmanufacturers();
  }, []);

  const verifymanufacturer = async (id) => {
    try {
      await axios.put(`${API_URL}/api/admin/verify-manufacturer/${id}`);
      alert("manufacturer verified successfully!");
      setmanufacturers(manufacturers.filter((f) => f._id !== id)); // remove from pending list
    } catch (err) {
      console.log(err);
      alert("Verification failed");
    }
  };

  if (loading) {
    return (
      <div className="text-center text-lg font-semibold mt-10">
        Loading manufacturers...
      </div>
    );
  }

  if (manufacturers.length === 0) {
    return (
      <div className="text-center text-gray-600 text-lg mt-10">
        No pending Manufacturer verifications 🎉
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Pending Manufacturer Verification
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        {manufacturers.map((manufacturer) => (
          <div
            key={manufacturer._id}
            className="bg-white p-6 shadow rounded-xl border space-y-4"
          >
            <div>
              <h2 className="text-xl font-bold text-green-900">{manufacturer.name}</h2>
              <p>Email: {manufacturer.email}</p>
              <p>Phone: {manufacturer.phone}</p>
              <p className="text-sm">Role: {manufacturer.role}</p>
            </div>

            {/* Documents Preview */}
            <div className="grid grid-cols-2 gap-3">
              {manufacturer.documents.map((doc, index) => (
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
              onClick={() => verifymanufacturer(manufacturer._id)}
              className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
            >
              Verify manufacturer ✔
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
