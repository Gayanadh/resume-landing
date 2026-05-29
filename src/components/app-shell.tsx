'use client'

import { SidebarNav } from './sidebar-nav'
import { Topbar } from './topbar'
import { useAppStore } from '@/lib/app-store'
import { ResumeEditor } from './editor/resume-editor'
import { TemplatesPage } from './templates/templates-page'
import { ExamplesPage } from './examples/examples-page'
import { CoverLettersPage } from './cover-letters/cover-letters-page'
import { MyResumesPage } from './my-resumes/my-resumes-page'
import { AiAssistantPage } from './ai-assistant/ai-assistant-page'
import { SettingsPage } from './settings/settings-page'

export function AppShell() {
  const { currentView } = useAppStore()

  const renderView = () => {
    switch (currentView) {
      case 'editor':
        return <ResumeEditor />
      case 'templates':
        return <TemplatesPage />
      case 'examples':
        return <ExamplesPage />
      case 'cover-letters':
        return <CoverLettersPage />
      case 'my-resumes':
        return <MyResumesPage />
      case 'ai-assistant':
        return <AiAssistantPage />
      case 'settings':
        return <SettingsPage />
      default:
        return <ResumeEditor />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <SidebarNav />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 overflow-auto">
          {renderView()}
        </main>
      </div>
    </div>
  )
}
