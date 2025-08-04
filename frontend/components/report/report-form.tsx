"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Camera, Send } from "lucide-react"

export function ReportForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    alert("Issue reported successfully! Our agents will review and respond shortly.")
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Report Community Issue
          </CardTitle>
          <p className="text-gray-600">
            Help improve our community by reporting issues. Our AI agents will automatically assign and coordinate the
            appropriate response.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Issue Category</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="infrastructure">Infrastructure</SelectItem>
                    <SelectItem value="environment">Environment</SelectItem>
                    <SelectItem value="safety">Safety & Security</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="social">Social Issues</SelectItem>
                    <SelectItem value="sme">SME Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority Level</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Issue Title</Label>
              <Input id="title" placeholder="Brief description of the issue" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Street address or landmark" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Detailed Description</Label>
              <Textarea
                id="description"
                placeholder="Provide detailed information about the issue..."
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">Contact Information</Label>
              <Input id="contact" type="tel" placeholder="Phone number (optional)" />
            </div>

            <div className="space-y-2">
              <Label>Photo Evidence (Optional)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Click to upload photos</p>
                <p className="text-sm text-gray-500">Supports JPEG, PNG up to 5MB</p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">How it works:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Your report is automatically geo-tagged and categorized</li>
                <li>• AI agents analyze and assign the issue to relevant authorities</li>
                <li>• You'll receive SMS/app notifications on progress updates</li>
                <li>• Community dashboard tracks resolution status</li>
              </ul>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Report
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
