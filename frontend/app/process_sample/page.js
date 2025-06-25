'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SampleProcess() {
  const router = useRouter();
  const [processingMode, setProcessingMode] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock sample MRI images (replace with actual data or API fetch)
  const images2D = [
    { id: 1, name: 'Brain MRI 2D - Axial', url: '/images/2d-mri-1.jpg' },
    { id: 2, name: 'Brain MRI 2D - Coronal', url: '/images/2d-mri-2.jpg' },
    { id: 3, name: 'Spinal MRI 2D', url: '/images/2d-mri-3.jpg' },
  ];

  const images3D = [
    { id: 4, name: 'Brain MRI 3D - Model 1', url: '/images/3d-mri-1.jpg' },
    { id: 5, name: 'Brain MRI 3D - Model 2', url: '/images/3d-mri-2.jpg' },
    { id: 6, name: 'Spinal MRI 3D', url: '/images/3d-mri-3.jpg' },
  ];

  // Determine which images to show based on mode
  const availableImages = processingMode === '2D' ? images2D : images3D;

  const handleProcess = async () => {
    if (!processingMode) {
      alert('Please select a processing mode.');
      return;
    }
    if (!selectedImage) {
      alert('Please select an MRI image.');
      return;
    }

    setIsLoading(true);

    try {
      const image = availableImages.find((img) => img.id.toString() === selectedImage);
      // Replace with your actual API endpoint
      const response = await fetch('https://api.example.com/process-mri', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: image.url,
          mode: processingMode,
        }),
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
          Process Sample MRI
        </h1>
        <p className="text-base sm:text-lg text-center text-gray-600 mb-8">
          Select a processing mode and MRI image to analyze.
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
                setSelectedImage(''); // Reset image selection when mode changes
              }}
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a mode</option>
              <option value="2D">2D Processing</option>
              <option value="3D">3D Processing</option>
            </select>
          </div>

          {/* Image Dropdown (shown only if mode is selected) */}
          {processingMode && (
            <div className="w-full">
              <label htmlFor="image-select" className="block text-sm sm:text-base text-gray-600 mb-2">
                Select {processingMode} MRI Image
              </label>
              <select
                id="image-select"
                value={selectedImage}
                onChange={(e) => setSelectedImage(e.target.value)}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose an image</option>
                {availableImages.map((image) => (
                  <option key={image.id} value={image.id}>
                    {image.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Process Button */}
          <button
            onClick={handleProcess}
            disabled={isLoading || !processingMode || !selectedImage}
            className={`w-full py-3 sm:py-4 px-6 rounded-lg font-semibold text-white transition duration-300 ease-in-out ${
              isLoading || !processingMode || !selectedImage
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