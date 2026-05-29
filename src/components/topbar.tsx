'use client'

import { useAppStore, AppView } from '@/lib/app-store'
import { useResumeStore } from '@/lib/resume-store'
import {
  Menu,
  ArrowLeft,
  Eye,
  Download,
  FileDown,
  Check,
  Loader2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const viewTitles: Record<AppView, string> = {
  editor: 'Resume Editor',
  templates: 'Resume Templates',
  examples: 'Resume Examples',
  'cover-letters': 'Cover Letters',
  'my-resumes': 'My Resumes',
  'ai-assistant': 'AI Assistant',
  settings: 'Settings',
}

export function Topbar() {
  const { currentView, toggleSidebar, saving, lastSaved } = useAppStore()
  const { resumeData } = useResumeStore()

  const isEditor = currentView === 'editor'

  return (
    <header className="h-14 border-b border-border bg-white flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden h-9 w-9"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-sm font-semibold text-foreground">
          {viewTitles[currentView]}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        {/* Save status */}
        {isEditor && (
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground mr-2">
            {saving ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>Saving...</span>
              </>
            ) : lastSaved ? (
              <>
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span>Saved</span>
              </>
            ) : (
              <>
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span>Saved</span>
              </>
            )}
          </div>
        )}

        {isEditor && (
          <>
            <Button variant="outline" size="sm" className="hidden sm:flex h-8 gap-1.5 text-xs">
              <Eye className="h-3.5 w-3.5" />
              Preview
            </Button>
            <Button variant="outline" size="sm" className="hidden sm:flex h-8 gap-1.5 text-xs">
              <FileDown className="h-3.5 w-3.5" />
              PDF
            </Button>
            <Button size="sm" className="h-8 gap-1.5 text-xs bg-indigo-500 hover:bg-indigo-600">
              <Download className="h-3.5 w-3.5" />
              Download
            </Button>
          </>
        )}
      </div>
    </header>
  )
}
