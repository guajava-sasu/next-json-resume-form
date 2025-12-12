// src/app/education/page.tsx
"use client";

import { useState } from "react";
import { useCVStore } from "../lib/store";
import FormSection from "../components/FormSection";
import EditableList from "../components/EditableList";
import TagInput from "../components/TagInput";
import { Education, Field } from "../lib/definitions";

export default function EducationPage() {
  const { education, addEducation, updateEducation, removeEducation } = useCVStore();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [courses, setCourses] = useState<string[]>([]);


  const convertData = (data: Record<string, string>) => {
    return {
      institution: data.institution || "",
      area: data.area || "",
      studyType: data.studyType || "",
      startDate: data.startDate || "",
      endDate: data.endDate || "",
      score: data.score || "",
    } as Education;
  }

  const fields: Field[] = [
    { name: "institution", label: "Établissement", type: "text", required: true },
    { name: "area", label: "Domaine d'étude", type: "text", required: true },
    { name: "studyType", label: "Type de diplôme", type: "text", required: true },
    { name: "startDate", label: "Date de début", type: "date", required: true },
    { name: "endDate", label: "Date de fin", type: "date" },
    { name: "score", label: "Note/Moyenne", type: "text" },
  ];

  const handleSubmit = (data: Record<string, string>) => {

    if (editingIndex !== null) {
      updateEducation(editingIndex, convertData(data));
    } else {
      addEducation(convertData(data));
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
          <div key={index}>
            <h3 className="font-semibold">{item.institution}</h3>
            <p>{item.area} ({item.studyType})</p>
          </div>
        )}
      />
      {editingIndex !== null && (
        <div className="space-y-4">
          <FormSection
            fields={fields}
            initialData={
              {
                institution: education[editingIndex]?.institution || "",
                area: education[editingIndex]?.area || "",
                studyType: education[editingIndex]?.studyType || "",
                startDate: education[editingIndex]?.startDate || "",
                endDate: education[editingIndex]?.endDate || "",
                score: education[editingIndex]?.score || "",

              }}
            onSubmit={handleSubmit}
            onCancel={() => {
              setEditingIndex(null);
              setCourses([]);
            }}
          />
          <TagInput
            label="Cours"
            tags={courses}
            onChange={setCourses}
            placeholder="Ajoutez des cours..."
          />
        </div>
      )}
    </div>
  );
}
