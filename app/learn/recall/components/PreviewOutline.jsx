import { Book, CheckCircle, ChevronRight, Code, Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../../../components/ui/button";
import {
  AiFlashCard, AiNotesSection, AiQueAns,
  AiQuizRecall,
  AiTeachToOther
} from '../../../../config/AiModels';

const SyllabusOutline = () => {
  const [activeChapter, setActiveChapter] = useState(null);
  const [loading, setLoading] = useState({
    notes: false,
    flashcard: false,
    quiz: false,
    qa: false,
    teachToOther: false,
  });

  const [mcq, setMcq] = useState("");

  const [state, setState] = useState({
    notes: false,
    flashcard: false,
    quiz: false,
  });

  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    // Initialize courseData from localStorage only on client side
    if (typeof window !== 'undefined') {
      const syllabusData = localStorage.getItem("RecallSyllabus");
      if (syllabusData) {
        setCourseData(JSON.parse(syllabusData));
      }
    }
  }, []);

  useEffect(() => {
    // Initialize state from localStorage only on client side
    if (typeof window !== 'undefined') {
      const notes = localStorage.getItem("combinedChapterNotesRecall");
      const flashcard = localStorage.getItem("combinedChapterFlashCard");
      const quiz = localStorage.getItem("combinedChapterQuiz");
      const qa = localStorage.getItem("combinedChapterQA");
      const teachToOther = localStorage.getItem("teachToOther");
      setState((prevState) => ({
        ...prevState,
        notes: !!notes,
        flashcard: !!flashcard,
        quiz: !!quiz,
        qa: !!qa,
        teachToOther: !!teachToOther,
      }));
    }
  }, []);

  const generateNotes = async () => {
    setLoading((prevState) => ({
      ...prevState,
      notes: true,
    }));
    const combinedResponses = [];
    if (courseData?.chapters && Array.isArray(courseData.chapters)) {
      for (const [index, chapterContent] of courseData.chapters.entries()) {
        const total = index + 1;
        const prompt = `Generate interview preparation notes material in detail content for each chapter, Make sure to includes all topic point in the content, make sure to give content in HTML format and style (Do not Add HTML, Head, Body, title tag),The chapters: ${JSON.stringify(
          chapterContent
        )}`;
        if (index <= total) {
          try {
            const result = await AiNotesSection.sendMessage(prompt);
          const responseText = await result.response.text();
          console.log(responseText);
          combinedResponses.push(responseText);
          setState((prevState) => ({
            ...prevState,
            notes: true,
          }));
        } catch (error) {
          console.error(error);
        }
      }
    }

    if (combinedResponses.length === courseData.chapters.length) {
      localStorage.setItem(
        "combinedChapterNotesRecall",
        JSON.stringify(combinedResponses)
      );
      console.log("notes completed");
    } else {
      alert("content not ganeate for course please regenerate");
    }
    setLoading((prevState) => ({
      ...prevState,
      notes: false,
    }));
  };

  const generateFlashCards = async () => {
    setLoading((prevState) => ({
      ...prevState,
      flashcard: true,
    }));
    const combinedResponses = [];
    if (courseData?.chapters && Array.isArray(courseData.chapters)) {
      for (const [index, chapterContent] of courseData.chapters.entries()) {
        const total = index + 1;
        const prompt = `generate the flashcard on course:${courseData.courseTitle},topic:${chapterContent.chapterTitle}.in json formate with front back content,maximum 5.`;
        if (index <= total) {
          try {
            const result = await AiFlashCard.sendMessage(prompt);
          const responseText = await result.response.text();
          const jsonformate = JSON.parse(responseText);
          console.log(jsonformate);
          combinedResponses.push(jsonformate);
        } catch (error) {
          console.error(error);
        }
      }
    }

    if (combinedResponses.length === courseData.chapters.length) {
      localStorage.setItem(
        "combinedChapterFlashCard",
        JSON.stringify(combinedResponses)
      );
      setState((prevState) => ({
        ...prevState,
        flashcard: true,
      }));
      console.log("flash card completed");
    } else {
      alert("content not ganeate for course please regenerate");
    }
    setLoading((prevState) => ({
      ...prevState,
      flashcard: false,
    }));
  };

  const generateQuiz = async () => {
    setLoading((prevState) => ({
      ...prevState,
      quiz: true,
    }));
    const combinedResponses = [];
    if (courseData?.chapters && Array.isArray(courseData.chapters)) {
      for (const [index, chapterContent] of courseData.chapters.entries()) {
        const total = index + 1;
        const prompt = `generate Scenario-Based Approach,Problem-Solving Approach,filll-in-the blank style,Comparison Question,Interactive Code-Based Question(if applicable),Real-World Analogy based quiz on topic:${chapterContent.chapterTitle} of course:${courseData.courseTitle}.include question,option,coorect_answer,explanation.in json formate.`;
        if (index <= total) {
          try {
          const result = await AiQuizRecall.sendMessage(prompt);
          const responseText = await result.response.text();
          const jsonformate = JSON.parse(responseText);
          console.log(jsonformate);
          combinedResponses.push(jsonformate);
        } catch (error) {
          console.error(error);
        }
      }
    }

    if (combinedResponses.length === courseData.chapters.length) {
      setMcq(combinedResponses);
      localStorage.setItem(
        "combinedChapterQuiz",
        JSON.stringify(combinedResponses)
      );
      setState((prevState) => ({
        ...prevState,
        quiz: true,
      }));
      console.log("quiz completed");
    } else {
      alert("content not ganeate for course please regenerate");
    }
    setLoading((prevState) => ({
      ...prevState,
      quiz: false,
    }));
  };

  const generateQA = async () => {
    setLoading((prevState) => ({
      ...prevState,
      qa: true,
    }));
    const prompt = `Generate a list of the most commonly asked interview questions and answers on topic:${courseData.courseTitle}. Include categories like behavioral, technical, problem-solving, and role-specific questions. Focus on questions that test a candidate's skills, experience, and personality traits, ensuring they apply to both entry-level and experienced positions. Provide concise, professional phrasing for each question.in json formate.`;
    try {
      const result = await AiQueAns.sendMessage(prompt);
      const responseText = await result.response.text();
      const jsonformate = JSON.parse(responseText);
      console.log(jsonformate);
      localStorage.setItem("combinedChapterQA", JSON.stringify(jsonformate));
      setState((prevState) => ({
        ...prevState,
        qa: true,
      }));
      console.log("QA completed");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading((prevState) => ({
        ...prevState,
        qa: false,
      }));
    }
    // window.location.reload();
  };

  const teachToOther = async () => {
    setLoading((prevState) => ({
      ...prevState,
      teachToOther: true,
    }));
    const prompt = `You are an advanced AI trained to generate educational questions for a 'learn-by-teaching' module. Your task is to create five types of questions and key_topics:topics to be cover in that, for a given topic to help students deepen their understanding by teaching others. The question types include: Conceptual Understanding, Application-Based, Problem-Solving, Reflective, and Open-Ended Exploration.
    For the topic:${courseData.courseTitle}, generate one question for each type.in json formate.`;
    try {
      const result = await AiTeachToOther.sendMessage(prompt);
      const responseText = await result.response.text();
      const jsonformate = JSON.parse(responseText);
      console.log(jsonformate);
      localStorage.setItem("teachToOther", JSON.stringify(jsonformate));
      setState((prevState) => ({
        ...prevState,
        teachToOther: true,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      console.log("teachToOther completed");
      setLoading((prevState) => ({
        ...prevState,
        teachToOther: false,
      }));
    }
  };

  // Show loading state when courseData is not available
  if (!courseData) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 flex flex-col justify-center items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-blue-700/30 blur-3xl"></div>
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white">Loading Course Content...</h2>
          <p className="text-white/70 mt-2">Please wait while we prepare your learning materials</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 flex flex-col">
        {/* Background Blurs */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-blue-700/30 blur-3xl"></div>

        <div className="relative z-10 container mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
          {/* Course Overview */}
          <div className="md:col-span-2 bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
            <h1 className="text-4xl font-extrabold mb-6 bg-clip-text text-white text-transparent bg-gradient-to-r from-blue-300 to-blue-100">
              {courseData?.courseTitle || "Course Title"}
            </h1>

            <p className="text-xl text-white mb-8 opacity-90">
              {courseData?.courseSummary || "Course summary will appear here..."}
            </p>

            {/* Chapters List */}
            <div className="space-y-4">
              {courseData?.chapters?.map((chapter, index) => (
                <div
                  key={index}
                  onClick={() => setActiveChapter(index)}
                  className={`cursor-pointer p-4 rounded-xl transition-all duration-300 ${
                    activeChapter === index
                      ? "bg-white/20 border border-white/30"
                      : "hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Book className="text-white" size={24} />
                      <h3 className="text-xl font-semibold text-white">
                        {chapter.chapterTitle}
                      </h3>
                    </div>
                    <ChevronRight
                      className={`text-blue-200 transition-transform ${
                        activeChapter === index ? "rotate-90" : ""
                      }`}
                      size={24}
                    />
                  </div>

                  {activeChapter === index && (
                    <div className="mt-4 space-y-2">
                      <p className="text-white opacity-80 mb-4">
                        {chapter?.chapterSummary}
                      </p>
                      {chapter?.topics?.map((topic, topicIndex) => (
                        <div
                          key={topicIndex}
                          className="flex items-center space-x-3 text-white"
                        >
                          <CheckCircle className="text-white" size={16} />
                          <span>{topic}</span>
                        </div>
                      ))}
                      {state.notes && (
                        <div className="flex justify-end space-x-3 font-bold">
                          <Button
                            className="font-bold"
                            variant="outline"
                            onClick={() => {
                              window.location.href = `/learn/recall/start?value=0&chapter=${
                                index + 1
                              }`;
                            }}
                            disabled={
                              loading.notes ||
                              loading.flashcard ||
                              loading.quiz ||
                              loading.qa ||
                              loading.teachToOther
                            }
                          >
                            View Notes
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Course Details Sidebar */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-xl">
              <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-100">
                Course Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Terminal className="text-blue-300" size={24} />
                  <span className="text-white">
                    {courseData?.chapters?.length} Comprehensive Chapters
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Code className="text-blue-300" size={24} />
                  <span className="text-white">Practical Coding Exercises</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Book className="text-blue-300" size={24} />
                  <span className="text-white">Interview-Focused Content</span>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <button
              className="w-full group relative px-8 py-4 bg-white text-blue-900 font-semibold rounded-full
              hover:bg-blue-50 transition-all duration-300 ease-in-out
              flex items-center justify-center space-x-3
              before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-300 before:to-blue-500
              before:opacity-0 hover:before:opacity-20 before:rounded-full
              before:transition-all before:duration-300 before:ease-in-out
              shadow-xl hover:shadow-2xl"
              onClick={() => {
                state.notes
                  ? (window.location.href =
                      "/learn/recall/start?value=0&chapter=1")
                  : generateNotes();
              }}
              disabled={
                loading.notes ||
                loading.flashcard ||
                loading.quiz ||
                loading.qa ||
                loading.teachToOther
              }
            >
              {loading.notes ? (
                <div className="flex items-center gap-3">
                  <span>Generating...</span>
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="flex items-center">
                  <span>
                    {state.notes ? "View Notes 📝" : "Generate Notes 📝"}
                  </span>
                  <ChevronRight
                    className="transition-transform group-hover:translate-x-1"
                    size={20}
                  />
                </div>
              )}
            </button>
            <button
              className="w-full group relative px-8 py-4 bg-white text-blue-900 font-semibold rounded-full
              hover:bg-blue-50 transition-all duration-300 ease-in-out
              flex items-center justify-center space-x-3
              before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-300 before:to-blue-500
              before:opacity-0 hover:before:opacity-20 before:rounded-full
              before:transition-all before:duration-300 before:ease-in-out
              shadow-xl hover:shadow-2xl"
              onClick={() => {
                state.flashcard
                  ? (window.location.href =
                      "/learn/recall/start?value=1&chapter=1")
                  : generateFlashCards();
              }}
              disabled={
                loading.notes ||
                loading.flashcard ||
                loading.quiz ||
                loading.qa ||
                loading.teachToOther
              }
            >
              {loading.flashcard ? (
                <div className="flex items-center gap-3">
                  <span>Generating...</span>
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="flex items-center">
                  <span>
                    {state.flashcard
                      ? "View Flash Cards 🎴"
                      : "Generate Flash Cards 🎴"}
                  </span>
                  <ChevronRight
                    className="transition-transform group-hover:translate-x-1"
                    size={20}
                  />
                </div>
              )}
            </button>
            <button
              className="w-full group relative px-8 py-4 bg-white text-blue-900 font-semibold rounded-full
              hover:bg-blue-50 transition-all duration-300 ease-in-out
              flex items-center justify-center space-x-3
              before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-300 before:to-blue-500
              before:opacity-0 hover:before:opacity-20 before:rounded-full
              before:transition-all before:duration-300 before:ease-in-out
              shadow-xl hover:shadow-2xl"
              onClick={() => {
                state.quiz
                  ? (window.location.href =
                      "/learn/recall/start?value=2&chapter=1")
                  : generateQuiz();
              }}
              disabled={
                loading.notes ||
                loading.flashcard ||
                loading.quiz ||
                loading.qa ||
                loading.teachToOther
              }
            >
              {loading.quiz ? (
                <div className="flex items-center gap-3">
                  <span>Generating...</span>
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="flex items-center">
                  <span>
                    {state.quiz ? "View MCQs 🚀" : "Generate MCQs 🚀"}
                  </span>
                  <ChevronRight
                    className="transition-transform group-hover:translate-x-1"
                    size={20}
                  />
                </div>
              )}
            </button>
            <button
              className="w-full group relative px-8 py-4 bg-white text-blue-900 font-semibold rounded-full
              hover:bg-blue-50 transition-all duration-300 ease-in-out
              flex items-center justify-center space-x-3
              before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-300 before:to-blue-500
              before:opacity-0 hover:before:opacity-20 before:rounded-full
              before:transition-all before:duration-300 before:ease-in-out
              shadow-xl hover:shadow-2xl"
              onClick={() => {
                state.qa
                  ? (window.location.href = "/learn/recall/start?value=4")
                  : generateQA();
              }}
              disabled={
                loading.notes ||
                loading.flashcard ||
                loading.quiz ||
                loading.qa ||
                loading.teachToOther
              }
            >
              {loading.qa ? (
                <div className="flex items-center gap-3">
                  <span>Generating...</span>
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="flex items-center">
                  <span>{state.qa ? "View QA ❔" : "Generate QA ❔"}</span>
                  <ChevronRight
                    className="transition-transform group-hover:translate-x-1"
                    size={20}
                  />
                </div>
              )}
            </button>
            <button
              className="w-full group relative px-8 py-4 bg-white text-blue-900 font-semibold rounded-full
              hover:bg-blue-50 transition-all duration-300 ease-in-out
              flex items-center justify-center space-x-3
              before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-300 before:to-blue-500
              before:opacity-0 hover:before:opacity-20 before:rounded-full
              before:transition-all before:duration-300 before:ease-in-out
              shadow-xl hover:shadow-2xl"
              onClick={() => {
                state.teachToOther
                  ? (window.location.href = "/learn/recall/start?value=3")
                  : teachToOther();
              }}
              disabled={
                loading.notes ||
                loading.flashcard ||
                loading.quiz ||
                loading.qa ||
                loading.teachToOther
              }
            >
              {loading.teachToOther ? (
                <div className="flex items-center gap-3">
                  <span>Generating...</span>
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="flex items-center">
                  <span>
                    {state.teachToOther
                      ? "View Teach to Other 🧑‍🏫"
                      : "Teach to Other 🧑‍🏫"}
                  </span>
                  <ChevronRight
                    className="transition-transform group-hover:translate-x-1"
                    size={20}
                  />
                </div>
              )}
            </button>
          </div>
        </div>

      </div>
    </>
  );
};

export default SyllabusOutline;
