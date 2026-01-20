'use client'

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-18 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Last updated: January 15, 2026
          </p>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Please read these terms carefully before using our service.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 mb-6">
            By accessing or using Resume Builder ("Service"), you agree to be bound by these Terms of Service ("Terms").
            If you disagree with any part, you may not use the Service.
          </p>

          <ol className="space-y-10 list-decimal list-outside pl-6 marker:text-black-600 marker:font-bold">
            {/* 1 */}
            <li>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">The Service</h2>
              <p className="text-gray-700">
                Resume Builder is a free web-based tool that allows you to create, edit, preview and download professional resumes.
                No registration is required to use the core features.
              </p>
            </li>

            {/* 2 */}
            <li>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Acceptable Use</h2>
              <p className="text-gray-700 mb-2">You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Create or distribute false/misleading resumes</li>
                <li>Use the service for fraud, spam or illegal activities</li>
                <li>Upload viruses, malware or harmful content</li>
                <li>Violate intellectual property rights of others</li>
              </ul>
            </li>

            {/* 3 */}
            <li>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Intellectual Property</h2>
              <p className="text-gray-700">
                All templates, designs, and code are owned by us. You are granted a limited license for personal, non-commercial use only.
              </p>
            </li>

            {/* 4 */}
            <li>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Content</h2>
              <p className="text-gray-700">
                You retain ownership of the content you create. By using the service, you grant us a limited license to process and display your content solely to provide the Service.
              </p>
            </li>

            {/* 5 */}
            <li>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Privacy</h2>
              <p className="text-gray-700">
                Your privacy matters. Please review our{' '}
                <a href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>{' '}
                for details.
              </p>
            </li>

            {/* 6 */}
            <li>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No Warranty & Limitation of Liability</h2>
              <p className="text-gray-700">
                The service is provided "as is" without warranties of any kind. We are not liable for any direct, indirect, incidental or consequential damages arising from use of the Service.
              </p>
            </li>

            {/* 7 */}
            <li>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Termination</h2>
              <p className="text-gray-700">
                We may suspend or terminate your access at any time without notice if these Terms are violated.
              </p>
            </li>

            {/* 8 */}
            <li>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Governing Law</h2>
              <p className="text-gray-700">
                These Terms are governed by the laws of India.
              </p>
            </li>

            {/* 9 */}
            <li>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Changes to Terms</h2>
              <p className="text-gray-700">
                We may update these Terms from time to time. Continued use after changes constitutes acceptance of the new terms.
              </p>
            </li>
          </ol>

          
        </div>
      </div>
    </div>
  );
}