'use client';

import { useState, useEffect, useCallback } from 'react';
import { VideoUpload } from './VideoUpload';
import { Leaderboard } from './Leaderboard';
import { LeaderboardEntry, LeaderboardFilters } from '@/types';
import { contestApi, mockData, checkApiHealth } from '@/lib/api';
import { Trophy, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export function ContestModule() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<LeaderboardFilters>({ sortBy: 'votes' });
  const [apiStatus, setApiStatus] = useState<{ available: boolean; message: string } | null>(null);

  // Check API health on component mount
  useEffect(() => {
    const checkHealth = async () => {
      const health = await checkApiHealth();
      setApiStatus(health);
      if (!health.available) {
        console.log('⚠️ API not available:', health.message);
      }
    };
    checkHealth();
  }, []);

  // Fetch leaderboard data
  const fetchLeaderboard = useCallback(async () => {
    setLoading(true);
    try {
      const response = await contestApi.getLeaderboard(filters);
      
      if (response.success && response.data) {
        setLeaderboard(response.data);
        console.log('✅ Leaderboard loaded successfully');
        // Update API status if successful
        if (apiStatus && !apiStatus.available) {
          setApiStatus({ available: true, message: 'API is now available' });
        }
      } else {
        // Fallback to mock data if API fails
        console.log('⚠️ API failed, using mock data:', response.error);
        setLeaderboard(mockData.leaderboard);
        
        // Show a more informative error message
        if (response.error?.includes('not found')) {
          toast.error('API endpoints not available - using demo data');
        } else {
          toast.error(response.error || 'Failed to load leaderboard - using demo data');
        }
      }
    } catch (error) {
      console.error('💥 Error fetching leaderboard:', error);
      setLeaderboard(mockData.leaderboard);
      toast.error('Network error - using demo data');
    } finally {
      setLoading(false);
    }
  }, [filters, apiStatus]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    fetchLeaderboard();
    
    const interval = setInterval(fetchLeaderboard, 5 * 60 * 1000); // 5 minutes
    return () => clearInterval(interval);
  }, [filters, fetchLeaderboard]);

  // Handle successful video submission
  const handleVideoSubmitted = () => {
    toast.success('🎉 Video submitted!');
    // Refresh leaderboard to show new entry
    setTimeout(fetchLeaderboard, 1000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Video Upload Section */}
      <div className="space-y-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 p-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Upload Your Video
            </h3>
          </div>
          <p className="text-slate-600 mb-6">
            Share your language skills with a 60-second video. Only MP4 format is accepted.
          </p>

          {/* API Status Indicator */}
          {apiStatus && !apiStatus.available && (
            <div className="mb-6 p-4 bg-amber-50/80 backdrop-blur-sm border border-amber-200/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-medium text-amber-800">Demo Mode</span>
              </div>
              <p className="text-xs text-amber-700 mt-1">
                API endpoints not available. Using demo data for demonstration.
              </p>
            </div>
          )}
          
          <VideoUpload onSuccess={handleVideoSubmitted} />
        </div>
      </div>

      {/* Leaderboard Section */}
      <div className="space-y-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50">
          <div className="p-6 border-b border-slate-200/50">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg">
                <Trophy className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Live Leaderboard
              </h3>
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as 'votes' | 'recent' | 'top-rated' })}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                aria-label="Sort leaderboard by"
              >
                <option value="votes">Most Votes</option>
                <option value="recent">Most Recent</option>
                <option value="top-rated">Top Rated</option>
              </select>
              
              <select
                value={filters.language || ''}
                onChange={(e) => setFilters({ ...filters, language: e.target.value || undefined })}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                aria-label="Filter by language"
              >
                <option value="">All Languages</option>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Japanese">Japanese</option>
                <option value="Chinese">Chinese</option>
              </select>
              
              <select
                value={filters.region || ''}
                onChange={(e) => setFilters({ ...filters, region: e.target.value || undefined })}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                aria-label="Filter by region"
              >
                <option value="">All Regions</option>
                <option value="North America">North America</option>
                <option value="South America">South America</option>
                <option value="Europe">Europe</option>
                <option value="Asia">Asia</option>
                <option value="Africa">Africa</option>
                <option value="Oceania">Oceania</option>
              </select>
            </div>
          </div>
          
          <Leaderboard 
            entries={leaderboard} 
            loading={loading}
            onRefresh={fetchLeaderboard}
          />
        </div>
      </div>
    </div>
  );
}