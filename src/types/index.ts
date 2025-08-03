// Contest Types
export interface ContestEntry {
  id: string;
  userId: string;
  userName: string;
  language: string;
  region: string;
  caption: string;
  videoUrl: string;
  votes: number;
  createdAt: string;
  updatedAt: string;
}

export interface ContestSubmission {
  language: string;
  region: string;
  caption: string;
  video: File;
}

// Leaderboard Types
export interface LeaderboardEntry {
  id: string;
  userId: string;
  userName: string;
  language: string;
  region: string;
  caption: string;
  videoUrl: string;
  votes: number;
  createdAt: string;
  rank: number;
}

export interface LeaderboardFilters {
  sortBy: 'votes' | 'recent' | 'top-rated';
  language?: string;
  region?: string;
}

// Referral Types
export interface ReferralData {
  userId: string;
  referralId: string;
  referralLink: string;
  totalReferrals: number;
  raffleTickets: number;
  createdAt: string;
}

export interface ReferralLeaderboard {
  id: string;
  userId: string;
  userName: string;
  referralCount: number;
  raffleTickets: number;
  rank: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// Common Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Toast {
  type: 'success' | 'error' | 'info';
  message: string;
}

// Language and Region Options
export const LANGUAGES = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 
  'Russian', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi',
  'Dutch', 'Swedish', 'Norwegian', 'Danish', 'Finnish', 'Polish'
] as const;

export const REGIONS = [
  'North America', 'South America', 'Europe', 'Asia', 'Africa', 
  'Oceania', 'Middle East', 'Caribbean', 'Central America'
] as const;

export type Language = typeof LANGUAGES[number];
export type Region = typeof REGIONS[number];