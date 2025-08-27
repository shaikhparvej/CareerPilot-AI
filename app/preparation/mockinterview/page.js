"use client";
import {
    BookOpen,
    Calendar,
    CheckCircle,
    Clock,
    MessageSquare,
    Mic,
    Video,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import DetailForm from "./components/DetailForm";

const PreMockInterview = () => {
  const [selectedTab, setSelectedTab] = useState("prepare");
  const [, setOk] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [micEnabled, setMicEnabled] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [, setResponse] = useState("");
  const [, setQuestions] = useState();

  const tabs = [
    { id: "prepare", label: "Preparation", icon: BookOpen },
    { id: "technical", label: "Technical Check", icon: Video },
    { id: "practice", label: "Practice Session", icon: MessageSquare },
  ];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const q = window.localStorage.getItem("questions");
    if (q) {
      setQuestions(JSON.parse(q));
      setOk(true);
    }
  }, []);
  useEffect(() => {
    // Cleanup function to stop all media streams
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      if (cameraEnabled) {
        // Stop the camera if it's already running
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
        setCameraEnabled(false);
        return;
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setCameraEnabled(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      if (error.name === 'NotAllowedError') {
        alert("Camera access denied. Please allow camera access in your browser settings and refresh the page.");
      } else if (error.name === 'NotFoundError') {
        alert("No camera found. Please connect a camera and try again.");
      } else {
        alert("Unable to access camera. Please check permissions and try again.");
      }
    }
  };

  const startMicrophone = async () => {
    try {
      if (micEnabled) {
        // Stop the microphone if it's already running
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
        setMicEnabled(false);
        return;
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      setStream(mediaStream);

      // Create audio visualization
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(mediaStream);
      source.connect(analyser);

      setMicEnabled(true);

      // Simple audio level visualization
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const canvas = audioRef.current;
      const canvasCtx = canvas.getContext("2d");

      const draw = () => {
        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;

        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);
        canvasCtx.fillStyle = "rgb(200, 200, 200)";
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        const barWidth = (WIDTH / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i] / 2;
          canvasCtx.fillStyle = `rgb(0, 122, 255)`;
          canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
          x += barWidth + 1;
        }
      };

      draw();
    } catch (error) {
      console.error("Error accessing microphone:", error);
      if (error.name === 'NotAllowedError') {
        alert("Microphone access denied. Please allow microphone access in your browser settings and refresh the page.");
      } else if (error.name === 'NotFoundError') {
        alert("No microphone found. Please connect a microphone and try again.");
      } else {
        alert("Unable to access microphone. Please check permissions and try again.");
      }
    }
  };

  return (
    <>
      <div className="min-h-screen bg-blue-50 p-6">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-blue-900 mb-2">
              Interview Preparation Portal
            </h1>
            <p className="text-blue-700">
              Get ready for your upcoming interview with our guided preparation
              system
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 text-blue-800">
                  <Calendar className="h-8 w-8" />
                  <div>
                    <p className="font-semibold">Next Session</p>
                    <p className="text-sm">Tomorrow, 2:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 text-blue-800">
                  <Clock className="h-8 w-8" />
                  <div>
                    <p className="font-semibold">Duration</p>
                    <p className="text-sm">45 minutes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 text-blue-800">
                  <CheckCircle className="h-8 w-8" />
                  <div>
                    <p className="font-semibold">Completion Status</p>
                    <p className="text-sm">2/3 Steps Complete</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="lg:col-span-1 bg-white">
              <CardHeader>
                <CardTitle className="text-blue-900">Interview Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <Button
                        key={tab.id}
                        variant={selectedTab === tab.id ? "default" : "outline"}
                        className={`justify-start gap-2 ${
                          selectedTab === tab.id
                            ? "bg-blue-600"
                            : "text-blue-800"
                        }`}
                        onClick={() => setSelectedTab(tab.id)}
                      >
                        <Icon className="h-4 w-4" />
                        {tab.label}
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3 bg-white">
              <CardHeader>
                <CardTitle className="text-blue-900">
                  {tabs.find((tab) => tab.id === selectedTab)?.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedTab === "prepare" && (
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold text-blue-900 mb-2">
                        Review Materials
                      </h3>
                      <ul className="space-y-2 text-blue-800">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Review job description and requirements
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Prepare common interview questions
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Research company background
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {selectedTab === "technical" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-4">
                          <Video className="h-5 w-5 text-blue-700" />
                          <h3 className="font-semibold text-blue-900">
                            Camera Check
                          </h3>
                        </div>
                        <div className="space-y-4">
                          <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className={`w-full h-48 bg-gray-100 rounded-lg ${
                              cameraEnabled ? "block" : "hidden"
                            }`}
                          />
                          <Button
                            className={`w-full ${
                              cameraEnabled
                                ? "bg-red-600 hover:bg-red-700"
                                : "bg-blue-600 hover:bg-blue-700"
                            }`}
                            onClick={startCamera}
                          >
                            {cameraEnabled ? "Stop Camera" : "Test Camera"}
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-4">
                          <Mic className="h-5 w-5 text-blue-700" />
                          <h3 className="font-semibold text-blue-900">
                            Microphone Check
                          </h3>
                        </div>
                        <div className="space-y-4">
                          <canvas
                            ref={audioRef}
                            className={`w-full h-48 bg-gray-100 rounded-lg ${
                              micEnabled ? "block" : "hidden"
                            }`}
                          />
                          <Button
                            className={`w-full ${
                              micEnabled
                                ? "bg-red-600 hover:bg-red-700"
                                : "bg-blue-600 hover:bg-blue-700"
                            }`}
                            onClick={startMicrophone}
                          >
                            {micEnabled ? "Stop Microphone" : "Test Microphone"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === "practice" && (
                  // <div className="space-y-4">
                  //   <div className="p-4 bg-blue-50 rounded-lg">
                  //     <h3 className="font-semibold text-blue-900 mb-4">
                  //       Practice Session Options
                  //     </h3>
                  //     <div className="space-y-3">
                  //       <Button
                  //         className="w-full bg-blue-600 hover:bg-blue-700"
                  //         onClick={() => handleStart()}
                  //       >
                  //         Start Mock Interview
                  //       </Button>
                  //       <Button className="w-full" variant="outline">
                  //         Review Previous Sessions
                  //       </Button>
                  //     </div>
                  //   </div>
                  // </div>
                  <DetailForm
                    setResponse={setResponse}
                    setOk={setOk}
                    setQuestions={setQuestions}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreMockInterview;
