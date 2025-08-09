"use client";

import { Brain, Lightbulb, Play, ShieldCheck, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert, AlertDescription } from "../../../components/ui/alert";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardFooter } from "../../../components/ui/card";
import { AiSoftSkillQuestion } from '../../../config/AiModels';

const SoftSkillFeature = ({ icon: Icon, title, description }) => (
  <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg mb-3">
    <Icon className="h-8 w-8 text-blue-600" />
    <div>
      <h3 className="font-semibold text-blue-900">{title}</h3>
      <p className="text-sm text-blue-700">{description}</p>
    </div>
  </div>
);

const SoftSkillAssessmentPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const startAssessment = async () => {
    setLoading(true);
    setError(null);
    const prompt = `generate a list of open-ended questions that will assess the student's soft skills through the response given. Use scenarios or examples relevant to the following branch: Computer Science. It could target each soft skill such as communication, teamwork, problem-solving, adaptability, leadership, or conflict resolution. Ensure that questions are designed to elicit detailed reflection from the student and can be used in professional or an academic environment. Provide 1-2 questions per skill and label which soft skill each question addresses.in json formate.`;

    try {
      const results = await AiSoftSkillQuestion.sendMessage(prompt);
      const responseText = await results.response.text();
      const parsedQuestions = JSON.parse(responseText);
      localStorage.setItem(
        "softSkillQuestions",
        JSON.stringify(parsedQuestions)
      );
      router.push("/preparation/softskill/assessment");
    } catch (error) {
      console.error("Error generating questions:", error);
      setError("Failed to generate questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const softSkillFeatures = [
    {
      icon: Lightbulb,
      title: "Personalized Insights",
      description: "Tailored assessment to reveal your unique strengths",
    },
    {
      icon: ShieldCheck,
      title: "Comprehensive Evaluation",
      description: "Deep dive into critical professional skills",
    },
    {
      icon: Brain,
      title: "Skill Development",
      description: "Identify areas for personal and professional growth",
    },
    {
      icon: Users,
      title: "Workplace Readiness",
      description: "Prepare for success in collaborative environments",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="w-full max-w-lg">
        <Card className="border-2 border-blue-100 shadow-2xl rounded-2xl overflow-hidden">
          <div className="bg-blue-600 text-white p-6 text-center">
            <h1 className="text-3xl font-bold mb-2">Soft Skills Assessment</h1>
            <p className="text-blue-100">Unlock Your Professional Potential</p>
          </div>

          <CardContent className="p-6 space-y-4">
            {softSkillFeatures.map((feature, index) => (
              <SoftSkillFeature
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}

            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>

          <CardFooter className="p-6 bg-blue-50">
            <div className="w-full">
              <Button
                onClick={startAssessment}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <Play className="h-5 w-5" />
                <span>
                  {loading ? "Generating Assessment..." : "Begin Assessment"}
                </span>
              </Button>
              <p className="text-center text-sm text-blue-800 mt-3">
                Estimated Time: 10-15 minutes
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SoftSkillAssessmentPage;
