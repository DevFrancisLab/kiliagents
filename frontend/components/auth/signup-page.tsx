"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/components/providers/auth-provider"
import { useRouter } from "next/navigation"
import { Loader2, Mail, Lock, User, Eye, EyeOff, ArrowLeft, Bot, CheckCircle, Shield, Users } from "lucide-react"
import Link from "next/link"
import { GoogleButton } from "@/components/auth/google-button"
import { useToast } from "@/hooks/use-toast"

export function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { signup, loginWithGoogle } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions"
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
      await signup(formData.name, formData.email, formData.password)
      toast({
        title: "Welcome to KiliAgents!",
        description: "Your account has been created successfully.",
      })
      router.push("/dashboard")
    } catch (error) {
      setErrors({ submit: "Account creation failed. Please try again." })
      toast({
        title: "Sign up failed",
        description: "Please check your information and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    setIsLoading(true)
    try {
      await loginWithGoogle()
      toast({
        title: "Welcome to KiliAgents!",
        description: "Your account has been created with Google.",
      })
      router.push("/dashboard")
    } catch (error) {
      setErrors({ submit: "Google sign-up failed. Please try again." })
      toast({
        title: "Google sign-up failed",
        description: "Please try again or use email sign-up.",
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

  const getPasswordStrength = () => {
    const password = formData.password
    if (!password) return { strength: 0, label: "", color: "" }

    let strength = 0
    if (password.length >= 8) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z\d]/.test(password)) strength++

    const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong"]
    const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"]

    return {
      strength,
      label: labels[strength - 1] || "",
      color: colors[strength - 1] || "bg-gray-300",
    }
  }

  const passwordStrength = getPasswordStrength()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-float-delayed" />
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
              Join the Future of
              <br />
              <span className="bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
                Smart Communities
              </span>
            </h1>

            <p className="text-xl text-blue-100 mb-12 leading-relaxed">
              Be part of a revolutionary platform that's transforming how communities work together. Start building
              better neighborhoods today.
            </p>

            {/* Feature Highlights */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Free Forever</h3>
                  <p className="text-blue-200 text-sm">No hidden fees, no premium tiers - just community power</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Instant Connection</h3>
                  <p className="text-blue-200 text-sm">Connect with neighbors and authorities immediately</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-purple-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Privacy First</h3>
                  <p className="text-blue-200 text-sm">Your data is protected with enterprise-grade security</p>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">1,247+</div>
                  <div className="text-blue-200 text-sm">Happy Users</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">98%</div>
                  <div className="text-blue-200 text-sm">Satisfaction</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-blue-200 text-sm">AI Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
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
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500" />

              <CardHeader className="space-y-1 text-center pt-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Bot className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Create Account</CardTitle>
                <CardDescription className="text-gray-600">Join thousands building smarter communities</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 px-8 pb-8">
                {/* Google Sign Up */}
                <GoogleButton onClick={handleGoogleSignup} disabled={isLoading}>
                  Continue with Google
                </GoogleButton>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-3 text-gray-500 font-medium">Or create with email</span>
                  </div>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Full name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={`pl-10 h-12 border-2 transition-all duration-200 ${
                          errors.name ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-blue-500"
                        }`}
                        disabled={isLoading}
                      />
                    </div>
                    {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                  </div>

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
                    {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
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
                        placeholder="Create a strong password"
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

                    {/* Password Strength Indicator */}
                    {formData.password && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                              style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600 min-w-[60px]">{passwordStrength.label}</span>
                        </div>
                      </div>
                    )}

                    {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                      Confirm password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className={`pl-10 pr-12 h-12 border-2 transition-all duration-200 ${
                          errors.confirmPassword
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
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                      {formData.confirmPassword && formData.password === formData.confirmPassword && (
                        <CheckCircle className="absolute right-12 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                      )}
                    </div>
                    {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                      className="mt-1"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed cursor-pointer">
                        I agree to the{" "}
                        <Link href="/terms" className="text-blue-600 hover:text-blue-500 underline font-medium">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-blue-600 hover:text-blue-500 underline font-medium">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                  </div>
                  {errors.agreeToTerms && <p className="text-sm text-red-600">{errors.agreeToTerms}</p>}

                  {errors.submit && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-600">{errors.submit}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-medium bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
                    disabled={isLoading}
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create your account
                  </Button>
                </form>

                <div className="text-center pt-4">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                      href="/auth/login"
                      className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                    >
                      Sign in here
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
