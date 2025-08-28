import { type NextRequest, NextResponse } from "next/server"
import { generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"

const projectRecommendationSchema = z.object({
  recommendations: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      matchPercentage: z.number(),
      relevantSkills: z.array(z.string()),
      category: z.string(),
    }),
  ),
})

export async function POST(request: NextRequest) {
  try {
    const { interests } = await request.json()

    if (!interests || interests.length === 0) {
      return NextResponse.json({ error: "Interests are required" }, { status: 400 })
    }

    const portfolioProjects = [
      "Biotech Data Analysis Platform - Advanced bioinformatics dashboard for genomic data visualization",
      "Agricultural Yield Predictor - Machine learning model for crop yield forecasting",
      "Laboratory Management System - Django-based LIMS for research facilities",
      "Drug Discovery Dashboard - AI-powered molecular analysis tool",
      "Environmental Monitoring System - IoT data collection and analysis platform",
      "Healthcare Data Visualization - Interactive medical data dashboards",
      "Protein Structure Analyzer - 3D molecular modeling and analysis tool",
      "Clinical Trial Data Manager - Statistical analysis platform for medical research",
    ]

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        recommendations: [
          {
            title: "Biotech Data Analysis Platform",
            description: "Advanced bioinformatics dashboard perfect for data science enthusiasts",
            matchPercentage: 95,
            relevantSkills: ["Python", "Data Analysis", "Bioinformatics"],
            category: "Biotechnology",
          },
          {
            title: "Laboratory Management System",
            description: "Django-based system showcasing full-stack development skills",
            matchPercentage: 90,
            relevantSkills: ["Django", "Python", "Database Management"],
            category: "Web Development",
          },
        ],
      })
    }

    const { object } = await generateObject({
      model: openai("gpt-4o"),
      schema: projectRecommendationSchema,
      prompt: `Based on these user interests: ${interests.join(", ")}

And these available portfolio projects:
${portfolioProjects.join("\n")}

Recommend the most relevant projects with match percentages, descriptions, and relevant skills. Focus on biotechnology, data science, and web development projects that align with the user's interests.`,
    })

    return NextResponse.json(object)
  } catch (error) {
    console.error("Project recommendation error:", error)
    return NextResponse.json({
      recommendations: [
        {
          title: "Contact for Personalized Recommendations",
          description: "Reach out to Dany at manzidany72@gmail.com for tailored project suggestions",
          matchPercentage: 100,
          relevantSkills: ["Consultation", "Project Planning"],
          category: "General",
        },
      ],
    })
  }
}
