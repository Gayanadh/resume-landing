'use client'

import { useResumeStore } from '@/lib/resume-store'
import { templates } from '@/lib/templates'
import { cn } from '@/lib/utils'
import { Check, Lock } from 'lucide-react'

export function TemplatesTab() {
  const { template, setTemplate } = useResumeStore()

  const freeTemplates = templates.slice(0, 4)

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Choose Template</h3>
      <div className="grid grid-cols-2 gap-3">
        {freeTemplates.map((t) => (
          <button
            key={t.id}
            onClick={() => setTemplate(t.id)}
            className={cn(
              'relative rounded-lg border-2 overflow-hidden transition-all text-left',
              template === t.id ? 'border-indigo-500 shadow-md' : 'border-gray-200 hover:border-gray-300'
            )}
          >
            {/* Mini preview */}
            <div
              className={cn('h-28 w-full bg-gradient-to-br flex items-center justify-center', t.previewGradient)}
            >
              <div className="bg-white/90 rounded-sm w-[85%] h-[85%] p-2 overflow-hidden">
                <div className="flex gap-1.5 h-full">
                  {t.id === 'executive' && (
                    <>
                      <div className="flex-1 space-y-1">
                        <div className="h-1.5 w-3/4 bg-gray-300 rounded" />
                        <div className="h-1 w-1/2 bg-gray-200 rounded" />
                        <div className="h-0.5 w-full bg-gray-100 rounded mt-1" />
                        <div className="h-0.5 w-full bg-gray-100 rounded" />
                        <div className="h-0.5 w-5/6 bg-gray-100 rounded" />
                      </div>
                      <div className="w-8 space-y-1">
                        <div className="h-0.5 w-full bg-gray-200 rounded" />
                        <div className="h-0.5 w-full bg-gray-200 rounded" />
                      </div>
                    </>
                  )}
                  {t.id === 'modern' && (
                    <>
                      <div className="w-6 bg-gray-100 space-y-0.5 py-1 px-0.5">
                        <div className="h-1 w-full bg-gray-300 rounded" />
                        <div className="h-0.5 w-full bg-gray-200 rounded" />
                        <div className="h-0.5 w-full bg-gray-200 rounded" />
                      </div>
                      <div className="flex-1 space-y-0.5 py-1">
                        <div className="h-1 w-3/4 bg-gray-300 rounded" />
                        <div className="h-0.5 w-full bg-gray-100 rounded" />
                        <div className="h-0.5 w-full bg-gray-100 rounded" />
                      </div>
                    </>
                  )}
                  {t.id === 'elegant' && (
                    <div className="flex-1 space-y-1 text-center py-1">
                      <div className="h-1 w-1/2 bg-gray-300 rounded mx-auto" />
                      <div className="h-px w-1/3 bg-gray-200 mx-auto" />
                      <div className="h-0.5 w-3/4 bg-gray-100 rounded mx-auto" />
                      <div className="h-0.5 w-3/4 bg-gray-100 rounded mx-auto" />
                    </div>
                  )}
                  {t.id === 'clean' && (
                    <div className="flex-1 space-y-1 py-1">
                      <div className="h-1 w-1/2 bg-gray-300 rounded" />
                      <div className="h-px w-4 bg-gray-200" />
                      <div className="h-0.5 w-full bg-gray-100 rounded" />
                      <div className="h-0.5 w-full bg-gray-100 rounded" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="p-2">
              <p className="text-xs font-medium">{t.name}</p>
            </div>
            {template === t.id && (
              <div className="absolute top-1.5 right-1.5 bg-indigo-500 rounded-full p-0.5">
                <Check className="h-3 w-3 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Premium templates preview */}
      <div className="pt-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Premium Templates</h3>
        <div className="grid grid-cols-2 gap-3">
          {templates.slice(4).map((t) => (
            <div
              key={t.id}
              className="relative rounded-lg border border-gray-200 overflow-hidden opacity-75 cursor-not-allowed"
            >
              <div className={cn('h-28 w-full bg-gradient-to-br flex items-center justify-center', t.previewGradient)}>
                <Lock className="h-6 w-6 text-white/70" />
              </div>
              <div className="p-2 flex items-center justify-between">
                <p className="text-xs font-medium">{t.name}</p>
                <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-semibold">PRO</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
