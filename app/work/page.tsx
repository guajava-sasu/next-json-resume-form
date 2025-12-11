// src/app/work/page.tsx
"use client";

import { useState } from "react";
import { useResumeStore } from "../lib/store";
import FormSection from "../components/FormSection";
import EditableList from "../components/EditableList";

export default function WorkPage() {
  const { work, addWork, updateWork, removeWork } = useResumeStore();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const fields = [
    { name: "name", label: "Nom de l'entreprise", type: "text", required: true },
    { name: "position", label: "Poste", type: "text", required: true },
    { name: "url", label: "Site web", type: "url" },
    { name: "startDate", label: "Date de début", type: "date", required: true },
    { name: "endDate", label: "Date de fin", type: "date" },
    { name: "summary", label: "Résumé", type: "textarea" },
  ];

  const handleSubmit = (data: Record<string, string>) => {
    const workData = {
      ...data,
      highlights: data.highlights?.split(",").map((h) => h.trim()) || [],
    };
    if (editingIndex !== null) {
      updateWork(editingIndex, workData as any);
    } else {
      addWork(workData as any);
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
          <div>
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
          initialData={work[editingIndex] || {}}
          onSubmit={handleSubmit}
          onCancel={() => setEditingIndex(null)}
        />
      )}
    </div>
  );
}
