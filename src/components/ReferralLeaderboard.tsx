'use client';

import { Crown, Users, Ticket, RefreshCw, Star } from 'lucide-react';
import { ReferralLeaderboard as ReferralLeaderboardType } from '@/types';
import { formatNumber } from '@/lib/utils';

interface ReferralLeaderboardProps {
  entries: ReferralLeaderboardType[];
  currentUserId?: string;
  onRefresh: () => void;
}

export function ReferralLeaderboard({ entries, currentUserId, onRefresh }: ReferralLeaderboardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Star className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Star className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-sm font-semibold text-gray-500">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-br from-amber-400 to-yellow-500 text-white shadow-lg';
      case 2:
        return 'bg-gradient-to-br from-slate-300 to-slate-400 text-white shadow-lg';
      case 3:
        return 'bg-gradient-to-br from-orange-400 to-amber-500 text-white shadow-lg';
      default:
        return 'bg-slate-100 text-slate-700 border border-slate-200';
    }
  };

  const isCurrentUser = (userId: string) => userId === currentUserId;

  if (entries.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="p-4 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full w-fit mx-auto mb-4">
          <Users className="h-8 w-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">No referrals yet</h3>
        <p className="text-slate-500">Start referring friends to appear on the leaderboard!</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-slate-100">
      {/* Header */}
      <div className="p-6 bg-slate-50/50 backdrop-blur-sm flex items-center justify-between">
        <h4 className="font-semibold text-slate-900 text-lg">
          Top Referrers Today
        </h4>
        <button
          onClick={onRefresh}
          className="flex items-center space-x-2 text-sm text-slate-600 hover:text-indigo-600 transition-colors font-medium bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-slate-200/50 hover:border-indigo-300"
          aria-label="Refresh referral leaderboard"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Entries */}
      <div className="max-h-96 overflow-y-auto custom-scrollbar">
        {entries.map((entry, index) => (
          <div
            key={entry.id}
            className={`p-6 transition-all duration-300 ${
              isCurrentUser(entry.userId)
                ? 'bg-gradient-to-r from-purple-50/80 to-purple-50/40 border-l-4 border-purple-500 shadow-sm'
                : index < 3
                ? 'bg-gradient-to-r from-emerald-50/50 to-transparent hover:bg-emerald-50/80 border-l-4 border-emerald-400'
                : 'hover:bg-slate-50/50'
            }`}
          >
            <div className="flex items-center space-x-4">
              {/* Rank */}
              <div className={`flex items-center justify-center w-12 h-12 rounded-full ${getRankBadgeColor(entry.rank)}`}>
                {entry.rank <= 3 ? (
                  getRankIcon(entry.rank)
                ) : (
                  <span className="text-sm font-semibold">#{entry.rank}</span>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <p className={`text-sm font-semibold truncate ${
                    isCurrentUser(entry.userId) ? 'text-purple-900' : 'text-slate-900'
                  }`}>
                    {entry.userName}
                    {isCurrentUser(entry.userId) && (
                      <span className="ml-2 text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                        You
                      </span>
                    )}
                  </p>
                </div>
                
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>{formatNumber(entry.referralCount)} referrals</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Ticket className="h-3 w-3" />
                    <span>{formatNumber(entry.raffleTickets)} tickets</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-col items-end space-y-1">
                <div className={`text-lg font-bold ${
                  isCurrentUser(entry.userId) ? 'text-purple-600' : 'text-gray-900'
                }`}>
                  {formatNumber(entry.referralCount)}
                </div>
                <div className="text-xs text-gray-500">
                  referrals
                </div>
              </div>

              {/* Rank Badge for Top 3 */}
              {entry.rank <= 3 && (
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  entry.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                  entry.rank === 2 ? 'bg-gray-100 text-gray-800' :
                  'bg-amber-100 text-amber-800'
                }`}>
                  {entry.rank === 1 ? '🥇 1st' : entry.rank === 2 ? '🥈 2nd' : '🥉 3rd'}
                </div>
              )}
            </div>

            {/* Progress Bar for Top 3 */}
            {entry.rank <= 3 && (
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      entry.rank === 1 ? 'bg-yellow-500' :
                      entry.rank === 2 ? 'bg-gray-400' :
                      'bg-amber-500'
                    }`}
                    style={{
                      width: `${Math.min((entry.referralCount / Math.max(...entries.map(e => e.referralCount))) * 100, 100)}%`
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="p-4 bg-gray-50 text-center">
        <p className="text-xs text-gray-500">
          Leaderboard updates every 5 minutes • Raffle tickets never expire
        </p>
      </div>
    </div>
  );
}