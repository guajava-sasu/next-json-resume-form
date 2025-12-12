// src/app/projects/page.tsx
"use client";

import { useState } from "react";
import { useCVStore } from "../lib/store";
import FormSection from "../components/FormSection";
import EditableList from "../components/EditableList";
import TagInput from "../components/TagInput";
import { Field, Project } from "../lib/definitions";

export default function ProjectsPage() {
  const { projects, addProject, updateProject, removeProject } = useCVStore();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [highlights, setHighlights] = useState<string[]>([]);

  const convertData = (data: Record<string, string>) => {
    return {
      name: data.name || "",
      startDate: data.startDate || "",
      endDate: data.endDate || "",
      url: data.url || "",
      description: data.description || "",
      highlights: highlights,
    } as Project;
  }

  const fields: Field[] = [
    { name: "name", label: "Nom du projet", type: "text", required: true },
    { name: "startDate", label: "Date de début", type: "date" },
    { name: "endDate", label: "Date de fin", type: "date" },
    { name: "url", label: "URL", type: "url" },
    { name: "description", label: "Description", type: "textarea" },
  ];

  const handleSubmit = (data: Record<string, string>) => {
    if (editingIndex !== null) {
      updateProject(editingIndex, convertData(data));
    } else {
      addProject(convertData(data));
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
        <div className="mt-6 p-4 border rounded-lg space-y-4">
          <FormSection
            fields={fields}
            initialData={{
              name: projects[editingIndex]?.name || "",
              startDate: projects[editingIndex]?.startDate || "",
              endDate: projects[editingIndex]?.endDate || "",
              url: projects[editingIndex]?.url || "",
              description: projects[editingIndex]?.description || "",
            }}
            onSubmit={handleSubmit}
            onCancel={() => {
              setEditingIndex(null);
              setHighlights([]);
            }}
          />
          <div className="mt-4">
            <TagInput
              label="Points forts"
              tags={highlights}
              onChange={setHighlights}
              placeholder="Ajoutez des points forts..."
            />
          </div>
        </div>
      )}
    </div>
  );
}
