'use client';

import { useState } from 'react';
import { Copy, Share2, Users, Ticket, ExternalLink, Check } from 'lucide-react';
import { ReferralData } from '@/types';
import { copyToClipboard } from '@/lib/utils';
import toast from 'react-hot-toast';

interface ReferralWidgetProps {
  referralData: ReferralData;
  onReferralSuccess: () => void;
}

export function ReferralWidget({ referralData, onReferralSuccess }: ReferralWidgetProps) {
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);

  // Handle copy referral link
  const handleCopyLink = async () => {
    const success = await copyToClipboard(referralData.referralLink);
    
    if (success) {
      setCopied(true);
      toast.success('Referral link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error('Failed to copy link');
    }
  };

  // Handle share via Web Share API
  const handleShare = async () => {
    if (!navigator.share) {
      // Fallback to copy if Web Share API is not available
      handleCopyLink();
      return;
    }

    setSharing(true);
    
    try {
      await navigator.share({
        title: 'Join LanguageKonnect!',
        text: 'Connect, compete, and earn using your real-world speaking skills!',
        url: referralData.referralLink,
      });
      
      toast.success('Thanks for sharing!');
    } catch (error) {
      // User cancelled sharing or error occurred
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Share failed:', error);
        toast.error('Failed to share');
      }
    } finally {
      setSharing(false);
    }
  };

  // Simulate referral for demo purposes
  const handleTestReferral = () => {
    toast.success('Simulating successful referral...');
    setTimeout(() => {
      onReferralSuccess();
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-5 border border-indigo-200/50">
          <div className="flex items-center space-x-2 mb-2">
            <div className="p-1.5 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg">
              <Users className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-indigo-900">Total Referrals</span>
          </div>
          <p className="text-3xl font-bold bg-gradient-to-r from-indigo-900 to-indigo-700 bg-clip-text text-transparent">
            {referralData.totalReferrals}
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200/50">
          <div className="flex items-center space-x-2 mb-2">
            <div className="p-1.5 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
              <Ticket className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-purple-900">Raffle Tickets</span>
          </div>
          <p className="text-3xl font-bold bg-gradient-to-r from-purple-900 to-purple-700 bg-clip-text text-transparent">
            {referralData.raffleTickets}
          </p>
        </div>
      </div>

      {/* Referral ID Display */}
      <div className="bg-slate-50/50 backdrop-blur-sm rounded-xl p-5 border border-slate-200/50">
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          Your Referral ID
        </label>
        <div className="flex items-center space-x-3">
          <code className="flex-1 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-lg border border-slate-200/50 text-sm font-mono text-slate-800">
            {referralData.referralId}
          </code>
          <button
            onClick={handleCopyLink}
            className="p-3 text-slate-500 hover:text-indigo-600 transition-colors bg-white/80 backdrop-blur-sm rounded-lg border border-slate-200/50 hover:border-indigo-300"
            aria-label="Copy referral ID"
          >
            {copied ? (
              <Check className="h-4 w-4 text-emerald-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Referral Link */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Referral Link
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={referralData.referralLink}
            readOnly
            className="flex-1 px-4 py-3 border border-slate-300 rounded-lg bg-slate-50/50 text-sm focus:outline-none font-mono text-slate-700"
            aria-label="Your referral link"
          />
          <button
            onClick={handleCopyLink}
            className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl"
            aria-label="Copy referral link"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={handleShare}
          disabled={sharing}
          className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
          aria-label="Share referral link"
        >
          <Share2 className="h-4 w-4" />
          <span>{sharing ? 'Sharing...' : 'Share Link'}</span>
        </button>
        
        <button
          onClick={() => window.open(referralData.referralLink, '_blank')}
          className="flex items-center justify-center space-x-2 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 font-semibold bg-white/80 backdrop-blur-sm"
          aria-label="Preview referral link"
        >
          <ExternalLink className="h-4 w-4" />
          <span>Preview</span>
        </button>
      </div>

      {/* Demo Button (for testing) */}
      <div className="border-t border-slate-200/50 pt-6">
        <p className="text-xs text-slate-500 mb-3 font-medium">
          Demo: Simulate a successful referral
        </p>
        <button
          onClick={handleTestReferral}
          className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
          aria-label="Test referral system"
        >
          🎯 Test Referral (Demo)
        </button>
      </div>

      {/* How it Works */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200/50">
        <h4 className="font-bold text-indigo-900 mb-3 text-lg">How Referrals Work</h4>
        <ul className="text-sm text-indigo-800 space-y-2">
          <li className="flex items-start space-x-2">
            <span className="text-indigo-600 font-bold">•</span>
            <span>Share your unique referral link with friends</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-indigo-600 font-bold">•</span>
            <span>When they sign up using your link, you both benefit</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-indigo-600 font-bold">•</span>
            <span>Earn 1 raffle ticket for each successful referral</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-indigo-600 font-bold">•</span>
            <span>Climb the daily leaderboard to win prizes!</span>
          </li>
        </ul>
      </div>
    </div>
  );
}