// src/components/TagInput.tsx
"use client";

import { useState } from "react";

interface TagInputProps {
  label: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export default function TagInput({ label, tags, onChange, placeholder = "Ajouter un tag" }: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAddTag = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      onChange([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    onChange(tags.filter((t) => t !== tag));
  };

  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm font-medium">
        {label}
      </label>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <div key={tag} className="flex items-center px-3 py-1 bg-gray-200 rounded-full">
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => handleRemoveTag(tag)}
              className="ml-2 text-red-500"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
          placeholder={placeholder}
          className="flex-1 p-2 border rounded-l"
        />
        <button
          type="button"
          onClick={handleAddTag}
          className="px-4 py-2 bg-blue-500 text-white rounded-r"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
}
