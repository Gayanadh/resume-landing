'use client'

import { sampleResumes } from '@/lib/sample-data'
import { useResumeStore } from '@/lib/resume-store'
import { useAppStore } from '@/lib/app-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Eye, Copy } from 'lucide-react'
import { toast } from 'sonner'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'

export function ExamplesPage() {
  const { setResumeData, setTemplate } = useResumeStore()
  const { setCurrentView } = useAppStore()
  const [previewExample, setPreviewExample] = useState<string | null>(null)

  const handleUseAsTemplate = (id: string) => {
    const example = sampleResumes.find((e) => e.id === id)
    if (example) {
      setResumeData(example.data)
      setTemplate(example.template)
      setCurrentView('editor')
      toast.success(`Loaded "${example.title}" example as template`)
    }
  }

  const previewData = sampleResumes.find((e) => e.id === previewExample)

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Resume Examples</h1>
        <p className="text-sm text-muted-foreground mt-1">Get inspired by professionally crafted resume examples</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleResumes.map((example) => (
          <Card key={example.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            {/* Mini preview */}
            <div
              className="h-48 bg-gray-50 cursor-pointer relative group flex items-center justify-center"
              onClick={() => setPreviewExample(example.id)}
            >
              <div className="bg-white shadow-md rounded-sm w-[60%] h-[85%] p-2 overflow-hidden scale-90 group-hover:scale-95 transition-transform">
                <div className="space-y-1">
                  <div className="h-1.5 w-3/4 bg-gray-300 rounded" />
                  <div className="h-1 w-1/2 bg-gray-200 rounded" />
                  <div className="h-0.5 w-full bg-gray-100 rounded mt-1" />
                  <div className="h-0.5 w-full bg-gray-100 rounded" />
                  <div className="h-0.5 w-3/4 bg-gray-100 rounded" />
                  <div className="h-1 w-1/2 bg-gray-200 rounded mt-1" />
                  <div className="h-0.5 w-full bg-gray-100 rounded" />
                  <div className="h-0.5 w-full bg-gray-100 rounded" />
                </div>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <Eye className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-sm">{example.title}</h3>
                <Badge variant="secondary" className="text-[10px] h-5">
                  {example.industry}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{example.data.name} · {example.data.title}</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs gap-1 flex-1"
                  onClick={() => setPreviewExample(example.id)}
                >
                  <Eye className="h-3 w-3" /> View
                </Button>
                <Button
                  size="sm"
                  className="h-7 text-xs gap-1 flex-1 bg-indigo-500 hover:bg-indigo-600"
                  onClick={() => handleUseAsTemplate(example.id)}
                >
                  <Copy className="h-3 w-3" /> Use
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Preview Dialog */}
      <Dialog open={!!previewExample} onOpenChange={() => setPreviewExample(null)}>
        <DialogContent className="max-w-3xl max-h-[85vh]">
          <DialogHeader>
            <DialogTitle>{previewData?.title} Example</DialogTitle>
          </DialogHeader>
          {previewData && (
            <ScrollArea className="max-h-[70vh]">
              <div className="space-y-4 p-2">
                <div className="bg-white border rounded-lg p-6">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-xl font-bold">{previewData.data.name}</h2>
                      <p className="text-sm text-indigo-500">{previewData.data.title}</p>
                    </div>
                    <p className="text-sm text-gray-600">{previewData.data.bio}</p>
                    <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                      {previewData.data.email && <span className="bg-gray-100 px-2 py-1 rounded">{previewData.data.email}</span>}
                      {previewData.data.phone && <span className="bg-gray-100 px-2 py-1 rounded">{previewData.data.phone}</span>}
                      {previewData.data.location && <span className="bg-gray-100 px-2 py-1 rounded">{previewData.data.location}</span>}
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold mb-2 text-indigo-600">Experience</h3>
                      {previewData.data.experience.map((exp, i) => (
                        <div key={i} className="mb-3">
                          <h4 className="text-sm font-medium">{exp.title}</h4>
                          <p className="text-xs text-gray-500">{exp.company} · {exp.period}</p>
                          <ul className="mt-1 space-y-0.5">
                            {exp.bullets.map((b, j) => (
                              <li key={j} className="text-xs text-gray-600 pl-3">• {b}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold mb-2 text-indigo-600">Skills</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {previewData.data.skills.map((skill, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600">
                            {skill.name} ({skill.level}%)
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold mb-2 text-indigo-600">Education</h3>
                      {previewData.data.education.map((edu, i) => (
                        <div key={i} className="mb-1">
                          <p className="text-sm font-medium">{edu.degree}</p>
                          <p className="text-xs text-gray-500">{edu.school}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
