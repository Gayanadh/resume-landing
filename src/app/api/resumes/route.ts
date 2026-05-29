import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'
import { defaultResumeData } from '@/lib/resume-store'

const RESUMES_DIR = join(process.cwd(), 'resumes')

function ensureResumesDir() {
  if (!existsSync(RESUMES_DIR)) {
    mkdirSync(RESUMES_DIR, { recursive: true })
  }
}

export async function GET() {
  try {
    const resumes = await db.resume.findMany({
      orderBy: { updatedAt: 'desc' },
    })
    return NextResponse.json(resumes)
  } catch (error) {
    console.error('Failed to fetch resumes:', error)
    return NextResponse.json({ error: 'Failed to fetch resumes' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const title = body.title || 'Untitled Resume'
    const template = body.template || 'executive'
    const accentColor = body.accentColor || '#6366F1'
    const fontFamily = body.fontFamily || 'Inter'
    const fontSize = body.fontSize || 10.5
    const spacing = body.spacing || 18
    const data = body.data || JSON.stringify(defaultResumeData)

    const resume = await db.resume.create({
      data: {
        title,
        template,
        accentColor,
        fontFamily,
        fontSize,
        spacing,
        data,
      },
    })

    // Save JSON file backup
    ensureResumesDir()
    const filePath = join(RESUMES_DIR, `${resume.id}.json`)
    writeFileSync(filePath, JSON.stringify({
      id: resume.id,
      title,
      template,
      accentColor,
      fontFamily,
      fontSize,
      spacing,
      data: JSON.parse(data),
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
    }, null, 2), 'utf-8')

    return NextResponse.json(resume, { status: 201 })
  } catch (error) {
    console.error('Failed to create resume:', error)
    return NextResponse.json({ error: 'Failed to create resume' }, { status: 500 })
  }
}
