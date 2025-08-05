"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: "resident" | "authority" | "admin"
  provider?: "email" | "google"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  signup: (name: string, email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate checking for existing session
    const checkAuth = async () => {
      const savedUser = localStorage.getItem("kili-user")
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
      setIsLoading(false)
    }
    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser: User = {
      id: "1",
      name: "Sarah Kimani",
      email,
      avatar: "/placeholder.svg?height=40&width=40&text=SK",
      role: "resident",
      provider: "email",
    }

    setUser(mockUser)
    localStorage.setItem("kili-user", JSON.stringify(mockUser))
    setIsLoading(false)
  }

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser: User = {
      id: "1",
      name,
      email,
      avatar: `/placeholder.svg?height=40&width=40&text=${name.charAt(0)}`,
      role: "resident",
      provider: "email",
    }

    setUser(mockUser)
    localStorage.setItem("kili-user", JSON.stringify(mockUser))
    setIsLoading(false)
  }

  const loginWithGoogle = async () => {
    setIsLoading(true)
    // Simulate Google OAuth flow
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const mockUser: User = {
      id: "google_123",
      name: "John Doe",
      email: "john.doe@gmail.com",
      avatar: "/placeholder.svg?height=40&width=40&text=JD",
      role: "resident",
      provider: "google",
    }

    setUser(mockUser)
    localStorage.setItem("kili-user", JSON.stringify(mockUser))
    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("kili-user")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, loginWithGoogle, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
