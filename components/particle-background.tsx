"use client"

import { useEffect, useRef } from "react"

type Particle = {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
  orbitRadius?: number
  orbitSpeed?: number
  orbitAngle?: number
  orbitCenterX?: number
  orbitCenterY?: number
  isOrbiting?: boolean
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const initParticles = () => {
      const particleCount = Math.min(Math.floor(canvas.width / 10), 100)
      particlesRef.current = []
      const orbitCenters = [
        { x: canvas.width * 0.25, y: canvas.height * 0.25 },
        { x: canvas.width * 0.75, y: canvas.height * 0.25 },
        { x: canvas.width * 0.25, y: canvas.height * 0.75 },
        { x: canvas.width * 0.75, y: canvas.height * 0.75 },
      ]

      for (let i = 0; i < particleCount * 0.6; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.8,
          speedY: (Math.random() - 0.5) * 0.8,
          opacity: Math.random() * 0.6 + 0.2,
          color: "#39ffbf",
        })
      }

      for (let i = 0; i < particleCount * 0.4; i++) {
        const centerIndex = Math.floor(Math.random() * orbitCenters.length)
        const center = orbitCenters[centerIndex]
        const orbitRadius = Math.random() * 180 + 40
        const orbitSpeed = (Math.random() * 0.01 + 0.01) * (Math.random() > 0.1 ? 0.1 : -0.1)
        const orbitAngle = Math.random() * Math.PI * 2

        particlesRef.current.push({
          x: center.x + Math.cos(orbitAngle) * orbitRadius,
          y: center.y + Math.sin(orbitAngle) * orbitRadius,
          size: Math.random() * 2.5 + 1,
          speedX: 0,
          speedY: 0,
          opacity: Math.random() * 0.7 + 0.3,
          color: "#39ffbf",
          orbitRadius,
          orbitSpeed,
          orbitAngle,
          orbitCenterX: center.x,
          orbitCenterY: center.y,
          isOrbiting: true,
        })
      }
    }

    const drawParticles = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = "#39ffbf20"
      ctx.lineWidth = 0.8

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i]
          const p2 = particlesRef.current[j]

          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            const opacity = 1 - distance / 120
            ctx.globalAlpha = opacity * 0.5

            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 1

      particlesRef.current.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)

        if (particle.size > 1.5) {
          const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size)
          gradient.addColorStop(0, `${particle.color}ff`)
          gradient.addColorStop(1, `${particle.color}00`)
          ctx.fillStyle = gradient
        } else {
          ctx.fillStyle =
            particle.color +
            Math.floor(particle.opacity * 255)
              .toString(16)
              .padStart(2, "0")
        }

        ctx.fill()

        if (particle.isOrbiting) {
          ctx.shadowColor = particle.color
          ctx.shadowBlur = 8
          ctx.fill()
          ctx.shadowBlur = 0
        }
      })

      const mouseX = mouseRef.current.x
      const mouseY = mouseRef.current.y

      if (mouseX > 0 && mouseY > 0) {
        ctx.beginPath()
        ctx.arc(mouseX, mouseY, 100, 0, Math.PI * 2)
        ctx.strokeStyle = "#39ffbf10"
        ctx.stroke()
      }
    }

    const updateParticles = () => {
      particlesRef.current.forEach((particle) => {
        if (
          particle.isOrbiting &&
          particle.orbitCenterX !== undefined &&
          particle.orbitCenterY !== undefined &&
          particle.orbitAngle !== undefined &&
          particle.orbitRadius !== undefined &&
          particle.orbitSpeed !== undefined
        ) {
          particle.orbitAngle += particle.orbitSpeed
          particle.x = particle.orbitCenterX + Math.cos(particle.orbitAngle) * particle.orbitRadius
          particle.y = particle.orbitCenterY + Math.sin(particle.orbitAngle) * particle.orbitRadius
        } else {
          particle.x += particle.speedX
          particle.y += particle.speedY

          const mouseX = mouseRef.current.x
          const mouseY = mouseRef.current.y

          if (mouseX > 0 && mouseY > 0) {
            const dx = mouseX - particle.x
            const dy = mouseY - particle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 100) {
              const force = (100 - distance) / 500
              particle.speedX -= dx * force
              particle.speedY -= dy * force

              particle.speedX += (Math.random() - 0.5) * 0.2
              particle.speedY += (Math.random() - 0.5) * 0.2
            }
          }

          if (particle.x < 0 || particle.x > canvas.width) {
            particle.speedX *= -0.9
            particle.x = particle.x < 0 ? 0 : canvas.width
          }

          if (particle.y < 0 || particle.y > canvas.height) {
            particle.speedY *= -0.9
            particle.y = particle.y < 0 ? 0 : canvas.height
          }

          particle.speedX *= 0.99
          particle.speedY *= 0.99
        }
        if (Math.random() < 0.01) {
          particle.opacity = Math.random() * 0.5 + 0.3
        }
      })
    }

    const animate = () => {
      updateParticles()
      drawParticles()
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", resizeCanvas)
    canvas.addEventListener("mousemove", handleMouseMove)
    resizeCanvas()
    initParticles()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />
}
