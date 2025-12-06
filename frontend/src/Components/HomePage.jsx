import axios from "axios";
import img1 from "../assets/hero3.jpg";
import img2 from "../assets/hero2.jpg";
import img3 from "../assets/hero1.jpg";

import React, { useState, useEffect } from "react";
import {
  Leaf,
  Truck,
  QrCode,
  Users,
  ArrowRight,
  Menu,
  X,
  Phone,
  Mail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const heroImages = [img1, img2, img3];
  const [currentSlide, setCurrentSlide] = useState(0);
  const API_URL = import.meta.env.VITE_API_URL;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authChecking, setAuthChecking] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === heroImages.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkValidUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/user/validlogin`, {
          withCredentials: true,
        });

        if (res.data?.user?.role) {
          const role = res.data.user.role;
          const verified = res.data.user.verified;
          if (role === "admin") return navigate("/admin");
          if (role === "farmer") {
            if (verified == true) return navigate("/farmer");
            else return navigate("/FarmerKYCPage");
          }
          if (role === "manufacturer") {
            if (verified == true) return navigate("/manu");
            else return navigate("/ManufacturerKYCPage");
          }
        }
      } catch (err) {
        console.log("Not logged in");
        setAuthChecking(true);
      }
    };
    checkValidUser();
  }, []);

  if (authChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-100 to-teal-50 font-sans text-gray-900">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                TruLeaf
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-gray-700 hover:text-green-700 font-medium transition duration-300">
                Features
              </a>
              <a href="#features" className="text-gray-700 hover:text-green-700 font-medium transition duration-300">
                About
              </a>
              <a href="#contact" className="text-gray-700 hover:text-green-700 font-medium transition duration-300">
                Contact
              </a>
              <div className="flex gap-3">
                <button
                  onClick={() => navigate("/login")}
                  className="px-6 py-2.5 rounded-lg border-2 border-green-600 text-green-700 hover:bg-green-50 transition font-semibold duration-300"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg transition font-semibold duration-300 hover:-translate-y-0.5"
                >
                  Register
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl">
              <div className="px-4 py-4 flex flex-col gap-3">
                <a
                  href="#about"
                  className="text-left text-gray-700 hover:text-green-700 font-medium transition py-2"
                >
                  Features
                </a>
                <a
                  href="#features"
                  className="text-left text-gray-700 hover:text-green-700 font-medium transition py-2"
                >
                  About
                </a>
                <a
                  href="#contact"
                  className="text-left text-gray-700 hover:text-green-700 font-medium transition py-2"
                >
                  Contact
                </a>
                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => {
                      navigate("/login");
                      setMobileMenuOpen(false);
                    }}
                    className="flex-1 px-4 py-3 rounded-lg border-2 border-green-600 text-green-700 hover:bg-green-50 transition font-semibold text-sm md:text-base"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      navigate("/register");
                      setMobileMenuOpen(false);
                    }}
                    className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white transition font-semibold text-sm md:text-base"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section
          id="about"
          className="relative w-full h-96 md:h-screen flex items-center overflow-hidden"
        >
          {/* Image Slider Background */}
          <div className="absolute inset-0">
            {heroImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Hero"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-black/40"></div>

          {/* Content */}
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-0 grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10 w-full">
            {/* Left Content */}
            <div className="space-y-6 md:space-y-8">
              <div className="space-y-3 md:space-y-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight text-white drop-shadow-lg">
                  Farm to Table
                  <span className="block text-emerald-300">Transparency</span>
                </h1>
              </div>

              <p className="text-base md:text-xl text-gray-100 leading-relaxed max-w-lg drop-shadow-md">
                Trace every ingredient from farmer to consumer. TruLeaf connects farmers, manufacturers, and customers with complete supply chain visibility.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 md:pt-6">
                <button
                  onClick={() => navigate("/register")}
                  className="group px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl md:rounded-lg font-bold text-base md:text-lg shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-1"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button className="px-6 md:px-8 py-3 md:py-4 border-2 border-green-300 text-white hover:bg-white/10 hover:border-white rounded-xl md:rounded-lg font-bold text-base md:text-lg transition-all duration-300 backdrop-blur-sm">
                  Learn More
                </button>
              </div>

              {/* Slider Indicators */}
              <div className="flex gap-2 pt-6 md:pt-8">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentSlide
                        ? "w-8 h-2 bg-emerald-400"
                        : "w-2 h-2 bg-white/50 hover:bg-white/75"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right Card */}
            <div className="hidden md:block relative rounded-3xl bg-gradient-to-br from-green-100 to-emerald-50 p-8 md:p-10 shadow-2xl border border-green-200 backdrop-blur-sm">
              <div className="space-y-6 md:space-y-8">
                <div className="flex items-center gap-4 group">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                    <Leaf className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-green-900">Farmer</p>
                    <p className="text-sm text-gray-700">Grows & Lists Crops</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-green-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                    <Truck className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-green-900">Manufacturer</p>
                    <p className="text-sm text-gray-700">Processes & Creates</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                    <QrCode className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-green-900">Customer</p>
                    <p className="text-sm text-gray-700">Scans & Trusts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24 border-t border-gray-100"
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-12 md:mb-16 space-y-3 md:space-y-4">
              <div className="inline-flex items-center justify-center px-4 py-2 bg-green-100 rounded-full">
                <span className="text-sm font-semibold text-green-700">🚀 How It Works</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                How It Works
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                Transparent traceability connecting farmers, manufacturers, and consumers effortlessly.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-200 hover:shadow-xl hover:border-green-300 transition-all duration-500 group hover:-translate-y-2">
                <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg transition">
                  <Leaf className="w-7 h-7 text-green-700" />
                </div>
                <h3 className="font-bold text-xl md:text-2xl mb-3 text-gray-900">
                  Farmer Listings
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Farmers list crops and prices to supply genuine agri-products directly to manufacturers.
                </p>
              </div>

              <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-200 hover:shadow-xl hover:border-green-300 transition-all duration-500 group hover:-translate-y-2">
                <div className="w-14 h-14 bg-gradient-to-br from-teal-100 to-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg transition">
                  <Truck className="w-7 h-7 text-green-700" />
                </div>
                <h3 className="font-bold text-xl md:text-2xl mb-3 text-gray-900">
                  Manufacturer Processing
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Manufacturers buy raw products offline and record finished goods made from farmer-supplied items.
                </p>
              </div>

              <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-200 hover:shadow-xl hover:border-green-300 transition-all duration-500 group hover:-translate-y-2">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg transition">
                  <QrCode className="w-7 h-7 text-green-700" />
                </div>
                <h3 className="font-bold text-xl md:text-2xl mb-3 text-gray-900">
                  QR Code Tracking
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  System generates QR codes, enabling customers to trace the origin of each product.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="bg-white py-16 md:py-24 border-t border-gray-100"
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-12 md:mb-16 space-y-3 md:space-y-4">
              <div className="inline-flex items-center justify-center px-4 py-2 bg-green-100 rounded-full">
                <span className="text-sm font-semibold text-green-700">📞 Get In Touch</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                Contact Us
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                We're here to assist you. Reach out to us anytime for support, collaboration, or inquiries.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-200 hover:shadow-xl hover:border-green-300 transition-all duration-500 group hover:-translate-y-2 text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition">
                  <Phone className="w-7 h-7 text-green-700" />
                </div>
                <h3 className="font-bold text-xl md:text-2xl mb-3 text-gray-900">Mobile</h3>
                <p className="text-gray-600 font-semibold">+91 7975287481</p>
              </div>

              <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-200 hover:shadow-xl hover:border-green-300 transition-all duration-500 group hover:-translate-y-2 text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-teal-100 to-green-100 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition">
                  <Mail className="w-7 h-7 text-green-700" />
                </div>
                <h3 className="font-bold text-xl md:text-2xl mb-3 text-gray-900">Email</h3>
                <p className="text-gray-600 font-semibold break-all text-sm md:text-base">avinash777@gmail.com</p>
              </div>

              <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-200 hover:shadow-xl hover:border-green-300 transition-all duration-500 group hover:-translate-y-2 text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition">
                  <Users className="w-7 h-7 text-green-700" />
                </div>
                <h3 className="font-bold text-xl md:text-2xl mb-3 text-gray-900">
                  Social Media
                </h3>
                <div className="flex justify-center gap-4 mt-3 flex-wrap">
                  <a
                    href="https://instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-green-700 font-bold text-sm md:text-base transition duration-300"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-green-700 font-bold text-sm md:text-base transition duration-300"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-16 md:py-24 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 border-t border-gray-100 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10 space-y-6 md:space-y-8">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
              Join the Food Traceability Movement
            </h2>
            <p className="text-lg md:text-xl text-green-50 max-w-2xl mx-auto leading-relaxed">
              Experience transparent trust between farmers, manufacturers, and consumers.
            </p>
            <button
              onClick={() => navigate("/register")}
              className="px-8 md:px-10 py-4 md:py-5 bg-white text-green-700 rounded-xl md:rounded-lg font-bold text-base md:text-lg hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-2 hover:-translate-y-1 shadow-lg"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 border-t border-gray-800 py-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} TruLeaf. All rights reserved. | Connecting farms to tables with transparency.
        </footer>
      </div>
    );
  }
}



// import axios from "axios";
// import img1 from "../assets/hero3.jpg";
// import img2 from "../assets/hero2.jpg";
// import img3 from "../assets/hero1.jpg";

// import React, { useState, useEffect } from "react";
// import {
//   Leaf,
//   Truck,
//   QrCode,
//   Users,
//   ArrowRight,
//   Menu,
//   X,
//   Phone,
//   Mail,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export default function HomePage() {
//   const heroImages = [img1, img2, img3];
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const API_URL = import.meta.env.VITE_API_URL;
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [authChecking, setAuthChecking] = useState(false);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) =>
//         prev === heroImages.length - 1 ? 0 : prev + 1
//       );
//     }, 5000); // ✅ 5 seconds

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const checkValidUser = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/api/user/validlogin`, {
//           withCredentials: true,
//         });

//         if (res.data?.user?.role) {
//           const role = res.data.user.role;
//           const verified = res.data.user.verified;
//           if (role === "admin") return navigate("/admin");
//           if (role === "farmer") {
//             if (verified == true) return navigate("/farmer");
//             else return navigate("/FarmerKYCPage");
//           }
//           if (role === "manufacturer") {
//             if (verified == true) return navigate("/manu");
//             else return navigate("/ManufacturerKYCPage");
//           }
//         }
//       } catch (err) {
//         console.log("Not logged in");
//         setAuthChecking(true);
//       }
//     };
//     checkValidUser();
//   }, []);

//   if (authChecking) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200 font-sans text-gray-900">
//         {/* Navigation */}
//         <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
//           <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
//                 <Leaf className="w-6 h-6 text-white" />
//               </div>
//               <span className="text-2xl font-bold text-green-800">TruLeaf</span>
//             </div>

//             {/* Desktop */}
//             <div className="hidden md:flex items-center gap-8">
//               <a href="#about" className="hover:text-green-700 transition">
//                 Features
//               </a>
//               <a href="#features" className="hover:text-green-700 transition">
//                 About
//               </a>
//               <a href="#contact" className="hover:text-green-700 transition">
//                 Contact
//               </a>
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => navigate("/login")}
//                   className="px-6 py-2 rounded-lg border-2 border-green-600 text-green-700 hover:bg-green-600 hover:text-white transition font-semibold"
//                 >
//                   Login
//                 </button>
//                 <button
//                   onClick={() => navigate("/register")}
//                   className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition font-semibold"
//                 >
//                   Register
//                 </button>
//               </div>
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="md:hidden p-2 rounded-lg hover:bg-gray-200 transition-colors"
//             >
//               {mobileMenuOpen ? (
//                 <X className="w-6 h-6" />
//               ) : (
//                 <Menu className="w-6 h-6" />
//               )}
//             </button>
//           </div>

//           {/* Mobile Menu */}
//           {mobileMenuOpen && (
//             <div className="md:hidden border-t border-gray-200 bg-white">
//               <div className="px-6 py-4 flex flex-col gap-4">
//                 <a
//                   href="#about"
//                   className="text-left hover:text-green-700 transition"
//                 >
//                   Features
//                 </a>
//                 <a
//                   href="#features"
//                   className="text-left hover:text-green-700 transition"
//                 >
//                   About
//                 </a>
//                 <a
//                   href="#contact"
//                   className="text-left hover:text-green-700 transition"
//                 >
//                   Contact
//                 </a>
//                 <div className="flex gap-3 pt-4 border-t border-gray-200">
//                   <button
//                     onClick={() => {
//                       navigate("/login");
//                       setMobileMenuOpen(false);
//                     }}
//                     className="flex-1 px-4 py-2 rounded-lg border-2 border-green-600 text-green-700 hover:bg-green-600 hover:text-white transition font-semibold"
//                   >
//                     Login
//                   </button>
//                   <button
//                     onClick={() => {
//                       navigate("/register");
//                       setMobileMenuOpen(false);
//                     }}
//                     className="flex-1 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition font-semibold"
//                   >
//                     Register
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </nav>

//         {/* Hero Section */}
//         {/* <section
//           id="about"
//           style={{
//             backgroundImage: `url(${farmerImg})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             opacity: 1.65,
//           }}
//           className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center"
//         >
//           <div className="space-y-6">
//             <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-green-500">
//               Farm to Table Transparency
//             </h1>
//             <p className="text-lg text-gray-700">
//               Trace every ingredient from farmer to consumer. TruLeaf connects
//               farmers, manufacturers, and customers with full supply chain
//               visibility.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 pt-4">
//               <button
//                 onClick={() => navigate("/register")}
//                 className="group px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
//               >
//                 Get Started{" "}
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </button>
//               <button className="px-8 py-4 border-2 border-green-600 text-green-700 rounded-lg font-semibold hover:bg-green-100 transition">
//                 Learn More
//               </button>
//             </div>
//           </div>

//           <div className="relative rounded-2xl bg-gradient-to-br from-green-200 to-green-100 p-10">
//             <div className="space-y-8">
//               <div className="flex items-center gap-4">
//                 <div className="w-16 h-16 rounded-full bg-green-300 flex items-center justify-center">
//                   <Leaf className="w-8 h-8 text-green-700" />
//                 </div>
//                 <div>
//                   <p className="font-semibold text-green-800">Farmer</p>
//                   <p className="text-sm text-gray-600">Grows & Lists Crops</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-4">
//                 <div className="w-16 h-16 rounded-full bg-green-200 flex items-center justify-center">
//                   <Truck className="w-8 h-8 text-green-700" />
//                 </div>
//                 <div>
//                   <p className="font-semibold text-green-800">Manufacturer</p>
//                   <p className="text-sm text-gray-600">Processes & Creates</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-4">
//                 <div className="w-16 h-16 rounded-full bg-green-300 flex items-center justify-center">
//                   <QrCode className="w-8 h-8 text-green-700" />
//                 </div>
//                 <div>
//                   <p className="font-semibold text-green-800">Customer</p>
//                   <p className="text-sm text-gray-600">Scans & Trusts</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section> */}
// <section
//   id="about"
//   className="relative max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center overflow-hidden"
// >
//   {/* ✅ IMAGE SLIDER BACKGROUND */}
//   <div className="absolute inset-0">
//     {heroImages.map((img, index) => (
//       <img
//         key={index}
//         src={img}
//         alt="Hero"
//         className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
//           index === currentSlide ? "opacity-100" : "opacity-0"
//         }`}
//       />
//     ))}
//   </div>

//   {/* ✅ DARK OVERLAY */}
//   <div className="absolute inset-0 bg-black/40"></div>

//   {/* ✅ LEFT CONTENT (UNCHANGED LOOK) */}
//   <div className="relative z-10 space-y-6">
//     <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-green-300">
//       Farm to Table Transparency
//     </h1>
//     <p className="text-lg text-gray-200">
//       Trace every ingredient from farmer to consumer. TruLeaf connects
//       farmers, manufacturers, and customers with full supply chain
//       visibility.
//     </p>

//     <div className="flex flex-col sm:flex-row gap-4 pt-4">
//       <button
//         onClick={() => navigate("/register")}
//         className="group px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
//       >
//         Get Started
//         <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//       </button>

//       <button className="px-8 py-4 border-2 border-green-600 text-green-200 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition">
//         Learn More
//       </button>
//     </div>
//   </div>

//   {/* ✅ RIGHT CARD (YOUR ORIGINAL CARD – UNCHANGED) */}
//   <div className="relative z-10 rounded-2xl bg-gradient-to-br from-green-200 to-green-100 p-10">
//     <div className="space-y-8">
//       <div className="flex items-center gap-4">
//         <div className="w-16 h-16 rounded-full bg-green-300 flex items-center justify-center">
//           <Leaf className="w-8 h-8 text-green-700" />
//         </div>
//         <div>
//           <p className="font-semibold text-green-800">Farmer</p>
//           <p className="text-sm text-gray-600">Grows & Lists Crops</p>
//         </div>
//       </div>

//       <div className="flex items-center gap-4">
//         <div className="w-16 h-16 rounded-full bg-green-200 flex items-center justify-center">
//           <Truck className="w-8 h-8 text-green-700" />
//         </div>
//         <div>
//           <p className="font-semibold text-green-800">Manufacturer</p>
//           <p className="text-sm text-gray-600">Processes & Creates</p>
//         </div>
//       </div>

//       <div className="flex items-center gap-4">
//         <div className="w-16 h-16 rounded-full bg-green-300 flex items-center justify-center">
//           <QrCode className="w-8 h-8 text-green-700" />
//         </div>
//         <div>
//           <p className="font-semibold text-green-800">Customer</p>
//           <p className="text-sm text-gray-600">Scans & Trusts</p>
//         </div>
//       </div>
//     </div>
//   </div>
// </section>



//         {/* Features */}
//         <section
//           id="features"
//           className="bg-white py-20 border-t border-gray-200"
//         >
//           <h2 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-4">
//             How It Works
//           </h2>
//           <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
//             Transparent traceability connecting farmers, manufacturers, and
//             consumers effortlessly.
//           </p>
//           <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
//             <div className="rounded-xl p-8 border hover:shadow-lg transition">
//               <Leaf className="w-10 h-10 text-green-700 mb-4" />
//               <h3 className="font-bold text-xl mb-2 text-green-800">
//                 Farmer Listings
//               </h3>
//               <p className="text-gray-600">
//                 Farmers list crops and prices to supply genuine agri-products
//                 directly to manufacturers.
//               </p>
//             </div>
//             <div className="rounded-xl p-8 border hover:shadow-lg transition">
//               <Truck className="w-10 h-10 text-green-700 mb-4" />
//               <h3 className="font-bold text-xl mb-2 text-green-800">
//                 Manufacturer Processing
//               </h3>
//               <p className="text-gray-600">
//                 Manufacturers buy raw products offline and record finished goods
//                 made from farmer-supplied items.
//               </p>
//             </div>
//             <div className="rounded-xl p-8 border hover:shadow-lg transition">
//               <QrCode className="w-10 h-10 text-green-700 mb-4" />
//               <h3 className="font-bold text-xl mb-2 text-green-800">
//                 QR Code Tracking
//               </h3>
//               <p className="text-gray-600">
//                 System generates QR codes, enabling customers to trace the
//                 origin of each product.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* contact */}
//         <section
//           id="contact"
//           className="bg-white py-20 border-t border-gray-200"
//         >
//           <h2 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-4">
//             Contact Us
//           </h2>
//           <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
//             We're here to assist you. Reach out to us anytime for support,
//             collaboration, or inquiries.
//           </p>

//           <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
//             <div className="rounded-xl p-8 border hover:shadow-lg transition text-center">
//               <Phone className="w-10 h-10 text-green-700 mb-4 mx-auto" />
//               <h3 className="font-bold text-xl mb-2 text-green-800">Mobile</h3>
//               <p className="text-gray-600">+91 7975287481</p>
//             </div>

//             <div className="rounded-xl p-8 border hover:shadow-lg transition text-center">
//               <Mail className="w-10 h-10 text-green-700 mb-4 mx-auto" />
//               <h3 className="font-bold text-xl mb-2 text-green-800">Email</h3>
//               <p className="text-gray-600">avinash777@gmail.com</p>
//             </div>

//             <div className="rounded-xl p-8 border hover:shadow-lg transition text-center">
//               <Users className="w-10 h-10 text-green-700 mb-4 mx-auto" />
//               <h3 className="font-bold text-xl mb-2 text-green-800">
//                 Social Media
//               </h3>
//               <div className="flex justify-center gap-4 mt-2">
//                 <a
//                   href="https://instagram.com/"
//                   target="_blank"
//                   className="text-gray-600 hover:text-green-700 font-medium"
//                 >
//                   Instagram
//                 </a>
//                 <a
//                   href="https://facebook.com/"
//                   target="_blank"
//                   className="text-gray-600 hover:text-green-700 font-medium"
//                 >
//                   Facebook
//                 </a>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* CTA */}
//         <section className="text-center py-20 bg-green-50 border-t border-gray-200">
//           <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
//             Join the Food Traceability Movement
//           </h2>
//           <p className="text-lg text-gray-700 mb-8">
//             Experience transparent trust between farmers, manufacturers, and
//             consumers.
//           </p>
//           <button
//             onClick={() => navigate("/register")}
//             className="px-10 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition inline-flex items-center gap-2"
//           >
//             Get Started <ArrowRight className="w-5 h-5" />
//           </button>
//         </section>

//         {/* Footer */}
//         <footer className="bg-white border-t border-gray-200 py-8 text-center text-sm text-gray-500">
//           © {new Date().getFullYear()} TrueLeaf. All rights reserved.
//         </footer>
//       </div>
//     );
//   }
// }
