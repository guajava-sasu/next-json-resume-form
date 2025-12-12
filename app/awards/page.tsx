"use client";

import { useState } from "react";
import { useCVStore } from "../lib/store";
import FormSection from "../components/FormSection";
import EditableList from "../components/EditableList";
import { Field, Award } from "../lib/definitions";

export default function AwardsPage() {
  const { awards, addAward, updateAward, removeAward } = useCVStore();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const convertData = (data: Record<string, string>) => {
    return {
      title: data.title || "",
      date: data.date || "",
      awarder: data.awarder || "",
      summary: data.summary || "",
    } as Award;
  }

  const fields: Field[] = [
    { name: "title", label: "Titre du prix", type: "text", required: true },
    { name: "date", label: "Date", type: "date", required: true },
    { name: "awarder", label: "Organisation", type: "text", required: true },
    { name: "summary", label: "Description", type: "textarea" },
  ];

  const handleSubmit = (data: Record<string, string>) => {
    if (editingIndex !== null) {
      updateAward(editingIndex, convertData(data));
    } else {
      addAward(convertData(data));
    }
    setEditingIndex(null);
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Prix et Distinctions</h1>
      <EditableList
        items={awards}
        onAdd={() => setEditingIndex(awards.length)}
        onEdit={(index) => setEditingIndex(index)}
        onDelete={removeAward}
        renderItem={(item, index) => (
          <div>
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.awarder} - {item.date}</p>
            {item.summary && <p className="text-sm mt-2">{item.summary}</p>}
          </div>
        )}
      />
      {editingIndex !== null && (
        <FormSection
          fields={fields}
          initialData={{
            title: awards[editingIndex]?.title || "",
            date: awards[editingIndex]?.date || "",
            awarder: awards[editingIndex]?.awarder || "",
            summary: awards[editingIndex]?.summary || "",
          }}
          onSubmit={handleSubmit}
          onCancel={() => setEditingIndex(null)}
        />
      )}
    </div>
  );
}
