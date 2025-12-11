// src/components/TagInput.tsx
"use client";

import { useState } from "react";

interface TagInputProps {
  name: string;
  label: string;
  value: string[];
  onChange: (tags: string[]) => void;
}

export default function TagInput({ name, label, value, onChange }: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAddTag = () => {
    if (inputValue.trim() && !value.includes(inputValue.trim())) {
      onChange([...value, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1 text-sm font-medium">
        {label}
      </label>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((tag) => (
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
          id={name}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
          placeholder="Ajouter un tag"
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
