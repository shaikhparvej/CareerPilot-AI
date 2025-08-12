"use client";
import { useEffect, useState } from "react";
import { geminiModel } from '../../../config/AiModels';
import LoadingDialog from "../../components/LoadingDialog";
import Precourse from "./Precourse";
import StudentRoadMap from "./RoadMap";

export default function RoleRoadMap() {
  const [inputValue, setInputValue] = useState("");
  const [submittedValue, setSubmittedValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [tree, setTree] = useState(false);
  const [roadmap, setRoadmap] = useState("");
  const [branch, setBranch] = useState(""); // Optional: remove if not needed
  const [level, setLevel] = useState("beginner");
  const [pre, setPre] = useState("");

  useEffect(() => {
    const roadmap = localStorage.getItem("roadmap");
    const storedRole = localStorage.getItem("role");

    if (roadmap) {
      setRoadmap(roadmap);
      setTree(true);
    } else if (storedRole) {
      // Auto-set the role from assessment and auto-generate roadmap
      setInputValue(storedRole);
      setSubmittedValue(storedRole);
      // Auto-trigger roadmap generation
      const autoGenerateRoadmap = async () => {
        setLoading(true);

        const localKey = `roadmap`;
        const storedData = localStorage.getItem(localKey);
        const BASIC_PROMPT = `Create a comprehensive career roadmap for ${storedRole}. Include: introduction, goals, objectives, stages, topics, subtopics, time required, real-world projects, challenges, resources, and skills required to master. Format as JSON with clear structure.`;

        try {
          if (storedData) {
            const parsed = JSON.parse(storedData);
            setSubmittedValue(parsed.roadmap);
            setPre(parsed.precourse);
            setTree(true);
            setLoading(false);
            return;
          }

          // Generate roadmap via AI
          const roadmapResult = await geminiModel.sendMessage(BASIC_PROMPT);
          const roadmapText = await roadmapResult.response.text();

          // Parse JSON with fallback
          let roadmapJSON;
          try {
            roadmapJSON = JSON.parse(roadmapText);
          } catch (parseError) {
            console.log('JSON parse failed, using fallback roadmap structure');
            roadmapJSON = {
              introduction: `Welcome to your ${storedRole} career roadmap. This comprehensive guide will help you navigate your journey in this exciting field.`,
              goals: [`Master ${storedRole} fundamentals`, `Build practical experience`, `Develop professional network`],
              objectives: [`Complete foundational learning`, `Build portfolio projects`, `Gain industry experience`],
              stages: [
                {
                  stage: "Foundation",
                  duration: "3-6 months",
                  topics: [`${storedRole} Basics`, "Industry Overview", "Core Concepts"],
                  skills: ["Basic theoretical knowledge", "Problem-solving mindset"]
                },
                {
                  stage: "Intermediate",
                  duration: "6-12 months",
                  topics: ["Advanced Concepts", "Practical Applications", "Project Work"],
                  skills: ["Technical proficiency", "Project management"]
                },
                {
                  stage: "Advanced",
                  duration: "12+ months",
                  topics: ["Specialization", "Leadership", "Innovation"],
                  skills: ["Expert-level knowledge", "Mentoring abilities"]
                }
              ],
              resources: ["Online courses", "Industry publications", "Professional communities", "Certification programs"],
              challenges: ["Keeping up with technology", "Building experience", "Finding mentorship"],
              projects: [`Beginner ${storedRole} project`, `Intermediate portfolio piece`, `Advanced capstone project`]
            };
          }

          setSubmittedValue(roadmapJSON);

          const prePrompt = `Provide a list of prerequisite knowledge and skills needed before starting a career in ${storedRole}. Format as JSON with clear categories.`;
          const preResult = await geminiModel.sendMessage(prePrompt);
          const preText = await preResult.response.text();

          let preJSON;
          try {
            preJSON = JSON.parse(preText);
          } catch (parseError) {
            console.log('Pre-course JSON parse failed, using fallback');
            preJSON = {
              prerequisites: [`Basic understanding of ${storedRole} field`, "Problem-solving skills", "Communication skills"],
              recommended_background: ["Relevant education or training", "Basic computer literacy", "Industry awareness"],
              preparation_tips: ["Start with fundamentals", "Practice regularly", "Join professional communities"]
            };
          }

          setPre(preJSON);

          // Save to localStorage
          localStorage.setItem(
            localKey,
            JSON.stringify({
              role: storedRole,
              branch,
              level,
              roadmap: roadmapJSON,
              precourse: preJSON,
            })
          );

          setTree(true);
        } catch (error) {
          console.error("Error generating roadmap:", error);
          // Fallback roadmap on error
          const fallbackRoadmap = {
            introduction: `Your ${storedRole} career roadmap is ready. This guide provides a structured path to success in your chosen field.`,
            goals: [`Build ${storedRole} expertise`, "Gain practical experience", "Advance your career"],
            stages: ["Foundation", "Development", "Mastery"],
            resources: ["Educational materials", "Practice projects", "Professional network"],
            timeframe: "12-24 months for significant progress"
          };
          setSubmittedValue(fallbackRoadmap);
          setTree(true);
        }

        setLoading(false);
      };

      setTimeout(() => {
        autoGenerateRoadmap();
      }, 500);
    }
  }, [branch, level]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const localKey = `roadmap`;
    const BASIC_PROMPT = `generate Simple,Focused,Progressive, and Outcome-Oriented roadmap for ${inputValue} of branch ${branch},include introducation,goal,objective,stages,topic,subtopics,time required,real worldprojects,challenges,resources,skill required to master.in json formate.`;

    try {
      // Clear existing roadmap data to force regeneration
      localStorage.removeItem(localKey);
      setTree(false);

      // Generate roadmap via AI
      const roadmapResult = await geminiModel.sendMessage(BASIC_PROMPT);
      const roadmapText = await roadmapResult.response.text();

      // Parse JSON with fallback
      let roadmapJSON;
      try {
        roadmapJSON = JSON.parse(roadmapText);
      } catch (parseError) {
        console.log('JSON parse failed, using fallback roadmap structure');
        roadmapJSON = {
          introduction: `Welcome to your ${inputValue} career roadmap. This comprehensive guide will help you navigate your journey in this exciting field.`,
          goals: [`Master ${inputValue} fundamentals`, `Build practical experience`, `Develop professional network`],
          objectives: [`Complete foundational learning`, `Build portfolio projects`, `Gain industry experience`],
          stages: [
            {
              stage: "Foundation",
              duration: "3-6 months",
              topics: [`${inputValue} Basics`, "Industry Overview", "Core Concepts"],
              skills: ["Basic theoretical knowledge", "Problem-solving mindset"]
            },
            {
              stage: "Intermediate",
              duration: "6-12 months",
              topics: ["Advanced Concepts", "Practical Applications", "Project Work"],
              skills: ["Technical proficiency", "Project management"]
            },
            {
              stage: "Advanced",
              duration: "12+ months",
              topics: ["Specialization", "Leadership", "Innovation"],
              skills: ["Expert-level knowledge", "Mentoring abilities"]
            }
          ],
          resources: ["Online courses", "Industry publications", "Professional communities", "Certification programs"],
          challenges: ["Keeping up with technology", "Building experience", "Finding mentorship"],
          projects: [`Beginner ${inputValue} project`, `Intermediate portfolio piece`, `Advanced capstone project`]
        };
      }

      setSubmittedValue(roadmapJSON);

      const prePrompt = `give me list of things i want know about befor start courses in "${inputValue}".include .in json formate.`;
      const preResult = await geminiModel.sendMessage(prePrompt);
      const preText = await preResult.response.text();

      let preJSON;
      try {
        preJSON = JSON.parse(preText);
      } catch (parseError) {
        console.log('Pre-course JSON parse failed, using fallback');
        preJSON = {
          prerequisites: [`Basic understanding of ${inputValue} field`, "Problem-solving skills", "Communication skills"],
          recommended_background: ["Relevant education or training", "Basic computer literacy", "Industry awareness"],
          preparation_tips: ["Start with fundamentals", "Practice regularly", "Join professional communities"]
        };
      }

      setPre(preJSON);

      // Save to localStorage
      localStorage.setItem(
        localKey,
        JSON.stringify({
          role: inputValue,
          branch,
          level,
          roadmap: roadmapJSON,
          precourse: preJSON,
        })
      );

      setTree(true);
    } catch (error) {
      console.error("Error generating roadmap:", error);
      // Fallback roadmap on error
      const fallbackRoadmap = {
        introduction: `Your ${inputValue} career roadmap is ready. This guide provides a structured path to success in your chosen field.`,
        goals: [`Build ${inputValue} expertise`, "Gain practical experience", "Advance your career"],
        stages: ["Foundation", "Development", "Mastery"],
        resources: ["Educational materials", "Practice projects", "Professional network"],
        timeframe: "12-24 months for significant progress"
      };
      setSubmittedValue(fallbackRoadmap);
      setTree(true);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-blue-400">
      {!tree ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md mt-8"
        >
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Find Your Best Roadmap
          </h1>
          <div className="mb-6">
            <div className="mb-2">
              <label
                htmlFor="userInput"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Just Give Me Your Role:
              </label>
              <input
                type="text"
                id="userInput"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Enter your topic here..."
                required
              />
            </div>
            <select
              onChange={(e) => setLevel(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              value={level}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-white font-semibold transition duration-200 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Generating..." : "Check Out"}
          </button>
        </form>
      ) : (
        <div className="w-full max-w-4xl">
          <div className="mb-4 text-center">
            <button
              onClick={() => {
                setTree(false);
                localStorage.removeItem('roadmap');
                setSubmittedValue('');
                setPre('');
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition duration-200"
            >
              Generate New Roadmap
            </button>
          </div>
          <Precourse pre={pre} inputValue={inputValue} roadmap={roadmap} />
          <StudentRoadMap roadmap={submittedValue} setTree={setTree} />
        </div>
      )}

      {loading && <LoadingDialog loading={loading} />}
    </div>
  );
}
