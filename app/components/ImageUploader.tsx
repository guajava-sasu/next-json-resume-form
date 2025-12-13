// src/components/ImageUploader.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageUploaderProps {
  name: string;
  label: string;
  value: string;
  onChange: (file: File) => void;
}

export default function ImageUploader({ name, label, value, onChange }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(value || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1 text-sm font-medium">
        {label}
      </label>
      {preview && (
        // <img src={preview} alt="Preview" className="w-32 h-32 object-cover mb-2 rounded" />
        <Image src={preview} alt="Preview" width={128} height={128} className="mb-2 rounded" />
      )}
      <input
        id={name}
        name={name}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="p-2 border rounded"
      />
    </div>
  );
}
