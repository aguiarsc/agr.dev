"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Code, BookOpen, MessageSquare, Layers, Lightbulb } from "lucide-react"

export default function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [activeTab, setActiveTab] = useState("syntax")

  return (
    <div ref={containerRef} className="container mx-auto px-4 py-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold mb-6 text-center"
      >
        The Philology of Code
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg text-center max-w-2xl mx-auto mb-12"
      >
        As a former student of linguistics, I approach programming as a language system with its own grammar, semantics,
        and cultural context.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left side: Code snippet with annotations */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-[#1a1a24] rounded-lg overflow-hidden border border-gray-800"
        >
          <div className="flex items-center gap-2 bg-[#0e0e12] px-4 py-2 border-b border-gray-800">
            <Code className="w-4 h-4 text-[#39ffbf]" />
            <span className="text-sm font-mono">component.tsx</span>
          </div>

          <div className="p-5 font-mono text-sm relative">
            <pre className="relative z-10 leading-relaxed">
              <CodeWithAnnotations activeTab={activeTab} />
            </pre>
          </div>
        </motion.div>

        {/* Right side: Linguistic analysis */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          <div className="flex space-x-2 mb-6">
            <TabButton
              active={activeTab === "syntax"}
              icon={<Layers className="w-4 h-4" />}
              label="Syntax"
              onClick={() => setActiveTab("syntax")}
            />
            <TabButton
              active={activeTab === "semantics"}
              icon={<BookOpen className="w-4 h-4" />}
              label="Semantics"
              onClick={() => setActiveTab("semantics")}
            />
            <TabButton
              active={activeTab === "pragmatics"}
              icon={<MessageSquare className="w-4 h-4" />}
              label="Pragmatics"
              onClick={() => setActiveTab("pragmatics")}
            />
            <TabButton
              active={activeTab === "philosophy"}
              icon={<Lightbulb className="w-4 h-4" />}
              label="Philosophy"
              onClick={() => setActiveTab("philosophy")}
            />
          </div>

          <AnimatedTabContent tab="syntax" activeTab={activeTab}>
            <h3 className="text-xl font-bold mb-3 text-[#39ffbf]">Syntax: The Grammar of Code</h3>
            <p className="mb-4">
              Just as language has grammar rules, code follows syntactic patterns that determine its validity. The
              structure of components, the nesting of functions, and the arrangement of statements all follow rules that
              create meaning.
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-[#39ffbf] mt-1">•</span>
                <span>
                  <strong>Nested structures</strong> in React components mirror the hierarchical nature of natural
                  language sentences
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#39ffbf] mt-1">•</span>
                <span>
                  <strong>Type declarations</strong> function like grammatical agreements in language
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#39ffbf] mt-1">•</span>
                <span>
                  <strong>Function composition</strong> resembles how clauses combine to form complex sentences
                </span>
              </li>
            </ul>
          </AnimatedTabContent>

          <AnimatedTabContent tab="semantics" activeTab={activeTab}>
            <h3 className="text-xl font-bold mb-3 text-[#39ffbf]">Semantics: The Meaning of Code</h3>
            <p className="mb-4">
              Beyond syntax, code carries meaning. Variable names, function purposes, and component relationships all
              contribute to a semantic layer that communicates intent and functionality to both machines and humans.
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-[#39ffbf] mt-1">•</span>
                <span>
                  <strong>Naming conventions</strong> create a lexicon that reveals the purpose and relationships of
                  code elements
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#39ffbf] mt-1">•</span>
                <span>
                  <strong>State management</strong> represents the changing context of an application, similar to how
                  context affects meaning in language
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#39ffbf] mt-1">•</span>
                <span>
                  <strong>Type systems</strong> enforce semantic constraints, ensuring code means what it claims to mean
                </span>
              </li>
            </ul>
          </AnimatedTabContent>

          <AnimatedTabContent tab="pragmatics" activeTab={activeTab}>
            <h3 className="text-xl font-bold mb-3 text-[#39ffbf]">Pragmatics: The Context of Code</h3>
            <p className="mb-4">
              Code exists within a context of use. The environment, user expectations, and developer conventions all
              shape how code is interpreted and what it accomplishes in the real world.
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-[#39ffbf] mt-1">•</span>
                <span>
                  <strong>User experience</strong> considerations determine how code communicates with end users
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#39ffbf] mt-1">•</span>
                <span>
                  <strong>Performance optimization</strong> adapts code to its execution environment, like how speech
                  adapts to different social contexts
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#39ffbf] mt-1">•</span>
                <span>
                  <strong>Code comments</strong> provide meta-communication about intent, similar to tone and gesture in
                  spoken language
                </span>
              </li>
            </ul>
          </AnimatedTabContent>

          <AnimatedTabContent tab="philosophy" activeTab={activeTab}>
            <h3 className="text-xl font-bold mb-3 text-[#39ffbf]">Philosophy: The Ethos of Code</h3>
            <p className="mb-4">
              At its core, code is a form of expression that embodies values and approaches. My philosophy of coding
              draws from linguistic principles to create systems that are not just functional, but meaningful and
              elegant.
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-[#39ffbf] mt-1">•</span>
                <span>
                  <strong>Clarity over cleverness</strong> — code should communicate its intent as clearly as
                  well-formed language
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#39ffbf] mt-1">•</span>
                <span>
                  <strong>Consistency in patterns</strong> — like a well-edited text, code should maintain consistent
                  conventions
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#39ffbf] mt-1">•</span>
                <span>
                  <strong>Empathy for readers</strong> — code is written once but read many times, and should respect
                  its audience
                </span>
              </li>
            </ul>
          </AnimatedTabContent>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-16 text-center"
      >
        <blockquote className="text-xl md:text-2xl italic">
          "The limits of my language mean the limits of my world." - Ludwig Wittgenstein
        </blockquote>
      </motion.div>
    </div>
  )
}

interface TabButtonProps {
  active: boolean
  icon: React.ReactNode
  label: string
  onClick: () => void
}

function TabButton({ active, icon, label, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-md text-sm flex items-center gap-2 transition-colors ${
        active ? "bg-[#39ffbf] text-[#0e0e12] font-medium" : "bg-[#1a1a24] text-gray-300 hover:bg-[#1a1a24]/80"
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

interface TabContentProps {
  tab: string
  activeTab: string
  children: React.ReactNode
}

function AnimatedTabContent({ tab, activeTab, children }: TabContentProps) {
  return (
    <div
      className={`transition-all duration-300 ${
        activeTab === tab ? "opacity-100 translate-y-0" : "opacity-0 absolute -translate-y-4 pointer-events-none"
      }`}
    >
      {children}
    </div>
  )
}

interface CodeProps {
  activeTab: string
}

function CodeWithAnnotations({ activeTab }: CodeProps) {
  const syntaxHighlight = activeTab === "syntax"
  const semanticsHighlight = activeTab === "semantics"
  const pragmaticsHighlight = activeTab === "pragmatics"
  const philosophyHighlight = activeTab === "philosophy"

  return (
    <code className="text-gray-300 text-sm">
      <span className={syntaxHighlight ? "text-purple-400" : ""}>interface</span>{" "}
      <span className={semanticsHighlight ? "text-yellow-400" : ""}>ButtonProps</span> {"{"}
      <br />
      {"  "}
      <span className={semanticsHighlight ? "text-yellow-400" : ""}>children</span>:{" "}
      <span className={syntaxHighlight ? "text-blue-400" : ""}>React.ReactNode</span>
      <br />
      {"  "}
      <span className={semanticsHighlight ? "text-yellow-400" : ""}>variant</span>?:{" "}
      <span className={syntaxHighlight ? "text-green-400" : ""}>{"'primary' | 'secondary'"}</span>
      <br />
      {"  "}
      <span className={pragmaticsHighlight ? "text-orange-400" : ""}>// Accessibility property</span>
      <br />
      {"  "}
      <span className={semanticsHighlight ? "text-yellow-400" : ""}>ariaLabel</span>?:{" "}
      <span className={syntaxHighlight ? "text-blue-400" : ""}>string</span>
      <br />
      {"}"}
      <br />
      <br />
      <span className={syntaxHighlight ? "text-purple-400" : ""}>export</span>{" "}
      <span className={syntaxHighlight ? "text-purple-400" : ""}>function</span>{" "}
      <span className={semanticsHighlight ? "text-yellow-400" : ""}>Button</span>({"{"}
      <span className={semanticsHighlight ? "text-yellow-400" : ""}>children</span>,{" "}
      <span className={semanticsHighlight ? "text-yellow-400" : ""}>variant</span> ={" "}
      <span className={philosophyHighlight ? "text-pink-400" : ""}>{"'primary'"}</span>
      {"}"}) {"{"}
      <br />
      {"  "}
      <span className={syntaxHighlight ? "text-purple-400" : ""}>const</span>{" "}
      <span className={semanticsHighlight ? "text-yellow-400" : ""}>classes</span> = {"{"}
      <br />
      {"    "}
      <span className={semanticsHighlight ? "text-yellow-400" : ""}>primary</span>:{" "}
      <span className={philosophyHighlight ? "text-pink-400" : ""}>{"'bg-accent text-black'"}</span>,
      <br />
      {"    "}
      <span className={semanticsHighlight ? "text-yellow-400" : ""}>secondary</span>:{" "}
      <span className={philosophyHighlight ? "text-pink-400" : ""}>{"'bg-muted text-accent'"}</span>
      <br />
      {"  "}
      {"}"}
      <br />
      <br />
      {"  "}
      <span className={syntaxHighlight ? "text-purple-400" : ""}>return</span> (
      <br />
      {"    "}
      &lt;
      <span className={syntaxHighlight ? "text-blue-400" : ""}>button</span>{" "}
      <span className={semanticsHighlight ? "text-yellow-400" : ""}>className</span>={"{"}
      <span className={semanticsHighlight ? "text-yellow-400" : ""}>classes</span>[
      <span className={semanticsHighlight ? "text-yellow-400" : ""}>variant</span>]{"}"}
      &gt;
      <br />
      {"      "}
      {"{"}
      <span className={semanticsHighlight ? "text-yellow-400" : ""}>children</span>
      {"}"}
      <br />
      {"    "}
      &lt;/
      <span className={syntaxHighlight ? "text-blue-400" : ""}>button</span>&gt;
      <br />
      {"  "}
      )
      <br />
      {"}"}
    </code>
  )
}
