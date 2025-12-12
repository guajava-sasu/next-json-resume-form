"use client";

import { useState } from "react";
import { useCVStore } from "../lib/store";
import FormSection from "../components/FormSection";
import EditableList from "../components/EditableList";
import { Field, Publication } from "../lib/definitions";

export default function PublicationsPage() {
  const { publications, addPublication, updatePublication, removePublication } = useCVStore();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const convertData = (data: Record<string, string>) => {
    return {
      name: data.name || "",
      publisher: data.publisher || "",
      releaseDate: data.releaseDate || "",
      url: data.url || "",
      summary: data.summary || "",
    } as Publication;
  }

  const fields: Field[] = [
    { name: "name", label: "Titre de la publication", type: "text", required: true },
    { name: "publisher", label: "Éditeur", type: "text", required: true },
    { name: "releaseDate", label: "Date de publication", type: "date", required: true },
    { name: "url", label: "URL", type: "url" },
    { name: "summary", label: "Résumé", type: "textarea" },
  ];

  const handleSubmit = (data: Record<string, string>) => {
    if (editingIndex !== null) {
      updatePublication(editingIndex, convertData(data));
    } else {
      addPublication(convertData(data));
    }
    setEditingIndex(null);
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Publications</h1>
      <EditableList
        items={publications}
        onAdd={() => setEditingIndex(publications.length)}
        onEdit={(index) => setEditingIndex(index)}
        onDelete={removePublication}
        renderItem={(item, index) => (
          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.publisher} - {item.releaseDate}</p>
            {item.summary && <p className="text-sm mt-2">{item.summary}</p>}
            {item.url && <a href={item.url} className="text-sm text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Lire</a>}
          </div>
        )}
      />
      {editingIndex !== null && (
        <FormSection
          fields={fields}
          initialData={{
            name: publications[editingIndex]?.name || "",
            publisher: publications[editingIndex]?.publisher || "",
            releaseDate: publications[editingIndex]?.releaseDate || "",
            url: publications[editingIndex]?.url || "",
            summary: publications[editingIndex]?.summary || "",
          }}
          onSubmit={handleSubmit}
          onCancel={() => setEditingIndex(null)}
        />
      )}
    </div>
  );
}
