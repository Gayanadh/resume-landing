import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('resume') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const fileName = file.name.toLowerCase()
    let extractedText = ''

    if (fileName.endsWith('.txt')) {
      extractedText = await file.text()
    } else if (fileName.endsWith('.docx')) {
      const buffer = await file.arrayBuffer()
      const text = new TextDecoder('utf-8', { fatal: false }).decode(new Uint8Array(buffer))
      const wttMatches = text.match(/<w:t[^>]*>([^<]+)<\/w:t>/g)
      if (wttMatches) {
        extractedText = wttMatches
          .map((m) => {
            const content = m.match(/<w:t[^>]*>([^<]+)<\/w:t>/)
            return content ? content[1] : ''
          })
          .join(' ')
      }
      if (!extractedText.trim()) {
        extractedText = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, ' ').replace(/\s+/g, ' ').trim()
      }
    } else if (fileName.endsWith('.pdf')) {
      const buffer = await file.arrayBuffer()
      const text = new TextDecoder('utf-8', { fatal: false }).decode(new Uint8Array(buffer))
      const tjMatches = text.match(/\(([^)]+)\)\s*Tj/g)
      const tjArrayMatches = text.match(/\[([^\]]+)\]\s*TJ/g)
      let pdfText = ''
      if (tjMatches) {
        pdfText += tjMatches.map((m) => { const c = m.match(/\(([^)]+)\)/); return c ? c[1] : '' }).join(' ')
      }
      if (tjArrayMatches) {
        pdfText += ' ' + tjArrayMatches.map((m) => { const parts = m.match(/\(([^)]+)\)/g); return parts ? parts.map((p) => p.slice(1, -1)).join(' ') : '' }).join(' ')
      }
      extractedText = pdfText || text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, ' ').replace(/\s+/g, ' ').trim()
    } else {
      try { extractedText = await file.text() } catch { extractedText = '' }
    }

    if (!extractedText.trim()) {
      return NextResponse.json({
        parsed: { name: '', title: '', bio: '', email: '', phone: '', location: '', linkedin: '', website: '', skills: [], experience: [], education: [], tools: [], languages: [] },
        rawText: '',
        warning: 'Could not extract text from this file. Try uploading a .txt or .docx file for better results.',
      })
    }

    // Use AI to parse the extracted text into structured resume data
    try {
      const { zAI } = await import('z-ai-web-dev-sdk')

      const parsePrompt = `You are a resume parser. Extract the following information from this resume text and return it as a JSON object with exactly these fields:

{
  "name": "Full Name",
  "title": "Professional Title/Role",
  "bio": "Professional summary/objective",
  "email": "Email address",
  "phone": "Phone number",
  "location": "City, State/Country",
  "linkedin": "LinkedIn URL or username",
  "website": "Website URL",
  "skills": [{"name": "Skill Name", "level": 75}],
  "experience": [{"title": "Job Title", "company": "Company Name", "period": "2020 - Present", "bullets": ["Achievement 1", "Achievement 2"]}],
  "education": [{"degree": "Degree Name", "school": "School Name", "detail": "Details/GPA/Honors"}],
  "tools": ["Tool1", "Tool2"],
  "languages": [{"name": "Language", "level": 3}]
}

Language level: 1=Basic, 2=Intermediate, 3=Advanced, 4=Fluent, 5=Native
Skill level: 0-100 percentage

IMPORTANT: Return ONLY valid JSON, no markdown code blocks, no explanation.

Resume text:
${extractedText.substring(0, 4000)}`

      const response = await zAI.chat.completions.create({
        model: 'default',
        messages: [
          { role: 'system', content: 'You are a resume parser that returns only valid JSON. No markdown, no code blocks, just raw JSON.' },
          { role: 'user', content: parsePrompt },
        ],
      })

      const aiContent = response.choices?.[0]?.message?.content || ''
      let cleanJson = aiContent.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim()

      try {
        const parsed = JSON.parse(cleanJson)
        return NextResponse.json({ parsed, rawText: extractedText.substring(0, 500) })
      } catch {
        const jsonMatch = cleanJson.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          try {
            const parsed = JSON.parse(jsonMatch[0])
            return NextResponse.json({ parsed, rawText: extractedText.substring(0, 500) })
          } catch {
            // JSON parse still failed
          }
        }
        return NextResponse.json({
          parsed: { name: '', title: '', bio: extractedText.substring(0, 300), email: '', phone: '', location: '', linkedin: '', website: '', skills: [], experience: [], education: [], tools: [], languages: [] },
          rawText: extractedText.substring(0, 500),
          warning: 'AI could not structure the resume. The raw text has been added to the summary.',
        })
      }
    } catch (aiError) {
      console.error('AI parse error:', aiError)

      // Fallback: basic regex extraction without AI
      const emailMatch = extractedText.match(/[\w.-]+@[\w.-]+\.\w+/)
      const phoneMatch = extractedText.match(/[\+]?[\d\s\-\(\)]{7,15}/)

      return NextResponse.json({
        parsed: {
          name: '', title: '', bio: extractedText.substring(0, 300),
          email: emailMatch?.[0] || '', phone: phoneMatch?.[0] || '',
          location: '', linkedin: '', website: '',
          skills: [], experience: [], education: [], tools: [], languages: [],
        },
        rawText: extractedText.substring(0, 500),
        warning: 'AI parsing unavailable. Basic extraction was performed. You can manually fill in the remaining fields.',
      })
    }
  } catch (error) {
    console.error('Parse error:', error)
    return NextResponse.json({ error: 'Failed to parse resume' }, { status: 500 })
  }
}
