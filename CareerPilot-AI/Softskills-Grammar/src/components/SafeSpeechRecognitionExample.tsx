"use client";

"use client";

import React, { useState, useCallback } from 'react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mic, MicOff, RotateCcw, Play, Square } from 'lucide-react';

export const SafeSpeechRecognitionExample: React.FC = () => {
  const [analysisText, setAnalysisText] = useState('');
  
  const {
    isListening,
    transcript,
    interimTranscript,
    error,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition();

  // Handle starting speech recognition with safety checks
  const handleStart = useCallback(() => {
    if (!isSupported) {
      alert('Speech recognition is not supported in this browser');
      return;
    }

    if (isListening) {
      console.warn('Already listening - ignoring start request');
      return;
    }

    startListening({
      lang: 'en-US',
      continuous: true
    });
  }, [isSupported, isListening, startListening]);

  // Handle stopping and analyzing speech
  const handleStopAndAnalyze = useCallback(() => {
    if (!isListening) {
      console.warn('Not currently listening');
      return;
    }

    stopListening();
    
    // Set the final transcript for analysis
    const finalText = transcript + interimTranscript;
    if (finalText.trim()) {
      setAnalysisText(finalText.trim());
      // Here you would call your analysis function
      console.log('Analyzing:', finalText.trim());
    }
  }, [isListening, stopListening, transcript, interimTranscript]);

  // Handle restart (stop current session and start new one)
  const handleRestart = useCallback(() => {
    if (isListening) {
      stopListening();
      // Wait a bit before restarting to ensure clean state
      setTimeout(() => {
        resetTranscript();
        startListening({ lang: 'en-US', continuous: true });
      }, 100);
    } else {
      resetTranscript();
      handleStart();
    }
  }, [isListening, stopListening, resetTranscript, startListening, handleStart]);

  // Handle reset
  const handleReset = useCallback(() => {
    if (isListening) {
      stopListening();
    }
    resetTranscript();
    setAnalysisText('');
  }, [isListening, stopListening, resetTranscript]);

  if (!isSupported) {
    return (
      <Alert variant="destructive">
        <MicOff className="h-4 w-4" />
        <AlertDescription>
          Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="h-5 w-5" />
            Safe Speech Recognition Example
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Error Display */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Control Buttons */}
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={handleStart}
              disabled={isListening}
              variant={isListening ? "secondary" : "default"}
              className="flex items-center gap-2"
            >
              <Play className="h-4 w-4" />
              Start Listening
            </Button>

            <Button
              onClick={handleStopAndAnalyze}
              disabled={!isListening}
              variant="destructive"
              className="flex items-center gap-2"
            >
              <Square className="h-4 w-4" />
              Stop & Analyze
            </Button>

            <Button
              onClick={handleRestart}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Restart
            </Button>

            <Button
              onClick={handleReset}
              variant="outline"
              className="flex items-center gap-2"
            >
              Reset All
            </Button>
          </div>

          {/* Status Display */}
          <div className="flex items-center gap-2">
            {isListening ? (
              <>
                <div className="flex items-center gap-2 text-green-600">
                  <Mic className="h-4 w-4 animate-pulse" />
                  <span className="font-medium">Listening...</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 text-gray-500">
                  <MicOff className="h-4 w-4" />
                  <span>Not listening</span>
                </div>
              </>
            )}
          </div>

          {/* Live Transcript Display */}
          <div className="space-y-2">
            <h3 className="font-medium">Live Transcript:</h3>
            <div className="min-h-[100px] p-3 border rounded-md bg-gray-50">
              <div>
                {/* Final transcript */}
                <span className="text-gray-900">{transcript}</span>
                {/* Interim transcript in lighter color */}
                {interimTranscript && (
                  <span className="text-gray-500 italic"> {interimTranscript}</span>
                )}
              </div>
              
              {isListening && !transcript && !interimTranscript && (
                <div className="text-gray-400 italic">Waiting for speech...</div>
              )}
              
              {!isListening && !transcript && (
                <div className="text-gray-400">Click "Start Listening" to begin</div>
              )}
            </div>
          </div>

          {/* Analysis Result */}
          {analysisText && (
            <div className="space-y-2">
              <h3 className="font-medium">Last Analysis:</h3>
              <div className="p-3 border rounded-md bg-blue-50">
                <p className="text-blue-900">{analysisText}</p>
                <p className="text-sm text-blue-600 mt-2">
                  Length: {analysisText.length} characters
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use Safely</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li><strong>Start Listening:</strong> Begins speech recognition. Button is disabled while already listening.</li>
            <li><strong>Stop & Analyze:</strong> Stops listening and processes the transcript. Only enabled while listening.</li>
            <li><strong>Restart:</strong> Safely stops current session and starts a new one.</li>
            <li><strong>Reset All:</strong> Stops listening and clears all transcripts.</li>
          </ol>
          
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-800">
              <strong>Safety Features:</strong> This implementation prevents the "recognition has already started" error by:
            </p>
            <ul className="list-disc list-inside text-sm text-yellow-700 mt-2 space-y-1">
              <li>Using refs to track recognition state</li>
              <li>Preventing multiple start() calls</li>
              <li>Proper cleanup on component unmount</li>
              <li>Error handling for all edge cases</li>
              <li>Safe restart functionality</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafeSpeechRecognitionExample;
