'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Resume, Basics, Work, Volunteer, Education, Award, Certificate, Publication, Skill, Language, Interest, Reference, Project } from './types';

interface ResumeStore {
  resume: Resume;
  setBasics: (basics: Basics) => void;
  setWork: (work: Work[]) => void;
  addWork: (work: Work) => void;
  updateWork: (index: number, work: Work) => void;
  removeWork: (index: number) => void;
  setVolunteer: (volunteer: Volunteer[]) => void;
  addVolunteer: (volunteer: Volunteer) => void;
  updateVolunteer: (index: number, volunteer: Volunteer) => void;
  removeVolunteer: (index: number) => void;
  setEducation: (education: Education[]) => void;
  addEducation: (education: Education) => void;
  updateEducation: (index: number, education: Education) => void;
  removeEducation: (index: number) => void;
  setAwards: (awards: Award[]) => void;
  addAward: (award: Award) => void;
  updateAward: (index: number, award: Award) => void;
  removeAward: (index: number) => void;
  setCertificates: (certificates: Certificate[]) => void;
  addCertificate: (certificate: Certificate) => void;
  updateCertificate: (index: number, certificate: Certificate) => void;
  removeCertificate: (index: number) => void;
  setPublications: (publications: Publication[]) => void;
  addPublication: (publication: Publication) => void;
  updatePublication: (index: number, publication: Publication) => void;
  removePublication: (index: number) => void;
  setSkills: (skills: Skill[]) => void;
  addSkill: (skill: Skill) => void;
  updateSkill: (index: number, skill: Skill) => void;
  removeSkill: (index: number) => void;
  setLanguages: (languages: Language[]) => void;
  addLanguage: (language: Language) => void;
  updateLanguage: (index: number, language: Language) => void;
  removeLanguage: (index: number) => void;
  setInterests: (interests: Interest[]) => void;
  addInterest: (interest: Interest) => void;
  updateInterest: (index: number, interest: Interest) => void;
  removeInterest: (index: number) => void;
  setReferences: (references: Reference[]) => void;
  addReference: (reference: Reference) => void;
  updateReference: (index: number, reference: Reference) => void;
  removeReference: (index: number) => void;
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  updateProject: (index: number, project: Project) => void;
  removeProject: (index: number) => void;
  setResume: (resume: Resume) => void;
  resetResume: () => void;
}

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

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resume: initialResume,

      setBasics: (basics) =>
        set((state) => ({
          resume: { ...state.resume, basics },
        })),

      setWork: (work) =>
        set((state) => ({
          resume: { ...state.resume, work },
        })),

      addWork: (work) =>
        set((state) => ({
          resume: { ...state.resume, work: [...state.resume.work, work] },
        })),

      updateWork: (index, work) =>
        set((state) => ({
          resume: {
            ...state.resume,
            work: state.resume.work.map((item, i) => (i === index ? work : item)),
          },
        })),

      removeWork: (index) =>
        set((state) => ({
          resume: {
            ...state.resume,
            work: state.resume.work.filter((_, i) => i !== index),
          },
        })),

      setVolunteer: (volunteer) =>
        set((state) => ({
          resume: { ...state.resume, volunteer },
        })),

      addVolunteer: (volunteer) =>
        set((state) => ({
          resume: { ...state.resume, volunteer: [...state.resume.volunteer, volunteer] },
        })),

      updateVolunteer: (index, volunteer) =>
        set((state) => ({
          resume: {
            ...state.resume,
            volunteer: state.resume.volunteer.map((item, i) => (i === index ? volunteer : item)),
          },
        })),

      removeVolunteer: (index) =>
        set((state) => ({
          resume: {
            ...state.resume,
            volunteer: state.resume.volunteer.filter((_, i) => i !== index),
          },
        })),

      setEducation: (education) =>
        set((state) => ({
          resume: { ...state.resume, education },
        })),

      addEducation: (education) =>
        set((state) => ({
          resume: { ...state.resume, education: [...state.resume.education, education] },
        })),

      updateEducation: (index, education) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: state.resume.education.map((item, i) => (i === index ? education : item)),
          },
        })),

      removeEducation: (index) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: state.resume.education.filter((_, i) => i !== index),
          },
        })),

      setAwards: (awards) =>
        set((state) => ({
          resume: { ...state.resume, awards },
        })),

      addAward: (award) =>
        set((state) => ({
          resume: { ...state.resume, awards: [...state.resume.awards, award] },
        })),

      updateAward: (index, award) =>
        set((state) => ({
          resume: {
            ...state.resume,
            awards: state.resume.awards.map((item, i) => (i === index ? award : item)),
          },
        })),

      removeAward: (index) =>
        set((state) => ({
          resume: {
            ...state.resume,
            awards: state.resume.awards.filter((_, i) => i !== index),
          },
        })),

      setCertificates: (certificates) =>
        set((state) => ({
          resume: { ...state.resume, certificates },
        })),

      addCertificate: (certificate) =>
        set((state) => ({
          resume: { ...state.resume, certificates: [...state.resume.certificates, certificate] },
        })),

      updateCertificate: (index, certificate) =>
        set((state) => ({
          resume: {
            ...state.resume,
            certificates: state.resume.certificates.map((item, i) => (i === index ? certificate : item)),
          },
        })),

      removeCertificate: (index) =>
        set((state) => ({
          resume: {
            ...state.resume,
            certificates: state.resume.certificates.filter((_, i) => i !== index),
          },
        })),

      setPublications: (publications) =>
        set((state) => ({
          resume: { ...state.resume, publications },
        })),

      addPublication: (publication) =>
        set((state) => ({
          resume: { ...state.resume, publications: [...state.resume.publications, publication] },
        })),

      updatePublication: (index, publication) =>
        set((state) => ({
          resume: {
            ...state.resume,
            publications: state.resume.publications.map((item, i) => (i === index ? publication : item)),
          },
        })),

      removePublication: (index) =>
        set((state) => ({
          resume: {
            ...state.resume,
            publications: state.resume.publications.filter((_, i) => i !== index),
          },
        })),

      setSkills: (skills) =>
        set((state) => ({
          resume: { ...state.resume, skills },
        })),

      addSkill: (skill) =>
        set((state) => ({
          resume: { ...state.resume, skills: [...state.resume.skills, skill] },
        })),

      updateSkill: (index, skill) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills: state.resume.skills.map((item, i) => (i === index ? skill : item)),
          },
        })),

      removeSkill: (index) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills: state.resume.skills.filter((_, i) => i !== index),
          },
        })),

      setLanguages: (languages) =>
        set((state) => ({
          resume: { ...state.resume, languages },
        })),

      addLanguage: (language) =>
        set((state) => ({
          resume: { ...state.resume, languages: [...state.resume.languages, language] },
        })),

      updateLanguage: (index, language) =>
        set((state) => ({
          resume: {
            ...state.resume,
            languages: state.resume.languages.map((item, i) => (i === index ? language : item)),
          },
        })),

      removeLanguage: (index) =>
        set((state) => ({
          resume: {
            ...state.resume,
            languages: state.resume.languages.filter((_, i) => i !== index),
          },
        })),

      setInterests: (interests) =>
        set((state) => ({
          resume: { ...state.resume, interests },
        })),

      addInterest: (interest) =>
        set((state) => ({
          resume: { ...state.resume, interests: [...state.resume.interests, interest] },
        })),

      updateInterest: (index, interest) =>
        set((state) => ({
          resume: {
            ...state.resume,
            interests: state.resume.interests.map((item, i) => (i === index ? interest : item)),
          },
        })),

      removeInterest: (index) =>
        set((state) => ({
          resume: {
            ...state.resume,
            interests: state.resume.interests.filter((_, i) => i !== index),
          },
        })),

      setReferences: (references) =>
        set((state) => ({
          resume: { ...state.resume, references },
        })),

      addReference: (reference) =>
        set((state) => ({
          resume: { ...state.resume, references: [...state.resume.references, reference] },
        })),

      updateReference: (index, reference) =>
        set((state) => ({
          resume: {
            ...state.resume,
            references: state.resume.references.map((item, i) => (i === index ? reference : item)),
          },
        })),

      removeReference: (index) =>
        set((state) => ({
          resume: {
            ...state.resume,
            references: state.resume.references.filter((_, i) => i !== index),
          },
        })),

      setProjects: (projects) =>
        set((state) => ({
          resume: { ...state.resume, projects },
        })),

      addProject: (project) =>
        set((state) => ({
          resume: { ...state.resume, projects: [...state.resume.projects, project] },
        })),

      updateProject: (index, project) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: state.resume.projects.map((item, i) => (i === index ? project : item)),
          },
        })),

      removeProject: (index) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: state.resume.projects.filter((_, i) => i !== index),
          },
        })),

      setResume: (resume) => set({ resume }),

      resetResume: () => set({ resume: initialResume }),
    }),
    {
      name: 'resume-storage',
    }
  )
);
