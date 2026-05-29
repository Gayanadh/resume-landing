import { create } from 'zustand'

export type AppView = 'editor' | 'templates' | 'examples' | 'cover-letters' | 'my-resumes' | 'ai-assistant' | 'settings'

interface AppState {
  currentView: AppView
  sidebarOpen: boolean
  saving: boolean
  lastSaved: Date | null
  setCurrentView: (view: AppView) => void
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  setSaving: (saving: boolean) => void
  setLastSaved: (date: Date) => void
}

export const useAppStore = create<AppState>((set) => ({
  currentView: 'editor',
  sidebarOpen: false,
  saving: false,
  lastSaved: null,
  setCurrentView: (view) => set({ currentView: view, sidebarOpen: false }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setSaving: (saving) => set({ saving }),
  setLastSaved: (date) => set({ lastSaved: date }),
}))
