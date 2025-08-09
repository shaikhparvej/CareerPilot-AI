"use client";
import {
  ArrowRight,
  Award,
  Book,
  Brain,
  CheckSquare,
  Clock,
  Code,
  Compass,
  ExternalLink,
  Laptop,
  Library,
  Star,
  Target,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FaComputer } from "react-icons/fa6";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Dataround } from "../../data/CodingDetails";
import CodingAssessment from "./components/CodeExam";

export default function CodingRound() {
  const [activeSection, setActiveSection] = useState("overview");
  const [questions, setQuestions] = useState("");
  const [exam, setExam] = useState(false);
  const round = Dataround;

  const sections = [
    { id: "overview", icon: <Compass />, label: "Overview" },
    { id: "types", icon: <Code />, label: "Interview Types" },
    { id: "evaluation", icon: <Target />, label: "Evaluation" },
    { id: "preparation", icon: <CheckSquare />, label: "Preparation" },
    { id: "skills", icon: <Brain />, label: "Skills" },
    { id: "languages", icon: <Library />, label: "Languages" },
    { id: "resources", icon: <Book />, label: "Resources" },
  ];

  const StartInterview = async () => {
    const Prompt = `generate 5 question for coding round in "python",include question,input,output,time requered to complete ,level.in json formate.`;
    try {
      const result = await AiCodingRoundQuestion.sendMessage(Prompt);
      const responseText = result.response.text();
      console.log(responseText);
      setQuestions(JSON.parse(responseText));
      setExam(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {exam ? (
        <>
          <CodingAssessment stateExam={setExam} questions={questions} />
        </>
      ) : (
        <>
          <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
              <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                    Ace Your Coding Interview
                  </h1>
                  <p className="mt-6 text-xl text-indigo-100">
                    A comprehensive guide to help you prepare and succeed in
                    technical interviews
                  </p>
                  <Button
                    onClick={() => StartInterview()}
                    className="flex items-center gap-2 mt-6 px-6 py-3 rounded-lg bg-white text-indigo-600 font-semibold shadow-lg hover:bg-indigo-50 transition-all duration-300 ease-in-out"
                  >
                    Let's Practice <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="max-w-7xl mx-auto px-4 -mt-8 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Card className="bg-white shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-8 w-8 text-violet-500" />
                      <div>
                        <p className="text-sm text-gray-500">
                          Average Duration
                        </p>
                        <p className="text-xl font-semibold">45 Minutes</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <Users className="h-8 w-8 text-violet-500" />
                      <div>
                        <p className="text-sm text-gray-500">Success Rate</p>
                        <p className="text-xl font-semibold">~50%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <Award className="h-8 w-8 text-violet-500" />
                      <div>
                        <p className="text-sm text-gray-500">
                          Prep Time Needed
                        </p>
                        <p className="text-xl font-semibold">2-3 Months</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Navigation */}
                <nav className="lg:col-span-1">
                  <div className="space-y-1">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                          activeSection === section.id
                            ? "bg-violet-50 text-violet-700"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <span className="flex-shrink-0">{section.icon}</span>
                        <span className="font-medium">{section.label}</span>
                      </button>
                    ))}
                  </div>
                </nav>

                {/* Content Area */}
                <div className="lg:col-span-3 space-y-8">
                  {activeSection === "overview" && (
                    <div className="prose max-w-none">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Understanding Coding Interviews
                      </h2>
                      <p className="text-gray-600 leading-relaxed">
                        {round.codingRound.define}
                      </p>
                    </div>
                  )}

                  {activeSection === "evaluation" && (
                    <div className="grid gap-6 sm:grid-cols-2">
                      {round.codingRound.evaluation.criteria.map(
                        (evaluating, index) => (
                          <Card
                            key={index}
                            className="hover:shadow-lg transition-shadow"
                          >
                            <CardHeader>
                              <CardTitle className="flex items-center text-lg text-gray-900">
                                <Code className="w-5 h-5 mr-2 text-violet-500" />
                                {evaluating.name}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-gray-600">
                                {evaluating.description}
                              </p>
                            </CardContent>
                          </Card>
                        )
                      )}
                    </div>
                  )}

                  {activeSection === "types" && (
                    <div className="grid gap-6 sm:grid-cols-2">
                      {round.codingRound.type.map((type, index) => (
                        <Card
                          key={index}
                          className="hover:shadow-lg transition-shadow"
                        >
                          <CardHeader>
                            <CardTitle className="flex items-center text-lg text-gray-900">
                              <Code className="w-5 h-5 mr-2 text-violet-500" />
                              {type.type}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-600">{type.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  {activeSection === "skills" && (
                    <div className="grid gap-6 sm:grid-cols-2">
                      {round.codingRound.commonSkillsAssessed.map(
                        (skills, index) => (
                          <Card
                            key={index}
                            className="hover:shadow-lg transition-shadow"
                          >
                            <CardHeader>
                              <CardTitle className="flex items-center text-lg text-gray-900">
                                <Brain className="w-5 h-5 mr-2 text-violet-500" />
                                {skills.skill}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-gray-600">
                                {skills.description}
                              </p>
                            </CardContent>
                          </Card>
                        )
                      )}
                    </div>
                  )}

                  {activeSection === "languages" && (
                    <div className="grid gap-6 sm:grid-cols-2">
                      {round.codingRound.allowedLanguages.map(
                        (language, index) => (
                          <Card
                            key={index}
                            className="hover:shadow-lg transition-shadow"
                          >
                            <CardHeader>
                              <CardTitle className="flex items-center text-lg text-gray-900">
                                <FaComputer className="w-5 h-5 mr-2 text-violet-500" />
                                {language.language}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-gray-600">{language.reason}</p>
                            </CardContent>
                          </Card>
                        )
                      )}
                    </div>
                  )}

                  {activeSection === "preparation" && (
                    <div className="space-y-6">
                      {round.codingRound.prepare.map((tip, index) => (
                        <Card
                          key={index}
                          className="border-l-4 border-violet-500"
                        >
                          <CardContent className="p-6">
                            <h3 className="flex items-center text-lg font-medium text-gray-900 mb-2">
                              <Star className="w-5 h-5 mr-2 text-violet-500" />
                              {tip.tip}
                            </h3>
                            <p className="text-gray-600 ml-7">{tip.details}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  {activeSection === "resources" && (
                    <div className="space-y-8">
                      <section>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                          <Book className="w-5 h-5 mr-2 text-violet-500" />
                          Recommended Reading
                        </h3>
                        <div className="grid gap-6 sm:grid-cols-2">
                          {round.codingRound.resources.books.map(
                            (book, index) => (
                              <Card
                                key={index}
                                className="hover:shadow-lg transition-shadow"
                              >
                                <CardContent className="p-6">
                                  <h4 className="font-medium text-gray-900 flex">
                                    <Book /> {book.title}
                                  </h4>
                                  <p className="text-sm text-gray-500 mt-1">
                                    by {book.author}
                                  </p>
                                  <p className="text-gray-600 mt-2">
                                    {book.description}
                                  </p>
                                </CardContent>
                              </Card>
                            )
                          )}
                        </div>
                      </section>

                      <section>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                          <Laptop className="w-5 h-5 mr-2 text-violet-500" />
                          Online Platforms
                        </h3>
                        <div className="grid gap-6 sm:grid-cols-2">
                          {round.codingRound.resources.websites.map(
                            (site, index) => (
                              <Card
                                key={index}
                                className="hover:shadow-lg transition-shadow"
                              >
                                <CardContent className="p-6">
                                  <h4 className="font-medium text-gray-900 flex items-center justify-between">
                                    {site.name}
                                    <ExternalLink className="w-4 h-4 text-violet-500" />
                                  </h4>
                                  <p className="text-gray-600 mt-2">
                                    {site.description}
                                  </p>
                                </CardContent>
                              </Card>
                            )
                          )}
                        </div>
                      </section>

                      <section>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                          <Laptop className="w-5 h-5 mr-2 text-violet-500" />
                          Courses
                        </h3>
                        <div className="grid gap-6 sm:grid-cols-2">
                          {round.codingRound.resources.courses.map(
                            (courses, index) => (
                              <Card
                                key={index}
                                className="hover:shadow-lg transition-shadow"
                              >
                                <CardContent className="p-6">
                                  <h4 className="font-medium text-gray-900 flex items-center justify-between">
                                    {courses.platform}
                                    <Link href={courses.url}>
                                      <ExternalLink className="w-4 h-4 text-violet-500" />
                                    </Link>
                                  </h4>
                                  <Link href={courses.url}>
                                    <p className="text-lg mt-2 fonr-bold">
                                      {courses.title}
                                    </p>
                                  </Link>
                                  <p className="text-gray-600 mt-2">
                                    {courses.description}
                                  </p>
                                </CardContent>
                              </Card>
                            )
                          )}
                        </div>
                      </section>

                      <section>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                          <Laptop className="w-5 h-5 mr-2 text-violet-500" />
                          Tools
                        </h3>
                        <div className="grid gap-6 sm:grid-cols-2">
                          {round.codingRound.resources.tools.map(
                            (tools, index) => (
                              <Card
                                key={index}
                                className="hover:shadow-lg transition-shadow"
                              >
                                <CardContent className="p-6">
                                  <h4 className="font-medium text-gray-900 flex items-center justify-between">
                                    {tools.tool}
                                    <Link href={tools.url}>
                                      {" "}
                                      <ExternalLink className="w-4 h-4 text-violet-500" />
                                    </Link>
                                  </h4>
                                  <p className="text-lg mt-2 fonr-bold">
                                    {tools.description}
                                  </p>
                                </CardContent>
                              </Card>
                            )
                          )}
                        </div>
                      </section>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
