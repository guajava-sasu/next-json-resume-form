// src/app/work/page.tsx
"use client";

import { useState } from "react";
import { useCVStore } from "../lib/store";
import FormSection from "../components/FormSection";
import EditableList from "../components/EditableList";

export default function WorkPage() {
  const { work, setWork } = useCVStore();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  return (
    <div>
      <h1>Expériences Professionnelles</h1>
      <EditableList
        items={work}
        onAdd={() => setEditingIndex(work.length)}
        onEdit={(index) => setEditingIndex(index)}
        onDelete={(index) => {
          const newWork = [...work];
          newWork.splice(index, 1);
          setWork(newWork);
        }}
      />
      {editingIndex !== null && (
        <FormSection
          fields={[
            { name: "name", label: "Nom de l'entreprise", type: "text" },
            { name: "position", label: "Poste", type: "text" },
            { name: "startDate", label: "Date de début", type: "date" },
            { name: "endDate", label: "Date de fin", type: "date" },
            { name: "summary", label: "Résumé", type: "textarea" },
          ]}
          onSubmit={(data) => {
            const newWork = [...work];
            newWork[editingIndex] = data;
            setWork(newWork);
            setEditingIndex(null);
          }}
          onCancel={() => setEditingIndex(null)}
        />
      )}
    </div>
  );
}
