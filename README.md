# ResumePro - AI-Powered Resume Builder

A modern, full-featured resume builder application built with Next.js 16, TypeScript, Tailwind CSS, and shadcn/ui. Create professional resumes with AI assistance, multiple templates, and real-time preview.

## Features

- **Resume Editor** - WYSIWYG editor with live preview and real-time updates
- **4 Resume Templates** - Executive, Modern, Elegant, and Clean designs
- **8 Template Options** - 4 free + 4 premium template styles
- **Design Customization** - Accent colors, fonts, font size, spacing controls
- **AI Assistant** - Chat-based AI help for resume writing (powered by z-ai-web-dev-sdk)
- **AI Polish** - Automatically improve your resume bullets and summary
- **AI Rebuild** - Complete resume rewrite with ATS-optimized language
- **Cover Letters** - Dedicated cover letter editor with resume linking
- **My Resumes** - Save, organize, duplicate, rename, and delete resumes
- **File Storage** - Resumes saved to database + JSON file backups
- **Export** - PDF and DOCX export options
- **Auto-Save** - Automatic saving every 5 seconds
- **Responsive** - Full mobile support with sidebar drawer and edit sheet
- **Keyboard Shortcuts** - Ctrl+S to save, Ctrl+P to preview

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Database**: Prisma ORM (SQLite)
- **State Management**: Zustand
- **AI**: z-ai-web-dev-sdk
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/resumepro.git
cd resumepro

# Install dependencies
bun install

# Set up the database
bun run db:push

# Create resumes directory
mkdir -p resumes

# Start the development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
```

## Project Structure

```
src/
  app/
    page.tsx                    # Main app entry
    api/
      resumes/                  # Resume CRUD API
      cover-letters/            # Cover letter CRUD API
      ai/                       # AI chat, polish, rebuild endpoints
      export/                   # PDF/DOCX export endpoints
  components/
    app-shell.tsx               # Main layout with sidebar + content
    sidebar-nav.tsx             # Left sidebar navigation
    topbar.tsx                  # Top header bar
    editor/                     # Resume editor components
    templates/                  # Templates browsing page
    examples/                   # Example resumes page
    cover-letters/              # Cover letters management
    my-resumes/                 # Saved resumes management
    ai-assistant/               # AI chat interface
    settings/                   # Settings page
  lib/
    app-store.ts                # App state (Zustand)
    resume-store.ts             # Resume state (Zustand)
    templates.ts                # Template definitions
    sample-data.ts              # Sample resume data
    resume-utils.ts             # Utility functions
```

## Resume Templates

| Template | Style | Layout |
|----------|-------|--------|
| Executive | Gradient header, professional | Two-column |
| Modern | Sidebar layout, clean | Split sidebar |
| Elegant | Centered, ornamental dividers | Single column |
| Clean | Minimal, left-aligned | Single column |

## License

MIT
