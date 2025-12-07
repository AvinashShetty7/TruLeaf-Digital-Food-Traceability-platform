import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function FarmerRawMaterialList() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/rawmaterial/myraws`, {
          withCredentials: true,
        });
        setItems(res.data.materials || []);
      } catch (error) {
        console.log("Error fetching raw materials", error);
      }
    };
    fetchData();
  }, []);

  const filteredItems =
    filter === "all"
      ? items
      : items.filter((item) => item.status.toLowerCase() === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 px-3 sm:px-4 md:px-6 lg:px-8 py-5 sm:py-6 md:py-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="relative mb-5 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-7  px-6 shadow-xl overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
          </div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex items-center gap-3 mb-4"></div>
            <h1 className="text-4xl md:text-5xl font-black mb-3 leading-tight">
              My Raw Crops
            </h1>
            <p>Reserve your crops now!</p>
          </div>
        </div>

        {/* FILTER BUTTONS - Responsive */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 sm:gap-3 sm:mb-8 md:mb-10">
          {["all", "available", "reserved", "sold", "expired"].map((btn) => (
            <button
              key={btn}
              onClick={() => setFilter(btn)}
              className={`px-2.5 sm:px-4 md:px-5 py-1 sm:py-1.5 md:py-2 rounded-full text-xs sm:text-sm font-medium shadow transition whitespace-nowrap
                ${
                  filter === btn
                    ? "bg-green-600 text-white"
                    : "bg-white text-green-700 border border-green-300 hover:bg-green-100"
                }
              `}
            >
              {btn.charAt(0).toUpperCase() + btn.slice(1)}
            </button>
          ))}
        </div>

        {/* RESULTS */}
        {filteredItems.length === 0 ? (
          <p className="text-center text-gray-600 text-sm sm:text-base md:text-lg mt-10">
            No raw materials found.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            {filteredItems.map((item) => (
              <Link
                to={`/farmer/singleItem/${item.batchCode}`}
                key={item.batchCode}
                className="group bg-white border border-gray-100 shadow-md hover:shadow-lg sm:hover:shadow-xl transition-all rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden hover:-translate-y-1 sm:hover:-translate-y-2 flex flex-col h-full"
              >
                <div className="relative overflow-hidden bg-gray-200 h-24 sm:h-28 md:h-36 lg:h-48">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span
                    className={`absolute top-1 sm:top-2 left-1 sm:left-2 md:left-3 text-white text-xs font-semibold px-1.5 sm:px-2.5 md:px-3 py-0.5 md:py-1 rounded-full shadow
                      ${
                        item.status === "available"
                          ? "bg-green-600"
                          : item.status === "sold"
                          ? "bg-red-500"
                          : item.status === "reserved"
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                      }
                    `}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="p-2 sm:p-3 md:p-4 lg:p-5 flex flex-col flex-grow">
                  <h2 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-green-800 mb-0.5 sm:mb-1 md:mb-1.5 line-clamp-2">
                    {item.name}
                  </h2>
                  <p className="text-xs text-gray-500 mb-1.5 sm:mb-2 md:mb-3 truncate">
                    Batch: {item.batchCode}
                  </p>

                  <div className="space-y-0.5 sm:space-y-1 text-gray-700 text-xs sm:text-sm md:text-base flex-grow">
                    <p>
                      <span className="font-medium text-gray-800">Price:</span>{" "}
                      ₹{item.pricePerUnit}
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">Unit:</span>{" "}
                      {item.unit}
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 py-1.5 sm:py-2 md:py-3 px-2 sm:px-3 md:px-5 flex justify-between items-center text-xs sm:text-sm text-green-700 border-t border-gray-100">
                  <span className="font-medium">Details</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
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
