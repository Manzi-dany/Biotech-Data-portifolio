export interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  categories: string[]
  demoUrl: string
  githubUrl: string
  features: string[]
}

export interface BlogPost {
  id: number
  title: string
  excerpt: string
  date: string
  category: string
  readTime: string
  image: string
}

// Default data to initialize localStorage
const defaultProjects: Project[] = [
  {
    id: 1,
    title: "Biotech Data Analysis Platform",
    description:
      "Web application for analyzing genomic data with interactive visualizations and machine learning insights.",
    image: "/genomic-data-dashboard.png",
    technologies: ["Python", "Django", "Pandas", "Plotly"],
    categories: ["Biotechnology", "Python/Django Web Development", "Data Analysis"],
    demoUrl: "#",
    githubUrl: "#",
    features: ["Real-time data processing", "Interactive charts", "ML predictions", "Export functionality"],
  },
  // Add other default projects here...
]

const defaultBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Integrating Biotechnology with Data Science: My Journey",
    excerpt:
      "Exploring how I combined my passion for biology with data science to create innovative solutions in biotechnology research.",
    date: "2024-01-15",
    category: "Career",
    readTime: "5 min read",
    image: "/biotechnology-data-science.png",
  },
  // Add other default blog posts here...
]

export const getProjects = (): Project[] => {
  if (typeof window === "undefined") return defaultProjects
  const stored = localStorage.getItem("portfolio-projects")
  return stored ? JSON.parse(stored) : defaultProjects
}

export const getBlogPosts = (): BlogPost[] => {
  if (typeof window === "undefined") return defaultBlogPosts
  const stored = localStorage.getItem("portfolio-blog-posts")
  return stored ? JSON.parse(stored) : defaultBlogPosts
}

export const saveProject = (project: Omit<Project, "id">): void => {
  const projects = getProjects()
  const newProject = { ...project, id: Date.now() }
  const updatedProjects = [...projects, newProject]
  localStorage.setItem("portfolio-projects", JSON.stringify(updatedProjects))
}

export const saveBlogPost = (post: Omit<BlogPost, "id">): void => {
  const posts = getBlogPosts()
  const newPost = { ...post, id: Date.now() }
  const updatedPosts = [...posts, newPost]
  localStorage.setItem("portfolio-blog-posts", JSON.stringify(updatedPosts))
}

export const deleteProject = (id: number): void => {
  const projects = getProjects()
  const updatedProjects = projects.filter((p) => p.id !== id)
  localStorage.setItem("portfolio-projects", JSON.stringify(updatedProjects))
}

export const deleteBlogPost = (id: number): void => {
  const posts = getBlogPosts()
  const updatedPosts = posts.filter((p) => p.id !== id)
  localStorage.setItem("portfolio-blog-posts", JSON.stringify(updatedPosts))
}
