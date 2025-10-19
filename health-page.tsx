"use client"

import { useState } from "react"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Home, Volume2, Send, AlertCircle } from "lucide-react"
import VoiceInput from "./voice-input"
import HealthAdvice from "./health-advice"
import Footer from "./footer"
import { useLocation } from "@/hooks/use-location"
import NearbyFacilities from "./nearby-facilities"

interface HealthPageProps {
  onBack: () => void
  onHome: () => void
}

export default function HealthPage({ onBack, onHome }: HealthPageProps) {
  const { t, language } = useLanguage()
  const [question, setQuestion] = useState("")
  const [advice, setAdvice] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const {
    location,
    loading: locationLoading,
    error: locationError,
    permissionDenied,
    requestLocation,
    getNearbyFacilities,
  } = useLocation()
  const [showNearbyFacilities, setShowNearbyFacilities] = useState(false)

  const handleVoiceInput = (text: string) => {
    setQuestion(text)
    setError(null)
  }

  const handleSubmit = () => {
    setError(null)

    if (!question.trim()) {
      setError(t("health.empty"))
      return
    }

    const lowerQuestion = question.toLowerCase()
    const healthKeywords = [
      "fever",
      "temperature",
      "cough",
      "headache",
      "head pain",
      "stomach",
      "diarrhea",
      "vomit",
      "cold",
      "runny nose",
      "pain",
      "ache",
      "sick",
      "ill",
      "disease",
      "symptom",
      "medicine",
      "doctor",
      "health",
      "medical",
    ]

    const isHealthRelated = healthKeywords.some((keyword) => lowerQuestion.includes(keyword))

    if (!isHealthRelated) {
      setError(t("health.invalid"))
      return
    }

    let response = ""

    if (lowerQuestion.includes("fever") || lowerQuestion.includes("temperature")) {
      response =
        "EMERGENCY CARE:\nGo to hospital immediately if: Temperature above 104°F (40°C), difficulty breathing, severe headache, confusion, or unconsciousness.\n\nFever Advice:\n\n1. Rest - Sleep helps your body fight infection\n2. Drink water - Stay hydrated\n3. Take paracetamol - Follow dosage on package\n4. Cool compress - Put on forehead\n\nSee a doctor if:\n- Fever lasts more than 3 days\n- Temperature is above 103°F (39.4°C)\n- You have difficulty breathing"
    } else if (lowerQuestion.includes("cough")) {
      response =
        "EMERGENCY CARE:\nGo to hospital immediately if: Coughing up blood, severe chest pain, difficulty breathing, or wheezing.\n\nCough Advice:\n\n1. Drink warm water - Helps soothe throat\n2. Rest - Give your body time to heal\n3. Honey - A spoonful can help (not for babies)\n4. Avoid smoke - Stay in clean air\n\nSee a doctor if:\n- Cough lasts more than 2 weeks\n- You cough up blood\n- You have chest pain"
    } else if (lowerQuestion.includes("headache") || lowerQuestion.includes("head pain")) {
      response =
        "EMERGENCY CARE:\nGo to hospital immediately if: Sudden severe headache, headache with fever and stiff neck, vision changes, or confusion.\n\nHeadache Advice:\n\n1. Rest - Lie down in a quiet, dark room\n2. Drink water - Dehydration causes headaches\n3. Take paracetamol - Follow dosage on package\n4. Apply cold compress - On forehead or neck\n\nSee a doctor if:\n- Headache is severe and sudden\n- It lasts more than 3 days\n- You have fever with headache"
    } else if (
      lowerQuestion.includes("stomach") ||
      lowerQuestion.includes("diarrhea") ||
      lowerQuestion.includes("vomit")
    ) {
      response =
        "EMERGENCY CARE:\nGo to hospital immediately if: Severe abdominal pain, blood in stool/vomit, signs of dehydration (dizziness, dry mouth), or high fever.\n\nStomach Problem Advice:\n\n1. Rest - Avoid heavy activities\n2. Drink water slowly - Small sips\n3. Eat light food - Rice, bread, banana\n4. Avoid dairy and spicy food\n\nSee a doctor if:\n- Diarrhea lasts more than 3 days\n- You have severe pain\n- You see blood in stool"
    } else if (lowerQuestion.includes("cold") || lowerQuestion.includes("runny nose")) {
      response =
        "EMERGENCY CARE:\nGo to hospital immediately if: Severe difficulty breathing, high fever, or signs of pneumonia (chest pain, shortness of breath).\n\nCold Advice:\n\n1. Rest - Get plenty of sleep\n2. Drink warm fluids - Tea, soup, water\n3. Use saline drops - For nose\n4. Gargle salt water - For sore throat\n\nSee a doctor if:\n- Cold lasts more than 10 days\n- You develop high fever\n- You have difficulty breathing"
    } else {
      response =
        "EMERGENCY CARE:\nGo to hospital immediately if: Severe pain, difficulty breathing, unconsciousness, or severe bleeding.\n\nGeneral Health Advice:\n\n1. Rest - Your body needs time to heal\n2. Drink water - Stay hydrated\n3. Eat healthy food - Fruits, vegetables, protein\n4. Keep clean - Wash hands regularly\n\nAlways see a doctor if:\n- Symptoms get worse\n- You have high fever\n- You have difficulty breathing\n- You have severe pain"
    }

    setAdvice(response)
    setShowNearbyFacilities(true)
    if (!location && !permissionDenied) {
      setTimeout(() => {
        requestLocation()
      }, 500)
    }
  }

  const speakAdvice = () => {
    if (advice && "speechSynthesis" in window) {
      if (isSpeaking) {
        // Stop speaking
        window.speechSynthesis.cancel()
        setIsSpeaking(false)
      } else {
        // Start speaking
        const utterance = new SpeechSynthesisUtterance(advice)

        const langMap: Record<string, string> = {
          en: "en-US",
          hi: "hi-IN",
          te: "te-IN",
        }
        utterance.lang = langMap[language] || "en-US"
        utterance.rate = 0.9
        utterance.pitch = 1

        utterance.onstart = () => setIsSpeaking(true)
        utterance.onend = () => setIsSpeaking(false)
        utterance.onerror = () => setIsSpeaking(false)

        window.speechSynthesis.cancel()
        window.speechSynthesis.speak(utterance)
      }
    }
  }

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

      <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
        <p className="text-base font-semibold text-red-900">{t("common.emergency")}</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <h2 className="text-4xl font-bold text-primary">{t("health.title")}</h2>

        <Card className="p-6 space-y-4">
          <h3 className="text-2xl font-semibold">{t("health.ask")}</h3>

          <VoiceInput onTranscript={handleVoiceInput} placeholder={t("health.text")} />

          <textarea
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value)
              setError(null)
            }}
            placeholder={t("health.text")}
            className="w-full p-4 border-2 border-border rounded-lg text-lg min-h-24 focus:outline-none focus:border-primary"
            aria-label="Health question input"
          />

          {error && (
            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg flex gap-3" role="alert">
              <AlertCircle size={24} className="text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-lg text-red-900 font-semibold">{error}</p>
            </div>
          )}

          <Button
            onClick={handleSubmit}
            className="w-full h-16 text-xl font-bold bg-green-600 hover:bg-green-700 text-white rounded-xl flex items-center justify-center gap-2"
            aria-label="Get health advice"
          >
            <Send size={24} />
            {t("health.submit")}
          </Button>
        </Card>

        {advice && (
          <>
            <Card className="p-6 space-y-4 bg-green-50 border-green-200">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold text-green-900">Health Advice</h3>
                <Button
                  onClick={speakAdvice}
                  className={`text-white flex items-center gap-2 ${
                    isSpeaking ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                  }`}
                  aria-label={isSpeaking ? "Stop listening" : "Listen to health advice"}
                >
                  <Volume2 size={20} />
                  {isSpeaking ? "Stop" : t("common.listen")}
                </Button>
              </div>
              <HealthAdvice advice={advice} />
            </Card>

            {showNearbyFacilities && (
              <NearbyFacilities
                facilities={getNearbyFacilities("hospital")}
                loading={locationLoading}
                error={locationError}
                permissionDenied={permissionDenied}
                onRequestLocation={requestLocation}
                facilityType="hospital"
              />
            )}
          </>
        )}

        <OfflineFAQ />
      </div>

      <Footer />
    </div>
  )
}

function OfflineFAQ() {
  const { t, language } = useLanguage()
  const [expanded, setExpanded] = useState<string | null>(null)
  const [speakingId, setSpeakingId] = useState<string | null>(null)

  const faqs = [
    { id: "fever", q: t("faq.fever"), a: t("faq.fever.answer") },
    { id: "cough", q: t("faq.cough"), a: t("faq.cough.answer") },
    { id: "headache", q: t("faq.headache"), a: t("faq.headache.answer") },
  ]

  const toggleSpeakAnswer = (id: string, text: string) => {
    if ("speechSynthesis" in window) {
      if (speakingId === id) {
        // Stop speaking
        window.speechSynthesis.cancel()
        setSpeakingId(null)
      } else {
        // Start speaking
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
        utterance.onerror = () => setSpeakingId(null)

        window.speechSynthesis.cancel()
        window.speechSynthesis.speak(utterance)
      }
    }
  }

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-2xl font-semibold">{t("faq.title")}</h3>
      <div className="space-y-3">
        {faqs.map((faq) => (
          <div key={faq.id} className="border border-border rounded-lg">
            <button
              onClick={() => setExpanded(expanded === faq.id ? null : faq.id)}
              className="w-full p-4 text-left font-semibold text-lg hover:bg-muted transition-colors flex justify-between items-center"
              aria-expanded={expanded === faq.id}
            >
              <span>{faq.q}</span>
              <span className="text-2xl">{expanded === faq.id ? "−" : "+"}</span>
            </button>
            {expanded === faq.id && (
              <div className="p-4 bg-muted text-base border-t border-border space-y-3">
                <p>{faq.a}</p>
                <Button
                  onClick={() => toggleSpeakAnswer(faq.id, faq.a)}
                  size="sm"
                  className={`text-white flex items-center gap-2 ${
                    speakingId === faq.id ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                  }`}
                  aria-label={speakingId === faq.id ? "Stop listening" : `Listen to ${faq.q}`}
                >
                  <Volume2 size={16} />
                  {speakingId === faq.id ? "Stop" : t("common.listen")}
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  )
}
