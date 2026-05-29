'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { fontFamilies } from '@/lib/templates'

export function SettingsPage() {
  const [profileName, setProfileName] = useState('Olivia Rhye')
  const [profileEmail, setProfileEmail] = useState('olivia@email.com')
  const [defaultTemplate, setDefaultTemplate] = useState('executive')
  const [defaultFont, setDefaultFont] = useState('Inter')
  const [autoSave, setAutoSave] = useState(true)
  const [exportFormat, setExportFormat] = useState<'pdf' | 'docx'>('pdf')

  const handleSave = () => {
    toast.success('Settings saved')
  }

  return (
    <div className="p-6 lg:p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Customize your ResumePro experience</p>
      </div>

      <div className="space-y-6">
        {/* Profile */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-xs">Name</Label>
              <Input
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="h-9 text-sm mt-1"
              />
            </div>
            <div>
              <Label className="text-xs">Email</Label>
              <Input
                value={profileEmail}
                onChange={(e) => setProfileEmail(e.target.value)}
                className="h-9 text-sm mt-1"
                type="email"
              />
            </div>
          </CardContent>
        </Card>

        {/* Defaults */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Default Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-xs">Default Template</Label>
              <select
                value={defaultTemplate}
                onChange={(e) => setDefaultTemplate(e.target.value)}
                className="w-full h-9 text-sm border rounded-md px-3 mt-1 bg-white"
              >
                <option value="executive">Executive</option>
                <option value="modern">Modern</option>
                <option value="elegant">Elegant</option>
                <option value="clean">Clean</option>
              </select>
            </div>
            <div>
              <Label className="text-xs">Default Font</Label>
              <select
                value={defaultFont}
                onChange={(e) => setDefaultFont(e.target.value)}
                className="w-full h-9 text-sm border rounded-md px-3 mt-1 bg-white"
              >
                {fontFamilies.map((f) => (
                  <option key={f.id} value={f.name}>{f.name}</option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-xs font-medium">Auto-save</Label>
                <p className="text-[10px] text-muted-foreground">Automatically save changes every 5 seconds</p>
              </div>
              <Switch checked={autoSave} onCheckedChange={setAutoSave} />
            </div>
            <Separator />
            <div>
              <Label className="text-xs font-medium">Export Format</Label>
              <p className="text-[10px] text-muted-foreground mb-2">Default format for resume exports</p>
              <div className="flex gap-3">
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="radio"
                    name="export"
                    value="pdf"
                    checked={exportFormat === 'pdf'}
                    onChange={() => setExportFormat('pdf')}
                    className="accent-indigo-500"
                  />
                  PDF
                </label>
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="radio"
                    name="export"
                    value="docx"
                    checked={exportFormat === 'docx'}
                    onChange={() => setExportFormat('docx')}
                    className="accent-indigo-500"
                  />
                  DOCX
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">About</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>ResumePro v1.0.0</p>
              <p>Built with Next.js, TypeScript, and shadcn/ui</p>
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSave} className="bg-indigo-500 hover:bg-indigo-600 w-full">
          Save Settings
        </Button>
      </div>
    </div>
  )
}
