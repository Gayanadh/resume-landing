'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
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
  FileText,
  Download,
  ArrowLeft,
} from 'lucide-react'
import { toast } from 'sonner'
import { formatDate } from '@/lib/resume-utils'

interface CoverLetter {
  id: string
  title: string
  content: string
  resumeId: string | null
  createdAt: string
  updatedAt: string
}

export function CoverLettersPage() {
  const [coverLetters, setCoverLetters] = useState<CoverLetter[]>([])
  const [editing, setEditing] = useState<CoverLetter | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCoverLetters()
  }, [])

  const fetchCoverLetters = async () => {
    try {
      const res = await fetch('/api/cover-letters')
      const data = await res.json()
      setCoverLetters(data)
    } catch {
      toast.error('Failed to load cover letters')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async () => {
    try {
      const res = await fetch('/api/cover-letters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'New Cover Letter',
          content: '',
        }),
      })
      const data = await res.json()
      setCoverLetters([data, ...coverLetters])
      setEditing(data)
      toast.success('Cover letter created')
    } catch {
      toast.error('Failed to create cover letter')
    }
  }

  const handleSave = async () => {
    if (!editing) return
    try {
      await fetch(`/api/cover-letters/${editing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editing.title,
          content: editing.content,
        }),
      })
      setCoverLetters(coverLetters.map((cl) => (cl.id === editing.id ? editing : cl)))
      setEditing(null)
      toast.success('Cover letter saved')
    } catch {
      toast.error('Failed to save cover letter')
    }
  }

  const handleDuplicate = async (cl: CoverLetter) => {
    try {
      const res = await fetch('/api/cover-letters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `${cl.title} (Copy)`,
          content: cl.content,
        }),
      })
      const data = await res.json()
      setCoverLetters([data, ...coverLetters])
      toast.success('Cover letter duplicated')
    } catch {
      toast.error('Failed to duplicate cover letter')
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await fetch(`/api/cover-letters/${deleteId}`, { method: 'DELETE' })
      setCoverLetters(coverLetters.filter((cl) => cl.id !== deleteId))
      setDeleteId(null)
      toast.success('Cover letter deleted')
    } catch {
      toast.error('Failed to delete cover letter')
    }
  }

  // Editor mode
  if (editing) {
    return (
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditing(null)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-semibold">Edit Cover Letter</h2>
        </div>
        <div className="space-y-4">
          <div>
            <Label className="text-xs">Title</Label>
            <Input
              value={editing.title}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              className="h-9 text-sm mt-1"
              placeholder="Cover Letter Title"
            />
          </div>
          <div>
            <Label className="text-xs">Content</Label>
            <Textarea
              value={editing.content}
              onChange={(e) => setEditing({ ...editing, content: e.target.value })}
              className="min-h-[400px] text-sm mt-1 resize-none"
              placeholder="Write your cover letter..."
            />
          </div>
          <div className="flex gap-3">
            <Button onClick={handleSave} className="bg-indigo-500 hover:bg-indigo-600">
              Save
            </Button>
            <Button variant="outline" onClick={() => setEditing(null)}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Cover Letters</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your cover letters</p>
        </div>
        <Button
          onClick={handleCreate}
          className="bg-indigo-500 hover:bg-indigo-600 gap-1.5"
        >
          <Plus className="h-4 w-4" /> New Cover Letter
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin h-6 w-6 border-2 border-indigo-500 border-t-transparent rounded-full" />
        </div>
      ) : coverLetters.length === 0 ? (
        <div className="text-center py-16">
          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-sm font-medium text-gray-500">No cover letters yet</h3>
          <p className="text-xs text-gray-400 mt-1">Create your first cover letter to get started</p>
          <Button onClick={handleCreate} className="mt-4 bg-indigo-500 hover:bg-indigo-600 gap-1.5">
            <Plus className="h-4 w-4" /> Create Cover Letter
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {coverLetters.map((cl) => (
            <Card key={cl.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-indigo-500 shrink-0" />
                    <h3 className="font-medium text-sm truncate">{cl.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Last modified {formatDate(cl.updatedAt)}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditing(cl)}>
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDuplicate(cl)}>
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:text-red-600"
                    onClick={() => setDeleteId(cl.id)}
                  >
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
            <DialogTitle>Delete Cover Letter</DialogTitle>
            <DialogDescription>Are you sure you want to delete this cover letter? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
