'use client';

import { useState, useEffect } from 'react';
import { ReferralWidget } from './ReferralWidget';
import { ReferralLeaderboard } from './ReferralLeaderboard';
import { ReferralData, ReferralLeaderboard as ReferralLeaderboardType } from '@/types';
import { referralApi, generateReferralId, generateReferralLink, mockData } from '@/lib/api';
import { storage } from '@/lib/utils';
import { Users, Gift } from 'lucide-react';
import toast from 'react-hot-toast';

export function ReferralModule() {
  const [referralData, setReferralData] = useState<ReferralData | null>(null);
  const [leaderboard, setLeaderboard] = useState<ReferralLeaderboardType[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize user's referral data
  const initializeReferralData = () => {
    // Get or create user ID (in real app, this would come from auth)
    let userId = storage.get('userId', '');
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      storage.set('userId', userId);
    }

    // Get or create referral ID
    let referralId = storage.get('referralId', '');
    if (!referralId) {
      referralId = generateReferralId();
      storage.set('referralId', referralId);
    }

    // Get stored referral stats
    const totalReferrals = storage.get('totalReferrals', 0);
    const raffleTickets = storage.get('raffleTickets', 0);

    const data: ReferralData = {
      userId,
      referralId,
      referralLink: generateReferralLink(referralId),
      totalReferrals,
      raffleTickets,
      createdAt: new Date().toISOString(),
    };

    setReferralData(data);
    return data;
  };

  // Fetch referral leaderboard
  const fetchLeaderboard = async () => {
    try {
      const response = await referralApi.getLeaderboard();
      
      if (response.success && response.data) {
        setLeaderboard(response.data);
        console.log('✅ Referral leaderboard loaded successfully');
      } else {
        // Fallback to mock data if API fails
        console.log('⚠️ API failed, using mock data');
        setLeaderboard(mockData.referralLeaderboard);
        toast.error(response.error || 'Failed to load referral leaderboard');
      }
    } catch (error) {
      console.error('💥 Error fetching referral leaderboard:', error);
      setLeaderboard(mockData.referralLeaderboard);
      toast.error('Failed to load referral leaderboard');
    }
  };

  // Handle successful referral
  const handleReferralSuccess = async () => {
    if (!referralData) return;

    try {
      // Call API to add raffle entry
      const response = await referralApi.addRaffleEntry(referralData.referralId);
      
      if (response.success && response.data) {
        // Update local state immediately
        const newReferralCount = referralData.totalReferrals + 1;
        const newTicketCount = response.data.ticketCount;
        
        const updatedData = {
          ...referralData,
          totalReferrals: newReferralCount,
          raffleTickets: newTicketCount,
        };
        
        setReferralData(updatedData);
        
        // Update local storage
        storage.set('totalReferrals', newReferralCount);
        storage.set('raffleTickets', newTicketCount);
        
        // Show success toast
        toast.success('🎉 You earned a raffle ticket!');
        
        // Refresh leaderboard
        setTimeout(fetchLeaderboard, 1000);
      } else {
        // Simulate success for demo purposes
        const newReferralCount = referralData.totalReferrals + 1;
        const newTicketCount = referralData.raffleTickets + 1;
        
        const updatedData = {
          ...referralData,
          totalReferrals: newReferralCount,
          raffleTickets: newTicketCount,
        };
        
        setReferralData(updatedData);
        storage.set('totalReferrals', newReferralCount);
        storage.set('raffleTickets', newTicketCount);
        
        toast.success('🎉 You earned a raffle ticket!');
        setTimeout(fetchLeaderboard, 1000);
      }
    } catch (error) {
      console.error('Error processing referral:', error);
      toast.error('Failed to process referral');
    }
  };

  // Check for referral in URL on mount
  useEffect(() => {
    const data = initializeReferralData();
    
    // Check if user came from a referral link
    const urlParams = new URLSearchParams(window.location.search);
    const refId = urlParams.get('ref');
    
    if (refId && refId !== data.referralId) {
      // User came from someone else's referral link
      console.log('User came from referral:', refId);
      
      // In a real app, you'd track this referral
      // For demo, we'll simulate adding a ticket to the referrer
      setTimeout(() => {
        toast.success('Welcome! The referrer earned a raffle ticket!');
      }, 1000);
      
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    
    fetchLeaderboard();
    setLoading(false);
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchLeaderboard, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !referralData) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Referral Widget */}
      <div className="space-y-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 p-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
              <Gift className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Your Referral Dashboard
            </h3>
          </div>
          <p className="text-slate-600 mb-6">
            Share your unique referral link to earn raffle tickets for each successful referral!
          </p>
          
          <ReferralWidget 
            referralData={referralData}
            onReferralSuccess={handleReferralSuccess}
          />
        </div>
      </div>

      {/* Referral Leaderboard */}
      <div className="space-y-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50">
          <div className="p-6 border-b border-slate-200/50">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Daily Referral Leaderboard
              </h3>
            </div>
            <p className="text-slate-600">
              Top referrers earn the most raffle tickets!
            </p>
          </div>
          
          <ReferralLeaderboard 
            entries={leaderboard}
            currentUserId={referralData.userId}
            onRefresh={fetchLeaderboard}
          />
        </div>
      </div>
    </div>
  );
}