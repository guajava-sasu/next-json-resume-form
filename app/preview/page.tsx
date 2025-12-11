// src/app/preview/page.tsx
"use client";

import { useResumeStore } from "../lib/store";

export default function PreviewPage() {
  const { resume } = useResumeStore();

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow">
      <div className="text-center mb-6">
        {resume.basics.image && (
          <img
            src={resume.basics.image}
            alt="Photo de profil"
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
        )}
        <h1 className="text-2xl font-bold">{resume.basics.name}</h1>
        <p className="text-lg text-gray-600">{resume.basics.label}</p>
        <div className="mt-2 text-sm text-gray-500">
          <p>{resume.basics.email}</p>
          <p>{resume.basics.phone}</p>
          <p>{resume.basics.location.city}</p>
        </div>
      </div>

      <div className="prose">
        <h2>Résumé</h2>
        <p>{resume.basics.summary}</p>

        {resume.work.length > 0 && (
          <div>
            <h2>Expérience Professionnelle</h2>
            {resume.work.map((item, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold">{item.position}</h3>
                <p>
                  {item.name} | {item.startDate} - {item.endDate || "Présent"}
                </p>
                <p>{item.summary}</p>
              </div>
            ))}
          </div>
        )}

        {resume.education.length > 0 && (
          <div>
            <h2>Formation</h2>
            {resume.education.map((item, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold">{item.area}</h3>
                <p>
                  {item.institution} | {item.startDate} - {item.endDate || "Présent"}
                </p>
              </div>
            ))}
          </div>
        )}

        {resume.skills.length > 0 && (
          <div>
            <h2>Compétences</h2>
            <ul>
              {resume.skills.map((item, index) => (
                <li key={index}>
                  <strong>{item.name}</strong> (Niveau: {item.level})
                  <ul>
                    {item.keywords?.map((keyword, i) => (
                      <li key={i}>{keyword}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
