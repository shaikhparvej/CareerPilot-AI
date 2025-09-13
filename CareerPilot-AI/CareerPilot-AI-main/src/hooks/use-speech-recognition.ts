// @ts-nocheck
'use client';

import { useCallback, useEffect, useState } from 'react';
import type {
  SpeechRecognition,
  SpeechRecognitionErrorEvent,
  SpeechRecognitionEvent,
} from '../types/speech-recognition';

interface SpeechRecognitionHook {
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  error: string | null;
  isSupported: boolean;
  startListening: (lang?: string) => void;
  stopListening: () => void;
  resetTranscript: () => void;
  clearError: () => void;
}

const useSpeechRecognition = (): SpeechRecognitionHook => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );
  const [isSupported, setIsSupported] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [isStarting, setIsStarting] = useState(false);

  useEffect(() => {
    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognitionAPI) {
      setIsSupported(true);
      const newRecognition = new SpeechRecognitionAPI();
      newRecognition.continuous = true;
      newRecognition.interimResults = true;
      setRecognition(newRecognition);
    } else {
      setIsSupported(false);
      setError('Speech recognition is not supported in this browser.');
    }
  }, []); // Only run once on mount

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (recognition) {
        recognition.stop();
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [recognition, timeoutId]);

  const handleResult = useCallback((event: SpeechRecognitionEvent) => {
    let finalTranscript = '';
    let currentInterimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        currentInterimTranscript += event.results[i][0].transcript;
      }
    }
    setTranscript(prev => prev + finalTranscript);
    setInterimTranscript(currentInterimTranscript);
  }, []);

  const handleError = useCallback((event: SpeechRecognitionErrorEvent) => {
    // Only log non-critical errors to console
    if (event.error !== 'no-speech') {
      console.error('Speech recognition error:', event.error);
    }

    if (event.error === 'no-speech') {
      // Don't show error for no-speech, it's a common occurrence
      // Just silently stop listening and allow user to try again
      setIsListening(false);
      setIsStarting(false);
      return;
    } else if (event.error === 'audio-capture') {
      setError("Microphone problem. Please ensure it's connected and enabled.");
    } else if (event.error === 'not-allowed') {
      setError(
        'Permission to use microphone was denied. Please enable it in browser settings.'
      );
    } else if (event.error === 'network') {
      setError(
        'Network error occurred. Please check your internet connection.'
      );
    } else if (event.error === 'aborted') {
      // Speech recognition was aborted, don't show error
      setIsListening(false);
      setIsStarting(false);
      return;
    } else {
      setError(`Speech recognition error: ${event.error}. Please try again.`);
    }
    setIsListening(false);
    setIsStarting(false);
  }, []);

  const handleEnd = useCallback(() => {
    setIsListening(false);
    setIsStarting(false);
    setInterimTranscript('');
    // Clear any existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
  }, [timeoutId]);

  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = handleResult;
    recognition.onerror = handleError;
    recognition.onend = handleEnd;
  }, [recognition, handleResult, handleError, handleEnd]);

  const startListening = useCallback(
    (lang: string = 'en-US') => {
      if (!recognition || isListening || isStarting) return;
      
      setIsStarting(true);
      
      // Force stop any existing recognition first
      try {
        recognition.stop();
      } catch {
        // Ignore errors when stopping
      }
      
      // Wait a bit for the previous recognition to fully stop
      setTimeout(() => {
        if (!recognition) {
          setIsStarting(false);
          return;
        }
        
        try {
          setTranscript('');
          setInterimTranscript('');
          setError(null);

          // Clear any existing timeout
          if (timeoutId) {
            clearTimeout(timeoutId);
          }

          recognition.lang = lang;
          recognition.start();
          setIsListening(true);
          setIsStarting(false);

          // Set a timeout to automatically stop listening after 30 seconds
          const newTimeoutId = setTimeout(() => {
            if (recognition && isListening) {
              recognition.stop();
              setIsListening(false);
            }
          }, 30000);
          setTimeoutId(newTimeoutId);
        } catch (e) {
          console.error('Error starting recognition:', e);
          setIsStarting(false);
          if (e.message && e.message.includes('already started')) {
            // If recognition is already started, just update our state
            setIsListening(true);
          } else {
            setError('Could not start speech recognition. Please try again.');
            setIsListening(false);
          }
        }
      }, 100);
    },
    [recognition, isListening, isStarting, timeoutId]
  );

  const stopListening = useCallback(() => {
    if (!recognition || !isListening) return;

    // Clear timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }

    recognition.stop();
    setIsListening(false);
  }, [recognition, isListening, timeoutId]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
  }, []);

  const clearError = useCallback(() => {
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
    clearError,
  };
};

export default useSpeechRecognition;
