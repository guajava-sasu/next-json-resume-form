// src/app/skills/page.tsx
"use client";

import { useState } from "react";
import { useCVStore } from "../lib/store";
import EditableList from "../components/EditableList";
import TagInput from "../components/TagInput";
import FormSection from "../components/FormSection";
import { Field, Skill } from "../lib/definitions";

export default function SkillsPage() {
  const { skills, addSkill, updateSkill, removeSkill } = useCVStore();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [keywords, setKeywords] = useState<string[]>([]);

  const handleSubmit = () => {
    if (editingIndex !== null) {
      updateSkill(editingIndex, {
        name: skills[editingIndex].name,
        level: skills[editingIndex].level,
        keywords,
      });
    } else {
      addSkill({
        name: "",
        level: "Débutant",
        keywords,
      });
    }
    setEditingIndex(null);
    setKeywords([]);
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Compétences</h1>
      <EditableList
        items={skills}
        onAdd={() => {
          setEditingIndex(skills.length);
          setKeywords([]);
        }}
        onEdit={(index) => {
          setEditingIndex(index);
          setKeywords(skills[index].keywords || []);
        }}
        onDelete={removeSkill}
        renderItem={(item, index) => (
          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p>Niveau: {item.level}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {item.keywords?.map((keyword) => (
                <span key={keyword} className="px-2 py-1 bg-gray-200 rounded">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}
      />
      {editingIndex !== null && (
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Nom de la compétence</label>
            <input
              type="text"
              value={skills[editingIndex]?.name || ""}
              onChange={(e) => {
                const newSkills = [...skills];
                newSkills[editingIndex] = {
                  ...newSkills[editingIndex],
                  name: e.target.value,
                };
                updateSkill(editingIndex, newSkills[editingIndex]);
              }}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Niveau</label>
            <select
              value={skills[editingIndex]?.level || "Débutant"}
              onChange={(e) => {
                const newSkills = [...skills];
                newSkills[editingIndex] = {
                  ...newSkills[editingIndex],
                  level: e.target.value,
                };
                updateSkill(editingIndex, newSkills[editingIndex]);
              }}
              className="w-full p-2 border rounded"
            >
              <option>Débutant</option>
              <option>Intermédiaire</option>
              <option>Avancé</option>
              <option>Expert</option>
            </select>
          </div>
          <TagInput
            label="Mots-clés"
            tags={keywords}
            onChange={setKeywords}
            placeholder="Ajoutez des mots-clés..."
          />
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Enregistrer
          </button>
        </div>
      )}
    </div>
  );
}
