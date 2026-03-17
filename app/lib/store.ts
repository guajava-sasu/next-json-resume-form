// src/lib/store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Resume, Work, Volunteer, Education, Award, Certificate, Publication, Skill, Language, Interest, Reference, Project } from './types';

interface Location {
  address?: string;
  postalCode?: string;
  city?: string;
  countryCode?: string;
  region?: string;
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
}

interface CVState {
  sharedBackendData: unknown;
  setSharedBackendData: (data: unknown) => void;
  hydrateFromBackendData: (data: unknown) => void;
  resume: Resume;
  basics: Basics;
  setBasics: (basics: Basics) => void;
  work: Work[];
  setWork: (work: Work[]) => void;
  addWork: (work: Work) => void;
  updateWork: (index: number, work: Work) => void;
  removeWork: (index: number) => void;
  volunteer: Volunteer[];
  addVolunteer: (volunteer: Volunteer) => void;
  updateVolunteer: (index: number, volunteer: Volunteer) => void;
  removeVolunteer: (index: number) => void;
  education: Education[];
  addEducation: (education: Education) => void;
  updateEducation: (index: number, education: Education) => void;
  removeEducation: (index: number) => void;
  awards: Award[];
  addAward: (award: Award) => void;
  updateAward: (index: number, award: Award) => void;
  removeAward: (index: number) => void;
  certificates: Certificate[];
  addCertificate: (certificate: Certificate) => void;
  updateCertificate: (index: number, certificate: Certificate) => void;
  removeCertificate: (index: number) => void;
  publications: Publication[];
  addPublication: (publication: Publication) => void;
  updatePublication: (index: number, publication: Publication) => void;
  removePublication: (index: number) => void;
  skills: Skill[];
  addSkill: (skill: Skill) => void;
  updateSkill: (index: number, skill: Skill) => void;
  removeSkill: (index: number) => void;
  languages: Language[];
  addLanguage: (language: Language) => void;
  updateLanguage: (index: number, language: Language) => void;
  removeLanguage: (index: number) => void;
  interests: Interest[];
  addInterest: (interest: Interest) => void;
  updateInterest: (index: number, interest: Interest) => void;
  removeInterest: (index: number) => void;
  references: Reference[];
  addReference: (reference: Reference) => void;
  updateReference: (index: number, reference: Reference) => void;
  removeReference: (index: number) => void;
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (index: number, project: Project) => void;
  removeProject: (index: number) => void;
}

const defaultBasics: Basics = {
  name: "",
  label: "",
  image: "",
  email: "",
  phone: "",
  url: "",
  summary: "",
  location: {},
};
const initialResume: Resume = {
  basics: {
    name: '',
    label: '',
    image: '',
    email: '',
    phone: '',
    url: '',
    summary: '',
    location: {
      address: '',
      postalCode: '',
      city: '',
      countryCode: '',
      region: '',
    },
    profiles: [],
  },
  work: [],
  volunteer: [],
  education: [],
  awards: [],
  certificates: [],
  publications: [],
  skills: [],
  languages: [],
  interests: [],
  references: [],
  projects: [],
};


export const useCVStore = create<CVState>()(
  persist(
    (set) => ({
      sharedBackendData: null,
      setSharedBackendData: (data) => set({ sharedBackendData: data }),
      hydrateFromBackendData: (data) =>
        set((state) => {
          const source = (data ?? {}) as Record<string, unknown>;
          const payload = (source.resume as Record<string, unknown> | undefined) ?? source;
          const payloadBasics =
            (payload.basics as Record<string, unknown> | undefined) ??
            (payload.profile as Record<string, unknown> | undefined) ??
            {};
          const payloadLocation =
            (payloadBasics.location as Record<string, unknown> | undefined) ?? {};

          const nextBasics: Basics = {
            ...state.basics,
            name: String(payloadBasics.name ?? payloadBasics.fullName ?? state.basics.name ?? ""),
            label: String(payloadBasics.label ?? state.basics.label ?? ""),
            image: String(payloadBasics.image ?? state.basics.image ?? ""),
            email: String(payloadBasics.email ?? payloadBasics.mail ?? state.basics.email ?? ""),
            phone: String(payloadBasics.phone ?? payloadBasics.phoneNumber ?? state.basics.phone ?? ""),
            url: String(payloadBasics.url ?? state.basics.url ?? ""),
            summary: String(payloadBasics.summary ?? state.basics.summary ?? ""),
            location: {
              address: String(payloadLocation.address ?? state.basics.location.address ?? ""),
              postalCode: String(payloadLocation.postalCode ?? state.basics.location.postalCode ?? ""),
              city: String(payloadLocation.city ?? state.basics.location.city ?? ""),
              countryCode: String(payloadLocation.countryCode ?? state.basics.location.countryCode ?? ""),
              region: String(payloadLocation.region ?? state.basics.location.region ?? ""),
            },
          };

          const nextWork = Array.isArray(payload.work) ? (payload.work as Work[]) : state.work;
          const nextVolunteer = Array.isArray(payload.volunteer)
            ? (payload.volunteer as Volunteer[])
            : state.volunteer;
          const nextEducation = Array.isArray(payload.education)
            ? (payload.education as Education[])
            : state.education;
          const nextAwards = Array.isArray(payload.awards) ? (payload.awards as Award[]) : state.awards;
          const nextCertificates = Array.isArray(payload.certificates)
            ? (payload.certificates as Certificate[])
            : state.certificates;
          const nextPublications = Array.isArray(payload.publications)
            ? (payload.publications as Publication[])
            : state.publications;
          const nextSkills = Array.isArray(payload.skills) ? (payload.skills as Skill[]) : state.skills;
          const nextLanguages = Array.isArray(payload.languages)
            ? (payload.languages as Language[])
            : state.languages;
          const nextInterests = Array.isArray(payload.interests)
            ? (payload.interests as Interest[])
            : state.interests;
          const nextReferences = Array.isArray(payload.references)
            ? (payload.references as Reference[])
            : state.references;
          const nextProjects = Array.isArray(payload.projects)
            ? (payload.projects as Project[])
            : state.projects;

          return {
            sharedBackendData: data,
            basics: nextBasics,
            work: nextWork,
            volunteer: nextVolunteer,
            education: nextEducation,
            awards: nextAwards,
            certificates: nextCertificates,
            publications: nextPublications,
            skills: nextSkills,
            languages: nextLanguages,
            interests: nextInterests,
            references: nextReferences,
            projects: nextProjects,
            resume: {
              ...state.resume,
              basics: nextBasics,
              work: nextWork,
              volunteer: nextVolunteer,
              education: nextEducation,
              awards: nextAwards,
              certificates: nextCertificates,
              publications: nextPublications,
              skills: nextSkills,
              languages: nextLanguages,
              interests: nextInterests,
              references: nextReferences,
              projects: nextProjects,
            },
          };
        }),
      resume: initialResume,
      basics: defaultBasics,
      work: [],
      setBasics: (basics) => set({ basics }),
      setWork: (work: Work[]) => set((state) => ({ resume: { ...state.resume, work } })),
      addWork: (work: Work) => set((state) => ({ resume: { ...state.resume, work: [...state.resume.work, work] } })),
      updateWork: (index: number, work: Work) => set((state) => ({ resume: { ...state.resume, work: state.resume.work.map((w, i) => i === index ? work : w) } })),
      removeWork: (index: number) => set((state) => ({ resume: { ...state.resume, work: state.resume.work.filter((_, i) => i !== index) } })),

      volunteer: [],
      addVolunteer: (volunteer: Volunteer) => set((state) => ({ resume: { ...state.resume, volunteer: [...state.resume.volunteer, volunteer] } })),
      updateVolunteer: (index: number, volunteer: Volunteer) => set((state) => ({ resume: { ...state.resume, volunteer: state.resume.volunteer.map((v, i) => i === index ? volunteer : v) } })),
      removeVolunteer: (index: number) => set((state) => ({ resume: { ...state.resume, volunteer: state.resume.volunteer.filter((_, i) => i !== index) } })),

      education: [],
      addEducation: (education: Education) => set((state) => ({ resume: { ...state.resume, education: [...state.resume.education, education] } })),
      updateEducation: (index: number, education: Education) => set((state) => ({ resume: { ...state.resume, education: state.resume.education.map((e, i) => i === index ? education : e) } })),
      removeEducation: (index: number) => set((state) => ({ resume: { ...state.resume, education: state.resume.education.filter((_, i) => i !== index) } })),

      awards: [],
      addAward: (award: Award) => set((state) => ({ resume: { ...state.resume, awards: [...state.resume.awards, award] } })),
      updateAward: (index: number, award: Award) => set((state) => ({ resume: { ...state.resume, awards: state.resume.awards.map((a, i) => i === index ? award : a) } })),
      removeAward: (index: number) => set((state) => ({ resume: { ...state.resume, awards: state.resume.awards.filter((_, i) => i !== index) } })),

      certificates: [],
      addCertificate: (certificate: Certificate) => set((state) => ({ resume: { ...state.resume, certificates: [...state.resume.certificates, certificate] } })),
      updateCertificate: (index: number, certificate: Certificate) => set((state) => ({ resume: { ...state.resume, certificates: state.resume.certificates.map((c, i) => i === index ? certificate : c) } })),
      removeCertificate: (index: number) => set((state) => ({ resume: { ...state.resume, certificates: state.resume.certificates.filter((_, i) => i !== index) } })),

      publications: [],
      addPublication: (publication: Publication) => set((state) => ({ resume: { ...state.resume, publications: [...state.resume.publications, publication] } })),
      updatePublication: (index: number, publication: Publication) => set((state) => ({ resume: { ...state.resume, publications: state.resume.publications.map((p, i) => i === index ? publication : p) } })),
      removePublication: (index: number) => set((state) => ({ resume: { ...state.resume, publications: state.resume.publications.filter((_, i) => i !== index) } })),

      skills: [],
      addSkill: (skill: Skill) => set((state) => ({ resume: { ...state.resume, skills: [...state.resume.skills, skill] } })),
      updateSkill: (index: number, skill: Skill) => set((state) => ({ resume: { ...state.resume, skills: state.resume.skills.map((s, i) => i === index ? skill : s) } })),
      removeSkill: (index: number) => set((state) => ({ resume: { ...state.resume, skills: state.resume.skills.filter((_, i) => i !== index) } })),

      languages: [],
      addLanguage: (language: Language) => set((state) => ({ resume: { ...state.resume, languages: [...state.resume.languages, language] } })),
      updateLanguage: (index: number, language: Language) => set((state) => ({ resume: { ...state.resume, languages: state.resume.languages.map((l, i) => i === index ? language : l) } })),
      removeLanguage: (index: number) => set((state) => ({ resume: { ...state.resume, languages: state.resume.languages.filter((_, i) => i !== index) } })),

      interests: [],
      addInterest: (interest: Interest) => set((state) => ({ resume: { ...state.resume, interests: [...state.resume.interests, interest] } })),
      updateInterest: (index: number, interest: Interest) => set((state) => ({ resume: { ...state.resume, interests: state.resume.interests.map((i, idx) => idx === index ? interest : i) } })),
      removeInterest: (index: number) => set((state) => ({ resume: { ...state.resume, interests: state.resume.interests.filter((_, i) => i !== index) } })),

      references: [],
      addReference: (reference: Reference) => set((state) => ({ resume: { ...state.resume, references: [...state.resume.references, reference] } })),
      updateReference: (index: number, reference: Reference) => set((state) => ({ resume: { ...state.resume, references: state.resume.references.map((r, i) => i === index ? reference : r) } })),
      removeReference: (index: number) => set((state) => ({ resume: { ...state.resume, references: state.resume.references.filter((_, i) => i !== index) } })),

      projects: [],
      addProject: (project: Project) => set((state) => ({ resume: { ...state.resume, projects: [...state.resume.projects, project] } })),
      updateProject: (index: number, project: Project) => set((state) => ({ resume: { ...state.resume, projects: state.resume.projects.map((p, i) => i === index ? project : p) } })),
      removeProject: (index: number) => set((state) => ({ resume: { ...state.resume, projects: state.resume.projects.filter((_, i) => i !== index) } })),
    }),
    {
      name: 'cv-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

