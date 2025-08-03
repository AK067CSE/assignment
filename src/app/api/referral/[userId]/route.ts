import { NextRequest, NextResponse } from 'next/server';

// Mock user referral data
const mockUserReferralData = {
  userId: 'current_user',
  referralId: 'REF_ABC123XYZ',
  referralCount: 12,
  totalEarnings: 60.00,
  pendingEarnings: 15.00,
  raffleTickets: 24,
  joinedAt: new Date('2023-12-01').toISOString(),
  lastReferralAt: new Date('2024-01-10').toISOString(),
  isActive: true,
  tier: 'Silver',
  nextTierRequirement: 25,
  recentReferrals: [
    {
      id: 'ref1',
      userName: 'John Doe',
      joinedAt: new Date('2024-01-10').toISOString(),
      status: 'active',
      earnings: 5.00,
    },
    {
      id: 'ref2',
      userName: 'Jane Smith',
      joinedAt: new Date('2024-01-08').toISOString(),
      status: 'active',
      earnings: 5.00,
    },
    {
      id: 'ref3',
      userName: 'Mike Johnson',
      joinedAt: new Date('2024-01-05').toISOString(),
      status: 'pending',
      earnings: 0.00,
    },
  ],
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    console.log('🔄 API: Getting referral data for user:', userId);

    // In a real application, you would fetch user-specific data from database
    // For now, return mock data with the requested userId
    const userData = {
      ...mockUserReferralData,
      userId: userId,
    };

    console.log('✅ API: User referral data sent successfully');

    return NextResponse.json(userData, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });

  } catch (error) {
    console.error('❌ API: Error in user referral data endpoint:', error);
    
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