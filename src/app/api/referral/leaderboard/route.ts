import { NextRequest, NextResponse } from 'next/server';

// Mock data for referral leaderboard
const mockReferralLeaderboard = [
  {
    id: '1',
    userId: 'ref_user1',
    userName: 'Alex Thompson',
    referralCount: 47,
    totalEarnings: 235.50,
    rank: 1,
    joinedAt: new Date('2023-12-01').toISOString(),
    isActive: true,
  },
  {
    id: '2',
    userId: 'ref_user2',
    userName: 'Sarah Kim',
    referralCount: 38,
    totalEarnings: 190.00,
    rank: 2,
    joinedAt: new Date('2023-11-15').toISOString(),
    isActive: true,
  },
  {
    id: '3',
    userId: 'ref_user3',
    userName: 'Miguel Rodriguez',
    referralCount: 31,
    totalEarnings: 155.00,
    rank: 3,
    joinedAt: new Date('2023-11-20').toISOString(),
    isActive: true,
  },
  {
    id: '4',
    userId: 'ref_user4',
    userName: 'Emma Wilson',
    referralCount: 24,
    totalEarnings: 120.00,
    rank: 4,
    joinedAt: new Date('2023-12-05').toISOString(),
    isActive: true,
  },
  {
    id: '5',
    userId: 'ref_user5',
    userName: 'David Chen',
    referralCount: 19,
    totalEarnings: 95.00,
    rank: 5,
    joinedAt: new Date('2023-12-10').toISOString(),
    isActive: true,
  },
  {
    id: '6',
    userId: 'ref_user6',
    userName: 'Lisa Anderson',
    referralCount: 15,
    totalEarnings: 75.00,
    rank: 6,
    joinedAt: new Date('2023-12-12').toISOString(),
    isActive: true,
  },
  {
    id: '7',
    userId: 'ref_user7',
    userName: 'James Miller',
    referralCount: 12,
    totalEarnings: 60.00,
    rank: 7,
    joinedAt: new Date('2023-12-15').toISOString(),
    isActive: true,
  },
  {
    id: '8',
    userId: 'ref_user8',
    userName: 'Anna Kowalski',
    referralCount: 8,
    totalEarnings: 40.00,
    rank: 8,
    joinedAt: new Date('2023-12-18').toISOString(),
    isActive: true,
  },
];

export async function GET(request: NextRequest) {
  try {
    console.log('🔄 API: Getting referral leaderboard');

    // Sort by referral count (descending)
    const sortedData = [...mockReferralLeaderboard].sort((a, b) => b.referralCount - a.referralCount);

    // Update ranks
    sortedData.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    console.log('✅ API: Referral leaderboard data sent successfully');

    return NextResponse.json(sortedData, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });

  } catch (error) {
    console.error('❌ API: Error in referral leaderboard endpoint:', error);
    
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