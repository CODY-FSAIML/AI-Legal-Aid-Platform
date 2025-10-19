"use client"

import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => setLanguage("en")}
        variant={language === "en" ? "default" : "outline"}
        size="sm"
        className="text-base font-semibold"
      >
        EN
      </Button>
      <Button
        onClick={() => setLanguage("hi")}
        variant={language === "hi" ? "default" : "outline"}
        size="sm"
        className="text-base font-semibold"
      >
        हिन्दी
      </Button>
      <Button
        onClick={() => setLanguage("te")}
        variant={language === "te" ? "default" : "outline"}
        size="sm"
        className="text-base font-semibold"
      >
        తెలుగు
      </Button>
    </div>
  )
}
