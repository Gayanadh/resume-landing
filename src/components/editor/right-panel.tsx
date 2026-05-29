'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ContentTab } from './content-tab'
import { DesignTab } from './design-tab'
import { TemplatesTab } from './templates-tab'
import { FileText, Palette, LayoutGrid } from 'lucide-react'

export function RightPanel() {
  return (
    <div className="h-full flex flex-col bg-white">
      <Tabs defaultValue="content" className="flex flex-col h-full">
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0 h-10 shrink-0">
          <TabsTrigger
            value="content"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-500 data-[state=active]:shadow-none px-4 h-10 text-xs gap-1.5 data-[state=active]:text-indigo-600"
          >
            <FileText className="h-3.5 w-3.5" />
            Content
          </TabsTrigger>
          <TabsTrigger
            value="design"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-500 data-[state=active]:shadow-none px-4 h-10 text-xs gap-1.5 data-[state=active]:text-indigo-600"
          >
            <Palette className="h-3.5 w-3.5" />
            Design
          </TabsTrigger>
          <TabsTrigger
            value="templates"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-500 data-[state=active]:shadow-none px-4 h-10 text-xs gap-1.5 data-[state=active]:text-indigo-600"
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            Templates
          </TabsTrigger>
        </TabsList>
        <TabsContent value="content" className="flex-1 overflow-y-auto m-0">
          <ContentTab />
        </TabsContent>
        <TabsContent value="design" className="flex-1 overflow-y-auto m-0">
          <DesignTab />
        </TabsContent>
        <TabsContent value="templates" className="flex-1 overflow-y-auto m-0">
          <TemplatesTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
