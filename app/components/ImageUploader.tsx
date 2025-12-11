'use client';

import { useState, ChangeEvent } from 'react';

interface ImageUploaderProps {
  label: string;
  imageUrl: string;
  onChange: (url: string) => void;
}

export default function ImageUploader({ label, imageUrl, onChange }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string>(imageUrl);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (url: string) => {
    setPreview(url);
    onChange(url);
  };

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-2">{label}</label>
      
      <div className="space-y-4">
        {preview && (
          <div className="w-32 h-32 rounded-lg overflow-hidden border border-gray-300">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
        
        <div className="space-y-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">or</span>
          </div>
          
          <input
            type="url"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => handleUrlChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
