# 🎵 CareerPilot-AI Spotify Integration Setup Guide

## Overview

The CareerPilot-AI application now includes dynamic music integration using the Spotify Web API with fallback to Jamendo for royalty-free music. This provides users with real study music, ambient sounds, and focus playlists.

## 🔧 Setup Instructions

### 1. Get Spotify API Credentials

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Click "Create an App"
3. Fill in the app details:
   - **App Name**: CareerPilot-AI Music
   - **App Description**: Music integration for study platform
   - **Website**: http://localhost:3000 (for development)
   - **Redirect URI**: Not needed for Client Credentials flow
4. Click "Save"
5. Copy your **Client ID** and **Client Secret**

### 2. Configure Environment Variables

Update your `.env.local` file with your actual Spotify credentials:

```bash
# Replace these with your actual Spotify app credentials
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_actual_spotify_client_id
NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET=your_actual_spotify_client_secret

# Jamendo is already configured for fallback
NEXT_PUBLIC_JAMENDO_CLIENT_ID=56d30c95
```

### 3. Test the Integration

1. Start your development server:

   ```bash
   npm run dev
   ```

2. Navigate to the test page:

   ```
   http://localhost:3000/test-music
   ```

3. Click "🎧 Test Spotify" to verify the connection
4. Click "🎵 Load All Music" to test all music categories

## 📚 API Integration Details

### Core Functions Implemented

#### ✅ `getAccessToken()`

- Uses Client Credentials flow for public music data
- Automatically refreshes expired tokens
- Handles authentication errors gracefully

#### ✅ `fetchWebApi(endpoint, method, body?)`

- Generic API caller for all Spotify endpoints
- Includes proper error handling and token management
- Supports GET, POST, PUT, DELETE methods

#### ✅ `getTopTracks()`

- Fetches popular tracks for studying/focus
- Returns formatted track data with preview URLs
- Falls back to alternative searches if needed

### Music Categories Available

1. **🌊 Ambient Tracks** - Instrumental focus music
2. **🎧 Lo-Fi Hip Hop** - Chill beats for studying
3. **🌿 Nature Sounds** - Rain, forest, and natural ambience
4. **🔥 Popular Study** - Trending focus music
5. **📋 Study Playlists** - Curated focus playlists

### Fallback System

- **Primary**: Spotify Web API (requires credentials)
- **Secondary**: Jamendo API (royalty-free music)
- **Tertiary**: Local fallback tracks

## 🎯 Usage in Components

### Basic Track Fetching

```typescript
import { musicAPI } from '@/lib/musicAPI';

// Get ambient tracks
const ambientTracks = await musicAPI.getAmbientTracks();

// Get all music at once
const allMusic = await musicAPI.getAllStudyMusic();
```

### Using with React Components

```tsx
'use client';
import { musicAPI, Track } from '@/lib/musicAPI';
import { useState, useEffect } from 'react';

export default function MusicPlayer() {
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    const loadMusic = async () => {
      const lofiTracks = await musicAPI.getLoFiTracks();
      setTracks(lofiTracks);
    };
    loadMusic();
  }, []);

  return (
    <div>
      {tracks.map(track => (
        <div key={track.id}>
          <h3>{track.name}</h3>
          <p>{track.artist}</p>
          {track.preview_url && (
            <audio controls>
              <source src={track.preview_url} type="audio/mpeg" />
            </audio>
          )}
        </div>
      ))}
    </div>
  );
}
```

## 🔍 API Endpoints Used

### Spotify Web API

- `GET /search` - Search for tracks, playlists, artists
- `GET /playlists/{id}/tracks` - Get playlist tracks
- `POST /token` - Client Credentials authentication

### Jamendo API (Fallback)

- `GET /tracks` - Search royalty-free tracks by tags
- No authentication required for basic usage

## ⚡ Performance Features

- **Token Caching**: Access tokens are cached and reused until expiry
- **Parallel Requests**: Multiple music categories load simultaneously
- **Error Recovery**: Automatic fallback to alternative APIs
- **Rate Limiting**: Respects API rate limits with proper delays

## 🛠 Troubleshooting

### Common Issues

#### "Failed to get access token"

- Check that `NEXT_PUBLIC_SPOTIFY_CLIENT_ID` is set correctly
- Verify `NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET` is valid
- Ensure your Spotify app is not in quota exceeded state

#### "Search returned no results"

- Spotify search queries are URL-encoded automatically
- Regional restrictions may limit some tracks
- Fallback to Jamendo API will activate automatically

#### "Preview URL not available"

- Not all Spotify tracks have 30-second previews
- This is normal and handled gracefully in the UI
- Jamendo tracks typically include full audio URLs

### Debug Mode

To see detailed API logs, check the browser console when testing at `/test-music`.

## 🚀 Next Steps

### Potential Enhancements

1. **User Playlists**: Add user authentication for personal playlists
2. **Music Recommendations**: Use Spotify's recommendation engine
3. **Audio Analysis**: Implement tempo-based study music selection
4. **Offline Mode**: Cache popular tracks for offline study sessions

### Integration Points

- **Focus Timer**: Sync music with study sessions
- **Mood Detection**: Select music based on user's current mood
- **Study Analytics**: Track music preferences and productivity correlation

## 📄 API Documentation

For complete API reference, see:

- [Spotify Web API Docs](https://developer.spotify.com/documentation/web-api/)
- [Jamendo API Docs](https://developer.jamendo.com/v3.0)

---

**Status**: ✅ Fully Implemented and Ready for Use
**Dependencies**: Spotify Developer Account (Free)
**Fallback**: Jamendo API (No account required)
