"use client";
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle,
  Play,
  ShieldCheck,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap
} from "lucide-react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./components/ThemeContext";

export default function JobPrepHomepage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { isDarkMode } = useContext(ThemeContext);

  const testimonials = [
    {
      name: "Wajid Daud Tamboli",
      role: "Full Stack Developer",
      content:
        "CareerPilot AI helped me land my dream job! The mock interviews were incredibly realistic.",
      rating: 5,
    },
    {
      name: "Laxmi Javalkote",
      role: "Frontend Developer",
      content:
        "The AI-powered feedback system identified my weak points and helped me improve rapidly.",
      rating: 5,
    },
    {
      name: "Shaikh Parvej",
      role: "Backend Developer",
      content:
        "From zero to offer in 3 months. The structured learning path made all the difference.",
      rating: 5,
    },
    {
      name: "Sakshi Madgundi",
      role: "UI/UX Designer",
      content:
        "The mentorship and hands-on projects gave me confidence to crack tough interviews.",
      rating: 5,
    },
    {
      name: "Bagwan Zaid",
      role: "Research",
      content:
        "Diving into real-world challenges during the program boosted my skills and made me feel ready for any high-pressure interview.",
      rating: 5,
    },
  ];

  const features = [
    {
      icon: Target,
      title: "Personalized Learning Paths",
      description:
        "AI-driven curricula tailored to your target role and skill level",
    },
    {
      icon: Users,
      title: "Mock Interviews",
      description:
        "Practice with industry professionals and get real-time feedback",
    },
    {
      icon: BookOpen,
      title: "Comprehensive Resources",
      description:
        "Curated materials covering technical skills, behavioral questions, and more",
    },
    {
      icon: Zap,
      title: "Speed Interview Prep",
      description: "Quick daily challenges to keep your skills sharp",
    },
    {
      icon: Brain, // placeholder - update as needed
      title: "AI-Powered Mentoring",
      description:
        "Provides personalized guidance using AI techniques like mBERT and XLM-R",
    },
    {
      icon: ShieldCheck, // placeholder - update as needed
      title: "Data Privacy and Security",
      description:
        "Ensures user data confidentiality and integrity during AI interactions",
    },
    {
      icon: TrendingUp, // placeholder - update as needed
      title: "Improved Learning Outcomes",
      description:
        "Boosts student engagement and performance by up to 35% through adaptive learning paths",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-black" : "bg-gradient-to-br from-blue-50 via-white to-indigo-50"}`}>
      {/* Navigation */}

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className={`absolute inset-0 ${
          isDarkMode
            ? "bg-black"
            : "bg-gradient-to-r from-blue-100/20 to-indigo-100/20"
        } animate-pulse`}></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className={`inline-flex items-center space-x-2 ${
                isDarkMode
                  ? "bg-gray-800/70 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-amber-200"
                  : "bg-blue-100/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-blue-700"
              }`}>
                <Zap className="w-4 h-4" />
                <span>AI-Powered Job Preparation</span>
              </div>

              <h1 className={`text-5xl md:text-7xl font-bold leading-tight ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
                Launch Your
                <span className={`${
                  isDarkMode
                    ? "bg-gradient-to-r from-amber-400 to-amber-600"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600"
                } bg-clip-text text-transparent`}>
                  {" "}
                  Career Journey
                </span>
              </h1>

              <p className={`text-xl leading-relaxed ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}>
                Master technical interviews, behavioral questions, and industry
                skills with our comprehensive preparation platform. Join
                thousands who've transformed their careers.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className={`group ${
                  isDarkMode
                    ? "bg-gray-600 hover:bg-gray-700 text-white"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
                } px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center space-x-2`}>
                  <span>Start Preparing Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button className={`group ${
                  isDarkMode
                    ? "bg-gray-800/70 text-white hover:bg-gray-700/70"
                    : "bg-gray-100/80 backdrop-blur-sm text-gray-700 hover:bg-gray-200/80"
                } px-8 py-4 rounded-full text-lg font-semibold transition-all flex items-center justify-center space-x-2`}>
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>50K+</div>
                  <div className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}>Success Stories</div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>95%</div>
                  <div className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}>Success Rate</div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>500+</div>
                  <div className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}>Companies</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className={`relative ${
                isDarkMode
                  ? "bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700"
                  : "bg-gradient-to-br from-blue-50/80 to-indigo-50/80 border border-blue-200"
                } backdrop-blur-sm rounded-3xl p-8`}>
                <div className={`absolute -top-4 -right-4 w-24 h-24 ${
                  isDarkMode
                    ? "bg-gradient-to-r from-gray-600/20 to-gray-700/20"
                    : "bg-gradient-to-r from-blue-400/20 to-indigo-400/20"
                  } rounded-full opacity-20 animate-bounce`}></div>
                <div className={`absolute -bottom-4 -left-4 w-16 h-16 ${
                  isDarkMode
                    ? "bg-gradient-to-r from-gray-700/20 to-gray-600/20"
                    : "bg-gradient-to-r from-indigo-400/20 to-blue-400/20"
                  } rounded-full opacity-20 animate-pulse`}></div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span className={`${
                      isDarkMode ? "text-white" : "text-gray-700"
                    }`}>
                      Interview scheduled with Google
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span className={`${
                      isDarkMode ? "text-white" : "text-gray-700"
                    }`}>Mock interview completed</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span className={`${
                      isDarkMode ? "text-white" : "text-gray-700"
                    }`}>Skills assessment passed</span>
                  </div>

                  <div className={`${
                    isDarkMode
                      ? "bg-gray-800/70"
                      : "bg-white/80"
                    } backdrop-blur-sm rounded-xl p-4 mt-6`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}>Interview Readiness</span>
                      <span className={`${
                        isDarkMode ? "text-gray-300" : "text-blue-600"
                      } font-semibold`}>92%</span>
                    </div>
                    <div className={`w-full ${
                      isDarkMode ? "bg-gray-700" : "bg-gray-200"
                    } rounded-full h-3`}>
                      <div className={`${
                        isDarkMode
                          ? "bg-gradient-to-r from-amber-400 to-amber-600"
                          : "bg-gradient-to-r from-purple-400 to-pink-400"
                        } h-3 rounded-full w-[92%] animate-pulse`}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Phases Section */}
      <section className="flex justify-center">
        <Image
          src="/phases.png"
          height={800}
          width={1000}
          alt="phases"
          priority
        />
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              Everything You Need to{" "}
              <span className={`bg-gradient-to-r ${
                isDarkMode
                  ? "from-gray-300 to-white"
                  : "from-blue-600 to-indigo-600"
              } bg-clip-text text-transparent`}>
                Succeed
              </span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}>
              Our comprehensive platform provides all the tools and resources
              you need to excel in your job search and interviews.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group rounded-2xl p-8 border hover:scale-105 transition-all duration-300 ${
                  isDarkMode
                    ? "bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10"
                    : "bg-white/90 backdrop-blur-sm border-gray-200 hover:bg-white shadow-lg"
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${
                  isDarkMode
                    ? "bg-gradient-to-r from-gray-600 to-gray-700"
                    : "bg-gradient-to-r from-blue-500 to-indigo-500"
                }`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-xl font-semibold mb-4 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                  {feature.title}
                </h3>
                <p className={`leading-relaxed ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Detailed Features Showcase */}
          <div className="space-y-20">
            {/* Feature 1: AI-Powered Interview Practice */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className={`inline-flex items-center space-x-2 backdrop-blur-sm rounded-full px-4 py-2 text-sm ${
                  isDarkMode
                    ? "bg-gray-600/20 text-gray-300"
                    : "bg-blue-100/80 text-blue-700"
                }`}>
                  <Zap className="w-4 h-4" />
                  <span>AI-Powered</span>
                </div>
                <h3 className={`text-3xl md:text-4xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                  Master Interviews with{" "}
                  <span className={`bg-gradient-to-r ${
                    isDarkMode
                      ? "from-gray-300 to-white"
                      : "from-blue-600 to-indigo-600"
                  } bg-clip-text text-transparent`}>
                    AI Coaching
                  </span>
                </h3>
                <p className={`text-lg leading-relaxed ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}>
                  Practice with our advanced AI interviewer that adapts to your
                  responses, provides real-time feedback, and simulates actual
                  interview scenarios from top tech companies.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className={`${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}>
                      Real-time voice and video analysis
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className={`${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}>
                      Personalized improvement suggestions
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className={`${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}>
                      500+ company-specific scenarios
                    </span>
                  </div>
                </div>
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 flex items-center space-x-2">
                  <span>Try AI Interview</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="relative">
                <div className={`${
                  isDarkMode
                    ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
                    : "bg-gradient-to-br from-purple-50/80 to-pink-50/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-purple-200/50 shadow-2xl"
                }`}>
                  <div className={`${
                    isDarkMode ? "bg-black/40" : "bg-white/90 border border-gray-200"
                  } rounded-2xl p-8 mb-6 shadow-lg`}>
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                      <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    </div>
                    <div className={`text-lg ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                      <div className="mb-4 font-medium">
                        AI: &quot;Tell me about a challenging project you worked on.&quot;
                      </div>
                      <div className={`${isDarkMode ? "text-purple-300" : "text-purple-600"} font-medium`}>
                        You: &quot;In my previous role, I led a team to redesign...&quot;
                      </div>
                      <div className={`mt-6 ${
                        isDarkMode ? "bg-green-500/20" : "bg-green-100"
                      } rounded-lg p-4`}>
                        <div className={`${
                          isDarkMode ? "text-green-300" : "text-green-700"
                        } text-sm font-medium`}>
                          ✓ Great structure! Consider adding specific metrics...
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`font-semibold ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>Confidence Score</span>
                    <span className={`text-2xl font-black ${
                      isDarkMode ? "text-purple-400" : "text-purple-600"
                    }`}>87%</span>
                  </div>
                  <div className={`w-full ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-200"
                  } rounded-full h-3 mt-3`}>
                    <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-3 rounded-full w-[87%] shadow-lg"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2: Skill Assessment & Learning Paths */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative lg:order-1">
                <div className={`${
                  isDarkMode
                    ? "bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
                    : "bg-gradient-to-br from-blue-50/80 to-purple-50/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-blue-200/50 shadow-2xl"
                }`}>
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className={`${
                      isDarkMode ? "bg-black/40" : "bg-white/90 border border-gray-200"
                    } rounded-xl p-5 shadow-lg`}>
                      <div className={`font-bold mb-2 text-lg ${
                        isDarkMode ? "text-white" : "text-gray-800"
                      }`}>
                        JavaScript
                      </div>
                      <div className={`w-full ${
                        isDarkMode ? "bg-gray-700" : "bg-gray-200"
                      } rounded-full h-3`}>
                        <div className="bg-green-500 h-3 rounded-full w-[92%] shadow-sm"></div>
                      </div>
                      <div className="text-green-500 text-sm mt-2 font-semibold">Expert</div>
                    </div>
                    <div className={`${
                      isDarkMode ? "bg-black/40" : "bg-white/90 border border-gray-200"
                    } rounded-xl p-5 shadow-lg`}>
                      <div className={`font-bold mb-2 text-lg ${
                        isDarkMode ? "text-white" : "text-gray-800"
                      }`}>
                        System Design
                      </div>
                      <div className={`w-full ${
                        isDarkMode ? "bg-gray-700" : "bg-gray-200"
                      } rounded-full h-3`}>
                        <div className="bg-yellow-500 h-3 rounded-full w-[68%] shadow-sm"></div>
                      </div>
                      <div className="text-yellow-500 text-sm mt-2 font-semibold">
                        Intermediate
                      </div>
                    </div>
                    <div className={`${
                      isDarkMode ? "bg-black/40" : "bg-white/90 border border-gray-200"
                    } rounded-xl p-5 shadow-lg`}>
                      <div className={`font-bold mb-2 text-lg ${
                        isDarkMode ? "text-white" : "text-gray-800"
                      }`}>React</div>
                      <div className={`w-full ${
                        isDarkMode ? "bg-gray-700" : "bg-gray-200"
                      } rounded-full h-3`}>
                        <div className="bg-blue-500 h-3 rounded-full w-[85%] shadow-sm"></div>
                      </div>
                      <div className="text-blue-500 text-sm mt-2 font-semibold">Advanced</div>
                    </div>
                    <div className={`${
                      isDarkMode ? "bg-black/40" : "bg-white/90 border border-gray-200"
                    } rounded-xl p-5 shadow-lg`}>
                      <div className={`font-bold mb-2 text-lg ${
                        isDarkMode ? "text-white" : "text-gray-800"
                      }`}>
                        Algorithms
                      </div>
                      <div className={`w-full ${
                        isDarkMode ? "bg-gray-700" : "bg-gray-200"
                      } rounded-full h-3`}>
                        <div className="bg-red-500 h-3 rounded-full w-[45%] shadow-sm"></div>
                      </div>
                      <div className="text-red-500 text-sm mt-2 font-semibold">
                        Needs Work
                      </div>
                    </div>
                  </div>
                  <div className={`${
                    isDarkMode ? "bg-purple-500/20" : "bg-purple-100"
                  } rounded-xl p-6 shadow-lg`}>
                    <div className={`font-bold mb-3 text-lg ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}>
                      Recommended Focus
                    </div>
                    <div className={`${
                      isDarkMode ? "text-purple-300" : "text-purple-700"
                    } font-medium`}>
                      Complete &quot;Advanced Algorithms&quot; track to boost interview
                      readiness by 23%
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-8 lg:order-2">
                <div className={`inline-flex items-center space-x-3 backdrop-blur-sm rounded-full px-6 py-3 text-sm font-bold ${
                  isDarkMode
                    ? "bg-blue-500/20 text-blue-300"
                    : "bg-blue-600/10 text-blue-700 border border-blue-200/50"
                }`}>
                  <Target className="w-5 h-5" />
                  <span>Personalized Learning</span>
                </div>
                <h3 className={`text-4xl md:text-5xl font-black leading-tight ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`} style={{ lineHeight: '1.1' }}>
                  <span className={`bg-gradient-to-r ${
                    isDarkMode
                      ? "from-blue-400 to-purple-400"
                      : "from-blue-600 via-indigo-600 to-purple-600"
                  } bg-clip-text text-transparent`}>
                    Smart Learning
                  </span>{" "}
                  Paths
                </h3>
                <p className={`text-xl leading-relaxed font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`} style={{ lineHeight: '1.8' }}>
                  Take our comprehensive skill assessment and get a personalized
                  learning roadmap. Our AI identifies your strengths and
                  weaknesses to create the most efficient study plan.
                </p>
                <div className="space-y-5">
                  <div className="flex items-center space-x-4">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className={`text-lg font-medium ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Adaptive difficulty based on performance
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className={`text-lg font-medium ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Track progress across 50+ skill areas
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className={`text-lg font-medium ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Get study recommendations daily
                    </span>
                  </div>
                </div>
                <button className={`group font-bold text-lg px-10 py-5 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center space-x-3 shadow-xl ${
                  isDarkMode
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-blue-500/25"
                    : "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-blue-500/25"
                } focus:outline-none focus:ring-4 focus:ring-blue-500/20`}
                aria-label="Take skills assessment">
                  <span>Take Assessment</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Feature 3: Community & Mentorship */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-green-500/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-green-300">
                  <Users className="w-4 h-4" />
                  <span>Community Driven</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white">
                  Learn from{" "}
                  <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    Industry Experts
                  </span>
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Connect with mentors from top companies, join study groups,
                  and participate in mock interview sessions with peers. Build
                  your network while you prepare.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">
                      1-on-1 mentorship with FAANG engineers
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">
                      Weekly group study sessions
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">
                      Peer-to-peer practice interviews
                    </span>
                  </div>
                </div>
                <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-full hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 flex items-center space-x-2">
                  <span>Join Community</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 bg-black/40 rounded-xl p-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          SM
                        </span>
                      </div>
                      <div>
                        <div className="text-white font-semibold">
                          Sarah Martinez
                        </div>
                        <div className="text-gray-400 text-sm">
                          Senior SWE @ Google
                        </div>
                      </div>
                      <div className="ml-auto bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Online
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 bg-black/40 rounded-xl p-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          AK
                        </span>
                      </div>
                      <div>
                        <div className="text-white font-semibold">Alex Kim</div>
                        <div className="text-gray-400 text-sm">PM @ Meta</div>
                      </div>
                      <div className="ml-auto bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        Mentoring
                      </div>
                    </div>
                    <div className="bg-purple-500/20 rounded-xl p-4">
                      <div className="text-white font-semibold mb-1">
                        Upcoming Session
                      </div>
                      <div className="text-purple-300 text-sm">
                        System Design Workshop - Tomorrow 2PM
                      </div>
                      <div className="text-gray-400 text-xs mt-1">
                        12 participants joined
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`py-24 px-4 sm:px-6 lg:px-8 ${
        isDarkMode ? "bg-black/20" : "bg-gradient-to-b from-slate-50 to-blue-50"
      }`}>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className={`text-5xl md:text-6xl font-black mb-6 tracking-tight ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`} style={{ lineHeight: '1.1' }}>
            Success{" "}
            <span className={`bg-gradient-to-r ${
              isDarkMode
                ? "from-purple-400 to-pink-400"
                : "from-purple-600 via-pink-600 to-red-500"
            } bg-clip-text text-transparent`}>
              Stories
            </span>
          </h2>
          <p className={`text-xl mb-20 font-medium max-w-3xl mx-auto ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`} style={{ lineHeight: '1.7' }}>
            Hear from professionals who transformed their careers with CareerPilot AI and achieved their dream jobs
          </p>

          <div className="relative">
            <div className={`${
              isDarkMode
                ? "bg-white/10 backdrop-blur-sm border border-white/10"
                : "bg-white/95 backdrop-blur-sm border-2 border-gray-200/50 shadow-2xl shadow-blue-500/10"
            } rounded-3xl p-10 md:p-16`}>
              <div className="flex justify-center mb-8">
                {[...Array(testimonials[currentTestimonial].rating)].map(
                  (_, i) => (
                    <Star
                      key={i}
                      className={`w-8 h-8 ${
                        isDarkMode ? "text-yellow-400" : "text-yellow-500"
                      } fill-current`}
                    />
                  )
                )}
              </div>

              <blockquote className={`text-2xl md:text-3xl mb-10 leading-relaxed font-semibold ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`} style={{ lineHeight: '1.6' }}>
                &quot;{testimonials[currentTestimonial].content}&quot;
              </blockquote>

              <div>
                <div className={`text-xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                  {testimonials[currentTestimonial].name}
                </div>
                <div className={`text-lg font-medium ${
                  isDarkMode ? "text-purple-400" : "text-purple-600"
                }`}>
                  {testimonials[currentTestimonial].role}
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-3 mt-10">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`h-4 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? `w-12 ${isDarkMode ? "bg-purple-400" : "bg-purple-600"}`
                      : `w-4 ${isDarkMode ? "bg-gray-600" : "bg-gray-300"} hover:${isDarkMode ? "bg-gray-500" : "bg-gray-400"}`
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
