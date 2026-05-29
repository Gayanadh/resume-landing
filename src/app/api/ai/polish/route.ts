import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text, context } = body

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 })
    }

    // Use z-ai-web-dev-sdk for AI polish
    const ZAI = (await import('z-ai-web-dev-sdk')).default
    const zai = await ZAI.create()
    
    const systemPrompt = `You are a professional resume text polisher. Your job is to improve and optimize resume text to be more impactful, professional, and ATS-friendly.

Rules:
- Use the XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]"
- Start with strong action verbs
- Quantify results where possible
- Keep it concise and impactful
- Only return the polished text, no explanations
- Context: ${context || 'resume'}`

    const response = await zai.chat.completions.create({
      model: 'default',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Polish this resume text: "${text}"` },
      ],
    })

    const polished = response.choices?.[0]?.message?.content || text

    return NextResponse.json({ polished })
  } catch (error) {
    console.error('AI Polish error:', error)
    // Return a basic improvement as fallback
    return NextResponse.json({
      polished: `${text.charAt(0).toUpperCase() + text.slice(1)}`,
    })
  }
}
