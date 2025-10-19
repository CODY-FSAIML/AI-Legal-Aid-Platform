"use client"

import { useLanguage } from "@/context/language-context"

interface HealthAdviceProps {
  advice: string
}

export default function HealthAdvice({ advice }: HealthAdviceProps) {
  const { language } = useLanguage()
  const lines = advice.split("\n")

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)

      // Set language for speech synthesis
      const langMap: Record<string, string> = {
        en: "en-US",
        hi: "hi-IN",
        te: "te-IN",
      }
      utterance.lang = langMap[language] || "en-US"
      utterance.rate = 0.9
      utterance.pitch = 1

      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="space-y-3">
      {lines.map((line, idx) => {
        if (!line.trim()) return null

        if (line.includes("Advice:")) {
          return (
            <h4 key={idx} className="font-bold text-lg text-green-900">
              {line}
            </h4>
          )
        }

        if (line.match(/^\d+\./)) {
          return (
            <div key={idx} className="flex gap-3 text-base">
              <span className="font-bold text-green-700 flex-shrink-0">{line.match(/^\d+/)?.[0]}.</span>
              <span className="text-green-900">{line.replace(/^\d+\.\s*/, "")}</span>
            </div>
          )
        }

        if (line.includes("See a doctor") || line.includes("Important:")) {
          return (
            <div key={idx} className="mt-3 p-3 bg-red-100 border-l-4 border-red-500 rounded">
              <p className="font-semibold text-red-900">{line}</p>
            </div>
          )
        }

        return (
          <p key={idx} className="text-base text-green-900">
            {line}
          </p>
        )
      })}
    </div>
  )
}
