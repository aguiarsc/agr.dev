"use client"

import { motion } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"
import Image from "next/image"

export default function Projects() {
  const projects = [
    {
      title: "HistorIA",
      image: "/historia.png",
      role: "Full-Stack Developer",
      stack: ["React", "Tailwind", "Framer Motion", "Vite", "TypeScript", "IndexDB", "LLM"],
      summary: "AI-Powered Markdown Editor for Literary Writers",
      github: "https://github.com/aguiarsc/historIA",
      demo: "https://historiaeditor.vercel.app"
    },
    {
      title: "QRchitect",
      image: "/qrchitect.png",
      role: "Frontend Developer",
      stack: ["TypeScript", "Tailwind", "React", "Vite"],
      summary: "Simple QR Code Generator with the looks.",
      github: "https://github.com/aguiarsc/qrchitect"
    },
    {
      title: "Numen",
      image: "/terminal.png",
      role: "Full-Stack Developer",
      stack: ["Python", "PowerShell", "Shell", "Makefile"],
      summary: "Markdown-compatible AI-Powered Terminal Notepad",
      github: "https://github.com/aguiarsc/numen"
    },
  ]

  return (
    <div className="container mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold mb-12 text-center"
      >
        Code in Action
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-[#1a1a24] rounded-xl overflow-hidden"
          >
            <div className="relative w-full h-[300px]">
              <Image 
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={500}
                height={300}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-sm text-gray-400 mb-2">{project.role}</p>

              <div className="flex flex-wrap gap-2 mb-3">
                {project.stack.map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-[#0e0e12] rounded-md text-xs">
                    {tech}
                  </span>
                ))}
              </div>

              <p className="text-sm mb-4">{project.summary}</p>

              <div className="flex gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    className="text-gray-400 hover:text-[#39ffbf] transition-colors"
                    aria-label="GitHub repository"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    className="text-gray-400 hover:text-[#39ffbf] transition-colors"
                    aria-label="Live demo"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
