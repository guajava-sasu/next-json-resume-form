"use client";

import { useState } from "react";
import { useCVStore } from "../lib/store";
import FormSection from "../components/FormSection";
import EditableList from "../components/EditableList";
import TagInput from "../components/TagInput";
import { Field, Interest } from "../lib/definitions";

export default function InterestsPage() {
  const { interests, addInterest, updateInterest, removeInterest } = useCVStore();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [keywords, setKeywords] = useState<string[]>([]);

  const convertData = (data: Record<string, string>) => {
    return {
      name: data.name || "",
      keywords: keywords,
    } as Interest;
  }

  const fields: Field[] = [
    { name: "name", label: "Centre d'intérêt", type: "text", required: true },
  ];

  const handleSubmit = (data: Record<string, string>) => {
    if (editingIndex !== null) {
      updateInterest(editingIndex, convertData(data));
    } else {
      addInterest(convertData(data));
    }
    setEditingIndex(null);
    setKeywords([]);
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Centres d&apos;intérêt</h1>
      <EditableList
        items={interests}
        onAdd={() => {
          setEditingIndex(interests.length);
          setKeywords([]);
        }}
        onEdit={(index) => {
          setEditingIndex(index);
          setKeywords(interests[index].keywords || []);
        }}
        onDelete={removeInterest}
        renderItem={(item, index) => (
          <div>
            <h3 className="font-semibold">{item.name}</h3>
            {item.keywords && item.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {item.keywords.map((keyword, i) => (
                  <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {keyword}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      />
      {editingIndex !== null && (
        <div className="mt-6 p-4 border rounded-lg">
          <FormSection
            fields={fields}
            initialData={{
              name: interests[editingIndex]?.name || "",
            }}
            onSubmit={handleSubmit}
            onCancel={() => {
              setEditingIndex(null);
              setKeywords([]);
            }}
          />
          <div className="mt-4">
            <TagInput
              label="Mots-clés"
              tags={keywords}
              onChange={setKeywords}
              placeholder="Ajoutez des mots-clés..."
            />
          </div>
        </div>
      )}
    </div>
  );
}
