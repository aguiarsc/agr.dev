"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [cursorVariant, setCursorVariant] = useState("default")

  useEffect(() => {
    setMounted(true)
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      if (!isVisible) setIsVisible(true)

      const target = e.target as HTMLElement

      if (target.tagName === "A" || target.closest("a")) {
        setCursorVariant("link")
      } else if (target.tagName === "BUTTON" || target.closest("button")) {
        setCursorVariant("button")
      } else {
        setCursorVariant("default")
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener("mousemove", updatePosition)
    document.body.addEventListener("mouseleave", handleMouseLeave)
    document.body.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
      document.body.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [isVisible])

  const variants = {
    default: {
      x: position.x - 16,
      y: position.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(57, 255, 191, 0.2)",
      mixBlendMode: "difference" as const,
    },
    link: {
      x: position.x - 20,
      y: position.y - 20,
      height: 40,
      width: 40,
      backgroundColor: "rgba(57, 255, 191, 0.4)",
      mixBlendMode: "difference" as const,
    },
    button: {
      x: position.x - 24,
      y: position.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(57, 255, 191, 0.5)",
      mixBlendMode: "difference" as const,
    },
  }

  if (!mounted) return null

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-50"
      variants={variants}
      animate={cursorVariant}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      style={{ opacity: isVisible ? 1 : 0 }}
    />
  )
}