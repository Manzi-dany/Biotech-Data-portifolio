"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  getProjects,
  getBlogPosts,
  saveProject,
  saveBlogPost,
  deleteProject,
  deleteBlogPost,
  type Project,
  type BlogPost,
} from "@/lib/data-manager";
import Link from "next/link";

export default function AdminPage() {
  const [mounted, setMounted] = useState(false); // To prevent SSR hydration issues
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [projects, setProjects] = useState<Project[]>([]);
  const [projectImagePreview, setProjectImagePreview] = useState<string>("");

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogImagePreview, setBlogImagePreview] = useState<string>("");

  const [profilePicturePreview, setProfilePicturePreview] = useState<string>(
    "/placeholder.svg"
  );

  // Mount flag for client-only rendering
  useEffect(() => {
    setMounted(true);

    const adminAuth = localStorage.getItem("adminAuthenticated");
    if (adminAuth === "true") setIsAuthenticated(true);

    const savedPicture = localStorage.getItem("profilePicture");
    if (savedPicture) setProfilePicturePreview(savedPicture);
  }, []);

  // Load projects & blogs after login
  useEffect(() => {
    if (isAuthenticated) {
      setProjects(getProjects());
      setBlogPosts(getBlogPosts());
    }
  }, [isAuthenticated]);

  // --- Login ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = "Manzidany2001@";
    if (password === adminPassword) {
      setIsAuthenticated(true);
      localStorage.setItem("adminAuthenticated", "true");
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminAuthenticated");
    setPassword("");
  };

  // --- Profile Picture ---
  const handleProfilePictureUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setProfilePicturePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSaveProfilePicture = () => {
    if (profilePicturePreview) {
      localStorage.setItem("profilePicture", profilePicturePreview);
      alert("Profile picture saved!");
    }
  };

  // --- Project Handlers ---
  const handleProjectImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setProjectImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleAddProject = (formData: FormData) => {
    const project: Project = {
      id: Date.now(),
      title: formData.get("title")?.toString() || "",
      description: formData.get("description")?.toString() || "",
      image: projectImagePreview || "/placeholder.svg",
      technologies: (formData.get("technologies")?.toString() || "").split(",").map(t => t.trim()),
      categories: (formData.get("categories")?.toString() || "").split(",").map(c => c.trim()),
      demoUrl: formData.get("demoUrl")?.toString() || "#",
      githubUrl: formData.get("githubUrl")?.toString() || "#",
      features: (formData.get("features")?.toString() || "").split(",").map(f => f.trim()),
    };
    saveProject(project);
    setProjects(getProjects());
    setProjectImagePreview("");
  };

  const handleDeleteProjectById = (id: number) => {
    deleteProject(id);
    setProjects(getProjects());
  };

  // --- Blog Handlers ---
  const handleBlogImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setBlogImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleAddBlog = (formData: FormData) => {
    const post: BlogPost = {
      id: Date.now(),
      title: formData.get("title")?.toString() || "",
      excerpt: formData.get("excerpt")?.toString() || "",
      date: formData.get("date")?.toString() || new Date().toISOString().split("T")[0],
      category: formData.get("category")?.toString() || "",
      readTime: formData.get("readTime")?.toString() || "5 min read",
      image: blogImagePreview || "/placeholder.svg",
    };
    saveBlogPost(post);
    setBlogPosts(getBlogPosts());
    setBlogImagePreview("");
  };

  const handleDeleteBlogById = (id: number) => {
    deleteBlogPost(id);
    setBlogPosts(getBlogPosts());
  };

  // --- Guard SSR ---
  if (!mounted) return null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-8 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit">Login</Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
          <Button variant="outline" asChild>
            <Link href="/">← Back to Portfolio</Link>
          </Button>
        </div>
      </div>

      {/* Profile Picture */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Profile Picture</h2>
        <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleProfilePictureUpload(e.target.files[0])} />
        {profilePicturePreview && (
          <img src={profilePicturePreview} alt="Profile Preview" className="mt-2 w-32 h-32 object-cover rounded-full border" />
        )}
        <Button onClick={handleSaveProfilePicture} className="mt-2">Save Profile Picture</Button>
      </div>

      {/* Projects */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Projects</h2>
        <form action={(formData) => handleAddProject(formData)} className="space-y-2">
          <Input name="title" placeholder="Project title" />
          <Input name="description" placeholder="Description" />
          <Input name="technologies" placeholder="Technologies (comma separated)" />
          <Input name="categories" placeholder="Categories (comma separated)" />
          <Input name="features" placeholder="Features (comma separated)" />
          <Input name="demoUrl" placeholder="Demo URL" />
          <Input name="githubUrl" placeholder="GitHub URL" />
          <Input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleProjectImageUpload(e.target.files[0])} />
          <Button type="submit">Add Project</Button>
        </form>

        <ul className="space-y-2 mt-4">
          {projects.map((p) => (
            <li key={p.id} className="flex justify-between">
              <span>{p.title}</span>
              <Button variant="destructive" size="sm" onClick={() => handleDeleteProjectById(p.id)}>Delete</Button>
            </li>
          ))}
        </ul>
      </div>

      {/* Blog Posts */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Blog Posts</h2>
        <form action={(formData) => handleAddBlog(formData)} className="space-y-2">
          <Input name="title" placeholder="Blog title" />
          <Input name="excerpt" placeholder="Excerpt" />
          <Input name="date" type="date" />
          <Input name="category" placeholder="Category" />
          <Input name="readTime" placeholder="Read Time" />
          <Input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleBlogImageUpload(e.target.files[0])} />
          <Button type="submit">Add Blog Post</Button>
        </form>

        <ul className="space-y-2 mt-4">
          {blogPosts.map((b) => (
            <li key={b.id} className="flex justify-between">
              <span>{b.title}</span>
              <Button variant="destructive" size="sm" onClick={() => handleDeleteBlogById(b.id)}>Delete</Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
