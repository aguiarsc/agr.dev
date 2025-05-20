"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Terminal } from "lucide-react"

export default function NotFound() {
  const [text, setText] = useState("")
  const fullText = "> cd /samuel/portfolio\nError 404: Path Not Found\nTry: /contact or /projects"

  useEffect(() => {
    let i = 0
    const typing = setInterval(() => {
      setText(fullText.substring(0, i))
      i++
      if (i > fullText.length) clearInterval(typing)
    }, 50)

    return () => clearInterval(typing)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0e0e12] text-[#f3f3f3] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-[#1a1a24] rounded-lg overflow-hidden"
      >
        <div className="bg-[#0e0e12] px-4 py-2 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#39ffbf]" />
          <span className="text-sm font-mono">terminal</span>
        </div>
        <div className="p-6">
          <pre className="font-mono text-[#39ffbf] whitespace-pre-wrap">{text}</pre>
          <div className="inline-block w-2 h-5 bg-[#39ffbf] animate-pulse mt-1"></div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="mt-8"
      >
        <Link
          href="/"
          className="px-4 py-2 bg-[#39ffbf] text-[#0e0e12] rounded-md font-medium hover:bg-[#39ffbf]/80 transition-colors"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  )
}
