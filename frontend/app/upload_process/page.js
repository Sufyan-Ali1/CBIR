'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UploadProcess() {
  const router = useRouter();
  const [processingMode, setProcessingMode] = useState('');
  const [imageType, setImageType] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Supported image types
  const imageTypes = ['nii', 'jpg', 'jpeg', 'png'];

  // Map image type to file input accept attribute
  const getAcceptAttribute = () => {
    if (!imageType) return '';
    return `.${imageType}`;
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleProcess = async () => {
    if (!processingMode) {
      alert('Please select a processing mode.');
      return;
    }
    if (!imageType) {
      alert('Please select an image type.');
      return;
    }
    if (!selectedFile) {
      alert('Please upload an MRI image.');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('mode', processingMode);
      formData.append('type', imageType);

      // Replace with your actual API endpoint
      const response = await fetch('https://api.example.com/process-mri', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      // Assuming API returns processed data or a result ID
      const result = await response.json();
      console.log('API Response:', result);

      // Redirect to result page
      router.push('/result');
    } catch (error) {
      console.error('Error processing MRI:', error);
      alert('Failed to process MRI. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
          Upload & Process MRI
        </h1>
        <p className="text-base sm:text-lg text-center text-gray-600 mb-8">
          Select a processing mode, image type, and upload an MRI image.
        </p>

        {/* Form Container */}
        <div className="flex flex-col items-center gap-6">
          {/* Processing Mode Dropdown */}
          <div className="w-full">
            <label htmlFor="mode-select" className="block text-sm sm:text-base text-gray-600 mb-2">
              Processing Mode
            </label>
            <select
              id="mode-select"
              value={processingMode}
              onChange={(e) => {
                setProcessingMode(e.target.value);
                setImageType(''); // Reset image type and file when mode changes
                setSelectedFile(null);
              }}
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a mode</option>
              <option value="2D">2D Processing</option>
              <option value="3D">3D Processing</option>
            </select>
          </div>

          {/* Image Type Dropdown (shown only if mode is selected) */}
          {processingMode && (
            <div className="w-full">
              <label htmlFor="type-select" className="block text-sm sm:text-base text-gray-600 mb-2">
                Image Type
              </label>
              <select
                id="type-select"
                value={imageType}
                onChange={(e) => {
                  setImageType(e.target.value);
                  setSelectedFile(null); // Reset file when type changes
                }}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose an image type</option>
                {imageTypes.map((type) => (
                  <option key={type} value={type}>
                    .{type}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* File Upload (shown only if image type is selected) */}
          {imageType && (
            <div className="w-full">
              <label htmlFor="file-upload" className="block text-sm sm:text-base text-gray-600 mb-2">
                Upload {processingMode} MRI Image ( .{imageType})
              </label>
              <input
                id="file-upload"
                type="file"
                accept={getAcceptAttribute()}
                onChange={handleFileChange}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          )}

          {/* Process Button */}
          <button
            onClick={handleProcess}
            disabled={isLoading || !processingMode || !imageType || !selectedFile}
            className={`w-full py-3 sm:py-4 px-6 rounded-lg font-semibold text-white transition duration-300 ease-in-out ${
              isLoading || !processingMode || !imageType || !selectedFile
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Processing...' : 'Process'}
          </button>
        </div>
      </div>
    </div>
  );
}