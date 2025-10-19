"use client"

import { useState, useRef } from "react"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Mic, Square, AlertCircle, X, RotateCcw } from "lucide-react"

interface VoiceInputProps {
  onTranscript: (text: string) => void
  placeholder?: string
}

export default function VoiceInput({ onTranscript, placeholder }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const recognitionRef = useRef<any>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { language } = useLanguage()

  const getLanguageCode = () => {
    const langMap: Record<string, string> = {
      en: "en-US",
      hi: "hi-IN",
      te: "te-IN",
    }
    return langMap[language] || "en-US"
  }

  const getErrorMessage = (errorCode: string): string => {
    const errorMessages: Record<string, string> = {
      "no-speech": "No speech detected. Please speak clearly into your microphone.",
      "audio-capture": "Microphone not found. Please check your microphone is connected.",
      network: "Network error. Please check your internet connection.",
      aborted: "Voice input was cancelled.",
      "service-not-allowed": "Voice input is not allowed. Please check your browser settings.",
      "bad-grammar": "Could not understand the speech. Please try again.",
      unknown: "An error occurred. Please try again.",
    }
    return errorMessages[errorCode] || errorMessages["unknown"]
  }

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setIsSupported(false)
      return
    }

    setError(null)
    setIsProcessing(true)
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
    recognitionRef.current = new SpeechRecognition()
    recognitionRef.current.continuous = false
    recognitionRef.current.interimResults = false
    recognitionRef.current.lang = getLanguageCode()

    recognitionRef.current.onstart = () => {
      setIsListening(true)
      setError(null)
      console.log("[v0] Speech recognition started")

      timeoutRef.current = setTimeout(() => {
        if (recognitionRef.current && isListening) {
          console.log("[v0] Timeout reached, stopping recognition")
          recognitionRef.current.stop()
        }
      }, 10000)
    }

    recognitionRef.current.onresult = (event: any) => {
      console.log("[v0] Speech result received")
      let transcript = ""
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript
      }
      if (transcript.trim()) {
        console.log("[v0] Transcript:", transcript)
        onTranscript(transcript)
        setError(null)
        setIsListening(false)
        setIsProcessing(false)
      }
    }

    recognitionRef.current.onerror = (event: any) => {
      const errorCode = event.error || "unknown"
      const errorMessage = getErrorMessage(errorCode)
      console.log("[v0] Speech recognition error:", errorCode)
      setError(errorMessage)
      setIsListening(false)
      setIsProcessing(false)
    }

    recognitionRef.current.onend = () => {
      console.log("[v0] Speech recognition ended")
      setIsListening(false)
      if (!isProcessing) {
        setIsProcessing(false)
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }

    recognitionRef.current.start()
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setIsListening(false)
    setIsProcessing(false)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  const dismissError = () => {
    setError(null)
  }

  if (!isSupported) {
    return (
      <div className="w-full p-4 bg-red-50 border-2 border-red-200 rounded-lg flex gap-3">
        <AlertCircle size={24} className="text-red-600 flex-shrink-0 mt-0.5" />
        <p className="text-lg text-red-900 font-semibold">
          Voice input is not supported in this browser. Please use text input.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full space-y-3">
      {error && (
        <div className="w-full p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg flex gap-3 items-start">
          <AlertCircle size={24} className="text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-lg text-yellow-900 font-semibold">{error}</p>
            <p className="text-sm text-yellow-800 mt-2">
              Tips: Make sure your microphone is working, speak clearly, and wait for the listening indicator before
              speaking.
            </p>
            <Button
              onClick={() => {
                dismissError()
                startListening()
              }}
              className="mt-3 bg-yellow-600 hover:bg-yellow-700 text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2"
              aria-label="Try voice input again"
            >
              <RotateCcw size={16} />
              Try Again
            </Button>
          </div>
          <button
            onClick={dismissError}
            className="text-yellow-600 hover:text-yellow-900 flex-shrink-0"
            aria-label="Dismiss error"
          >
            <X size={20} />
          </button>
        </div>
      )}

      <Button
        onClick={isListening ? stopListening : startListening}
        className={`w-full h-16 text-lg font-bold flex items-center justify-center gap-2 rounded-xl ${
          isListening ? "bg-red-600 hover:bg-red-700" : "bg-primary hover:bg-primary/90"
        } text-white`}
        disabled={isProcessing && !isListening}
        aria-label={isListening ? "Stop listening" : "Start voice input"}
      >
        {isListening ? (
          <>
            <Square size={24} className="animate-pulse" />
            Listening... Speak Now
          </>
        ) : isProcessing ? (
          <>
            <Mic size={24} className="animate-pulse" />
            Processing...
          </>
        ) : (
          <>
            <Mic size={24} />
            Speak Your Question
          </>
        )}
      </Button>
    </div>
  )
}
