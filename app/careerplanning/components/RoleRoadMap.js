"use client";
import { useCallback, useEffect, useState } from "react";
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
  const [branch, setBranch] = useState("Computer Science and Engineering");
  const [level, setLevel] = useState("beginner");
  const [pre, setPre] = useState("");
  const [experience, setExperience] = useState("0-1 years");
  const [interests, setInterests] = useState([]);
  const [careerGoals, setCareerGoals] = useState("");

  const generateDynamicRoadmap = useCallback(async (role, isManual = false) => {
    setLoading(true);

    try {
      // Enhanced prompt for better roadmap generation
      const enhancedPrompt = `
        Create a comprehensive, personalized career roadmap for a ${role} position.

        Context:
        - Branch/Field: ${branch}
        - Experience Level: ${level} (${experience})
        - Career Goals: ${careerGoals || "Professional growth and skill development"}
        - Special Interests: ${interests.length > 0 ? interests.join(", ") : "General career advancement"}

        Please provide a detailed JSON response with the following structure:
        {
          "title": "Career Roadmap for ${role}",
          "introduction": "A personalized introduction for this career path",
          "timeframe": "Overall timeline for career progression",
          "goals": ["Primary career goals as an array"],
          "objectives": ["Specific learning objectives"],
          "phases": [
            {
              "phase": "Phase name",
              "duration": "Time period",
              "description": "What to focus on in this phase",
              "skills": ["Skills to develop"],
              "projects": ["Recommended projects"],
              "resources": ["Learning resources"],
              "milestones": ["Key achievements to aim for"]
            }
          ],
          "skills_by_level": {
            "beginner": ["Entry level skills"],
            "intermediate": ["Mid-level skills"],
            "advanced": ["Senior level skills"]
          },
          "industry_trends": ["Current trends in the field"],
          "challenges": ["Common challenges and how to overcome them"],
          "networking": ["Professional networking opportunities"],
          "certifications": ["Recommended certifications"],
          "salary_progression": "Expected salary growth path",
          "interview_preparation": ["Key interview topics"],
          "continuous_learning": ["Ways to stay updated"]
        }

        Make this roadmap specific, actionable, and tailored to the provided context. Include real-world examples and current industry practices.
      `;

      const roadmapResult = await geminiModel.sendMessage(enhancedPrompt);
      const roadmapText = await roadmapResult.response.text();

      let roadmapJSON;
      try {
        roadmapJSON = JSON.parse(roadmapText.replace(/```json|```/g, '').trim());
      } catch (parseError) {
        console.log('JSON parse failed, creating enhanced fallback roadmap');
        roadmapJSON = createEnhancedFallbackRoadmap(role);
      }

      // Generate prerequisite course information
      const prePrompt = `
        Provide comprehensive prerequisite information for starting a career in ${role}.
        Include foundation knowledge, recommended courses, and preparation steps.
        Format as JSON with this structure:
        {
          "title": "Prerequisites for ${role}",
          "foundation_knowledge": ["Basic concepts to understand"],
          "recommended_courses": [
            {
              "course": "Course name",
              "provider": "Platform/Provider",
              "duration": "Time to complete",
              "difficulty": "Beginner/Intermediate/Advanced",
              "url": "Course URL if available"
            }
          ],
          "preparation_steps": ["Steps to take before starting"],
          "estimated_prep_time": "Time needed for preparation",
          "free_resources": ["Free learning materials"],
          "books": ["Recommended books"],
          "practice_platforms": ["Where to practice skills"]
        }
      `;

      const preResult = await geminiModel.sendMessage(prePrompt);
      const preText = await preResult.response.text();

      let preJSON;
      try {
        preJSON = JSON.parse(preText.replace(/```json|```/g, '').trim());
      } catch (parseError) {
        console.log('Pre-course JSON parse failed, using enhanced fallback');
        preJSON = createPrecourseFallback(role);
      }

      setSubmittedValue(roadmapJSON);
      setPre(preJSON);

      // Save to localStorage with enhanced data
      const localKey = isManual ? `roadmap_manual_${Date.now()}` : 'roadmap';
      localStorage.setItem(
        localKey,
        JSON.stringify({
          role,
          branch,
          level,
          experience,
          interests,
          careerGoals,
          roadmap: roadmapJSON,
          precourse: preJSON,
          timestamp: new Date().toISOString()
        })
      );

      setTree(true);
    } catch (error) {
      console.error("Error generating roadmap:", error);
      const fallbackRoadmap = createEnhancedFallbackRoadmap(role);
      setSubmittedValue(fallbackRoadmap);
      setPre(createPrecourseFallback(role));
      setTree(true);
    }

    setLoading(false);
  }, [branch, level, experience, interests, careerGoals]);

  useEffect(() => {
    const roadmap = localStorage.getItem("roadmap");
    const storedRole = localStorage.getItem("role");

    if (roadmap) {
      try {
        const parsedRoadmap = JSON.parse(roadmap);
        setRoadmap(parsedRoadmap.roadmap);
        setPre(parsedRoadmap.precourse);
        setSubmittedValue(parsedRoadmap.roadmap);
        setTree(true);
      } catch (error) {
        console.error("Error parsing stored roadmap:", error);
        localStorage.removeItem("roadmap");
      }
    } else if (storedRole) {
      setInputValue(storedRole);
      setSubmittedValue(storedRole);
      generateDynamicRoadmap(storedRole);
    }
  }, [generateDynamicRoadmap]);

  const createEnhancedFallbackRoadmap = (role) => ({
    title: `Career Roadmap for ${role}`,
    introduction: `Welcome to your comprehensive ${role} career roadmap. This personalized guide will help you navigate your journey with confidence and strategic planning.`,
    timeframe: "12-36 months for significant career advancement",
    goals: [
      `Master ${role} fundamentals and best practices`,
      "Build a strong professional portfolio",
      "Develop industry connections and network",
      "Achieve career growth and competitive compensation"
    ],
    objectives: [
      "Complete foundational learning with hands-on practice",
      "Build and showcase real-world projects",
      "Gain industry experience and mentorship",
      "Develop leadership and communication skills"
    ],
    phases: [
      {
        phase: "Foundation Building",
        duration: "3-6 months",
        description: "Establish core knowledge and basic skills",
        skills: ["Core technical skills", "Problem-solving methodology", "Industry awareness"],
        projects: [`Basic ${role} project`, "Tutorial-based exercises", "Simple portfolio pieces"],
        resources: ["Online courses", "Documentation", "Community forums"],
        milestones: ["Complete foundational courses", "Build first project", "Join professional communities"]
      },
      {
        phase: "Skill Development",
        duration: "6-12 months",
        description: "Advance technical abilities and practical experience",
        skills: ["Advanced technical concepts", "Project management", "Team collaboration"],
        projects: ["Intermediate complexity projects", "Open source contributions", "Team collaborations"],
        resources: ["Advanced courses", "Industry publications", "Mentorship programs"],
        milestones: ["Complete intermediate projects", "Start networking", "Gain practical experience"]
      },
      {
        phase: "Professional Growth",
        duration: "12+ months",
        description: "Specialize and take on leadership responsibilities",
        skills: ["Domain expertise", "Leadership abilities", "Strategic thinking"],
        projects: ["Complex real-world projects", "Innovation initiatives", "Mentoring others"],
        resources: ["Industry conferences", "Professional certifications", "Thought leadership content"],
        milestones: ["Achieve specialization", "Lead projects", "Mentor others"]
      }
    ],
    skills_by_level: {
      beginner: ["Basic technical knowledge", "Communication skills", "Learning agility"],
      intermediate: ["Advanced technical skills", "Project management", "Team leadership"],
      advanced: ["Expert-level knowledge", "Strategic planning", "Innovation leadership"]
    },
    industry_trends: ["Current technology trends", "Market demands", "Future opportunities"],
    challenges: ["Staying current with technology", "Building experience", "Finding mentorship"],
    networking: ["Professional associations", "Industry events", "Online communities"],
    certifications: ["Industry-recognized certifications", "Skill-specific credentials"],
    salary_progression: "Entry level to senior positions with 50-200% growth potential",
    interview_preparation: ["Technical assessments", "Behavioral questions", "Portfolio presentation"],
    continuous_learning: ["Regular skill updates", "Industry news", "Professional development"]
  });

  const createPrecourseFallback = (role) => ({
    title: `Prerequisites for ${role}`,
    foundation_knowledge: [
      `Basic understanding of ${role} field and industry`,
      "Problem-solving and analytical thinking",
      "Communication and collaboration skills",
      "Basic computer literacy and digital skills"
    ],
    recommended_courses: [
      {
        course: `Introduction to ${role}`,
        provider: "Various online platforms",
        duration: "4-8 weeks",
        difficulty: "Beginner",
        url: "Multiple options available"
      },
      {
        course: "Fundamentals of Technology",
        provider: "Online learning platforms",
        duration: "2-4 weeks",
        difficulty: "Beginner",
        url: "Check Coursera, edX, or Udemy"
      }
    ],
    preparation_steps: [
      "Assess current knowledge and skills",
      "Set clear learning goals and timeline",
      "Create a dedicated learning environment",
      "Join relevant online communities",
      "Start with basic concepts and gradually advance"
    ],
    estimated_prep_time: "4-12 weeks depending on background",
    free_resources: [
      "YouTube educational channels",
      "Free online courses and tutorials",
      "Documentation and guides",
      "Community forums and discussions"
    ],
    books: [
      `Essential ${role} handbook`,
      "Industry best practices guide",
      "Career development resources"
    ],
    practice_platforms: [
      "Online coding platforms",
      "Project-based learning sites",
      "Industry-specific tools and simulators"
    ]
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setSubmittedValue(inputValue);
    await generateDynamicRoadmap(inputValue, true);
  };

  const handleInterestChange = (interest) => {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const availableInterests = [
    "Frontend Development", "Backend Development", "Mobile Apps",
    "Data Science", "Machine Learning", "Cloud Computing",
    "Cybersecurity", "DevOps", "UI/UX Design", "Project Management"
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-blue-400 p-4">
      {!tree ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl mt-8"
        >
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            🚀 AI-Powered Career Roadmap Generator
          </h1>

          {/* Role Input */}
          <div className="mb-6">
            <label
              htmlFor="userInput"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              What&apos;s your target role? ✨
            </label>
            <input
              type="text"
              id="userInput"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="e.g., Data Scientist, Full Stack Developer, Product Manager..."
              required
            />
          </div>

          {/* Branch/Field Selection */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Field/Branch 🎯
            </label>
            <select
              onChange={(e) => setBranch(e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={branch}
            >
              <option value="Computer Science and Engineering">Computer Science & Engineering</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Data Science">Data Science</option>
              <option value="Business and Management">Business & Management</option>
              <option value="Design and Creative">Design & Creative</option>
              <option value="Marketing and Sales">Marketing & Sales</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Finance">Finance</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Experience Level */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Experience Level 📊
              </label>
              <select
                onChange={(e) => setLevel(e.target.value)}
                className="w-full p-4 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={level}
              >
                <option value="beginner">Beginner (0-1 years)</option>
                <option value="intermediate">Intermediate (1-3 years)</option>
                <option value="advanced">Advanced (3-5 years)</option>
                <option value="expert">Expert (5+ years)</option>
              </select>
            </div>

            {/* Experience Duration */}
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Current Experience ⏱️
              </label>
              <select
                onChange={(e) => setExperience(e.target.value)}
                className="w-full p-4 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={experience}
              >
                <option value="0-1 years">0-1 years</option>
                <option value="1-3 years">1-3 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5-10 years">5-10 years</option>
                <option value="10+ years">10+ years</option>
              </select>
            </div>
          </div>

          {/* Career Goals */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Career Goals 🎯
            </label>
            <textarea
              value={careerGoals}
              onChange={(e) => setCareerGoals(e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="What do you want to achieve in your career? (e.g., become a team lead, start a company, specialize in AI...)"
              rows="3"
            />
          </div>

          {/* Interests */}
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-semibold mb-3">
              Areas of Interest 💡 (Select multiple)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {availableInterests.map((interest) => (
                <label key={interest} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={interests.includes(interest)}
                    onChange={() => handleInterestChange(interest)}
                    className="mr-2 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{interest}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-4 rounded-lg text-white font-bold text-lg transition duration-200 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105"
            }`}
            disabled={loading || !inputValue.trim()}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Your Personalized Roadmap...
              </div>
            ) : (
              "🚀 Generate My AI Roadmap"
            )}
          </button>

          <p className="text-center text-gray-600 text-sm mt-4">
            Powered by advanced AI to create personalized learning paths
          </p>
        </form>
      ) : (
        <div className="w-full max-w-6xl">
          <div className="mb-6 text-center">
            <button
              onClick={() => {
                setTree(false);
                localStorage.removeItem('roadmap');
                setSubmittedValue('');
                setPre('');
                setInputValue('');
                setCareerGoals('');
                setInterests([]);
              }}
              className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-bold transition duration-200 transform hover:scale-105 shadow-lg"
            >
              ✨ Generate New Roadmap
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
