"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Briefcase, GraduationCap, Book, MapPin, ChevronLeft, ChevronRight } from "lucide-react"

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const experiences = [
    {
      title: "Degree in Spanish Language",
      period: "2018 - 2022",
      location: "Universidad de A Coruña",
      description:
        "Study of language structure, semantics, and communication systems. Developed analytical skills that translated to programming logic.",
      icon: <Book className="w-6 h-6" />,
      skills: ["Analysis", "Research", "Documentation", "Communication"],
    },
    {
      title: "First steps with web development",
      period: "2022 - 2023",
      location: "Remote",
      description:
        "Designed and developed websites for myself and friends. Achieved a solid foundation in HTML and CSS.",
      icon: <Briefcase className="w-6 h-6" />,
      skills: ["HTML/CSS", "JavaScript", "WordPress", "UI/UX"],
    },
    {
      title: "Web Application Development Degree",
      period: "2023 - 2025",
      location: "IES Fernando Wirtz Suárez",
      description:
        "Comprehensive study of full-stack development technologies and systems architecture. Focus on best practices and modern workflows.",
      icon: <GraduationCap className="w-6 h-6" />,
      skills: ["Docker", "JavaScript", "Java", "SQL", "HTML", "CSS", "Git", "React", "TypeScript"],
    },
    {
      title: "Altia Consultant – Internship",
      period: "2023 - Present",
      location: "Galicia, Spain",
      description:
        "Developing Java applications with Spring Boot. Working on microservices architecture and database layer optimization. Worked with Docker and Git. SQL and ETL bootcamp. LLM-related projects.",
      icon: <Briefcase className="w-6 h-6" />,
      skills: ["Java", "Spring Boot", "Microservices", "MariaDB", "Docker", "Git", "SQL", "ETL", "LLM"],
    },
  ]

  const smoothScroll = (targetScroll: number) => {
    if (!timelineRef.current) return

    const currentScroll = timelineRef.current.scrollLeft

    const duration = 800
    const start = currentScroll
    const change = targetScroll - currentScroll
    const startTime = performance.now()
    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    }

    const animateScroll = (currentTime: number) => {
      const elapsedTime = currentTime - startTime
      const progress = Math.min(elapsedTime / duration, 1)
      const easedProgress = easeInOutCubic(progress)

      if (timelineRef.current) {
        timelineRef.current.scrollLeft = start + change * easedProgress
      }

      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      }
    }

    requestAnimationFrame(animateScroll)
  }

  const scrollTimeline = (direction: "left" | "right") => {
    if (!timelineRef.current) return

    const scrollAmount = 350
    const currentScroll = timelineRef.current.scrollLeft
    const targetScroll = direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount

    smoothScroll(targetScroll)
  }

  useEffect(() => {
    const timeline = timelineRef.current
    if (!timeline) return

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation()
      e.preventDefault()

      if (e.deltaY === 0) return
      const direction = e.deltaY > 0 ? 1 : -1
      const scrollAmount = 150
      const currentScroll = timeline.scrollLeft
      const targetScroll = currentScroll + direction * scrollAmount

      smoothScroll(targetScroll)
    }

    timeline.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      timeline.removeEventListener("wheel", handleWheel)
    }
  }, [])

  return (
    <div ref={sectionRef} className="container mx-auto px-4 py-8 h-full flex flex-col">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold mb-8 text-center"
      >
        Experience Timeline
      </motion.h2>

      <div className="relative flex-grow flex flex-col">
        {/* Timeline navigation buttons */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:block">
          <button
            onClick={() => scrollTimeline("left")}
            className="bg-[#1a1a24] p-2 rounded-full hover:bg-[#39ffbf]/20 transition-colors"
            aria-label="Scroll timeline left"
          >
            <ChevronLeft className="w-6 h-6 text-[#39ffbf]" />
          </button>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:block">
          <button
            onClick={() => scrollTimeline("right")}
            className="bg-[#1a1a24] p-2 rounded-full hover:bg-[#39ffbf]/20 transition-colors"
            aria-label="Scroll timeline right"
          >
            <ChevronRight className="w-6 h-6 text-[#39ffbf]" />
          </button>
        </div>

        {/* Horizontal timeline */}
        <div className="relative flex-grow flex flex-col">
          {/* Main timeline line */}
          <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-[#39ffbf]/10 via-[#39ffbf] to-[#39ffbf]/10 transform -translate-y-1/2"></div>

          {/* Timeline items container */}
          <div
            ref={timelineRef}
            className="flex-grow flex items-center overflow-x-auto pb-4 hide-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            data-timeline-scroll="horizontal"
          >
            <div className="flex space-x-8 px-12 md:px-16 min-w-max py-32 my-8">
              {experiences.map((experience, index) => (
                <motion.div
                  key={experience.title}
                  initial={{ opacity: 0, y: index % 2 === 0 ? -20 : 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className={`relative w-80 ${index % 2 === 0 ? "mt-16" : "-mt-16"}`}
                >
                  <div className={`${index % 2 === 0 ? "mt-8" : "mb-8"}`}>
                    <div className="bg-[#1a1a24] p-6 rounded-lg border border-gray-800 hover:border-[#39ffbf]/30 transition-colors duration-300 shadow-lg h-full relative">
                      <div className="flex items-center mb-3">
                        <div className="text-[#39ffbf] mr-3">{experience.icon}</div>
                        <h3 className="text-xl font-semibold">{experience.title}</h3>
                      </div>

                      <div className="flex items-center text-sm text-gray-400 mb-4 gap-4">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1 text-[#39ffbf]/70" />
                          <span>{experience.location}</span>
                        </div>
                      </div>

                      <p className="mb-4 text-gray-300 text-sm">{experience.description}</p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {experience.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-[#0e0e12] text-xs rounded-md border border-gray-800"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Date in bottom right corner */}
                      <div className="absolute bottom-3 right-4 text-xs font-mono text-[#39ffbf]">
                        {experience.period}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-4 text-gray-400 text-sm hidden md:block"
        >
          <p>
            Scroll or use arrows to navigate <span className="text-[#39ffbf]">→</span>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
