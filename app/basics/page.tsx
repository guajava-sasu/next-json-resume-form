"use client";

import { useState } from "react";
import FormSection from "../components/FormSection";
import ImageUploader from "../components/ImageUploader";
import { useCVStore } from "../lib/store"; // À créer (voir plus bas)
//import { Basics } from "../lib/definitions";

interface Location {
  address: string;
  postalCode: string;
  city: string;
  countryCode: string;
  region: string;
}

interface Basics {
  name: string;
  label: string;
  image: string;
  email: string;
  phone: string;
  url: string;
  summary: string;
  location: Location;
  // profiles: Profile[];
}

// Type for form data (only string fields)
type BasicsFormData = Omit<Basics, 'location'>;

// Then use BasicsFormData where you need Record<string, string>
interface Field {
  name: string;
  label: string;
  type: "text" | "date" | "textarea" | "email" | "tel" | "url";
  required?: boolean;
  placeholder?: string;
}


export default function BasicsPage() {
  // Exemple de données initiales (à remplacer par les données du store)
 const { basics, setBasics } = useCVStore();
  // const basics = resume.basics;
  // const setBasics = (newBasics: Basics) => setResume({ ...resume, basics: newBasics });
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Champs pour les informations de base
  const fields :Field[]= [
    { name: "name", label: "Nom complet", type: "text", required: true },
    { name: "label", label: "Titre professionnel", type: "text" },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Téléphone", type: "tel" },
    { name: "url", label: "Site web", type: "url" },
    { name: "summary", label: "Résumé", type: "textarea" },
  ];

  // Champs pour la localisation
  const locationFields:Field[] = [
    { name: "address", label: "Adresse", type: "text" },
    { name: "postalCode", label: "Code postal", type: "text" },
    { name: "city", label: "Ville", type: "text" },
    { name: "countryCode", label: "Pays (code)", type: "text" },
    { name: "region", label: "Région", type: "text" },
  ];

  // Gestion de la soumission du formulaire
  const handleSubmit = (data: Record<string, string>) => {
    setBasics({ ...basics, ...data });
    setIsEditing(false);
  };

  // Gestion du téléversement de l'image
  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setBasics({ ...basics, image: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Informations de base</h1>
          <p className="text-gray-600">Gérez vos informations personnelles et professionnelles</p>
        </div>

        {!isEditing ? (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-white">
              <div className="flex items-center space-x-6">
                {basics.image ? (
                  <img
                    src={basics.image}
                    alt="Photo de profil"
                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-white/20 flex items-center justify-center">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
                <div>
                  <h2 className="text-3xl font-bold">{basics.name || "Nom non défini"}</h2>
                  <p className="text-blue-100 text-lg mt-1">{basics.label || "Titre professionnel"}</p>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact
                  </h3>
                  <div className="space-y-3 pl-7">
                    <div className="flex items-start">
                      <span className="text-sm font-medium text-gray-500 w-24">Email</span>
                      <span className="text-sm text-gray-800">{basics.email || "—"}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-sm font-medium text-gray-500 w-24">Téléphone</span>
                      <span className="text-sm text-gray-800">{basics.phone || "—"}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-sm font-medium text-gray-500 w-24">Site web</span>
                      <a href={basics.url} className="text-sm text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                        {basics.url || "—"}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Localisation
                  </h3>
                  <div className="space-y-3 pl-7">
                    <div className="flex items-start">
                      <span className="text-sm font-medium text-gray-500 w-24">Adresse</span>
                      <span className="text-sm text-gray-800">{basics.location?.address || "—"}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-sm font-medium text-gray-500 w-24">Ville</span>
                      <span className="text-sm text-gray-800">{basics.location?.city || "—"}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-sm font-medium text-gray-500 w-24">Pays</span>
                      <span className="text-sm text-gray-800">{basics.location?.countryCode || "—"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {basics.summary && (
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                    Résumé
                  </h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line pl-7">{basics.summary}</p>
                </div>
              )}

              <div className="pt-6 flex justify-end">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Modifier</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Édition des informations</h2>
              <p className="text-gray-600">Modifiez vos informations personnelles</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
              <ImageUploader
                name="image"
                label="Photo de profil"
                value={basics.image || ""}
                onChange={handleImageUpload}
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Informations personnelles</h3>
              <FormSection
                fields={fields}
                initialData={{
                  name: basics.name,
                  label: basics.label,
                  email: basics.email,
                  phone: basics.phone,
                  url: basics.url,
                  summary: basics.summary,
                }}
                onSubmit={handleSubmit}
                onCancel={() => setIsEditing(false)}
              />
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Localisation
              </h3>
              <FormSection
                fields={locationFields}
                initialData={{
                  address: basics.location?.address || "",
                  postalCode: basics.location?.postalCode || "",
                  city: basics.location?.city || "",
                  countryCode: basics.location?.countryCode || "",
                  region: basics.location?.region || "",
                }}
                onSubmit={(data) => {
                  setBasics({ ...basics, location: data as any });
                  setIsEditing(false);
                }}
                onCancel={() => setIsEditing(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
