import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Book,
  Code,
  Compass,
  Target,
  CheckSquare,
  Award,
  Library,
  ArrowRight,
  ExternalLink,
  Clock,
  Users,
  Laptop,
  Brain,
  Star,
} from "lucide-react";
import { FaComputer } from "react-icons/fa6";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CodingAssessment from "./CodeExam";
import { AiCodingRoundQuestion } from "../../../../config/AllAiModels";

export default function CodingRound() {
  const [activeSection, setActiveSection] = useState("overview");
  const [questions, setQuestions] = useState("");
  const [exam, setExam] = useState(false);
  const round = {
    codingRound: {
      define:
        "Coding interviews are a form of technical interviews used to assess a potential software engineer candidate's competencies through presenting them with programming problems. Typically, coding interviews focus on data structures and algorithms, while other technical rounds may encompass system design (especially for middle to senior level candidates). A coding interview round is typically 30 - 45 minutes. You will be given a technical question (or questions) by the interviewer and will be expected to write code in a real-time collaborative editor such as CodePen or CoderPad (phone screen/virtual onsite) or on a whiteboard (onsite) to solve the problem within the given time.",
      evaluation: {
        criteria: [
          {
            name: "Communication",
            description:
              "Asking clarifying questions and communicating the approach and tradeoffs clearly so the interviewer can follow without difficulty.",
          },
          {
            name: "Problem Solving",
            description:
              "Understanding the problem and approaching it systematically, logically, and accurately. Discussing multiple potential approaches and tradeoffs. Accurately determining time and space complexity and optimizing them.",
          },
          {
            name: "Technical Competency",
            description:
              "Translating discussed solutions into working code without significant struggle. Ensuring clean, correct implementation with a strong knowledge of language constructs.",
          },
          {
            name: "Testing",
            description:
              "Ability to test code against normal and corner cases, identifying and self-correcting issues effectively.",
          },
        ],
      },
      type: [
        {
          type: "Online Coding Assessment",
          description:
            "An automated test conducted on platforms like HackerRank or LeetCode to evaluate problem-solving and coding skills in a time-bound manner.",
        },
        {
          type: "Whiteboard Coding",
          description:
            "A traditional interview method where candidates solve problems on a whiteboard or shared document, focusing on logical thinking and communication.",
        },
        {
          type: "Pair Programming",
          description:
            "A collaborative round where candidates solve a problem with the interviewer, focusing on teamwork, coding approach, and real-time problem-solving.",
        },
        {
          type: "Take-Home Assignment",
          description:
            "A project or coding task given to candidates to complete within a specified timeline, allowing for detailed evaluation of their skills.",
        },
        {
          type: "Debugging Round",
          description:
            "Candidates are given a buggy codebase and are required to identify and fix errors efficiently.",
        },
        {
          type: "Code Review Round",
          description:
            "Candidates review a pre-written codebase and provide constructive feedback, demonstrating understanding of best practices and code quality.",
        },
        {
          type: "Live Coding Challenge",
          description:
            "A real-time coding session where candidates solve a problem in an IDE or online coding platform while explaining their thought process.",
        },
        {
          type: "Competitive Programming Style",
          description:
            "A round that mimics a competitive programming contest, focusing on solving multiple problems of varying difficulty levels within a limited time.",
        },
        {
          type: "System Design Focused",
          description:
            "Involves designing a scalable, maintainable system or feature, often paired with coding tasks. Common in interviews for senior or backend roles.",
        },
        {
          type: "Optimization Problem Round",
          description:
            "Focuses on solving a problem with constraints, requiring the candidate to optimize time and space complexity.",
        },
        {
          type: "Data Science/ML Coding Round",
          description:
            "Evaluates candidates on tasks involving data manipulation, statistical analysis, and implementation of machine learning algorithms.",
        },
        {
          type: "Full-Stack Development Round",
          description:
            "Candidates are asked to implement features or solve problems across both frontend and backend, often involving APIs and database integration.",
        },
        {
          type: "Algorithm Design Round",
          description:
            "Focused on designing efficient algorithms to solve non-trivial problems, often requiring candidates to derive and explain their approach.",
        },
        {
          type: "Database Query Round",
          description:
            "Candidates are tasked with solving database-related problems, including writing complex SQL queries or designing database schemas.",
        },
        {
          type: "Behavioral Coding Round",
          description:
            "Combines problem-solving tasks with behavioral questions, assessing both technical and interpersonal skills under pressure.",
        },
        {
          type: "Logic Puzzle Round",
          description:
            "Aimed at evaluating a candidate’s logical reasoning and problem-solving approach through puzzles and brain teasers.",
        },
      ],
      prepare: [
        {
          tip: "Pick a good programming language to use",
          details:
            "Choose a language you are most comfortable with that is widely accepted in interviews, such as Python, Java, or C++.",
        },
        {
          tip: "Plan your time and tackle topics and questions in order of importance",
          details:
            "Prioritize foundational topics like arrays, strings, and recursion before moving to advanced concepts like dynamic programming or graphs.",
        },
        {
          tip: "Combine studying and practicing for a single topic",
          details:
            "Study the theory behind a topic and immediately apply it by solving problems to reinforce understanding.",
        },
        {
          tip: "Accompany practice with coding interview cheat sheets",
          details:
            "Use cheat sheets for algorithms and data structures to quickly recall key concepts and optimize preparation time.",
        },
        {
          tip: "Prepare a good self-introduction and final questions",
          details:
            "Draft a concise introduction highlighting your skills and experiences, and prepare insightful questions to ask the interviewer.",
        },
        {
          tip: "Try out mock coding interviews",
          details:
            "Simulate real interviews using platforms like Pramp or by pairing with experienced peers to build confidence.",
        },
        {
          tip: "(If you have extra time) Internalize key tech interview question patterns",
          details:
            "Learn recurring patterns such as sliding window, two-pointer techniques, or divide-and-conquer for tackling complex problems efficiently.",
        },
      ],
      commonSkillsAssessed: [
        {
          skill: "Data Structures",
          description:
            "Understanding and implementing structures like arrays, linked lists, stacks, queues, trees, and graphs.",
        },
        {
          skill: "Algorithms",
          description:
            "Focusing on sorting, searching, dynamic programming, greedy algorithms, and graph traversal techniques.",
        },
        {
          skill: "System Design (optional)",
          description:
            "Designing scalable, maintainable systems by focusing on architectural patterns and tradeoffs (for senior roles).",
        },
        {
          skill: "Code Optimization",
          description:
            "Writing efficient code with optimal time and space complexity to solve problems.",
        },
        {
          skill: "Debugging",
          description:
            "Identifying and resolving errors in code effectively under time constraints.",
        },
      ],
      allowedLanguages: [
        {
          language: "Python",

          reason:
            "Known for simplicity and quick prototyping, often preferred in interviews.",
        },
        {
          language: "Java",

          reason:
            "Widely used in enterprise applications and has strong library support.",
        },
        {
          language: "C++",

          reason:
            "Ideal for algorithmic problems due to STL (Standard Template Library) support.",
        },
        {
          language: "JavaScript",

          reason:
            "Common for front-end and full-stack roles; useful for solving algorithmic challenges.",
        },
        {
          language: "Ruby",

          reason:
            "Simple syntax, though less commonly used in technical interviews.",
        },
        {
          language: "C#",

          reason:
            "Preferred for roles involving Microsoft technologies or .NET frameworks.",
        },
      ],
      resources: {
        books: [
          {
            title: "Cracking the Coding Interview",
            author: "Gayle Laakmann McDowell",
            description:
              "A comprehensive guide to cracking coding interviews with over 189 programming questions.",
          },
          {
            title: "Elements of Programming Interviews",
            author: "Adnan Aziz, Tsung-Hsien Lee, Amit Prakash",
            description:
              "Focuses on practical problem-solving and interview preparation.",
          },
          {
            title: "Introduction to Algorithms",
            author:
              "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, and Clifford Stein",
            description:
              "A foundational book on algorithms with detailed explanations.",
          },
          {
            title: "Programming Pearls",
            author: "Jon Bentley",
            description:
              "A classic book focusing on problem-solving strategies and algorithms.",
          },
          {
            title: "The Algorithm Design Manual",
            author: "Steven S. Skiena",
            description:
              "A practical guide to designing algorithms with problem examples.",
          },
          {
            title: "Competitive Programming",
            author: "Steven Halim, Felix Halim",
            description:
              "Best suited for competitive programming with clear explanations and sample problems.",
          },
        ],
        websites: [
          {
            name: "LeetCode",
            url: "https://leetcode.com",
            description:
              "Popular platform for practicing coding problems with difficulty levels.",
          },
          {
            name: "HackerRank",
            url: "https://hackerrank.com",
            description:
              "A platform used by companies to conduct online coding assessments.",
          },
          {
            name: "GeeksforGeeks",
            url: "https://geeksforgeeks.org",
            description:
              "Provides tutorials and coding problems for various topics.",
          },
          {
            name: "Codeforces",
            url: "https://codeforces.com",
            description: "Best for competitive programming and contests.",
          },
          {
            name: "TopCoder",
            url: "https://topcoder.com",
            description:
              "A pioneer in coding competitions, offering challenging problems.",
          },
          {
            name: "InterviewBit",
            url: "https://interviewbit.com",
            description:
              "Covers coding problems and system design questions for interview preparation.",
          },
          {
            name: "AlgoExpert",
            url: "https://algoexpert.io",
            description:
              "Platform offering curated coding interview questions with video explanations.",
          },
          {
            name: "Project Euler",
            url: "https://projecteuler.net",
            description:
              "A series of challenging mathematical/computational problems.",
          },
          {
            name: "Exercism",
            url: "https://exercism.org",
            description:
              "Offers coding practice in multiple languages with mentorship options.",
          },
        ],
        courses: [
          {
            platform: "Udemy",
            title: "Master the Coding Interview: Data Structures + Algorithms",
            description:
              "A detailed course covering DS & Algo for coding interviews.",
            url: "https://www.udemy.com",
          },
          {
            platform: "Coursera",
            title: "Algorithms Specialization",
            description:
              "Learn algorithms in depth with assignments and projects.",
            url: "https://www.coursera.org",
          },
          {
            platform: "Educative",
            title: "Grokking the Coding Interview",
            description:
              "Covers coding patterns and problems commonly seen in interviews.",
            url: "https://www.educative.io",
          },
          {
            platform: "Pluralsight",
            title: "Algorithms and Data Structures in Python",
            description:
              "A beginner-friendly course focusing on algorithms and data structures.",
            url: "https://www.pluralsight.com",
          },
          {
            platform: "edX",
            title: "CS50's Introduction to Computer Science",
            description:
              "Harvard's famous CS50 course introducing computer science fundamentals.",
            url: "https://cs50.harvard.edu/x",
          },
          {
            platform: "YouTube",
            title: "Abdul Bari's Algorithm and Data Structures",
            description:
              "Popular free tutorials on algorithms and data structures.",
            url: "https://www.youtube.com",
          },
        ],
        tools: [
          {
            tool: "CodePen",
            description:
              "A collaborative coding tool for front-end interviews.",
            url: "https://codepen.io",
          },
          {
            tool: "CoderPad",
            description:
              "A real-time collaborative editor used in coding interviews.",
            url: "https://coderpad.io",
          },
          {
            tool: "Pramp",
            description:
              "A mock interview platform with peer-to-peer feedback.",
            url: "https://www.pramp.com",
          },
          {
            tool: "Replit",
            description:
              "An online IDE supporting multiple languages, often used for live coding.",
            url: "https://replit.com",
          },
          {
            tool: "CodeChef IDE",
            description:
              "An online compiler used in competitive programming and practice.",
            url: "https://www.codechef.com/ide",
          },
          {
            tool: "Excalidraw",
            description:
              "Great for creating mockups or whiteboard-style interview solutions.",
            url: "https://excalidraw.com",
          },
          {
            tool: "Overleaf",
            description:
              "A collaborative tool for writing technical documentation during interviews.",
            url: "https://www.overleaf.com",
          },
          {
            tool: "CodeSignal",
            description:
              "Used by companies for coding assessments and practice.",
            url: "https://codesignal.com",
          },
          {
            tool: "GitHub Copilot",
            description: "AI-powered code assistant for faster coding.",
            url: "https://github.com/features/copilot",
          },
          {
            tool: "Visual Studio Code",
            description:
              "Popular IDE for coding, debugging, and pair programming.",
            url: "https://code.visualstudio.com",
          },
          {
            tool: "Google Colab",
            description:
              "An online notebook for Python, useful for algorithms and ML-based interview problems.",
            url: "https://colab.research.google.com",
          },
        ],
      },
    },
  };

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
