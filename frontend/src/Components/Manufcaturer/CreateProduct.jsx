import { useState, useEffect } from "react";
import axios from "axios";
import { Package, Upload, CheckCircle, AlertCircle } from "lucide-react";

export default function CreateProduct() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [rawMaterials, setRawMaterials] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [loading, setLoading] = useState(false);

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
        const res = await axios.get(
          `${API_URL}/api/rawmaterial/mybuyedraws`,
          { withCredentials: true }
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
      setLoading(true);
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

      await axios.post(`${API_URL}/api/product/create`, fd, { withCredentials: true });

      alert("Product created successfully!");
      setForm({
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
      setSelectedMaterials([]);
    } catch (error) {
      console.log("Error creating product:", error);
      alert("Error creating product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-100 to-teal-50 py-8 md:py-12 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12 space-y-3">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-green-100 rounded-full">
            <span className="text-sm font-semibold text-green-700">📦 New Product</span>
          </div>
          {/* <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent leading-tight">
            Create Product
          </h1> */}
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Add a new product and link raw materials for complete supply chain transparency
          </p>
        </div>

        {/* Main Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
        >
          {/* Form Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 md:px-8 py-8 md:py-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <Package className="w-7 h-7 md:w-8 md:h-8" />
              Product Information
            </h2>
          </div>

          {/* Form Content */}
          <div className="p-6 md:p-8 space-y-5 md:space-y-6">
            {/* Product Name */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-900">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g., Organic Wheat Flour"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 md:py-4 border-2 border-gray-200 rounded-xl bg-gray-50 font-medium placeholder-gray-400 focus:outline-none focus:border-green-500 focus:bg-white transition-all duration-300 text-base md:text-lg"
              />
            </div>

            {/* Quantity & Unit Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-900">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="quantity"
                  placeholder="100"
                  value={form.quantity}
                  onChange={handleChange}
                  className="w-full px-4 py-3 md:py-4 border-2 border-gray-200 rounded-xl bg-gray-50 font-medium placeholder-gray-400 focus:outline-none focus:border-green-500 focus:bg-white transition-all duration-300 text-base"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-900">
                  Unit <span className="text-red-500">*</span>
                </label>
                <select
                  name="unit"
                  value={form.unit}
                  onChange={handleChange}
                  className="w-full px-4 py-3 md:py-4 border-2 border-gray-200 rounded-xl bg-gray-50 font-medium focus:outline-none focus:border-green-500 focus:bg-white transition-all duration-300 cursor-pointer text-base"
                >
                  <option value="kg">kg</option>
                  <option value="litre">litre</option>
                  <option value="ton">ton</option>
                  <option value="pcs">pcs</option>
                </select>
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-900">
                Product Image <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="border-2 border-dashed border-green-300 rounded-xl p-6 md:p-8 text-center bg-green-50 group-hover:bg-green-100 transition-all duration-300 cursor-pointer">
                  <Upload className="w-8 h-8 md:w-10 md:h-10 text-green-600 mx-auto mb-3" />
                  <p className="text-sm md:text-base font-bold text-gray-900">
                    {form.imageUrl ? form.imageUrl.name : "Click to upload image"}
                  </p>
                  <p className="text-xs md:text-sm text-gray-600 mt-1">PNG, JPG up to 10MB</p>
                </div>
              </div>
            </div>

            {/* Production & Expiry Dates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-900">
                  Production Date
                </label>
                <input
                  type="date"
                  name="productionDate"
                  value={form.productionDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 md:py-4 border-2 border-gray-200 rounded-xl bg-gray-50 font-medium focus:outline-none focus:border-green-500 focus:bg-white transition-all duration-300 cursor-pointer text-base"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-900">
                  Expiry Date
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={form.expiryDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 md:py-4 border-2 border-gray-200 rounded-xl bg-gray-50 font-medium focus:outline-none focus:border-green-500 focus:bg-white transition-all duration-300 cursor-pointer text-base"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-900">
                Description
              </label>
              <input
                type="text"
                name="description"
                placeholder="Product description..."
                value={form.description}
                onChange={handleChange}
                className="w-full px-4 py-3 md:py-4 border-2 border-gray-200 rounded-xl bg-gray-50 font-medium placeholder-gray-400 focus:outline-none focus:border-green-500 focus:bg-white transition-all duration-300 text-base"
              />
            </div>

            {/* Category & Manufacturing Location Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-900">
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 md:py-4 border-2 border-gray-200 rounded-xl bg-gray-50 font-medium focus:outline-none focus:border-green-500 focus:bg-white transition-all duration-300 cursor-pointer text-base"
                >
                  <option value="">Select Category</option>
                  <option value="Flour">Flour</option>
                  <option value="Oil">Oil</option>
                  <option value="Beverage">Beverage</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Grains">Grains</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-900">
                  Manufacturing Location
                </label>
                <input
                  type="text"
                  name="manufacturingLocation"
                  placeholder="City, State"
                  value={form.manufacturingLocation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 md:py-4 border-2 border-gray-200 rounded-xl bg-gray-50 font-medium placeholder-gray-400 focus:outline-none focus:border-green-500 focus:bg-white transition-all duration-300 text-base"
                />
              </div>
            </div>

            {/* Batch Number */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-900">
                Batch Number <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                name="batchNumber"
                placeholder="e.g., BATCH-2024-001"
                value={form.batchNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 md:py-4 border-2 border-gray-200 rounded-xl bg-gray-50 font-medium placeholder-gray-400 focus:outline-none focus:border-green-500 focus:bg-white transition-all duration-300 text-base"
              />
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-6 md:my-8"></div>

            {/* Raw Materials Section */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 md:w-7 md:h-7 text-green-600" />
                Select Raw Materials
                <span className="text-red-500">*</span>
              </h3>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                Choose the raw materials used in this product ({selectedMaterials.length} selected)
              </p>

              {rawMaterials.length === 0 ? (
                <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 text-center">
                  <AlertCircle className="w-8 h-8 text-amber-600 mx-auto mb-3" />
                  <p className="text-base font-semibold text-amber-900">No raw materials available</p>
                  <p className="text-sm text-amber-700 mt-1">Purchase raw materials first to create a product</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 max-h-80 overflow-y-auto pr-2 border-2 border-gray-200 rounded-xl p-4 md:p-5 bg-gray-50">
                  {rawMaterials.map((item) => (
                    <label
                      key={item._id}
                      className={`flex items-start gap-3 p-4 md:p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 group ${
                        selectedMaterials.includes(item._id)
                          ? "bg-gradient-to-br from-green-100 to-emerald-50 border-green-500 shadow-md"
                          : "bg-white border-gray-200 hover:border-green-300 hover:shadow-sm"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedMaterials.includes(item._id)}
                        onChange={(e) => handleCheckboxChange(item._id, e.target.checked)}
                        className="mt-1.5 w-5 h-5 md:w-6 md:h-6 text-green-600 rounded-md cursor-pointer accent-green-600 flex-shrink-0"
                      />
                      <div className="min-w-0 flex-grow">
                        <p className="font-bold text-sm md:text-base text-gray-900 group-hover:text-green-700 transition-colors">
                          {item.name}
                        </p>
                        <p className="text-xs md:text-sm text-gray-600 font-mono mt-1">
                          Batch: {item.batchCode}
                        </p>
                        <p className="text-xs md:text-sm text-gray-600 mt-1">
                          <span className="font-semibold">{item.quantity}</span> {item.unit}
                        </p>
                      </div>
                      {selectedMaterials.includes(item._id) && (
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      )}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="border-t border-gray-200 pt-6 md:pt-8">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 md:py-5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white rounded-xl font-bold text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="animate-spin inline-block w-5 h-5 border-3 border-white border-t-transparent rounded-full"></span>
                    Creating...
                  </>
                ) : (
                  <>
                    <Package className="w-5 h-5 md:w-6 md:h-6" />
                    Create Product
                  </>
                )}
              </button>
              <p className="text-xs md:text-sm text-gray-500 text-center mt-3">
                ✓ Your product will be assigned a unique QR code for traceability
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}


// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function CreateProduct() {
//   const API_URL = import.meta.env.VITE_API_URL;

//   const [rawMaterials, setRawMaterials] = useState([]);
//   const [selectedMaterials, setSelectedMaterials] = useState([]);

//   const [form, setForm] = useState({
//     name: "",
//     quantity: "",
//     unit: "kg",
//     imageUrl: null,
//     productionDate: "",
//     expiryDate: "",
//     description: "",
//     category: "",
//     manufacturingLocation: "",
//     batchNumber: ""
//   });

//   useEffect(() => {
//     const fetchRawMaterials = async () => {
//       try {
//         const res = await axios.get(
//           `${API_URL}/api/rawmaterial/mybuyedraws`,{withCredentials:true} 
//         );
//         setRawMaterials(res.data.materials || []);
//       } catch (error) {
//         console.log("Error fetching raw materials", error);
//       }
//     };
//     fetchRawMaterials();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleFile = (e) => {
//     setForm({ ...form, imageUrl: e.target.files[0] });
//   };

//   const handleCheckboxChange = (id, checked) => {
//     if (checked) {
//       setSelectedMaterials([...selectedMaterials, id]);
//     } else {
//       setSelectedMaterials(selectedMaterials.filter((x) => x !== id));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.name || !form.quantity || !form.imageUrl || selectedMaterials.length === 0) {
//       alert("Fill all fields & select raw materials");
//       return;
//     }

//     try {
//       const fd = new FormData();
//       fd.append("name", form.name);
//       fd.append("quantity", form.quantity);
//       fd.append("unit", form.unit);
//       fd.append("productionDate", form.productionDate);
//       fd.append("expiryDate", form.expiryDate);
//       fd.append("description", form.description);
//       fd.append("category", form.category);
//       fd.append("manufacturingLocation", form.manufacturingLocation);
//       fd.append("batchNumber", form.batchNumber);
//       fd.append("imageUrl", form.imageUrl);

//       // raw materials JSON encoded
//       fd.append("rawMaterials", JSON.stringify(selectedMaterials));

//       await axios.post(`${API_URL}/api/product/create`, fd,{withCredentials:true} );

//       alert("Product created successfully!");
//     } catch (error) {
//       console.log("Error creating product:", error);
//       alert("Error creating product");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 flex items-center justify-center py-10 px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white border shadow-2xl rounded-2xl p-10 w-full max-w-2xl space-y-6"
//       >
//         <h1 className="text-3xl font-bold text-green-800 text-center">Create Product</h1>

//         {/* Product Fields */}
//         <input type="text" name="name" placeholder="Product Name"
//           onChange={handleChange} className="input" />

//         <input type="number" name="quantity" placeholder="Quantity"
//           onChange={handleChange} className="input" />

//         <select name="unit" onChange={handleChange} className="input">
//           <option value="kg">kg</option>
//           <option value="litre">litre</option>
//           <option value="ton">ton</option>
//           <option value="pcs">pcs</option>
//         </select>

//         <input type="file" accept="image/*" onChange={handleFile} className="input" />

//         <input type="date" name="productionDate" onChange={handleChange} className="input" />

//         <input type="date" name="expiryDate" onChange={handleChange} className="input" />

//         <input type="text" name="description" placeholder="Description"
//           onChange={handleChange} className="input" />

//         <select name="category" onChange={handleChange} className="input">
//           <option value="">Select Category</option>
//           <option value="Flour">Flour</option>
//           <option value="Oil">Oil</option>
//           <option value="Beverage">Beverage</option>
//           <option value="Snacks">Snacks</option>
//           <option value="Grains">Grains</option>
//         </select>

//         <input type="text" name="manufacturingLocation" placeholder="Manufacturing Location"
//           onChange={handleChange} className="input" />

//         <input type="text" name="batchNumber" placeholder="Batch Number (optional)"
//           onChange={handleChange} className="input" />

//         {/* Raw Materials */}
//         <h2 className="text-xl font-bold text-green-700">Select Raw Materials</h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-60 overflow-y-auto p-2 border rounded-lg bg-green-50">
//           {rawMaterials.map((item) => (
//             <label key={item._id}
//               className={`flex gap-3 p-4 border rounded-lg cursor-pointer shadow-sm ${
//                 selectedMaterials.includes(item._id)
//                   ? "bg-green-200 border-green-600"
//                   : "bg-white hover:bg-green-100"
//               }`}
//             >
//               <input
//                 type="checkbox"
//                 checked={selectedMaterials.includes(item._id)}
//                 onChange={(e) => handleCheckboxChange(item._id, e.target.checked)}
//                 className="mt-1 w-5 h-5 text-green-600"
//               />
//               <div>
//                 <p className="font-semibold text-green-900">{item.name}</p>
//                 <p className="text-sm text-gray-600">Batch: {item.batchCode}</p>
//                 <p className="text-sm text-gray-600">
//                   {item.quantity} {item.unit}
//                 </p>
//               </div>
//             </label>
//           ))}
//         </div>

//         {/* Submit */}
//         <button type="submit"
//           className="w-full py-3 bg-green-600 text-white text-lg rounded-lg shadow hover:bg-green-700">
//           Create Product
//         </button>
//       </form>
//     </div>
//   );
// }
