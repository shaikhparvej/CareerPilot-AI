'use client';

import { musicAPI, Track } from '@/lib/musicAPI';
import { Music, Pause, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const DynamicMusicPlayerSimple: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeGenre, setActiveGenre] = useState<'ambient' | 'lofi' | 'nature'>('ambient');

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    loadMusic();
  }, []);

  const loadMusic = async () => {
    setIsLoading(true);
    try {
      const musicData = await musicAPI.getAllStudyMusic();
      setTracks(musicData.ambient);
      if (musicData.ambient.length > 0) {
        setCurrentTrack(musicData.ambient[0]);
      }
    } catch (error) {
      console.error('Failed to load music:', error);
      // Fallback to local tracks
      setTracks([
        { id: '1', name: 'Ambient Flow', artist: 'Study Music', duration: 180, genre: 'Ambient' },
        { id: '2', name: 'Focus Waves', artist: 'Concentration', duration: 240, genre: 'Ambient' }
      ]);
      setCurrentTrack(tracks[0]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlayPause = () => {
    if (!currentTrack || !audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const switchGenre = async (genre: 'ambient' | 'lofi' | 'nature') => {
    setActiveGenre(genre);
    setIsLoading(true);

    try {
      const musicData = await musicAPI.getAllStudyMusic();
      let newTracks: Track[] = [];

      switch (genre) {
        case 'ambient':
          newTracks = musicData.ambient;
          break;
        case 'lofi':
          newTracks = musicData.lofi;
          break;
        case 'nature':
          newTracks = musicData.nature;
          break;
      }

      setTracks(newTracks);
      if (newTracks.length > 0) {
        setCurrentTrack(newTracks[0]);
      }
    } catch (error) {
      console.error('Failed to switch genre:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl">
      <div className="flex items-center justify-center mb-6">
        <div className="p-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl mr-3">
          <Music className="text-white" size={20} />
        </div>
        <h3 className="text-xl font-bold text-white">Dynamic Focus Music</h3>
      </div>

      {/* Genre Selection */}
      <div className="flex gap-2 mb-6">
        {[
          { key: 'ambient' as const, label: 'Ambient', icon: '🌌' },
          { key: 'lofi' as const, label: 'Lo-Fi', icon: '🎵' },
          { key: 'nature' as const, label: 'Nature', icon: '🌿' }
        ].map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => switchGenre(key)}
            className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all ${
              activeGenre === key
                ? 'bg-white/20 text-white border-2 border-white/30'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
            aria-label={`Switch to ${label} music`}
          >
            <span className="mr-1" role="img" aria-label={label}>{icon}</span>
            {label}
          </button>
        ))}
      </div>

      {/* Current Track */}
      {currentTrack && (
        <div className="mb-6 text-center">
          <h4 className="text-white font-semibold text-lg">{currentTrack.name}</h4>
          <p className="text-white/70 text-sm">{currentTrack.artist}</p>
          <p className="text-white/50 text-xs">{currentTrack.genre}</p>
        </div>
      )}

      {/* Audio Element */}
      {currentTrack?.preview_url && (
        <audio
          ref={audioRef}
          src={currentTrack.preview_url}
          loop
        />
      )}

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          onClick={() => {
            if (audioRef.current) {
              audioRef.current.currentTime = 0;
            }
          }}
          className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Restart track"
        >
          <RotateCcw className="text-white" size={20} />
        </button>

        <button
          onClick={togglePlayPause}
          disabled={!currentTrack || isLoading}
          className="p-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full hover:from-pink-600 hover:to-rose-600 transition-all transform hover:scale-105 disabled:opacity-50"
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : isPlaying ? (
            <Pause className="text-white" size={24} />
          ) : (
            <Play className="text-white ml-1" size={24} />
          )}
        </button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={toggleMute}
          className="text-white/70 hover:text-white transition-colors"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="flex-1 h-2 bg-white/20 rounded-lg"
          aria-label="Volume control"
        />
        <span className="text-white/70 text-sm">{Math.round((isMuted ? 0 : volume) * 100)}%</span>
      </div>

      {/* Track Status */}
      <div className="text-center">
        <p className="text-white/60 text-sm">
          {isLoading ? 'Loading music...' : `${tracks.length} tracks available`}
        </p>
      </div>
    </div>
  );
};

export default DynamicMusicPlayerSimple;
