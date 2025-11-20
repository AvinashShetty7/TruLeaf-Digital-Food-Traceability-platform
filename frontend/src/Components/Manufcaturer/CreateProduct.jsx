import { useState, useEffect } from "react";
import axios from "axios";

export default function CreateProduct() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [rawMaterials, setRawMaterials] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);

  const [form, setForm] = useState({
    name: "",
    quantity: "",
    unit: "kg",
    imageUrl: null,
    productionDate: "",
    expiryDate: "",
    description: "",
    category: "",
    manufacturingLocation: "",
    batchNumber: ""
  });

  useEffect(() => {
    const fetchRawMaterials = async () => {
      try {
        const MANUFACTURER_ID = "691a0664cee641dce9ba2a2e";
        const res = await axios.get(
          `${API_URL}/api/rawmaterial/mybuyedraws/${MANUFACTURER_ID}`
        );
        setRawMaterials(res.data.materials || []);
      } catch (error) {
        console.log("Error fetching raw materials", error);
      }
    };
    fetchRawMaterials();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setForm({ ...form, imageUrl: e.target.files[0] });
  };

  const handleCheckboxChange = (id, checked) => {
    if (checked) {
      setSelectedMaterials([...selectedMaterials, id]);
    } else {
      setSelectedMaterials(selectedMaterials.filter((x) => x !== id));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.quantity || !form.imageUrl || selectedMaterials.length === 0) {
      alert("Fill all fields & select raw materials");
      return;
    }

    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("quantity", form.quantity);
      fd.append("unit", form.unit);
      fd.append("productionDate", form.productionDate);
      fd.append("expiryDate", form.expiryDate);
      fd.append("description", form.description);
      fd.append("category", form.category);
      fd.append("manufacturingLocation", form.manufacturingLocation);
      fd.append("batchNumber", form.batchNumber);
      fd.append("imageUrl", form.imageUrl);

      // raw materials JSON encoded
      fd.append("rawMaterials", JSON.stringify(selectedMaterials));

      await axios.post(`${API_URL}/api/product/create`, fd);

      alert("Product created successfully!");
    } catch (error) {
      console.log("Error creating product:", error);
      alert("Error creating product");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 flex items-center justify-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white border shadow-2xl rounded-2xl p-10 w-full max-w-2xl space-y-6"
      >
        <h1 className="text-3xl font-bold text-green-800 text-center">Create Product</h1>

        {/* Product Fields */}
        <input type="text" name="name" placeholder="Product Name"
          onChange={handleChange} className="input" />

        <input type="number" name="quantity" placeholder="Quantity"
          onChange={handleChange} className="input" />

        <select name="unit" onChange={handleChange} className="input">
          <option value="kg">kg</option>
          <option value="litre">litre</option>
          <option value="ton">ton</option>
          <option value="pcs">pcs</option>
        </select>

        <input type="file" accept="image/*" onChange={handleFile} className="input" />

        <input type="date" name="productionDate" onChange={handleChange} className="input" />

        <input type="date" name="expiryDate" onChange={handleChange} className="input" />

        <input type="text" name="description" placeholder="Description"
          onChange={handleChange} className="input" />

        <select name="category" onChange={handleChange} className="input">
          <option value="">Select Category</option>
          <option value="Flour">Flour</option>
          <option value="Oil">Oil</option>
          <option value="Beverage">Beverage</option>
          <option value="Snacks">Snacks</option>
          <option value="Grains">Grains</option>
        </select>

        <input type="text" name="manufacturingLocation" placeholder="Manufacturing Location"
          onChange={handleChange} className="input" />

        <input type="text" name="batchNumber" placeholder="Batch Number (optional)"
          onChange={handleChange} className="input" />

        {/* Raw Materials */}
        <h2 className="text-xl font-bold text-green-700">Select Raw Materials</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-60 overflow-y-auto p-2 border rounded-lg bg-green-50">
          {rawMaterials.map((item) => (
            <label key={item._id}
              className={`flex gap-3 p-4 border rounded-lg cursor-pointer shadow-sm ${
                selectedMaterials.includes(item._id)
                  ? "bg-green-200 border-green-600"
                  : "bg-white hover:bg-green-100"
              }`}
            >
              <input
                type="checkbox"
                checked={selectedMaterials.includes(item._id)}
                onChange={(e) => handleCheckboxChange(item._id, e.target.checked)}
                className="mt-1 w-5 h-5 text-green-600"
              />
              <div>
                <p className="font-semibold text-green-900">{item.name}</p>
                <p className="text-sm text-gray-600">Batch: {item.batchCode}</p>
                <p className="text-sm text-gray-600">
                  {item.quantity} {item.unit}
                </p>
              </div>
            </label>
          ))}
        </div>

        {/* Submit */}
        <button type="submit"
          className="w-full py-3 bg-green-600 text-white text-lg rounded-lg shadow hover:bg-green-700">
          Create Product
        </button>
      </form>
    </div>
  );
}
