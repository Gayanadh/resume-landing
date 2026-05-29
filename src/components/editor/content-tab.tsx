'use client'

import { useResumeStore } from '@/lib/resume-store'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  Upload,
  ChevronDown,
  Sparkles,
  Zap,
  FileDown,
  RefreshCw,
  Plus,
  Trash2,
  Wand2,
  Loader2,
} from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export function ContentTab() {
  const { resumeData, updateResumeField, setResumeData } = useResumeStore()
  const [uploadOpen, setUploadOpen] = useState(false)
  const [rebuildOpen, setRebuildOpen] = useState(false)
  const [achievement, setAchievement] = useState('')
  const [polishing, setPolishing] = useState(false)

  const addSkill = () => {
    updateResumeField('skills', [...resumeData.skills, { name: '', level: 50 }])
  }

  const removeSkill = (index: number) => {
    updateResumeField('skills', resumeData.skills.filter((_, i) => i !== index))
  }

  const updateSkill = (index: number, field: 'name' | 'level', value: string | number) => {
    const newSkills = [...resumeData.skills]
    newSkills[index] = { ...newSkills[index], [field]: value }
    updateResumeField('skills', newSkills)
  }

  const addExperience = () => {
    updateResumeField('experience', [...resumeData.experience, { title: '', company: '', period: '', bullets: [''] }])
  }

  const removeExperience = (index: number) => {
    updateResumeField('experience', resumeData.experience.filter((_, i) => i !== index))
  }

  const updateExperience = (index: number, field: string, value: string) => {
    const newExp = [...resumeData.experience]
    newExp[index] = { ...newExp[index], [field]: value }
    updateResumeField('experience', newExp)
  }

  const updateBullet = (expIndex: number, bulletIndex: number, value: string) => {
    const newExp = [...resumeData.experience]
    newExp[expIndex] = {
      ...newExp[expIndex],
      bullets: newExp[expIndex].bullets.map((b, i) => (i === bulletIndex ? value : b)),
    }
    updateResumeField('experience', newExp)
  }

  const addBullet = (expIndex: number) => {
    const newExp = [...resumeData.experience]
    newExp[expIndex] = { ...newExp[expIndex], bullets: [...newExp[expIndex].bullets, ''] }
    updateResumeField('experience', newExp)
  }

  const removeBullet = (expIndex: number, bulletIndex: number) => {
    const newExp = [...resumeData.experience]
    newExp[expIndex] = {
      ...newExp[expIndex],
      bullets: newExp[expIndex].bullets.filter((_, i) => i !== bulletIndex),
    }
    updateResumeField('experience', newExp)
  }

  const addEducation = () => {
    updateResumeField('education', [...resumeData.education, { degree: '', school: '', detail: '' }])
  }

  const removeEducation = (index: number) => {
    updateResumeField('education', resumeData.education.filter((_, i) => i !== index))
  }

  const updateEducation = (index: number, field: string, value: string) => {
    const newEdu = [...resumeData.education]
    newEdu[index] = { ...newEdu[index], [field]: value }
    updateResumeField('education', newEdu)
  }

  const addTool = () => {
    updateResumeField('tools', [...resumeData.tools, ''])
  }

  const removeTool = (index: number) => {
    updateResumeField('tools', resumeData.tools.filter((_, i) => i !== index))
  }

  const updateTool = (index: number, value: string) => {
    const newTools = [...resumeData.tools]
    newTools[index] = value
    updateResumeField('tools', newTools)
  }

  const addLanguage = () => {
    updateResumeField('languages', [...resumeData.languages, { name: '', level: 3 }])
  }

  const removeLanguage = (index: number) => {
    updateResumeField('languages', resumeData.languages.filter((_, i) => i !== index))
  }

  const updateLanguage = (index: number, field: 'name' | 'level', value: string | number) => {
    const newLangs = [...resumeData.languages]
    newLangs[index] = { ...newLangs[index], [field]: value }
    updateResumeField('languages', newLangs)
  }

  const handlePolish = async () => {
    if (!achievement.trim()) return
    setPolishing(true)
    try {
      const res = await fetch('/api/ai/polish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: achievement, context: 'resume achievement' }),
      })
      const data = await res.json()
      if (data.polished) {
        setAchievement(data.polished)
        toast.success('Text polished successfully!')
      }
    } catch {
      toast.error('Failed to polish text')
    } finally {
      setPolishing(false)
    }
  }

  return (
    <div className="p-4 space-y-5">
      {/* Upload Resume */}
      <Collapsible open={uploadOpen} onOpenChange={setUploadOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <div className="flex items-center gap-2">
            <Upload className="h-3.5 w-3.5" />
            Upload Resume
          </div>
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${uploadOpen ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
            <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
            <p className="text-xs text-gray-500">Drag & drop or click to upload</p>
            <p className="text-[10px] text-gray-400 mt-1">PDF, DOCX supported</p>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Personal Information */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Personal Information</h3>
        <div className="space-y-2">
          <div>
            <Label className="text-xs">Full Name</Label>
            <Input
              value={resumeData.name}
              onChange={(e) => updateResumeField('name', e.target.value)}
              className="h-8 text-xs mt-1"
              placeholder="Your full name"
            />
          </div>
          <div>
            <Label className="text-xs">Professional Title</Label>
            <Input
              value={resumeData.title}
              onChange={(e) => updateResumeField('title', e.target.value)}
              className="h-8 text-xs mt-1"
              placeholder="Your title"
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Summary</h3>
        <Textarea
          value={resumeData.bio}
          onChange={(e) => updateResumeField('bio', e.target.value)}
          className="text-xs min-h-[80px] resize-none"
          placeholder="Professional summary..."
        />
      </div>

      {/* Contact Details */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contact Details</h3>
        <div className="space-y-2">
          <div>
            <Label className="text-xs">Email</Label>
            <Input
              value={resumeData.email}
              onChange={(e) => updateResumeField('email', e.target.value)}
              className="h-8 text-xs mt-1"
              placeholder="email@example.com"
            />
          </div>
          <div>
            <Label className="text-xs">Phone</Label>
            <Input
              value={resumeData.phone}
              onChange={(e) => updateResumeField('phone', e.target.value)}
              className="h-8 text-xs mt-1"
              placeholder="+1 (555) 000-0000"
            />
          </div>
          <div>
            <Label className="text-xs">Location</Label>
            <Input
              value={resumeData.location}
              onChange={(e) => updateResumeField('location', e.target.value)}
              className="h-8 text-xs mt-1"
              placeholder="City, State"
            />
          </div>
          <div>
            <Label className="text-xs">LinkedIn</Label>
            <Input
              value={resumeData.linkedin}
              onChange={(e) => updateResumeField('linkedin', e.target.value)}
              className="h-8 text-xs mt-1"
              placeholder="linkedin.com/in/..."
            />
          </div>
          <div>
            <Label className="text-xs">Website</Label>
            <Input
              value={resumeData.website}
              onChange={(e) => updateResumeField('website', e.target.value)}
              className="h-8 text-xs mt-1"
              placeholder="yoursite.com"
            />
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Skills</h3>
          <Button variant="ghost" size="sm" className="h-6 text-xs gap-1" onClick={addSkill}>
            <Plus className="h-3 w-3" /> Add
          </Button>
        </div>
        <div className="space-y-2">
          {resumeData.skills.map((skill, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input
                value={skill.name}
                onChange={(e) => updateSkill(i, 'name', e.target.value)}
                className="h-7 text-xs flex-1"
                placeholder="Skill name"
              />
              <input
                type="range"
                min={0}
                max={100}
                value={skill.level}
                onChange={(e) => updateSkill(i, 'level', parseInt(e.target.value))}
                className="w-16 h-1 accent-indigo-500"
              />
              <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={() => removeSkill(i)}>
                <Trash2 className="h-3 w-3 text-gray-400" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Experience</h3>
          <Button variant="ghost" size="sm" className="h-6 text-xs gap-1" onClick={addExperience}>
            <Plus className="h-3 w-3" /> Add
          </Button>
        </div>
        <div className="space-y-3">
          {resumeData.experience.map((exp, i) => (
            <div key={i} className="border rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">{exp.title || 'New Position'}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeExperience(i)}>
                  <Trash2 className="h-3 w-3 text-gray-400" />
                </Button>
              </div>
              <Input
                value={exp.title}
                onChange={(e) => updateExperience(i, 'title', e.target.value)}
                className="h-7 text-xs"
                placeholder="Job title"
              />
              <Input
                value={exp.company}
                onChange={(e) => updateExperience(i, 'company', e.target.value)}
                className="h-7 text-xs"
                placeholder="Company"
              />
              <Input
                value={exp.period}
                onChange={(e) => updateExperience(i, 'period', e.target.value)}
                className="h-7 text-xs"
                placeholder="2020 - Present"
              />
              <div className="space-y-1">
                {exp.bullets.map((bullet, j) => (
                  <div key={j} className="flex items-center gap-1">
                    <Textarea
                      value={bullet}
                      onChange={(e) => updateBullet(i, j, e.target.value)}
                      className="text-xs min-h-[32px] resize-none flex-1"
                      placeholder="Achievement..."
                    />
                    <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={() => removeBullet(i, j)}>
                      <Trash2 className="h-3 w-3 text-gray-400" />
                    </Button>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="h-6 text-xs gap-1" onClick={() => addBullet(i)}>
                  <Plus className="h-3 w-3" /> Add Bullet
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Education</h3>
          <Button variant="ghost" size="sm" className="h-6 text-xs gap-1" onClick={addEducation}>
            <Plus className="h-3 w-3" /> Add
          </Button>
        </div>
        <div className="space-y-2">
          {resumeData.education.map((edu, i) => (
            <div key={i} className="border rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">{edu.degree || 'New Degree'}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeEducation(i)}>
                  <Trash2 className="h-3 w-3 text-gray-400" />
                </Button>
              </div>
              <Input
                value={edu.degree}
                onChange={(e) => updateEducation(i, 'degree', e.target.value)}
                className="h-7 text-xs"
                placeholder="Degree"
              />
              <Input
                value={edu.school}
                onChange={(e) => updateEducation(i, 'school', e.target.value)}
                className="h-7 text-xs"
                placeholder="School"
              />
              <Input
                value={edu.detail}
                onChange={(e) => updateEducation(i, 'detail', e.target.value)}
                className="h-7 text-xs"
                placeholder="Details"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Tools */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tools</h3>
          <Button variant="ghost" size="sm" className="h-6 text-xs gap-1" onClick={addTool}>
            <Plus className="h-3 w-3" /> Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {resumeData.tools.map((tool, i) => (
            <span key={i} className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-gray-100">
              <input
                value={tool}
                onChange={(e) => updateTool(i, e.target.value)}
                className="bg-transparent outline-none w-16 text-xs"
                placeholder="Tool"
              />
              <button onClick={() => removeTool(i)} className="text-gray-400 hover:text-gray-600">
                <Trash2 className="h-2.5 w-2.5" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Languages</h3>
          <Button variant="ghost" size="sm" className="h-6 text-xs gap-1" onClick={addLanguage}>
            <Plus className="h-3 w-3" /> Add
          </Button>
        </div>
        <div className="space-y-2">
          {resumeData.languages.map((lang, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input
                value={lang.name}
                onChange={(e) => updateLanguage(i, 'name', e.target.value)}
                className="h-7 text-xs flex-1"
                placeholder="Language"
              />
              <select
                value={lang.level}
                onChange={(e) => updateLanguage(i, 'level', parseInt(e.target.value))}
                className="h-7 text-xs border rounded px-2 bg-white"
              >
                <option value={1}>Basic</option>
                <option value={2}>Intermediate</option>
                <option value={3}>Advanced</option>
                <option value={4}>Fluent</option>
                <option value={5}>Native</option>
              </select>
              <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={() => removeLanguage(i)}>
                <Trash2 className="h-3 w-3 text-gray-400" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* AI Features */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="h-3 w-3 text-indigo-500" />
          <span className="text-indigo-500">AI Features</span>
        </h3>

        {/* Add Achievement */}
        <div className="space-y-2">
          <Label className="text-xs">Add Achievement</Label>
          <Textarea
            value={achievement}
            onChange={(e) => setAchievement(e.target.value)}
            className="text-xs min-h-[60px] resize-none"
            placeholder="Describe your achievement..."
          />
          <Button
            variant="outline"
            size="sm"
            className="w-full h-7 text-xs gap-1.5 border-indigo-200 text-indigo-600 hover:bg-indigo-50"
            onClick={handlePolish}
            disabled={polishing}
          >
            {polishing ? <Loader2 className="h-3 w-3 animate-spin" /> : <Wand2 className="h-3 w-3" />}
            {polishing ? 'Polishing...' : 'Polish with AI'}
          </Button>
        </div>

        {/* AI Smart Inject */}
        <Button
          variant="outline"
          size="sm"
          className="w-full h-7 text-xs gap-1.5 border-indigo-200 text-indigo-600 hover:bg-indigo-50"
        >
          <Zap className="h-3 w-3" />
          AI Smart Inject
        </Button>

        {/* ATS Downloads */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 h-7 text-xs gap-1 border-indigo-200 text-indigo-600 hover:bg-indigo-50"
          >
            <FileDown className="h-3 w-3" />
            ATS PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 h-7 text-xs gap-1 border-indigo-200 text-indigo-600 hover:bg-indigo-50"
          >
            <FileDown className="h-3 w-3" />
            ATS DOCX
          </Button>
        </div>
      </div>

      <Separator />

      {/* Complete AI Rebuild */}
      <Collapsible open={rebuildOpen} onOpenChange={setRebuildOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 p-3 rounded-lg border border-indigo-200 bg-indigo-50/50 w-full">
            <RefreshCw className="h-4 w-4 text-indigo-500" />
            <div className="text-left">
              <p className="text-xs font-semibold text-indigo-700">Complete AI Rebuild</p>
              <p className="text-[10px] text-indigo-500">Rebuild your entire resume with AI</p>
            </div>
            <ChevronDown className={`h-3.5 w-3.5 text-indigo-500 ml-auto transition-transform ${rebuildOpen ? 'rotate-180' : ''}`} />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 space-y-2 p-3 border rounded-lg">
          <div>
            <Label className="text-xs">Upload Current Resume</Label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center mt-1">
              <Upload className="h-4 w-4 text-gray-400 mx-auto mb-1" />
              <p className="text-[10px] text-gray-500">Drop file here</p>
            </div>
          </div>
          <div>
            <Label className="text-xs">Template</Label>
            <select className="w-full h-7 text-xs border rounded px-2 mt-1 bg-white">
              <option>Executive</option>
              <option>Modern</option>
              <option>Elegant</option>
              <option>Clean</option>
            </select>
          </div>
          <div>
            <Label className="text-xs">Format</Label>
            <select className="w-full h-7 text-xs border rounded px-2 mt-1 bg-white">
              <option>PDF</option>
              <option>DOCX</option>
            </select>
          </div>
          <Button className="w-full h-8 text-xs bg-indigo-500 hover:bg-indigo-600 gap-1.5">
            <Sparkles className="h-3 w-3" />
            Rebuild Resume
          </Button>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}


