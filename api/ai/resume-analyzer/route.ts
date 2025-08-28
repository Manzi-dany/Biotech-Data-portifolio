import { type NextRequest, NextResponse } from "next/server"
import { generateObject, generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"

const resumeAnalysisSchema = z.object({
  skills: z.array(z.string()).describe("List of technical and professional skills extracted from the resume"),
  experience: z.string().describe("Summary of work experience and years"),
  education: z.string().describe("Educational background summary"),
  strengths: z.array(z.string()).describe("Key strengths and competencies"),
  recommendations: z.array(z.string()).describe("Career recommendations based on the resume"),
  issues: z.array(z.string()).describe("Issues found in the resume that need correction"),
  corrections: z.array(z.string()).describe("Specific corrections and improvements suggested"),
})

export async function POST(request: NextRequest) {
  try {
    const { resumeText } = await request.json()

    if (!resumeText) {
      return NextResponse.json({ error: "Resume text is required" }, { status: 400 })
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        skills: ["Biotechnology", "Data Science", "Web Development", "Python", "Django"],
        experience: "Currently pursuing Bachelor's in Biotechnology with research experience",
        education: "Bachelor's in Biotechnology (2022-2025), Data Science from ALX Africa",
        strengths: ["Analytical thinking", "Problem solving", "Technical expertise"],
        recommendations: [
          "Continue developing bioinformatics skills",
          "Expand web development portfolio",
          "Pursue advanced data science certifications",
        ],
        issues: ["Consider adding more quantifiable achievements", "Skills section could be more detailed"],
        corrections: ["Add specific project outcomes", "Include technical proficiency levels"],
        correctedCV:
          "Your corrected CV would appear here. Contact Dany at manzidany72@gmail.com for professional CV review and correction services.",
      })
    }

    const { object } = await generateObject({
      model: openai("gpt-4o"),
      schema: resumeAnalysisSchema,
      prompt: `Analyze this resume and extract key information, identify issues, and suggest corrections:

Resume Content:
${resumeText}

Please provide a comprehensive analysis including skills, experience summary, education, strengths, career recommendations, issues found, and specific corrections needed.`,
    })

    const { text: correctedCV } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Based on this resume analysis, create an improved and corrected version of the CV:

Original Resume:
${resumeText}

Analysis Results:
- Issues: ${object.issues.join(", ")}
- Corrections: ${object.corrections.join(", ")}
- Recommendations: ${object.recommendations.join(", ")}

Please create a professional, well-structured, and corrected version of this CV that addresses all the identified issues and incorporates the suggested improvements. Format it professionally with clear sections.`,
    })

    return NextResponse.json({
      ...object,
      correctedCV,
    })
  } catch (error) {
    console.error("Resume analysis error:", error)
    return NextResponse.json({
      skills: ["Technical Analysis", "Research", "Problem Solving"],
      experience: "Professional experience in biotechnology and data science",
      education: "Advanced technical education background",
      strengths: ["Analytical skills", "Technical expertise", "Innovation"],
      recommendations: [
        "Contact Dany at manzidany72@gmail.com for detailed resume review",
        "Explore biotechnology and data science opportunities",
        "Continue building technical portfolio",
      ],
      issues: ["Unable to analyze CV at this time"],
      corrections: ["Please contact for manual review"],
      correctedCV:
        "CV correction service temporarily unavailable. Contact manzidany72@gmail.com for professional CV review.",
    })
  }
}
