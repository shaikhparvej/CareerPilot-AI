import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// Configure the Gemini API
const config = {
  apiKey:
    process.env.GOOGLE_GEMINI_API_KEY ||
    'AIzaSyDOAtf0gqqMJpu5nVaSEbutTOpK_GZN7mo',
};

console.log('Environment check:', {
  hasApiKey: !!config.apiKey,
  keyLength: config.apiKey?.length,
  keyPrefix: config.apiKey?.substring(0, 8),
  fromEnv: !!process.env.GOOGLE_GEMINI_API_KEY,
});

if (!config.apiKey) {
  console.error('GOOGLE_GEMINI_API_KEY is not set in environment variables');
} else {
  console.log('✅ GOOGLE_GEMINI_API_KEY is loaded successfully');
}

const genAI = new GoogleGenerativeAI(config.apiKey || '');

// Simple fallback generator to avoid 500s in development when API key isn't set
function getFallbackResponse(prompt: string): string {
  const p = (prompt || '').toLowerCase();

  // Career roadmap fallback (expects JSON)
  if (
    p.includes('career roadmap') ||
    (p.includes('roadmap') && p.includes('learning path'))
  ) {
    // Try to extract the role name from the prompt
    const roleMatch = /career roadmap for ["']?([^"'.]+)["']?/i.exec(
      prompt || ''
    );
    const roleName = roleMatch ? roleMatch[1].trim() : 'Software Engineer';

    return JSON.stringify({
      Role: roleName,
      'Learning Path': {
        'Beginner (0-1 years)': [
          `Learn fundamental ${roleName.toLowerCase()} concepts and basics`,
          'Complete introductory courses and tutorials',
          'Build simple projects to practice skills',
          'Join online communities and forums',
          'Get familiar with industry tools and practices',
        ],
        'Intermediate (1-3 years)': [
          'Work on more complex projects',
          'Learn advanced tools and techniques',
          'Contribute to open-source projects',
          'Seek mentorship and guidance',
          'Start specializing in specific areas',
        ],
        'Advanced (3-5 years)': [
          'Lead projects and teams',
          'Specialize in specific domains',
          'Mentor junior colleagues',
          'Stay updated with industry trends',
          'Drive technical decisions',
        ],
        'Expert (5+ years)': [
          'Become thought leader in the field',
          'Speak at conferences and events',
          'Write technical articles and blogs',
          'Drive innovation and research',
          'Shape industry standards',
        ],
      },
      'Required Skills by Level': {
        'Entry Level': [
          'Basic technical skills',
          'Communication',
          'Problem-solving',
          'Time management',
          'Teamwork',
        ],
        'Mid Level': [
          'Advanced technical expertise',
          'Leadership basics',
          'Project management',
          'Strategic thinking',
          'Cross-functional collaboration',
        ],
        'Senior Level': [
          'Domain expertise',
          'Team leadership',
          'Business acumen',
          'Innovation mindset',
          'Stakeholder management',
        ],
      },
      'Timeline and Milestones': [
        'Month 1-6: Foundation building and basic skills development',
        'Month 6-18: Practical experience and intermediate skills acquisition',
        'Year 2-3: Specialization and advanced capabilities development',
        'Year 3-5: Leadership roles and expert-level contributions',
        'Year 5+: Industry recognition and thought leadership',
      ],
      'Educational Requirements': [
        "Bachelor's degree in relevant field (Computer Science, Engineering, etc.)",
        'Relevant online courses and bootcamps',
        'Industry certifications and specialized training',
        'Continuous learning and upskilling programs',
        "Advanced degree (Master's/PhD) for senior positions",
      ],
      'Certification Paths': [
        'Technology-specific certifications (AWS, Google Cloud, Microsoft)',
        'Industry-recognized professional certifications',
        'Project management certifications (PMP, Agile)',
        'Leadership and management certifications',
        'Domain-specific specialized certifications',
      ],
      'Experience Levels': {
        'Entry Level (0-2 years)':
          'Junior roles, learning fundamentals, guided projects',
        'Mid Level (2-5 years)':
          'Independent work, moderate complexity projects, some mentoring',
        'Senior Level (5-8 years)':
          'Lead projects, mentor teams, strategic contributions',
        'Lead Level (8+ years)':
          'Organizational impact, industry leadership, innovation driving',
      },
      'Project Ideas': [
        'Personal portfolio projects to showcase skills',
        'Open-source contributions to popular repositories',
        'Industry-relevant case studies and solutions',
        'Innovation projects and research initiatives',
        'Community projects and volunteer work',
      ],
      'Networking Opportunities': [
        'Professional associations and industry societies',
        'Local meetups and user groups',
        'Industry conferences and workshops',
        'Online communities and forums (LinkedIn, Reddit, Discord)',
        'Alumni networks and mentorship programs',
      ],
      'Salary Progression': {
        'Entry Level (0-2 years)': '₹3,00,000 - ₹8,00,000 per annum',
        'Mid Level (2-5 years)': '₹8,00,000 - ₹15,00,000 per annum',
        'Senior Level (5-8 years)': '₹15,00,000 - ₹30,00,000 per annum',
        'Lead Level (8+ years)': '₹30,00,000+ per annum',
      },
      'Career Advancement Steps': [
        '1. Build strong foundational technical skills',
        '2. Gain practical experience through diverse projects',
        '3. Develop leadership and communication skills',
        '4. Stay updated with latest industry trends and technologies',
        '5. Build and maintain professional network',
        '6. Seek challenging opportunities and stretch assignments',
        '7. Consider specialization in high-demand areas',
        '8. Pursue continuous learning and skill development',
      ],
    });
  }

  // Role description fallback (expects JSON)
  if (
    p.includes('describe the role') ||
    (p.includes('role') && p.includes('responsibilities'))
  ) {
    // Try to extract the role name from the prompt
    const roleMatch = /describe the role of ["']?([^"'.]+)["']?/i.exec(
      prompt || ''
    );
    const roleName = roleMatch ? roleMatch[1].trim() : 'Software Engineer';

    return JSON.stringify({
      Role: roleName,
      'Core Responsibilities': [
        `Lead and manage ${roleName.toLowerCase()} projects and initiatives`,
        'Collaborate with cross-functional teams to deliver solutions',
        'Design, develop, and implement technical solutions',
        'Analyze requirements and provide technical recommendations',
        'Ensure quality standards and best practices are followed',
      ],
      'Skills and Qualifications': [
        "Bachelor's degree in relevant field",
        '3-5 years of professional experience',
        'Strong analytical and problem-solving skills',
        'Excellent communication and teamwork abilities',
        'Proficiency in relevant tools and technologies',
      ],
      'Tools and Technologies': [
        'Industry-standard software and platforms',
        'Programming languages and frameworks',
        'Project management and collaboration tools',
        'Version control and development environments',
        'Testing and deployment tools',
      ],
      'Work Environment':
        'Professional office environment with modern facilities, collaborative workspaces, and flexible work arrangements. May include remote work options and team-based projects.',
      'Career Path': [
        `Junior ${roleName}`,
        `${roleName}`,
        `Senior ${roleName}`,
        `Lead ${roleName}`,
        `${roleName} Manager/Director`,
      ],
      'Challenges and Rewards': {
        Challenges: [
          'Keeping up with rapidly evolving technology',
          'Managing complex project requirements',
          'Balancing technical debt with new feature development',
        ],
        Rewards: [
          'Opportunity to work on innovative projects',
          'Continuous learning and skill development',
          'Competitive compensation and growth opportunities',
        ],
      },
      'Industry Relevance': `${roleName} roles are in high demand across multiple industries including technology, finance, healthcare, and manufacturing. The field continues to grow with excellent job prospects.`,
      Companies: [
        'Technology companies (Google, Microsoft, Amazon)',
        'Financial services firms',
        'Healthcare organizations',
        'Consulting companies',
        'Startups and scale-ups',
      ],
      'Average Salary':
        '₹6,00,000 - ₹25,00,000 per annum (varies by experience, location, and company size)',
    });
  }

  // Job roles fallback (expects JSON)
  if (
    p.includes('job roll') ||
    p.includes('job role') ||
    p.includes('job roles') ||
    p.includes('jobroll') ||
    p.includes('jobroles') ||
    p.includes('career roles') ||
    (p.includes('branch') && p.includes('json'))
  ) {
    // Try to extract the branch/department after the word 'branch'
    let dept = 'Engineering';
    const match = /branch\s+([^,.\n]+)/i.exec(prompt || '');
    if (match && match[1]) {
      dept = match[1].trim();
    }

    const departmentRoles: Record<string, any[]> = {
      'Computer Science and Engineering': [
        {
          Category: 'Software Development',
          Roles: [
            'Full Stack Developer',
            'Backend Developer',
            'Frontend Developer',
            'Mobile App Developer',
            'Software Engineer',
            'Game Developer',
            'Embedded Systems Developer',
            'AR/VR Developer',
          ],
        },
        {
          Category: 'Data Science & AI',
          Roles: [
            'Data Scientist',
            'Machine Learning Engineer',
            'AI Engineer',
            'Data Engineer',
            'Business Intelligence Analyst',
            'Computer Vision Engineer',
            'Natural Language Processing (NLP) Engineer',
            'Deep Learning Specialist',
          ],
        },
        {
          Category: 'DevOps & Cloud',
          Roles: [
            'DevOps Engineer',
            'Cloud Architect',
            'Site Reliability Engineer',
            'System Administrator',
            'Infrastructure Engineer',
            'Platform Engineer',
            'Cloud Security Engineer',
          ],
        },
        {
          Category: 'Cybersecurity',
          Roles: [
            'Security Engineer',
            'Penetration Tester',
            'Security Analyst',
            'Cybersecurity Consultant',
            'Information Security Manager',
            'Incident Response Specialist',
            'Digital Forensics Analyst',
          ],
        },
        {
          Category: 'Research & Emerging Tech',
          Roles: [
            'Blockchain Developer',
            'Quantum Computing Researcher',
            'IoT Solutions Architect',
            'Robotics Software Engineer',
            'Edge Computing Specialist',
          ],
        },
        {
          Category: 'Quality Assurance & Testing',
          Roles: [
            'QA Engineer',
            'Automation Test Engineer',
            'Performance Tester',
            'Test Analyst',
          ],
        },
        {
          Category: 'IT & Technical Support',
          Roles: [
            'IT Support Specialist',
            'Network Administrator',
            'Database Administrator',
            'Technical Support Engineer',
          ],
        },
      ],

      'Electrical engineering': [
        {
          Category: 'Power Systems',
          Roles: [
            'Power Systems Engineer',
            'Electrical Design Engineer',
            'Grid Engineer',
            'Renewable Energy Engineer',
            'Power Electronics Engineer',
          ],
        },
        {
          Category: 'Electronics & Communication',
          Roles: [
            'Electronics Engineer',
            'RF Engineer',
            'Signal Processing Engineer',
            'Communication Systems Engineer',
            'Embedded Systems Engineer',
          ],
        },
        {
          Category: 'Control Systems',
          Roles: [
            'Control Systems Engineer',
            'Automation Engineer',
            'Instrumentation Engineer',
            'Process Control Engineer',
            'Robotics Engineer',
          ],
        },
        {
          Category: 'Telecommunications',
          Roles: [
            'Telecommunications Engineer',
            'Network Engineer',
            'Wireless Engineer',
            '5G/6G Engineer',
            'Satellite Communications Engineer',
          ],
        },
      ],
      'Mechanical engineering': [
        {
          Category: 'Design & Manufacturing',
          Roles: [
            'Mechanical Design Engineer',
            'Manufacturing Engineer',
            'Product Development Engineer',
            'CAD Engineer',
            'Quality Engineer',
          ],
        },
        {
          Category: 'Automotive',
          Roles: [
            'Automotive Engineer',
            'Engine Design Engineer',
            'Vehicle Dynamics Engineer',
            'Chassis Engineer',
            'Powertrain Engineer',
          ],
        },
        {
          Category: 'Thermal & Energy',
          Roles: [
            'Thermal Engineer',
            'HVAC Engineer',
            'Energy Systems Engineer',
            'Heat Transfer Engineer',
            'Refrigeration Engineer',
          ],
        },
        {
          Category: 'Aerospace',
          Roles: [
            'Aerospace Engineer',
            'Propulsion Engineer',
            'Structural Engineer',
            'Flight Test Engineer',
            'Systems Engineer',
          ],
        },
      ],
      'Civil engineering': [
        {
          Category: 'Structural Engineering',
          Roles: [
            'Structural Engineer',
            'Building Design Engineer',
            'Bridge Engineer',
            'Seismic Engineer',
            'Foundation Engineer',
          ],
        },
        {
          Category: 'Transportation',
          Roles: [
            'Transportation Engineer',
            'Highway Engineer',
            'Traffic Engineer',
            'Railway Engineer',
            'Airport Engineer',
          ],
        },
        {
          Category: 'Water Resources',
          Roles: [
            'Water Resources Engineer',
            'Hydraulic Engineer',
            'Environmental Engineer',
            'Coastal Engineer',
            'Irrigation Engineer',
          ],
        },
        {
          Category: 'Construction Management',
          Roles: [
            'Construction Manager',
            'Project Manager',
            'Site Engineer',
            'Planning Engineer',
            'Quantity Surveyor',
          ],
        },
      ],
      'Electronics and Telecommunication engineering': [
        {
          Category: 'Communication Systems',
          Roles: [
            'Communication Engineer',
            'Telecom Engineer',
            'Network Engineer',
            '5G Engineer',
            'Satellite Engineer',
          ],
        },
        {
          Category: 'Signal Processing',
          Roles: [
            'Signal Processing Engineer',
            'DSP Engineer',
            'Image Processing Engineer',
            'Audio Engineer',
            'Radar Engineer',
          ],
        },
        {
          Category: 'Embedded Systems',
          Roles: [
            'Embedded Systems Engineer',
            'Firmware Engineer',
            'IoT Engineer',
            'Microcontroller Engineer',
            'Hardware Engineer',
          ],
        },
        {
          Category: 'RF & Microwave',
          Roles: [
            'RF Engineer',
            'Microwave Engineer',
            'Antenna Engineer',
            'Wireless Engineer',
            'EMC Engineer',
          ],
        },
      ],
      'Chemical engineering': [
        {
          Category: 'Process Engineering',
          Roles: [
            'Process Engineer',
            'Chemical Process Engineer',
            'Plant Engineer',
            'Production Engineer',
            'Process Safety Engineer',
          ],
        },
        {
          Category: 'Petrochemicals',
          Roles: [
            'Petrochemical Engineer',
            'Refinery Engineer',
            'Oil & Gas Engineer',
            'Pipeline Engineer',
            'Drilling Engineer',
          ],
        },
        {
          Category: 'Pharmaceuticals',
          Roles: [
            'Pharmaceutical Engineer',
            'Bioprocess Engineer',
            'Validation Engineer',
            'Quality Control Engineer',
            'Regulatory Affairs Engineer',
          ],
        },
        {
          Category: 'Environmental',
          Roles: [
            'Environmental Engineer',
            'Waste Treatment Engineer',
            'Air Quality Engineer',
            'Sustainability Engineer',
            'Water Treatment Engineer',
          ],
        },
      ],
    };

    // Add more engineering disciplines and a generic fallback
    const additionalDepartments: Record<string, any[]> = {
      'Aerospace engineering': [
        {
          Category: 'Aircraft Design',
          Roles: [
            'Aerodynamics Engineer',
            'Aircraft Design Engineer',
            'Flight Test Engineer',
            'Propulsion Engineer',
            'Avionics Engineer',
          ],
        },
        {
          Category: 'Space Systems',
          Roles: [
            'Spacecraft Engineer',
            'Mission Design Engineer',
            'Satellite Engineer',
            'Launch Systems Engineer',
            'Space Operations Engineer',
          ],
        },
        {
          Category: 'Manufacturing',
          Roles: [
            'Manufacturing Engineer',
            'Quality Engineer',
            'Materials Engineer',
            'Production Engineer',
            'Assembly Engineer',
          ],
        },
      ],
      'Biomedical engineering': [
        {
          Category: 'Medical Devices',
          Roles: [
            'Medical Device Engineer',
            'Biomedical Equipment Technician',
            'Regulatory Affairs Engineer',
            'Clinical Engineer',
            'Product Development Engineer',
          ],
        },
        {
          Category: 'Biotechnology',
          Roles: [
            'Biotechnology Engineer',
            'Tissue Engineer',
            'Genetic Engineer',
            'Bioprocess Engineer',
            'Research Scientist',
          ],
        },
        {
          Category: 'Healthcare Technology',
          Roles: [
            'Healthcare IT Engineer',
            'Medical Software Engineer',
            'Telemedicine Engineer',
            'Health Informatics Specialist',
            'Digital Health Engineer',
          ],
        },
      ],
      'Environmental engineering': [
        {
          Category: 'Water & Wastewater',
          Roles: [
            'Water Treatment Engineer',
            'Wastewater Engineer',
            'Environmental Consultant',
            'Water Quality Engineer',
            'Hydraulic Engineer',
          ],
        },
        {
          Category: 'Air Quality & Climate',
          Roles: [
            'Air Quality Engineer',
            'Climate Change Analyst',
            'Environmental Scientist',
            'Carbon Footprint Analyst',
            'Sustainability Engineer',
          ],
        },
        {
          Category: 'Waste Management',
          Roles: [
            'Waste Management Engineer',
            'Recycling Engineer',
            'Hazardous Waste Engineer',
            'Solid Waste Engineer',
            'Environmental Remediation Engineer',
          ],
        },
      ],
      'Industrial engineering': [
        {
          Category: 'Operations Research',
          Roles: [
            'Operations Research Analyst',
            'Process Improvement Engineer',
            'Efficiency Expert',
            'Systems Analyst',
            'Optimization Engineer',
          ],
        },
        {
          Category: 'Manufacturing Systems',
          Roles: [
            'Manufacturing Systems Engineer',
            'Production Planner',
            'Quality Control Engineer',
            'Lean Manufacturing Engineer',
            'Supply Chain Engineer',
          ],
        },
        {
          Category: 'Human Factors',
          Roles: [
            'Ergonomics Engineer',
            'Safety Engineer',
            'Human Factors Engineer',
            'Workplace Design Engineer',
            'Occupational Health Engineer',
          ],
        },
      ],
      'Petroleum engineering': [
        {
          Category: 'Exploration',
          Roles: [
            'Reservoir Engineer',
            'Drilling Engineer',
            'Petroleum Geologist',
            'Seismic Engineer',
            'Well Engineer',
          ],
        },
        {
          Category: 'Production',
          Roles: [
            'Production Engineer',
            'Facilities Engineer',
            'Pipeline Engineer',
            'Offshore Engineer',
            'Field Engineer',
          ],
        },
        {
          Category: 'Refining',
          Roles: [
            'Refinery Engineer',
            'Process Engineer',
            'Petrochemical Engineer',
            'Plant Engineer',
            'Operations Engineer',
          ],
        },
      ],
    };

    // Merge additional departments
    Object.assign(departmentRoles, additionalDepartments);

    // Generic fallback for any unrecognized department
    const genericEngineeringRoles = [
      {
        Category: 'Technical Roles',
        Roles: [
          'Design Engineer',
          'Project Engineer',
          'Research Engineer',
          'Development Engineer',
          'Systems Engineer',
        ],
      },
      {
        Category: 'Management & Consulting',
        Roles: [
          'Engineering Manager',
          'Technical Consultant',
          'Project Manager',
          'Engineering Analyst',
          'Technical Sales Engineer',
        ],
      },
      {
        Category: 'Quality & Testing',
        Roles: [
          'Quality Engineer',
          'Test Engineer',
          'Validation Engineer',
          'Compliance Engineer',
          'Inspection Engineer',
        ],
      },
      {
        Category: 'Innovation & Research',
        Roles: [
          'R&D Engineer',
          'Innovation Engineer',
          'Technology Specialist',
          'Patent Engineer',
          'Technical Researcher',
        ],
      },
    ];

    // Get roles for the specific department, fallback to generic if not found
    const roles = departmentRoles[dept] || genericEngineeringRoles;

    const obj: Record<string, any> = {
      [`${dept} Job Roles`]: roles,
    };
    return JSON.stringify(obj);
  }

  if (p.includes('flashcard')) {
    return JSON.stringify({
      flashcards: [
        {
          front: 'What is artificial intelligence?',
          back: 'AI is the simulation of human intelligence in machines that are programmed to think and learn.',
        },
        {
          front: 'What are the types of machine learning?',
          back: 'Supervised, Unsupervised, and Reinforcement learning.',
        },
      ],
    });
  }

  if (p.includes('quiz') || p.includes('mcq')) {
    return JSON.stringify({
      questions: [
        {
          question: 'What does AI stand for?',
          options: [
            'Artificial Intelligence',
            'Automated Intelligence',
            'Advanced Intelligence',
            'Applied Intelligence',
          ],
          correct: 0,
        },
        {
          question: 'Which is a popular machine learning library?',
          options: ['React', 'TensorFlow', 'Bootstrap', 'jQuery'],
          correct: 1,
        },
      ],
    });
  }

  if (p.includes('question') || p.includes('qa')) {
    return JSON.stringify({
      questions: [
        "What are the main applications of AI in today's world?",
        'How does machine learning differ from traditional programming?',
        'What are the ethical considerations in AI development?',
      ],
    });
  }

  if (p.includes('teach') || p.includes('explain')) {
    return "Here's a simple explanation: AI is like teaching computers to think and make decisions like humans. Start with basic concepts like pattern recognition, then move to algorithms, and finally practical applications.";
  }

  if (p.includes('notes') || p.includes('content')) {
    return `\n## Chapter Notes\n\n### Key Concepts\n- Understanding the fundamentals\n- Practical applications\n- Real-world examples\n\n### Important Points\n1. Core principles and theory\n2. Implementation strategies\n3. Best practices\n\n### Summary\nThis chapter covers essential concepts that form the foundation for advanced topics.\n`;
  }

  // Career guidance and general conversation fallbacks
  if (p.includes('career') || p.includes('job') || p.includes('work')) {
    return "I'd be happy to help with your career planning! You can ask me about different engineering roles, required skills, career paths, or salary expectations. What specific area would you like to explore?";
  }

  if (p.includes('hello') || p.includes('hi') || p.includes('hey')) {
    return "Hello! I'm your AI career assistant. I can help you with job search, career planning, skill development, and answering questions about various engineering fields. How can I assist you today?";
  }

  if (p.includes('help') || p.includes('what can you do')) {
    return 'I can help you with:\n• Career planning and job role exploration\n• Engineering field comparisons\n• Skill development guidance\n• Interview preparation tips\n• Resume advice\n• Salary and industry insights\n\nWhat would you like to know more about?';
  }

  if (p.includes('skill') || p.includes('learn') || p.includes('study')) {
    return 'Great question about skills! For engineering careers, I recommend focusing on both technical and soft skills. Which specific field are you interested in? I can provide detailed skill requirements for different engineering disciplines.';
  }

  if (p.includes('salary') || p.includes('pay') || p.includes('income')) {
    return 'Salary ranges vary significantly based on location, experience, and specialization. Generally:\n• Entry level: ₹3-8 LPA\n• Mid level: ₹8-20 LPA\n• Senior level: ₹20+ LPA\n\nWhich specific role or field would you like salary details for?';
  }

  if (p.includes('interview') || p.includes('preparation')) {
    return 'Interview preparation is crucial! I recommend:\n• Practice technical questions for your field\n• Prepare behavioral interview answers\n• Research the company thoroughly\n• Practice coding problems (for tech roles)\n• Prepare questions to ask the interviewer\n\nWould you like specific advice for any particular type of interview?';
  }

  if (p.includes('resume') || p.includes('cv')) {
    return 'A strong resume should highlight:\n• Relevant technical skills\n• Project experience\n• Internships and work experience\n• Education and certifications\n• Quantifiable achievements\n\nWould you like specific tips for your engineering field or experience level?';
  }

  if (p.includes('company') || p.includes('companies')) {
    return 'There are many great companies across different engineering fields! Tech giants, startups, consulting firms, and traditional engineering companies all offer excellent opportunities. What type of company culture or industry interests you most?';
  }

  // Generic fallback
  return "I can help you with your learning journey. Please provide more specific details about what you'd like to learn.";
}

export async function POST(request: NextRequest) {
  let prompt = ''; // Declare prompt in the main scope

  try {
    console.log('Gemini API: Received request');

    // Parse the request body first so we can return a meaningful fallback if needed
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error('Gemini API: Failed to parse request body:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    prompt = body.prompt || body.message; // Set prompt here so it's available in catch block

    if (!prompt) {
      console.log('Gemini API: Missing prompt in request');
      return NextResponse.json(
        { error: 'Prompt or message is required' },
        { status: 400 }
      );
    }

    // If API key is not configured, return a graceful fallback to keep dev UX smooth
    if (!config.apiKey) {
      console.log('Gemini API: Missing API key, returning fallback response');
      return NextResponse.json({
        success: true,
        response: getFallbackResponse(prompt),
      });
    }

    console.log(
      'Gemini API: Processing prompt:',
      prompt.substring(0, 50) + '...'
    );

    // Use the correct model name for the current API version
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Generate content with timeout
    const result = (await Promise.race([
      model.generateContent(prompt),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), 30000)
      ),
    ])) as any;
    const response = await result.response;
    const text = response.text();

    console.log('Gemini API: Successfully generated response');

    // Return the generated content
    return NextResponse.json({
      success: true,
      response: text,
    });
  } catch (error) {
    console.error('Error calling Gemini API:', error);

    // Provide more detailed error information
    const err = error as any;
    const errorMessage = err?.message || 'Unknown error';
    const statusCode = typeof err?.status === 'number' ? err.status : 500;

    // If it's a service unavailable error (503) or rate limit, use fallback
    if (
      statusCode === 503 ||
      errorMessage.includes('overloaded') ||
      errorMessage.includes('rate limit') ||
      errorMessage.includes('timeout')
    ) {
      console.log('Gemini API: Service issue, using fallback response');
      return NextResponse.json({
        success: true,
        response: getFallbackResponse(prompt),
        fallback: true,
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process request',
        message: errorMessage,
        details:
          'Please check your API key and ensure it has access to the Gemini API',
      },
      { status: statusCode }
    );
  }
}
