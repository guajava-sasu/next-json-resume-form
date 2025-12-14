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

