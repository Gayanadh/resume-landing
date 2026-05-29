import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { resumeData, template } = body

    if (!resumeData) {
      return NextResponse.json({ error: 'Resume data is required' }, { status: 400 })
    }

    // Return the resume HTML that can be printed as PDF from the client
    const accentColor = resumeData.accentColor || '#6366F1'
    
    const html = generateResumeHTML(resumeData, template, accentColor)

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    })
  } catch (error) {
    console.error('PDF export error:', error)
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 })
  }
}

function generateResumeHTML(data: Record<string, unknown>, template: string, accentColor: string): string {
  const rd = data as {
    name?: string; title?: string; bio?: string;
    email?: string; phone?: string; location?: string;
    linkedin?: string; website?: string;
    skills?: Array<{ name: string; level: number }>;
    experience?: Array<{ title: string; company: string; period: string; bullets: string[] }>;
    education?: Array<{ degree: string; school: string; detail: string }>;
    tools?: string[];
    languages?: Array<{ name: string; level: number }>;
  }

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${rd.name || 'Resume'}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', system-ui, sans-serif; font-size: 10.5pt; line-height: 1.5; color: #1a1a1a; }
  .page { max-width: 800px; margin: 0 auto; padding: 40px; }
  h1 { font-size: 24pt; font-weight: 700; }
  h2 { font-size: 10pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: ${accentColor}; margin-bottom: 8px; }
  .title { font-size: 12pt; color: ${accentColor}; }
  .contact { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; font-size: 9pt; color: #666; }
  .section { margin-bottom: 18px; }
  .exp-item { margin-bottom: 12px; }
  .exp-title { font-weight: 600; font-size: 11pt; }
  .exp-meta { font-size: 9pt; color: #666; }
  .exp-bullets { margin-top: 4px; padding-left: 16px; }
  .exp-bullets li { font-size: 10pt; margin-bottom: 2px; }
  .skill-bar { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
  .skill-name { font-size: 10pt; min-width: 120px; }
  .skill-track { flex: 1; height: 6px; background: #eee; border-radius: 3px; }
  .skill-fill { height: 100%; border-radius: 3px; background: ${accentColor}; }
  .tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .tag { font-size: 9pt; padding: 2px 10px; border-radius: 12px; background: #f3f4f6; }
  .lang-dots { display: flex; gap: 3px; }
  .lang-dot { width: 8px; height: 8px; border-radius: 50%; }
  .lang-dot.active { background: ${accentColor}; }
  .lang-dot.inactive { background: #e5e7eb; }
  @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
</style>
</head>
<body>
<div class="page">
  <h1>${rd.name || ''}</h1>
  <div class="title">${rd.title || ''}</div>
  ${rd.bio ? `<p style="margin-top: 8px; font-size: 10pt; color: #444; max-width: 600px;">${rd.bio}</p>` : ''}
  <div class="contact">
    ${rd.email ? `<span>${rd.email}</span>` : ''}
    ${rd.phone ? `<span>${rd.phone}</span>` : ''}
    ${rd.location ? `<span>${rd.location}</span>` : ''}
    ${rd.linkedin ? `<span>${rd.linkedin}</span>` : ''}
    ${rd.website ? `<span>${rd.website}</span>` : ''}
  </div>

  ${rd.experience && rd.experience.length > 0 ? `
  <div class="section">
    <h2>Experience</h2>
    ${rd.experience.map((exp) => `
    <div class="exp-item">
      <div style="display: flex; justify-content: space-between;">
        <span class="exp-title">${exp.title}</span>
        <span class="exp-meta">${exp.period}</span>
      </div>
      <div class="exp-meta">${exp.company}</div>
      <ul class="exp-bullets">
        ${(exp.bullets || []).map((b) => `<li>${b}</li>`).join('')}
      </ul>
    </div>`).join('')}
  </div>` : ''}

  ${rd.skills && rd.skills.length > 0 ? `
  <div class="section">
    <h2>Skills</h2>
    ${rd.skills.map((s) => `
    <div class="skill-bar">
      <span class="skill-name">${s.name}</span>
      <div class="skill-track"><div class="skill-fill" style="width: ${s.level}%"></div></div>
    </div>`).join('')}
  </div>` : ''}

  ${rd.education && rd.education.length > 0 ? `
  <div class="section">
    <h2>Education</h2>
    ${rd.education.map((edu) => `
    <div style="margin-bottom: 8px;">
      <div class="exp-title">${edu.degree}</div>
      <div class="exp-meta">${edu.school}</div>
      ${edu.detail ? `<div class="exp-meta">${edu.detail}</div>` : ''}
    </div>`).join('')}
  </div>` : ''}

  ${rd.tools && rd.tools.length > 0 ? `
  <div class="section">
    <h2>Tools</h2>
    <div class="tags">${rd.tools.map((t) => `<span class="tag">${t}</span>`).join('')}</div>
  </div>` : ''}

  ${rd.languages && rd.languages.length > 0 ? `
  <div class="section">
    <h2>Languages</h2>
    ${rd.languages.map((l) => `
    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; font-size: 10pt;">
      <span>${l.name}</span>
      <div class="lang-dots">
        ${[1,2,3,4,5].map((i) => `<div class="lang-dot ${i <= l.level ? 'active' : 'inactive'}"></div>`).join('')}
      </div>
    </div>`).join('')}
  </div>` : ''}
</div>
</body>
</html>`
}
