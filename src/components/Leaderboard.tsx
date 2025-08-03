'use client';

import { useState } from 'react';
import { Trophy, Heart, Clock, RefreshCw, Play, User } from 'lucide-react';
import { LeaderboardEntry } from '@/types';
import { formatDate, formatNumber } from '@/lib/utils';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  loading: boolean;
  onRefresh: () => void;
}

export function Leaderboard({ entries, loading, onRefresh }: LeaderboardProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Trophy className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Trophy className="h-5 w-5 text-amber-600" />;
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

  if (loading) {
    return (
      <div className="p-8">
        <div className="space-y-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-1/3"></div>
                  <div className="h-3 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-1/2"></div>
                </div>
                <div className="w-20 h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="p-4 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full w-fit mx-auto mb-4">
          <Trophy className="h-8 w-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">No entries yet</h3>
        <p className="text-slate-500">Be the first to submit a video!</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-slate-100">
      {/* Header */}
      <div className="p-6 bg-slate-50/50 backdrop-blur-sm flex items-center justify-between border-b border-slate-200/50">
        <h4 className="font-semibold text-slate-900 text-lg">
          {entries.length} {entries.length === 1 ? 'Entry' : 'Entries'}
        </h4>
        <button
          onClick={onRefresh}
          className="flex items-center space-x-2 text-sm text-slate-600 hover:text-indigo-600 transition-colors font-medium bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-slate-200/50 hover:border-indigo-300"
          aria-label="Refresh leaderboard"
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
              index < 3 
                ? 'bg-gradient-to-r from-amber-50/50 to-transparent hover:bg-amber-50/80 border-l-4 border-amber-400' 
                : 'hover:bg-slate-50/50'
            }`}
          >
            <div className="flex items-center space-x-4">
              {/* Rank */}
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${getRankBadgeColor(entry.rank)}`}>
                {entry.rank <= 3 ? (
                  getRankIcon(entry.rank)
                ) : (
                  <span className="text-sm font-semibold">#{entry.rank}</span>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <User className="h-4 w-4 text-gray-400" />
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {entry.userName}
                  </p>
                </div>
                
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {entry.language}
                  </span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {entry.region}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {entry.caption}
                </p>
              </div>

              {/* Stats */}
              <div className="flex flex-col items-end space-y-1">
                <div className="flex items-center space-x-1 text-red-600">
                  <Heart className="h-4 w-4" />
                  <span className="text-sm font-semibold">
                    {formatNumber(entry.votes)}
                  </span>
                </div>
                
                <div className="flex items-center space-x-1 text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span className="text-xs">
                    {formatDate(entry.createdAt)}
                  </span>
                </div>
              </div>

              {/* Video Preview Button */}
              <button
                onClick={() => setSelectedVideo(entry.videoUrl)}
                className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                aria-label={`Play video by ${entry.userName}`}
              >
                <Play className="h-4 w-4 ml-0.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold">Video Preview</h3>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close video"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-4">
              <video
                src={selectedVideo}
                controls
                autoPlay
                className="w-full rounded-lg"
                style={{ maxHeight: '60vh' }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}