"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  username: string
  email?: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<string | null>
  signup: (username: string, email: string, password: string) => Promise<string | null>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("[v0] Error loading user:", error)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string): Promise<string | null> => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const user = users.find((u: any) => u.username === username && u.password === password)

      if (!user) {
        return "Invalid username or password"
      }

      const currentUser = { username: user.username, email: user.email }
      setUser(currentUser)
      localStorage.setItem("currentUser", JSON.stringify(currentUser))
      return null
    } catch (error) {
      return "Login failed"
    }
  }

  const signup = async (username: string, email: string, password: string): Promise<string | null> => {
    try {
      if (!username || !email || !password) {
        return "All fields are required"
      }

      if (password.length < 6) {
        return "Password must be at least 6 characters"
      }

      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const userExists = users.some((u: any) => u.username === username || u.email === email)

      if (userExists) {
        return "Username or email already exists"
      }

      const newUser = { username, email, password }
      users.push(newUser)
      localStorage.setItem("users", JSON.stringify(users))

      const currentUser = { username, email }
      setUser(currentUser)
      localStorage.setItem("currentUser", JSON.stringify(currentUser))
      return null
    } catch (error) {
      return "Signup failed"
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("currentUser")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
