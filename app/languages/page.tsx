"use client";

import { useState } from "react";
import { useCVStore } from "../lib/store";
import FormSection from "../components/FormSection";
import EditableList from "../components/EditableList";
import { Field, Language } from "../lib/definitions";

export default function LanguagesPage() {
  const { languages, addLanguage, updateLanguage, removeLanguage } =
    useCVStore();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const fields: Field[] = [
    { name: "language", label: "Langue", type: "text", required: true },
    { name: "fluency", label: "Niveau", type: "text", required: true },
  ];

  const convertData = (data: Record<string, string>) => {
    return {
      language: data.language || "",
      fluency: data.fluency || "",
    } as Language;
  };

  const handleSubmit = (data: Record<string, string>) => {
    if (editingIndex !== null) {
      updateLanguage(editingIndex, convertData(data));
    } else {
      addLanguage(convertData(data));
    }
    setEditingIndex(null);
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Langues</h1>
      <EditableList
        items={languages}
        onAdd={() => setEditingIndex(languages.length)}
        onEdit={(index) => setEditingIndex(index)}
        onDelete={removeLanguage}
        renderItem={(item, index) => (
          <div key={index}>
            <h3 className="font-semibold">{item.language}</h3>
            <p>{item.fluency}</p>
          </div>
        )}
      />
      {editingIndex !== null && (
        <FormSection
          fields={fields}
          initialData={{
            language: languages[editingIndex]?.language || "",
            fluency: languages[editingIndex]?.fluency || "",
          }}
          onSubmit={handleSubmit}
          onCancel={() => setEditingIndex(null)}
        />
      )}
    </div>
  );
}
