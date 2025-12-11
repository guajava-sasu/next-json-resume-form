// src/app/export/page.tsx
"use client";

import { useResumeStore } from "../lib/store";

export default function ExportPage() {
  const { resume } = useResumeStore();

  const handleExport = () => {
    const json = JSON.stringify(resume, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cv.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Exporter le CV</h1>
      <button
        onClick={handleExport}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Télécharger le CV (JSON)
      </button>
      <div className="mt-6">
        <h2 className="mb-2">Aperçu du JSON :</h2>
        <pre className="p-4 bg-gray-100 rounded">{JSON.stringify(resume, null, 2)}</pre>
      </div>
    </div>
  );
}
