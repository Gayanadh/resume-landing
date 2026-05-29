'use client'

import { useResumeStore } from '@/lib/resume-store'
import { getInitials, getLanguageLevelLabel } from '@/lib/resume-utils'

export function ResumePreview() {
  const { resumeData, template, accentColor, fontFamily, fontSize, spacing } = useResumeStore()
  const { name, title, bio, email, phone, location, linkedin, website, skills, experience, education, tools, languages } = resumeData

  const style: React.CSSProperties = {
    '--resume-accent': accentColor,
    fontFamily: fontFamily === 'Inter' ? 'Inter, system-ui, sans-serif' :
                fontFamily === 'Manrope' ? 'Manrope, system-ui, sans-serif' :
                fontFamily === 'Georgia' ? 'Georgia, serif' :
                'Playfair Display, Georgia, serif',
    fontSize: `${fontSize}px`,
    lineHeight: 1.5,
  } as React.CSSProperties

  const gapStyle = { marginBottom: `${spacing}px` }

  if (template === 'executive') {
    return (
      <div style={style} className="resume-page bg-white text-gray-900 shadow-xl rounded-sm">
        {/* Executive Header */}
        <div
          className="px-8 pt-8 pb-6 text-white"
          style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)` }}
        >
          <div className="flex items-start gap-5">
            <div
              className="w-20 h-20 rounded-full border-3 border-white/30 flex items-center justify-center shrink-0 text-2xl font-bold"
              style={{ background: `${accentColor}99` }}
            >
              {getInitials(name)}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold tracking-tight">{name || 'Your Name'}</h1>
              <p className="text-base mt-0.5 opacity-90">{title || 'Professional Title'}</p>
              <p className="text-sm mt-2 opacity-80 leading-relaxed max-w-lg">{bio}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {email && <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full">{email}</span>}
            {phone && <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full">{phone}</span>}
            {location && <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full">{location}</span>}
            {linkedin && <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full">{linkedin}</span>}
            {website && <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full">{website}</span>}
          </div>
        </div>

        {/* Two-column body */}
        <div className="px-8 py-6 flex gap-8">
          {/* Left column */}
          <div className="flex-1 min-w-0">
            {/* Experience */}
            {experience.length > 0 && (
              <div style={gapStyle}>
                <h2 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: accentColor }}>
                  Experience
                </h2>
                <div className="space-y-4">
                  {experience.map((exp, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-sm">{exp.title}</h3>
                        <span className="text-xs text-gray-500 shrink-0 ml-2">{exp.period}</span>
                      </div>
                      <p className="text-xs text-gray-600">{exp.company}</p>
                      <ul className="mt-1.5 space-y-0.5">
                        {exp.bullets.map((b, j) => (
                          <li key={j} className="text-xs text-gray-700 pl-3 relative before:content-[''] before:absolute before:left-0 before:top-[6px] before:w-1.5 before:h-1.5 before:rounded-full" style={{ '--dot-color': accentColor } as React.CSSProperties}>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div style={gapStyle}>
                <h2 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: accentColor }}>
                  Education
                </h2>
                <div className="space-y-3">
                  {education.map((edu, i) => (
                    <div key={i}>
                      <h3 className="font-semibold text-sm">{edu.degree}</h3>
                      <p className="text-xs text-gray-600">{edu.school}</p>
                      {edu.detail && <p className="text-xs text-gray-500">{edu.detail}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right column */}
          <div className="w-44 shrink-0">
            {/* Skills */}
            {skills.length > 0 && (
              <div style={gapStyle}>
                <h2 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: accentColor }}>
                  Skills
                </h2>
                <div className="space-y-2.5">
                  {skills.map((skill, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-gray-500">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${skill.level}%`, background: accentColor }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tools */}
            {tools.length > 0 && (
              <div style={gapStyle}>
                <h2 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: accentColor }}>
                  Tools
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {tools.map((tool, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-full border"
                      style={{ borderColor: `${accentColor}40`, color: accentColor, background: `${accentColor}10` }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <div style={gapStyle}>
                <h2 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: accentColor }}>
                  Languages
                </h2>
                <div className="space-y-2">
                  {languages.map((lang, i) => (
                    <div key={i} className="flex justify-between text-xs">
                      <span className="font-medium">{lang.name}</span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <div
                            key={j}
                            className="w-2 h-2 rounded-full"
                            style={{
                              background: j < lang.level ? accentColor : '#e5e7eb',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (template === 'modern') {
    return (
      <div style={style} className="resume-page bg-white text-gray-900 shadow-xl rounded-sm flex">
        {/* Left Sidebar */}
        <div className="w-[35%] bg-gray-50 px-6 py-8 shrink-0">
          {/* Photo */}
          <div
            className="w-24 h-24 rounded-full mx-auto flex items-center justify-center text-xl font-bold mb-4"
            style={{ background: accentColor, color: 'white' }}
          >
            {getInitials(name)}
          </div>
          <h2 className="text-lg font-bold text-center">{name || 'Your Name'}</h2>
          <p className="text-xs text-gray-500 text-center mt-0.5">{title}</p>

          {/* Contact */}
          <div style={gapStyle} className="mt-6">
            <h3 className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: accentColor }}>
              Contact
            </h3>
            <div className="space-y-1.5 text-xs text-gray-600">
              {email && <p>{email}</p>}
              {phone && <p>{phone}</p>}
              {location && <p>{location}</p>}
              {linkedin && <p>{linkedin}</p>}
              {website && <p>{website}</p>}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div style={gapStyle} className="mt-5">
              <h3 className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: accentColor }}>
                Skills
              </h3>
              <div className="space-y-2">
                {skills.map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[10px] mb-0.5">
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${skill.level}%`, background: accentColor }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tools */}
          {tools.length > 0 && (
            <div style={gapStyle} className="mt-5">
              <h3 className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: accentColor }}>
                Tools
              </h3>
              <div className="flex flex-wrap gap-1">
                {tools.map((tool, i) => (
                  <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-gray-200 text-gray-700">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div style={gapStyle} className="mt-5">
              <h3 className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: accentColor }}>
                Languages
              </h3>
              <div className="space-y-1.5">
                {languages.map((lang, i) => (
                  <div key={i} className="flex items-center justify-between text-[10px]">
                    <span className="font-medium">{lang.name}</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <div
                          key={j}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: j < lang.level ? accentColor : '#d1d5db' }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="flex-1 px-7 py-8 min-w-0">
          {bio && (
            <div style={gapStyle}>
              <h3 className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: accentColor }}>
                About Me
              </h3>
              <p className="text-xs text-gray-700 leading-relaxed">{bio}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div style={gapStyle} className="mt-5">
              <h3 className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: accentColor }}>
                Experience
              </h3>
              <div className="space-y-4">
                {experience.map((exp, i) => (
                  <div key={i}>
                    <h4 className="font-semibold text-sm">{exp.title}</h4>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{exp.company}</span>
                      <span>{exp.period}</span>
                    </div>
                    <ul className="mt-1.5 space-y-0.5">
                      {exp.bullets.map((b, j) => (
                        <li key={j} className="text-xs text-gray-700 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-gray-400">
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div style={gapStyle} className="mt-5">
              <h3 className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: accentColor }}>
                Education
              </h3>
              <div className="space-y-2">
                {education.map((edu, i) => (
                  <div key={i}>
                    <h4 className="font-semibold text-sm">{edu.degree}</h4>
                    <p className="text-xs text-gray-600">{edu.school}</p>
                    {edu.detail && <p className="text-xs text-gray-500">{edu.detail}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (template === 'elegant') {
    return (
      <div style={style} className="resume-page bg-white text-gray-900 shadow-xl rounded-sm px-10 py-8">
        {/* Centered Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-wide" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            {name || 'Your Name'}
          </h1>
          <div className="flex items-center justify-center gap-3 my-2">
            <div className="h-px flex-1 max-w-16" style={{ background: accentColor }} />
            <p className="text-sm tracking-widest uppercase" style={{ color: accentColor }}>{title}</p>
            <div className="h-px flex-1 max-w-16" style={{ background: accentColor }} />
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-gray-500 mt-2">
            {email && <span>{email}</span>}
            {phone && <span>{phone}</span>}
            {location && <span>{location}</span>}
            {linkedin && <span>{linkedin}</span>}
            {website && <span>{website}</span>}
          </div>
        </div>

        {bio && (
          <div style={gapStyle} className="mt-5 text-center">
            <p className="text-xs text-gray-600 leading-relaxed max-w-lg mx-auto">{bio}</p>
          </div>
        )}

        <div className="h-px my-5" style={{ background: accentColor, opacity: 0.3 }} />

        {/* Experience */}
        {experience.length > 0 && (
          <div style={gapStyle}>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-center mb-4" style={{ color: accentColor, fontFamily: 'Playfair Display, Georgia, serif' }}>
              Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp, i) => (
                <div key={i}>
                  <div className="text-center">
                    <h3 className="font-semibold text-sm">{exp.title}</h3>
                    <p className="text-xs" style={{ color: accentColor }}>{exp.company} · {exp.period}</p>
                  </div>
                  <ul className="mt-2 space-y-1 text-center">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="text-xs text-gray-700">{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="h-px my-5" style={{ background: accentColor, opacity: 0.3 }} />

        {/* Skills */}
        {skills.length > 0 && (
          <div style={gapStyle}>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-center mb-3" style={{ color: accentColor, fontFamily: 'Playfair Display, Georgia, serif' }}>
              Skills
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {skills.map((skill, i) => (
                <span key={i} className="text-xs px-3 py-1 rounded-full border" style={{ borderColor: accentColor, color: accentColor }}>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="h-px my-5" style={{ background: accentColor, opacity: 0.3 }} />

        {/* Education */}
        {education.length > 0 && (
          <div style={gapStyle}>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-center mb-3" style={{ color: accentColor, fontFamily: 'Playfair Display, Georgia, serif' }}>
              Education
            </h2>
            <div className="space-y-2 text-center">
              {education.map((edu, i) => (
                <div key={i}>
                  <h3 className="font-semibold text-sm">{edu.degree}</h3>
                  <p className="text-xs text-gray-600">{edu.school}</p>
                  {edu.detail && <p className="text-xs text-gray-500">{edu.detail}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="h-px my-5" style={{ background: accentColor, opacity: 0.3 }} />

        {/* Tools */}
        {tools.length > 0 && (
          <div style={gapStyle}>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-center mb-3" style={{ color: accentColor, fontFamily: 'Playfair Display, Georgia, serif' }}>
              Tools
            </h2>
            <div className="flex flex-wrap justify-center gap-1.5">
              {tools.map((tool, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded border border-gray-300 text-gray-600">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div style={gapStyle} className="mt-5">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-center mb-3" style={{ color: accentColor, fontFamily: 'Playfair Display, Georgia, serif' }}>
              Languages
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {languages.map((lang, i) => (
                <span key={i} className="text-xs text-gray-600">
                  {lang.name} · <span style={{ color: accentColor }}>{getLanguageLevelLabel(lang.level)}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Clean template (default)
  return (
    <div style={style} className="resume-page bg-white text-gray-900 shadow-xl rounded-sm px-8 py-8">
      {/* Header */}
      <div className="mb-1">
        <h1 className="text-2xl font-bold">{name || 'Your Name'}</h1>
        <p className="text-sm mt-0.5" style={{ color: accentColor }}>{title}</p>
      </div>
      <div className="h-0.5 w-12 mb-4" style={{ background: accentColor }} />
      <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-gray-500 mb-5">
        {email && <span>{email}</span>}
        {phone && <span>{phone}</span>}
        {location && <span>{location}</span>}
        {linkedin && <span>{linkedin}</span>}
        {website && <span>{website}</span>}
      </div>

      {bio && (
        <div style={gapStyle}>
          <p className="text-xs text-gray-700 leading-relaxed">{bio}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div style={gapStyle}>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: accentColor }}>
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-sm">{exp.title}</h3>
                  <span className="text-xs text-gray-400">{exp.period}</span>
                </div>
                <p className="text-xs text-gray-500">{exp.company}</p>
                <ul className="mt-1 space-y-0.5">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="text-xs text-gray-700 pl-3 relative before:content-['–'] before:absolute before:left-0 before:text-gray-400">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div style={gapStyle}>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: accentColor }}>
            Skills
          </h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            {skills.map((skill, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-xs font-medium min-w-0 shrink">{skill.name}</span>
                <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${skill.level}%`, background: accentColor }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={gapStyle}>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: accentColor }}>
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu, i) => (
              <div key={i} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-semibold text-sm">{edu.degree}</h3>
                  <p className="text-xs text-gray-600">{edu.school}</p>
                </div>
                {edu.detail && <span className="text-xs text-gray-400">{edu.detail}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tools */}
      {tools.length > 0 && (
        <div style={gapStyle}>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: accentColor }}>
            Tools
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {tools.map((tool, i) => (
              <span key={i} className="text-[10px] px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700">
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div style={gapStyle}>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: accentColor }}>
            Languages
          </h2>
          <div className="flex flex-wrap gap-4">
            {languages.map((lang, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span className="font-medium">{lang.name}</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div
                      key={j}
                      className="w-2 h-2 rounded-full"
                      style={{ background: j < lang.level ? accentColor : '#e5e7eb' }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
