"use client"

import { useState, useEffect } from "react"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"



export default function AuthModal({ onClose }) {
  const [mode, setMode] = useState("login")
  const [focusedField, setFocusedField] = useState(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("") // only for signup
  const [confirmPassword, setConfirmPassword] = useState("") // only for signup
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { data: session, status } = useSession()
  const router = useRouter()

  // Auto-close modal when user is successfully authenticated
  useEffect(() => {
    if (status === "authenticated") {
      onClose()
      router.refresh() // optional: refresh page data if needed
    }
  }, [status, onClose, router])

  const handleCredentialsSignIn = async () => {
    if (!email || !password) {
      setError("Please fill in email and password")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      })

      if (result?.error) {
        setError(result.error === "CredentialsSignin" 
          ? "Invalid email or password" 
          : result.error)
      } else {
        // Success → session will update automatically, useEffect will close modal
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setError(null)
    await signIn("google", { callbackUrl: "/" })
  }

  const handleGitHubSignIn = async () => {
    setIsLoading(true)
    setError(null)
    await signIn("github", { callbackUrl: "/" })
  }

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || "Registration failed")
        return
      }

      // 2. Automatically sign in after successful registration
      const signInResult = await signIn("credentials", {
        redirect: false,
        email,
        password,
      })

      if (signInResult?.error) {
        setError("Account created but login failed. Please try signing in.")
      }
      // else → session updates → modal closes via useEffect
    } catch (err) {
      setError("Something went wrong during signup")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto scrollbar-hide rounded-lg shadow-2xl relative">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-gray-500 hover:text-gray-800"
          disabled={isLoading}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 pt-10 pb-8 rounded-t-xl">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl mx-auto mb-4 flex items-center justify-center">
              <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-blue-100 text-sm opacity-90">
              {mode === "login"
                ? "Sign in to continue building your resume"
                : "Join thousands creating professional resumes"}
            </p>
          </div>
        </div>

        <div className="px-8 py-6">
          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Tabs */}
          <div className="flex mb-6 border-b border-gray-200">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-3 font-medium text-sm transition-colors ${
                mode === "login"
                  ? "border-b-2 border-blue-600 text-blue-700"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              disabled={isLoading}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 py-3 font-medium text-sm transition-colors ${
                mode === "signup"
                  ? "border-b-2 border-blue-600 text-blue-700"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              disabled={isLoading}
            >
              Sign Up
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            {mode === "signup" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3 border rounded-lg transition-all focus:outline-none ${
                    focusedField === "name"
                      ? "border-blue-500 ring-2 ring-blue-100"
                      : "border-gray-300"
                  }`}
                  disabled={isLoading}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
                placeholder="name@example.com"
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-3 border rounded-lg transition-all focus:outline-none ${
                  focusedField === "email"
                    ? "border-blue-500 ring-2 ring-blue-100"
                    : "border-gray-300"
                }`}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-3 border rounded-lg transition-all focus:outline-none ${
                  focusedField === "password"
                    ? "border-blue-500 ring-2 ring-blue-100"
                    : "border-gray-300"
                }`}
                disabled={isLoading}
              />
            </div>

            {mode === "signup" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  onFocus={() => setFocusedField("confirm")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3 border rounded-lg transition-all focus:outline-none ${
                    focusedField === "confirm"
                      ? "border-blue-500 ring-2 ring-blue-100"
                      : "border-gray-300"
                  }`}
                  disabled={isLoading}
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={mode === "login" ? handleCredentialsSignIn : handleSignup}
            disabled={isLoading}
            className={`mt-6 w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
                Processing...
              </>
            ) : mode === "login" ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </button>

          {/* Login mode only – social buttons + OR divider */}
          {mode === "login" && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-4 bg-white text-gray-500">OR CONTINUE WITH</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 py-3 px-4 rounded-lg font-medium text-gray-700 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    {/* Google icon paths... (same as before) */}
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Continue with Google
                </button>

                <button
                  onClick={handleGitHubSignIn}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 py-3 px-4 rounded-lg font-medium text-gray-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  Continue with GitHub
                </button>
              </div>
            </>
          )}

          {mode === "signup" && (
            <p className="text-xs text-gray-500 text-center mt-6">
              By creating an account, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:underline">Terms</a> and{" "}
              <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
            </p>
          )}

          {mode === "login" && (
            <p className="text-center text-sm text-gray-600 mt-6">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("signup")}
                className="text-blue-600 font-medium hover:underline"
                disabled={isLoading}
              >
                Sign up
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}