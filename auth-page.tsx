"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, Scale } from "lucide-react"

export default function AuthPage() {
  const { login, signup } = useAuth()
  const [isSignup, setIsSignup] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (isSignup) {
        if (password !== confirmPassword) {
          setError("Passwords do not match")
          setIsLoading(false)
          return
        }
        const result = await signup(username, email, password)
        if (result) {
          setError(result)
        }
      } else {
        const result = await login(username, password)
        if (result) {
          setError(result)
        }
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart size={40} className="text-green-600" />
            <Scale size={40} className="text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Health & Legal Help</h1>
          <p className="text-lg text-muted-foreground">Free Advice in English, Hindi, Telugu</p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200">
          <h2 className="text-2xl font-bold text-center mb-6 text-foreground">
            {isSignup ? "Create Account" : "Login"}
          </h2>

          {error && (
            <div className="bg-red-100 border-2 border-red-500 text-red-700 px-4 py-3 rounded-lg mb-4 text-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-lg font-semibold text-foreground mb-2">Username</label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full h-12 text-lg"
                disabled={isLoading}
              />
            </div>

            {isSignup && (
              <div>
                <label className="block text-lg font-semibold text-foreground mb-2">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full h-12 text-lg"
                  disabled={isLoading}
                />
              </div>
            )}

            <div>
              <label className="block text-lg font-semibold text-foreground mb-2">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full h-12 text-lg"
                disabled={isLoading}
              />
            </div>

            {isSignup && (
              <div>
                <label className="block text-lg font-semibold text-foreground mb-2">Confirm Password</label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full h-12 text-lg"
                  disabled={isLoading}
                />
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 text-xl font-bold bg-primary hover:bg-primary/90 text-white rounded-xl"
            >
              {isLoading ? "Loading..." : isSignup ? "Create Account" : "Login"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-lg text-muted-foreground mb-3">
              {isSignup ? "Already have an account?" : "Don't have an account?"}
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsSignup(!isSignup)
                setError("")
                setUsername("")
                setEmail("")
                setPassword("")
                setConfirmPassword("")
              }}
              className="w-full h-12 text-lg font-semibold rounded-xl border-2"
            >
              {isSignup ? "Login" : "Create Account"}
            </Button>
          </div>
        </div>

        {/* Demo Info */}
        <div className="mt-6 bg-blue-100 border-2 border-blue-500 rounded-xl p-4 text-center">
          <p className="text-lg font-semibold text-blue-900 mb-2">Demo Account</p>
          <p className="text-blue-800">
            Username: <span className="font-bold">demo</span>
          </p>
          <p className="text-blue-800">
            Password: <span className="font-bold">demo123</span>
          </p>
        </div>
      </div>
    </div>
  )
}
