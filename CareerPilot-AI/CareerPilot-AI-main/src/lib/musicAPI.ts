// Music API service for CareerPilot AI dynamic content
import { FALLBACK_MUSIC_DATA, FallbackTrack } from './fallbackMusic';
import { spotifyAPI, SpotifySearchResponse, SpotifyTrack } from './spotifyAPI';

export interface Track {
  id: string;
  name: string;
  artist: string;
  album?: string;
  duration: number;
  preview_url?: string;
  image?: string;
  genre?: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  tracks: Track[];
  image?: string;
}

// API Response types
interface JamendoTrack {
  id: string;
  name: string;
  artist_name: string;
  album_name: string;
  duration: number;
  audio: string;
  album_image: string;
}

// Using a combination of APIs for music data
class MusicAPIService {
  private readonly JAMENDO_CLIENT_ID =
    process.env.NEXT_PUBLIC_JAMENDO_CLIENT_ID || 'your_jamendo_key';

  // Convert fallback track to our Track interface
  private convertFallbackTrack(fallbackTrack: FallbackTrack): Track {
    return {
      id: fallbackTrack.id,
      name: fallbackTrack.name,
      artist: fallbackTrack.artist,
      album: fallbackTrack.album,
      duration: fallbackTrack.duration,
      genre: fallbackTrack.genre,
    };
  }

  // Convert Spotify track to our Track interface
  private convertSpotifyTrack(spotifyTrack: SpotifyTrack): Track {
    return {
      id: spotifyTrack.id,
      name: spotifyTrack.name,
      artist: spotifyTrack.artists[0]?.name || 'Unknown Artist',
      album: spotifyTrack.album?.name,
      duration: Math.floor(spotifyTrack.duration_ms / 1000),
      preview_url: spotifyTrack.preview_url || undefined,
      image: spotifyTrack.album?.images?.[0]?.url,
      genre: 'Study Music',
    };
  }

  // Fetch focus/study playlists from Spotify using our new service
  async getFocusPlaylists(): Promise<Playlist[]> {
    try {
      // First check if Spotify is available
      const token = await spotifyAPI.getAccessToken();
      if (!token) {
        console.info('🎵 Spotify not available, using fallback playlists');
        return this.getFallbackPlaylists();
      }

      // Use our spotifyAPI service to search for focus playlists
      const searchResults = (await spotifyAPI.fetchWebApi(
        'search?q=focus%20study%20ambient&type=playlist&limit=10',
        'GET'
      )) as SpotifySearchResponse;

      if (
        searchResults?.playlists?.items &&
        searchResults.playlists.items.length > 0
      ) {
        const playlists = await Promise.all(
          searchResults.playlists.items.map(
            async (playlist: {
              id: string;
              name: string;
              description: string;
              images: Array<{ url: string }>;
            }) => {
              // Get tracks for each playlist - simplified for now
              return {
                id: playlist.id,
                name: playlist.name,
                description: playlist.description || 'Study playlist',
                image: playlist.images?.[0]?.url,
                tracks: [], // We'll populate tracks separately if needed
              };
            }
          )
        );
        return playlists;
      }

      return this.getFallbackPlaylists();
    } catch (error) {
      console.error('Spotify playlist error:', error);
      return this.getFallbackPlaylists();
    }
  }

  // Fetch ambient/focus tracks using Spotify API
  async getAmbientTracks(): Promise<Track[]> {
    try {
      // First check if Spotify is available
      const token = await spotifyAPI.getAccessToken();
      if (!token) {
        console.info(
          '🎵 Spotify not available, using offline fallback for ambient tracks'
        );
        return FALLBACK_MUSIC_DATA.ambient.map(track =>
          this.convertFallbackTrack(track)
        );
      }

      // Use our Spotify service to search for ambient tracks
      const searchResults = (await spotifyAPI.fetchWebApi(
        'search?q=ambient%20instrumental%20focus&type=track&limit=20',
        'GET'
      )) as SpotifySearchResponse;
      if (searchResults?.tracks?.items) {
        return searchResults.tracks.items.map((track: SpotifyTrack) =>
          this.convertSpotifyTrack(track)
        );
      }

      // Fallback to comprehensive offline data if Spotify fails
      return FALLBACK_MUSIC_DATA.ambient.map(track =>
        this.convertFallbackTrack(track)
      );
    } catch (error) {
      console.error('Ambient tracks error:', error);
      return FALLBACK_MUSIC_DATA.ambient.map(track =>
        this.convertFallbackTrack(track)
      );
    }
  }

  // Fetch lo-fi hip hop tracks using Spotify API
  async getLoFiTracks(): Promise<Track[]> {
    try {
      // First check if Spotify is available
      const token = await spotifyAPI.getAccessToken();
      if (!token) {
        console.info(
          '🎵 Spotify not available, using offline fallback for lo-fi tracks'
        );
        return FALLBACK_MUSIC_DATA.lofi.map(track =>
          this.convertFallbackTrack(track)
        );
      }

      // Use our Spotify service to search for lo-fi tracks
      const searchResults = (await spotifyAPI.fetchWebApi(
        'search?q=lofi%20hip%20hop%20chill%20beats&type=track&limit=15',
        'GET'
      )) as SpotifySearchResponse;
      if (searchResults?.tracks?.items) {
        return searchResults.tracks.items.map((track: SpotifyTrack) =>
          this.convertSpotifyTrack(track)
        );
      }

      // Fallback to offline data if Spotify fails
      return FALLBACK_MUSIC_DATA.lofi.map(track =>
        this.convertFallbackTrack(track)
      );
    } catch (error) {
      console.error('Lo-Fi tracks error:', error);
      return FALLBACK_MUSIC_DATA.lofi.map(track =>
        this.convertFallbackTrack(track)
      );
    }
  }

  // Get nature sounds for focus
  async getNatureSounds(): Promise<Track[]> {
    try {
      // First check if Spotify is available
      const token = await spotifyAPI.getAccessToken();
      if (!token) {
        console.info(
          '🎵 Spotify not available, using Jamendo fallback for nature sounds'
        );
        return this.getJamendoTracks('nature,ambient,rain,forest');
      }

      // Use our Spotify service to search for nature sounds
      const searchResults = (await spotifyAPI.fetchWebApi(
        'search?q=nature%20sounds%20rain%20forest%20ambient&type=track&limit=10',
        'GET'
      )) as SpotifySearchResponse;
      if (searchResults?.tracks?.items) {
        return searchResults.tracks.items.map((track: SpotifyTrack) =>
          this.convertSpotifyTrack(track)
        );
      }

      // Fallback to Jamendo if Spotify fails
      return this.getJamendoTracks('nature,ambient,rain,forest');
    } catch (error) {
      console.error('Nature sounds error:', error);
      return this.getJamendoTracks('nature,ambient,rain,forest');
    }
  }

  // Get top tracks
  async getTopTracks(): Promise<Track[]> {
    try {
      // First check if Spotify is available
      const token = await spotifyAPI.getAccessToken();
      if (!token) {
        console.info(
          '🎵 Spotify not available, using Jamendo fallback for top tracks'
        );
        return this.getJamendoTracks('pop,rock,electronic');
      }

      // Use our Spotify service to get popular tracks (Client Credentials doesn't support user top tracks)
      const popularTracks = await spotifyAPI.getPopularTracks();
      if (popularTracks && popularTracks.length > 0) {
        return popularTracks.map((track: SpotifyTrack) =>
          this.convertSpotifyTrack(track)
        );
      }

      // Fallback to Jamendo if Spotify fails
      return this.getJamendoTracks('pop,rock,electronic');
    } catch (error) {
      console.error('Top tracks error:', error);
      return this.getJamendoTracks('pop,rock,electronic');
    }
  }

  // Get classical music for study
  async getClassicalMusic(): Promise<Track[]> {
    try {
      // First check if Spotify is available
      const token = await spotifyAPI.getAccessToken();
      if (!token) {
        console.info(
          '🎵 Spotify not available, using Jamendo fallback for classical music'
        );
        return this.getJamendoTracks('classical,piano,instrumental');
      }

      // Use our Spotify service to search for classical music
      const searchResults = (await spotifyAPI.fetchWebApi(
        'search?q=classical%20piano%20instrumental%20study&type=track&limit=12',
        'GET'
      )) as SpotifySearchResponse;
      if (searchResults?.tracks?.items) {
        return searchResults.tracks.items.map((track: SpotifyTrack) =>
          this.convertSpotifyTrack(track)
        );
      }

      // Fallback to Jamendo if Spotify fails
      return this.getJamendoTracks('classical,piano,instrumental');
    } catch (error) {
      console.error('Classical music error:', error);
      return this.getJamendoTracks('classical,piano,instrumental');
    }
  }

  // Get binaural beats for focus
  async getBinauralBeats(): Promise<Track[]> {
    try {
      // First check if Spotify is available
      const token = await spotifyAPI.getAccessToken();
      if (!token) {
        console.info(
          '🎵 Spotify not available, using Jamendo fallback for binaural beats'
        );
        return this.getJamendoTracks('ambient,meditation,focus');
      }

      // Use our Spotify service to search for binaural beats
      const searchResults = (await spotifyAPI.fetchWebApi(
        'search?q=binaural%20beats%20focus%20meditation&type=track&limit=8',
        'GET'
      )) as SpotifySearchResponse;
      if (searchResults?.tracks?.items) {
        return searchResults.tracks.items.map((track: SpotifyTrack) =>
          this.convertSpotifyTrack(track)
        );
      }

      // Fallback to Jamendo if Spotify fails
      return this.getJamendoTracks('ambient,meditation,focus');
    } catch (error) {
      console.error('Binaural beats error:', error);
      return this.getJamendoTracks('ambient,meditation,focus');
    }
  }

  // Jamendo fallback method
  private async getJamendoTracks(tags: string): Promise<Track[]> {
    try {
      const response = await fetch(
        `https://api.jamendo.com/v3.0/tracks/?client_id=${this.JAMENDO_CLIENT_ID}&format=json&tags=${tags}&limit=20&audioformat=mp31`
      );

      const data = await response.json();

      return data.results.map((track: JamendoTrack) => ({
        id: track.id,
        name: track.name,
        artist: track.artist_name,
        album: track.album_name,
        duration: track.duration,
        preview_url: track.audio,
        image: track.album_image,
        genre: 'Study Music',
      }));
    } catch (error) {
      console.error('Jamendo API error:', error);
      return this.getFallbackTracks();
    }
  }

  // Fallback tracks (local/generated content)
  private getFallbackTracks(): Track[] {
    return FALLBACK_MUSIC_DATA.study.map(track =>
      this.convertFallbackTrack(track)
    );
  }

  private getFallbackNatureSounds(): Track[] {
    return FALLBACK_MUSIC_DATA.nature.map(track =>
      this.convertFallbackTrack(track)
    );
  }

  // Fallback playlists when APIs fail
  private getFallbackPlaylists(): Playlist[] {
    return FALLBACK_MUSIC_DATA.playlists.map(playlist => ({
      id: playlist.id,
      name: playlist.name,
      description: playlist.description,
      tracks: playlist.tracks.map(track => this.convertFallbackTrack(track)),
    }));
  }

  // Get popular tracks for studying using Spotify
  async getPopularStudyTracks(): Promise<Track[]> {
    try {
      // First check if Spotify is available
      const token = await spotifyAPI.getAccessToken();
      if (!token) {
        console.info(
          '🎵 Spotify not available, using fallback tracks for popular study music'
        );
        return this.getFallbackTracks();
      }

      // Use our Spotify service to get popular tracks
      const searchResults = (await spotifyAPI.fetchWebApi(
        'search?q=study%20focus%20concentration&type=track&limit=20',
        'GET'
      )) as SpotifySearchResponse;
      if (
        searchResults?.tracks?.items &&
        searchResults.tracks.items.length > 0
      ) {
        return searchResults.tracks.items.map((track: SpotifyTrack) =>
          this.convertSpotifyTrack(track)
        );
      }

      return this.getFallbackTracks();
    } catch (error) {
      console.error('Popular tracks error:', error);
      return this.getFallbackTracks();
    }
  }

  // Combined method to get all study music
  async getAllStudyMusic(): Promise<{
    ambient: Track[];
    lofi: Track[];
    nature: Track[];
    popular: Track[];
    playlists: Playlist[];
  }> {
    try {
      const [ambient, lofi, nature, popular, playlists] =
        await Promise.allSettled([
          this.getAmbientTracks(),
          this.getLoFiTracks(),
          this.getNatureSounds(),
          this.getPopularStudyTracks(),
          this.getFocusPlaylists(),
        ]);

      return {
        ambient:
          ambient.status === 'fulfilled'
            ? ambient.value
            : this.getFallbackTracks(),
        lofi:
          lofi.status === 'fulfilled' ? lofi.value : this.getFallbackTracks(),
        nature:
          nature.status === 'fulfilled'
            ? nature.value
            : await this.getNatureSounds(),
        popular:
          popular.status === 'fulfilled'
            ? popular.value
            : this.getFallbackTracks(),
        playlists: playlists.status === 'fulfilled' ? playlists.value : [],
      };
    } catch (error) {
      console.error('Get all study music error:', error);
      // Return fallback data if everything fails
      return {
        ambient: this.getFallbackTracks(),
        lofi: this.getFallbackTracks(),
        nature: await this.getNatureSounds(),
        popular: this.getFallbackTracks(),
        playlists: [],
      };
    }
  }
}

export const musicAPI = new MusicAPIService();
