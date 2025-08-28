import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

const knowledgeBase = {
  biotechnology: {
    keywords: ["biotechnology", "biotech", "biology", "biological", "life sciences"],
    response:
      "Biotechnology is the use of living systems and organisms to develop or make products, or any technological application that uses biological systems. It combines biology with technology to solve problems and create innovations in areas like medicine, agriculture, environmental science, and industrial processes. Dany specializes in integrating biotechnology with data science and web development to create digital solutions for biological research and make complex scientific data more accessible.",
  },
  background: {
    keywords: ["background", "about", "who are you", "tell me about"],
    response:
      "I represent MANZI Dany, a biotechnologist with expertise in biotechnology, data science, and web development. He creates innovative solutions that bridge biological research with digital tools, making complex data more meaningful and accessible. Dany has experience in laboratory techniques, bioinformatics, computational analysis, and designing full-stack web applications for scientific purposes.",
  },
  education: {
    keywords: ["education", "study", "degree", "university", "school"],
    response:
      "Dany is currently pursuing a Bachelor's in Biotechnology (2022-2025) and has completed Data Science and Analytics training from ALX Africa. He also has expertise in Web Development using Python and Django, combining scientific knowledge with technical skills.",
  },
  projects: {
    keywords: ["projects", "work", "portfolio", "built", "created"],
    response:
      "Dany has worked on various innovative projects including a Biotech Data Analysis Platform, Agricultural Yield Predictor, Laboratory Management System, Drug Discovery Dashboard, Environmental Monitoring System, Healthcare Data Visualization tools, Protein Structure Analyzer, and Clinical Trial Data Manager. These projects showcase his ability to apply biotechnology and data science to real-world problems.",
  },
  skills: {
    keywords: ["skills", "expertise", "technologies", "programming"],
    response:
      "Dany's expertise spans biotechnology (laboratory techniques, bioinformatics), data science (computational analysis, data visualization), and web development (Python, Django, full-stack applications). He specializes in creating digital solutions that make scientific research more accessible and impactful.",
  },
  contact: {
    keywords: ["contact", "reach", "email", "phone", "connect"],
    response:
      "You can contact Dany at manzidany72@gmail.com, call +250791350851, or connect on LinkedIn (linkedin.com/in/manzi-dany-b2842030b) and X (x.com/Danykby). He's based in Kigali, Rwanda.",
  },
}

function findBestMatch(message: string): string | null {
  const lowerMessage = message.toLowerCase()

  for (const [topic, data] of Object.entries(knowledgeBase)) {
    if (data.keywords.some((keyword) => lowerMessage.includes(keyword))) {
      return data.response
    }
  }

  return null
}

const portfolioContext = `
You are an AI assistant representing MANZI Dany, a biotechnologist with expertise in:

BACKGROUND:
- Biotechnologist with strong interests in biotechnology, data science, and web development
- Creates innovative solutions integrating biological research with digital tools
- Makes complex data more meaningful and accessible
- Experience in laboratory techniques, bioinformatics, and computational analysis
- Designs full-stack web applications for scientific and educational purposes

EDUCATION:
- Bachelor's in Biotechnology (2022-2025)
- Data Science and Analytics from ALX Africa
- Web Development in Python and Django

EXPERIENCE:
- Biotechnology Research (January 2025)
- Academic research projects and entrepreneurial ventures
- Laboratory techniques and bioinformatics
- Full-stack web development

CONTACT:
- Email: manzidany72@gmail.com
- Phone: +250791350851
- Location: Kigali, Rwanda
- LinkedIn: linkedin.com/in/manzi-dany-b2842030b
- X: x.com/Danykby

KEY PROJECTS:
- Biotech Data Analysis Platform
- Agricultural Yield Predictor
- Laboratory Management System
- Drug Discovery Dashboard
- Environmental Monitoring System
- Healthcare Data Visualization
- Protein Structure Analyzer
- Clinical Trial Data Manager

Answer questions about Dany's background, projects, skills, and experience. Be helpful and informative.
`

export async function POST(request: NextRequest) {
  let message: string

  try {
    const body = await request.json()
    message = body.message

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    if (!process.env.OPENAI_API_KEY) {
      const localResponse = findBestMatch(message)

      if (localResponse) {
        return NextResponse.json({ response: localResponse })
      }

      return NextResponse.json({
        response:
          "I can answer questions about Dany's biotechnology background, education, projects, and expertise. For more detailed discussions, please contact Dany directly at manzidany72@gmail.com or +250791350851.",
      })
    }

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: portfolioContext,
      prompt: message,
      maxTokens: 300,
    })

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("Chatbot error:", error)

    if (message) {
      const localResponse = findBestMatch(message)
      if (localResponse) {
        return NextResponse.json({ response: localResponse })
      }
    }

    return NextResponse.json({
      response:
        "I'm experiencing technical difficulties. Please reach out to Dany directly at manzidany72@gmail.com for questions about his biotechnology expertise, data science projects, or web development work.",
    })
  }
}
