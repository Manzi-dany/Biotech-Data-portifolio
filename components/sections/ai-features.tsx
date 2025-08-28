"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  FileText,
  Brain,
  MessageCircle,
  Sparkles,
  BarChart3,
  Dna,
  Code,
  Database,
  Microscope,
  X,
  Send,
  Loader2,
} from "lucide-react"

export function AIFeatures() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [chatMessages, setChatMessages] = useState<Array<{ type: "user" | "bot"; message: string }>>([])
  const [chatInput, setChatInput] = useState("")
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [resumeAnalysis, setResumeAnalysis] = useState<any>(null)
  const [projectRecommendations, setProjectRecommendations] = useState<any>(null)

  const interests = [
    { name: "Biotechnology", icon: Dna, color: "bg-green-100 text-green-800" },
    { name: "Data Science", icon: BarChart3, color: "bg-blue-100 text-blue-800" },
    { name: "Python/Django Web Development", icon: Code, color: "bg-purple-100 text-purple-800" },
    { name: "Data Analysis", icon: Database, color: "bg-orange-100 text-orange-800" },
    { name: "Bioinformatics", icon: Microscope, color: "bg-teal-100 text-teal-800" },
    { name: "Machine Learning", icon: Brain, color: "bg-pink-100 text-pink-800" },
  ]

  const quickActions = [
    "Show me biotech projects",
    "Data science portfolio",
    "Django experience",
    "Contact info",
    "Skills overview",
    "Latest projects",
  ]

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) => (prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]))
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsLoading(true)
    try {
      const text = await file.text()
      const response = await fetch("/api/ai/resume-analyzer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText: text }),
      })

      if (response.ok) {
        const analysis = await response.json()
        setResumeAnalysis(analysis)
      }
    } catch (error) {
      console.error("Resume analysis failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getProjectRecommendations = async () => {
    if (selectedInterests.length === 0) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/ai/project-recommender", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interests: selectedInterests }),
      })

      if (response.ok) {
        const recommendations = await response.json()
        setProjectRecommendations(recommendations)
      }
    } catch (error) {
      console.error("Project recommendations failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChatSubmit = async (message: string) => {
    if (!message.trim()) return

    setChatMessages((prev) => [...prev, { type: "user", message }])
    setIsLoading(true)

    try {
      const response = await fetch("/api/ai/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      })

      if (response.ok) {
        const { response: botResponse } = await response.json()
        setChatMessages((prev) => [...prev, { type: "bot", message: botResponse }])
      }
    } catch (error) {
      console.error("Chat failed:", error)
      setChatMessages((prev) => [
        ...prev,
        { type: "bot", message: "Sorry, I'm having trouble responding right now. Please try again." },
      ])
    } finally {
      setIsLoading(false)
    }

    setChatInput("")
  }

  const downloadCorrectedCV = () => {
    if (!resumeAnalysis?.correctedCV) return

    const blob = new Blob([resumeAnalysis.correctedCV], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "corrected-cv.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <section id="ai-features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">AI-Powered Features</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience interactive AI features that showcase my technical capabilities and help you explore my portfolio
            in innovative ways.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Resume Analyzer */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Resume Analyzer</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              Upload your CV and get AI-powered analysis of skills, experience, and education.
            </p>

            {activeFeature !== "resume" ? (
              <Button onClick={() => setActiveFeature("resume")} className="w-full">
                📤 Try Resume Analyzer
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  📤<p className="text-sm text-muted-foreground mb-2">Upload your CV (PDF, TXT, DOC)</p>
                  <input
                    type="file"
                    accept=".pdf,.txt,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="resume-upload"
                  />
                  <Button size="sm" variant="outline" asChild disabled={isLoading}>
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      {isLoading ? "⏳ Analyzing..." : "Browse Files"}
                    </label>
                  </Button>
                </div>

                {resumeAnalysis && (
                  <div className="bg-card rounded-lg p-4 border space-y-4">
                    <h4 className="font-semibold mb-3 flex items-center">✨ AI Analysis & Corrections</h4>

                    {/* Existing analysis display code */}
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium mb-1">Extracted Skills:</p>
                        <div className="flex flex-wrap gap-1">
                          {resumeAnalysis.skills?.map((skill: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Experience Summary:</p>
                        <p className="text-xs text-muted-foreground">{resumeAnalysis.experience}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Education:</p>
                        <p className="text-xs text-muted-foreground">{resumeAnalysis.education}</p>
                      </div>
                      {resumeAnalysis.recommendations && (
                        <div>
                          <p className="text-sm font-medium mb-1">Recommendations:</p>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            {resumeAnalysis.recommendations.map((rec: string, index: number) => (
                              <li key={index}>• {rec}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {resumeAnalysis.issues && (
                      <div>
                        <p className="text-sm font-medium mb-1 text-red-600">Issues Found:</p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {resumeAnalysis.issues.map((issue: string, index: number) => (
                            <li key={index}>• {issue}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {resumeAnalysis.corrections && (
                      <div>
                        <p className="text-sm font-medium mb-1 text-green-600">Corrections Applied:</p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {resumeAnalysis.corrections.map((correction: string, index: number) => (
                            <li key={index}>• {correction}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {resumeAnalysis.correctedCV && (
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-sm font-medium text-blue-600">Corrected CV:</p>
                          <Button size="sm" onClick={downloadCorrectedCV} variant="outline">
                            📥 Download Corrected CV
                          </Button>
                        </div>
                        <div className="bg-muted/50 rounded p-3 max-h-32 overflow-y-auto">
                          <pre className="text-xs whitespace-pre-wrap text-muted-foreground">
                            {resumeAnalysis.correctedCV.substring(0, 300)}
                            {resumeAnalysis.correctedCV.length > 300 ? "..." : ""}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <Button variant="outline" size="sm" onClick={() => setActiveFeature(null)}>
                  Close
                </Button>
              </div>
            )}
          </Card>

          {/* Project Recommender */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Project Recommender</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              Select your interests and get personalized project recommendations.
            </p>

            {activeFeature !== "recommender" ? (
              <Button onClick={() => setActiveFeature("recommender")} className="w-full">
                <Sparkles className="w-4 h-4 mr-2" />
                Get Recommendations
              </Button>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-3">Select your interests:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {interests.map((interest) => (
                      <button
                        key={interest.name}
                        onClick={() => toggleInterest(interest.name)}
                        className={`p-2 rounded-lg border text-xs transition-colors ${
                          selectedInterests.includes(interest.name)
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <interest.icon className="w-3 h-3 mx-auto mb-1" />
                        {interest.name}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedInterests.length > 0 && (
                  <Button onClick={getProjectRecommendations} disabled={isLoading} className="w-full">
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Brain className="w-4 h-4 mr-2" />}
                    Get AI Recommendations
                  </Button>
                )}

                {projectRecommendations && (
                  <div className="bg-card rounded-lg p-4 border">
                    <h4 className="font-semibold mb-3 flex items-center">
                      <Sparkles className="w-4 h-4 mr-2 text-primary" />
                      AI Recommended Projects
                    </h4>
                    <div className="space-y-2">
                      {projectRecommendations.recommendations?.map((project: any, index: number) => (
                        <div key={index} className="text-xs p-2 bg-muted/50 rounded border-l-2 border-primary">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-medium">{project.title}</span>
                            <Badge variant="secondary" className="text-xs">
                              {project.matchPercentage}% match
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-1">{project.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {project.relevantSkills?.map((skill: string, skillIndex: number) => (
                              <Badge key={skillIndex} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button variant="outline" size="sm" onClick={() => setActiveFeature(null)}>
                  Close
                </Button>
              </div>
            )}
          </Card>

          {/* Interactive Chatbot */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Interactive Chatbot</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              Chat with my AI assistant to learn more about my experience and projects.
            </p>

            {!isChatOpen ? (
              <Button onClick={() => setIsChatOpen(true)} className="w-full">
                <MessageCircle className="w-4 h-4 mr-2" />
                Start Conversation
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="bg-card rounded-lg border h-64 overflow-y-auto p-3">
                  {chatMessages.length === 0 ? (
                    <div className="text-center text-muted-foreground text-sm py-8">
                      <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      Start a conversation! Ask me about biotechnology, data science, or web development.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {chatMessages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-[80%] p-2 rounded-lg text-xs ${
                              msg.type === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {msg.message}
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="bg-muted text-muted-foreground p-2 rounded-lg text-xs">
                            <Loader2 className="w-3 h-3 animate-spin" />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask me anything..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && !isLoading && handleChatSubmit(chatInput)}
                      className="text-xs"
                      disabled={isLoading}
                    />
                    <Button size="sm" onClick={() => handleChatSubmit(chatInput)} disabled={isLoading}>
                      <Send className="w-3 h-3" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {quickActions.map((action) => (
                      <button
                        key={action}
                        onClick={() => handleChatSubmit(action)}
                        disabled={isLoading}
                        className="text-xs px-2 py-1 bg-muted rounded hover:bg-muted/80 transition-colors disabled:opacity-50"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>

                <Button variant="outline" size="sm" onClick={() => setIsChatOpen(false)}>
                  <X className="w-3 h-3 mr-1" />
                  Close Chat
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  )
}
