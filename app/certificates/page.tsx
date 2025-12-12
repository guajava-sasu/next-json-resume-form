"use client";

import { useState } from "react";
import { useCVStore } from "../lib/store";
import FormSection from "../components/FormSection";
import EditableList from "../components/EditableList";
import { Field, Certificate } from "../lib/definitions";

export default function CertificatesPage() {
  const { certificates, addCertificate, updateCertificate, removeCertificate } = useCVStore();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const convertData = (data: Record<string, string>) => {
    return {
      name: data.name || "",
      date: data.date || "",
      issuer: data.issuer || "",
      url: data.url || "",
    } as Certificate;
  }

  const fields: Field[] = [
    { name: "name", label: "Nom du certificat", type: "text", required: true },
    { name: "date", label: "Date d'obtention", type: "date", required: true },
    { name: "issuer", label: "Organisme délivrant", type: "text", required: true },
    { name: "url", label: "URL du certificat", type: "url" },
  ];

  const handleSubmit = (data: Record<string, string>) => {
    if (editingIndex !== null) {
      updateCertificate(editingIndex, convertData(data));
    } else {
      addCertificate(convertData(data));
    }
    setEditingIndex(null);
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Certifications</h1>
      <EditableList
        items={certificates}
        onAdd={() => setEditingIndex(certificates.length)}
        onEdit={(index) => setEditingIndex(index)}
        onDelete={removeCertificate}
        renderItem={(item, index) => (

  <div key={index}> 
                         <h3 className="font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.issuer} - {item.date}</p>
            {item.url && <a href={item.url} className="text-sm text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Voir le certificat</a>}
          </div>
        )}
      />
      {editingIndex !== null && (
        <FormSection
          fields={fields}
          initialData={{
            name: certificates[editingIndex]?.name || "",
            date: certificates[editingIndex]?.date || "",
            issuer: certificates[editingIndex]?.issuer || "",
            url: certificates[editingIndex]?.url || "",
          }}
          onSubmit={handleSubmit}
          onCancel={() => setEditingIndex(null)}
        />
      )}
    </div>
  );
}
