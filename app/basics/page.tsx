"use client";

import { useState } from "react";
import FormSection from "../components/FormSection";
import ImageUploader from "../components/ImageUploader";
import { useResumeStore } from "../lib/store"; // À créer (voir plus bas)
import { Basics } from "../lib/definitions";

export default function BasicsPage() {
  // Exemple de données initiales (à remplacer par les données du store)
  const { resume, setResume } = useResumeStore();
  const basics = resume.basics;
  const setBasics = (newBasics: Basics) => setResume({ ...resume, basics: newBasics });
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Champs pour les informations de base
  const fields = [
    { name: "name", label: "Nom complet", type: "text", required: true },
    { name: "label", label: "Titre professionnel", type: "text" },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Téléphone", type: "tel" },
    { name: "url", label: "Site web", type: "url" },
    { name: "summary", label: "Résumé", type: "textarea" },
  ];

  // Champs pour la localisation
  const locationFields = [
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
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Informations de base</h1>

      {!isEditing ? (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            {basics.image && (
              <img
                src={basics.image}
                alt="Photo de profil"
                className="w-24 h-24 rounded-full"
              />
            )}
            <div>
              <h2 className="text-xl font-semibold">{basics.name}</h2>
              <p className="text-gray-600">{basics.label}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><strong>Email :</strong> {basics.email}</p>
              <p><strong>Téléphone :</strong> {basics.phone}</p>
              <p><strong>Site web :</strong> {basics.url}</p>
            </div>
            <div>
              <p><strong>Adresse :</strong> {basics.location?.address}</p>
              <p><strong>Ville :</strong> {basics.location?.city}</p>
              <p><strong>Pays :</strong> {basics.location?.countryCode}</p>
            </div>
          </div>

          <div className="mt-4">
            <p><strong>Résumé :</strong></p>
            <p className="whitespace-pre-line">{basics.summary}</p>
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Modifier
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <ImageUploader
            name="image"
            label="Photo de profil"
            value={basics.image || ""}
            onChange={handleImageUpload}
          />

          <FormSection
            fields={fields}
            initialData={basics}
            onSubmit={handleSubmit}
            onCancel={() => setIsEditing(false)}
          />

          <div className="p-4 border rounded-lg">
            <h3 className="mb-2 text-lg font-semibold">Localisation</h3>
            <FormSection
              fields={locationFields}
              initialData={basics.location || {}}
              onSubmit={(data) => {
                setBasics({ ...basics, location: data });
              }}
              onCancel={() => setIsEditing(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
