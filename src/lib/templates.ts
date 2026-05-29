export interface TemplateDef {
  id: string
  name: string
  description: string
  isPremium: boolean
  category: 'free' | 'premium'
  previewGradient: string
}

export const templates: TemplateDef[] = [
  {
    id: 'executive',
    name: 'Executive',
    description: 'Professional template with gradient accent header and two-column layout',
    isPremium: false,
    category: 'free',
    previewGradient: 'from-indigo-500 to-purple-500',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean sidebar layout with photo on left and content on right',
    isPremium: false,
    category: 'free',
    previewGradient: 'from-slate-600 to-slate-800',
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Centered header with ornamental dividers and serif styling',
    isPremium: false,
    category: 'free',
    previewGradient: 'from-amber-500 to-orange-500',
  },
  {
    id: 'clean',
    name: 'Clean',
    description: 'Minimal, left-aligned design with accent underlines',
    isPremium: false,
    category: 'free',
    previewGradient: 'from-teal-500 to-emerald-500',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Corporate-style with structured sections and bold headings',
    isPremium: true,
    category: 'premium',
    previewGradient: 'from-blue-600 to-blue-800',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold, artistic layout with unique visual elements',
    isPremium: true,
    category: 'premium',
    previewGradient: 'from-pink-500 to-rose-500',
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Ultra-clean design with maximum whitespace and subtle accents',
    isPremium: true,
    category: 'premium',
    previewGradient: 'from-gray-400 to-gray-600',
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Formal business template with traditional structure',
    isPremium: true,
    category: 'premium',
    previewGradient: 'from-stone-600 to-stone-800',
  },
]

export function getTemplateById(id: string): TemplateDef | undefined {
  return templates.find((t) => t.id === id)
}

export const accentColors = [
  '#6366F1', // Indigo
  '#8B5CF6', // Violet
  '#EC4899', // Pink
  '#EF4444', // Red
  '#F97316', // Orange
  '#EAB308', // Yellow
  '#22C55E', // Green
  '#0EA5E9', // Sky
]

export const fontFamilies = [
  { id: 'Inter', name: 'Inter' },
  { id: 'Manrope', name: 'Manrope' },
  { id: 'Georgia', name: 'Georgia' },
  { id: 'Playfair Display', name: 'Playfair Display' },
]
