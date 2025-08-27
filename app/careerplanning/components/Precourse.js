"use client";
import {
    Book,
    BookOpen,
    CheckCircle,
    ChevronDown,
    ChevronUp,
    Clock,
    ExternalLink,
    HelpCircle,
    Play,
    Star
} from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "../../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";

function Precourse({ pre, inputValue }) {
  const [expandedSection, setExpandedSection] = useState(null);
  const [data, setData] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(prev => prev === section ? null : section);
  };

  useEffect(() => {
    if (pre) {
      setData(pre);
    } else {
      const stored = localStorage.getItem("roadmap");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setData(parsed.precourse);
        } catch (error) {
          console.error("Invalid roadmap data in localStorage");
        }
      }
    }
  }, [pre]);

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 mb-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
          📚 Prerequisites & Preparation
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          {data.title || `Prerequisites for ${inputValue || 'Your Career'}`}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get ready for your journey with essential knowledge and preparation steps
        </p>
        {data.estimated_prep_time && (
          <div className="mt-4 inline-flex items-center gap-2 text-purple-600">
            <Clock className="h-4 w-4" />
            <span className="font-medium">Estimated prep time: {data.estimated_prep_time}</span>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Foundation Knowledge */}
        {data.foundation_knowledge && (
          <Card className="bg-white shadow-lg border-2 border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <BookOpen className="h-6 w-6 text-blue-600" />
                Foundation Knowledge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {data.foundation_knowledge.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Preparation Steps */}
        {data.preparation_steps && (
          <Card className="bg-white shadow-lg border-2 border-green-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-900">
                <CheckCircle className="h-6 w-6 text-green-600" />
                Preparation Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {data.preparation_steps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="h-6 w-6 flex-shrink-0 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Recommended Courses */}
      {data.recommended_courses && (
        <Card className="mb-8 bg-white shadow-lg border-2 border-purple-100">
          <CardHeader>
            <CardTitle
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection('courses')}
            >
              <div className="flex items-center gap-2 text-purple-900">
                <Play className="h-6 w-6 text-purple-600" />
                Recommended Courses ({data.recommended_courses.length})
              </div>
              {expandedSection === 'courses' ? (
                <ChevronUp className="h-5 w-5 text-purple-600" />
              ) : (
                <ChevronDown className="h-5 w-5 text-purple-600" />
              )}
            </CardTitle>
          </CardHeader>
          {expandedSection === 'courses' && (
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {data.recommended_courses.map((course, index) => (
                  <div key={index} className="border border-purple-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-800">{course.course}</h4>
                      <Badge className={`text-xs ${
                        course.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                        course.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {course.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{course.provider}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {course.duration}
                      </span>
                      {course.url && course.url !== "Multiple options available" && course.url !== "Check Coursera, edX, or Udemy" && (
                        <a
                          href={course.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-purple-600 hover:text-purple-800"
                        >
                          <ExternalLink className="h-3 w-3" />
                          View Course
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      )}

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Free Resources */}
        {(data.free_resources || data['Free Resources']) && (
          <Card className="bg-white shadow-lg border-2 border-orange-100">
            <CardHeader>
              <CardTitle
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection('free')}
              >
                <div className="flex items-center gap-2 text-orange-900">
                  <Star className="h-6 w-6 text-orange-600" />
                  Free Resources
                </div>
                {expandedSection === 'free' ? (
                  <ChevronUp className="h-5 w-5 text-orange-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-orange-600" />
                )}
              </CardTitle>
            </CardHeader>
            {expandedSection === 'free' && (
              <CardContent>
                <ul className="space-y-2">
                  {(data.free_resources || data['Free Resources']).map((resource, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Star className="h-4 w-4 text-orange-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{resource}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            )}
          </Card>
        )}

        {/* Practice Platforms */}
        {(data.practice_platforms || data['Practice Platforms']) && (
          <Card className="bg-white shadow-lg border-2 border-indigo-100">
            <CardHeader>
              <CardTitle
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection('practice')}
              >
                <div className="flex items-center gap-2 text-indigo-900">
                  <HelpCircle className="h-6 w-6 text-indigo-600" />
                  Practice Platforms
                </div>
                {expandedSection === 'practice' ? (
                  <ChevronUp className="h-5 w-5 text-indigo-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-indigo-600" />
                )}
              </CardTitle>
            </CardHeader>
            {expandedSection === 'practice' && (
              <CardContent>
                <ul className="space-y-2">
                  {(data.practice_platforms || data['Practice Platforms']).map((platform, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Play className="h-4 w-4 text-indigo-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{platform}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            )}
          </Card>
        )}
      </div>

      {/* Books Recommendation */}
      {(data.books || data['Recommended Books']) && (
        <Card className="mb-8 bg-white shadow-lg border-2 border-gray-100">
          <CardHeader>
            <CardTitle
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection('books')}
            >
              <div className="flex items-center gap-2 text-gray-900">
                <Book className="h-6 w-6 text-gray-600" />
                Recommended Books
              </div>
              {expandedSection === 'books' ? (
                <ChevronUp className="h-5 w-5 text-gray-600" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-600" />
              )}
            </CardTitle>
          </CardHeader>
          {expandedSection === 'books' && (
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {(data.books || data['Recommended Books']).map((book, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                    <Book className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    <span className="text-gray-700">{book}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      )}

      {/* Legacy Support for older format */}
      {data.essential_precourse_knowledge && (
        <Card className="mb-8 bg-white shadow-lg border-2 border-blue-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <BookOpen className="h-6 w-6 text-blue-600" />
              Essential Knowledge Areas
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data.essential_precourse_knowledge.map((section, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <h4 className="font-semibold text-gray-800 mb-3">{section.category}</h4>
                <ul className="space-y-2">
                  {section.items?.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {data.questions_to_ask_yourself && (
        <Card className="bg-white shadow-lg border-2 border-purple-100">
          <CardHeader>
            <CardTitle
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection('questions')}
            >
              <div className="flex items-center gap-2 text-purple-900">
                <HelpCircle className="h-6 w-6 text-purple-600" />
                Self-Reflection Questions
              </div>
              {expandedSection === 'questions' ? (
                <ChevronUp className="h-5 w-5 text-purple-600" />
              ) : (
                <ChevronDown className="h-5 w-5 text-purple-600" />
              )}
            </CardTitle>
          </CardHeader>
          {expandedSection === 'questions' && (
            <CardContent>
              <ul className="space-y-3">
                {data.questions_to_ask_yourself.map((question, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{question}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          )}
        </Card>
      )}
    </div>
  );
}

export default Precourse;
