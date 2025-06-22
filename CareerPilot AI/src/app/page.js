"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Play,
  CheckCircle,
  Users,
  BookOpen,
  Award,
  Star,
  ArrowRight,
  Target,
  TrendingUp,
  Zap,
  Globe,
  Brain,
  ShieldCheck,
} from "lucide-react";
import Footer from "./components/Footer";
import Image from "next/image";

export default function JobPrepHomepage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Wajid Daud Tamboli",
      role: "Full Stack Developer",
      content:
        "CareerPilot AI helped me land my dream job! The mock interviews were incredibly realistic.",
      rating: 5,
    },
    {
      name: "Shaikh Parvej",
      role: "Frontend Developer",
      content:
        "The AI-powered feedback system identified my weak points and helped me improve rapidly.",
      rating: 5,
    },
    {
      name: "Mohammad Hashir",
      role: "Research",
      content:
        "From zero to offer in 3 months. The structured learning path made all the difference.",
      rating: 5,
    },
    {
      name: "Bagwan Zaid",
      role: "Research",
      content:
        "The mentorship and hands-on projects gave me confidence to crack tough interviews.",
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
      icon: Globe, // placeholder - update as needed
      title: "Regional Language Support",
      description:
        "Delivers content and mentoring in local Indian languages using multilingual NLP models",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-pulse"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-purple-200">
                <Zap className="w-4 h-4" />
                <span>AI-Powered Job Preparation</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                Land Your
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {" "}
                  Dream Job
                </span>
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed">
                Master technical interviews, behavioral questions, and industry
                skills with our comprehensive preparation platform. Join
                thousands who've transformed their careers.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                  <span>Start Preparing Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button className="group bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all flex items-center justify-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">50K+</div>
                  <div className="text-gray-400">Success Stories</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">95%</div>
                  <div className="text-gray-400">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">500+</div>
                  <div className="text-gray-400">Companies</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-bounce"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span className="text-white">
                      Interview scheduled with Google
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span className="text-white">Mock interview completed</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span className="text-white">Skills assessment passed</span>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300">Interview Readiness</span>
                      <span className="text-purple-400 font-semibold">92%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-3 rounded-full w-[92%] animate-pulse"></div>
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
        <Image src={"/phases.png"} height={800} width={1000} alt="phases" />
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Succeed
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools and resources
              you need to excel in your job search and interviews.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
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
                <div className="inline-flex items-center space-x-2 bg-purple-500/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-purple-300">
                  <Zap className="w-4 h-4" />
                  <span>AI-Powered</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white">
                  Master Interviews with{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    AI Coaching
                  </span>
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Practice with our advanced AI interviewer that adapts to your
                  responses, provides real-time feedback, and simulates actual
                  interview scenarios from top tech companies.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">
                      Real-time voice and video analysis
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">
                      Personalized improvement suggestions
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">
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
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                  <div className="bg-black/40 rounded-2xl p-6 mb-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-white text-sm">
                      <div className="mb-2">
                        AI: "Tell me about a challenging project you worked on."
                      </div>
                      <div className="text-purple-300">
                        You: "In my previous role, I led a team to redesign..."
                      </div>
                      <div className="mt-4 bg-green-500/20 rounded-lg p-3">
                        <div className="text-green-300 text-xs">
                          ✓ Great structure! Consider adding specific metrics...
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Confidence Score</span>
                    <span className="text-purple-400 font-semibold">87%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full w-[87%]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2: Skill Assessment & Learning Paths */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative lg:order-1">
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-black/40 rounded-xl p-4">
                      <div className="text-white font-semibold mb-1">
                        JavaScript
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-green-400 h-2 rounded-full w-[92%]"></div>
                      </div>
                      <div className="text-green-400 text-sm mt-1">Expert</div>
                    </div>
                    <div className="bg-black/40 rounded-xl p-4">
                      <div className="text-white font-semibold mb-1">
                        System Design
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-yellow-400 h-2 rounded-full w-[68%]"></div>
                      </div>
                      <div className="text-yellow-400 text-sm mt-1">
                        Intermediate
                      </div>
                    </div>
                    <div className="bg-black/40 rounded-xl p-4">
                      <div className="text-white font-semibold mb-1">React</div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-400 h-2 rounded-full w-[85%]"></div>
                      </div>
                      <div className="text-blue-400 text-sm mt-1">Advanced</div>
                    </div>
                    <div className="bg-black/40 rounded-xl p-4">
                      <div className="text-white font-semibold mb-1">
                        Algorithms
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-red-400 h-2 rounded-full w-[45%]"></div>
                      </div>
                      <div className="text-red-400 text-sm mt-1">
                        Needs Work
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-500/20 rounded-xl p-4">
                    <div className="text-white font-semibold mb-2">
                      Recommended Focus
                    </div>
                    <div className="text-purple-300 text-sm">
                      Complete "Advanced Algorithms" track to boost interview
                      readiness by 23%
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6 lg:order-2">
                <div className="inline-flex items-center space-x-2 bg-blue-500/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-blue-300">
                  <Target className="w-4 h-4" />
                  <span>Personalized</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Smart Learning
                  </span>{" "}
                  Paths
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Take our comprehensive skill assessment and get a personalized
                  learning roadmap. Our AI identifies your strengths and
                  weaknesses to create the most efficient study plan.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">
                      Adaptive difficulty based on performance
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">
                      Track progress across 50+ skill areas
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">
                      Get study recommendations daily
                    </span>
                  </div>
                </div>
                <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 flex items-center space-x-2">
                  <span>Take Assessment</span>
                  <ArrowRight className="w-4 h-4" />
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Success
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Stories
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-16">
            Hear from professionals who transformed their careers with CareerPilot AI
          </p>

          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map(
                  (_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 text-yellow-400 fill-current"
                    />
                  )
                )}
              </div>

              <blockquote className="text-2xl text-white mb-8 leading-relaxed">
                "{testimonials[currentTestimonial].content}"
              </blockquote>

              <div>
                <div className="text-lg font-semibold text-white">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="text-purple-400">
                  {testimonials[currentTestimonial].role}
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial
                      ? "bg-purple-400 w-8"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
