"use client";
import React, { useState, useEffect, useRef } from "react";
import { Mic, StopCircle, Camera, CameraOff, AlertCircle } from "lucide-react";

import Que from "./components/Que";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Alert, AlertDescription } from "../../../../components/ui/alert";
import useSpeechToText from "react-hook-speech-to-text";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Textarea } from "../../../../components/ui/textarea";

import FeedbackReport from "./components/FeedbackReport";
import { AiSoftSkillReport } from '../../../../config/AiModels';
import WebCam from "../../../components/WebCam";
import LoadingDialog from "../../../components/LoadingDialog";

function InterviewPractice() {
  const [questions, setQuestions] = useState([]);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [userAnswer, setUserAnswer] = useState("");
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);

  const videoRef = useRef(null);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const checkPermissions = async () => {
    try {
      // Only run on client side
      if (typeof window !== 'undefined' && navigator.mediaDevices) {
        await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        setPermissionsGranted(true);
        return true;
      }
    } catch (error) {
      toast.error("Please enable camera and microphone access");
      setPermissionsGranted(false);
      return false;
    }
  };

  useEffect(() => {
    checkPermissions();
    const storedQuestions = localStorage.getItem("softSkillQuestions");
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    } else {
      toast.error("Questions not found");
    }
  }, []);

  useEffect(() => {
    if (results.length > 0) {
      const newAnswer = results.map((result) => result.transcript).join(" ");
      setUserAnswer((prevAnswer) => prevAnswer + " " + newAnswer);
      setResults([]);
    }
  }, [results, setResults]);

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
  };

  const submitAnswer = async () => {
    setLoading(true);
    const prompt = `Evaluate the student's ${questions[currentQuestionIndex].skill} skills level based on their response to the following question:
    Question: ${questions[currentQuestionIndex].question}.
    Student's Answer: ${userAnswer}.include skill,skill level,Evaluation Criteria,description,feedback,strengths,weak area,preparation,resource,Assessment and Rating,Areas for Improvement,Suggestions for Further Practice,Conclusion.in json formate.`;
    // alert(prompt);
    try {
      const result = await AiSoftSkillReport.sendMessage(prompt);
      const responseText = await result.response.text();
      console.log(responseText);
      setFeedback(JSON.parse(responseText));
      setLoading(false);
      setCheck(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-blue-600 py-4 ">
        <h1 className="text-3xl font-bold text-white m-2">
          Soft Skills Assessment
        </h1>
      </div>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Questions Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <Que
                questions={questions}
                currentQuestionIndex={currentQuestionIndex}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
                setUserAnswer={setUserAnswer}
                setCheck={setCheck}
              />
            </div>

            {/* Interview Section */}
            <div className="space-y-6">
              {/* Camera Section */}
              <Card className="bg-gray-900 shadow-xl">
                <CardContent className="p-2">
                  <div className="relative">
                    <div className="flex justify-center">
                      <WebCam />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Controls Section */}
              <div className="flex flex-col items-center space-y-4">
                <Button
                  className="w-full max-w-md bg-blue-500 hover:bg-blue-600"
                  variant={isRecording ? "destructive" : "default"}
                  onClick={isRecording ? stopSpeechToText : startSpeechToText}
                  disabled={!permissionsGranted || userAnswer}
                >
                  {isRecording ? (
                    <div className="flex items-center space-x-2">
                      <StopCircle className="h-5 w-5" />
                      <span>Stop Recording</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Mic className="h-5 w-5" />
                      <span>Start Recording</span>
                    </div>
                  )}
                </Button>

                {!permissionsGranted && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Please enable camera and microphone access to continue
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Answer Display */}
              <Card className="bg-white">
                <CardContent className="p-2">
                  <Textarea
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Your answer will appear here as you speak or you can type it yourself..."
                    className="w-full h-32"
                  />
                  <div className="flex justify-end mt-2">
                    <Button
                      onClick={() => submitAnswer()}
                      className="bg-blue-500 hover:bg-blue-600"
                      disabled={!userAnswer}
                    >
                      Submit Answer
                    </Button>
                    <LoadingDialog loading={loading} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
      <div>
        {check && (
          <>
            <FeedbackReport feedback={feedback} />
          </>
        )}
      </div>
    </>
  );
}

export default InterviewPractice;
