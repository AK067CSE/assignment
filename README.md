# LanguageKonnect - Full-Stack Language Learning Platform

A modern, full-stack Next.js application for language learning contests and referral programs with a professional UI and complete backend API.

## 🚀 Features

### Frontend
- **Modern UI**: Professional design with glassmorphism effects and gradient themes
- **Contest Module**: Video upload and leaderboard system
- **Referral System**: Complete referral tracking and leaderboard
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Updates**: Auto-refreshing leaderboards
- **Professional Animations**: Smooth transitions and loading states

### Backend API
- **Contest API**: Video submission and leaderboard endpoints
- **Referral API**: User referral data and leaderboard management
- **Health Check**: API status monitoring
- **File Upload**: Video file handling with validation
- **CORS Support**: Cross-origin resource sharing enabled

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Custom CSS animations
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Backend**: Next.js API Routes
- **Deployment**: Vercel (single project deployment)

## 📁 Project Structure

```
languagekonnect/
├── src/
│   ├── app/
│   │   ├── api/                    # Backend API routes
│   │   │   ├── contest/
│   │   │   │   ├── entry/          # Contest submission endpoint
│   │   │   │   └── leaderboard/    # Contest leaderboard endpoint
│   │   │   ├── referral/
│   │   │   │   ├── [userId]/       # User referral data endpoint
│   │   │   │   └── leaderboard/    # Referral leaderboard endpoint
│   │   │   ├── raffle-entry/       # Raffle entry endpoint
│   │   │   └── health/             # Health check endpoint
│   │   ├── globals.css             # Global styles and animations
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Home page
│   │   ├── privacy/                # Privacy policy page
│   │   └── terms/                  # Terms of service page
│   ├── components/                 # React components
│   │   ├── ContestModule.tsx       # Contest functionality
│   │   ├── ReferralModule.tsx      # Referral functionality
│   │   ├── VideoUpload.tsx         # Video upload component
│   │   ├── Leaderboard.tsx         # Leaderboard display
│   │   └── ReferralLeaderboard.tsx # Referral leaderboard
│   ├── lib/
│   │   └── api.ts                  # API client and utilities
│   └── types/
│       └── index.ts                # TypeScript type definitions
├── vercel.json                     # Vercel deployment configuration
└── package.json                    # Dependencies and scripts
```

## 🚀 Deployment to Vercel

### Option 1: Deploy from GitHub (Recommended)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/languagekonnect.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect Next.js and configure everything
   - Click "Deploy"

### Option 2: Deploy with Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Follow the prompts**:
   - Set up and deploy? `Y`
   - Which scope? Choose your account
   - Link to existing project? `N`
   - Project name? `languagekonnect` (or your preferred name)
   - In which directory? `./`
   - Want to override settings? `N`

## 🔧 Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   ```
   http://localhost:3000
   ```

## 📡 API Endpoints

### Contest API
- `GET /api/contest/leaderboard` - Get contest leaderboard with optional filters
- `POST /api/contest/entry` - Submit a new contest entry

### Referral API
- `GET /api/referral/leaderboard` - Get referral leaderboard
- `GET /api/referral/[userId]` - Get user's referral data
- `POST /api/raffle-entry` - Add raffle entry for referral

### Utility API
- `GET /api/health` - Health check endpoint

## 🎨 UI Features

### Professional Design System
- **Color Palette**: Indigo/Purple gradients with Slate accents
- **Glass Morphism**: Backdrop blur effects throughout
- **Animations**: Smooth transitions and hover effects
- **Typography**: Gradient text and professional hierarchy
- **Responsive**: Mobile-first design approach

### Interactive Elements
- **Loading States**: Professional skeleton loaders
- **Error Handling**: Graceful error messages and fallbacks
- **Real-time Updates**: Auto-refreshing data
- **Toast Notifications**: User feedback for actions

## 🔒 Environment Variables

Create a `.env.local` file for local development:

```env
# Optional: Override API base URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000

# Optional: API authentication token
NEXT_PUBLIC_AUTH_TOKEN=your-token-here
```

## 🚀 Production Features

- **Server-Side Rendering**: Optimized performance
- **Static Generation**: Fast page loads
- **API Routes**: Built-in backend functionality
- **Edge Functions**: Vercel edge runtime support
- **Automatic HTTPS**: Secure by default
- **Global CDN**: Fast worldwide delivery

## 📝 Notes

- The application includes mock data for demonstration purposes
- Video uploads are validated but not permanently stored (implement cloud storage for production)
- All API endpoints include proper CORS headers
- The application is fully responsive and accessible
- Professional error handling and loading states throughout

## 🎯 Next Steps for Production

1. **Database Integration**: Add PostgreSQL/MongoDB for data persistence
2. **File Storage**: Implement AWS S3/Cloudinary for video storage
3. **Authentication**: Add user authentication system
4. **Real-time Features**: Implement WebSocket for live updates
5. **Analytics**: Add user analytics and tracking
6. **Payment Integration**: Add payment processing for referral earnings

## 📞 Support

For deployment issues or questions, refer to:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Ready to deploy!** 🚀 Your full-stack LanguageKonnect application is configured for seamless Vercel deployment with both frontend and backend in a single project.