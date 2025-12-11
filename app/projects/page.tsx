// src/app/projects/page.tsx
"use client";

import { useState } from "react";
import { useResumeStore } from "../lib/store";
import FormSection from "../components/FormSection";
import EditableList from "../components/EditableList";
import TagInput from "../components/TagInput";

export default function ProjectsPage() {
  const { projects, addProject, updateProject, removeProject } = useResumeStore();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [highlights, setHighlights] = useState<string[]>([]);

  const fields = [
    { name: "name", label: "Nom du projet", type: "text", required: true },
    { name: "startDate", label: "Date de début", type: "date" },
    { name: "endDate", label: "Date de fin", type: "date" },
    { name: "url", label: "URL", type: "url" },
    { name: "description", label: "Description", type: "textarea" },
  ];

  const handleSubmit = (data: Record<string, string>) => {
    const projectData = {
      ...data,
      highlights,
    };
    if (editingIndex !== null) {
      updateProject(editingIndex, projectData as any);
    } else {
      addProject(projectData as any);
    }
    setEditingIndex(null);
    setHighlights([]);
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Projets</h1>
      <EditableList
        items={projects}
        onAdd={() => {
          setEditingIndex(projects.length);
          setHighlights([]);
        }}
        onEdit={(index) => {
          setEditingIndex(index);
          setHighlights(projects[index].highlights || []);
        }}
        onDelete={removeProject}
        renderItem={(item, index) => (
          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p>{item.description}</p>
          </div>
        )}
      />
      {editingIndex !== null && (
        <div className="space-y-4">
          <FormSection
            fields={fields}
            initialData={projects[editingIndex] || {}}
            onSubmit={handleSubmit}
            onCancel={() => {
              setEditingIndex(null);
              setHighlights([]);
            }}
          />
          <TagInput
            name="highlights"
            label="Points forts"
            value={highlights}
            onChange={setHighlights}
          />
        </div>
      )}
    </div>
  );
}
