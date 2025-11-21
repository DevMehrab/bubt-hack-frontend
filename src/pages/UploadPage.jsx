import React, { useState } from "react";
import axios from "axios";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setStatus("Please select a file first.");

    const form = new FormData();
    form.append("image", file);
    form.append("userId", "USER_ID_HERE");

    try {
      await axios.post("http://localhost:5000/api/uploads/upload", form);
      setStatus("Upload successful!");
    } catch (err) {
      console.error(err);
      setStatus("Upload failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Upload Image
        </h2>

        {/* Upload Input Box */}
        <label className="flex flex-col items-center justify-center w-full h-40 border border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-gray-400 transition">
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />

          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-gray-400 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16l4-4a4 4 0 015.657 0L21 20M3 8h.01M7 8h.01M11 8h.01"
              />
            </svg>

            <span className="text-gray-500 text-sm">
              Click to upload or drag & drop
            </span>
          </div>
        </label>

        {/* Preview */}
        {preview && (
          <div className="mt-4">
            <p className="text-gray-600 text-sm mb-2 font-medium">Preview:</p>
            <img
              src={preview}
              alt="preview"
              className="w-full h-48 object-cover rounded-lg shadow-sm border"
            />
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className="mt-5 w-full py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-900 transition"
        >
          Upload
        </button>

        {/* Status */}
        {status && (
          <p className="text-center mt-3 text-sm font-medium text-gray-700">
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default UploadPage;
