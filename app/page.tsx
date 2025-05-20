"use client"

import { useEffect, useRef, useState } from "react"
import { useScroll } from "framer-motion"
import Hero from "@/components/hero"
import AboutMe from "@/components/about-me"
import StackGrid from "@/components/stack-grid"
import Projects from "@/components/projects"
import Philosophy from "@/components/philosophy"
import Experience from "@/components/experience"
import Contact from "@/components/contact"
import CustomCursor from "@/components/custom-cursor"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const [activeSection, setActiveSection] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  useEffect(() => {
    console.log("👋 Hey dev! My portfolio is open-source! Just head to GitHub!")
  }, [])

  useEffect(() => {
    sectionRefs.current = Array.from(document.querySelectorAll("section"))
  }, [])

  const scrollToSection = (index: number) => {
    if (isScrolling || !sectionRefs.current[index]) return

    setIsScrolling(true)
    setActiveSection(index)

    sectionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
    })

    setTimeout(() => {
      setIsScrolling(false)
    }, 1000)
  }
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      if (isScrolling) return

      const direction = e.deltaY > 0 ? 1 : -1
      const nextSection = Math.min(Math.max(0, activeSection + direction), sectionRefs.current.length - 1)

      if (nextSection !== activeSection) {
        scrollToSection(nextSection)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel)
      }
    }
  }, [activeSection, isScrolling])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault()
        const nextSection = Math.min(activeSection + 1, sectionRefs.current.length - 1)
        scrollToSection(nextSection)
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault()
        const prevSection = Math.max(activeSection - 1, 0)
        scrollToSection(prevSection)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeSection, isScrolling])

  useEffect(() => {
    if (typeof window === "undefined") return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isScrolling) {
            const index = sectionRefs.current.findIndex((section) => section === entry.target)
            if (index !== -1) {
              setActiveSection(index)
            }
          }
        })
      },
      { threshold: 0.5 },
    )

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section)
      })
    }
  }, [isScrolling])

  return (
    <main
      ref={containerRef}
      className="relative bg-[#0e0e12] text-[#f3f3f3] h-screen overflow-y-auto snap-y snap-mandatory"
    >
      <CustomCursor />

      <section className="min-h-screen snap-start snap-always">
        <Hero scrollProgress={scrollYProgress} />
      </section>

      <section className="min-h-screen snap-start snap-always flex items-center py-20">
        <AboutMe />
      </section>

      <section className="min-h-screen snap-start snap-always flex items-center py-20">
        <StackGrid />
      </section>

      <section className="min-h-screen snap-start snap-always flex items-center py-20">
        <Projects />
      </section>

      <section className="min-h-screen snap-start snap-always flex items-center py-20">
        <Philosophy />
      </section>

      <section className="min-h-screen snap-start snap-always flex items-center py-20">
        <Experience />
      </section>

      <section className="min-h-screen snap-start snap-always flex items-center py-20">
        <Contact />
      </section>

      {/* Navigation dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
        <div className="flex flex-col gap-4">
          {Array.from({ length: sectionRefs.current.length }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToSection(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === i ? "bg-[#39ffbf] scale-125" : "bg-gray-500 hover:bg-gray-400"
              }`}
              aria-label={`Scroll to section ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
