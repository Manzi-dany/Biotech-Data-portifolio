"use client"; // Ensure client rendering for Home page

import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { AIFeatures } from "@/components/sections/ai-features";
import { Blog } from "@/components/sections/blog";
import { Contact } from "@/components/sections/contact";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

// Dynamically import SecretaryPage to avoid SSR issues
const SecretaryPage = dynamic(() => import("./secretary/page"), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <AIFeatures />
        <Blog />

        {/* Secretary Section */}
        <section className="mt-16 px-4 py-8 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Your Personal Secretary</h2>
          <SecretaryPage />
        </section>

        <Contact />
      </main>
      <Footer />
    </div>
  );
}
