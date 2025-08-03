import { ApiResponse, ContestEntry, ContestSubmission, LeaderboardEntry, LeaderboardFilters, ReferralData, ReferralLeaderboard } from '@/types';

// Use local API routes in development and production
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || (
  typeof window !== 'undefined' 
    ? window.location.origin 
    : 'http://localhost:3000'
);
const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN || 'your-bearer-token-here';

// API Client Configuration
const apiClient = {
  get: async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    try {
      console.log(`🔄 API GET: ${API_BASE_URL}${endpoint}`);
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${AUTH_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      // Check if response is HTML (404 page) instead of JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('text/html')) {
        console.error(`❌ API GET Error: ${endpoint} - Received HTML instead of JSON (likely 404)`);
        return { 
          success: false, 
          data: null as T, 
          error: `Endpoint not found: ${endpoint}` 
        };
      }

      const data = await response.json();
      
      if (response.ok) {
        console.log(`✅ API GET Success: ${endpoint}`, data);
        return { success: true, data };
      } else {
        console.error(`❌ API GET Error: ${endpoint} (${response.status})`, data);
        return { 
          success: false, 
          data: null as T, 
          error: data.message || `Request failed with status ${response.status}` 
        };
      }
    } catch (error) {
      console.error(`💥 API GET Exception: ${endpoint}`, error);
      return { 
        success: false, 
        data: null as T, 
        error: error instanceof Error ? error.message : 'Network error' 
      };
    }
  },

  post: async <T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> => {
    try {
      console.log(`🔄 API POST: ${API_BASE_URL}${endpoint}`, body);
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AUTH_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      // Check if response is HTML (404 page) instead of JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('text/html')) {
        console.error(`❌ API POST Error: ${endpoint} - Received HTML instead of JSON (likely 404)`);
        return { 
          success: false, 
          data: null as T, 
          error: `Endpoint not found: ${endpoint}` 
        };
      }

      const data = await response.json();
      
      if (response.ok) {
        console.log(`✅ API POST Success: ${endpoint}`, data);
        return { success: true, data };
      } else {
        console.error(`❌ API POST Error: ${endpoint} (${response.status})`, data);
        return { 
          success: false, 
          data: null as T, 
          error: data.message || `Request failed with status ${response.status}` 
        };
      }
    } catch (error) {
      console.error(`💥 API POST Exception: ${endpoint}`, error);
      return { 
        success: false, 
        data: null as T, 
        error: error instanceof Error ? error.message : 'Network error' 
      };
    }
  },

  postFormData: async <T>(endpoint: string, formData: FormData): Promise<ApiResponse<T>> => {
    try {
      console.log(`🔄 API POST FormData: ${API_BASE_URL}${endpoint}`);
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AUTH_TOKEN}`,
        },
        body: formData,
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log(`✅ API POST FormData Success: ${endpoint}`, data);
        return { success: true, data };
      } else {
        console.error(`❌ API POST FormData Error: ${endpoint}`, data);
        return { success: false, data: null as T, error: data.message || 'Request failed' };
      }
    } catch (error) {
      console.error(`💥 API POST FormData Exception: ${endpoint}`, error);
      return { 
        success: false, 
        data: null as T, 
        error: error instanceof Error ? error.message : 'Network error' 
      };
    }
  },
};

// Helper function to try multiple endpoint variations
const tryEndpointVariations = async <T>(baseEndpoint: string, method: 'GET' | 'POST' = 'GET', body?: unknown): Promise<ApiResponse<T>> => {
  const variations = [
    baseEndpoint,
    `/api${baseEndpoint}`,
    `/v1${baseEndpoint}`,
    `/api/v1${baseEndpoint}`,
  ];

  for (const endpoint of variations) {
    console.log(`🔍 Trying endpoint variation: ${endpoint}`);
    
    const result = method === 'GET' 
      ? await apiClient.get<T>(endpoint)
      : await apiClient.post<T>(endpoint, body);
    
    if (result.success) {
      console.log(`✅ Found working endpoint: ${endpoint}`);
      return result;
    }
    
    // If it's not a 404, don't try other variations
    if (!result.error?.includes('not found') && !result.error?.includes('Endpoint not found')) {
      break;
    }
  }

  return {
    success: false,
    data: null as T,
    error: `No working endpoint found for ${baseEndpoint}. Tried: ${variations.join(', ')}`
  };
};

// Contest API Functions
export const contestApi = {
  // Submit a new contest entry
  submitEntry: async (submission: ContestSubmission): Promise<ApiResponse<ContestEntry>> => {
    const formData = new FormData();
    formData.append('language', submission.language);
    formData.append('region', submission.region);
    formData.append('caption', submission.caption);
    formData.append('video', submission.video);

    return apiClient.postFormData<ContestEntry>('/api/contest/entry', formData);
  },

  // Get leaderboard with filters
  getLeaderboard: async (filters?: LeaderboardFilters): Promise<ApiResponse<LeaderboardEntry[]>> => {
    let endpoint = '/api/contest/leaderboard';
    
    if (filters) {
      const params = new URLSearchParams();
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      if (filters.language) params.append('language', filters.language);
      if (filters.region) params.append('region', filters.region);
      
      if (params.toString()) {
        endpoint += `?${params.toString()}`;
      }
    }

    return apiClient.get<LeaderboardEntry[]>(endpoint);
  },
};

// Referral API Functions
export const referralApi = {
  // Add a raffle entry (when someone uses referral)
  addRaffleEntry: async (referralId: string): Promise<ApiResponse<{ ticketCount: number }>> => {
    return apiClient.post<{ ticketCount: number }>('/api/raffle-entry', { referralId });
  },

  // Get referral leaderboard
  getLeaderboard: async (): Promise<ApiResponse<ReferralLeaderboard[]>> => {
    return apiClient.get<ReferralLeaderboard[]>('/api/referral/leaderboard');
  },

  // Get user's referral data
  getReferralData: async (userId: string): Promise<ApiResponse<ReferralData>> => {
    return apiClient.get<ReferralData>(`/api/referral/${userId}`);
  },
};

// API Health Check
export const checkApiHealth = async (): Promise<{ available: boolean; message: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`, { method: 'GET' });
    if (response.ok) {
      const data = await response.json();
      return { available: true, message: `API server is ${data.status}` };
    } else {
      return { available: false, message: `API server returned status ${response.status}` };
    }
  } catch (error) {
    return { 
      available: false, 
      message: `API server is not reachable: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
};

// Utility Functions
export const generateReferralId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const generateReferralLink = (referralId: string): string => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://languagekonnect.com';
  return `${baseUrl}?ref=${referralId}`;
};

// Mock data for development (when API is not available)
export const mockData = {
  leaderboard: [
    {
      id: '1',
      userId: 'user1',
      userName: 'Maria Garcia',
      language: 'Spanish',
      region: 'South America',
      caption: 'Sharing my love for Spanish poetry!',
      videoUrl: '/mock-video.mp4',
      votes: 245,
      createdAt: new Date().toISOString(),
      rank: 1,
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Jean Dupont',
      language: 'French',
      region: 'Europe',
      caption: 'French cooking vocabulary lesson',
      videoUrl: '/mock-video.mp4',
      votes: 198,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      rank: 2,
    },
    {
      id: '3',
      userId: 'user3',
      userName: 'Hiroshi Tanaka',
      language: 'Japanese',
      region: 'Asia',
      caption: 'Traditional Japanese greetings',
      videoUrl: '/mock-video.mp4',
      votes: 167,
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      rank: 3,
    },
  ] as LeaderboardEntry[],

  referralLeaderboard: [
    {
      id: '1',
      userId: 'user1',
      userName: 'Sarah Johnson',
      referralCount: 15,
      raffleTickets: 15,
      rank: 1,
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Ahmed Hassan',
      referralCount: 12,
      raffleTickets: 12,
      rank: 2,
    },
    {
      id: '3',
      userId: 'user3',
      userName: 'Elena Rodriguez',
      referralCount: 9,
      raffleTickets: 9,
      rank: 3,
    },
  ] as ReferralLeaderboard[],
};