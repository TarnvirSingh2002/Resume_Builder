'use client'

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-18 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Hero Header */}
                <div className="text-center mb-12">
                    <div className="inline-block mb-2">
                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                        Privacy Policy
                    </h1>
                    <p className="text-lg text-gray-600 mb-1">
                        Your privacy matters to us
                    </p>
                    <p className="text-sm text-gray-500">
                        Last updated: January 15, 2026
                    </p>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                    {/* Introduction */}
                    <div className="p-6 md:p-8 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
                        <p className="text-gray-700 leading-relaxed">
                            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when
                            you visit our website or use our Service. This is a practice project and does not collect any real user data.
                        </p>
                    </div>

                    <div className="p-6 md:p-8 space-y-8">
                        {/* Section 1 */}
                        <section>
                            <div className="flex items-center mb-2">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                    <span className="text-xl">📋</span>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
                            </div>

                            <div className="space-y-4 ml-13">
                                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                    <h3 className="font-semibold text-gray-900 mb-2">Personal Data</h3>
                                    <p className="text-gray-700 text-sm mb-2">Basic information like email, name, and phone number (optional)</p>
                                </div>

                                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                                    <h3 className="font-semibold text-gray-900 mb-2">Resume Data</h3>
                                    <p className="text-gray-700 text-sm mb-2">Work experience, education, skills, and professional information</p>
                                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded text-xs text-yellow-800 mt-2">
                                        ⚠️ Your resume data is stored only locally in your browser
                                    </div>
                                </div>

                                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                                    <h3 className="font-semibold text-gray-900 mb-2">Usage Data</h3>
                                    <p className="text-gray-700 text-sm">IP address, browser type, and basic analytics</p>
                                </div>
                            </div>
                        </section>

                        <div className="border-t border-gray-200"></div>

                        {/* Section 2 */}
                        <section>
                            <div className="flex items-center mb-2">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                    <span className="text-xl">🎯</span>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
                            </div>
                            <div className="ml-13 space-y-2">
                                {[
                                    'To provide and improve our Service',
                                    'To help you create and download resumes',
                                    'To analyze usage and improve experience'
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start text-gray-700">
                                        <span className="text-purple-600 mr-2">•</span>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div className="border-t border-gray-200"></div>

                        {/* Section 3 */}
                        <section>
                            <div className="flex items-center mb-2">
                                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                                    <span className="text-xl">🍪</span>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Cookies</h2>
                            </div>
                            <div className="ml-13 space-y-2">
                                <p className="text-gray-700 text-sm">We use essential cookies for functionality and preferences.</p>
                            </div>
                        </section>

                        <div className="border-t border-gray-200"></div>

                        {/* Section 4 */}
                        <section>
                            <div className="flex items-center mb-2">
                                <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center mr-3">
                                    <span className="text-xl">💾</span>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Data Storage</h2>
                            </div>
                            <div className="ml-13">
                                <p className="text-gray-700 text-sm">Your resume data is stored locally in your browser. No cloud storage is used in this practice project.</p>
                            </div>
                        </section>

                        <div className="border-t border-gray-200"></div>

                        {/* Section 5 */}
                        <section>
                            <div className="flex items-center mb-2">
                                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center mr-3">
                                    <span className="text-xl">⚖️</span>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Your Rights</h2>
                            </div>
                            <div className="ml-13 bg-pink-50 rounded-lg p-4 border border-pink-200">
                                <p className="text-gray-700 text-sm">
                                    You have the right to access, correct, or delete your data. Since this is stored locally, you can clear your browser data at any time.
                                </p>
                            </div>
                        </section>

                        <div className="border-t border-gray-200"></div>

                        {/* Section 6 */}
                        <section>
                            <div className="flex items-center mb-2">
                                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                                    <span className="text-xl">👶</span>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Children's Privacy</h2>
                            </div>
                            <div className="ml-13 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                                <p className="text-gray-700 text-sm">
                                    This service is not intended for children under 13 years of age.
                                </p>
                            </div>
                        </section>

                        <div className="border-t border-gray-200"></div>

                        {/* Contact */}
                        <section>
                            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white text-center">
                                <p className="text-sm text-blue-100">
                                    This is a demonstration project for learning purposes. No real data collection occurs.
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}