import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages } = body

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 })
    }

    // Use z-ai-web-dev-sdk for AI chat
    const { zAI } = await import('z-ai-web-dev-sdk')
    
    const systemPrompt = `You are a professional resume writing assistant called ResumePro AI. You help users:
1. Write compelling professional summaries
2. Improve and optimize experience bullet points using the XYZ formula (Accomplished [X] as measured by [Y], by doing [Z])
3. Suggest relevant skills based on job roles
4. Tailor resumes for specific job descriptions
5. Provide ATS optimization tips
6. Help with cover letter writing

Keep your responses concise, actionable, and professional. Use specific examples when possible.
Format your responses with bullet points when listing suggestions.`

    const response = await zAI.chat.completions.create({
      model: 'default',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map((m: { role: string; content: string }) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
      ],
    })

    const message = response.choices?.[0]?.message?.content || 'I apologize, I couldn\'t generate a response. Please try again.'

    return NextResponse.json({ message })
  } catch (error) {
    console.error('AI Chat error:', error)
    // Return a helpful fallback message
    return NextResponse.json({
      message: 'I\'m currently experiencing high demand. Here are some general tips:\n\n• Use the XYZ formula for experience bullets: "Accomplished [X] as measured by [Y], by doing [Z]"\n• Start each bullet with a strong action verb\n• Quantify achievements with numbers and percentages\n• Tailor your skills section to match the job description\n• Keep your summary to 2-3 impactful sentences',
    })
  }
}
