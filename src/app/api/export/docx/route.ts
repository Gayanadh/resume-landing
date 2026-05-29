import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { resumeData } = body

    if (!resumeData) {
      return NextResponse.json({ error: 'Resume data is required' }, { status: 400 })
    }

    const rd = resumeData as {
      name?: string; title?: string; bio?: string;
      email?: string; phone?: string; location?: string;
      linkedin?: string; website?: string;
      skills?: Array<{ name: string; level: number }>;
      experience?: Array<{ title: string; company: string; period: string; bullets: string[] }>;
      education?: Array<{ degree: string; school: string; detail: string }>;
      tools?: string[];
      languages?: Array<{ name: string; level: number }>;
    }

    // Generate a simple text representation for DOCX
    let text = ''
    text += `${rd.name || ''}\n`
    text += `${rd.title || ''}\n\n`
    
    if (rd.bio) text += `${rd.bio}\n\n`
    
    text += `Contact Information\n`
    if (rd.email) text += `Email: ${rd.email}\n`
    if (rd.phone) text += `Phone: ${rd.phone}\n`
    if (rd.location) text += `Location: ${rd.location}\n`
    if (rd.linkedin) text += `LinkedIn: ${rd.linkedin}\n`
    if (rd.website) text += `Website: ${rd.website}\n`
    text += '\n'

    if (rd.experience && rd.experience.length > 0) {
      text += `Experience\n${'='.repeat(40)}\n\n`
      rd.experience.forEach((exp) => {
        text += `${exp.title}\n`
        text += `${exp.company} | ${exp.period}\n`
        exp.bullets.forEach((b) => {
          text += `  • ${b}\n`
        })
        text += '\n'
      })
    }

    if (rd.skills && rd.skills.length > 0) {
      text += `Skills\n${'='.repeat(40)}\n\n`
      rd.skills.forEach((s) => {
        text += `${s.name} - ${s.level}%\n`
      })
      text += '\n'
    }

    if (rd.education && rd.education.length > 0) {
      text += `Education\n${'='.repeat(40)}\n\n`
      rd.education.forEach((edu) => {
        text += `${edu.degree}\n${edu.school}\n`
        if (edu.detail) text += `${edu.detail}\n`
        text += '\n'
      })
    }

    if (rd.tools && rd.tools.length > 0) {
      text += `Tools\n${'='.repeat(40)}\n\n`
      text += rd.tools.join(', ') + '\n\n'
    }

    if (rd.languages && rd.languages.length > 0) {
      text += `Languages\n${'='.repeat(40)}\n\n`
      rd.languages.forEach((l) => {
        const levels = ['', 'Basic', 'Intermediate', 'Advanced', 'Fluent', 'Native']
        text += `${l.name} - ${levels[l.level] || 'Basic'}\n`
      })
    }

    return new NextResponse(text, {
      headers: {
        'Content-Type': 'text/plain',
        'Content-Disposition': `attachment; filename="${rd.name || 'resume'}_resume.txt"`,
      },
    })
  } catch (error) {
    console.error('DOCX export error:', error)
    return NextResponse.json({ error: 'Failed to generate document' }, { status: 500 })
  }
}
