import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { writeFileSync, unlinkSync, existsSync } from 'fs'
import { join } from 'path'

const RESUMES_DIR = join(process.cwd(), 'resumes')

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const resume = await db.resume.findUnique({ where: { id } })
    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
    }
    return NextResponse.json(resume)
  } catch (error) {
    console.error('Failed to fetch resume:', error)
    return NextResponse.json({ error: 'Failed to fetch resume' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const existingResume = await db.resume.findUnique({ where: { id } })
    if (!existingResume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
    }

    const updateData: Record<string, unknown> = {}
    if (body.title !== undefined) updateData.title = body.title
    if (body.template !== undefined) updateData.template = body.template
    if (body.accentColor !== undefined) updateData.accentColor = body.accentColor
    if (body.fontFamily !== undefined) updateData.fontFamily = body.fontFamily
    if (body.fontSize !== undefined) updateData.fontSize = body.fontSize
    if (body.spacing !== undefined) updateData.spacing = body.spacing
    if (body.data !== undefined) updateData.data = body.data

    const resume = await db.resume.update({
      where: { id },
      data: updateData,
    })

    // Update JSON file backup
    const filePath = join(RESUMES_DIR, `${id}.json`)
    if (existsSync(filePath)) {
      writeFileSync(filePath, JSON.stringify({
        id: resume.id,
        title: resume.title,
        template: resume.template,
        accentColor: resume.accentColor,
        fontFamily: resume.fontFamily,
        fontSize: resume.fontSize,
        spacing: resume.spacing,
        data: JSON.parse(resume.data),
        createdAt: resume.createdAt,
        updatedAt: resume.updatedAt,
      }, null, 2), 'utf-8')
    }

    return NextResponse.json(resume)
  } catch (error) {
    console.error('Failed to update resume:', error)
    return NextResponse.json({ error: 'Failed to update resume' }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const existingResume = await db.resume.findUnique({ where: { id } })
    if (!existingResume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
    }

    await db.resume.delete({ where: { id } })

    // Delete JSON file backup
    const filePath = join(RESUMES_DIR, `${id}.json`)
    if (existsSync(filePath)) {
      unlinkSync(filePath)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete resume:', error)
    return NextResponse.json({ error: 'Failed to delete resume' }, { status: 500 })
  }
}
