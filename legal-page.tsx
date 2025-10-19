"use client"

import { useState } from "react"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Home, Volume2, Send, AlertCircle } from "lucide-react"
import VoiceInput from "./voice-input"
import LegalAdvice from "./legal-advice"
import Footer from "./footer"
import { useLocation } from "@/hooks/use-location"
import NearbyFacilities from "./nearby-facilities"

interface LegalPageProps {
  onBack: () => void
  onHome: () => void
}

export default function LegalPage({ onBack, onHome }: LegalPageProps) {
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
  const [facilityType, setFacilityType] = useState<"police" | "legal_aid" | "court">("legal_aid")

  const handleVoiceInput = (text: string) => {
    setQuestion(text)
    setError(null)
  }

  const handleSubmit = () => {
    setError(null)

    if (!question.trim()) {
      setError(t("legal.empty"))
      return
    }

    const lowerQuestion = question.toLowerCase()
    const legalKeywords = [
      "divorce",
      "marriage",
      "property",
      "land",
      "rights",
      "discrimination",
      "contract",
      "agreement",
      "crime",
      "police",
      "legal",
      "law",
      "court",
      "lawyer",
      "complaint",
      "consumer",
      "document",
      "will",
      "inheritance",
      "arrested",
      "arrest",
      "jail",
      "bail",
      "charge",
      "accused",
    ]

    const isLegalRelated = legalKeywords.some((keyword) => lowerQuestion.includes(keyword))

    if (!isLegalRelated) {
      setError(t("legal.invalid"))
      return
    }

    let response = ""
    let type: "police" | "legal_aid" | "court" = "legal_aid"

    if (
      lowerQuestion.includes("arrested") ||
      lowerQuestion.includes("arrest") ||
      lowerQuestion.includes("jail") ||
      lowerQuestion.includes("bail") ||
      lowerQuestion.includes("charge") ||
      lowerQuestion.includes("accused")
    ) {
      response =
        "EMERGENCY: If You Are Arrested\n\n⚠️ IMMEDIATE STEPS:\n1. Stay Calm - Do not resist or argue with police\n2. Know Your Rights - You have the right to remain silent\n3. Ask for Lawyer - Say 'I want to speak to a lawyer' and stay silent\n4. Do Not Sign Anything - Without a lawyer present\n\nYour Legal Rights When Arrested:\n- Right to know the charges against you\n- Right to remain silent (do not answer questions)\n- Right to a lawyer (free if you cannot afford one)\n- Right to inform family/friends about your arrest\n- Right to medical examination if injured\n- Right to bail hearing within 24-48 hours\n\nWhat Happens Next:\n1. Police will take you to station\n2. You will be questioned (you can refuse)\n3. You will be presented before magistrate within 24 hours\n4. Bail hearing will be held\n5. You can get free legal help from legal aid center\n\nFREE LEGAL HELP:\n- Legal Aid Centers (free lawyer for poor people)\n- Police Station (ask for legal aid)\n- District Court (legal aid available)\n- NGOs and Human Rights Organizations\n- National Legal Services Authority (NALSA)\n\nIMPORTANT:\n- Do not confess without a lawyer\n- Keep all documents and receipts\n- Note down police officer names and badge numbers\n- Contact family immediately\n- Ask for bail as soon as possible\n\nEmergency Contacts:\n- Police: 100\n- Legal Aid Helpline: 1800-11-4000\n- Women Helpline (if applicable): 1091\n- Human Rights Commission: Check your state"
      type = "police"
    } else if (lowerQuestion.includes("consumer") || lowerQuestion.includes("complaint")) {
      response =
        "Consumer Complaint Advice:\n\nStep 1: Gather Evidence - Collect all purchase receipts, product photos, warranty cards, and communication with seller.\n\nStep 2: Contact Seller First - Send written complaint to seller/company within 30 days. Keep copy of letter.\n\nStep 3: File Consumer Complaint:\n- For amounts under ₹10 lakh: District Consumer Forum\n- For ₹10 lakh to ₹1 crore: State Consumer Commission\n- For above ₹1 crore: National Consumer Commission\n\nStep 4: Required Documents - Complaint form (Form-1A), copies of bills/receipts, ID proof (Aadhaar/PAN), address proof.\n\nStep 5: Filing Fee - ₹100 to ₹5,000 based on claim amount.\n\nStep 6: Timeline - Decision typically within 3-6 months.\n\nFree Help:\n- National Consumer Helpline: 1800-11-4000 (10 AM - 5:30 PM)\n- Online filing: www.edaakhil.nic.in\n- Legal aid centers in your district"
      type = "court"
    } else if (lowerQuestion.includes("divorce") || lowerQuestion.includes("marriage")) {
      response =
        "Divorce/Marriage Advice:\n\n1. Contact a lawyer - Get professional legal help\n2. Gather documents - Marriage certificate, property papers\n3. Know your rights - Both men and women have equal rights\n4. Visit legal aid center - Free help if you cannot afford a lawyer\n\nImportant:\n- Divorce takes time (usually 6 months to 2 years)\n- You have rights to property and children\n- Domestic violence is illegal\n\nFree Help:\n- Legal aid centers in your district\n- NGOs and community organizations\n- Women's helpline: 1091"
      type = "legal_aid"
    } else if (lowerQuestion.includes("crime") || lowerQuestion.includes("police")) {
      response =
        "If You Are a Crime Victim:\n\n1. Go to police - File a report (FIR)\n2. Get medical help - If injured\n3. Contact legal aid - Get free lawyer\n4. Keep evidence - Photos, documents, witnesses\n\nYour rights:\n- Right to know case status\n- Right to legal representation\n- Right to compensation\n\nFree Help:\n- Police stations\n- Legal aid centers\n- NGOs and victim support organizations"
      type = "police"
    } else if (lowerQuestion.includes("property") || lowerQuestion.includes("land")) {
      response =
        "Property Advice:\n\n1. Register your property - Go to land office\n2. Keep all documents - Deeds, receipts, tax papers\n3. Get a survey - Know exact boundaries\n4. Make a will - Protect your family's future\n\nImportant:\n- Never sign papers you don't understand\n- Get legal help before buying/selling\n- Verify seller's ownership documents\n\nFree Help:\n- Legal aid centers\n- Property registration offices"
      type = "legal_aid"
    } else if (lowerQuestion.includes("rights") || lowerQuestion.includes("discrimination")) {
      response =
        "Your Legal Rights:\n\n1. Equality - No discrimination based on caste, religion, gender\n2. Freedom - Freedom of speech, movement, religion\n3. Protection - Protection from violence and exploitation\n4. Justice - Right to fair trial and legal help\n\nIf your rights are violated:\n- Report to police\n- Contact legal aid center\n- Call women's helpline if needed (1091)\n- Contact NGOs and community organizations"
      type = "police"
    } else if (lowerQuestion.includes("contract") || lowerQuestion.includes("agreement")) {
      response =
        "Contract/Agreement Advice:\n\n1. Read carefully - Understand every word\n2. Ask questions - Don't sign if confused\n3. Get legal review - Have a lawyer check it\n4. Keep copies - Always keep a copy for yourself\n\nNever sign:\n- Papers you don't understand\n- Blank papers\n- Papers with corrections you didn't make\n\nFree Help:\n- Legal aid centers\n- Lawyer consultation"
      type = "legal_aid"
    } else {
      response =
        "General Legal Advice:\n\n1. Know your rights - Everyone has legal rights\n2. Get legal help - Contact a lawyer or legal aid center\n3. Keep documents - Save all important papers\n4. Report crimes - Go to police if needed\n\nFree Legal Help:\n- Legal aid centers (free for poor people)\n- NGOs and community organizations\n- Government helplines"
      type = "legal_aid"
    }

    setAdvice(response)
    setFacilityType(type)
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
        <h2 className="text-4xl font-bold text-primary">{t("legal.title")}</h2>

        <Card className="p-6 space-y-4">
          <h3 className="text-2xl font-semibold">{t("legal.ask")}</h3>

          <VoiceInput onTranscript={handleVoiceInput} placeholder={t("legal.text")} />

          <textarea
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value)
              setError(null)
            }}
            placeholder={t("legal.text")}
            className="w-full p-4 border-2 border-border rounded-lg text-lg min-h-24 focus:outline-none focus:border-primary"
            aria-label="Legal question input"
          />

          {error && (
            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg flex gap-3" role="alert">
              <AlertCircle size={24} className="text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-lg text-red-900 font-semibold">{error}</p>
            </div>
          )}

          <Button
            onClick={handleSubmit}
            className="w-full h-16 text-xl font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center gap-2"
            aria-label="Get legal advice"
          >
            <Send size={24} />
            {t("legal.submit")}
          </Button>
        </Card>

        {advice && (
          <>
            <Card className="p-6 space-y-4 bg-blue-50 border-blue-200">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold text-blue-900">Legal Advice</h3>
                <Button
                  onClick={speakAdvice}
                  className={`text-white flex items-center gap-2 ${
                    isSpeaking ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  aria-label={isSpeaking ? "Stop listening" : "Listen to legal advice"}
                >
                  <Volume2 size={20} />
                  {isSpeaking ? "Stop" : t("common.listen")}
                </Button>
              </div>
              <LegalAdvice advice={advice} />
            </Card>

            {showNearbyFacilities && (
              <NearbyFacilities
                facilities={getNearbyFacilities(facilityType)}
                loading={locationLoading}
                error={locationError}
                permissionDenied={permissionDenied}
                onRequestLocation={requestLocation}
                facilityType={facilityType}
              />
            )}
          </>
        )}

        <LegalFAQ />
      </div>

      <Footer />
    </div>
  )
}

function LegalFAQ() {
  const { t, language } = useLanguage()
  const [expanded, setExpanded] = useState<string | null>(null)
  const [speakingId, setSpeakingId] = useState<string | null>(null)

  const faqs = [
    { id: "consumer", q: t("faq.legal.consumer"), a: t("faq.legal.consumer.answer") },
    { id: "divorce", q: t("faq.legal.divorce"), a: t("faq.legal.divorce.answer") },
    { id: "property", q: t("faq.legal.property"), a: t("faq.legal.property.answer") },
    { id: "rights", q: t("faq.legal.rights"), a: t("faq.legal.rights.answer") },
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
              <div className="p-4 bg-muted border-t border-border space-y-3">
                <p className="text-base leading-relaxed">{faq.a}</p>
                <Button
                  onClick={() => toggleSpeakAnswer(faq.id, faq.a)}
                  size="sm"
                  className={`text-white flex items-center gap-2 ${
                    speakingId === faq.id ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
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
