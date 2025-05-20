"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { BookText, Code, Terminal, Layout } from "lucide-react"

export default function AboutMe() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  const progressionItems = [
    {
      icon: <BookText className="w-10 h-10" />,
      label: "Linguistics",
      position: "top-left",
      order: 1,
      pathProgress: 0.125,
    },
    {
      icon: <Code className="w-10 h-10" />,
      label: "Code",
      position: "top-right",
      order: 2,
      pathProgress: 0.375,
    },
    {
      icon: <Terminal className="w-10 h-10" />,
      label: "Programs",
      position: "bottom-right",
      order: 3,
      pathProgress: 0.625,
    },
    {
      icon: <Layout className="w-10 h-10" />,
      label: "Applications",
      position: "bottom-left",
      order: 4,
      pathProgress: 0.875,
    },
  ]

  const totalDuration = 2.5

  const pathDuration = totalDuration * 1.32

  return (
    <div ref={sectionRef} className="container mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="text-3xl md:text-4xl font-bold mb-12 text-center"
      >
        From Linguistics to Logic
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
          className="space-y-4"
        >
          <p className="text-lg">
            As a former student of Spanish Language & Literature, my passion for structure and meaning naturally led me
            to a new language: <span className="text-[#39ffbf]">code</span>.
          </p>
          <p className="text-lg">
            I recently completed a <span className="font-semibold">Web Application Development Degree</span>,
            transforming my understanding of language and logic.
          </p>
          <p className="text-lg">
            Currently, I'm an intern at <span className="font-semibold">Altia Consultant</span> — building scalable
            systems with solid backend architecture and thoughtful UI design.
          </p>
        </motion.div>

        <div className="flex justify-center">
          <div className="relative grid grid-cols-2 gap-6 w-full max-w-md">
            {/* Connecting path */}
            <motion.div
              className="absolute inset-0 z-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.2 } : { opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <svg width="100%" height="100%" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  d="M75,75 L225,75 L225,225 L75,225 Z"
                  stroke="#39ffbf"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: pathDuration, ease: "easeInOut" }}
                />
              </svg>
            </motion.div>

            {/* Progression items */}
            {progressionItems.map((item) => {
              const isLeft = item.position.includes("left")
              const isTop = item.position.includes("top")

              const itemDelay = item.pathProgress * totalDuration

              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: itemDelay,
                  }}
                  className={`flex flex-col items-center justify-center p-4 bg-[#1a1a24] rounded-lg aspect-square z-10`}
                  style={{ gridColumn: isLeft ? 1 : 2, gridRow: isTop ? 1 : 2 }}
                  whileHover={{
                    boxShadow: "0 0 10px rgba(57, 255, 191, 0.2)",
                    transition: { duration: 0.3 },
                  }}
                >
                  <motion.div
                    className="text-[#39ffbf] mb-2"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                      delay: itemDelay + 0.1,
                    }}
                  >
                    {item.icon}
                  </motion.div>
                  <motion.span
                    className="text-sm font-medium"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                      delay: itemDelay + 0.2,
                    }}
                  >
                    {item.label}
                  </motion.span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.8 }}
        className="mt-16 text-center"
      >
        <blockquote className="text-xl md:text-2xl italic">
          "Programs must be written for people to read, and only incidentally for machines to execute."
          <footer className="text-sm mt-2 text-gray-400">— Harold Abelson</footer>
        </blockquote>
      </motion.div>
    </div>
  )
}
