'use client';

import { useState } from 'react';
import { ContestModule } from '@/components/ContestModule';
import { ReferralModule } from '@/components/ReferralModule';
import { Navigation } from '@/components/Navigation';
import { Globe, Trophy, Gift } from 'lucide-react';

export default function Home() {
  const [activeModule, setActiveModule] = useState<'contest' | 'referral'>('contest');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  LanguageKonnect
                </h1>
                <p className="text-xs text-slate-500">Global Language Network</p>
              </div>
            </div>
            
            <Navigation activeModule={activeModule} setActiveModule={setActiveModule} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Module Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            {activeModule === 'contest' ? (
              <>
                <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Contest & Leaderboard
                </h2>
              </>
            ) : (
              <>
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                  <Gift className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Referral & Raffle
                </h2>
              </>
            )}
          </div>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            {activeModule === 'contest' 
              ? 'Upload your 60-second language videos and compete on the global leaderboard!'
              : 'Refer friends to earn raffle tickets and climb the referral leaderboard!'
            }
          </p>
        </div>

        {/* Module Content */}
        <div className="fade-in">
          {activeModule === 'contest' ? (
            <ContestModule />
          ) : (
            <ReferralModule />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50/50 border-t border-slate-200/60 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-slate-600 mb-4 text-lg">
              Connect, compete, and earn using your real-world speaking skills
            </p>
            <div className="flex justify-center space-x-6 text-sm text-slate-500">
              <a href="/terms" className="hover:text-indigo-600 transition-colors font-medium">
                Terms of Service
              </a>
              <a href="/privacy" className="hover:text-indigo-600 transition-colors font-medium">
                Privacy Policy
              </a>
              <a href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@languagekonnect.com'}`} 
                 className="hover:text-indigo-600 transition-colors font-medium">
                Support
              </a>
            </div>
            <p className="text-xs text-slate-400 mt-4">
              © 2024 LanguageKonnect. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
