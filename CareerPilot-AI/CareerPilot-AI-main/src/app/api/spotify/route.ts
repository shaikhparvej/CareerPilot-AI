import { NextRequest, NextResponse } from 'next/server';

// Simple Music API - No external dependencies required
const SIMPLE_MUSIC_LIBRARY = {
  ambient: [
    { id: '1', name: 'Forest Rain', artist: 'Nature Sounds', duration: 180, type: 'ambient' },
    { id: '2', name: 'Ocean Waves', artist: 'Nature Sounds', duration: 240, type: 'ambient' },
    { id: '3', name: 'Mountain Breeze', artist: 'Nature Sounds', duration: 200, type: 'ambient' },
    { id: '4', name: 'Peaceful Stream', artist: 'Nature Sounds', duration: 220, type: 'ambient' }
  ],
  focus: [
    { id: '5', name: 'Deep Focus', artist: 'Productivity Music', duration: 300, type: 'focus' },
    { id: '6', name: 'Code Flow', artist: 'Tech Beats', duration: 280, type: 'focus' },
    { id: '7', name: 'Study Mode', artist: 'Brain Waves', duration: 350, type: 'focus' },
    { id: '8', name: 'Concentration', artist: 'Mind Music', duration: 270, type: 'focus' }
  ],
  relaxing: [
    { id: '9', name: 'Sunset Vibes', artist: 'Chill Music', duration: 210, type: 'relaxing' },
    { id: '10', name: 'Meditation Flow', artist: 'Zen Sounds', duration: 320, type: 'relaxing' },
    { id: '11', name: 'Peaceful Mind', artist: 'Calm Collective', duration: 260, type: 'relaxing' },
    { id: '12', name: 'Gentle Breeze', artist: 'Serenity Music', duration: 190, type: 'relaxing' }
  ]
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action') || 'test';
  const category = searchParams.get('category') || 'all';

  try {
    switch (action) {
      case 'test':
        console.log('🎵 Running Simple Music API test...');
        return NextResponse.json({
          success: true,
          message: 'Simple Music API test completed successfully!',
          timestamp: new Date().toISOString(),
          totalTracks: Object.values(SIMPLE_MUSIC_LIBRARY).flat().length
        });

      case 'tracks':
        const tracks = category === 'all' 
          ? Object.values(SIMPLE_MUSIC_LIBRARY).flat()
          : SIMPLE_MUSIC_LIBRARY[category as keyof typeof SIMPLE_MUSIC_LIBRARY] || [];

        return NextResponse.json({
          success: true,
          tracks: tracks.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artist,
            duration: track.duration,
            type: track.type,
            preview_url: `data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEagjJ95t6rQAIZAAPiuNSeQELOl/MQ` // Mock audio data
          })),
          count: tracks.length,
          category: category
        });

      case 'popular':
        // Get most popular tracks from each category
        const popularTracks = [
          SIMPLE_MUSIC_LIBRARY.ambient[0],
          SIMPLE_MUSIC_LIBRARY.focus[0], 
          SIMPLE_MUSIC_LIBRARY.relaxing[0]
        ];

        return NextResponse.json({
          success: true,
          tracks: popularTracks.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artist,
            duration: track.duration,
            type: track.type,
            preview_url: `data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEagjJ95t6rQAIZAAPiuNSeQELOl/MQ`
          })),
          count: popularTracks.length
        });

      case 'playlists':
        const playlists = await spotifyAPI.getFocusPlaylists();

        return NextResponse.json({
          success: true,
          playlists: playlists.map(playlist => ({
            id: playlist.id,
            name: playlist.name,
            description: playlist.description,
            image: playlist.images[0]?.url,
          })),
          count: playlists.length,
        });

      case 'ambient':
        // Get ambient tracks
        return NextResponse.json({
          success: true,
          tracks: SIMPLE_MUSIC_LIBRARY.ambient.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artist,
            duration: track.duration,
            type: track.type,
            preview_url: `data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEagjJ95t6rQAIZAAPiuNSeQELOl/MQ`
          })),
          count: SIMPLE_MUSIC_LIBRARY.ambient.length
        });

      case 'search':
        const query = searchParams.get('q') || '';
        const allTracks = Object.values(SIMPLE_MUSIC_LIBRARY).flat();
        const searchResults = allTracks.filter(track => 
          track.name.toLowerCase().includes(query.toLowerCase()) ||
          track.artist.toLowerCase().includes(query.toLowerCase())
        );

        return NextResponse.json({
          success: true,
          tracks: searchResults.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artist,
            duration: track.duration,
            type: track.type,
            preview_url: `data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEagjJ95t6rQAIZAAPiuNSeQELOl/MQ`
          })),
          count: searchResults.length,
          query: query
        });

      default:
        return NextResponse.json({
          success: false,
          message: 'Invalid action. Available actions: test, tracks, popular, playlists, ambient, search',
          availableActions: ['test', 'tracks', 'popular', 'playlists', 'ambient', 'search']
        }, { status: 400 });
    }
  } catch (error) {
    console.error('Simple Music API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to process music request',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { category = 'all', limit = 20 } = body;

    const tracks = category === 'all' 
      ? Object.values(SIMPLE_MUSIC_LIBRARY).flat()
      : SIMPLE_MUSIC_LIBRARY[category as keyof typeof SIMPLE_MUSIC_LIBRARY] || [];

    const limitedTracks = tracks.slice(0, limit);

    return NextResponse.json({
      success: true,
      category,
      tracks: limitedTracks.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artist,
        duration: track.duration,
        type: track.type,
        preview_url: `data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEagjJ95t6rQAIZAAPiuNSeQELOl/MQ`
      })),
      count: limitedTracks.length
    });
  } catch (error) {
    console.error('Simple Music API POST error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch tracks',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
