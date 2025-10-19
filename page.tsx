"use client"

import { useState } from "react"
import LoginPage from "@/components/login-page"
import LanguageSelection from "@/components/language-selection"
import Dashboard from "@/components/dashboard"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [userName, setUserName] = useState("")

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-white">
      {!isLoggedIn ? (
        <LoginPage
          onLogin={(name) => {
            setUserName(name)
            setIsLoggedIn(true)
          }}
        />
      ) : !selectedLanguage ? (
        <LanguageSelection onSelectLanguage={setSelectedLanguage} />
      ) : (
        <Dashboard
          language={selectedLanguage}
          userName={userName}
          onChangeLanguage={() => setSelectedLanguage(null)}
          onLogout={() => {
            setIsLoggedIn(false)
            setSelectedLanguage(null)
            setUserName("")
          }}
        />
      )}
    </main>
  )
}
