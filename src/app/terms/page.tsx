import { Globe, ArrowLeft, FileText } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  LanguageKonnect
                </h1>
                <p className="text-xs text-slate-500 font-medium">Terms of Service</p>
              </div>
            </div>
            
            <Link 
              href="/"
              className="flex items-center space-x-2 text-sm text-slate-600 hover:text-indigo-600 transition-colors font-medium bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-slate-200/50 hover:border-indigo-300"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to App</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 p-8">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Terms of Service
            </h1>
          </div>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 mb-8 text-lg">
              <strong className="text-slate-800">Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using LanguageKonnect (&quot;the Service&quot;), you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-4">
                LanguageKonnect is a global language network that enables users to connect, compete, and earn using their real-world speaking skills through:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Video contest submissions and leaderboards</li>
                <li>Referral programs and raffle systems</li>
                <li>Language learning community features</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
              <p className="text-gray-700 mb-4">Users agree to:</p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Provide accurate and truthful information</li>
                <li>Upload only original content they have rights to</li>
                <li>Respect other users and maintain appropriate conduct</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Content Guidelines</h2>
              <p className="text-gray-700 mb-4">
                All video submissions must be:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>60 seconds or less in duration</li>
                <li>In MP4 format only</li>
                <li>Original content created by the user</li>
                <li>Appropriate for all audiences</li>
                <li>Free from copyrighted material without permission</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Referral Program</h2>
              <p className="text-gray-700 mb-4">
                The referral program allows users to earn raffle tickets by successfully referring new users. Terms include:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>One raffle ticket per successful referral</li>
                <li>Referrals must result in active user accounts</li>
                <li>Self-referrals and fraudulent activity are prohibited</li>
                <li>Raffle tickets have no monetary value</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Privacy and Data</h2>
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Prohibited Activities</h2>
              <p className="text-gray-700 mb-4">Users may not:</p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Upload inappropriate, offensive, or harmful content</li>
                <li>Engage in spam, fraud, or deceptive practices</li>
                <li>Attempt to manipulate voting or referral systems</li>
                <li>Violate intellectual property rights</li>
                <li>Use automated tools or bots</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Termination</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to terminate or suspend accounts that violate these terms or engage in prohibited activities.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Disclaimer</h2>
              <p className="text-gray-700 mb-4">
                The Service is provided &quot;as is&quot; without warranties of any kind. We do not guarantee uninterrupted access or error-free operation.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                For questions about these Terms of Service, please contact us at:{' '}
                <a href="mailto:support@languagekonnect.com" className="text-blue-600 hover:text-blue-800">
                  support@languagekonnect.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}