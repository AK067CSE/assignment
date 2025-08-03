import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('🔄 API: Receiving contest entry submission');

    const formData = await request.formData();
    const language = formData.get('language') as string;
    const region = formData.get('region') as string;
    const caption = formData.get('caption') as string;
    const video = formData.get('video') as File;

    // Validate required fields
    if (!language || !region || !caption || !video) {
      return NextResponse.json(
        { 
          error: 'Missing required fields',
          message: 'Language, region, caption, and video are required'
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

    // Validate video file
    if (!video.type.startsWith('video/')) {
      return NextResponse.json(
        { 
          error: 'Invalid file type',
          message: 'Only video files are allowed'
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

    // Check file size (max 50MB)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (video.size > maxSize) {
      return NextResponse.json(
        { 
          error: 'File too large',
          message: 'Video file must be less than 50MB'
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
    // 1. Save the video file to cloud storage (AWS S3, Cloudinary, etc.)
    // 2. Save the entry data to a database
    // 3. Process the video (thumbnails, compression, etc.)
    
    // For now, we'll simulate a successful submission
    const newEntry = {
      id: `entry_${Date.now()}`,
      userId: `user_${Date.now()}`,
      userName: 'New User', // In real app, get from authentication
      language,
      region,
      caption,
      videoUrl: '/api/placeholder-video', // In real app, this would be the uploaded video URL
      votes: 0,
      views: 0,
      rank: 0, // Will be calculated when leaderboard is fetched
      submittedAt: new Date().toISOString(),
    };

    console.log('✅ API: Contest entry submitted successfully:', {
      language,
      region,
      caption,
      videoSize: `${(video.size / 1024 / 1024).toFixed(2)}MB`
    });

    return NextResponse.json(newEntry, {
      status: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });

  } catch (error) {
    console.error('❌ API: Error in contest entry submission:', error);
    
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