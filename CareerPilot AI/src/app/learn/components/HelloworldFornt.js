"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, ArrowRight } from "lucide-react";
import Helloworld from "./FirstProgram";
import LoadingDialog from "../../jobPreparation/components/LoadingDialog";
import { HelloWorldProgram } from "../../../../config/FirstProgram";
import service from "../../../../config/service";

const FirstProgram = () => {
  const [language, setLanguage] = useState("c Pragramming");
  const [code, setCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [helloWorld, setHelloWorld] = useState("");
  const [videoId, setVideoId] = useState("");

  useEffect(() => {
    const topicName = localStorage.getItem("topicName");
    if (topicName) {
      setLanguage(topicName);
    }
  }, []);

  const showProgram = async (e) => {
    e.preventDefault();
    setLoading(true);
    const BASIC_PROMPT = `generate detailed steps to run hello world program of ${language} ,include steps:step by step process .link:official website link and other resourses .in json formate.`;

    try {
      const result = await HelloWorldProgram.sendMessage(BASIC_PROMPT);
      const responseText = await result.response.text();
      const parsedResult = JSON.parse(responseText);
      setHelloWorld(parsedResult);
      console.log(parsedResult);
      localStorage.setItem("HelloWorld", JSON.stringify(parsedResult));
      setCode(true);
      const response = await service.getVideos(
        `hello world program in ${language}`
      );
      if (response && response.length > 0) {
        setVideoId(response[0]?.id?.videoId);
      }
    } catch {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardTitle className="text-2xl font-bold flex items-center">
            <Code className="mr-2" />
            Generate Your First Program
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={showProgram} className="space-y-4">
            <div>
              <label
                htmlFor="language-input"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Enter the programming language
              </label>
              <Input
                id="language-input"
                placeholder="e.g., Python, JavaScript, Java"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full"
              />
            </div>
            <Button
              type="submit"
              className={`w-full py-2 rounded-lg text-white font-semibold transition duration-200 flex items-center justify-center ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={loading}
            >
              {loading ? (
                "Generating..."
              ) : (
                <>
                  Generate Program <ArrowRight className="ml-2" size={16} />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {loading && <LoadingDialog loading={loading} />}

      {code && (
        <div className="mt-8">
          <Helloworld helloWorldFirst={helloWorld} videoId={videoId} />
        </div>
      )}
    </div>
  );
};

export default FirstProgram;
