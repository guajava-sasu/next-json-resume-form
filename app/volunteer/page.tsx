// src/app/volunteer/page.tsx
"use client";

import { useState } from "react";
import { useCVStore } from "../lib/store";
import FormSection from "../components/FormSection";
import EditableList from "../components/EditableList";
import { Field, Volunteer } from "../lib/definitions";

export default function VolunteerPage() {
  const { volunteer, addVolunteer, updateVolunteer, removeVolunteer } = useCVStore();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const convertData = (data: Record<string, string>) => {
    return {
      organization: data.organization || "",
      position: data.position || "",
      url: data.url || "",
      startDate: data.startDate || "",
      endDate: data.endDate || "",
      summary: data.summary || "",
      highlights: data.highlights ? data.highlights.split(",").map((h) => h.trim()) : [],
    } as Volunteer;
  }

  const fields: Field[] = [
    { name: "organization", label: "Organisation", type: "text", required: true },
    { name: "position", label: "Poste", type: "text", required: true },
    { name: "url", label: "Site web", type: "url" },
    { name: "startDate", label: "Date de début", type: "date", required: true },
    { name: "endDate", label: "Date de fin", type: "date" },
    { name: "summary", label: "Résumé", type: "textarea" },
  ];

  const handleSubmit = (data: Record<string, string>) => {
    if (editingIndex !== null) {
      updateVolunteer(editingIndex, convertData(data));
    } else {
      addVolunteer(convertData(data));
    }
    setEditingIndex(null);
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Bénévolat</h1>
      <EditableList
        items={volunteer}
        onAdd={() => setEditingIndex(volunteer.length)}
        onEdit={(index) => setEditingIndex(index)}
        onDelete={removeVolunteer}
        renderItem={(item, index) => (
          <div key={index}>
            <h3 className="font-semibold">{item.organization}</h3>
            <p>{item.position}</p>
          </div>
        )}
      />
      {editingIndex !== null && (
        <FormSection
          fields={fields}
          initialData={{
            organization: volunteer[editingIndex]?.organization || "",
            position: volunteer[editingIndex]?.position || "",
            url: volunteer[editingIndex]?.url || "",
            startDate: volunteer[editingIndex]?.startDate || "",
            endDate: volunteer[editingIndex]?.endDate || "",
            summary: volunteer[editingIndex]?.summary || "",
            highlights: volunteer[editingIndex]?.highlights?.join(", ") || "",
          }}
          onSubmit={handleSubmit}
          onCancel={() => setEditingIndex(null)}
        />
      )}
    </div>
  );
}
