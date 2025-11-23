import { useEffect, useState } from "react";
import axios from "axios";

export default function Farmers() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all farmers
  useEffect(() => {
    const loadFarmers = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/admin/allfarmers`);
        console.log(res.data);
        
        setFarmers(res.data.farmers || []);
      } catch (err) {
        console.log("Failed to fetch farmer list", err);
      } finally {
        setLoading(false);
      }
    };
    loadFarmers();
  }, []);

  // Delete farmer
  const deleteFarmer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this farmer?")) return;

    try {
      await axios.delete(`${API_URL}/api/admin/deleteuser/${id}`);
      setFarmers(farmers.filter((f) => f._id !== id));
      alert("Farmer deleted successfully!");
    } catch (err) {
      console.log("Error deleting farmer", err);
      alert("Failed to delete farmer.");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-xl font-semibold">
        Loading farmers...
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-green-700 mb-6">All Farmers</h1>

      {farmers.length === 0 ? (
        <p className="text-lg text-gray-500 text-center mt-10">
          No farmers found.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {farmers.map((farmer) => (
            <div
              key={farmer._id}
              className="bg-white shadow-md border rounded-2xl p-6 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-green-800">
                  {farmer.name}
                </h2>
                <p className="text-gray-700 text-sm">
                  <b>Email:</b> {farmer.email}
                </p>
                <p className="text-gray-700 text-sm">
                  <b>Phone:</b> {farmer.phone}
                </p>
                <p
                  className={`text-sm font-semibold ${
                    farmer.verified ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {farmer.verified ? "Verified ✔" : "Not Verified ❌"}
                </p>
                <p className="text-gray-600 text-sm">
                  <b>Joined:</b>{" "}
                  {new Date(farmer.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => deleteFarmer(farmer._id)}
                className="mt-4 w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold shadow transition"
              >
                Delete Farmer 🗑
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
