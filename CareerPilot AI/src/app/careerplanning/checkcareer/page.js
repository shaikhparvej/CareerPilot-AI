"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

import Assessment from "./components/Assissment";
import {
  AiCareerField,
  AiCareerFieldFinalResult,
} from "../../../../config/AllAiModels";

const CareerAssessmentPage = () => {
  const [loading, setLoading] = useState(false);
  const [field, setField] = useState("web development");
  const [questions, setQuestions] = useState("");
  const [assessment, setAssessment] = useState(1);
  const [show, setShow] = useState(false);
  const [results, setResults] = useState(false);
  const [finalize, setFinalize] = useState("");
  const [showResult, setShowResult] = useState(false);

  const assessment_1 = JSON.parse(localStorage.getItem("assessment_1"));
  const assessment_2 = JSON.parse(localStorage.getItem("assessment_2"));
  const assessment_3 = JSON.parse(localStorage.getItem("assessment_3"));
  const assessment_4 = JSON.parse(localStorage.getItem("assessment_4"));

  useEffect(() => {
    const storedField = localStorage.getItem("role");
    const storedAssessment = localStorage.getItem("assessment");
    const finalize = JSON.parse(localStorage.getItem("finalize"));

    if (finalize) {
      setFinalize(finalize);
    }

    if (assessment_1 && assessment_2 && assessment_3 && assessment_4) {
      setResults(true);
    }

    if (storedField) setField(storedField);
    if (storedAssessment) setAssessment(Number(storedAssessment));
  }, []);

  const handleAssessment = async () => {
    setLoading(true);
    let prompt = "";

    const prompts = {
      1: `Create a list of yes/no/can't say type questions designed to evaluate someone's passion for ${field}. ...`,
      2: `Create a list of yes/no/can't say type questions to assess professional interest in ${field}. ...`,
      3: `Create a list of yes/no/can't say type questions to evaluate vocation and social contribution in ${field}. ...`,
      4: `Create a list of yes/no/can't say type questions to assess mission, purpose, and impact in ${field}. ...`,
    };

    prompt = prompts[assessment];

    try {
      const result = await AiCareerField.sendMessage(prompt);
      const text = await result.response.text();
      const json = JSON.parse(text);
      setQuestions(json);
      setShow(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFinalResult = async () => {
    if (finalize) {
      setShowResult(true);
    } else {
      setLoading(true);

      const prompt = `Determine whether the ${field} field is the best career path based on the conclusions of passion, profession, vocation, and mission:
    {
      passion_conclusion: ${assessment_1?.conclusion},
      profession_conclusion: ${assessment_2?.conclusion},
      vocation_conclusion: ${assessment_3?.conclusion},
      mission_conclusion: ${assessment_4?.conclusion}
    }
    Provide final result, suggestion, recommendation, and conclusion in JSON format.`;

      try {
        const result = await AiCareerFieldFinalResult.sendMessage(prompt);
        const text = await result.response.text();
        const json = JSON.parse(text);
        setFinalize(json);
        localStorage.setItem("finalize", JSON.stringify(json));
        showResult(true);
      } catch (error) {
        console.error(error);
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
      completed: !!assessment_1,
    },
    {
      id: 2,
      name: "Profession",
      description: "Assesses your skills and aptitude",
      completed: !!assessment_2,
    },
    {
      id: 3,
      name: "Vocation",
      description: "Evaluates social contribution potential",
      completed: !!assessment_3,
    },
    {
      id: 4,
      name: "Mission",
      description: "Assesses purpose and impact alignment",
      completed: !!assessment_4,
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
                          ? JSON.parse(
                              localStorage.getItem(`assessment_${type.id}`)
                            )?.conclusion
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
              onClick={() => (window.location.href = "/page?page=FirstProgram")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Next Practical Assisment <ArrowRight className="ml-2 h-4 w-4" />
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
                      <AlertCircle className="h-16 w-16 text-amber-500 mx-auto mb-3" />
                      <p className="text-gray-700">
                        Complete all assessments to see your final results
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
