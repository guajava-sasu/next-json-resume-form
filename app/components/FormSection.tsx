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
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col">
          <label htmlFor={field.name} className="mb-1 text-sm font-medium">
            {field.label}
          </label>
          {field.type === "textarea" ? (
            <textarea
              id={field.name}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              placeholder={field.placeholder}
              required={field.required}
              className="p-2 border rounded"
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
              className="p-2 border rounded"
            />
          )}
        </div>
      ))}
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">
          Annuler
        </button>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Enregistrer
        </button>
      </div>
    </form>
  );
}
