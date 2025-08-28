"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, FileText, Award, Users, Play, Pause } from "lucide-react"

export function Hero() {
  const [currentText, setCurrentText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [profilePicture, setProfilePicture] = useState("/placeholder-p5plu.png")
  const texts = ["Biotechnologist", "Data Scientist", "Web Developer"]

  useEffect(() => {
    const typeText = () => {
      const text = texts[currentIndex]
      if (currentText.length < text.length) {
        setCurrentText(text.slice(0, currentText.length + 1))
      } else {
        setTimeout(() => {
          setCurrentText("")
          setCurrentIndex((prev) => (prev + 1) % texts.length)
        }, 2000)
      }
    }

    const timer = setTimeout(typeText, 100)
    return () => clearTimeout(timer)
  }, [currentText, currentIndex, texts])

  useEffect(() => {
    const savedPictures = localStorage.getItem("profilePictures")
    if (savedPictures) {
      const pictures = JSON.parse(savedPictures)
      if (pictures.hero) {
        setProfilePicture(pictures.hero)
      }
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const toggleVideo = () => {
    setIsVideoPlaying(!isVideoPlaying)
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-card to-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Profile Image */}
          <div className="mb-8">
            <img
              src={profilePicture || "/placeholder.svg"}
              alt="MANZI Dany"
              className="w-48 h-48 rounded-full mx-auto border-4 border-primary shadow-2xl object-cover"
            />
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6">
            <span className="text-foreground">MANZI</span> <span className="text-primary">Dany</span>
          </h1>

          {/* Typing Animation */}
          <div className="text-2xl md:text-3xl text-muted-foreground mb-4 h-12">
            <span className="border-r-2 border-primary animate-pulse">{currentText}</span>
          </div>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Bridging Biology and Technology through Data-Driven Solutions
          </p>

          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto bg-card rounded-lg border border-border overflow-hidden shadow-lg">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                {!isVideoPlaying ? (
                  <div className="text-center">
                    <Button
                      size="lg"
                      onClick={toggleVideo}
                      className="rounded-full w-16 h-16 p-0 bg-primary/90 hover:bg-primary"
                    >
                      <Play className="w-6 h-6 ml-1" />
                    </Button>
                    <p className="text-sm text-muted-foreground mt-4">Watch My Introduction</p>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-black/80">
                    <div className="text-center text-white">
                      <Button
                        size="lg"
                        onClick={toggleVideo}
                        variant="outline"
                        className="rounded-full w-12 h-12 p-0 mb-4 bg-transparent"
                      >
                        <Pause className="w-4 h-4" />
                      </Button>
                      <p className="text-sm">Video Player Simulation</p>
                      <p className="text-xs opacity-70">Professional introduction video would play here</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-2xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border">
              <div className="flex items-center justify-center mb-2">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-1">5+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border">
              <div className="flex items-center justify-center mb-2">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-1">50+</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-1">25+</div>
              <div className="text-sm text-muted-foreground">Skills Mastered</div>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-lg font-semibold mb-4 text-muted-foreground">Download Center</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => scrollToSection("projects")} className="text-lg px-8 py-3">
                View My Work
                <ArrowDown className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-card/50 backdrop-blur-sm">
                <FileText className="w-5 h-5 mr-2" />
                Download CV
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-card/50 backdrop-blur-sm">
                <FileText className="w-5 h-5 mr-2" />
                Cover Letter
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-card/50 backdrop-blur-sm">
                <Award className="w-5 h-5 mr-2" />
                Certificates
              </Button>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/manzi-dany-b2842030b"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:manzidany72@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  )
}
