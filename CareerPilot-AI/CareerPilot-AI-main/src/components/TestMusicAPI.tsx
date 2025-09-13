'use client';

import { musicAPI, Playlist, Track } from '@/lib/musicAPI';
import Image from 'next/image';
import { useState } from 'react';

export default function TestMusicAPI() {
  const [ambient, setAmbient] = useState<Track[]>([]);
  const [lofi, setLofi] = useState<Track[]>([]);
  const [nature, setNature] = useState<Track[]>([]);
  const [popular, setPopular] = useState<Track[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>('Ready to test music API...');

  const testAllMusic = async () => {
    setLoading(true);
    setStatus('🎵 Fetching music from Simple Music API...');

    try {
      const musicData = await musicAPI.getAllStudyMusic();

      setAmbient(musicData.ambient);
      setLofi(musicData.lofi);
      setNature(musicData.nature);
      setPopular(musicData.popular);
      setPlaylists(musicData.playlists);

      setStatus(`✅ Successfully loaded ${musicData.ambient.length + musicData.lofi.length + musicData.nature.length + musicData.popular.length} tracks and ${musicData.playlists.length} playlists!`);
    } catch (error) {
      console.error('Music API test error:', error);
      setStatus('❌ Failed to load music data. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const testSimpleMusicConnection = async () => {
    setLoading(true);
    setStatus('🔗 Testing Simple Music connection...');

    try {
      const response = await fetch('/api/spotify?action=ambient');
      const data = await response.json();
      setAmbient(data.tracks || []);
      setStatus(`✅ Simple Music connection test complete! Loaded ${data.tracks?.length || 0} ambient tracks.`);
    } catch (error) {
      console.error('Simple Music test error:', error);
      setStatus('❌ Simple Music connection test failed. Using fallback data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🎵 Music API Integration Test</h2>

      {/* Status and Controls */}
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6">
        <p className="text-sm mb-4">{status}</p>
        <div className="space-x-4">
          <button
            onClick={testSimpleMusicConnection}
            disabled={loading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? '⏳ Testing...' : '🎧 Test Simple Music'}
          </button>
          <button
            onClick={testAllMusic}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? '⏳ Loading...' : '🎵 Load All Music'}
          </button>
        </div>
      </div>

      {/* Results Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ambient Tracks */}
        {ambient.length > 0 && (
          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-3">🌊 Ambient Tracks ({ambient.length})</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {ambient.slice(0, 5).map((track) => (
                <div key={track.id} className="p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                  <div className="font-medium">{track.name}</div>
                  <div className="text-gray-600 dark:text-gray-400">{track.artist}</div>
                  {track.preview_url && (
                    <audio controls className="w-full mt-1 h-6">
                      <source src={track.preview_url} type="audio/mpeg" />
                    </audio>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lo-Fi Tracks */}
        {lofi.length > 0 && (
          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-3">🎧 Lo-Fi Tracks ({lofi.length})</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {lofi.slice(0, 5).map((track) => (
                <div key={track.id} className="p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                  <div className="font-medium">{track.name}</div>
                  <div className="text-gray-600 dark:text-gray-400">{track.artist}</div>
                  {track.preview_url && (
                    <audio controls className="w-full mt-1 h-6">
                      <source src={track.preview_url} type="audio/mpeg" />
                    </audio>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nature Sounds */}
        {nature.length > 0 && (
          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-3">🌿 Nature Sounds ({nature.length})</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {nature.slice(0, 5).map((track) => (
                <div key={track.id} className="p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                  <div className="font-medium">{track.name}</div>
                  <div className="text-gray-600 dark:text-gray-400">{track.artist}</div>
                  {track.preview_url && (
                    <audio controls className="w-full mt-1 h-6">
                      <source src={track.preview_url} type="audio/mpeg" />
                    </audio>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Popular Study Tracks */}
        {popular.length > 0 && (
          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-3">🔥 Popular Study ({popular.length})</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {popular.slice(0, 5).map((track) => (
                <div key={track.id} className="p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                  <div className="font-medium">{track.name}</div>
                  <div className="text-gray-600 dark:text-gray-400">{track.artist}</div>
                  {track.preview_url && (
                    <audio controls className="w-full mt-1 h-6">
                      <source src={track.preview_url} type="audio/mpeg" />
                    </audio>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Playlists */}
      {playlists.length > 0 && (
        <div className="mt-6 bg-white dark:bg-gray-900 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">📋 Study Playlists ({playlists.length})</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {playlists.slice(0, 6).map((playlist) => (
              <div key={playlist.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                <div className="font-medium text-sm">{playlist.name}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {playlist.description}
                </div>
                {playlist.image && (
                  <Image
                    src={playlist.image}
                    alt={playlist.name}
                    width={200}
                    height={80}
                    className="w-full h-20 object-cover rounded mt-2"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Integration Info */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">🔧 Integration Status</h4>
        <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
          <li>✅ Spotify Web API integration with Client Credentials flow</li>
          <li>✅ Jamendo API fallback for royalty-free music</li>
          <li>✅ Dynamic track fetching with proper error handling</li>
          <li>✅ TypeScript interfaces for type safety</li>
          <li>⚙️ Configure SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env.local</li>
        </ul>
      </div>
    </div>
  );
}
