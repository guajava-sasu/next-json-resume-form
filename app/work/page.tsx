// src/app/work/page.tsx
"use client";

import { useState } from "react";
import { useCVStore } from "../lib/store";
import FormSection from "../components/FormSection";
import EditableList from "../components/EditableList";
import { Field } from "../lib/definitions";

export default function WorkPage() {
  const { work, addWork, updateWork, removeWork } = useCVStore();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const convertWorkData = (data: Record<string, string>) => {
    return {
      name: data.name || "",
      position: data.position || "",
      url: data.url || "",
      startDate: data.startDate || "",
      endDate: data.endDate || "",
      summary: data.summary || "",
      highlights: data.highlights ? data.highlights.split(",").map((h) => h.trim()) : [],
    };
  }
  const fields: Field[] = [
    { name: "name", label: "Nom de l'entreprise", type: "text", required: true },
    { name: "position", label: "Poste", type: "text", required: true },
    { name: "url", label: "Site web", type: "url" },
    { name: "startDate", label: "Date de début", type: "date", required: true },
    { name: "endDate", label: "Date de fin", type: "date" },
    { name: "summary", label: "Résumé", type: "textarea" },
  ];

  const handleSubmit = (data: Record<string, string>) => {
  
    if (editingIndex !== null) {
      updateWork(editingIndex, convertWorkData(data));
    } else {
      addWork(convertWorkData(data));
    }
    setEditingIndex(null);
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Expériences Professionnelles</h1>
      <EditableList
        items={work}
        onAdd={() => setEditingIndex(work.length)}
        onEdit={(index) => setEditingIndex(index)}
        onDelete={removeWork}
        renderItem={(item, index) => (
           <div key={index}> 
            <h3 className="font-semibold">{item.name}</h3>
            <p>{item.position}</p>
            <p>
              {item.startDate} - {item.endDate || "Présent"}
            </p>
          </div>
        )}
      />
      {editingIndex !== null && (
        <FormSection
          fields={fields}
          initialData={{
            name: work[editingIndex]?.name || "",
            position: work[editingIndex]?.position || "",
            url: work[editingIndex]?.url || "",
            startDate: work[editingIndex]?.startDate || "",
            endDate: work[editingIndex]?.endDate || "",
            summary: work[editingIndex]?.summary || "",
            highlights: work[editingIndex]?.highlights.join(", ") || "",
          }}
          onSubmit={handleSubmit}
          onCancel={() => setEditingIndex(null)}
        />
      )}
    </div>
  );
}
