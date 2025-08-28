import { Github, Linkedin, Mail, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="font-bold text-xl text-primary font-heading mb-4">MANZI Dany</div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Biotechnologist, Data Scientist, and Web Developer passionate about bridging biology and technology
              through innovative data-driven solutions.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/manzi-dany-b2842030b"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:manzidany72@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#ai-features" className="text-muted-foreground hover:text-primary transition-colors">
                  AI Features
                </a>
              </li>
              <li>
                <a href="#blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Expertise */}
          <div>
            <h4 className="font-semibold mb-4">Expertise</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">Biotechnology</li>
              <li className="text-muted-foreground">Data Science</li>
              <li className="text-muted-foreground">Web Development</li>
              <li className="text-muted-foreground">Bioinformatics</li>
              <li className="text-muted-foreground">Machine Learning</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500" /> by MANZI Dany © 2025
          </p>
        </div>
      </div>
    </footer>
  )
}
