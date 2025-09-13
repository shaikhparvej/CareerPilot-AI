"use client";

"use client";

import { useState, useRef, useCallback, useEffect } from 'react';

interface SpeechRecognitionHook {
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  error: string | null;
  isSupported: boolean;
  startListening: (options?: { lang?: string; continuous?: boolean }) => void;
  stopListening: () => void;
  resetTranscript: () => void;
}

// Use the built-in SpeechRecognition types if available
declare global {
  interface Window {
    SpeechRecognition?: typeof SpeechRecognition;
    webkitSpeechRecognition?: typeof SpeechRecognition;
  }
}

export const useSpeechRecognition = (): SpeechRecognitionHook => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  // Use refs to track recognition state
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isListeningRef = useRef(false);
  const isStartingRef = useRef(false);

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
      if (recognitionRef.current && isListeningRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          console.warn('Error aborting recognition:', e);
        }
      }
    };
  }, []);

  // Event handlers
  const handleStart = useCallback(() => {
    console.log('Speech recognition started');
    setIsListening(true);
    isListeningRef.current = true;
    isStartingRef.current = false;
    setError(null);
  }, []);

  const handleResult = useCallback((event: SpeechRecognitionEvent) => {
    let finalTranscript = '';
    let currentInterimTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const result = event.results[i];
      const transcriptText = result[0].transcript;

      if (result.isFinal) {
        finalTranscript += transcriptText;
      } else {
        currentInterimTranscript += transcriptText;
      }
    }

    if (finalTranscript) {
      setTranscript(prev => prev + finalTranscript);
    }
    setInterimTranscript(currentInterimTranscript);
  }, []);

  const handleError = useCallback((event: SpeechRecognitionErrorEvent) => {
    console.error('Speech recognition error:', event.error);
    
    let errorMessage = 'Unknown error occurred';
    
    switch (event.error) {
      case 'no-speech':
        errorMessage = 'No speech detected. Please try again.';
        break;
      case 'audio-capture':
        errorMessage = 'Microphone problem. Please ensure it\'s connected and enabled.';
        break;
      case 'not-allowed':
        errorMessage = 'Permission to use microphone was denied. Please enable it in browser settings.';
        break;
      case 'network':
        errorMessage = 'Network error occurred during speech recognition.';
        break;
      case 'aborted':
        // Don't show error for intentional aborts
        console.log('Speech recognition was aborted');
        return;
      default:
        errorMessage = `Speech recognition error: ${event.error}`;
    }
    
    setError(errorMessage);
    setIsListening(false);
    isListeningRef.current = false;
    isStartingRef.current = false;
  }, []);

  const handleEnd = useCallback(() => {
    console.log('Speech recognition ended');
    setIsListening(false);
    isListeningRef.current = false;
    isStartingRef.current = false;
    setInterimTranscript('');
  }, []);

  // Setup event listeners when recognition is available
  useEffect(() => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    recognition.onstart = handleStart;
    recognition.onresult = handleResult;
    recognition.onerror = handleError;
    recognition.onend = handleEnd;

    return () => {
      // Clean up event listeners
      recognition.onstart = null;
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
    };
  }, [handleStart, handleResult, handleError, handleEnd]);

  const startListening = useCallback((options: { lang?: string; continuous?: boolean } = {}) => {
    const recognition = recognitionRef.current;
    
    if (!recognition || !isSupported) {
      setError('Speech recognition is not available.');
      return;
    }

    // Prevent multiple start calls
    if (isListeningRef.current || isStartingRef.current) {
      console.warn('Speech recognition is already running or starting');
      return;
    }

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

      recognition.start();
    } catch (error) {
      console.error('Error starting recognition:', error);
      setError('Could not start speech recognition. Please try again.');
      setIsListening(false);
      isListeningRef.current = false;
      isStartingRef.current = false;
    }
  }, [isSupported]);

  const stopListening = useCallback(() => {
    const recognition = recognitionRef.current;
    
    if (!recognition || !isListeningRef.current) {
      return;
    }

    try {
      recognition.stop();
    } catch (error) {
      console.warn('Error stopping recognition:', error);
      // Force update state even if stop() fails
      setIsListening(false);
      isListeningRef.current = false;
      isStartingRef.current = false;
    }
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
    setError(null);
  }, []);

  return {
    isListening,
    transcript,
    interimTranscript,
    error,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  };
};

export default useSpeechRecognition;
