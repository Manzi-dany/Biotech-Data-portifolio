"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle, Shield } from "lucide-react"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isRecaptchaVerified) {
      alert("Please verify that you're not a robot")
      return
    }

    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: "", email: "", subject: "", message: "" })
    setIsRecaptchaVerified(false)

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">Get In Touch</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to collaborate on biotechnology, data science, or web development projects? Let's discuss how we can
            work together to create innovative solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold font-heading mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href="mailto:manzidany72@gmail.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      manzidany72@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <a href="tel:+250791350851" className="text-muted-foreground hover:text-primary transition-colors">
                      +250 791 350 851
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">Kigali, Rwanda</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect on Social Media</h4>
              <div className="flex gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-card rounded-lg border border-border hover:border-primary transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/manzi-dany-b2842030b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-card rounded-lg border border-border hover:border-primary transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://x.com/Danykby"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-card rounded-lg border border-border hover:border-primary transition-colors"
                >
                  <span className="text-sm font-bold">X</span>
                </a>
                <a
                  href="https://kaggle.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-card rounded-lg border border-border hover:border-primary transition-colors"
                >
                  <span className="text-sm font-bold">K</span>
                </a>
                <a
                  href="https://zindi.africa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-card rounded-lg border border-border hover:border-primary transition-colors"
                >
                  <span className="text-sm font-bold">Z</span>
                </a>
                <a
                  href="https://behance.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-card rounded-lg border border-border hover:border-primary transition-colors"
                >
                  <span className="text-sm font-bold">Be</span>
                </a>
                <a
                  href="https://huggingface.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-card rounded-lg border border-border hover:border-primary transition-colors"
                >
                  <span className="text-sm font-bold">🤗</span>
                </a>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border h-64 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
              <div className="text-center text-muted-foreground relative z-10">
                <MapPin className="w-12 h-12 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Interactive Map</p>
                <p className="text-xs">Kigali, Rwanda</p>
                <p className="text-xs mt-2 opacity-70">Google Maps integration would appear here</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-8">
            <h3 className="text-2xl font-bold font-heading mb-6">Send a Message</h3>

            {isSubmitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-green-800 text-sm">Thank you! Your message has been sent successfully.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="mt-1"
                />
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-primary"
                    checked={isRecaptchaVerified}
                    onChange={(e) => setIsRecaptchaVerified(e.target.checked)}
                  />
                  <span className="text-sm text-muted-foreground">I'm not a robot</span>
                  <div className="ml-auto flex items-center gap-2">
                    <Shield className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">reCAPTCHA</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2 opacity-70">
                  Google reCAPTCHA v2 integration would be implemented here
                </p>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting || !isRecaptchaVerified}>
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  )
}
