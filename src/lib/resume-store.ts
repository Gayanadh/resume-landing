import { create } from 'zustand'

export interface Skill {
  name: string
  level: number
}

export interface Experience {
  title: string
  company: string
  period: string
  bullets: string[]
}

export interface Education {
  degree: string
  school: string
  detail: string
}

export interface Language {
  name: string
  level: number
}

export interface ResumeData {
  name: string
  title: string
  bio: string
  email: string
  phone: string
  location: string
  linkedin: string
  website: string
  skills: Skill[]
  experience: Experience[]
  education: Education[]
  tools: string[]
  languages: Language[]
}

export const defaultResumeData: ResumeData = {
  name: 'Olivia Rhye',
  title: 'Senior Product Designer',
  bio: 'Passionate product designer with 8+ years of experience creating intuitive digital experiences. Specialized in user-centered design, design systems, and cross-functional collaboration. Led design for products serving 10M+ users.',
  email: 'olivia.rhye@email.com',
  phone: '+1 (555) 234-5678',
  location: 'San Francisco, CA',
  linkedin: 'linkedin.com/in/oliviarhye',
  website: 'oliviarhye.design',
  skills: [
    { name: 'UI/UX Design', level: 95 },
    { name: 'Design Systems', level: 90 },
    { name: 'Prototyping', level: 85 },
    { name: 'User Research', level: 88 },
    { name: 'Figma', level: 95 },
    { name: 'Visual Design', level: 87 },
  ],
  experience: [
    {
      title: 'Senior Product Designer',
      company: 'TechCorp Inc.',
      period: '2021 - Present',
      bullets: [
        'Led the redesign of the core product, resulting in a 40% increase in user engagement',
        'Built and maintained a comprehensive design system used across 12 product teams',
        'Mentored 4 junior designers and established design review processes',
        'Collaborated with engineering to implement pixel-perfect components',
      ],
    },
    {
      title: 'Product Designer',
      company: 'StartupXYZ',
      period: '2018 - 2021',
      bullets: [
        'Designed the end-to-end user experience for the mobile app from 0 to 1',
        'Conducted user research sessions that informed key product decisions',
        'Created interactive prototypes for stakeholder presentations and user testing',
        'Reduced onboarding drop-off by 35% through iterative design improvements',
      ],
    },
    {
      title: 'Junior Designer',
      company: 'DesignStudio Co.',
      period: '2016 - 2018',
      bullets: [
        'Supported senior designers on client projects across web and mobile platforms',
        'Created visual assets, icons, and illustrations for brand identity projects',
        'Participated in design critiques and contributed to team knowledge sharing',
      ],
    },
  ],
  education: [
    {
      degree: 'BFA in Graphic Design',
      school: 'California College of the Arts',
      detail: 'Graduated with Honors, Dean\'s List 2014-2016',
    },
    {
      degree: 'UX Design Certificate',
      school: 'Google / Coursera',
      detail: 'Professional Certificate in UX Design',
    },
  ],
  tools: ['Figma', 'Sketch', 'Adobe XD', 'InVision', 'Principle', 'Framer', 'Photoshop', 'Illustrator', 'After Effects', 'Zeplin'],
  languages: [
    { name: 'English', level: 5 },
    { name: 'Spanish', level: 3 },
    { name: 'French', level: 2 },
  ],
}

interface ResumeState {
  resumeData: ResumeData
  currentResumeId: string | null
  template: string
  accentColor: string
  fontFamily: string
  fontSize: number
  spacing: number
  isDirty: boolean

  setResumeData: (data: ResumeData) => void
  updateResumeField: <K extends keyof ResumeData>(key: K, value: ResumeData[K]) => void
  setCurrentResumeId: (id: string | null) => void
  setTemplate: (template: string) => void
  setAccentColor: (color: string) => void
  setFontFamily: (font: string) => void
  setFontSize: (size: number) => void
  setSpacing: (spacing: number) => void
  setIsDirty: (dirty: boolean) => void
  loadResume: (data: Partial<ResumeState>) => void
  resetToDefault: () => void
}

export const useResumeStore = create<ResumeState>((set) => ({
  resumeData: defaultResumeData,
  currentResumeId: null,
  template: 'executive',
  accentColor: '#6366F1',
  fontFamily: 'Inter',
  fontSize: 10.5,
  spacing: 18,
  isDirty: false,

  setResumeData: (data) => set({ resumeData: data, isDirty: true }),
  updateResumeField: (key, value) =>
    set((state) => ({
      resumeData: { ...state.resumeData, [key]: value },
      isDirty: true,
    })),
  setCurrentResumeId: (id) => set({ currentResumeId: id }),
  setTemplate: (template) => set({ template, isDirty: true }),
  setAccentColor: (color) => set({ accentColor: color, isDirty: true }),
  setFontFamily: (font) => set({ fontFamily: font, isDirty: true }),
  setFontSize: (size) => set({ fontSize: size, isDirty: true }),
  setSpacing: (spacing) => set({ spacing, isDirty: true }),
  setIsDirty: (dirty) => set({ isDirty: dirty }),
  loadResume: (data) => set({ ...data, isDirty: false }),
  resetToDefault: () =>
    set({
      resumeData: defaultResumeData,
      currentResumeId: null,
      template: 'executive',
      accentColor: '#6366F1',
      fontFamily: 'Inter',
      fontSize: 10.5,
      spacing: 18,
      isDirty: false,
    }),
}))
