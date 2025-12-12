// src/components/FormSection.tsx
"use client";

import { useState } from "react";

interface Field {
  name: string;
  label: string;
  type: "text" | "date" | "textarea" | "email" | "tel" | "url";
  required?: boolean;
  placeholder?: string;
}

interface FormSectionProps {
  fields: Field[];
  onSubmit: (data: Record<string, string>) => void;
  onCancel: () => void;
  initialData?: Record<string, string>;
}

export default function FormSection({
  fields,
  onSubmit,
  onCancel,
  initialData = {},
}: FormSectionProps) {
  const [formData, setFormData] = useState<Record<string, string>>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field) => (
          <div 
            key={field.name} 
            className={`flex flex-col ${field.type === 'textarea' ? 'md:col-span-2' : ''}`}
          >
            <label 
              htmlFor={field.name} 
              className="mb-2 text-sm font-semibold text-gray-700 flex items-center"
            >
              {field.label}
              {field.required && <span className="ml-1 text-red-500">*</span>}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={field.name}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                placeholder={field.placeholder}
                required={field.required}
                rows={4}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              />
            ) : (
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={formData[field.name] || ""}
                onChange={handleChange}
                placeholder={field.placeholder}
                required={field.required}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
        <button 
          type="button" 
          onClick={onCancel} 
          className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span>Annuler</span>
        </button>
        <button 
          type="submit" 
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Enregistrer</span>
        </button>
      </div>
    </form>
  );
}
