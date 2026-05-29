import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { resumeData, template, format } = body

    if (!resumeData) {
      return NextResponse.json({ error: 'Resume data is required' }, { status: 400 })
    }

    // Use z-ai-web-dev-sdk for AI rebuild
    const ZAI = (await import('z-ai-web-dev-sdk')).default
    const zai = await ZAI.create()
    
    const systemPrompt = `You are a professional resume rebuilder. You take existing resume data and rebuild it with ATS-optimized language, stronger action verbs, and better structure.

Rules:
- Use the XYZ formula for all experience bullets
- Optimize all text for ATS (Applicant Tracking Systems)
- Use strong action verbs to start each bullet
- Quantify achievements where reasonable
- Keep the same general structure but improve all text
- Return a JSON object with the same structure as the input
- Only return the JSON, no explanations`

    const response = await zai.chat.completions.create({
      model: 'default',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Rebuild this resume data with ATS-optimized language: ${JSON.stringify(resumeData)}. Template: ${template || 'executive'}. Format: ${format || 'pdf'}` },
      ],
    })

    const content = response.choices?.[0]?.message?.content

    try {
      // Try to parse as JSON
      const rebuilt = JSON.parse(content || '{}')
      return NextResponse.json({ resumeData: rebuilt })
    } catch {
      // If parsing fails, return original with minor improvements
      return NextResponse.json({ resumeData })
    }
  } catch (error) {
    console.error('AI Rebuild error:', error)
    return NextResponse.json({ resumeData: body.resumeData })
  }
}
