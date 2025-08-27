"use client";

import {
    AlertCircle,
    ArrowRight,
    CheckCircle,
    ChevronRight,
    Clock,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card";
import { Progress } from "../../../components/ui/progress";

import { geminiModel } from '../../../config/AiModels';
import Assessment from "./components/Assissment";

const CareerAssessmentPage = () => {
  const [loading, setLoading] = useState(false);
  const [field, setField] = useState("web development");
  const [questions, setQuestions] = useState("");
  const [assessment, setAssessment] = useState(1);
  const [show, setShow] = useState(false);
  const [results, setResults] = useState(false);
  const [finalize, setFinalize] = useState("");
  const [showResult, setShowResult] = useState(false);

  // Store assessments from localStorage in state (SSR-safe)
  const [assessment1, setAssessment1] = useState(null);
  const [assessment2, setAssessment2] = useState(null);
  const [assessment3, setAssessment3] = useState(null);
  const [assessment4, setAssessment4] = useState(null);

  // JSON parsing helper function (same as DepartmentJobs.js)
  const parseAIResponse = (text) => {
    if (!text) return null;

    try {
      // First, try direct JSON parse
      return JSON.parse(text);
    } catch (error) {
      console.log('Direct JSON parse failed, attempting to extract JSON from markdown...');

      try {
        // Remove common markdown formatting
        let cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        // Try to find JSON boundaries with multiple patterns
        const jsonPatterns = [
          /\{[\s\S]*\}/,
          /\[[\s\S]*\]/,
          /\{[^}]*\}[\s\S]*$/m,
          /\[[^\]]*\][\s\S]*$/m
        ];

        for (const pattern of jsonPatterns) {
          const matches = cleanedText.match(pattern);
          if (matches) {
            try {
              const parsed = JSON.parse(matches[0]);
              console.log('Successfully parsed JSON from pattern match');
              return parsed;
            } catch (e) {
              continue;
            }
          }
        }

        // If no pattern works, try to extract content between first { and last }
        const firstBrace = cleanedText.indexOf('{');
        const lastBrace = cleanedText.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
          try {
            const jsonString = cleanedText.slice(firstBrace, lastBrace + 1);
            return JSON.parse(jsonString);
          } catch (e) {
            console.log('Failed to parse extracted JSON');
          }
        }

        // If all else fails, return fallback structure
        console.log('All JSON parsing attempts failed, using fallback');
        return null;
      } catch (e) {
        console.log('JSON extraction failed:', e);
        return null;
      }
    }
  };

  // Function to refresh assessment states from localStorage
  const refreshAssessmentStates = () => {
    if (typeof window === 'undefined') return;

    const a1 = (() => { try { return JSON.parse(window.localStorage.getItem("assessment_1")); } catch { return null; } })();
    const a2 = (() => { try { return JSON.parse(window.localStorage.getItem("assessment_2")); } catch { return null; } })();
    const a3 = (() => { try { return JSON.parse(window.localStorage.getItem("assessment_3")); } catch { return null; } })();
    const a4 = (() => { try { return JSON.parse(window.localStorage.getItem("assessment_4")); } catch { return null; } })();

    setAssessment1(a1);
    setAssessment2(a2);
    setAssessment3(a3);
    setAssessment4(a4);

    // Check if all assessments are completed
    if (a1 && a2 && a3 && a4) {
      setResults(true);
      console.log('All assessments completed, enabling final results');

      // If we're not at assessment 5 yet, move to assessment 5
      const currentAssessment = Number(window.localStorage.getItem("assessment")) || 1;
      if (currentAssessment < 5) {
        setAssessment(5);
        window.localStorage.setItem("assessment", "5");
      }
    } else {
      setResults(false);
    }

    const storedAssessment = window.localStorage.getItem("assessment");
    if (storedAssessment) {
      const assessmentNum = Number(storedAssessment);
      setAssessment(assessmentNum);

      // If stored assessment is 5 but not all assessments are done, go back to appropriate assessment
      if (assessmentNum === 5 && !(a1 && a2 && a3 && a4)) {
        const nextAssessment = !a1 ? 1 : !a2 ? 2 : !a3 ? 3 : !a4 ? 4 : 5;
        setAssessment(nextAssessment);
        window.localStorage.setItem("assessment", nextAssessment.toString());
      }
    }
  };

  useEffect(() => {
    // Guard against SSR
    if (typeof window === 'undefined') return;

    const storedField = window.localStorage.getItem("role");
    const finalizeStored = (() => {
      try { return JSON.parse(window.localStorage.getItem("finalize")); } catch { return null; }
    })();

    if (finalizeStored) setFinalize(finalizeStored);
    if (storedField) setField(storedField);

    // Set up initial state
    refreshAssessmentStates();
  }, []);

  // Listen for localStorage changes and assessment completion
  useEffect(() => {
    const handleStorageChange = () => {
      refreshAssessmentStates();
    };

    // Listen for storage events (though this mainly works across tabs)
    window.addEventListener('storage', handleStorageChange);

    // Also add a custom event listener for same-tab updates
    window.addEventListener('assessmentUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('assessmentUpdated', handleStorageChange);
    };
  }, []);

  const handleAssessment = async () => {
    setLoading(true);
    let prompt = "";

    const prompts = {
      1: `Create a list of yes/no/can't say type questions designed to evaluate someone's passion for ${field}. Include 8-10 questions that assess enthusiasm, genuine interest, excitement about the field, willingness to learn, and engagement with related activities. Format as JSON array where each object has "question" property and "options" property with ["Yes", "No", "Can't Say"] values. Example: [{"question": "Do you find yourself reading about ${field} in your free time?", "options": ["Yes", "No", "Can't Say"]}]`,
      2: `Create a list of yes/no/can't say type questions to assess professional interest in ${field}. Include 8-10 questions about skills assessment, aptitude evaluation, career growth potential, industry demands, and professional development willingness. Format as JSON array where each object has "question" property and "options" property with ["Yes", "No", "Can't Say"] values. Example: [{"question": "Do you feel confident about developing the technical skills required in ${field}?", "options": ["Yes", "No", "Can't Say"]}]`,
      3: `Create a list of yes/no/can't say type questions to evaluate vocation and social contribution in ${field}. Include 8-10 questions about social impact, community contribution, value creation for others, and societal benefit potential. Format as JSON array where each object has "question" property and "options" property with ["Yes", "No", "Can't Say"] values. Example: [{"question": "Do you believe working in ${field} would allow you to make a positive impact on society?", "options": ["Yes", "No", "Can't Say"]}]`,
      4: `Create a list of yes/no/can't say type questions to assess mission, purpose, and impact in ${field}. Include 8-10 questions about personal purpose alignment, long-term impact goals, fulfillment prospects, and life mission compatibility. Format as JSON array where each object has "question" property and "options" property with ["Yes", "No", "Can't Say"] values. Example: [{"question": "Does pursuing a career in ${field} align with your personal life mission?", "options": ["Yes", "No", "Can't Say"]}]`,
    };

    prompt = prompts[assessment];

    try {
      const result = await geminiModel.sendMessage(prompt);
      const text = await result.response.text();
      console.log('Raw AI response:', text.substring(0, 200) + '...');

      const parsedQuestions = parseAIResponse(text);

      if (parsedQuestions && Array.isArray(parsedQuestions) && parsedQuestions.length > 0) {
        setQuestions(parsedQuestions);
        setShow(true);
        console.log('Successfully parsed questions:', parsedQuestions.length);
      } else {
        // Fallback questions if parsing fails
        console.log('Using fallback questions for assessment', assessment);
        const fallbackQuestions = getFallbackQuestions(assessment, field);
        setQuestions(fallbackQuestions);
        setShow(true);
      }
    } catch (error) {
      console.error('Error in handleAssessment:', error);
      // Use fallback questions on any error
      const fallbackQuestions = getFallbackQuestions(assessment, field);
      setQuestions(fallbackQuestions);
      setShow(true);
    } finally {
      setLoading(false);
    }
  };

  // Fallback questions function
  const getFallbackQuestions = (assessmentType, field) => {
    const baseQuestions = {
      1: [ // Passion Assessment
        {
          question: `Do you find yourself naturally drawn to learning about ${field}?`,
          options: ["Yes", "No", "Can't Say"]
        },
        {
          question: `Would you be excited to work on projects related to ${field}?`,
          options: ["Yes", "No", "Can't Say"]
        },
        {
          question: `Do you enjoy discussing ${field} topics with others?`,
          options: ["Yes", "No", "Can't Say"]
        },
        {
          question: `Would you pursue ${field} even if it required significant effort?`,
          options: ["Yes", "No", "Can't Say"]
        },
        {
          question: `Do you feel energized when learning about ${field}?`,
          options: ["Yes", "No", "Can't Say"]
        },
        {
          question: `Would you read about ${field} in your free time?`,
          options: ["Yes", "No", "Can't Say"]
        },
        {
          question: `Do you see yourself working in ${field} for the long term?`,
          options: ["Yes", "No", "Can't Say"]
        },
        {
          question: `Would you recommend ${field} to others who share your interests?`,
          options: ["Yes", "No", "Can't Say"]
        }
      ],
      2: [ // Profession Assessment
        {
          question: `Do you believe you have the aptitude for ${field}?`,
          options: ["Yes", "No", "Can't Say"]
        },
        {
          question: `Are you confident about developing skills required in ${field}?`,
          options: ["Yes", "No", "Can't Say"]
        },
        {
          question: `Do you see good career growth opportunities in ${field}?`,
          options: ["Yes", "No", "Can't Say"]
        },
        {
          question: `Would you be willing to continuously learn and adapt in ${field}?`,
          options: ["Yes", "No", "Can't Say"]
        },
        {
          question: `Do you think ${field} offers good professional prospects?`,
          options: ["Yes", "No", "Can't Say"]
        },
        {
          question: `Are you prepared to meet the professional demands of ${field}?`,
          options: ["Yes", "No", "Can't Say"]
        },
        {
          question: `Do you believe you can excel professionally in ${field}?`,
          options: ["Yes", "No", "Can't Say"]
        },
        {
          question: `Would you invest time and resources to build expertise in ${field}?`,
          options: ["Yes", "No", "Can't Say"]
        }
      ],
      3: [ // Vocation Assessment
        {
          question: `Do you believe working in ${field} would benefit society?`,
          options: ["Yes", "No", "Can't Say"]
        },
        {
          question: `Would you feel fulfilled contributing to ${field}?`,
          options: ["Yes", "No", "Can't Say"]
        },
        {
          question: `Do you see ${field} as a way to help others?`,
          options: ["Yes", "No", "Can't Say"]
        },
        {
          question: `Would ${field} allow you to make a positive impact?`,
          options: ["Yes", "No", "Can't Say"]
        },
        {
          question: `Do you value the social contribution aspect of ${field}?`,
          options: ["Yes", "No", "Can't Say"]
        },
        {
          question: `Would you be proud to tell others you work in ${field}?`,
          options: ["Yes", "No", "Can't Say"]
        },
        {
          question: `Do you see ${field} as meaningful work?`,
          options: ["Yes", "No", "Can't Say"]
        },
        {
          question: `Would working in ${field} align with your values?`,
          options: ["Yes", "No", "Can't Say"]
        }
      ],
      4: [ // Mission Assessment
        {
          question: `Does pursuing ${field} align with your personal life mission?`,
          options: ["Yes", "No", "Can't Say"]
        },
        {
          question: `Would ${field} help you achieve your long-term goals?`,
          options: ["Yes", "No", "Can't Say"]
        },
        {
          question: `Do you see ${field} as part of your life's purpose?`,
          options: ["Yes", "No", "Can't Say"]
        },
        {
          question: `Would working in ${field} bring you deep satisfaction?`,
          options: ["Yes", "No", "Can't Say"]
        },
        {
          question: `Do you believe ${field} would fulfill your sense of purpose?`,
          options: ["Yes", "No", "Can't Say"]
        },
        {
          question: `Would you feel proud of your impact through ${field}?`,
          options: ["Yes", "No", "Can't Say"]
        },
        {
          question: `Does ${field} resonate with your core beliefs and values?`,
          options: ["Yes", "No", "Can't Say"]
        },
        {
          question: `Would pursuing ${field} feel like following your calling?`,
          options: ["Yes", "No", "Can't Say"]
        }
      ]
    };

    return baseQuestions[assessmentType] || [];
  };

  const handleFinalResult = async () => {
    if (finalize) {
      setShowResult(true);
    } else {
      setLoading(true);

  const prompt = `Determine whether the ${field} field is the best career path based on the conclusions of passion, profession, vocation, and mission:
    {
  passion_conclusion: ${assessment1?.conclusion},
  profession_conclusion: ${assessment2?.conclusion},
  vocation_conclusion: ${assessment3?.conclusion},
  mission_conclusion: ${assessment4?.conclusion}
    }
    Provide final result, suggestion, recommendation, and conclusion in JSON format with properties: result, suggestion, recommendation, conclusion.`;

      try {
        const result = await geminiModel.sendMessage(prompt);
        const text = await result.response.text();
        console.log('Raw final result response:', text.substring(0, 200) + '...');

        const parsedResult = parseAIResponse(text);

        if (parsedResult) {
          setFinalize(parsedResult);
          if (typeof window !== 'undefined') {
            window.localStorage.setItem("finalize", JSON.stringify(parsedResult));
          }
          setShowResult(true);
        } else {
          // Fallback final result
          console.log('Using fallback final result');
          const fallbackResult = {
            result: `Based on your assessment responses, ${field} shows promise as a career path.`,
            suggestion: `Continue exploring ${field} through additional research, networking, and hands-on experience.`,
            recommendation: `Consider pursuing educational opportunities and practical projects in ${field} to validate your interest and aptitude.`,
            conclusion: `Your assessment indicates potential alignment with ${field}. Take time to explore this field further before making final career decisions.`
          };
          setFinalize(fallbackResult);
          if (typeof window !== 'undefined') {
            window.localStorage.setItem("finalize", JSON.stringify(fallbackResult));
          }
          setShowResult(true);
        }
      } catch (error) {
        console.error('Error in handleFinalResult:', error);
        // Use fallback result on any error
        const fallbackResult = {
          result: `Your assessment for ${field} has been completed.`,
          suggestion: `Review your responses and consider seeking additional guidance from career counselors.`,
          recommendation: `Explore multiple career options and gather more information before making decisions.`,
          conclusion: `Career assessment completed. Consider professional guidance for detailed career planning.`
        };
        setFinalize(fallbackResult);
        if (typeof window !== 'undefined') {
          window.localStorage.setItem("finalize", JSON.stringify(fallbackResult));
        }
        setShowResult(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const assessmentTypes = [
    {
      id: 1,
      name: "Passion",
      description: "Evaluates your enthusiasm and interest",
  completed: !!assessment1,
    },
    {
      id: 2,
      name: "Profession",
      description: "Assesses your skills and aptitude",
  completed: !!assessment2,
    },
    {
      id: 3,
      name: "Vocation",
      description: "Evaluates social contribution potential",
  completed: !!assessment3,
    },
    {
      id: 4,
      name: "Mission",
      description: "Assesses purpose and impact alignment",
  completed: !!assessment4,
    },
  ];

  const progress = assessmentTypes.filter((item) => item.completed).length * 25;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 capitalize mb-2">
          {field} Career Path
        </h1>
        <p className="text-gray-600 text-lg">
          Discover if this career field aligns with your aspirations and
          capabilities.
        </p>
        {!show && !finalize && (
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-1 text-sm text-gray-500">
              <span>0%</span>
              <span>Assessment Progress: {progress}%</span>
              <span>100%</span>
            </div>
          </div>
        )}
      </div>

      {show ? (
        <Card className="shadow-lg border-t-4 border-t-blue-500">
          <CardHeader>
            <Badge className="w-fit mb-2 bg-blue-500">
              {assessmentTypes[assessment - 1].name} Assessment
            </Badge>
            <CardTitle className="text-2xl">
              {assessmentTypes[assessment - 1].name} in {field}
            </CardTitle>
            <CardDescription>
              {assessmentTypes[assessment - 1].description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Assessment
              questions={questions}
              field={field}
              setAssessment={setAssessment}
              assessment={assessment}
              setShow={setShow}
            />
          </CardContent>
        </Card>
      ) : finalize && showResult ? (
        <Card className="shadow-lg border-t-4 border-t-green-500">
          <CardHeader className="border-b pb-6">
            <Badge className="w-fit mb-2 bg-green-500">Final Results</Badge>
            <CardTitle className="text-2xl">
              Career Path Assessment Results
            </CardTitle>
            <CardDescription>
              Based on your responses across all four assessment areas
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="bg-green-50 p-6 rounded-lg mb-4 border border-green-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Final Assessment
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "final_result",
                  "suggestion",
                  "recommendation",
                  "conclusion",
                ].map((key) => (
                  <div
                    key={key}
                    className="bg-white p-4 rounded shadow-sm border border-gray-100"
                  >
                    <p className="text-gray-700 font-semibold capitalize mb-2">
                      {key.replace("_", " ")}:
                    </p>
                    <p className="text-gray-600">{finalize[key]}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">
                Individual Assessment Results
              </h3>
              <div className="space-y-3">
                {assessmentTypes.map((type) => (
                  <div
                    key={type.id}
                    className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100"
                  >
                    <div className="mr-3">
                      {type.completed ? (
                        <CheckCircle className="text-green-500 h-6 w-6" />
                      ) : (
                        <Clock className="text-amber-500 h-6 w-6" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{type.name}</h4>
                      <p className="text-sm text-gray-600">
                        {type.completed
                          ? (type.id === 1 ? assessment1?.conclusion
                            : type.id === 2 ? assessment2?.conclusion
                            : type.id === 3 ? assessment3?.conclusion
                            : assessment4?.conclusion)
                          : "Not completed"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-6">
            <Button
              onClick={() => (window.location.href = "/careerplanning?page=RoleRoadMap")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              View Career Roadmap <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl">Assessment Overview</CardTitle>
              <CardDescription>
                Understanding your compatibility with {field}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assessmentTypes.map((type) => (
                  <div
                    key={type.id}
                    className={`flex items-center p-4 rounded-lg border ${
                      assessment === type.id
                        ? "border-blue-300 bg-blue-50"
                        : "border-gray-200"
                    } ${type.completed ? "bg-green-50" : ""}`}
                    onClick={() => setAssessment(type.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="mr-4">
                      {type.completed ? (
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <span className="font-bold text-gray-600">
                            {type.id}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-lg">{type.name}</h3>
                      <p className="text-sm text-gray-600">
                        {type.description}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl">
                {assessment === 5
                  ? "Final Results"
                  : assessmentTypes[assessment - 1].name}
              </CardTitle>
              <CardDescription>
                {assessment === 5
                  ? "Review your complete assessment"
                  : `Assessment ${assessment} of 4: ${
                      assessmentTypes[assessment - 1].description
                    }`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 p-5 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-3">
                  About This Assessment
                </h3>
                {assessment === 1 && (
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      Measures enthusiasm and genuine interest in {field}
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      Evaluates your engagement with related activities
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      Assesses your curiosity about industry developments
                    </li>
                  </ul>
                )}
                {assessment === 2 && (
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      Assesses your skills relevant to {field}
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      Evaluates your aptitude for industry demands
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      Measures your potential for professional growth
                    </li>
                  </ul>
                )}
                {assessment === 3 && (
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      Evaluates how {field} aligns with social contribution
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      Assesses the value you can provide to others
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      Measures community impact potential
                    </li>
                  </ul>
                )}
                {assessment === 4 && (
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      Evaluates alignment with personal purpose
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      Assesses long-term impact potential in {field}
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      Measures fulfillment prospects in this career path
                    </li>
                  </ul>
                )}
                {assessment === 5 && (
                  <div className="flex items-center justify-center p-4">
                    <div className="text-center">
                      {assessmentTypes.every(type => type.completed) ? (
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-3" />
                      ) : (
                        <AlertCircle className="h-16 w-16 text-amber-500 mx-auto mb-3" />
                      )}
                      <p className="text-gray-700">
                        {assessmentTypes.every(type => type.completed)
                          ? "All assessments complete! You can now view your final results."
                          : "Complete all assessments to see your final results"}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {assessment != 5 && (
                <Button
                  onClick={handleAssessment}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin mr-2 h-5 w-5 border-b-2 border-white rounded-full"></div>
                      Generating Assessment...
                    </div>
                  ) : assessmentTypes[assessment - 1].completed ? (
                    "Retake This Assessment"
                  ) : (
                    "Start Assessment"
                  )}
                </Button>
              )}

              {assessment === 5 && results && (
                <Button
                  onClick={handleFinalResult}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin mr-2 h-5 w-5 border-b-2 border-white rounded-full"></div>
                      Analyzing Results...
                    </div>
                  ) : (
                    "View Complete Analysis"
                  )}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CareerAssessmentPage;
