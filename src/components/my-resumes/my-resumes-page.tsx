'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Plus,
  Pencil,
  Copy,
  Trash2,
  FolderOpen,
  Search,
  LayoutGrid,
  List,
  MoreVertical,
  FileText,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import { useResumeStore } from '@/lib/resume-store'
import { useAppStore } from '@/lib/app-store'
import { deserializeResumeData, formatDate } from '@/lib/resume-utils'
import { templates } from '@/lib/templates'

interface Resume {
  id: string
  title: string
  template: string
  accentColor: string
  fontFamily: string
  fontSize: number
  spacing: number
  data: string
  isExample: boolean
  createdAt: string
  updatedAt: string
}

export function MyResumesPage() {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [renameId, setRenameId] = useState<string | null>(null)
  const [renameTitle, setRenameTitle] = useState('')
  const { loadResume, setCurrentResumeId, setResumeData, setTemplate, setAccentColor, setFontFamily, setFontSize, setSpacing } = useResumeStore()
  const { setCurrentView } = useAppStore()

  useEffect(() => {
    fetchResumes()
  }, [])

  const fetchResumes = async () => {
    try {
      const res = await fetch('/api/resumes')
      const data = await res.json()
      setResumes(data)
    } catch {
      toast.error('Failed to load resumes')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async () => {
    try {
      const res = await fetch('/api/resumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Untitled Resume' }),
      })
      const data = await res.json()
      const resumeData = deserializeResumeData(data.data)
      loadResume({
        resumeData,
        currentResumeId: data.id,
        template: data.template,
        accentColor: data.accentColor,
        fontFamily: data.fontFamily,
        fontSize: data.fontSize,
        spacing: data.spacing,
      })
      setCurrentView('editor')
      toast.success('New resume created')
    } catch {
      toast.error('Failed to create resume')
    }
  }

  const handleEdit = (resume: Resume) => {
    const resumeData = deserializeResumeData(resume.data)
    loadResume({
      resumeData,
      currentResumeId: resume.id,
      template: resume.template,
      accentColor: resume.accentColor,
      fontFamily: resume.fontFamily,
      fontSize: resume.fontSize,
      spacing: resume.spacing,
    })
    setCurrentView('editor')
  }

  const handleDuplicate = async (resume: Resume) => {
    try {
      const res = await fetch('/api/resumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `${resume.title} (Copy)`,
          template: resume.template,
          accentColor: resume.accentColor,
          fontFamily: resume.fontFamily,
          fontSize: resume.fontSize,
          spacing: resume.spacing,
          data: resume.data,
        }),
      })
      const data = await res.json()
      setResumes([data, ...resumes])
      toast.success('Resume duplicated')
    } catch {
      toast.error('Failed to duplicate resume')
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await fetch(`/api/resumes/${deleteId}`, { method: 'DELETE' })
      setResumes(resumes.filter((r) => r.id !== deleteId))
      setDeleteId(null)
      toast.success('Resume deleted')
    } catch {
      toast.error('Failed to delete resume')
    }
  }

  const handleRename = async () => {
    if (!renameId || !renameTitle.trim()) return
    try {
      const resume = resumes.find((r) => r.id === renameId)
      if (!resume) return
      await fetch(`/api/resumes/${renameId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: renameTitle }),
      })
      setResumes(resumes.map((r) => (r.id === renameId ? { ...r, title: renameTitle } : r)))
      setRenameId(null)
      toast.success('Resume renamed')
    } catch {
      toast.error('Failed to rename resume')
    }
  }

  const filtered = resumes.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  )

  const getTemplateName = (id: string) => {
    return templates.find((t) => t.id === id)?.name || id
  }

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Resumes</h1>
          <p className="text-sm text-muted-foreground mt-1">{resumes.length} resumes</p>
        </div>
        <Button onClick={handleCreate} className="bg-indigo-500 hover:bg-indigo-600 gap-1.5">
          <Plus className="h-4 w-4" /> New Resume
        </Button>
      </div>

      {/* Search and view toggle */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search resumes..."
            className="h-9 text-xs pl-8"
          />
        </div>
        <div className="flex border rounded-md">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="icon"
            className={`h-9 w-9 rounded-r-none ${viewMode === 'grid' ? 'bg-indigo-500' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="icon"
            className={`h-9 w-9 rounded-l-none ${viewMode === 'list' ? 'bg-indigo-500' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <List className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin h-6 w-6 border-2 border-indigo-500 border-t-transparent rounded-full" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <FolderOpen className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-sm font-medium text-gray-500">
            {search ? 'No resumes found' : 'No resumes yet'}
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            {search ? 'Try a different search term' : 'Create your first resume to get started'}
          </p>
          {!search && (
            <Button onClick={handleCreate} className="mt-4 bg-indigo-500 hover:bg-indigo-600 gap-1.5">
              <Plus className="h-4 w-4" /> Create Resume
            </Button>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((resume) => (
            <Card
              key={resume.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => handleEdit(resume)}
            >
              <div className="h-36 bg-gray-50 flex items-center justify-center">
                <div className="bg-white shadow rounded-sm w-[55%] h-[80%] p-2 overflow-hidden">
                  <div className="space-y-1">
                    <div className="h-1.5 w-3/4 bg-gray-300 rounded" />
                    <div className="h-1 w-1/2 bg-gray-200 rounded" />
                    <div className="h-0.5 w-full bg-gray-100 rounded mt-1" />
                    <div className="h-0.5 w-full bg-gray-100 rounded" />
                  </div>
                </div>
              </div>
              <CardContent className="p-3">
                <div className="flex items-start justify-between">
                  <div className="min-w-0">
                    <h3 className="font-medium text-sm truncate">{resume.title}</h3>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {getTemplateName(resume.template)} · {formatDate(resume.updatedAt)}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0">
                        <MoreVertical className="h-3.5 w-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleEdit(resume) }}>
                        <Pencil className="h-3.5 w-3.5 mr-2" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleDuplicate(resume) }}>
                        <Copy className="h-3.5 w-3.5 mr-2" /> Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => { e.stopPropagation(); setRenameId(resume.id); setRenameTitle(resume.title) }}>
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-500"
                        onClick={(e) => { e.stopPropagation(); setDeleteId(resume.id) }}
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((resume) => (
            <Card
              key={resume.id}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleEdit(resume)}
            >
              <CardContent className="p-3 flex items-center gap-3">
                <FileText className="h-8 w-8 text-indigo-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm truncate">{resume.title}</h3>
                  <p className="text-[10px] text-muted-foreground">
                    {getTemplateName(resume.template)} · Modified {formatDate(resume.updatedAt)}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); handleDuplicate(resume) }}>
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={(e) => { e.stopPropagation(); setDeleteId(resume.id) }}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete confirmation */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Resume</DialogTitle>
            <DialogDescription>Are you sure you want to delete this resume? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rename dialog */}
      <Dialog open={!!renameId} onOpenChange={() => setRenameId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Resume</DialogTitle>
            <DialogDescription>Enter a new name for your resume.</DialogDescription>
          </DialogHeader>
          <Input
            value={renameTitle}
            onChange={(e) => setRenameTitle(e.target.value)}
            placeholder="Resume title"
            className="mt-2"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameId(null)}>Cancel</Button>
            <Button onClick={handleRename} className="bg-indigo-500 hover:bg-indigo-600">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
