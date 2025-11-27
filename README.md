# MovieFlix - Movie Recommendation Web App

A fully functional movie recommendation app built with Next.js, TypeScript, and styled with Tailwind CSS. Featuring real-time data from The Movie Database (TMDB) API.

## Features

- **Trending Movies**: Discover the most trending movies this week
- **Movie Details**: View comprehensive information about each movie including runtime, genres, and rating
- **Recommendations**: Get personalized movie recommendations based on selected movies
- **Search**: Search for any movie in the TMDB database
- **Favorites**: Save your favorite movies with persistent localStorage storage
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **Error Handling**: Graceful error states and loading skeletons

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Image Handling**: Next.js Image component
- **State Management**: React hooks with localStorage
- **API**: The Movie Database (TMDB) API

## Prerequisites

- Node.js 18+ installed
- A TMDB API key (free from https://www.themoviedb.org/settings/api)

## Setup Instructions

### 1. Clone and Install

\`\`\`bash
git clone <repository-url>
cd movieflix
npm install
\`\`\`

### 2. Configure Environment Variables

1. Create a \`.env.local\` file in the root directory:

\`\`\`bash
cp .env.example .env.local
\`\`\`

2. Add your TMDB API key:

\`\`\`
NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
\`\`\`

To get a free TMDB API key:
- Go to https://www.themoviedb.org/settings/api
- Sign up for a free account if you don't have one
- Create an API key in your account settings
- Copy the API key and paste it into your .env.local file

### 3. Run the Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
├── app/
│   ├── layout.tsx          # Root layout
│   ├── globals.css         # Global styles
│   ├── page.tsx            # Home page with trending movies
│   ├── movie/
│   │   └── [id]/
│   │       └── page.tsx    # Movie detail page
│   ├── search/
│   │   └── page.tsx        # Search page
│   └── favorites/
│       └── page.tsx        # Favorites page
├── components/
│   ├── navbar.tsx          # Navigation component
│   ├── movie-card.tsx      # Individual movie card
│   ├── movie-grid.tsx      # Grid of movie cards
│   ├── loading-skeleton.tsx # Loading state
│   └── error-ui.tsx        # Error state
├── hooks/
│   └── use-favorites.ts    # Custom hook for favorites management
├── types/
│   └── movie.ts            # TypeScript interfaces
├── utils/
│   └── tmdb.ts             # TMDB API utilities
└── .env.example            # Environment variables template
\`\`\`

## Pages

### Home Page (/)
Displays trending movies from the current week with a modern grid layout.

### Movie Detail Page (/movie/[id])
Shows:
- Movie poster and backdrop
- Full movie details (rating, release date, runtime, genres)
- Complete overview
- Recommended movies
- Add to favorites button

### Search Page (/search)
Real-time movie search with:
- Search input field
- Instant results display
- Error handling for no results

### Favorites Page (/favorites)
View all saved favorite movies with persistent storage using localStorage.

## Features in Detail

### Favorites System
- Save/remove movies from favorites
- Persistent storage using browser localStorage
- Access favorites across browser sessions
- One-click favorite toggle on movie cards

### Error Handling
- API error messages
- Network error fallbacks
- Loading states with skeleton loaders
- User-friendly error UI

### Responsive Design
- Mobile-first approach
- Adaptive grid layouts (1 column on mobile, 4 on desktop)
- Touch-friendly buttons and interactions
- Optimized images for all screen sizes

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to https://vercel.com and sign in
3. Click "New Project" and import your repository
4. Add environment variables in the Vercel dashboard:
   - \`NEXT_PUBLIC_TMDB_API_KEY\`
5. Deploy!

## API Integration

All data is fetched directly from TMDB API. No mock data is used.

### Available Endpoints Used:
- Trending movies (weekly)
- Movie details
- Movie recommendations
- Movie search

### Image URLs
Movie posters and backdrops are served from TMDB's CDN:
\`https://image.tmdb.org/t/p/w500{path}\`

## Troubleshooting

### "API Key Not Set" Warning
Make sure you've created a \`.env.local\` file with your TMDB API key.

### Movies Not Loading
1. Verify your TMDB API key is valid
2. Check your internet connection
3. TMDB API might be temporarily unavailable
4. Try refreshing the page

### Favorites Not Persisting
- Make sure localStorage is enabled in your browser
- Check browser privacy settings
- Clear cache and try again

## Performance Considerations

- Images are optimized with Next.js Image component
- Lazy loading for grid items
- Efficient state management with React hooks
- Memoized components to prevent unnecessary re-renders

## Future Enhancements

- User authentication and cloud-based favorites
- Advanced filtering and sorting
- User ratings and reviews
- Watchlist feature
- Share recommendations with friends
- Dark/light mode toggle

## License

MIT

## Support

For issues or questions, please refer to the TMDB API documentation:
https://www.themoviedb.org/settings/api
\`\`\`
