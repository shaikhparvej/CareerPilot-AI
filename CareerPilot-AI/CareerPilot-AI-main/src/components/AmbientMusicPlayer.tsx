import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface AmbientMusicPlayerProps {
  className?: string;
}

const AmbientMusicPlayer: React.FC<AmbientMusicPlayerProps> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.loop = true;
    }
  }, [volume, isMuted]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  const createAmbientSound = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const AudioContextClass = window.AudioContext || ((window as any).webkitAudioContext as typeof AudioContext);

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContextClass();
      }

      const audioContext = audioContextRef.current;

      // Resume context if suspended
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      const playAmbientNote = () => {
        if (!isPlaying || !audioContext || audioContext.state === 'closed') return;

        const frequencies = [261.63, 329.63, 392.00, 523.25]; // C, E, G, C (major chord)
        const randomFreq = frequencies[Math.floor(Math.random() * frequencies.length)];

        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(randomFreq, audioContext.currentTime);
        oscillator.type = 'sine';

        // Set volume envelope
        const actualVolume = isMuted ? 0 : volume * 0.1;
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(actualVolume, audioContext.currentTime + 0.5);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 3);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 3);
      };

      // Play first note
      playAmbientNote();

      // Set up interval for subsequent notes
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        if (isPlaying) {
          playAmbientNote();
        }
      }, Math.random() * 3000 + 2000);

    } catch (error) {
      console.error('Web Audio API error:', error);
    }
  };

  const stopAmbientSound = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const togglePlayPause = async () => {
    const newPlayingState = !isPlaying;
    setIsPlaying(newPlayingState);

    if (newPlayingState) {
      await createAmbientSound();
    } else {
      stopAmbientSound();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className={`flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-full px-4 py-3 sm:px-6 ${className}`}>
      <audio ref={audioRef} />

      <div className="flex items-center space-x-3 sm:space-x-0">
        <button
          onClick={togglePlayPause}
          className="p-2 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white transition-colors duration-200 touch-manipulation"
          aria-label={isPlaying ? 'Pause ambient music' : 'Play ambient music'}
        >
          {isPlaying ? <Pause size={18} className="sm:w-5 sm:h-5" /> : <Play size={18} className="sm:w-5 sm:h-5" />}
        </button>

        <span className="text-xs sm:text-sm text-white/60 ml-2 sm:hidden">Ambient Piano</span>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-2">
        <button
          onClick={toggleMute}
          className="p-1 text-white/80 hover:text-white transition-colors duration-200 touch-manipulation"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Volume2 size={16} className="sm:w-[18px] sm:h-[18px]" />}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="w-16 sm:w-20 h-1.5 sm:h-2 bg-white/20 rounded-lg appearance-none slider touch-manipulation"
          aria-label="Volume control"
          title="Adjust volume"
        />
      </div>

      <span className="text-xs text-white/60 hidden sm:inline">Ambient Piano</span>
    </div>
  );
};

export default AmbientMusicPlayer;
