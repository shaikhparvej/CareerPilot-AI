"use client";

import {
    generateExtemporeTopic
} from "@/ai/flows/extempore-topic-flow";
import {
    grammarCheck,
    type GrammarCheckOutput,
    type Suggestion,
} from "@/ai/flows/grammar-check";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { calculateAutoRating } from "@/lib/autoRater";
import {
    BookOpen,
    CheckCircle,
    Info,
    Loader2,
    Mic,
    MicOff,
    Sparkles,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

let recognition: any = null;
if (typeof window !== "undefined") {
  recognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;
}

export function GrammarCheckClient() {
  const [currentTopic, setCurrentTopic] = useState<string | null>(null);
  const [isLoadingTopic, setIsLoadingTopic] = useState(false);
  const [speechText, setSpeechText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [grammarResult, setGrammarResult] = useState<GrammarCheckOutput | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [speechTimer, setSpeechTimer] = useState(0);
  const [autoRating, setAutoRating] = useState<number | null>(null);
  const { toast } = useToast();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && recognition) {
      recognitionRef.current = new recognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setSpeechText((prev) => prev + finalTranscript + " ");
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        toast({
          title: "Speech Recognition Error",
          description: "There was an error with speech recognition. Please try again.",
          variant: "destructive",
        });
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [toast]);

  const generateTopic = useCallback(async () => {
    setIsLoadingTopic(true);
    try {
      const result = await generateExtemporeTopic({});
      setCurrentTopic(result.topic);
      toast({
        title: "Topic Generated",
        description: `Your speaking topic: ${result.topic}`,
      });
    } catch (error) {
      console.error("Error generating topic:", error);
      toast({
        title: "Error",
        description: "Failed to generate topic. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingTopic(false);
    }
  }, [toast]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      toast({
        title: "Speech Recognition Not Available",
        description: "Your browser doesn't support speech recognition.",
        variant: "destructive",
      });
      return;
    }

    setSpeechText("");
    setGrammarResult(null);
    setAutoRating(null);
    setSpeechTimer(0);
    setIsListening(true);

    try {
      recognitionRef.current.start();
      timerRef.current = setInterval(() => {
        setSpeechTimer((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error starting recognition:", error);
      setIsListening(false);
    }
  }, [toast]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [isListening]);

  const analyzeGrammar = useCallback(async () => {
    if (!speechText.trim()) {
      toast({
        title: "No Text to Analyze",
        description: "Please speak something first before analyzing.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await grammarCheck({
        text: speechText,
        topic: currentTopic || undefined,
      });
      setGrammarResult(result);

      // Calculate auto rating
      const rating = calculateAutoRating(result);
      setAutoRating(rating);

      toast({
        title: "Analysis Complete",
        description: "Your speech has been analyzed for grammar and improvements.",
      });
    } catch (error) {
      console.error("Error analyzing grammar:", error);
      toast({
        title: "Analysis Error",
        description: "Failed to analyze your speech. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  }, [speechText, currentTopic, toast]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const clearAll = useCallback(() => {
    setSpeechText("");
    setGrammarResult(null);
    setAutoRating(null);
    setSpeechTimer(0);
    if (isListening) {
      stopListening();
    }
  }, [isListening, stopListening]);

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Grammar & Speech Analysis
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Practice your speaking skills with AI-powered grammar analysis
          </p>
        </div>

        {/* Topic Generation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Speaking Topic
            </CardTitle>
            <CardDescription>
              Generate a random topic to practice your speaking skills
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentTopic ? (
              <Alert>
                <Sparkles className="h-4 w-4" />
                <AlertTitle>Your Topic</AlertTitle>
                <AlertDescription className="text-lg font-medium">
                  {currentTopic}
                </AlertDescription>
              </Alert>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                No topic generated yet. Click the button below to get started!
              </p>
            )}
          </CardContent>
          <CardFooter>
            <Button
              onClick={generateTopic}
              disabled={isLoadingTopic}
              className="w-full"
            >
              {isLoadingTopic ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate New Topic
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        {/* Speech Recording */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5" />
              Speech Recording
              {speechTimer > 0 && (
                <span className="ml-auto text-sm text-blue-600 dark:text-blue-400">
                  {formatTime(speechTimer)}
                </span>
              )}
            </CardTitle>
            <CardDescription>
              Click the microphone to start recording your speech
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button
                  onClick={isListening ? stopListening : startListening}
                  variant={isListening ? "destructive" : "default"}
                  className="flex-1"
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
                <Button
                  onClick={clearAll}
                  variant="outline"
                  disabled={isListening}
                >
                  Clear
                </Button>
              </div>

              {speechText && (
                <ScrollArea className="h-32 w-full rounded-md border p-4">
                  <p className="text-sm">{speechText}</p>
                </ScrollArea>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={analyzeGrammar}
              disabled={!speechText.trim() || isAnalyzing || isListening}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Analyze Grammar
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        {/* Analysis Results */}
        {grammarResult && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Analysis Results
                {autoRating !== null && (
                  <span className="ml-auto text-lg font-bold text-blue-600 dark:text-blue-400">
                    Score: {autoRating}/10
                  </span>
                )}
              </CardTitle>
              <CardDescription>
                Grammar analysis and improvement suggestions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Overall Assessment */}
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Overall Assessment</AlertTitle>
                <AlertDescription>
                  {grammarResult.overallAssessment}
                </AlertDescription>
              </Alert>

              {/* Corrected Text */}
              {grammarResult.highlightedCorrectedText && (
                <div>
                  <h3 className="font-semibold mb-2">Corrected Text:</h3>
                  <div
                    className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md"
                    dangerouslySetInnerHTML={{
                      __html: grammarResult.highlightedCorrectedText,
                    }}
                  />
                </div>
              )}

              {/* Suggestions */}
              {grammarResult.suggestions && grammarResult.suggestions.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Suggestions:</h3>
                  <div className="space-y-2">
                    {grammarResult.suggestions.map((suggestion: Suggestion) => (
                      <Alert key={suggestion.id}>
                        <AlertDescription>{suggestion.text}</AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </div>
              )}

              {/* Fluency Score */}
              {grammarResult.fluencyScore && (
                <div>
                  <h3 className="font-semibold mb-2">Fluency Score:</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${(grammarResult.fluencyScore / 10) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium">
                      {grammarResult.fluencyScore}/10
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
