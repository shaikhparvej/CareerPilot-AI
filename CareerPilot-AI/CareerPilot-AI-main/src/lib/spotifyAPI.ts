// Spotify Web API integration for CareerPilot-AI
// Complete implementation with proper authentication and helper functions

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string }>;
  };
  duration_ms: number;
  preview_url: string | null;
  external_urls: {
    spotify: string;
  };
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  images: Array<{ url: string }>;
  tracks: {
    items: Array<{
      track: SpotifyTrack;
    }>;
  };
}

export interface SpotifySearchResponse {
  tracks?: {
    items: SpotifyTrack[];
  };
  playlists?: {
    items: SpotifyPlaylist[];
  };
}

export interface SpotifyPlaylistItem {
  track: SpotifyTrack;
}

export interface SpotifyAccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

class SpotifyAPIService {
  private readonly CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  private readonly CLIENT_SECRET =
    process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
  private readonly TOKEN_URL = 'https://accounts.spotify.com/api/token';
  private readonly API_BASE_URL = 'https://api.spotify.com/v1';

  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  /**
   * 1. Get Access Token using Client Credentials flow
   * This function exchanges Client ID and Client Secret for an access token
   */
  async getAccessToken(): Promise<string | null> {
    // Check if current token is still valid (with 5 minute buffer)
    if (this.accessToken && Date.now() < this.tokenExpiry - 300000) {
      return this.accessToken;
    }

    // Check if credentials are properly configured
    if (
      !this.CLIENT_ID ||
      !this.CLIENT_SECRET ||
      this.CLIENT_ID === 'your_actual_spotify_client_id' ||
      this.CLIENT_SECRET === 'your_actual_spotify_client_secret' ||
      this.CLIENT_ID === '' ||
      this.CLIENT_SECRET === ''
    ) {
      console.info(
        '🎵 Spotify credentials not configured - using fallback music data'
      );
      console.info(
        '� To enable Spotify: Get credentials from https://developer.spotify.com/dashboard'
      );
      return null;
    }

    try {
      // Use browser-compatible Base64 encoding
      const credentials = btoa(`${this.CLIENT_ID}:${this.CLIENT_SECRET}`);

      const response = await fetch(this.TOKEN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${credentials}`,
        },
        body: 'grant_type=client_credentials',
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Spotify token request failed:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText,
        });
        throw new Error(
          `Spotify authentication failed: ${response.status}. Please check your credentials.`
        );
      }

      const data: SpotifyAccessTokenResponse = await response.json();

      this.accessToken = data.access_token;
      this.tokenExpiry = Date.now() + data.expires_in * 1000; // Convert to milliseconds

      console.log('✅ Spotify access token obtained successfully');
      console.log(`🕒 Token expires in: ${data.expires_in} seconds`);

      return this.accessToken;
    } catch (error) {
      console.error('❌ Failed to get Spotify access token:', error);
      return null;
    }
  }

  /**
   * 2. Generic Spotify Web API fetch function
   * Handles authentication and makes API calls to Spotify
   */
  async fetchWebApi(
    endpoint: string,
    method: 'GET' | 'POST' = 'GET',
    body?: Record<string, unknown>
  ): Promise<
    | SpotifySearchResponse
    | SpotifyTrack[]
    | SpotifyPlaylist[]
    | Record<string, unknown>
  > {
    const token = await this.getAccessToken();

    if (!token) {
      console.warn('⚠️ Spotify API unavailable - using fallback data');
      // Return empty result instead of throwing error
      return { tracks: { items: [] }, playlists: { items: [] } };
    }

    const url = `${this.API_BASE_URL}/${endpoint}`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw new Error(
          `Spotify API request failed: ${response.status} ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error(
        `❌ Spotify API call failed [${method} ${endpoint}]:`,
        error
      );
      // Return empty result instead of throwing error
      return { tracks: { items: [] }, playlists: { items: [] } };
    }
  }

  /**
   * 3. Get Top Tracks (requires user authentication for actual user data)
   * Note: Client Credentials flow doesn't support user-specific data
   * This is an example - would need Authorization Code flow for real user data
   */
  async getTopTracks(): Promise<void> {
    try {
      // Client Credentials flow doesn't support /me endpoints
      // This would require user authentication (Authorization Code flow)
      console.log('⚠️ Note: /me/top/tracks requires user authorization');
      console.log('💡 Using search for popular tracks instead...');

      // Alternative: Search for popular tracks
      await this.getPopularTracks();
    } catch (error) {
      console.error('❌ Failed to get top tracks:', error);
    }
  }

  /**
   * Get Popular Tracks (works with Client Credentials)
   * This searches for popular tracks as an alternative to user's top tracks
   */
  async getPopularTracks(): Promise<SpotifyTrack[]> {
    try {
      const data = (await this.fetchWebApi(
        'search?q=genre:pop&type=track&limit=5&market=US'
      )) as SpotifySearchResponse;

      const tracks: SpotifyTrack[] = data.tracks?.items || [];

      console.log('🎵 Top 5 Popular Tracks:');
      tracks.forEach((track, index) => {
        const artists = track.artists.map(artist => artist.name).join(', ');
        console.log(`${index + 1}. "${track.name}" by ${artists}`);
      });

      return tracks;
    } catch (error) {
      console.error('❌ Failed to get popular tracks:', error);
      return [];
    }
  }

  /**
   * Search for study/focus playlists
   */
  async getFocusPlaylists(): Promise<SpotifyPlaylist[]> {
    try {
      const data = (await this.fetchWebApi(
        'search?q=study%20focus%20ambient&type=playlist&limit=10&market=US'
      )) as SpotifySearchResponse;

      const playlists: SpotifyPlaylist[] = data.playlists?.items || [];

      console.log('📚 Focus/Study Playlists:');
      playlists.forEach((playlist, index) => {
        console.log(
          `${index + 1}. "${playlist.name}" - ${
            playlist.description || 'No description'
          }`
        );
      });

      return playlists;
    } catch (error) {
      console.error('❌ Failed to get focus playlists:', error);
      return [];
    }
  }

  /**
   * Search for tracks by genre
   */
  async getTracksByGenre(
    genre: string,
    limit: number = 20
  ): Promise<SpotifyTrack[]> {
    try {
      const query = `genre:${genre}`;
      const data = (await this.fetchWebApi(
        `search?q=${encodeURIComponent(
          query
        )}&type=track&limit=${limit}&market=US`
      )) as SpotifySearchResponse;

      const tracks: SpotifyTrack[] = data.tracks?.items || [];

      console.log(`🎼 ${genre.toUpperCase()} Tracks (${tracks.length}):`);
      tracks.slice(0, 5).forEach((track, index) => {
        const artists = track.artists.map(artist => artist.name).join(', ');
        console.log(`${index + 1}. "${track.name}" by ${artists}`);
      });

      return tracks;
    } catch (error) {
      console.error(`❌ Failed to get ${genre} tracks:`, error);
      return [];
    }
  }

  /**
   * Get playlist tracks
   */
  async getPlaylistTracks(playlistId: string): Promise<SpotifyTrack[]> {
    try {
      const data = (await this.fetchWebApi(
        `playlists/${playlistId}/tracks?limit=50&market=US`
      )) as { items: SpotifyPlaylistItem[] };

      const tracks: SpotifyTrack[] = data.items
        .filter(
          (item: SpotifyPlaylistItem) =>
            item.track && !('is_local' in item.track && item.track.is_local)
        )
        .map((item: SpotifyPlaylistItem) => item.track);

      console.log(`🎵 Playlist Tracks (${tracks.length}):`);
      tracks.slice(0, 5).forEach((track, index) => {
        const artists = track.artists.map(artist => artist.name).join(', ');
        console.log(`${index + 1}. "${track.name}" by ${artists}`);
      });

      return tracks;
    } catch (error) {
      console.error(`❌ Failed to get playlist tracks:`, error);
      return [];
    }
  }

  /**
   * Convert Spotify track to our internal Track format
   */
  convertToInternalTrack(spotifyTrack: SpotifyTrack): Track {
    return {
      id: spotifyTrack.id,
      name: spotifyTrack.name,
      artist: spotifyTrack.artists.map(a => a.name).join(', '),
      album: spotifyTrack.album.name,
      duration: Math.floor(spotifyTrack.duration_ms / 1000),
      preview_url: spotifyTrack.preview_url || undefined,
      image: spotifyTrack.album.images[0]?.url,
      genre: 'Spotify',
    };
  }

  /**
   * Test all Spotify API functions
   */
  async testSpotifyAPI(): Promise<void> {
    console.log('🧪 Testing Spotify API integration...\n');

    try {
      // Test 1: Get access token
      console.log('1️⃣ Testing access token...');
      const token = await this.getAccessToken();
      if (token) {
        console.log(`✅ Access token obtained: ${token.substring(0, 20)}...`);
      } else {
        console.log('❌ Failed to get access token');
        return;
      }

      // Test 2: Get popular tracks
      console.log('\n2️⃣ Testing popular tracks...');
      await this.getPopularTracks();

      // Test 3: Get focus playlists
      console.log('\n3️⃣ Testing focus playlists...');
      await this.getFocusPlaylists();

      // Test 4: Get ambient tracks
      console.log('\n4️⃣ Testing ambient tracks...');
      await this.getTracksByGenre('ambient');

      console.log('\n✅ All Spotify API tests completed!');
    } catch (error) {
      console.error('❌ Spotify API test failed:', error);
    }
  }
}

// Internal Track interface (from your existing code)
interface Track {
  id: string;
  name: string;
  artist: string;
  album?: string;
  duration: number;
  preview_url?: string;
  image?: string;
  genre?: string;
}

// Export singleton instance
export const spotifyAPI = new SpotifyAPIService();

// Export for easy testing in console
export default spotifyAPI;
