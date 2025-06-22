import React, { useState, useRef, useEffect } from "react";
import { Mic, StopCircle, Camera, Play } from "lucide-react";

const Interview = () => {
  const [currentCategory, setCurrentCategory] = useState("General_Questions");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const questions = {
    General_Questions: [
      "Why are you interested in this Web Developer position at Robert Half?",
      "What do you know about Robert Half and our company culture?",
      "What are your salary expectations for this contract position?",
      "Describe your experience working on short-term contract projects.",
      "How do you stay up-to-date with the latest web development technologies and trends?",
      "What is your preferred development environment and why?",
    ],
    Technical_Questions: [
      "Explain your experience with A/B testing methodologies and tools.",
      "Describe your experience with ASP.NET, including different versions you've worked with and any specific challenges you've overcome.",
      "How familiar are you with various CMS platforms?",
      "Describe your experience using Bootstrap for responsive web design.",
      "Explain your understanding of HTML5 and CSS, including semantic HTML and CSS preprocessors.",
      "How would you troubleshoot a bug using Atlassian Jira?",
      "Describe your experience with backend development and database interactions.",
      "What is your experience with version control systems like Git?",
    ],
    Behavioral_Questions: [
      "Describe a time you had to work on multiple projects simultaneously under tight deadlines.",
      "Tell me about a time you had a conflict with a team member.",
      "Describe a situation where you had to adapt to a changing project requirement.",
      "Give an example of a time you identified and solved a complex bug.",
      "Describe your experience working with clients or stakeholders.",
      "How do you handle constructive criticism?",
    ],
    Situational_Questions: [
      "Imagine our website experiences a sudden drop in traffic. How would you approach troubleshooting the issue?",
      "Let's say a crucial feature is not working correctly just before a major product launch.",
      "You notice a colleague is using inefficient coding practices.",
      "A new CMS is being implemented, and you need to quickly upskill your team.",
      "How would you approach optimizing a website for better performance and SEO?",
    ],
    Closing_Questions: [
      "Do you have any questions for me about the role or the company?",
      "What are your career aspirations, and how does this role fit into your long-term goals?",
      "Why should we choose you over other candidates?",
      "What is your availability to start the contract?",
      "What are your preferred methods of communication and collaboration?",
    ],
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        audioChunksRef.current = [];
        // Note: In a real app, you'd send this to a speech-to-text API
        setTranscription(
          "Sample transcription of your answer (actual transcription would require an API)"
        );
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone", err);
      alert("Could not access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const nextQuestion = () => {
    const currentCategoryQuestions = questions[currentCategory];
    if (currentQuestionIndex < currentCategoryQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Move to next category or loop back
      const categories = Object.keys(questions);
      const currentIndex = categories.indexOf(currentCategory);
      const nextIndex = (currentIndex + 1) % categories.length;
      setCurrentCategory(categories[nextIndex]);
      setCurrentQuestionIndex(0);
    }
    // Reset transcription when moving to next question
    setTranscription("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Mock Interview Simulator
        </h1>

        {/* Category Selector */}
        <div className="flex justify-center mb-6 space-x-2">
          {Object.keys(questions).map((category) => (
            <button
              key={category}
              onClick={() => {
                setCurrentCategory(category);
                setCurrentQuestionIndex(0);
              }}
              className={`px-4 py-2 rounded ${
                currentCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {category.replace(/_/g, " ")}
            </button>
          ))}
        </div>

        {/* Question Display */}
        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold mb-4">
            {currentCategory.replace(/_/g, " ")}
          </h2>
          <p className="text-lg text-gray-700">
            {questions[currentCategory][currentQuestionIndex]}
          </p>
        </div>

        {/* Camera and Recording Section */}
        <div className="flex justify-center items-center space-x-4 mb-6">
          {/* Camera Placeholder */}
          <div className="w-64 h-48 bg-gray-200 flex items-center justify-center">
            <Camera className="text-gray-500" size={48} />
            <p className="text-gray-500">Camera Preview</p>
          </div>

          {/* Recording Controls */}
          <div className="flex flex-col items-center space-y-4">
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600"
              >
                <Mic size={24} />
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600"
              >
                <StopCircle size={24} />
              </button>
            )}
            <button
              onClick={nextQuestion}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Next Question <Play size={16} className="inline ml-2" />
            </button>
          </div>
        </div>

        {/* Transcription Display */}
        {transcription && (
          <div className="bg-gray-100 p-4 rounded-lg mt-4">
            <h3 className="font-semibold mb-2">Your Answer:</h3>
            <p className="text-gray-700">{transcription}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Interview;
