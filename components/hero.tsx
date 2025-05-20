"use client"

import { useRef } from "react"
import { motion, type MotionValue } from "framer-motion"
import { ArrowDown } from "lucide-react"

interface HeroProps {
  scrollProgress: MotionValue<number>
}

export default function Hero({ scrollProgress }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const techStack = ["Backend", "Frontend", "Data", "DevOps"]

  const scrollToNextSection = () => {
    const nextSection = document.querySelector("section:nth-of-type(2)")
    nextSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center w-full h-screen px-4">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-center"
      >
        Samuel Aguiar
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center mb-8"
      >
        <p className="text-xl md:text-2xl font-light mb-2">
          Full-Stack Developer based in Galicia
        </p>
        <p className="text-[#39ffbf] italic mb-2">Intern @ Altia Consultant</p>
        <p className="text-lg md:text-xl">Bridging aesthetics, services, and stories.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-2xl mb-12"
      >
        {techStack.map((tech, index) => (
          <motion.div
            key={tech}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
            className="px-3 py-1 bg-[#1a1a24] rounded-full text-sm hover:bg-[#39ffbf] hover:text-[#0e0e12] transition-colors duration-300"
          >
            {tech}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="cursor-pointer hover:scale-110 transition-transform"
          onClick={scrollToNextSection}
        >
          <ArrowDown className="w-8 h-8 text-[#39ffbf]" />
        </motion.div>
      </motion.div>
    </div>
  )
}
