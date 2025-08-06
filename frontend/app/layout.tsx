import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { NotificationProvider } from "@/components/providers/notification-provider"
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "KiliAgents - Smart Community Platform",
  description: "AI-powered multi-agent platform for smarter communities",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#2563eb",
          colorBackground: "#ffffff",
          colorInputBackground: "#ffffff",
          colorInputText: "#1f2937",
          borderRadius: "0.75rem",
        },
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <NotificationProvider>
            {children}
            <Toaster />
          </NotificationProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
