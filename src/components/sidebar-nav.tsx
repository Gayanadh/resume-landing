'use client'

import { useAppStore, AppView } from '@/lib/app-store'
import {
  PenLine,
  LayoutGrid,
  BookOpen,
  FileText,
  FolderOpen,
  Bot,
  Settings,
  Sparkles,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const navItems: Array<{
  id: AppView
  label: string
  icon: React.ElementType
  badge?: string
}> = [
  { id: 'editor', label: 'Editor', icon: PenLine },
  { id: 'templates', label: 'Templates', icon: LayoutGrid },
  { id: 'examples', label: 'Examples', icon: BookOpen },
  { id: 'cover-letters', label: 'Cover Letters', icon: FileText },
  { id: 'my-resumes', label: 'My Resumes', icon: FolderOpen },
  { id: 'ai-assistant', label: 'AI Assistant', icon: Bot, badge: 'New' },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export function SidebarNav() {
  const { currentView, setCurrentView, sidebarOpen, setSidebarOpen } = useAppStore()

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-border flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-indigo-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">RP</span>
            </div>
            <span className="font-semibold text-lg text-foreground">ResumePro</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-8 w-8"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentView === item.id
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )}
              >
                <Icon className="h-4.5 w-4.5 shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="bg-indigo-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Go Premium Card */}
        <div className="mx-3 mb-3 p-4 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4" />
            <span className="font-semibold text-sm">Go Premium</span>
          </div>
          <p className="text-xs text-white/80 mb-3">
            Unlock all templates, AI features, and export options.
          </p>
          <Button
            size="sm"
            className="w-full bg-white text-indigo-600 hover:bg-white/90 text-xs font-semibold h-8"
          >
            Upgrade Now
          </Button>
        </div>

        {/* User Info */}
        <div className="px-3 pb-4 border-t border-border pt-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-indigo-600 font-semibold text-sm">OR</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Olivia Rhye</p>
              <p className="text-xs text-muted-foreground truncate">olivia@email.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
