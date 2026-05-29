import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const coverLetters = await db.coverLetter.findMany({
      orderBy: { updatedAt: 'desc' },
    })
    return NextResponse.json(coverLetters)
  } catch (error) {
    console.error('Failed to fetch cover letters:', error)
    return NextResponse.json({ error: 'Failed to fetch cover letters' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const title = body.title || 'New Cover Letter'
    const content = body.content || ''
    const resumeId = body.resumeId || null

    const coverLetter = await db.coverLetter.create({
      data: {
        title,
        content,
        resumeId,
      },
    })

    return NextResponse.json(coverLetter, { status: 201 })
  } catch (error) {
    console.error('Failed to create cover letter:', error)
    return NextResponse.json({ error: 'Failed to create cover letter' }, { status: 500 })
  }
}
