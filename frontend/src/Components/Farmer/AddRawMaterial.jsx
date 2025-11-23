import { useState } from "react";
import axios from "axios";

export default function AddRawMaterial() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [form, setForm] = useState({
    name: "",
    quantity: "",
    unit: "",
    location: "",
    harvestDate: "",
    expiryDate: "",
    imageUrl: null, // File goes here
    qualityGrade: "",
    pricePerUnit: "",
    status: "available",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, imageUrl: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const res = await axios.post(
        `${API_URL}/api/farmer/upload-farmimage`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert(res.data.message || "Raw Material Added Successfully");
    } catch (error) {
      console.error(error);
      alert("Error adding raw material");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-200 flex justify-center items-center py-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl space-y-6 border-2 border-green-200"
      >
        <h1 className="text-3xl font-bold text-center text-green-700 mb-2">
          Add Raw Material
        </h1>
        <div className="flex flex-col gap-4">
          <input
            name="name"
            placeholder="Raw Crop Name (e.g. Wheat)"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 outline-none"
          />
          <div className="flex gap-4">
            <input
              name="quantity"
              placeholder="Quantity"
              onChange={handleChange}
              className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 outline-none"
            />
            <input
              name="unit"
              placeholder="Unit (kg, ton, etc.)"
              onChange={handleChange}
              className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 outline-none"
            />
          </div>
          <input
            name="location"
            placeholder="Location"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 outline-none"
          />
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="font-semibold text-green-600 block mb-1">
                Harvest Date
              </label>
              <input
                type="date"
                name="harvestDate"
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 outline-none"
              />
            </div>
            <div className="w-1/2">
              <label className="font-semibold text-green-600 block mb-1">
                Expiry Date
              </label>
              <input
                type="date"
                name="expiryDate"
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="font-semibold text-green-600 mb-1 block">
              Raw Material Image
            </label>
            <input
              type="file"
              name="imageUrl"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
          <input
            name="qualityGrade"
            placeholder="Quality Grade (A, B, C)"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 outline-none"
          />
          <input
            name="pricePerUnit"
            placeholder="Price per Unit"
            type="number"
            min="0"
            step="0.01"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300 outline-none"
          />
          <select
            name="status"
            onChange={handleChange}
            value={form.status}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-green-300 outline-none"
          >
            <option value="available">Available</option>
            <option value="consumed">Consumed</option>
            <option value="expired">Expired</option>
          </select>
          <button
            type="submit"
            className="w-full mt-4 p-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-xl transition"
          >
            Add Raw Material
          </button>
        </div>
      </form>
    </div>
  );
}
