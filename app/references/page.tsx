"use client";

import { useState } from "react";
import { useCVStore } from "../lib/store";
import FormSection from "../components/FormSection";
import EditableList from "../components/EditableList";
import { Field, Reference } from "../lib/definitions";

export default function ReferencesPage() {
  const { references, addReference, updateReference, removeReference } = useCVStore();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const convertData = (data: Record<string, string>) => {
    return {
      name: data.name || "",
      reference: data.reference || "",
    } as Reference;
  }

  const fields: Field[] = [
    { name: "name", label: "Nom de la personne", type: "text", required: true },
    { name: "reference", label: "Référence / Témoignage", type: "textarea", required: true },
  ];

  const handleSubmit = (data: Record<string, string>) => {
    if (editingIndex !== null) {
      updateReference(editingIndex, convertData(data));
    } else {
      addReference(convertData(data));
    }
    setEditingIndex(null);
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Références</h1>
      <EditableList
        items={references}
        onAdd={() => setEditingIndex(references.length)}
        onEdit={(index) => setEditingIndex(index)}
        onDelete={removeReference}
        renderItem={(item, index) => (
          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-sm mt-2 italic">"{item.reference}"</p>
          </div>
        )}
      />
      {editingIndex !== null && (
        <FormSection
          fields={fields}
          initialData={{
            name: references[editingIndex]?.name || "",
            reference: references[editingIndex]?.reference || "",
          }}
          onSubmit={handleSubmit}
          onCancel={() => setEditingIndex(null)}
        />
      )}
    </div>
  );
}
