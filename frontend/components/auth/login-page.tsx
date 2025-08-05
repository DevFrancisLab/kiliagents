"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/components/providers/auth-provider"
import { useRouter } from "next/navigation"
import { Loader2, Mail, Lock, Eye, EyeOff, ArrowLeft, Bot, CheckCircle, Shield, Users } from "lucide-react"
import Link from "next/link"
import { GoogleButton } from "@/components/auth/google-button"
import { useToast } from "@/hooks/use-toast"

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { login, loginWithGoogle } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setErrors({})

    try {
      await login(formData.email, formData.password)
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in to your account.",
      })
      router.push("/dashboard")
    } catch (error) {
      setErrors({ submit: "Invalid email or password. Please try again." })
      toast({
        title: "Sign in failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      await loginWithGoogle()
      toast({
        title: "Welcome!",
        description: "You have successfully signed in with Google.",
      })
      router.push("/dashboard")
    } catch (error) {
      setErrors({ submit: "Google sign-in failed. Please try again." })
      toast({
        title: "Google sign-in failed",
        description: "Please try again or use email sign-in.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Hero Section */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 text-white">
          {/* Header */}
          <div className="absolute top-8 left-8">
            <Link href="/" className="flex items-center gap-3 text-white hover:text-blue-200 transition-colors">
              <div className="p-2 bg-white/10 backdrop-blur-sm rounded-xl">
                <Bot className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold">KiliAgents</span>
            </Link>
          </div>

          <div className="max-w-lg">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Welcome Back to Your
              <br />
              <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                Smart Community
              </span>
            </h1>

            <p className="text-xl text-blue-100 mb-12 leading-relaxed">
              Continue building stronger neighborhoods with AI-powered coordination. Your community is waiting for you.
            </p>

            {/* Feature Highlights */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Instant Issue Resolution</h3>
                  <p className="text-blue-200 text-sm">Report and track community issues in real-time</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Community Connection</h3>
                  <p className="text-blue-200 text-sm">Connect with neighbors and local authorities</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-purple-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">AI-Powered Security</h3>
                  <p className="text-blue-200 text-sm">Advanced protection for your community data</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">1,247</div>
                <div className="text-blue-200 text-sm">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">98%</div>
                <div className="text-blue-200 text-sm">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-blue-200 text-sm">AI Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          {/* Mobile Header */}
          <div className="lg:hidden absolute top-6 left-6">
            <Link href="/" className="flex items-center gap-3 text-white hover:text-blue-200 transition-colors">
              <div className="p-2 bg-white/10 backdrop-blur-sm rounded-xl">
                <Bot className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold">KiliAgents</span>
            </Link>
          </div>

          <div className="w-full max-w-md">
            <Card className="backdrop-blur-xl bg-white/95 shadow-2xl border-0 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500" />

              <CardHeader className="space-y-1 text-center pt-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Bot className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Welcome Back</CardTitle>
                <CardDescription className="text-gray-600">
                  Sign in to continue to your community dashboard
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 px-8 pb-8">
                {/* Google Sign In */}
                <GoogleButton onClick={handleGoogleLogin} disabled={isLoading}>
                  Continue with Google
                </GoogleButton>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-3 text-gray-500 font-medium">Or sign in with email</span>
                  </div>
                </div>

                {/* Email/Password Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`pl-10 h-12 border-2 transition-all duration-200 ${
                          errors.email ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-blue-500"
                        }`}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.email && <p className="text-sm text-red-600 flex items-center gap-1">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className={`pl-10 pr-12 h-12 border-2 transition-all duration-200 ${
                          errors.password
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-200 focus:border-blue-500"
                        }`}
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-600 flex items-center gap-1">{errors.password}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input
                        id="remember"
                        type="checkbox"
                        checked={formData.rememberMe}
                        onChange={(e) => handleInputChange("rememberMe", e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
                      />
                      <Label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                        Remember me
                      </Label>
                    </div>
                    <Link
                      href="/auth/forgot-password"
                      className="text-sm text-blue-600 hover:text-blue-500 font-medium transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {errors.submit && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-600">{errors.submit}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200"
                    disabled={isLoading}
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign in to your account
                  </Button>
                </form>

                <div className="text-center pt-4">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link
                      href="/auth/signup"
                      className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                    >
                      Create one now
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Back to Home - Mobile */}
            <div className="lg:hidden mt-6 text-center">
              <Button asChild variant="ghost" className="text-white hover:bg-white/10">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
