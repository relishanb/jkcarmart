import { useState } from "react";
import { FaEdit, FaUpload } from "react-icons/fa";
import { useUpdateCarImagesMutation } from "@/store/updateCar"; // Import your API mutation hook

function EditPostedCarImage({ postedImage, carId }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(postedImage);
  const [isUploading, setIsUploading] = useState(false);

  // API mutation hook
  const [updateAdImages] = useUpdateCarImagesMutation();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Show preview
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) return alert("Please select an image to upload.");

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", selectedImage);
    const payload = { carId: carId, formData: formData, file: selectedImage };

    try {
      await updateAdImages(payload).unwrap();
      alert("Car image updated successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to update car image. Try again.");
    }

    setIsUploading(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-xs mx-auto">
      <div className="relative w-40 h-40 rounded-lg overflow-hidden shadow-lg">
        {/* Display Image */}
        <img src={previewImage} alt="Car" className="w-full h-full object-cover" />

        {/* Edit Button */}
        <label className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full cursor-pointer">
          <FaEdit className="text-xl" />
          <input type="file" accept="image/*" onChange={handleImageChange} hidden />
        </label>
      </div>

      {/* Upload Button (Only Visible When a New Image is Selected) */}
      {selectedImage && (
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
          onClick={handleUpload}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : <><FaUpload /> Upload</>}
        </button>
      )}
    </div>
  );
}

export default EditPostedCarImage;
