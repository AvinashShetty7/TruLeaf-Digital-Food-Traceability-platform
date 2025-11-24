"use client";

import React, { useState } from "react";
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
import farmerImg from "../assets/farmer.jpg";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200 font-sans text-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-green-800">TrueLeaf</span>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="hover:text-green-700 transition">
              Features
            </a>
            <a href="#features" className="hover:text-green-700 transition">
              About
            </a>
            <a href="#contact" className="hover:text-green-700 transition">
              Contact
            </a>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-2 rounded-lg border-2 border-green-600 text-green-700 hover:bg-green-600 hover:text-white transition font-semibold"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition font-semibold"
              >
                Register
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-200 transition-colors"
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
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-6 py-4 flex flex-col gap-4">
              <a
                href="#about"
                className="text-left hover:text-green-700 transition"
              >
                Features
              </a>
              <a
                href="#features"
                className="text-left hover:text-green-700 transition"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-left hover:text-green-700 transition"
              >
                Contact
              </a>
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    navigate("/login");
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 px-4 py-2 rounded-lg border-2 border-green-600 text-green-700 hover:bg-green-600 hover:text-white transition font-semibold"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate("/register");
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition font-semibold"
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
        className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center"
      >
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-green-800">
            Farm to Table Transparency
          </h1>
          <p className="text-lg text-gray-700">
            Trace every ingredient from farmer to consumer. TruLeaf connects
            farmers, manufacturers, and customers with full supply chain
            visibility.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => navigate("/register")}
              className="group px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
            >
              Get Started{" "}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 border-2 border-green-600 text-green-700 rounded-lg font-semibold hover:bg-green-100 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Illustration */}
        <div className="relative rounded-2xl bg-gradient-to-br from-green-200 to-green-100 p-10">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-300 flex items-center justify-center">
                <Leaf className="w-8 h-8 text-green-700" />
              </div>
              <div>
                <p className="font-semibold text-green-800">Farmer</p>
                <p className="text-sm text-gray-600">Grows & Lists Crops</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-200 flex items-center justify-center">
                <Truck className="w-8 h-8 text-green-700" />
              </div>
              <div>
                <p className="font-semibold text-green-800">Manufacturer</p>
                <p className="text-sm text-gray-600">Processes & Creates</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-300 flex items-center justify-center">
                <QrCode className="w-8 h-8 text-green-700" />
              </div>
              <div>
                <p className="font-semibold text-green-800">Customer</p>
                <p className="text-sm text-gray-600">Scans & Trusts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        style={{
          backgroundImage: `url(${farmerImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.65,
        }}
        className="bg-white py-20 border-t border-gray-200"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-4">
          How It Works
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          Transparent traceability connecting farmers, manufacturers, and
          consumers effortlessly.
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
          <div className="rounded-xl p-8 border hover:shadow-lg transition">
            <Leaf className="w-10 h-10 text-green-700 mb-4" />
            <h3 className="font-bold text-xl mb-2 text-green-800">
              Farmer Listings
            </h3>
            <p className="text-gray-600">
              Farmers list crops and prices to supply genuine agri-products
              directly to manufacturers.
            </p>
          </div>
          <div className="rounded-xl p-8 border hover:shadow-lg transition">
            <Truck className="w-10 h-10 text-green-700 mb-4" />
            <h3 className="font-bold text-xl mb-2 text-green-800">
              Manufacturer Processing
            </h3>
            <p className="text-gray-600">
              Manufacturers buy raw products offline and record finished goods
              made from farmer-supplied items.
            </p>
          </div>
          <div className="rounded-xl p-8 border hover:shadow-lg transition">
            <QrCode className="w-10 h-10 text-green-700 mb-4" />
            <h3 className="font-bold text-xl mb-2 text-green-800">
              QR Code Tracking
            </h3>
            <p className="text-gray-600">
              System generates QR codes, enabling customers to trace the origin
              of each product.
            </p>
          </div>
        </div>
      </section>

      {/* contact */}
      <section id="contact" className="bg-white py-20 border-t border-gray-200">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-4">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          We're here to assist you. Reach out to us anytime for support,
          collaboration, or inquiries.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
          <div className="rounded-xl p-8 border hover:shadow-lg transition text-center">
            <Phone className="w-10 h-10 text-green-700 mb-4 mx-auto" />
            <h3 className="font-bold text-xl mb-2 text-green-800">Mobile</h3>
            <p className="text-gray-600">+91 7975287481</p>
          </div>

          <div className="rounded-xl p-8 border hover:shadow-lg transition text-center">
            <Mail className="w-10 h-10 text-green-700 mb-4 mx-auto" />
            <h3 className="font-bold text-xl mb-2 text-green-800">Email</h3>
            <p className="text-gray-600">avinash777@gmail.com</p>
          </div>

          <div className="rounded-xl p-8 border hover:shadow-lg transition text-center">
            <Users className="w-10 h-10 text-green-700 mb-4 mx-auto" />
            <h3 className="font-bold text-xl mb-2 text-green-800">
              Social Media
            </h3>
            <div className="flex justify-center gap-4 mt-2">
              <a
                href="https://instagram.com/"
                target="_blank"
                className="text-gray-600 hover:text-green-700 font-medium"
              >
                Instagram
              </a>
              <a
                href="https://facebook.com/"
                target="_blank"
                className="text-gray-600 hover:text-green-700 font-medium"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-20 bg-green-50 border-t border-gray-200">
        <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
          Join the Food Traceability Movement
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Experience transparent trust between farmers, manufacturers, and
          consumers.
        </p>
        <button
          onClick={() => navigate("/register")}
          className="px-10 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition inline-flex items-center gap-2"
        >
          Get Started <ArrowRight className="w-5 h-5" />
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} TrueLeaf. All rights reserved.
      </footer>
    </div>
  );
}
