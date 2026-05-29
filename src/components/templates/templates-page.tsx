'use client'

import { templates } from '@/lib/templates'
import { useResumeStore } from '@/lib/resume-store'
import { useAppStore } from '@/lib/app-store'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Lock, Check } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

type Filter = 'all' | 'free' | 'premium'

export function TemplatesPage() {
  const [filter, setFilter] = useState<Filter>('all')
  const { setTemplate, template } = useResumeStore()
  const { setCurrentView } = useAppStore()

  const filtered = filter === 'all' ? templates : templates.filter((t) => t.category === filter)

  const handleUseTemplate = (id: string, isPremium: boolean) => {
    if (isPremium) {
      toast.error('Premium templates require a subscription')
      return
    }
    setTemplate(id)
    setCurrentView('editor')
    toast.success(`Template "${id}" applied!`)
  }

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Resume Templates</h1>
        <p className="text-sm text-muted-foreground mt-1">Choose from our collection of professionally designed templates</p>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {(['all', 'free', 'premium'] as Filter[]).map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'default' : 'outline'}
            size="sm"
            className={cn('h-8 text-xs capitalize', filter === f && 'bg-indigo-500 hover:bg-indigo-600')}
            onClick={() => setFilter(f)}
          >
            {f}
          </Button>
        ))}
      </div>

      {/* Template grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((t) => (
          <div
            key={t.id}
            className={cn(
              'rounded-xl border bg-white overflow-hidden transition-all hover:shadow-lg',
              template === t.id && 'ring-2 ring-indigo-500'
            )}
          >
            <div className={cn('h-48 bg-gradient-to-br flex items-center justify-center relative', t.previewGradient)}>
              {t.isPremium && (
                <span className="absolute top-3 right-3 bg-amber-400 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  PREMIUM
                </span>
              )}
              {template === t.id && (
                <div className="absolute top-3 left-3 bg-indigo-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Check className="h-3 w-3" /> Active
                </div>
              )}
              {/* Mini preview */}
              <div className="bg-white/90 rounded-sm w-[75%] h-[80%] p-3 overflow-hidden shadow-lg">
                <div className="h-full flex gap-1.5">
                  {(t.id === 'executive' || t.id === 'professional') && (
                    <>
                      <div className="flex-1 space-y-1">
                        <div className="h-2 w-3/4 bg-gray-300 rounded" />
                        <div className="h-1.5 w-1/2 bg-gray-200 rounded" />
                        <div className="h-1 w-full bg-gray-100 rounded mt-1" />
                        <div className="h-1 w-full bg-gray-100 rounded" />
                        <div className="h-1 w-5/6 bg-gray-100 rounded" />
                      </div>
                      <div className="w-10 space-y-1">
                        <div className="h-1 w-full bg-gray-200 rounded" />
                        <div className="h-1 w-full bg-gray-200 rounded" />
                      </div>
                    </>
                  )}
                  {(t.id === 'modern' || t.id === 'creative') && (
                    <>
                      <div className="w-8 bg-gray-100 space-y-0.5 py-1 px-0.5">
                        <div className="h-1.5 w-full bg-gray-300 rounded" />
                        <div className="h-1 w-full bg-gray-200 rounded" />
                      </div>
                      <div className="flex-1 space-y-0.5 py-1">
                        <div className="h-1.5 w-3/4 bg-gray-300 rounded" />
                        <div className="h-1 w-full bg-gray-100 rounded" />
                      </div>
                    </>
                  )}
                  {(t.id === 'elegant' || t.id === 'corporate') && (
                    <div className="flex-1 space-y-1 text-center py-1">
                      <div className="h-2 w-1/2 bg-gray-300 rounded mx-auto" />
                      <div className="h-px w-1/3 bg-gray-200 mx-auto" />
                      <div className="h-1 w-3/4 bg-gray-100 rounded mx-auto" />
                    </div>
                  )}
                  {(t.id === 'clean' || t.id === 'minimalist') && (
                    <div className="flex-1 space-y-1 py-1">
                      <div className="h-2 w-1/2 bg-gray-300 rounded" />
                      <div className="h-px w-4 bg-gray-200" />
                      <div className="h-1 w-full bg-gray-100 rounded" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-sm">{t.name}</h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{t.description}</p>
              <Button
                className={cn('w-full mt-3 h-8 text-xs', t.isPremium ? 'bg-amber-500 hover:bg-amber-600' : 'bg-indigo-500 hover:bg-indigo-600')}
                onClick={() => handleUseTemplate(t.id, t.isPremium)}
              >
                {t.isPremium ? (
                  <>
                    <Lock className="h-3 w-3 mr-1" /> Unlock Premium
                  </>
                ) : (
                  'Use Template'
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
