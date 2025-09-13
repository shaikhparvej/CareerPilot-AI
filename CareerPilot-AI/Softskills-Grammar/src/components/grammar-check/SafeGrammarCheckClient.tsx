"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  grammarCheck,
  type GrammarCheckOutput,
  type Suggestion,
} from "@/ai/flows/grammar-check";
import {
  generateExtemporeTopic,
  type GenerateExtemporeTopicOutput,
} from "@/ai/flows/extempore-topic-flow";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  Sparkles,
  Mic,
  MicOff,
  BookOpen,
  CheckCircle,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { calculateAutoRating } from "@/lib/autoRater";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

export function SafeGrammarCheckClient() {
  const [currentTopic, setCurrentTopic] = useState<string | null>(null);
  const [isLoadingTopic, setIsLoadingTopic] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<GrammarCheckOutput | null>(null);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);
  const [rating, setRating] = useState<number>(0);

  const { toast } = useToast();
  const suggestionsContainerRef = useRef<HTMLUListElement>(null);

  // Use the safe speech recognition hook
  const {
    isListening,
    transcript,
    interimTranscript,
    error: speechError,
    isSupported: speechApiSupported,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition();

  const handleGetTopic = async () => {
    setIsLoadingTopic(true);
    setCurrentTopic(null);
    resetTranscript();
    setAnalysisResult(null);
    
    // Stop listening if currently active
    if (isListening) {
      stopListening();
    }
    
    try {
      const response: GenerateExtemporeTopicOutput = await generateExtemporeTopic();
      setCurrentTopic(response.topic);
      toast({
        title: "New Topic Ready!",
        description: `Your topic is: "${response.topic}"`,
        variant: "default",
      });
    } catch (error) {
      console.error("Failed to get topic:", error);
      toast({
        title: "Error",
        description: "Failed to generate a new topic. Please try again.",
        variant: "destructive",
      });
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
      const response = await grammarCheck({
        text: speechText,
        topic: currentTopic || undefined,
      });
      setAnalysisResult(response);
      const autoScore = calculateAutoRating(response);
      setRating(autoScore);

      toast({
        title: "Speech Analysis Complete",
        description: "Suggestions are ready.",
        variant: "default",
      });
    } catch (error) {
      console.error("Speech analysis error:", error);
      toast({
        title: "Analysis Error",
        description: "Failed to analyze speech. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingAnalysis(false);
    }
  };

  const handleToggleListening = () => {
    if (!speechApiSupported) {
      toast({
        title: "Speech API Not Supported",
        description: "Your browser doesn't support speech recognition.",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      // Stop and analyze
      stopListening();
      const finalText = transcript + interimTranscript;
      if (finalText.trim()) {
        handleSpeechAnalysis(finalText.trim());
      } else {
        toast({
          description: "No speech recorded to analyze.",
          variant: "default",
        });
      }
    } else {
      // Start listening
      if (analysisResult) {
        resetTranscript();
        setAnalysisResult(null);
      }
      startListening({
        lang: "en-US",
        continuous: true,
      });
    }
  };

  const handleHighlightClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.tagName === "MARK" && target.dataset.suggestionId) {
      const suggestionId = target.dataset.suggestionId;
      const suggestionElement = document.getElementById(
        `suggestion-${suggestionId}`
      );
      if (suggestionElement) {
        suggestionElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        suggestionElement.style.backgroundColor = "#fef3c7";
        setTimeout(() => {
          suggestionElement.style.backgroundColor = "";
        }, 2000);
      }
    }
  };

  const renderHighlightedText = (
    text: string,
    suggestions: Suggestion[]
  ): JSX.Element[] => {
    let lastIndex = 0;
    const elements: JSX.Element[] = [];

    const sortedSuggestions = [...suggestions].sort((a, b) => a.start - b.start);

    sortedSuggestions.forEach((suggestion, index) => {
      if (suggestion.start > lastIndex) {
        elements.push(
          <span key={`text-${index}`}>
            {text.slice(lastIndex, suggestion.start)}
          </span>
        );
      }

      const highlightedText = text.slice(suggestion.start, suggestion.end);
      elements.push(
        <mark
          key={`highlight-${index}`}
          className={cn(
            "px-1 rounded cursor-pointer transition-colors",
            suggestion.type === "grammar"
              ? "bg-red-200 hover:bg-red-300"
              : suggestion.type === "style"
              ? "bg-blue-200 hover:bg-blue-300"
              : "bg-yellow-200 hover:bg-yellow-300"
          )}
          data-suggestion-id={index}
        >
          {highlightedText}
        </mark>
      );

      lastIndex = suggestion.end;
    });

    if (lastIndex < text.length) {
      elements.push(
        <span key="text-final">{text.slice(lastIndex)}</span>
      );
    }

    return elements;
  };

  // Show speech error if any
  useEffect(() => {
    if (speechError) {
      toast({
        title: "Speech Recognition Error",
        description: speechError,
        variant: "destructive",
      });
    }
  }, [speechError, toast]);

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-headline flex items-center">
            <Mic className="mr-2 h-6 w-6 text-primary" /> Extempore Practice
          </CardTitle>
          <CardDescription>
            {currentTopic ? (
              <>
                Your extempore topic is:{" "}
                <strong className="text-primary">{currentTopic}</strong>. Press
                "Start Speaking" or "Stop Speaking & Analyze" below.
              </>
            ) : (
              'Click "Get Extempore Topic" to begin your practice.'
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!speechApiSupported && (
            <Alert variant="destructive">
              <MicOff className="h-5 w-5" />
              <AlertTitle>Speech Recognition Not Supported</AlertTitle>
              <AlertDescription>
                Your browser doesn't support the Web Speech API. Please use a
                browser like Chrome or Edge for this feature.
              </AlertDescription>
            </Alert>
          )}
          <Button
            onClick={handleGetTopic}
            disabled={isLoadingTopic || !speechApiSupported}
            size="lg"
          >
            {isLoadingTopic ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <BookOpen className="mr-2 h-5 w-5" />
            )}
            Get Extempore Topic
          </Button>
          {currentTopic && (
            <Alert variant="default" className="bg-primary/10 border-primary/30">
              <BookOpen className="h-5 w-5 text-primary" />
              <AlertTitle className="text-primary font-semibold">
                Your Topic:
              </AlertTitle>
              <AlertDescription className="text-lg">
                {currentTopic}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>

        {currentTopic && speechApiSupported && (
          <CardFooter className="flex-col items-start space-y-4">
            <Button
              onClick={handleToggleListening}
              disabled={isLoadingAnalysis || !currentTopic}
              size="lg"
              variant={isListening ? "destructive" : "default"}
            >
              {isListening ? (
                <>
                  <MicOff className="mr-2 h-5 w-5" /> Stop Speaking & Analyze
                </>
              ) : (
                <>
                  <Mic className="mr-2 h-5 w-5" /> Start Speaking
                </>
              )}
            </Button>
            <div className="w-full p-3 border rounded-md min-h-[100px] bg-muted/30">
              <p className="text-muted-foreground text-sm mb-1">
                Your speech transcript (accumulates until analyzed):
              </p>
              <div>
                <span className="text-gray-900">{transcript}</span>
                {interimTranscript && (
                  <span className="text-gray-500 italic"> {interimTranscript}</span>
                )}
              </div>
              {isListening && !transcript && !interimTranscript && (
                <p className="text-sm text-muted-foreground italic">
                  Waiting for speech...
                </p>
              )}
              {!isListening && !transcript && !analysisResult && (
                <p className="text-sm text-muted-foreground italic">
                  Click "Start Speaking" to begin once you have a topic. Click
                  "Stop Speaking & Analyze" when done.
                </p>
              )}
            </div>
          </CardFooter>
        )}
      </Card>

      {isLoadingAnalysis && (
        <Card className="shadow-md">
          <CardContent className="p-6 text-center">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">
              Analyzing your speech...
            </p>
          </CardContent>
        </Card>
      )}

      {analysisResult && (
        <div className="space-y-6">
          {analysisResult.overallFeedback && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-headline flex items-center">
                  <Sparkles className="mr-2 h-5 w-5 text-accent" />
                  Overall Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {analysisResult.overallFeedback}
                </p>
                {rating > 0 && (
                  <div className="mt-4 flex items-center space-x-2">
                    <span className="text-sm font-medium">Auto Rating:</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <CheckCircle
                          key={star}
                          className={cn(
                            "h-5 w-5",
                            star <= rating
                              ? "text-yellow-500 fill-current"
                              : "text-gray-300"
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({rating}/5)
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {analysisResult.suggestions &&
            analysisResult.suggestions.length > 0 && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-headline flex items-center">
                    <Info className="mr-2 h-5 w-5 text-info" />
                    Detailed Suggestions ({analysisResult.suggestions.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-3">
                        Your Speech (click highlights to see suggestions):
                      </h4>
                      <div
                        className="p-4 bg-muted/50 rounded-lg leading-relaxed cursor-text"
                        onClick={handleHighlightClick}
                      >
                        {renderHighlightedText(
                          analysisResult.originalText,
                          analysisResult.suggestions
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Suggestions:</h4>
                      <ScrollArea className="h-64">
                        <ul ref={suggestionsContainerRef} className="space-y-3">
                          {analysisResult.suggestions.map(
                            (suggestion, index) => (
                              <li
                                key={index}
                                id={`suggestion-${index}`}
                                className={cn(
                                  "p-3 rounded-lg border-l-4 transition-colors",
                                  suggestion.type === "grammar"
                                    ? "bg-red-50 border-red-400"
                                    : suggestion.type === "style"
                                    ? "bg-blue-50 border-blue-400"
                                    : "bg-yellow-50 border-yellow-400"
                                )}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center mb-1">
                                      <span
                                        className={cn(
                                          "inline-block w-2 h-2 rounded-full mr-2",
                                          suggestion.type === "grammar"
                                            ? "bg-red-400"
                                            : suggestion.type === "style"
                                            ? "bg-blue-400"
                                            : "bg-yellow-400"
                                        )}
                                      />
                                      <span className="font-medium text-sm capitalize">
                                        {suggestion.type}
                                      </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">
                                      {suggestion.message}
                                    </p>
                                    {suggestion.suggestion && (
                                      <p className="text-sm">
                                        <span className="font-medium">
                                          Suggested:
                                        </span>{" "}
                                        "{suggestion.suggestion}"
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </li>
                            )
                          )}
                        </ul>
                      </ScrollArea>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
        </div>
      )}
    </div>
  );
}

export default SafeGrammarCheckClient;
