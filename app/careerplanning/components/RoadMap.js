"use client";
import {
  AlertCircle,
  ArrowLeft,
  Award,
  Book,
  BookOpen,
  ChevronRight,
  Clock,
  DollarSign,
  GraduationCap,
  Lightbulb,
  MessageSquare,
  Target,
  TrendingUp,
  Trophy,
  Users
} from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";

const StudentRoadMap = ({ setTree, roadmap }) => {
  const [data, setData] = useState(null);
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    if (roadmap) {
      setData(roadmap);
    } else {
      const stored = localStorage.getItem("roadmap");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setData(parsed.roadmap);
        } catch (error) {
          console.error("Invalid roadmap data in localStorage");
        }
      }
    }
  }, [roadmap]);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your personalized roadmap...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Enhanced Header Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            🚀 AI-Generated Career Roadmap
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-blue-900 tracking-tight">
            {data.title || "Your Career Roadmap"}
          </h1>
          <p className="text-lg text-blue-700 max-w-3xl mx-auto leading-relaxed">
            {data.introduction}
          </p>
          <div className="flex justify-center items-center gap-4 text-sm text-blue-600">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {data.timeframe}
            </span>
            {data.salary_progression && (
              <span className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                {data.salary_progression}
              </span>
            )}
          </div>
        </div>

        {/* Goals and Objectives Enhanced Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="bg-white/90 backdrop-blur border-2 border-blue-100 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Target className="h-6 w-6 text-blue-600" />
                Career Goals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {(data.goals || []).map((goal, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <span className="text-blue-700">{goal}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur border-2 border-blue-100 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Trophy className="h-6 w-6 text-blue-600" />
                Key Objectives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {(data.objectives || []).map((objective, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="h-6 w-6 flex-shrink-0 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <span className="text-blue-700">{objective}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur border-2 border-blue-100 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <TrendingUp className="h-6 w-6 text-blue-600" />
                Industry Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {(data.industry_trends || []).slice(0, 4).map((trend, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                    <span className="text-blue-700 text-sm">{trend}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Learning Phases */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              🎯 Your Learning Journey
            </h2>
            <p className="text-blue-600 max-w-2xl mx-auto">
              Follow this structured path to achieve your career goals. Each phase builds upon the previous one.
            </p>
          </div>

          {/* Phase Navigation */}
          {data.phases && data.phases.length > 1 && (
            <div className="flex justify-center mb-8">
              <div className="flex space-x-2 bg-white rounded-lg p-2 shadow-lg">
                {data.phases.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActivePhase(index)}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      activePhase === index
                        ? 'bg-blue-600 text-white'
                        : 'text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    Phase {index + 1}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Display Active Phase or All Phases */}
          {data.phases ? (
            data.phases.length > 1 ? (
              <PhaseCard
                phase={data.phases[activePhase]}
                index={activePhase}
              />
            ) : (
              data.phases.map((phase, index) => (
                <PhaseCard
                  key={index}
                  phase={phase}
                  index={index}
                />
              ))
            )
          ) : (
            // Fallback for old format
            data.stages && data.stages.map((stage, index) => (
              <LegacyStageCard key={index} stage={stage} index={index} />
            ))
          )}
        </div>

        {/* Additional Information Sections */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Skills by Level */}
          {data.skills_by_level && (
            <Card className="bg-white/90 backdrop-blur border-2 border-blue-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <GraduationCap className="h-6 w-6 text-blue-600" />
                  Skills by Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                {Object.entries(data.skills_by_level).map(([level, skills]) => (
                  <div key={level} className="mb-4">
                    <h4 className="font-semibold text-blue-800 capitalize mb-2">{level}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, idx) => (
                        <Badge key={idx} className="bg-blue-100 text-blue-700 text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Certifications */}
          {data.certifications && (
            <Card className="bg-white/90 backdrop-blur border-2 border-blue-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <Award className="h-6 w-6 text-blue-600" />
                  Recommended Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {data.certifications.map((cert, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Award className="h-4 w-4 text-yellow-500 mt-1 flex-shrink-0" />
                      <span className="text-blue-700">{cert}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Challenges and Networking */}
        <div className="grid lg:grid-cols-2 gap-6">
          {data.challenges && (
            <Card className="bg-white/90 backdrop-blur border-2 border-orange-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-900">
                  <AlertCircle className="h-6 w-6 text-orange-600" />
                  Common Challenges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {data.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-orange-500 mt-1 flex-shrink-0" />
                      <span className="text-orange-700">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {data.networking && (
            <Card className="bg-white/90 backdrop-blur border-2 border-green-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-900">
                  <Users className="h-6 w-6 text-green-600" />
                  Networking Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {data.networking.map((opportunity, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Users className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-green-700">{opportunity}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Interview Preparation */}
        {data.interview_preparation && (
          <Card className="bg-white/90 backdrop-blur border-2 border-purple-100 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-900">
                <MessageSquare className="h-6 w-6 text-purple-600" />
                Interview Preparation Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.interview_preparation.map((topic, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                    <MessageSquare className="h-4 w-4 text-purple-500" />
                    <span className="text-purple-700">{topic}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 pb-12">
          <Button
            onClick={() => setTree(false)}
            className="bg-white text-blue-700 hover:bg-blue-50 border border-blue-200 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Generate New Roadmap
          </Button>

          <Button
            onClick={() => {
              window.location.href = "/learn";
            }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex items-center gap-2"
          >
            Start Learning Journey
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Component for enhanced phase display
const PhaseCard = ({ phase, index }) => (
  <Card className="bg-white/90 backdrop-blur border-2 border-blue-100 shadow-lg transform hover:scale-[1.01] transition-transform duration-300">
    <CardHeader className="border-b border-blue-100">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Badge className="bg-blue-100 text-blue-700 mb-2">
            {phase.phase || `Phase ${index + 1}`}
          </Badge>
          <CardTitle className="text-2xl text-blue-900">
            {phase.phase || phase.stage}
          </CardTitle>
          <p className="text-blue-600">{phase.description}</p>
        </div>
        <Badge className="bg-blue-600 flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {phase.duration}
        </Badge>
      </div>
    </CardHeader>

    <CardContent className="grid gap-6 p-6">
      {/* Skills and Projects Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {phase.skills && (
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Skills to Develop
            </h3>
            <div className="flex flex-wrap gap-2">
              {phase.skills.map((skill, idx) => (
                <Badge key={idx} className="bg-blue-100 text-blue-700">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {phase.projects && (
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Recommended Projects
            </h3>
            <ul className="space-y-2">
              {phase.projects.map((project, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-400 mt-2" />
                  <span className="text-blue-700">{project}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Resources and Milestones */}
      <div className="grid md:grid-cols-2 gap-6 bg-blue-50 p-4 rounded-lg">
        {phase.resources && (
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <Book className="h-5 w-5" />
              Learning Resources
            </h3>
            <ul className="space-y-2">
              {phase.resources.map((resource, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Book className="h-4 w-4 text-blue-500 mt-1" />
                  <span className="text-blue-700">{resource}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {phase.milestones && (
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Key Milestones
            </h3>
            <ul className="space-y-2">
              {phase.milestones.map((milestone, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Trophy className="h-4 w-4 text-yellow-500 mt-1" />
                  <span className="text-blue-700">{milestone}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);

// Legacy component for backward compatibility
const LegacyStageCard = ({ stage, index }) => (
  <Card className="bg-white/90 backdrop-blur border-2 border-blue-100 shadow-lg">
    <CardHeader>
      <CardTitle className="text-xl text-blue-900">
        Stage {index + 1}: {stage.stage}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-blue-700 mb-4">{stage.description}</p>
      {stage.topics && (
        <div className="space-y-2">
          <h4 className="font-semibold text-blue-800">Topics:</h4>
          <ul className="list-disc list-inside text-blue-700">
            {stage.topics.map((topic, idx) => (
              <li key={idx}>{topic}</li>
            ))}
          </ul>
        </div>
      )}
    </CardContent>
  </Card>
);

export default StudentRoadMap;
