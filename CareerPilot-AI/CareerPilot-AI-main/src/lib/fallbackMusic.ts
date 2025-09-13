// Fallback music data for when all APIs are unavailable
// This provides a local music database to ensure the app always works

export interface FallbackTrack {
  id: string;
  name: string;
  artist: string;
  album?: string;
  duration: number;
  genre: string;
  description?: string;
}

export interface FallbackPlaylist {
  id: string;
  name: string;
  description: string;
  tracks: FallbackTrack[];
}

// Study Music Tracks
export const STUDY_TRACKS: FallbackTrack[] = [
  {
    id: 'study-1',
    name: 'Deep Focus Flow',
    artist: 'CareerPilot Studio',
    duration: 300,
    genre: 'Focus',
    description: 'Ambient sounds for deep concentration',
  },
  {
    id: 'study-2',
    name: 'Productivity Boost',
    artist: 'Study Sounds',
    duration: 420,
    genre: 'Productivity',
    description: 'Energizing background music for work',
  },
  {
    id: 'study-3',
    name: 'Calm Mind',
    artist: 'Peaceful Audio',
    duration: 360,
    genre: 'Relaxation',
    description: 'Gentle sounds for stress relief',
  },
  {
    id: 'study-4',
    name: 'Code Flow',
    artist: 'Developer Beats',
    duration: 480,
    genre: 'Programming',
    description: 'Perfect rhythm for coding sessions',
  },
  {
    id: 'study-5',
    name: 'Learning Zone',
    artist: 'Education Audio',
    duration: 390,
    genre: 'Study',
    description: 'Optimal frequency for learning',
  },
];

// Ambient Tracks
export const AMBIENT_TRACKS: FallbackTrack[] = [
  {
    id: 'ambient-1',
    name: 'Ethereal Waves',
    artist: 'Ambient Collective',
    duration: 600,
    genre: 'Ambient',
    description: 'Floating soundscapes for deep thought',
  },
  {
    id: 'ambient-2',
    name: 'Digital Dreams',
    artist: 'Synth Masters',
    duration: 540,
    genre: 'Electronic',
    description: 'Synthetic atmospheres for creativity',
  },
  {
    id: 'ambient-3',
    name: 'Space Journey',
    artist: 'Cosmic Audio',
    duration: 720,
    genre: 'Space',
    description: 'Journey through the cosmos',
  },
];

// Lo-Fi Tracks
export const LOFI_TRACKS: FallbackTrack[] = [
  {
    id: 'lofi-1',
    name: 'Midnight Study',
    artist: 'Lo-Fi Cafe',
    duration: 240,
    genre: 'Lo-Fi Hip Hop',
    description: 'Chill beats for late night sessions',
  },
  {
    id: 'lofi-2',
    name: 'Coffee Shop Vibes',
    artist: 'Urban Sounds',
    duration: 300,
    genre: 'Chill',
    description: 'Relaxed atmosphere with vinyl crackle',
  },
  {
    id: 'lofi-3',
    name: 'Rainy Day Focus',
    artist: 'Weather Beats',
    duration: 360,
    genre: 'Atmospheric',
    description: 'Gentle rain with soft melodies',
  },
];

// Nature Sounds
export const NATURE_TRACKS: FallbackTrack[] = [
  {
    id: 'nature-1',
    name: 'Forest Whispers',
    artist: 'Nature Recordings',
    duration: 900,
    genre: 'Nature',
    description: 'Deep forest ambience with birds',
  },
  {
    id: 'nature-2',
    name: 'Ocean Meditation',
    artist: 'Seaside Audio',
    duration: 800,
    genre: 'Water',
    description: 'Calming ocean waves and breeze',
  },
  {
    id: 'nature-3',
    name: 'Mountain Stream',
    artist: 'Alpine Sounds',
    duration: 700,
    genre: 'Water',
    description: 'Gentle babbling brook in the mountains',
  },
  {
    id: 'nature-4',
    name: 'Thunderstorm Relief',
    artist: 'Weather Audio',
    duration: 600,
    genre: 'Storm',
    description: 'Distant thunder with steady rain',
  },
];

// Classical Focus Music
export const CLASSICAL_TRACKS: FallbackTrack[] = [
  {
    id: 'classical-1',
    name: 'Piano Meditation',
    artist: 'Classical Focus',
    duration: 420,
    genre: 'Classical',
    description: 'Gentle piano for concentration',
  },
  {
    id: 'classical-2',
    name: 'String Harmony',
    artist: 'Chamber Ensemble',
    duration: 360,
    genre: 'Chamber Music',
    description: 'Peaceful string arrangements',
  },
  {
    id: 'classical-3',
    name: 'Minimalist Study',
    artist: 'Modern Classical',
    duration: 480,
    genre: 'Contemporary',
    description: 'Modern classical for focus',
  },
];

// Study Playlists
export const STUDY_PLAYLISTS: FallbackPlaylist[] = [
  {
    id: 'playlist-1',
    name: 'Deep Focus Session',
    description: 'Ultimate concentration playlist for serious study',
    tracks: [...STUDY_TRACKS.slice(0, 3), ...AMBIENT_TRACKS.slice(0, 2)],
  },
  {
    id: 'playlist-2',
    name: 'Chill Study Vibes',
    description: 'Relaxed lo-fi beats for casual learning',
    tracks: [...LOFI_TRACKS, ...STUDY_TRACKS.slice(3)],
  },
  {
    id: 'playlist-3',
    name: 'Nature Focus',
    description: 'Natural sounds for organic concentration',
    tracks: NATURE_TRACKS,
  },
  {
    id: 'playlist-4',
    name: 'Classical Study',
    description: 'Timeless classical music for refined focus',
    tracks: CLASSICAL_TRACKS,
  },
  {
    id: 'playlist-5',
    name: 'Coding Flow',
    description: 'Perfect background music for programming',
    tracks: [STUDY_TRACKS[3], ...AMBIENT_TRACKS, LOFI_TRACKS[0]],
  },
];

// Comprehensive fallback music data
export const FALLBACK_MUSIC_DATA = {
  study: STUDY_TRACKS,
  ambient: AMBIENT_TRACKS,
  lofi: LOFI_TRACKS,
  nature: NATURE_TRACKS,
  classical: CLASSICAL_TRACKS,
  playlists: STUDY_PLAYLISTS,
  popular: STUDY_TRACKS, // Use study tracks as popular fallback
};

// Helper function to get random tracks from a category
export const getRandomTracks = (
  category: FallbackTrack[],
  count: number = 5
): FallbackTrack[] => {
  const shuffled = [...category].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Helper function to search tracks by keyword
export const searchTracks = (query: string): FallbackTrack[] => {
  const allTracks = [
    ...STUDY_TRACKS,
    ...AMBIENT_TRACKS,
    ...LOFI_TRACKS,
    ...NATURE_TRACKS,
    ...CLASSICAL_TRACKS,
  ];

  const searchTerm = query.toLowerCase();
  return allTracks.filter(
    track =>
      track.name.toLowerCase().includes(searchTerm) ||
      track.artist.toLowerCase().includes(searchTerm) ||
      track.genre.toLowerCase().includes(searchTerm) ||
      (track.description &&
        track.description.toLowerCase().includes(searchTerm))
  );
};

// Helper function to get tracks by genre
export const getTracksByGenre = (genre: string): FallbackTrack[] => {
  const allTracks = [
    ...STUDY_TRACKS,
    ...AMBIENT_TRACKS,
    ...LOFI_TRACKS,
    ...NATURE_TRACKS,
    ...CLASSICAL_TRACKS,
  ];

  return allTracks.filter(track =>
    track.genre.toLowerCase().includes(genre.toLowerCase())
  );
};

export default FALLBACK_MUSIC_DATA;
