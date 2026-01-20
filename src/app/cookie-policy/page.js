'use client'

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-18 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Cookie Policy
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Last updated: January 15, 2026
          </p>
          <p className="text-gray-500 max-w-2xl mx-auto">
            How we use cookies to improve your experience
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 mb-6">
            This Cookie Policy explains how resumebuilder.com ("we", "us", or "our") uses cookies and similar technologies when you visit our website.
            By continuing to use the site, you consent to our use of cookies as described below.
          </p>

          <ol className="space-y-10 list-decimal list-outside pl-6 marker:text-black-600 marker:font-bold">
            {/* 1 */}
            <li>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What Are Cookies?</h2>
              <p className="text-gray-700">
                Cookies are small text files placed on your device when you visit a website. They help the site function properly and provide information about how you use it.
              </p>
              <p className="text-gray-700 mt-3">
                They can be session cookies (deleted when browser closes) or persistent cookies (remain until expiry or manual deletion).
              </p>
            </li>

            {/* 2 */}
            <li>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Types of Cookies We Use</h2>
              <div className="space-y-4 mt-4">
                <div>
                  <p className="font-semibold text-gray-800">Essential Cookies</p>
                  <p className="text-gray-700">
                    Necessary for the website to function. Includes session management, resume editing state, authentication (if logged in), and basic security.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-gray-800">Analytics Cookies</p>
                  <p className="text-gray-700">
                    Help us understand how visitors use the site (anonymous data). We use Google Analytics and Vercel Analytics.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-gray-800">Functional Cookies</p>
                  <p className="text-gray-700">
                    Remember your preferences (e.g. selected template, language, progress in resume builder).
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-gray-800">Advertising Cookies</p>
                  <p className="text-gray-700">
                    <strong>Currently not used.</strong> We may implement them in the future (e.g. Google AdSense) only after approval.
                  </p>
                </div>
              </div>
            </li>

            {/* 3 */}
            <li>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Third-Party Cookies</h2>
              <p className="text-gray-700">
                We use trusted third-party services that may set cookies:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-3">
                <li>Google Analytics — for site usage statistics</li>
                <li>Vercel — for hosting and performance monitoring</li>
                <li>Supabase — for authentication and optional cloud storage</li>
              </ul>
            </li>

            {/* 4 */}
            <li>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">How Long Cookies Last</h2>
              <p className="text-gray-700">
                Session cookies are deleted when you close your browser.
                Persistent and analytics cookies usually expire after 30 days to 2 years.
              </p>
            </li>

            {/* 5 */}
            <li>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Managing Your Cookies</h2>
              <p className="text-gray-700 mb-3">
                You can control cookies through your browser settings:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Block all cookies or only third-party cookies</li>
                <li>Delete existing cookies</li>
                <li>Receive notification when cookies are set</li>
              </ul>
              <p className="text-gray-700 mt-4 text-sm italic">
                Note: Disabling essential cookies may affect site functionality (e.g. resume progress saving).
              </p>
            </li>

            {/* 6 */}
            <li>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Updates to This Policy</h2>
              <p className="text-gray-700">
                We may update this Cookie Policy from time to time. Any changes will be posted here with a new effective date.
              </p>
            </li>

            {/* 7 */}
            <li>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact Us</h2>
              <p className="text-gray-700">
                If you have questions about our use of cookies, please contact us at{' '}
                <a href="mailto:resumebuilder@gmail.com" className="text-blue-600 hover:underline">
                  resumebuilder@gmail.com
                </a>.
              </p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}