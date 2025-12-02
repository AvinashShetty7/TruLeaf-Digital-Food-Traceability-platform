import { useState,useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Menu,
  X,
  Upload,
  Plus,
  Package,
  Leaf,
  Pencil,
  BarChart2,
  LogOut,
} from "lucide-react";

export default function FarmerDashboard() {
  const API_URL = import.meta.env.VITE_API_URL;
    const navigate=useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("/farmer/marketprice");
  const[user,setUser]=useState(null)

  const menuItems = [
    { label: "Market Price", path: "/farmer/marketprice", icon: BarChart2 },
    { label: "Add raw material", path: "/farmer/AddRawMaterial", icon: Plus },
    {
      label: "My raw material",
      path: "/farmer/FarmerRawMaterialList",
      icon: Leaf,
    },
    { label: "uploaded documents", path: "#", icon: Upload },
    { label: "update profile", path: "#", icon: Pencil },
  ];

   useEffect(() => {
      const fetchUser = async () => {
        try {
          const res = await axios.get(`${API_URL}/api/user/validlogin`, {
            withCredentials: true,
          });
          setUser(res.data.user.name);
        } catch (err) {
          console.log("user not logged in ");
        }
      };
  
      fetchUser();
    }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/logout`,
        {},
        { withCredentials: true }
      );
      console.log("Logout success");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-0 left-0 h-screen w-64 bg-gradient-to-b from-green-700 via-green-800 to-green-900 text-white transform transition-all duration-300 z-40 shadow-xl flex flex-col overflow-y-auto
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-green-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-green-800 font-bold">F</span>
              </div>
              <h1 className="text-xl font-bold text-white">{user}</h1>
            </div>
            <button
              className="md:hidden text-white hover:bg-green-600 p-1.5 rounded-lg transition"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                to={item.path}
                onClick={() => {
                  setCurrentPage(item.path);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === item.path
                    ? "bg-white text-green-700 shadow-md"
                    : "text-green-100 hover:bg-green-600 hover:text-white"
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
                <div>
            <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3  rounded-lg text-sm font-medium transition-all duration-200 flex-1 px-4 py-3 space-y-1 text-green-100 hover:bg-green-600 hover:text-white"
        >
          <LogOut/>
          Logout
        </button>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-green-600">
          <p className="text-xs text-green-200 text-center">
            © 2025 Farm Direct farmer
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 flex items-center justify-between shadow-sm sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-green-700 hover:bg-green-50 p-2 rounded-lg transition"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={24} />
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-700 font-semibold">AD</span>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Routed Pages display here */}
            <Outlet />

            {/* Optional: Remove this welcome box if you don't want it once routing is active */}
            {!currentPage || currentPage === "" ? (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Welcome to Farmer Dashboard
                </h2>
                <p className="text-gray-600 mb-6">
                  Select an option from the sidebar to manage your platform
                </p>
              </div>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  );
}
