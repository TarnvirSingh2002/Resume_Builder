"use client"

import { useState } from "react"
import AuthModal from "./AuthModal"

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
                <div className="w-full flex items-center justify-between h-16 relative">

                    {/* LEFT — Logo (no space) */}
                    <div className="flex items-center gap-3 pl-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                        </div>

                        <div>
                            <h1 className="text-xl font-bold text-gray-900">ResumeBuilder</h1>
                            <p className="text-xs text-gray-500 -mt-0.5">
                                Professional Resume Creator
                            </p>
                        </div>
                    </div>

                    {/* CENTER — Navigation (true center) */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
                        <a href="/" className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h5m4 0h5a1 1 0 001-1V10"
                                />
                            </svg>
                            Home
                        </a>

                        <a href="/create-resume" className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7"
                                />
                            </svg>
                            Create Resume
                        </a>

                        <a href="/cover-letter" className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M8 7h8M8 11h8M8 15h6"
                                />
                            </svg>
                            Cover Letter
                        </a>
                    </div>

                    {/* RIGHT — Sign In (no space) */}
                    <div className="hidden md:flex items-center pr-4">
                        <button
                            onClick={() => setOpen(true)}
                            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md shadow-sm transition"
                        >
                            Sign In
                        </button>
                    </div>

                    {/* MOBILE MENU */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden pr-4 p-2 rounded-md text-gray-700 hover:bg-gray-100"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>

                </div>





                <div className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200 shadow-lg">
            <a
              href="/"
              className="flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h5m4 0h5a1 1 0 001-1V10"
                />
              </svg>
              Home
            </a>

            <a
              href="/create-resume"
              className="flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7"
                />
              </svg>
              Create Resume
            </a>

            <a
              href="/cover-letter"
              className="flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h8M8 11h8M8 15h6"
                />
              </svg>
              Cover Letter
            </a>

            <div className="pt-4 pb-2 border-t border-gray-200 mt-2">
              <button
                onClick={() => {
                  setOpen(true)
                  setMobileMenuOpen(false)
                }}
                className="w-full flex justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
            </nav>

            {open && <AuthModal onClose={() => setOpen(false)} />}
        </>
    )
}



