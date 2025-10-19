"use client"

import { useState } from "react"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Home, Volume2 } from "lucide-react"
import Footer from "./footer"

interface FAQPageProps {
  onBack: () => void
  onHome: () => void
}

export default function FAQPage({ onBack, onHome }: FAQPageProps) {
  const { t, language } = useLanguage()
  const [expanded, setExpanded] = useState<string | null>(null)
  const [speakingId, setSpeakingId] = useState<string | null>(null)

  const healthFaqs = [
    { id: "fever", q: t("faq.fever"), a: t("faq.fever.answer") },
    { id: "cough", q: t("faq.cough"), a: t("faq.cough.answer") },
    { id: "headache", q: t("faq.headache"), a: t("faq.headache.answer") },
    { id: "stomach", q: t("faq.stomach"), a: t("faq.stomach.answer") },
    { id: "cold", q: t("faq.cold"), a: t("faq.cold.answer") },
  ]

  const legalFaqs = [
    { id: "consumer", q: t("faq.legal.consumer"), a: t("faq.legal.consumer.answer") },
    { id: "divorce", q: t("faq.legal.divorce"), a: t("faq.legal.divorce.answer") },
    { id: "property", q: t("faq.legal.property"), a: t("faq.legal.property.answer") },
    { id: "rights", q: t("faq.legal.rights"), a: t("faq.legal.rights.answer") },
    { id: "contract", q: t("faq.legal.contract"), a: t("faq.legal.contract.answer") },
  ]

  const speakAnswer = (text: string, id: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)

      const langMap: Record<string, string> = {
        en: "en-US",
        hi: "hi-IN",
        te: "te-IN",
      }
      utterance.lang = langMap[language] || "en-US"
      utterance.rate = 0.9
      utterance.pitch = 1

      utterance.onstart = () => setSpeakingId(id)
      utterance.onend = () => setSpeakingId(null)

      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(utterance)
    }
  }

  const FAQSection = ({ title, faqs }: { title: string; faqs: typeof healthFaqs }) => (
    <div className="space-y-4">
      <h3 className="text-3xl font-bold text-primary">{title}</h3>
      <div className="space-y-3">
        {faqs.map((faq) => (
          <Card key={faq.id} className="overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === faq.id ? null : faq.id)}
              className="w-full p-4 text-left font-semibold text-lg hover:bg-muted transition-colors flex justify-between items-center"
              aria-expanded={expanded === faq.id}
            >
              <span>{faq.q}</span>
              <span className="text-2xl">{expanded === faq.id ? "−" : "+"}</span>
            </button>
            {expanded === faq.id && (
              <div className="p-4 bg-muted border-t border-border space-y-3">
                <p className="text-base leading-relaxed whitespace-pre-wrap">{faq.a}</p>
                <Button
                  onClick={() => speakAnswer(faq.a, faq.id)}
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
                  disabled={speakingId === faq.id}
                  aria-label={`Listen to ${faq.q}`}
                >
                  <Volume2 size={16} />
                  {speakingId === faq.id ? "Playing..." : t("common.listen")}
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen p-4 pb-32 bg-background">
      <div className="flex gap-2 mb-6">
        <Button
          onClick={onBack}
          variant="ghost"
          className="text-lg flex items-center gap-2 h-12 px-4"
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
          <span className="text-lg font-semibold">{t("common.back")}</span>
        </Button>
        <Button
          onClick={onHome}
          variant="ghost"
          className="text-lg flex items-center gap-2 h-12 px-4"
          aria-label="Go to home"
        >
          <Home size={24} />
          <span className="text-lg font-semibold">{t("common.home")}</span>
        </Button>
      </div>

      <div className="max-w-2xl mx-auto mb-6 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
        <p className="text-base font-semibold text-yellow-900">{t("common.disclaimer")}</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        <h2 className="text-4xl font-bold text-primary">{t("faq.title")}</h2>

        <FAQSection title="Health FAQs" faqs={healthFaqs} />
        <FAQSection title="Legal FAQs" faqs={legalFaqs} />

        <Card className="p-6 bg-accent/10 border-accent">
          <h3 className="text-2xl font-semibold mb-3">Need More Help?</h3>
          <p className="text-lg leading-relaxed mb-4">
            If you cannot find the answer to your question in the FAQ section, please visit the Health or Legal
            Suggestions pages to ask your specific question.
          </p>
          <p className="text-base text-muted-foreground">
            All information is available offline and in multiple languages: English, Hindi, and Telugu.
          </p>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
