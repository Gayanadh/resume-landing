import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const coverLetter = await db.coverLetter.findUnique({ where: { id } })
    if (!coverLetter) {
      return NextResponse.json({ error: 'Cover letter not found' }, { status: 404 })
    }
    return NextResponse.json(coverLetter)
  } catch (error) {
    console.error('Failed to fetch cover letter:', error)
    return NextResponse.json({ error: 'Failed to fetch cover letter' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const existing = await db.coverLetter.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Cover letter not found' }, { status: 404 })
    }

    const updateData: Record<string, unknown> = {}
    if (body.title !== undefined) updateData.title = body.title
    if (body.content !== undefined) updateData.content = body.content
    if (body.resumeId !== undefined) updateData.resumeId = body.resumeId

    const coverLetter = await db.coverLetter.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(coverLetter)
  } catch (error) {
    console.error('Failed to update cover letter:', error)
    return NextResponse.json({ error: 'Failed to update cover letter' }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const existing = await db.coverLetter.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Cover letter not found' }, { status: 404 })
    }

    await db.coverLetter.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete cover letter:', error)
    return NextResponse.json({ error: 'Failed to delete cover letter' }, { status: 500 })
  }
}
