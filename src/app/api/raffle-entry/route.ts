import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('🔄 API: Processing raffle entry');

    const body = await request.json();
    const { referralId } = body;

    // Validate referral ID
    if (!referralId) {
      return NextResponse.json(
        { 
          error: 'Missing referral ID',
          message: 'Referral ID is required'
        },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
        }
      );
    }

    // In a real application, you would:
    // 1. Validate the referral ID exists
    // 2. Check if the user is eligible for raffle entry
    // 3. Add raffle tickets to the user's account
    // 4. Update referral statistics

    // For now, simulate adding raffle tickets
    const ticketsAdded = Math.floor(Math.random() * 5) + 1; // 1-5 tickets
    const totalTickets = Math.floor(Math.random() * 50) + ticketsAdded; // Simulate total

    console.log('✅ API: Raffle entry processed successfully:', {
      referralId,
      ticketsAdded,
      totalTickets
    });

    return NextResponse.json(
      { 
        ticketCount: totalTickets,
        ticketsAdded,
        message: `Added ${ticketsAdded} raffle tickets!`
      },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );

  } catch (error) {
    console.error('❌ API: Error in raffle entry endpoint:', error);
    
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