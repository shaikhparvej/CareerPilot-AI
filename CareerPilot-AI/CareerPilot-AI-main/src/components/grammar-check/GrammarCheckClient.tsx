"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui1/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui1/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui1/alert';
import { ScrollArea } from '@/components/ui1/scroll-area';
import { grammarCheck, type GrammarCheckOutput, type Suggestion } from '@/ai/flows/grammar-check';
import { generateExtemporeTopic, type GenerateExtemporeTopicOutput } from '@/ai/flows/extempore-topic-flow';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, Mic, MicOff, BookOpen, CheckCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { calculateAutoRating } from '@/lib/autoRater';

type SpeechRecognitionEvent = {
    results: {
        [index: number]: {
            [index: number]: {
                transcript: string;
            };
        };
    };
    resultIndex: number;
};

type SpeechRecognitionErrorEvent = {
    error: string;
};

type SpeechRecognition = {
    continuous: boolean;
    interimResults: boolean;
    maxAlternatives: number;
    start(): void;
    stop(): void;
    onstart: ((ev: Event) => void) | null;
    onresult: ((ev: SpeechRecognitionEvent) => void) | null;
    onerror: ((ev: SpeechRecognitionErrorEvent) => void) | null;
    onend: ((ev: Event) => void) | null;
};

declare global {
    interface Window {
        SpeechRecognition?: new () => SpeechRecognition;
        webkitSpeechRecognition?: new () => SpeechRecognition;
    }
}

let recognition: SpeechRecognition | null = null;
if (typeof window !== "undefined") {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognitionAPI) {
        recognition = new SpeechRecognitionAPI();
    }
}

export function GrammarCheckClient() {
    const [currentTopic, setCurrentTopic] = useState<string | null>(null);
    const [isLoadingTopic, setIsLoadingTopic] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [analysisResult, setAnalysisResult] = useState<GrammarCheckOutput | null>(null);
    const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);
    const [speechApiSupported, setSpeechApiSupported] = useState(true);

    const { toast } = useToast();
    const suggestionsContainerRef = useRef<HTMLUListElement>(null);
    const isListeningRef = useRef(isListening);

    useEffect(() => {
        isListeningRef.current = isListening;
    }, [isListening]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            if (!SpeechRecognitionAPI) {
                console.error("SpeechRecognition is not supported in this browser.");
                setSpeechApiSupported(false);
                toast({ title: "Unsupported Browser", description: "Speech recognition is not supported here.", variant: "destructive" });
                return;
            }

            recognition = new SpeechRecognitionAPI();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.onstart = () => {
                console.log("Speech recognition started");
                setIsListening(true);
                toast({ description: "Listening..." });
            };

            recognition.onresult = (event: any) => {
                const recognizedTranscriptChunk = event.results[0][0].transcript.trim();
                console.log("Transcript chunk:", recognizedTranscriptChunk);

                if (recognizedTranscriptChunk) {
                    setTranscript(prev => (prev + " " + recognizedTranscriptChunk).trim());
                    toast({ description: `You said: ${recognizedTranscriptChunk}` });
                }
            };

            recognition.onerror = (event: any) => {
                console.error("Speech recognition error:", event.error);
                toast({ title: "Recognition Error", description: `Error: ${event.error}`, variant: "destructive" });
                if (isListeningRef.current) setIsListening(false);
            };

            recognition.onend = () => {
                console.log("Speech recognition ended.");
                if (isListeningRef.current) {
                    // Handle end of recognition
                }
            };

            return () => {
                if (recognition) {
                    recognition.onstart = null;
                    recognition.onresult = null;
                    recognition.onerror = null;
                    recognition.onend = null;
                    if (isListeningRef.current) {
                        recognition.stop();
                    }
                }
            };
        } else {
            setSpeechApiSupported(false);
        }
    }, []);

    const handleGetTopic = async () => {
        setIsLoadingTopic(true);
        setCurrentTopic(null);
        setTranscript('');
        setAnalysisResult(null);
        if (isListeningRef.current && recognition) {
            isListeningRef.current = false;
            recognition.stop();
            setIsListening(false);
        }
        try {
            const response: GenerateExtemporeTopicOutput = await generateExtemporeTopic();
            setCurrentTopic(response.topic);
            toast({ title: 'New Topic Ready!', description: `Your topic is: "${response.topic}"`, variant: 'default' });
        } catch (error) {
            console.error('Failed to get topic:', error);
            toast({ title: 'Error', description: 'Failed to generate a new topic. Please try again.', variant: 'destructive' });
        } finally {
            setIsLoadingTopic(false);
        }
    };

    const handleSpeechAnalysis = async (speechText: string) => {
        if (!speechText.trim()) {
            toast({ description: "No speech to analyze.", variant: "default" });
            return;
        }
        setIsLoadingAnalysis(true);
        setAnalysisResult(null);
        try {
            const response = await grammarCheck({ text: speechText, topic: currentTopic || undefined });
            setAnalysisResult(response);
            toast({ title: 'Speech Analysis Complete', description: 'Suggestions are ready.', variant: 'default' });
        } catch (error) {
            console.error('Speech analysis error:', error);
            toast({ title: 'Analysis Error', description: 'Failed to analyze speech. Please try again.', variant: 'destructive' });
        } finally {
            setIsLoadingAnalysis(false);
        }
    };

    const toggleListening = () => {
        if (!recognition || !speechApiSupported) {
            toast({ title: "Speech API Not Ready", description: "Cannot start listening.", variant: "destructive" });
            return;
        }

        if (isListening) {
            isListeningRef.current = false;
            recognition.stop();
            setIsListening(false);
            if (transcript.trim()) {
                handleSpeechAnalysis(transcript.trim());
            } else {
                toast({ description: "No speech recorded to analyze.", variant: "default" });
            }
        } else {
            try {
                recognition.start();
            } catch (err) {
                console.error("Error starting recognition:", err);
                toast({ title: 'Could not start listening', description: 'Please ensure microphone permissions are granted.', variant: 'destructive' });
                setIsListening(false);
            }
        }
    };

    const handleHighlightClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        if (target.tagName === 'MARK' && target.dataset.suggestionId) {
            const suggestionId = target.dataset.suggestionId;
            const suggestionElement = document.getElementById(`suggestion-${suggestionId}`);
            if (suggestionElement) {
                suggestionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                suggestionElement.classList.add('ring-2', 'ring-primary', 'transition-all', 'duration-1000');
                setTimeout(() => {
                    suggestionElement.classList.remove('ring-2', 'ring-primary', 'transition-all', 'duration-1000');
                }, 1500);
            }
        }
    };

    const getSuggestionTypeColor = (type: Suggestion['type']) => {
        switch (type) {
            case 'grammar': return 'border-red-500/50 bg-red-500/10 text-red-700 dark:text-red-400';
            case 'filler': return 'border-yellow-500/50 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
            case 'complex_word': return 'border-purple-500/50 bg-purple-500/10 text-purple-700 dark:text-purple-400';
            case 'clarity': return 'border-blue-500/50 bg-blue-500/10 text-blue-700 dark:text-blue-400';
            case 'conciseness': return 'border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-400';
            default: return 'border-accent/30 bg-accent/10 text-foreground';
        }
    };

    const getSuggestionTypeIcon = (type: Suggestion['type']) => {
        switch (type) {
            case 'grammar': return <CheckCircle className="h-5 w-5 text-red-500" />;
            case 'filler': return <Info className="h-5 w-5 text-yellow-500" />;
            case 'complex_word': return <BookOpen className="h-5 w-5 text-purple-500" />;
            default: return <Sparkles className="h-5 w-5 text-accent" />;
        }
    };

    return (
        <div className="container mx-auto p-4 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Grammar Check</CardTitle>
                    <CardDescription>
                        Practice your speaking skills with AI-powered feedback
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Button
                                onClick={handleGetTopic}
                                disabled={isLoadingTopic}
                                className="w-full sm:w-auto"
                            >
                                {isLoadingTopic ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Generating Topic...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="mr-2 h-4 w-4" />
                                        Get New Topic
                                    </>
                                )}
                            </Button>
                        </div>

                        {currentTopic && (
                            <Alert>
                                <AlertTitle>Current Topic</AlertTitle>
                                <AlertDescription>{currentTopic}</AlertDescription>
                            </Alert>
                        )}

                        <div className="flex items-center justify-between">
                            <Button
                                onClick={toggleListening}
                                disabled={!speechApiSupported || !currentTopic}
                                variant={isListening ? "destructive" : "default"}
                                className="w-full sm:w-auto"
                            >
                                {isListening ? (
                                    <>
                                        <MicOff className="mr-2 h-4 w-4" />
                                        Stop Recording
                                    </>
                                ) : (
                                    <>
                                        <Mic className="mr-2 h-4 w-4" />
                                        Start Recording
                                    </>
                                )}
                            </Button>
                        </div>

                        {transcript && (
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold mb-2">Your Speech</h3>
                                <div
                                    className="p-4 bg-muted rounded-lg"
                                    onClick={handleHighlightClick}
                                >
                                    {transcript}
                                </div>
                            </div>
                        )}

                        {isLoadingAnalysis && (
                            <div className="flex items-center justify-center p-4">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                <span className="ml-2">Analyzing your speech...</span>
                            </div>
                        )}

                        {analysisResult && (
                            <div className="mt-6 space-y-4">
                                <h3 className="text-lg font-semibold">Analysis Results</h3>
                                <ScrollArea className="h-[400px] rounded-md border p-4">
                                    <ul ref={suggestionsContainerRef} className="space-y-4">
                                        {analysisResult.suggestions.map((suggestion, index) => (
                                            <li
                                                key={index}
                                                id={`suggestion-${index}`}
                                                className={cn(
                                                    "p-4 rounded-lg border",
                                                    getSuggestionTypeColor(suggestion.type)
                                                )}
                                            >
                                                <div className="flex items-start gap-3">
                                                    {getSuggestionTypeIcon(suggestion.type)}
                                                    <div className="flex-1">
                                                        <p className="font-medium">{suggestion.message}</p>
                                                        {suggestion.explanation && (
                                                            <p className="text-sm mt-1 text-muted-foreground">
                                                                {suggestion.explanation}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </ScrollArea>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 