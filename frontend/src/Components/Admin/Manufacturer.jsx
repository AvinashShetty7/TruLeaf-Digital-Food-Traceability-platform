import { useEffect, useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";

export default function Manufacturer() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [manufacturers, setmanufacturers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all manufacturers
  useEffect(() => {
    const loadmanufacturers = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/admin/allmanufacturers`, {
          withCredentials: true,
        });
        console.log(res.data);

        setmanufacturers(res.data.manufacturers || []);
      } catch (err) {
        console.log("Failed to fetch manufacturer list", err);
      } finally {
        setLoading(false);
      }
    };
    loadmanufacturers();
  }, []);

  // Delete manufacturer
  const deletemanufacturer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this manufacturer?"))
      return;

    try {
      await axios.delete(`${API_URL}/api/admin/deleteuser/${id}`, {
        withCredentials: true,
      });
      setmanufacturers(manufacturers.filter((f) => f._id !== id));
      alert("manufacturer deleted successfully!");
    } catch (err) {
      console.log("Error deleting manufacturer", err);
      alert("Failed to delete manufacturer.");
    }
  };

  let manufacturer = manufacturers.filter((item) =>
    item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center mt-10 text-xl font-semibold">
        Loading manufacturers...
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Find manufacturers
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 relative mb-7 group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
          <input
            type="text"
            placeholder="Search manufacturers by email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 md:py-4 rounded-xl border-2 border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-300 font-medium placeholder-gray-400"
          />
        </div>
      </div>

      {manufacturer.length === 0 ? (
        <p className="text-lg text-gray-500 text-center mt-10">
          No manufacturers found.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {manufacturer.map((manufacturer) => (
            <div
              key={manufacturer._id}
              className="bg-white shadow-md border rounded-2xl p-6 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-green-800">
                  {manufacturer.name}
                </h2>
                <p className="text-gray-700 text-sm">
                  <b>Email:</b> {manufacturer.email}
                </p>
                <p className="text-gray-700 text-sm">
                  <b>Phone:</b> {manufacturer.phone}
                </p>
                <p
                  className={`text-sm font-semibold ${
                    manufacturer.verified ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {manufacturer.verified ? "Verified ✔" : "Not Verified ❌"}
                </p>
                <p className="text-gray-600 text-sm">
                  <b>Joined:</b>{" "}
                  {new Date(manufacturer.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => deletemanufacturer(manufacturer._id)}
                className="mt-4 w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold shadow transition"
              >
                Delete manufacturer 🗑
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
