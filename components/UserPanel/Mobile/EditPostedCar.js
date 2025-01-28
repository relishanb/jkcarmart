import React, { useState, useEffect } from "react";

const EditPostedCar = ({ car, onUpdate }) => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (car) {
      setFormData({
        ...car,
      });
    }
  }, [car]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = () => {
    if (onUpdate) {
      onUpdate(formData);
    }
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-4 px-3 pt-10 max-h-screen overflow-auto">
      {/* Editable Image */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <img
            src={formData.carImagesList?.[0] || ""}
            alt="Car"
            className="w-64 h-40 object-cover rounded-lg"
          />
          <label className="absolute bottom-2 right-2 bg-gray-800 text-white text-sm px-2 py-1 rounded cursor-pointer">
            Edit Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                handleInputChange("carImagesList", [URL.createObjectURL(e.target.files[0])])
              }
            />
          </label>
        </div>
      </div>
      {/* Details Box */}
      <div className="bg-white p-4 rounded-md shadow-md">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Brand:</span>
            <input
              type="text"
              value={formData.brandName}
              onChange={(e) => handleInputChange("brandName", e.target.value)}
              className="text-left border p-1 rounded-md"
            />
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Year:</span>
            <input
              type="text"
              value={formData.modelYear}
              onChange={(e) => handleInputChange("modelYear", e.target.value)}
              className="text-left border p-1 rounded-md"
            />
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Model:</span>
            <input
              type="text"
              value={formData.modelName}
              onChange={(e) => handleInputChange("modelName", e.target.value)}
              className="text-left border p-1 rounded-md"
            />
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Variant:</span>
            <input
              type="text"
              value={formData.variantName}
              onChange={(e) => handleInputChange("variantName", e.target.value)}
              className="text-left border p-1 rounded-md"
            />
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Kilometers Driven:</span>
            <input
              type="text"
              value={formData.totalDriven}
              onChange={(e) => handleInputChange("totalDriven", e.target.value)}
              className="text-left border p-1 rounded-md"
            />
          </div>
          {/* <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Owners:</span>
            <select
              value={formData.owners}
              onChange={(e) => handleInputChange("owners", e.target.value)}
              className="text-left border p-1 rounded-md"
            >
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
            </select>
          </div> */}
          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Location:</span>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className="text-left border p-1 rounded-md"
            />
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Expected Price:</span>
            <input
              type="text"
              value={formData.expectedPrice}
              onChange={(e) => handleInputChange("expectedPrice", e.target.value)}
              className="text-left border p-1 rounded-md"
            />
          </div>
        </div>
      </div>
      {/* Update Button */}
      <div className="mt-6">
        <button
          className="w-full bg-orange-500 text-white py-2 rounded-md"
          onClick={handleUpdate}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditPostedCar;
