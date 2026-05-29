import { ResumeData } from './resume-store'

export function serializeResumeData(data: ResumeData): string {
  return JSON.stringify(data)
}

export function deserializeResumeData(json: string): ResumeData {
  try {
    return JSON.parse(json) as ResumeData
  } catch {
    return {
      name: '',
      title: '',
      bio: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: '',
      skills: [],
      experience: [],
      education: [],
      tools: [],
      languages: [],
    }
  }
}

export function createEmptyResumeData(): ResumeData {
  return {
    name: '',
    title: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    skills: [],
    experience: [],
    education: [],
    tools: [],
    languages: [],
  }
}

export function getInitials(name: string): string {
  if (!name) return '?'
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function getSkillLevelLabel(level: number): string {
  if (level >= 90) return 'Expert'
  if (level >= 75) return 'Advanced'
  if (level >= 60) return 'Intermediate'
  if (level >= 40) return 'Basic'
  return 'Beginner'
}

export function getLanguageLevelLabel(level: number): string {
  switch (level) {
    case 5: return 'Native'
    case 4: return 'Fluent'
    case 3: return 'Advanced'
    case 2: return 'Intermediate'
    case 1: return 'Basic'
    default: return 'Basic'
  }
}
