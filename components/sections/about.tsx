"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dna, BarChart3, Code, Database, Microscope, Brain, Github, ExternalLink } from "lucide-react"
import { useState, useEffect } from "react"

export function About() {
  const [aboutPicture, setAboutPicture] = useState("/placeholder-13esy.png")

  useEffect(() => {
    const savedPictures = localStorage.getItem("profilePictures")
    if (savedPictures) {
      const pictures = JSON.parse(savedPictures)
      if (pictures.about) {
        setAboutPicture(pictures.about)
      }
    }
  }, [])

  const skills = [
    {
      category: "Biotechnology",
      icon: Dna,
      skills: ["Molecular Biology", "Genetics", "Biochemistry", "Laboratory Techniques", "Research Methods"],
      color: "bg-green-100 text-green-800",
    },
    {
      category: "Data Science",
      icon: BarChart3,
      skills: ["Python", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "Statistical Analysis"],
      color: "bg-blue-100 text-blue-800",
    },
    {
      category: "Web Development",
      icon: Code,
      skills: ["Django", "HTML/CSS", "JavaScript", "PostgreSQL", "Bootstrap", "REST APIs"],
      color: "bg-purple-100 text-purple-800",
    },
    {
      category: "Data Analysis",
      icon: Database,
      skills: ["Data Visualization", "Plotly", "Matplotlib", "Seaborn", "Excel", "R"],
      color: "bg-orange-100 text-orange-800",
    },
    {
      category: "Bioinformatics",
      icon: Microscope,
      skills: ["Biopython", "Sequence Analysis", "Genomic Data", "Protein Modeling"],
      color: "bg-teal-100 text-teal-800",
    },
    {
      category: "Tools & Platforms",
      icon: Brain,
      skills: ["Git/GitHub", "Docker", "Linux", "Jupyter", "Streamlit", "VS Code"],
      color: "bg-gray-100 text-gray-800",
    },
  ]

  const socialLinks = [
    { name: "GitHub", url: "https://github.com", icon: Github },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/manzi-dany-b2842030b", icon: ExternalLink }, // Updated LinkedIn URL
    { name: "X (Twitter)", url: "https://x.com/Danykby", icon: ExternalLink }, // Added X/Twitter link
    { name: "Kaggle", url: "https://kaggle.com", icon: ExternalLink },
    { name: "Zindi", url: "https://zindi.africa", icon: ExternalLink },
    { name: "Behance", url: "https://behance.net", icon: ExternalLink },
    { name: "HuggingFace", url: "https://huggingface.co", icon: ExternalLink },
  ]

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Passionate biotechnologist with expertise in data science and web development, dedicated to bridging the gap
            between biological research and technology innovation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Professional Summary */}
          <div>
            <div className="mb-8">
              <img
                src={aboutPicture || "/placeholder.svg"}
                alt="Professional photo"
                className="w-full max-w-md mx-auto rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold font-heading mb-4">Professional Summary</h3>
            <p className="text-muted-foreground leading-relaxed">
              I am a biotechnologist with strong interests in biotechnology, data science, and web development. My work
              focuses on creating innovative solutions that integrate biological research with digital tools, making
              complex data more meaningful and accessible.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Through academic research projects, entrepreneurial ventures, and collaborations, I have gained experience
              in laboratory techniques, bioinformatics, and computational analysis, as well as designing full-stack web
              applications for scientific and educational purposes. This unique combination of skills enables me to
              bridge the gap between biological processes and digital solutions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I am passionate about advancing scientific discovery and improving access to knowledge by applying
              biotechnology, data-driven insights, and modern web technologies in creative and impactful ways.
            </p>

            {/* Social Links */}
            <div className="pt-6">
              <h4 className="text-lg font-semibold mb-4">Connect with me</h4>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border border-border hover:border-primary transition-colors"
                  >
                    <link.icon className="w-4 h-4" />
                    <span className="text-sm">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold font-heading text-center mb-12">Skills & Expertise</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skillGroup) => (
              <Card key={skillGroup.category} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <skillGroup.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold">{skillGroup.category}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h3 className="text-3xl font-bold font-heading text-center mb-12">Career Timeline</h3>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-border"></div>

              <div className="space-y-8">
                <div className="relative flex items-center">
                  <div className="absolute left-2 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                  <div className="ml-12 md:ml-0 md:w-1/2 md:pr-8">
                    <Card className="p-6">
                      <div className="text-sm text-primary font-semibold mb-1">January 2025 - Present</div>
                      <h4 className="text-lg font-semibold mb-2">Biotechnology Research</h4>
                      <p className="text-muted-foreground text-sm">
                        Leading data-driven research projects, developing machine learning models for biological data
                        analysis, and creating web applications for research management.
                      </p>
                    </Card>
                  </div>
                </div>

                <div className="relative flex items-center md:justify-end">
                  <div className="absolute left-2 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                  <div className="ml-12 md:ml-0 md:w-1/2 md:pl-8">
                    <Card className="p-6">
                      <div className="text-sm text-primary font-semibold mb-1">2024</div>
                      <h4 className="text-lg font-semibold mb-2">Data Science and Analytics - ALX Africa</h4>
                      <p className="text-muted-foreground text-sm">
                        Completed comprehensive data science program covering machine learning, statistical analysis,
                        and data visualization techniques.
                      </p>
                    </Card>
                  </div>
                </div>

                <div className="relative flex items-center">
                  <div className="absolute left-2 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                  <div className="ml-12 md:ml-0 md:w-1/2 md:pr-8">
                    <Card className="p-6">
                      <h4 className="text-lg font-semibold mb-2">Web Development in Python and Django</h4>
                      <p className="text-muted-foreground text-sm">
                        Specialized in full-stack web development using Python and Django framework, creating robust web
                        applications for scientific research and data management.
                      </p>
                    </Card>
                  </div>
                </div>

                <div className="relative flex items-center md:justify-end">
                  <div className="absolute left-2 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                  <div className="ml-12 md:ml-0 md:w-1/2 md:pl-8">
                    <Card className="p-6">
                      <div className="text-sm text-primary font-semibold mb-1">2022 - 2025</div>
                      <h4 className="text-lg font-semibold mb-2">Bachelor's in Biotechnology</h4>
                      <p className="text-muted-foreground text-sm">
                        Currently pursuing degree with specialization in molecular biology and bioinformatics. Focusing
                        on machine learning applications in genomic analysis.
                      </p>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
