import React, { useState } from "react";
import {
  Search,
  Filter,
  Heart,
  Clock,
  Calendar,
  Award,
  Book,
  User,
} from "lucide-react";

const CreateCourse = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  const course = [
    {
      course_name: "Introduction to Python",
      student_name: "Aarav Sharma",
      course_level: "Beginner",
      time_required: "4 weeks",
      branch: "Computer Science",
      create_date: "2025-03-15",
      likes: 120,
    },
    {
      course_name: "Advanced Data Structures",
      student_name: "Meera Patel",
      course_level: "Advanced",
      time_required: "6 weeks",
      branch: "Information Technology",
      create_date: "2025-02-28",
      likes: 98,
    },
    {
      course_name: "Machine Learning Basics",
      student_name: "Rohan Desai",
      course_level: "Intermediate",
      time_required: "5 weeks",
      branch: "Artificial Intelligence",
      create_date: "2025-01-20",
      likes: 135,
    },
    {
      course_name: "Web Development with React",
      student_name: "Sneha Iyer",
      course_level: "Intermediate",
      time_required: "6 weeks",
      branch: "Web Technology",
      create_date: "2025-04-01",
      likes: 152,
    },
    {
      course_name: "Database Management Systems",
      student_name: "Yash Raj",
      course_level: "Beginner",
      time_required: "3 weeks",
      branch: "Computer Applications",
      create_date: "2025-03-10",
      likes: 87,
    },
    {
      course_name: "Cloud Computing Essentials",
      student_name: "Ananya Reddy",
      course_level: "Intermediate",
      time_required: "4 weeks",
      branch: "Cloud Technology",
      create_date: "2025-03-25",
      likes: 110,
    },
    {
      course_name: "Cybersecurity Fundamentals",
      student_name: "Kunal Verma",
      course_level: "Beginner",
      time_required: "3 weeks",
      branch: "Cybersecurity",
      create_date: "2025-02-18",
      likes: 99,
    },
    {
      course_name: "DevOps Practices",
      student_name: "Tanvi Kulkarni",
      course_level: "Advanced",
      time_required: "5 weeks",
      branch: "DevOps",
      create_date: "2025-03-05",
      likes: 125,
    },
    {
      course_name: "UI/UX Design Fundamentals",
      student_name: "Ishaan Mehta",
      course_level: "Beginner",
      time_required: "4 weeks",
      branch: "Design",
      create_date: "2025-02-10",
      likes: 90,
    },
    {
      course_name: "Blockchain Essentials",
      student_name: "Priya Singh",
      course_level: "Intermediate",
      time_required: "6 weeks",
      branch: "Blockchain",
      create_date: "2025-03-20",
      likes: 101,
    },
  ];

  // Filter courses based on search term and level
  const filteredCourses = course.filter((item) => {
    return (
      item.course_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedLevel === "" || item.course_level === selectedLevel)
    );
  });

  // Get background color based on course level
  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-blue-100 text-blue-800";
      case "Advanced":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 mt-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Explore Courses
        </h2>

        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
          {/* Search Input */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search courses..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative flex-grow sm:flex-grow-0">
            <select
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 appearance-none w-full bg-white"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              <option value="">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <Filter
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100"
          >
            {/* Course Header with color based on level */}
            <div
              className={`px-4 py-3 ${getLevelColor(
                item.course_level
              )} flex justify-between items-center`}
            >
              <span className="font-medium">{item.course_level}</span>
              <span className="flex items-center">
                <Heart className="mr-1" size={16} />
                {item.likes}
              </span>
            </div>

            {/* Course Content */}
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {item.course_name}
              </h3>

              <div className="space-y-2 text-gray-600">
                <div className="flex items-center">
                  <User className="mr-2 text-gray-400" size={16} />
                  <span>{item.student_name}</span>
                </div>

                <div className="flex items-center">
                  <Book className="mr-2 text-gray-400" size={16} />
                  <span>{item.branch}</span>
                </div>

                <div className="flex items-center">
                  <Clock className="mr-2 text-gray-400" size={16} />
                  <span>{item.time_required}</span>
                </div>

                <div className="flex items-center">
                  <Calendar className="mr-2 text-gray-400" size={16} />
                  <span>{item.create_date}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  window.location.href = "/learn/course/start";
                }}
                className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300"
              >
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Show message when no courses match filters */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No courses match your search criteria. Try different keywords or
          filters.
        </div>
      )}
    </div>
  );
};

export default CreateCourse;
