import { Music, Pause, Play, RotateCcw, Upload, Volume2, VolumeX, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { CustomAudioFile } from '../types';

interface CustomMusicPlayerProps {
  className?: string;
}

const CustomMusicPlayer: React.FC<CustomMusicPlayerProps> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<CustomAudioFile | null>(null);
  const [uploadedTracks, setUploadedTracks] = useState<CustomAudioFile[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.loop = true;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.type.startsWith('audio/')) {
        const audioFile: CustomAudioFile = {
          name: file.name,
          url: URL.createObjectURL(file),
          file: file
        };
        setUploadedTracks(prev => [...prev, audioFile]);

        if (!currentTrack) {
          setCurrentTrack(audioFile);
        }
      }
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

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

  const selectTrack = (track: CustomAudioFile) => {
    if (isPlaying) {
      setIsPlaying(false);
    }
    setCurrentTrack(track);
    setCurrentTime(0);
  };

  const removeTrack = (trackToRemove: CustomAudioFile) => {
    setUploadedTracks(prev => prev.filter(track => track !== trackToRemove));

    if (currentTrack === trackToRemove) {
      setCurrentTrack(uploadedTracks.length > 1 ? uploadedTracks.find(t => t !== trackToRemove) || null : null);
      setIsPlaying(false);
    }

    URL.revokeObjectURL(trackToRemove.url);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const restartTrack = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    setCurrentTime(0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`bg-white/10 backdrop-blur-md rounded-3xl p-4 sm:p-6 border border-white/20 shadow-2xl ${className}`}>
      <div className="flex items-center justify-center mb-4 sm:mb-6">
        <div className="p-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl mr-3">
          <Music className="text-white" size={20} />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-white">Focus Music</h3>
      </div>


      <div className="mb-4 sm:mb-6">
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          multiple
          onChange={handleFileUpload}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full flex items-center justify-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-2xl text-white font-medium transition-all duration-200 shadow-lg touch-manipulation"
        >
          <Upload size={18} />
          <span className="text-sm sm:text-base">Upload Your Study Music</span>
        </button>
      </div>


      {currentTrack && (
        <div className="mb-4 sm:mb-6">
          <audio ref={audioRef} src={currentTrack.url} />

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-3 sm:p-5 border border-white/10">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h4 className="text-white font-semibold truncate flex-1 mr-2 sm:mr-4 text-sm sm:text-base">{currentTrack.name}</h4>
              <div className="flex items-center space-x-1 bg-teal-500/20 px-2 sm:px-3 py-1 rounded-full">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-teal-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-teal-300 font-medium">LOOP</span>
              </div>
            </div>


            <div className="mb-3 sm:mb-4">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 sm:h-2 bg-white/20 rounded-lg appearance-none slider touch-manipulation"
                style={{
                  background: `linear-gradient(to right, #14b8a6 0%, #14b8a6 ${(currentTime / duration) * 100}%, rgba(255,255,255,0.2) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.2) 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-white/60 mt-1 sm:mt-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>


            <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-0">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <button
                  onClick={restartTrack}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 touch-manipulation"
                  aria-label="Restart track"
                >
                  <RotateCcw size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>

                <button
                  onClick={togglePlayPause}
                  className="p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white transition-all duration-200 shadow-lg touch-manipulation"
                  aria-label={isPlaying ? 'Pause music' : 'Play music'}
                >
                  {isPlaying ? <Pause size={20} className="sm:w-6 sm:h-6" /> : <Play size={20} className="sm:w-6 sm:h-6" />}
                </button>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-3">
                <button
                  onClick={toggleMute}
                  className="p-2 text-white/80 hover:text-white transition-colors duration-200 touch-manipulation"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={18} className="sm:w-5 sm:h-5" /> : <Volume2 size={18} className="sm:w-5 sm:h-5" />}
                </button>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-16 sm:w-24 h-1.5 sm:h-2 bg-white/20 rounded-lg appearance-none slider touch-manipulation"
                  style={{
                    background: `linear-gradient(to right, #14b8a6 0%, #14b8a6 ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%, rgba(255,255,255,0.2) 100%)`
                  }}
                />
                <span className="text-xs text-white/60 font-medium w-6 sm:w-8">{Math.round(volume * 100)}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {uploadedTracks.length > 0 && (
        <div>
          <h4 className="text-white font-semibold mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full mr-2"></div>
            Your Music Library
          </h4>
          <div className="space-y-2 max-h-32 sm:max-h-40 overflow-y-auto custom-scrollbar">
            {uploadedTracks.map((track, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 sm:p-4 rounded-2xl transition-all duration-200 ${
                  currentTrack === track
                    ? 'bg-gradient-to-r from-teal-500/30 to-cyan-500/30 border border-teal-500/50 shadow-lg'
                    : 'bg-white/5 hover:bg-white/10 border border-white/10'
                }`}
              >
                <button
                  onClick={() => selectTrack(track)}
                  className="flex-1 text-left text-white/90 hover:text-white truncate font-medium text-sm sm:text-base touch-manipulation"
                >
                  {track.name}
                </button>
                <button
                  onClick={() => removeTrack(track)}
                  className="ml-2 sm:ml-3 p-2 text-white/60 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-200 touch-manipulation"
                  aria-label="Remove track"
                >
                  <X size={14} className="sm:w-4 sm:h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {uploadedTracks.length === 0 && (
        <div className="text-center py-6 sm:py-8">
          <div className="p-4 sm:p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
            <Music className="mx-auto mb-3 sm:mb-4 text-white/40" size={40} />
            <h4 className="text-white/70 font-semibold mb-2 text-sm sm:text-base">No Music Uploaded</h4>
            <p className="text-white/50 text-xs sm:text-sm leading-relaxed">
              Upload your favorite study music to create the perfect focus environment.
              All tracks will play in infinite loop to maintain your concentration.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomMusicPlayer;
