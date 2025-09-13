"use client";

"use client";

import { useState, useRef, useCallback, useEffect } from 'react';

// Types for SpeechRecognition API

interface RobustSpeechRecognitionHook {
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  error: string | null;
  isSupported: boolean;
  confidenceScore: number;
  noSpeechCount: number;
  startListening: (options?: { 
    lang?: string; 
    continuous?: boolean;
    maxNoSpeechRetries?: number;
    retryDelay?: number;
  }) => void;
  stopListening: () => void;
  resetTranscript: () => void;
  resetErrors: () => void;
}

interface SpeechRecognitionConfig {
  maxNoSpeechRetries: number;
  retryDelay: number;
  maxContinuousRetries: number;
  cooldownPeriod: number;
  autoRestart: boolean;
}

const DEFAULT_CONFIG: SpeechRecognitionConfig = {
  maxNoSpeechRetries: 3,
  retryDelay: 1000,
  maxContinuousRetries: 5,
  cooldownPeriod: 5000,
  autoRestart: true,
};

export const useRobustSpeechRecognition = (config: Partial<SpeechRecognitionConfig> = {}): RobustSpeechRecognitionHook => {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  
  // States
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [confidenceScore, setConfidenceScore] = useState(0);
  const [noSpeechCount, setNoSpeechCount] = useState(0);

  // Refs for state management
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isListeningRef = useRef(false);
  const isStartingRef = useRef(false);
  const noSpeechCountRef = useRef(0);
  const continuousRetryCountRef = useRef(0);
  const lastErrorTimeRef = useRef(0);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cooldownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInCooldownRef = useRef(false);

  // Configuration refs
  const configRef = useRef(finalConfig);
  configRef.current = finalConfig;

  // Clear all timeouts
  const clearAllTimeouts = useCallback(() => {
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
    if (cooldownTimeoutRef.current) {
      clearTimeout(cooldownTimeoutRef.current);
      cooldownTimeoutRef.current = null;
    }
  }, []);

  // Initialize recognition once
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognitionAPI) {
      setIsSupported(true);
      
      const recognition = new SpeechRecognitionAPI();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      recognition.maxAlternatives = 1;

      recognitionRef.current = recognition;
    } else {
      setIsSupported(false);
      setError('Speech recognition is not supported in this browser.');
    }

    // Cleanup on unmount
    return () => {
      clearAllTimeouts();
      if (recognitionRef.current && isListeningRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          console.warn('Error aborting recognition on unmount:', e);
        }
      }
    };
  }, [clearAllTimeouts]);

  // Handle successful speech recognition start
  const handleStart = useCallback(() => {
    console.log('🎤 Speech recognition started successfully');
    setIsListening(true);
    isListeningRef.current = true;
    isStartingRef.current = false;
    setError(null);
    
    // Reset retry counts on successful start
    noSpeechCountRef.current = 0;
    setNoSpeechCount(0);
    continuousRetryCountRef.current = 0;
  }, []);

  // Handle speech recognition results
  const handleResult = useCallback((event: SpeechRecognitionEvent) => {
    let finalTranscript = '';
    let currentInterimTranscript = '';
    let bestConfidence = 0;

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const result = event.results[i];
      const transcriptText = result[0].transcript;
      const confidence = result[0].confidence || 0;

      if (result.isFinal) {
        finalTranscript += transcriptText;
        bestConfidence = Math.max(bestConfidence, confidence);
      } else {
        currentInterimTranscript += transcriptText;
      }
    }

    if (finalTranscript) {
      setTranscript(prev => prev + finalTranscript);
      setConfidenceScore(bestConfidence);
      
      // Reset no-speech count when we get actual speech
      noSpeechCountRef.current = 0;
      setNoSpeechCount(0);
      continuousRetryCountRef.current = 0;
      
      console.log('✅ Speech recognized:', finalTranscript, `(confidence: ${Math.round(bestConfidence * 100)}%)`);
    }
    
    setInterimTranscript(currentInterimTranscript);
  }, []);

  // Attempt to restart recognition with exponential backoff
  const attemptRestart = useCallback(() => {
    const config = configRef.current;
    
    if (!isListeningRef.current || isInCooldownRef.current) {
      return;
    }

    continuousRetryCountRef.current++;

    // If we've exceeded max continuous retries, enter cooldown
    if (continuousRetryCountRef.current > config.maxContinuousRetries) {
      console.warn(`🚫 Max continuous retries (${config.maxContinuousRetries}) exceeded. Entering cooldown period.`);
      
      isInCooldownRef.current = true;
      setError(`Too many retry attempts. Waiting ${config.cooldownPeriod / 1000}s before allowing restart.`);
      
      cooldownTimeoutRef.current = setTimeout(() => {
        isInCooldownRef.current = false;
        continuousRetryCountRef.current = 0;
        noSpeechCountRef.current = 0;
        setNoSpeechCount(0);
        setError(null);
        console.log('✅ Cooldown period ended. Recognition can be restarted.');
      }, config.cooldownPeriod);
      
      return;
    }

    // Calculate exponential backoff delay
    const delay = Math.min(config.retryDelay * Math.pow(2, continuousRetryCountRef.current - 1), 8000);
    
    console.log(`🔄 Attempting restart ${continuousRetryCountRef.current}/${config.maxContinuousRetries} in ${delay}ms...`);
    
    retryTimeoutRef.current = setTimeout(() => {
      if (isListeningRef.current && recognitionRef.current && !isInCooldownRef.current) {
        try {
          recognitionRef.current.start();
        } catch (err) {
          console.error('❌ Failed to restart recognition:', err);
          if (err instanceof DOMException && err.name === 'InvalidStateError') {
            // Recognition might already be running, just update UI state
            setIsListening(true);
          }
        }
      }
    }, delay);
  }, []);

  // Handle speech recognition errors
  const handleError = useCallback((event: SpeechRecognitionErrorEvent) => {
    const config = configRef.current;
    const now = Date.now();
    
    console.log(`⚠️ Speech recognition error: ${event.error}`);
    
    switch (event.error) {
      case 'no-speech':
        noSpeechCountRef.current++;
        setNoSpeechCount(noSpeechCountRef.current);
        
        // Only show error message if we've exceeded the retry limit
        if (noSpeechCountRef.current >= config.maxNoSpeechRetries) {
          setError(`No speech detected after ${config.maxNoSpeechRetries} attempts. Please check your microphone.`);
          console.warn(`🔇 No speech detected ${noSpeechCountRef.current} times. Consider checking microphone.`);
        } else {
          // Don't show error for early attempts, just log quietly
          console.log(`🔇 No speech detected (${noSpeechCountRef.current}/${config.maxNoSpeechRetries}). Will retry...`);
          setError(null);
        }
        
        // Auto-restart if within limits and configured to do so
        if (config.autoRestart && noSpeechCountRef.current < config.maxNoSpeechRetries && isListeningRef.current) {
          attemptRestart();
        } else if (noSpeechCountRef.current >= config.maxNoSpeechRetries) {
          setIsListening(false);
          isListeningRef.current = false;
        }
        break;
        
      case 'audio-capture':
        setError('Microphone access failed. Please check your microphone connection and permissions.');
        setIsListening(false);
        isListeningRef.current = false;
        break;
        
      case 'not-allowed':
        setError('Microphone permission denied. Please enable microphone access in your browser settings.');
        setIsListening(false);
        isListeningRef.current = false;
        break;
        
      case 'network':
        setError('Network error occurred. Please check your internet connection.');
        if (config.autoRestart && now - lastErrorTimeRef.current > 5000) {
          attemptRestart();
        } else {
          setIsListening(false);
          isListeningRef.current = false;
        }
        break;
        
      case 'aborted':
        // Intentional abort, don't show error
        console.log('🛑 Speech recognition was intentionally aborted');
        return;
        
      case 'service-not-allowed':
        setError('Speech recognition service is not allowed. Please try again later.');
        setIsListening(false);
        isListeningRef.current = false;
        break;
        
      default:
        setError(`Speech recognition error: ${event.error}`);
        if (config.autoRestart && now - lastErrorTimeRef.current > 3000) {
          attemptRestart();
        } else {
          setIsListening(false);
          isListeningRef.current = false;
        }
    }
    
    lastErrorTimeRef.current = now;
    isStartingRef.current = false;
  }, [attemptRestart]);

  // Handle speech recognition end
  const handleEnd = useCallback(() => {
    console.log('🏁 Speech recognition ended');
    
    // Clear retry timeout if recognition ended naturally
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
    
    setIsListening(false);
    isListeningRef.current = false;
    isStartingRef.current = false;
    setInterimTranscript('');
    
    // Don't auto-restart if we're in cooldown or user stopped manually
    if (!isInCooldownRef.current && configRef.current.autoRestart && 
        noSpeechCountRef.current < configRef.current.maxNoSpeechRetries) {
      // Small delay before restart to prevent rapid cycling
      setTimeout(() => {
        if (isListeningRef.current && recognitionRef.current) {
          attemptRestart();
        }
      }, 100);
    }
  }, [attemptRestart]);

  // Setup event listeners
  useEffect(() => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    recognition.onstart = handleStart;
    recognition.onresult = handleResult;
    recognition.onerror = handleError;
    recognition.onend = handleEnd;

    return () => {
      recognition.onstart = null;
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
    };
  }, [handleStart, handleResult, handleError, handleEnd]);

  // Start listening with options
  const startListening = useCallback((options: {
    lang?: string;
    continuous?: boolean;
    maxNoSpeechRetries?: number;
    retryDelay?: number;
  } = {}) => {
    const recognition = recognitionRef.current;
    
    if (!recognition || !isSupported) {
      setError('Speech recognition is not available.');
      return;
    }

    if (isInCooldownRef.current) {
      setError('Speech recognition is in cooldown. Please wait a moment.');
      return;
    }

    // Prevent multiple start calls
    if (isListeningRef.current || isStartingRef.current) {
      console.warn('⚠️ Speech recognition is already running or starting');
      return;
    }

    // Update config if options provided
    if (options.maxNoSpeechRetries !== undefined) {
      configRef.current.maxNoSpeechRetries = options.maxNoSpeechRetries;
    }
    if (options.retryDelay !== undefined) {
      configRef.current.retryDelay = options.retryDelay;
    }

    clearAllTimeouts();
    
    try {
      isStartingRef.current = true;
      setError(null);
      
      // Configure recognition
      if (options.lang) {
        recognition.lang = options.lang;
      }
      if (typeof options.continuous !== 'undefined') {
        recognition.continuous = options.continuous;
      }

      // Reset counters
      noSpeechCountRef.current = 0;
      setNoSpeechCount(0);
      continuousRetryCountRef.current = 0;

      console.log('🚀 Starting speech recognition...');
      recognition.start();
      
    } catch (error) {
      console.error('❌ Error starting recognition:', error);
      
      if (error instanceof DOMException && error.name === 'InvalidStateError') {
        setError('Speech recognition is already active.');
        setIsListening(true);
        isListeningRef.current = true;
      } else {
        setError('Could not start speech recognition. Please try again.');
      }
      
      isStartingRef.current = false;
    }
  }, [isSupported, clearAllTimeouts]);

  // Stop listening
  const stopListening = useCallback(() => {
    const recognition = recognitionRef.current;
    
    console.log('🛑 Stopping speech recognition...');
    
    clearAllTimeouts();
    isListeningRef.current = false;
    
    if (recognition) {
      try {
        recognition.stop();
      } catch (error) {
        console.warn('⚠️ Error stopping recognition:', error);
      }
    }
    
    setIsListening(false);
    isStartingRef.current = false;
  }, [clearAllTimeouts]);

  // Reset transcript
  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
    setConfidenceScore(0);
  }, []);

  // Reset error states
  const resetErrors = useCallback(() => {
    setError(null);
    noSpeechCountRef.current = 0;
    setNoSpeechCount(0);
    continuousRetryCountRef.current = 0;
    isInCooldownRef.current = false;
    clearAllTimeouts();
  }, [clearAllTimeouts]);

  return {
    isListening,
    transcript,
    interimTranscript,
    error,
    isSupported,
    confidenceScore,
    noSpeechCount,
    startListening,
    stopListening,
    resetTranscript,
    resetErrors,
  };
};

export default useRobustSpeechRecognition;
