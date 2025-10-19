"use client"

import { useLanguage } from "@/context/language-context"

interface LegalAdviceProps {
  advice: string
}

export default function LegalAdvice({ advice }: LegalAdviceProps) {
  const { language } = useLanguage()
  const lines = advice.split("\n")

  return (
    <div className="space-y-3">
      {lines.map((line, idx) => {
        if (!line.trim()) return null

        if (line.includes("Advice:")) {
          return (
            <h4 key={idx} className="font-bold text-lg text-blue-900">
              {line}
            </h4>
          )
        }

        if (line.match(/^\d+\./)) {
          return (
            <div key={idx} className="flex gap-3 text-base">
              <span className="font-bold text-blue-700 flex-shrink-0">{line.match(/^\d+/)?.[0]}.</span>
              <span className="text-blue-900">{line.replace(/^\d+\.\s*/, "")}</span>
            </div>
          )
        }

        if (
          line.includes("Important:") ||
          line.includes("Your rights:") ||
          line.includes("Never sign:") ||
          line.includes("Free Legal Help:")
        ) {
          return (
            <div key={idx} className="mt-3 p-3 bg-amber-100 border-l-4 border-amber-500 rounded">
              <p className="font-semibold text-amber-900">{line}</p>
            </div>
          )
        }

        return (
          <p key={idx} className="text-base text-blue-900">
            {line}
          </p>
        )
      })}
    </div>
  )
}
