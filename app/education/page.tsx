// src/app/education/page.tsx
"use client";

import { useState } from "react";
import { useResumeStore } from "@/lib/store";
import FormSection from "@/components/FormSection";
import EditableList from "@/components/EditableList";
import TagInput from "@/components/TagInput";

export default function EducationPage() {
  const { education, addEducation, updateEducation, removeEducation } = useResumeStore();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [courses, setCourses] = useState<string[]>([]);

  const fields = [
    { name: "institution", label: "Établissement", type: "text", required: true },
    { name: "area", label: "Domaine d'étude", type: "text", required: true },
    { name: "studyType", label: "Type de diplôme", type: "text", required: true },
    { name: "startDate", label: "Date de début", type: "date", required: true },
    { name: "endDate", label: "Date de fin", type: "date" },
    { name: "score", label: "Note/Moyenne", type: "text" },
  ];

  const handleSubmit = (data: Record<string, string>) => {
    const educationData = {
      ...data,
      courses,
    };
    if (editingIndex !== null) {
      updateEducation(editingIndex, educationData as any);
    } else {
      addEducation(educationData as any);
    }
    setEditingIndex(null);
    setCourses([]);
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Formation</h1>
      <EditableList
        items={education}
        onAdd={() => {
          setEditingIndex(education.length);
          setCourses([]);
        }}
        onEdit={(index) => {
          setEditingIndex(index);
          setCourses(education[index].courses || []);
        }}
        onDelete={removeEducation}
        renderItem={(item, index) => (
          <div>
            <h3 className="font-semibold">{item.institution}</h3>
            <p>{item.area} ({item.studyType})</p>
          </div>
        )}
      />
      {editingIndex !== null && (
        <div className="space-y-4">
          <FormSection
            fields={fields}
            initialData={education[editingIndex] || {}}
            onSubmit={handleSubmit}
            onCancel={() => {
              setEditingIndex(null);
              setCourses([]);
            }}
          />
          <TagInput
            name="courses"
            label="Cours suivis"
            value={courses}
            onChange={setCourses}
          />
        </div>
      )}
    </div>
  );
}
