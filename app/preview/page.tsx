// src/app/preview/page.tsx
"use client";

import { useCVStore } from "../lib/store"; 
import { Resume } from "../lib/definitions";

export default function PreviewPage() {
  const { resume } = useCVStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Aperçu du CV</h1>
          <p className="text-gray-600">Visualisez votre CV avant d&apos;exporter</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-10 text-white">
            <div className="flex flex-col items-center text-center space-y-4">
              {resume.basics.image ? (
                <img
                  src={resume.basics.image}
                  alt="Photo de profil"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
                />
              ) : (
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl bg-white/20 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
              <div>
                <h1 className="text-4xl font-bold mb-2">{resume.basics.name || "Nom"}</h1>
                <p className="text-xl text-blue-100">{resume.basics.label || "Titre professionnel"}</p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                {resume.basics.email && (
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{resume.basics.email}</span>
                  </div>
                )}
                {resume.basics.phone && (
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{resume.basics.phone}</span>
                  </div>
                )}
                {resume.basics.location?.city && (
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{resume.basics.location.city}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Summary */}
            {resume.basics.summary && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                  Résumé
                </h2>
                <p className="text-gray-700 leading-relaxed">{resume.basics.summary}</p>
              </section>
            )}

            {/* Work Experience */}
            {resume.work.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Expérience Professionnelle
                </h2>
                <div className="space-y-6">
                  {resume.work.map((item, index) => (
                    <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-5 border-l-4 border-blue-500">
                      <h3 className="text-xl font-semibold text-gray-800">{item.position}</h3>
                      <div className="flex items-center space-x-2 text-gray-600 mt-1 mb-3">
                        <span className="font-medium">{item.name}</span>
                        <span>•</span>
                        <span className="text-sm">{item.startDate} - {item.endDate || "Présent"}</span>
                      </div>
                      {item.summary && <p className="text-gray-700">{item.summary}</p>}
                      {item.highlights && item.highlights.length > 0 && (
                        <ul className="mt-3 space-y-1">
                          {item.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start text-sm text-gray-700">
                              <span className="mr-2 text-blue-500">▸</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {resume.education.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                  Formation
                </h2>
                <div className="space-y-4">
                  {resume.education.map((item, index) => (
                    <div key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-5 border-l-4 border-green-500">
                      <h3 className="text-xl font-semibold text-gray-800">{item.area}</h3>
                      <p className="text-gray-600 font-medium">{item.studyType}</p>
                      <div className="flex items-center space-x-2 text-gray-600 text-sm mt-1">
                        <span>{item.institution}</span>
                        <span>•</span>
                        <span>{item.startDate} - {item.endDate || "Présent"}</span>
                      </div>
                      {item.score && <p className="text-sm text-gray-600 mt-2">Note: {item.score}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills */}
            {resume.skills.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  Compétences
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resume.skills.map((item, index) => (
                    <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border-l-4 border-purple-500">
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {item.name}
                        {item.level && <span className="ml-2 text-sm text-purple-600">({item.level})</span>}
                      </h3>
                      {item.keywords && item.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {item.keywords.map((keyword, i) => (
                            <span key={i} className="px-2 py-1 bg-white text-purple-700 text-xs rounded-full border border-purple-200">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {resume.languages.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  Langues
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {resume.languages.map((item, index) => (
                    <div key={index} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 text-center border-l-4 border-amber-500">
                      <p className="font-semibold text-gray-800">{item.language}</p>
                      <p className="text-sm text-gray-600">{item.fluency}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
