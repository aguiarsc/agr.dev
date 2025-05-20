"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import ParticleBackground from "./particle-background"


export default function StackGrid() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  const stackCategories = [
    {
      title: "Frontend",
      items: [
        {
          name: "React",
          description: "I use React for dynamic component architecture and clean separation of concerns.",
        },
        {
          name: "TypeScript",
          description: "TypeScript helps me write more maintainable code with fewer runtime errors.",
        },
        {
          name: "TailwindCSS",
          description: "My go-to for rapid UI development with consistent design systems.",
        },
        {
          name: "Framer Motion",
          description: "I create fluid animations and micro-interactions to enhance UX.",
        },
        {
          name: "SVG/Canvas",
          description: "I build custom visualizations and interactive graphics for unique interfaces.",
        },
      ],
    },
    {
      title: "Backend",
      items: [
        {
          name: "Java",
          description: "Leveraging modern Java features for robust backend systems.",
        },
        {
          name: "Spring Boot",
          description: "Built scalable microservices with API-first approach using Spring Boot.",
        },
        {
          name: "NextJS",
          description: "Designed and implemented distributed systems with clear domain boundaries.",
        },
        {
          name: "Maven",
          description: "Dependency management and build automation for Java projects.",
        },
      ],
    },
    {
      title: "Databases & Data",
      items: [
        {
          name: "MariaDB",
          description: "Relational database for transactional systems with high performance needs.",
        },
        {
          name: "PostgreSQL",
          description: "My preferred database for complex data models and advanced queries.",
        },
        {
          name: "SQL",
          description: "Expert in writing optimized queries and designing efficient schemas.",
        },
        {
          name: "DBT",
          description: "Data transformation workflows for analytics and reporting pipelines.",
        },
        {
          name: "Snowflake",
          description: "Cloud data warehouse for large-scale analytics and data processing.",
        },
        {
          name: "Power BI",
          description: "Created interactive dashboards and reports for business intelligence.",
        },
      ],
    },
    {
      title: "Tools & Workflow",
      items: [
        {
          name: "Git/GitHub",
          description: "Version control and collaboration with branching strategies and CI/CD.",
        },
        {
          name: "Docker",
          description: "API testing and documentation for backend services.",
        },
        {
          name: "Figma",
          description: "Design collaboration and prototyping before implementation.",
        },
        {
          name: "Neovim",
          description: "Customized editor setup for maximum productivity and efficiency.",
        },
        {
          name: "Kubernetes",
          description: "Container Orchestration for production-grade applications.",
        },
      ],
    },
  ]



  return (
    <div
      ref={sectionRef}
      className="container mx-auto px-4 py-16 relative min-h-[80vh] flex flex-col justify-center"
      style={{
        background: "radial-gradient(circle at center, rgba(57, 255, 191, 0.03), transparent 70%)",
      }}
    >
      {/* Particle background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">{isInView && <ParticleBackground />}</div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="text-3xl md:text-4xl font-bold mb-12 text-center relative z-10"
      >
        My Toolbox
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {stackCategories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 + index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-[#1a1a24] rounded-xl p-6 h-full"
          >
            <h3 className="text-xl font-semibold mb-4 text-[#39ffbf]">{category.title}</h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item, itemIndex) => (
                <motion.span
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 + itemIndex * 0.05 }}
                  className="px-3 py-1 bg-[#0e0e12] rounded-full text-sm hover:bg-[#39ffbf] hover:text-[#0e0e12] transition-colors duration-300"
                >
                  {item.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>


    </div>
  )
}
