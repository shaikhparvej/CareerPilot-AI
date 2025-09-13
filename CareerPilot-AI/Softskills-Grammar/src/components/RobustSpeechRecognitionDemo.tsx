"use client";

import React, { useState, useCallback } from 'react';
import { useRobustSpeechRecognition } from '../hooks/useRobustSpeechRecognition';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Mic, 
  MicOff, 
  RotateCcw, 
  Play, 
  Square, 
  AlertCircle,
  CheckCircle,
  Settings,
  Volume2,
  VolumeX
} from 'lucide-react';

export const RobustSpeechRecognitionDemo: React.FC = () => {
  const [analysisText, setAnalysisText] = useState('');
  const [maxRetries, setMaxRetries] = useState(3);
  const [retryDelay, setRetryDelay] = useState(1000);
  
  const {
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
  } = useRobustSpeechRecognition({
    maxNoSpeechRetries: maxRetries,
    retryDelay: retryDelay,
    maxContinuousRetries: 5,
    cooldownPeriod: 5000,
    autoRestart: true,
  });

  // Handle starting speech recognition
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
      continuous: true,
      maxNoSpeechRetries: maxRetries,
      retryDelay: retryDelay,
    });
  }, [isSupported, isListening, startListening, maxRetries, retryDelay]);

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
      console.log('Analyzing:', finalText.trim());
    }
  }, [isListening, stopListening, transcript, interimTranscript]);

  // Handle restart with error reset
  const handleRestart = useCallback(() => {
    stopListening();
    resetErrors();
    setTimeout(() => {
      resetTranscript();
      handleStart();
    }, 100);
  }, [stopListening, resetErrors, resetTranscript, handleStart]);

  // Handle reset all
  const handleReset = useCallback(() => {
    stopListening();
    resetTranscript();
    resetErrors();
    setAnalysisText('');
  }, [stopListening, resetTranscript, resetErrors]);

  // Get status color based on current state
  const getStatusColor = () => {
    if (error) return 'destructive';
    if (isListening) return 'default';
    return 'secondary';
  };

  // Get status text
  const getStatusText = () => {
    if (error) return 'Error';
    if (isListening) return 'Listening';
    return 'Ready';
  };

  if (!isSupported) {
    return (
      <Alert variant="destructive">
        <MicOff className="h-4 w-4" />
        <AlertTitle>Speech Recognition Not Supported</AlertTitle>
        <AlertDescription>
          Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      {/* Main Control Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="h-5 w-5" />
            Robust Speech Recognition with No-Speech Handling
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Status and Error Display */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge variant={getStatusColor()} className="flex items-center gap-1">
                {isListening ? (
                  <Volume2 className="h-3 w-3 animate-pulse" />
                ) : (
                  <VolumeX className="h-3 w-3" />
                )}
                {getStatusText()}
              </Badge>
              
              {noSpeechCount > 0 && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  No Speech: {noSpeechCount}/{maxRetries}
                </Badge>
              )}
              
              {confidenceScore > 0 && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Confidence: {Math.round(confidenceScore * 100)}%
                </Badge>
              )}
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
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

          {/* Configuration Panel */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="font-medium">Configuration</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Max No-Speech Retries</label>
                <select 
                  value={maxRetries} 
                  onChange={(e) => setMaxRetries(Number(e.target.value))}
                  className="w-full p-2 border rounded-md"
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Retry Delay (ms)</label>
                <select 
                  value={retryDelay} 
                  onChange={(e) => setRetryDelay(Number(e.target.value))}
                  className="w-full p-2 border rounded-md"
                >
                  <option value={500}>500ms</option>
                  <option value={1000}>1000ms</option>
                  <option value={2000}>2000ms</option>
                  <option value={3000}>3000ms</option>
                </select>
              </div>
            </div>
          </div>

          <Separator />

          {/* Live Transcript Display */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center gap-2">
              <Mic className="h-4 w-4" />
              Live Transcript
            </h3>
            
            <div className="min-h-[120px] p-4 border-2 rounded-lg bg-gray-50 transition-colors duration-200">
              {/* Final transcript */}
              <div className="text-gray-900 leading-relaxed">
                {transcript}
                {/* Interim transcript in lighter color */}
                {interimTranscript && (
                  <span className="text-gray-500 italic border-l-2 border-blue-300 pl-2 ml-1">
                    {interimTranscript}
                  </span>
                )}
              </div>
              
              {/* Status messages */}
              {isListening && !transcript && !interimTranscript && (
                <div className="text-gray-400 italic flex items-center gap-2">
                  <Volume2 className="h-4 w-4 animate-pulse" />
                  Listening for speech... Speak clearly into your microphone.
                </div>
              )}
              
              {!isListening && !transcript && (
                <div className="text-gray-400 italic flex items-center gap-2">
                  <VolumeX className="h-4 w-4" />
                  Click "Start Listening" to begin speech recognition
                </div>
              )}
            </div>
          </div>

          {/* Analysis Result */}
          {analysisText && (
            <div className="space-y-3">
              <h3 className="font-medium flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Last Analysis Result
              </h3>
              <div className="p-4 border rounded-lg bg-blue-50">
                <p className="text-blue-900">{analysisText}</p>
                <div className="mt-3 flex items-center gap-4 text-sm text-blue-600">
                  <span>Length: {analysisText.length} characters</span>
                  <span>Words: {analysisText.split(' ').length}</span>
                  {confidenceScore > 0 && (
                    <span>Confidence: {Math.round(confidenceScore * 100)}%</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Features Information */}
      <Card>
        <CardHeader>
          <CardTitle>🚀 Robust Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-green-600">✅ Error Handling</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Graceful "no-speech" error handling</li>
                <li>• Automatic retry with exponential backoff</li>
                <li>• Cooldown period to prevent infinite loops</li>
                <li>• Comprehensive error messages</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-blue-600">🔧 Smart Controls</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Prevents multiple start() calls</li>
                <li>• Configurable retry limits and delays</li>
                <li>• Automatic cleanup on unmount</li>
                <li>• Real-time confidence scoring</li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-2">
            <h4 className="font-medium">📊 Current Configuration</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• Max No-Speech Retries: <strong>{maxRetries}</strong></p>
              <p>• Retry Delay: <strong>{retryDelay}ms</strong></p>
              <p>• Max Continuous Retries: <strong>5</strong></p>
              <p>• Cooldown Period: <strong>5000ms</strong></p>
              <p>• Auto Restart: <strong>Enabled</strong></p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RobustSpeechRecognitionDemo;
