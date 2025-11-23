import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Fetchallraws() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/rawmaterial/allraws`);
        setItems(res.data.materials || []);
      } catch (error) {
        console.log("Error fetching raw materials", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 px-3 sm:px-4 md:px-6 lg:px-8 py-5 sm:py-6 md:py-8 lg:py-10">
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-blue-900 mb-8 sm:mb-10 md:mb-12 text-center tracking-tight">
          All Raw Materials
        </h1>

        {loading ? (
          <div className="flex justify-center items-center min-h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-base sm:text-lg md:text-xl">
              No raw materials found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            {items.map((item) => (
              <Link
                to={`/manu/singlerawdetails/${item.batchCode}`}
                key={item.batchCode}
                className="group bg-white border border-gray-100 shadow-md hover:shadow-lg sm:hover:shadow-xl transition-all rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden hover:-translate-y-1 sm:hover:-translate-y-2 flex flex-col h-full"
              >
                <div className="relative overflow-hidden bg-gray-200 h-24 sm:h-28 md:h-36 lg:h-44">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="p-2 sm:p-3 md:p-4 lg:p-5 flex flex-col flex-grow">
                  <h2 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-blue-900 mb-0.5 sm:mb-1 md:mb-1.5 line-clamp-2">
                    {item.name}
                  </h2>
                  
                  <p className="text-xs text-blue-600 mb-1.5 sm:mb-2 md:mb-3 font-semibold truncate">
                    Batch: {item.batchCode}
                  </p>

                  <div className="space-y-0.5 sm:space-y-1 text-gray-700 text-xs sm:text-sm md:text-base flex-grow">
                    <p>
                      <span className="font-semibold text-gray-800">Status:</span>{" "}
                      <span className={`text-xs sm:text-sm font-medium px-2 py-0.5 rounded-full ${
                        item.status === "available"
                          ? "bg-green-100 text-green-700"
                          : item.status === "sold"
                          ? "bg-red-100 text-red-700"
                          : item.status === "reserved"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {item.status}
                      </span>
                    </p>
                    
                    <p>
                      <span className="font-semibold text-gray-800">Price:</span>{" "}
                      <span className="text-blue-700 font-bold">₹{item.pricePerUnit}</span>
                    </p>
                    
                    <p>
                      <span className="font-semibold text-gray-800">Unit:</span>{" "}
                      {item.unit}
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-1.5 sm:py-2 md:py-3 px-2 sm:px-3 md:px-5 flex justify-between items-center text-xs sm:text-sm font-medium text-blue-700 border-t border-blue-200 hover:text-blue-900 transition">
                  <span>View Details</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    className="w-3 sm:w-3.5 md:w-4 h-3 sm:h-3.5 md:h-4 transform transition-transform group-hover:translate-x-0.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}