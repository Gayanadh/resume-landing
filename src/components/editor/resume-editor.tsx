'use client'

import { ResumePreview } from './resume-preview'
import { RightPanel } from './right-panel'
import { useResumeStore } from '@/lib/resume-store'
import { useAppStore } from '@/lib/app-store'
import { useEffect, useCallback, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { PanelRightOpen, PanelRightClose } from 'lucide-react'

export function ResumeEditor() {
  const { isDirty, setIsDirty, setSaving, setLastSaved, currentResumeId, resumeData, template, accentColor, fontFamily, fontSize, spacing } = useResumeStore()
  const [rightPanelOpen, setRightPanelOpen] = useState(true)

  const saveResume = useCallback(async () => {
    if (!isDirty) return
    setSaving(true)
    try {
      const payload = {
        title: resumeData.name || 'Untitled Resume',
        template,
        accentColor,
        fontFamily,
        fontSize,
        spacing,
        data: JSON.stringify(resumeData),
      }

      if (currentResumeId) {
        await fetch(`/api/resumes/${currentResumeId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      } else {
        const res = await fetch('/api/resumes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        const data = await res.json()
        if (data.id) {
          useResumeStore.getState().setCurrentResumeId(data.id)
        }
      }
      setLastSaved(new Date())
      setIsDirty(false)
    } catch (error) {
      console.error('Failed to save resume:', error)
    } finally {
      setSaving(false)
    }
  }, [isDirty, currentResumeId, resumeData, template, accentColor, fontFamily, fontSize, spacing, setSaving, setLastSaved, setIsDirty])

  // Auto-save every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (isDirty) {
        saveResume()
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [isDirty, saveResume])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault()
        saveResume()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [saveResume])

  return (
    <div className="h-full flex">
      {/* Preview area */}
      <div className="flex-1 overflow-auto bg-gray-100 p-6 lg:p-8">
        <div className="max-w-[850px] mx-auto">
          <div className="resume-page-wrapper">
            <ResumePreview />
          </div>
        </div>
      </div>

      {/* Right panel - desktop */}
      <div className={`${rightPanelOpen ? 'w-96' : 'w-0'} border-l border-border transition-all duration-300 overflow-hidden hidden lg:block`}>
        <div className="w-96 h-full">
          <RightPanel />
        </div>
      </div>

      {/* Toggle right panel - desktop */}
      <Button
        variant="ghost"
        size="icon"
        className="hidden lg:flex fixed right-2 top-16 z-10 h-8 w-8 bg-white border shadow-sm"
        onClick={() => setRightPanelOpen(!rightPanelOpen)}
      >
        {rightPanelOpen ? <PanelRightClose className="h-4 w-4" /> : <PanelRightOpen className="h-4 w-4" />}
      </Button>

      {/* Right panel - mobile sheet */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="fixed bottom-4 right-4 z-20 h-10 gap-1.5 shadow-lg bg-indigo-500 text-white hover:bg-indigo-600 border-none"
            >
              <PanelRightOpen className="h-4 w-4" />
              Edit
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85vw] sm:w-96 p-0">
            <RightPanel />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
