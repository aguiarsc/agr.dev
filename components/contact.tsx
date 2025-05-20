"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react"

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="w-6 h-6" />,
      url: "https://github.com/aguiarsc",
      username: "aguiarsc",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-6 h-6" />,
      url: "https://www.linkedin.com/pub/dir/Samuel/Aguiar+Cabaleiro",
      username: "samuelaguiar",
    },
    {
      name: "Email",
      icon: <Mail className="w-6 h-6" />,
      url: "mailto:samuel@mail.dev",
      username: "mail.dev",
    },
  ]

  return (
    <div ref={sectionRef} className="container mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold mb-6 text-center"
      >
        Let's Connect
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-xl text-center mb-12 max-w-lg mx-auto"
      >
        Want to chat? Reach out through any of these platforms.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-3xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-[#1a1a24] rounded-xl p-6 flex flex-col items-center text-center border border-gray-800 hover:border-[#39ffbf]/50 transition-colors group"
            >
              <div className="w-16 h-16 rounded-full bg-[#0e0e12] flex items-center justify-center mb-4 group-hover:bg-[#39ffbf]/10 transition-colors">
                <div className="text-[#39ffbf]">{link.icon}</div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{link.name}</h3>
              <p className="text-gray-400 mb-3 flex items-center gap-1">
                {link.username}
                <ExternalLink className="w-3 h-3 inline opacity-70" />
              </p>
              <div className="mt-auto">
                <span className="text-sm text-[#39ffbf] opacity-0 group-hover:opacity-100 transition-opacity">
                  Connect &rarr;
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#39ffbf] to-transparent opacity-30 blur-xl"></div>
            <p className="relative text-xl font-light italic">"The best code is written with collaboration in mind."</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
