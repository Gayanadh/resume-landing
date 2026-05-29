'use client'

import { useResumeStore } from '@/lib/resume-store'
import { accentColors, fontFamilies } from '@/lib/templates'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

export function DesignTab() {
  const { accentColor, fontFamily, fontSize, spacing, setAccentColor, setFontFamily, setFontSize, setSpacing } = useResumeStore()

  return (
    <div className="p-4 space-y-6">
      {/* Accent Color */}
      <div className="space-y-3">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Accent Color</Label>
        <div className="grid grid-cols-4 gap-2">
          {accentColors.map((color) => (
            <button
              key={color}
              onClick={() => setAccentColor(color)}
              className={cn(
                'w-full aspect-square rounded-lg flex items-center justify-center transition-all border-2',
                accentColor === color ? 'border-foreground scale-105' : 'border-transparent hover:scale-105'
              )}
              style={{ background: color }}
            >
              {accentColor === color && <Check className="h-4 w-4 text-white" />}
            </button>
          ))}
        </div>
      </div>

      {/* Font Family */}
      <div className="space-y-3">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Font Family</Label>
        <div className="space-y-1.5">
          {fontFamilies.map((font) => (
            <button
              key={font.id}
              onClick={() => setFontFamily(font.name)}
              className={cn(
                'w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-colors border',
                fontFamily === font.name
                  ? 'border-indigo-200 bg-indigo-50 text-indigo-700'
                  : 'border-transparent hover:bg-accent text-foreground'
              )}
              style={{ fontFamily: font.name === 'Inter' ? 'Inter, sans-serif' : font.name === 'Manrope' ? 'Manrope, sans-serif' : font.name === 'Georgia' ? 'Georgia, serif' : 'Playfair Display, Georgia, serif' }}
            >
              <span>{font.name}</span>
              {fontFamily === font.name && (
                <Check className="h-3.5 w-3.5 text-indigo-500" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Font Size</Label>
          <span className="text-xs text-muted-foreground">{fontSize}pt</span>
        </div>
        <Slider
          value={[fontSize]}
          onValueChange={([v]) => setFontSize(v)}
          min={9}
          max={13}
          step={0.5}
          className="w-full"
        />
        <div className="flex justify-between text-[10px] text-gray-400">
          <span>9pt</span>
          <span>13pt</span>
        </div>
      </div>

      {/* Section Spacing */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Section Spacing</Label>
          <span className="text-xs text-muted-foreground">{spacing}px</span>
        </div>
        <Slider
          value={[spacing]}
          onValueChange={([v]) => setSpacing(v)}
          min={12}
          max={30}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-[10px] text-gray-400">
          <span>Compact</span>
          <span>Spacious</span>
        </div>
      </div>
    </div>
  )
}
