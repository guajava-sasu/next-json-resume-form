// src/app/volunteer/page.tsx
"use client";

import { useState } from "react";
import { useResumeStore } from "@/lib/store";
import FormSection from "@/components/FormSection";
import EditableList from "@/components/EditableList";

export default function VolunteerPage() {
  const { volunteer, addVolunteer, updateVolunteer, removeVolunteer } = useResumeStore();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const fields = [
    { name: "organization", label: "Organisation", type: "text", required: true },
    { name: "position", label: "Poste", type: "text", required: true },
    { name: "url", label: "Site web", type: "url" },
    { name: "startDate", label: "Date de début", type: "date", required: true },
    { name: "endDate", label: "Date de fin", type: "date" },
    { name: "summary", label: "Résumé", type: "textarea" },
  ];

  const handleSubmit = (data: Record<string, string>) => {
    const volunteerData = {
      ...data,
      highlights: data.highlights?.split(",").map((h) => h.trim()) || [],
    };
    if (editingIndex !== null) {
      updateVolunteer(editingIndex, volunteerData as any);
    } else {
      addVolunteer(volunteerData as any);
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
          <div>
            <h3 className="font-semibold">{item.organization}</h3>
            <p>{item.position}</p>
          </div>
        )}
      />
      {editingIndex !== null && (
        <FormSection
          fields={fields}
          initialData={volunteer[editingIndex] || {}}
          onSubmit={handleSubmit}
          onCancel={() => setEditingIndex(null)}
        />
      )}
    </div>
  );
}
