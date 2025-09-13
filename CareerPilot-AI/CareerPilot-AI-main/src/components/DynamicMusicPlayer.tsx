'use client';

import { musicAPI, Playlist, Track } from '@/lib/musicAPI';
import { Music, Pause, Play, RotateCcw, Shuffle, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface DynamicMusicPlayerProps {
  className?: string;
}

const DynamicMusicPlayer: React.FC<DynamicMusicPlayerProps> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [activeGenre, setActiveGenre] = useState<'ambient' | 'lofi' | 'nature'>('ambient');

  // Dynamic music data
  const [ambientTracks, setAmbientTracks] = useState<Track[]>([]);
  const [lofiTracks, setLofiTracks] = useState<Track[]>([]);
  const [natureTracks, setNatureTracks] = useState<Track[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [currentPlaylist, setCurrentPlaylist] = useState<Track[]>([]);

  const audioRef = useRef<HTMLAudioElement>(null);

  // Load music data on component mount
  useEffect(() => {
    loadMusicData();
  }, []);

  const loadMusicData = async () => {
    setIsLoading(true);
    try {
      const musicData = await musicAPI.getAllStudyMusic();
      setAmbientTracks(musicData.ambient);
      setLofiTracks(musicData.lofi);
      setNatureTracks(musicData.nature);
      setPlaylists(musicData.playlists);

      // Set initial playlist and track
      if (musicData.ambient.length > 0) {
        setCurrentPlaylist(musicData.ambient);
        setCurrentTrack(musicData.ambient[0]);
      }
    } catch (error) {
      console.error('Failed to load music data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const playNextTrack = () => {
    if (currentPlaylist.length === 0) return;

    const currentIndex = currentPlaylist.findIndex(track => track.id === currentTrack?.id);
    const nextIndex = (currentIndex + 1) % currentPlaylist.length;
    setCurrentTrack(currentPlaylist[nextIndex]);
  };

  const playPreviousTrack = () => {
    if (currentPlaylist.length === 0) return;

    const currentIndex = currentPlaylist.findIndex(track => track.id === currentTrack?.id);
    const prevIndex = currentIndex === 0 ? currentPlaylist.length - 1 : currentIndex - 1;
    setCurrentTrack(currentPlaylist[prevIndex]);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      // Auto-play next track
      playNextTrack();
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack, playNextTrack]);

  const switchGenre = (genre: 'ambient' | 'lofi' | 'nature') => {
    setActiveGenre(genre);
    let newPlaylist: Track[] = [];

    switch (genre) {
      case 'ambient':
        newPlaylist = ambientTracks;
        break;
      case 'lofi':
        newPlaylist = lofiTracks;
        break;
      case 'nature':
        newPlaylist = natureTracks;
        break;
    }

    setCurrentPlaylist(newPlaylist);
    if (newPlaylist.length > 0) {
      setCurrentTrack(newPlaylist[0]);
      setIsPlaying(false);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-center mb-6">
        <div className="p-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl mr-3">
          <Music className="text-white" size={20} />
        </div>
        <h3 className="text-xl font-bold text-white">Dynamic Focus Music</h3>
      </div>

      {/* Genre Selection */}
      <div className="flex gap-2 mb-6">
        {[
          { key: 'ambient', label: 'Ambient', icon: '🌌' },
          { key: 'lofi', label: 'Lo-Fi', icon: '🎵' },
          { key: 'nature', label: 'Nature', icon: '🌿' }
        ].map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => switchGenre(key as 'ambient' | 'lofi' | 'nature')}
            className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all ${
              activeGenre === key
                ? 'bg-white/20 text-white border-2 border-white/30'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            <span className="mr-1">{icon}</span>
            {label}
          </button>
        ))}
      </div>

      {/* Current Track Info */}
      {currentTrack && (
        <div className="mb-6 text-center">
          {currentTrack.image && (
            <img
              src={currentTrack.image}
              alt={currentTrack.name}
              className="w-20 h-20 rounded-lg mx-auto mb-3 object-cover"
            />
          )}
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
          onLoadStart={() => setIsLoading(true)}
          onCanPlay={() => setIsLoading(false)}
        />
      )}

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          onClick={playPreviousTrack}
          className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          disabled={currentPlaylist.length === 0}
        >
          <SkipBack className="text-white" size={20} />
        </button>

        <button
          onClick={restartTrack}
          className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
        >
          <RotateCcw className="text-white" size={20} />
        </button>

        <button
          onClick={togglePlayPause}
          disabled={!currentTrack || isLoading}
          className="p-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full hover:from-pink-600 hover:to-rose-600 transition-all transform hover:scale-105 disabled:opacity-50"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : isPlaying ? (
            <Pause className="text-white" size={24} />
          ) : (
            <Play className="text-white ml-1" size={24} />
          )}
        </button>

        <button
          onClick={playNextTrack}
          className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          disabled={currentPlaylist.length === 0}
        >
          <SkipForward className="text-white" size={20} />
        </button>

        <button
          className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          title="Shuffle playlist"
        >
          <Shuffle className="text-white" size={20} />
        </button>
      </div>

      {/* Progress Bar */}
      {currentTrack && (
        <div className="mb-4">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider-thumb"
          />
          <div className="flex justify-between text-white/70 text-xs mt-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      )}

      {/* Volume Control */}
      <div className="flex items-center gap-3 mb-4">
        <button onClick={toggleMute} className="text-white/70 hover:text-white transition-colors">
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider-thumb"
        />
        <span className="text-white/70 text-sm">{Math.round((isMuted ? 0 : volume) * 100)}%</span>
      </div>

      {/* Track List */}
      <div className="max-h-40 overflow-y-auto">
        <h5 className="text-white/80 text-sm font-medium mb-2">
          {activeGenre.charAt(0).toUpperCase() + activeGenre.slice(1)} Playlist ({currentPlaylist.length})
        </h5>
        <div className="space-y-1">
          {currentPlaylist.slice(0, 5).map((track) => (
            <div
              key={track.id}
              onClick={() => setCurrentTrack(track)}
              className={`p-2 rounded-lg cursor-pointer transition-colors ${
                currentTrack?.id === track.id
                  ? 'bg-white/20 text-white'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              <div className="text-sm font-medium truncate">{track.name}</div>
              <div className="text-xs text-white/50 truncate">{track.artist}</div>
            </div>
          ))}
          {currentPlaylist.length > 5 && (
            <div className="text-center text-white/50 text-xs py-2">
              +{currentPlaylist.length - 5} more tracks
            </div>
          )}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && currentPlaylist.length === 0 && (
        <div className="text-center text-white/70 py-8">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p>Loading music...</p>
        </div>
      )}

      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ec4899, #f43f5e);
          cursor: pointer;
        }

        .slider-thumb::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ec4899, #f43f5e);
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default DynamicMusicPlayer;
