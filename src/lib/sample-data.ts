import { ResumeData } from './resume-store'

export const sampleResumes: Array<{
  id: string
  title: string
  industry: string
  template: string
  data: ResumeData
}> = [
  {
    id: 'example-software-engineer',
    title: 'Software Engineer',
    industry: 'Technology',
    template: 'executive',
    data: {
      name: 'Alex Chen',
      title: 'Senior Software Engineer',
      bio: 'Full-stack engineer with 7+ years building scalable web applications and distributed systems. Passionate about clean code, performance optimization, and mentoring junior developers.',
      email: 'alex.chen@email.com',
      phone: '+1 (555) 123-4567',
      location: 'Seattle, WA',
      linkedin: 'linkedin.com/in/alexchen',
      website: 'alexchen.dev',
      skills: [
        { name: 'React/Next.js', level: 92 },
        { name: 'TypeScript', level: 90 },
        { name: 'Node.js', level: 88 },
        { name: 'Python', level: 85 },
        { name: 'AWS', level: 82 },
        { name: 'System Design', level: 80 },
      ],
      experience: [
        {
          title: 'Senior Software Engineer',
          company: 'CloudScale Inc.',
          period: '2020 - Present',
          bullets: [
            'Architected microservices handling 50M+ daily requests with 99.99% uptime',
            'Led migration from monolith to microservices, reducing deployment time by 70%',
            'Mentored team of 5 engineers and established code review best practices',
            'Implemented CI/CD pipelines reducing release cycle from 2 weeks to 2 days',
          ],
        },
        {
          title: 'Software Engineer',
          company: 'DataFlow Systems',
          period: '2017 - 2020',
          bullets: [
            'Built real-time data processing pipeline handling 1M+ events per second',
            'Developed RESTful APIs serving 10K+ concurrent users',
            'Optimized database queries resulting in 60% performance improvement',
          ],
        },
      ],
      education: [
        {
          degree: 'MS Computer Science',
          school: 'University of Washington',
          detail: 'Focus on Distributed Systems, GPA 3.9',
        },
        {
          degree: 'BS Computer Science',
          school: 'UC Berkeley',
          detail: 'Dean\'s List, graduated with honors',
        },
      ],
      tools: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis', 'GraphQL'],
      languages: [
        { name: 'English', level: 5 },
        { name: 'Mandarin', level: 5 },
      ],
    },
  },
  {
    id: 'example-product-designer',
    title: 'Product Designer',
    industry: 'Design',
    template: 'modern',
    data: {
      name: 'Olivia Rhye',
      title: 'Senior Product Designer',
      bio: 'Passionate product designer with 8+ years of experience creating intuitive digital experiences. Specialized in user-centered design, design systems, and cross-functional collaboration.',
      email: 'olivia.rhye@email.com',
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/oliviarhye',
      website: 'oliviarhye.design',
      skills: [
        { name: 'UI/UX Design', level: 95 },
        { name: 'Design Systems', level: 90 },
        { name: 'Prototyping', level: 85 },
        { name: 'User Research', level: 88 },
        { name: 'Figma', level: 95 },
        { name: 'Visual Design', level: 87 },
      ],
      experience: [
        {
          title: 'Senior Product Designer',
          company: 'TechCorp Inc.',
          period: '2021 - Present',
          bullets: [
            'Led the redesign of the core product, resulting in a 40% increase in user engagement',
            'Built and maintained a comprehensive design system used across 12 product teams',
            'Mentored 4 junior designers and established design review processes',
          ],
        },
        {
          title: 'Product Designer',
          company: 'StartupXYZ',
          period: '2018 - 2021',
          bullets: [
            'Designed end-to-end user experience for mobile app from 0 to 1',
            'Conducted user research sessions that informed key product decisions',
            'Reduced onboarding drop-off by 35% through iterative design improvements',
          ],
        },
      ],
      education: [
        {
          degree: 'BFA in Graphic Design',
          school: 'California College of the Arts',
          detail: 'Graduated with Honors',
        },
      ],
      tools: ['Figma', 'Sketch', 'Adobe XD', 'InVision', 'Principle', 'Framer', 'Photoshop', 'Illustrator'],
      languages: [
        { name: 'English', level: 5 },
        { name: 'Spanish', level: 3 },
      ],
    },
  },
  {
    id: 'example-marketing-manager',
    title: 'Marketing Manager',
    industry: 'Marketing',
    template: 'elegant',
    data: {
      name: 'Sarah Mitchell',
      title: 'Digital Marketing Manager',
      bio: 'Results-driven marketing professional with 6+ years of experience in digital marketing strategy, brand management, and data-driven campaign optimization. Proven track record of increasing brand awareness and driving revenue growth.',
      email: 'sarah.mitchell@email.com',
      phone: '+1 (555) 345-6789',
      location: 'New York, NY',
      linkedin: 'linkedin.com/in/sarahmitchell',
      website: 'sarahmitchell.co',
      skills: [
        { name: 'Digital Marketing', level: 92 },
        { name: 'SEO/SEM', level: 88 },
        { name: 'Content Strategy', level: 90 },
        { name: 'Analytics', level: 85 },
        { name: 'Social Media', level: 87 },
        { name: 'Brand Management', level: 82 },
      ],
      experience: [
        {
          title: 'Digital Marketing Manager',
          company: 'GrowthHub Agency',
          period: '2020 - Present',
          bullets: [
            'Managed $2M+ annual ad budget across Google, Meta, and LinkedIn platforms',
            'Increased organic traffic by 150% through SEO strategy implementation',
            'Led rebranding initiative resulting in 30% improvement in brand recall',
            'Built and managed team of 6 marketing specialists',
          ],
        },
        {
          title: 'Marketing Specialist',
          company: 'BrandForce Co.',
          period: '2017 - 2020',
          bullets: [
            'Executed multi-channel campaigns driving 200% increase in lead generation',
            'Managed social media presence growing followers from 10K to 100K',
            'Created content calendar and editorial guidelines for the team',
          ],
        },
      ],
      education: [
        {
          degree: 'MBA in Marketing',
          school: 'NYU Stern School of Business',
          detail: 'Marketing Analytics concentration',
        },
        {
          degree: 'BA in Communications',
          school: 'University of Michigan',
          detail: 'Cum Laude',
        },
      ],
      tools: ['Google Analytics', 'HubSpot', 'SEMrush', 'Mailchimp', 'Hootsuite', 'Canva', 'Salesforce', 'Tableau'],
      languages: [
        { name: 'English', level: 5 },
        { name: 'French', level: 3 },
      ],
    },
  },
  {
    id: 'example-data-scientist',
    title: 'Data Scientist',
    industry: 'Data Science',
    template: 'clean',
    data: {
      name: 'James Park',
      title: 'Senior Data Scientist',
      bio: 'Data scientist specializing in machine learning and statistical modeling with 5+ years of experience turning data into actionable business insights. Expert in building predictive models and deploying ML systems at scale.',
      email: 'james.park@email.com',
      phone: '+1 (555) 456-7890',
      location: 'Austin, TX',
      linkedin: 'linkedin.com/in/jamespark',
      website: 'jamespark-ml.io',
      skills: [
        { name: 'Machine Learning', level: 93 },
        { name: 'Python/R', level: 90 },
        { name: 'Deep Learning', level: 85 },
        { name: 'Statistical Analysis', level: 88 },
        { name: 'SQL', level: 87 },
        { name: 'Data Visualization', level: 82 },
      ],
      experience: [
        {
          title: 'Senior Data Scientist',
          company: 'AI Dynamics',
          period: '2021 - Present',
          bullets: [
            'Developed recommendation engine increasing user engagement by 45%',
            'Built fraud detection model with 98.5% accuracy saving $3M annually',
            'Led data science team of 4 in building ML infrastructure',
            'Published 2 papers in top-tier ML conferences',
          ],
        },
        {
          title: 'Data Scientist',
          company: 'InsightTech',
          period: '2019 - 2021',
          bullets: [
            'Created churn prediction model reducing customer attrition by 25%',
            'Automated reporting pipelines saving 20 hours per week',
            'Designed A/B testing framework for product experiments',
          ],
        },
      ],
      education: [
        {
          degree: 'PhD in Statistics',
          school: 'Stanford University',
          detail: 'Dissertation on Bayesian Deep Learning',
        },
        {
          degree: 'BS in Mathematics',
          school: 'MIT',
          detail: 'Graduated Summa Cum Laude',
        },
      ],
      tools: ['Python', 'R', 'TensorFlow', 'PyTorch', 'SQL', 'Spark', 'Tableau', 'Jupyter', 'Git', 'Docker'],
      languages: [
        { name: 'English', level: 5 },
        { name: 'Korean', level: 5 },
      ],
    },
  },
  {
    id: 'example-project-manager',
    title: 'Project Manager',
    industry: 'Management',
    template: 'executive',
    data: {
      name: 'Maria Rodriguez',
      title: 'Senior Project Manager',
      bio: 'PMP-certified project manager with 9+ years of experience leading cross-functional teams in delivering complex technology projects on time and under budget. Expert in Agile methodologies and stakeholder management.',
      email: 'maria.rodriguez@email.com',
      phone: '+1 (555) 567-8901',
      location: 'Chicago, IL',
      linkedin: 'linkedin.com/in/mariarodriguez',
      website: '',
      skills: [
        { name: 'Project Management', level: 95 },
        { name: 'Agile/Scrum', level: 92 },
        { name: 'Risk Management', level: 88 },
        { name: 'Stakeholder Management', level: 90 },
        { name: 'Budget Planning', level: 85 },
        { name: 'Team Leadership', level: 93 },
      ],
      experience: [
        {
          title: 'Senior Project Manager',
          company: 'Enterprise Solutions Ltd.',
          period: '2019 - Present',
          bullets: [
            'Managed portfolio of 8 concurrent projects with total budget of $15M+',
            'Delivered 95% of projects on time and within budget over 3 years',
            'Implemented Agile transformation across 3 departments',
            'Reduced project delivery timeline by 30% through process optimization',
          ],
        },
        {
          title: 'Project Manager',
          company: 'TechBridge Corp.',
          period: '2016 - 2019',
          bullets: [
            'Led cross-functional teams of 15+ members across 4 time zones',
            'Established project management office (PMO) best practices',
            'Managed vendor relationships and negotiated $2M in cost savings',
          ],
        },
      ],
      education: [
        {
          degree: 'MBA',
          school: 'Northwestern Kellogg',
          detail: 'Operations Management focus',
        },
        {
          degree: 'BS in Industrial Engineering',
          school: 'Georgia Tech',
          detail: 'Graduated with Honors',
        },
      ],
      tools: ['Jira', 'Confluence', 'MS Project', 'Asana', 'Slack', 'Salesforce', 'Tableau', 'Miro'],
      languages: [
        { name: 'English', level: 5 },
        { name: 'Spanish', level: 5 },
        { name: 'Portuguese', level: 3 },
      ],
    },
  },
  {
    id: 'example-financial-analyst',
    title: 'Financial Analyst',
    industry: 'Finance',
    template: 'modern',
    data: {
      name: 'David Kim',
      title: 'Senior Financial Analyst',
      bio: 'Detail-oriented financial analyst with 7+ years of experience in financial modeling, forecasting, and strategic planning. CFA Level III candidate with strong expertise in data-driven decision making.',
      email: 'david.kim@email.com',
      phone: '+1 (555) 678-9012',
      location: 'Boston, MA',
      linkedin: 'linkedin.com/in/davidkim',
      website: '',
      skills: [
        { name: 'Financial Modeling', level: 93 },
        { name: 'Data Analysis', level: 90 },
        { name: 'Forecasting', level: 88 },
        { name: 'Excel/VBA', level: 92 },
        { name: 'Valuation', level: 85 },
        { name: 'Risk Assessment', level: 87 },
      ],
      experience: [
        {
          title: 'Senior Financial Analyst',
          company: 'Capital Partners Group',
          period: '2020 - Present',
          bullets: [
            'Built financial models for M&A deals valued at $500M+',
            'Developed automated reporting dashboard saving 40 hours monthly',
            'Led quarterly forecasting with 95% accuracy rate',
            'Presented investment recommendations to C-suite stakeholders',
          ],
        },
        {
          title: 'Financial Analyst',
          company: 'Meridian Investments',
          period: '2017 - 2020',
          bullets: [
            'Conducted valuations for 30+ companies across various industries',
            'Created portfolio risk assessment models reducing exposure by 20%',
            'Prepared investor presentations and quarterly reports',
          ],
        },
      ],
      education: [
        {
          degree: 'MS Finance',
          school: 'MIT Sloan School of Management',
          detail: 'Quantitative Finance concentration',
        },
        {
          degree: 'BS Economics',
          school: 'UC Berkeley',
          detail: 'Magna Cum Laude',
        },
      ],
      tools: ['Excel', 'Bloomberg Terminal', 'Python', 'SQL', 'Tableau', 'Power BI', 'SAP', 'QuickBooks'],
      languages: [
        { name: 'English', level: 5 },
        { name: 'Korean', level: 4 },
      ],
    },
  },
]
