import { AuthenticateWithRedirectCallback } from "@clerk/nextjs"

export default function SSOCallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-lg">Completing authentication...</p>
        <p className="text-sm text-blue-200 mt-2">Please wait while we sign you in</p>
      </div>
      <AuthenticateWithRedirectCallback />
    </div>
  )
}
