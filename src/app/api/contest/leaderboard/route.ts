import { NextRequest, NextResponse } from 'next/server';

// Mock data for leaderboard
const mockLeaderboard = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Maria Garcia',
    language: 'Spanish',
    region: 'South America',
    caption: 'Sharing my love for Spanish poetry!',
    videoUrl: '/api/placeholder-video',
    votes: 245,
    views: 1200,
    rank: 1,
    submittedAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Chen Wei',
    language: 'Mandarin',
    region: 'East Asia',
    caption: 'Traditional Chinese calligraphy demonstration',
    videoUrl: '/api/placeholder-video',
    votes: 198,
    views: 890,
    rank: 2,
    submittedAt: new Date('2024-01-14').toISOString(),
  },
  {
    id: '3',
    userId: 'user3',
    userName: 'Ahmed Hassan',
    language: 'Arabic',
    region: 'Middle East',
    caption: 'Classical Arabic literature recitation',
    videoUrl: '/api/placeholder-video',
    votes: 167,
    views: 750,
    rank: 3,
    submittedAt: new Date('2024-01-13').toISOString(),
  },
  {
    id: '4',
    userId: 'user4',
    userName: 'Sophie Laurent',
    language: 'French',
    region: 'Europe',
    caption: 'French pronunciation masterclass',
    videoUrl: '/api/placeholder-video',
    votes: 134,
    views: 620,
    rank: 4,
    submittedAt: new Date('2024-01-12').toISOString(),
  },
  {
    id: '5',
    userId: 'user5',
    userName: 'Raj Patel',
    language: 'Hindi',
    region: 'South Asia',
    caption: 'Bollywood dialogue delivery',
    videoUrl: '/api/placeholder-video',
    votes: 112,
    views: 540,
    rank: 5,
    submittedAt: new Date('2024-01-11').toISOString(),
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sortBy = searchParams.get('sortBy') || 'votes';
    const language = searchParams.get('language');
    const region = searchParams.get('region');

    console.log('🔄 API: Getting leaderboard with filters:', { sortBy, language, region });

    let filteredData = [...mockLeaderboard];

    // Apply filters
    if (language) {
      filteredData = filteredData.filter(entry => 
        entry.language.toLowerCase().includes(language.toLowerCase())
      );
    }

    if (region) {
      filteredData = filteredData.filter(entry => 
        entry.region.toLowerCase().includes(region.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'votes':
        filteredData.sort((a, b) => b.votes - a.votes);
        break;
      case 'views':
        filteredData.sort((a, b) => b.views - a.views);
        break;
      case 'recent':
        filteredData.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
        break;
      default:
        filteredData.sort((a, b) => b.votes - a.votes);
    }

    // Update ranks based on current sorting
    filteredData.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    console.log('✅ API: Leaderboard data sent successfully');

    return NextResponse.json(filteredData, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });

  } catch (error) {
    console.error('❌ API: Error in leaderboard endpoint:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}