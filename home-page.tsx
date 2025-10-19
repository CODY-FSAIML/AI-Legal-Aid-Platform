"use client"

import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Heart, Scale, HelpCircle } from "lucide-react"
import Footer from "./footer"

interface HomePageProps {
  onNavigate: (page: "health" | "legal" | "faq") => void
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-6 pb-32">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">{t("app.title")}</h2>
        <p className="text-lg text-muted-foreground">Choose what you need help with</p>
      </div>

      <div className="w-full max-w-md space-y-4">
        <Button
          onClick={() => onNavigate("health")}
          className="w-full h-32 text-2xl font-bold flex flex-col items-center justify-center gap-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl"
        >
          <Heart size={48} />
          <span>{t("home.health")}</span>
        </Button>

        <Button
          onClick={() => onNavigate("legal")}
          className="w-full h-32 text-2xl font-bold flex flex-col items-center justify-center gap-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl"
        >
          <Scale size={48} />
          <span>{t("home.legal")}</span>
        </Button>

        <Button
          onClick={() => onNavigate("faq")}
          variant="outline"
          className="w-full h-24 text-xl font-bold flex flex-col items-center justify-center gap-3 rounded-2xl border-2"
        >
          <HelpCircle size={40} />
          <span>{t("home.faq")}</span>
        </Button>
      </div>

      <Footer />
    </div>
  )
}
