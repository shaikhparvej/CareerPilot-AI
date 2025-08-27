"use client";

import { useEffect, useState } from 'react';

const CreateCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [error, setError] = useState(null);


  // Fetch courses from Gemini API with search and filter
  const fetchCourses = async (q = searchTerm, level = filterLevel) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (q) params.append("q", q);
      if (level) params.append("level", level);
      const response = await fetch(`/api/gemini/courses?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch courses from Gemini API");
      const data = await response.json();
      setCourses(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Unknown error fetching courses");
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter courses based on search and level
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || course.level?.toLowerCase() === filterLevel.toLowerCase();
    return matchesSearch && matchesLevel;
  });


  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Courses</h2>
            <p className="text-gray-600">Fetching course content...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">🎓 Career Courses</h1>
          <p className="text-lg text-gray-600 mb-6">
            Discover courses tailored to accelerate your career growth
          </p>

          {error && (
            <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg max-w-md mx-auto">
              <span className="text-yellow-800 text-sm">⚠️ {error}</span>
            </div>
          )}

          <button
            onClick={fetchCourses}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            🔄 Refresh Courses
          </button>
        </div>

        {/* Search and Filter Controls */}
        <form
          className="flex flex-col md:flex-row gap-4 mb-8"
          onSubmit={e => {
            e.preventDefault();
            fetchCourses(searchTerm, filterLevel);
          }}
        >
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="🔍 Search courses, skills, or categories..."
              className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative min-w-[200px]">
            <select
              className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
            >
              <option value="all">🎯 All Levels</option>
              <option value="beginner">🌱 Beginner</option>
              <option value="intermediate">📈 Intermediate</option>
              <option value="advanced">🚀 Advanced</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            🔍 Search
          </button>
        </form>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
              <div className="relative">
                <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-6xl">📚</span>
                </div>
                <div className="absolute top-4 right-4">
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors">
                    <span className="text-gray-400 hover:text-red-500">❤️</span>
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                    course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {course.level}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-blue-600 font-semibold">{course.category}</span>
                  {course.rating && (
                    <div className="flex items-center gap-1 ml-auto">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm text-gray-600">{course.rating}</span>
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4">
                  {course.description}
                </p>

                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <span>⏰</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>👥</span>
                    <span>{course.students || 'N/A'}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <span>👨‍🏫</span>
                      <span>by {course.instructor}</span>
                    </div>
                  </div>
                  <div className="font-bold text-lg text-blue-600">
                    {course.price || 'Free'}
                  </div>
                </div>

                <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">
                  📝 Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <span className="text-6xl mb-4 block">📚</span>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No courses found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateCourse;
