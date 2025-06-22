import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AiCareerFieldResult } from "../../../../../config/AllAiModels";

const Assisment = ({
  questions,
  field,
  setAssessment,
  assessment,
  setShow,
}) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleOptionSelect = (questionIndex, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  const handleResponse = async () => {
    setLoading(true);
    const prompt = `determine whether i will be have passion in ${field} or not, on the basic of questionary assessment that i have perform that is given. 
      include only recommendation, what next and conclusion.in json formate. response:${JSON.stringify(
        results
      )}`;
    try {
      const result = await AiCareerFieldResult.sendMessage(prompt);
      const text = await result.response.text();
      const json = JSON.parse(text);
      localStorage.setItem(`assessment_${assessment}`, JSON.stringify(json));
      setAssessment((prev) => prev + 1);
      setShow(false);
      localStorage.setItem("assessment", assessment + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }
    const combinedResults = questions.map((q, index) => ({
      question: q.question,
      answer: answers[index],
    }));
    setResults(combinedResults);
    setSubmitted(true);
    console.log(combinedResults);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-gray-800">
              Assessment {assessment}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!submitted ? (
              <div className="space-y-6">
                {questions.map((q, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-sm"
                  >
                    <p className="text-lg font-medium mb-4 text-gray-700">
                      {index + 1}. {q.question}
                    </p>
                    <div className="flex gap-4">
                      {q.options.map((option) => (
                        <Button
                          key={option}
                          onClick={() => handleOptionSelect(index, option)}
                          className={`px-6 py-2 ${
                            answers[index] === option
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="flex justify-center mt-8">
                  <Button
                    onClick={() => {
                      handleSubmit();
                    }}
                    className="bg-blue-500 text-white px-8 py-3 text-base hover:bg-blue-700"
                  >
                    Submit Assessment
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <Alert className="bg-green-50 border-green-200">
                  <AlertDescription className="text-green-800">
                    Thank you for completing the assessment! Here are your
                    responses:
                  </AlertDescription>
                </Alert>
                {results.map((result, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-sm"
                  >
                    <p className="font-medium text-gray-700">
                      {result.question}
                    </p>
                    <p className="mt-2 text-blue-600">
                      Answer: {result.answer}
                    </p>
                  </div>
                ))}
                <Button
                  className="w-full bg-gray-600 text-white hover:bg-gray-700"
                  disabled={loading}
                  onClick={() => {
                    handleResponse();
                  }}
                >
                  {loading ? "Please Wait..." : "Start Over"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Assisment;
