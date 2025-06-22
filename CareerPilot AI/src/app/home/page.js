"use client";
import Link from "next/link";
import {
  BookOpen,
  Code,
  Users,
  FileText,
  Building,
  Mail,
  MessageSquare,
  FileCheck,
  Ghost,
  Github,
  Globe,
  AlertTriangle,
  BookmarkCheck,
  Scale,
  Linkedin,
  FolderGit2,
  FileSpreadsheet,
  Map,
  Briefcase,
  Brain,
  GraduationCap,
  PenTool,
  BookOpenCheck,
} from "lucide-react";
import { FaPaperPlane } from "react-icons/fa";
import ChatBot from "../components/ChatBot";

export default function Home() {
  const navigationItems = [
    {
      category: "Phase 1 :Career Planning",
      items: [
        {
          href: " /careerplanning?page=DepartmentJobRoles",
          icon: Briefcase,
          text: "Department-wise Job Roles",
        },
        {
          href: " /careerplanning/checkcareer",
          icon: Briefcase,
          text: "Check my Role",
        },
        {
          href: " /careerplanning?page=RoleRoadMap",
          icon: Map,
          text: "Role Roadmap",
        },
        {
          href: "/careerplanning?page=CourseRoadmap",
          icon: Map,
          text: "Course Roadmap",
        },
      ],
    },
    {
      category: "Phase 2 :Learning",
      items: [
        {
          href: "/learn/course",
          icon: GraduationCap,
          text: "Courses",
        },
        {
          href: "/learn?page=CreateCourse",
          icon: FolderGit2,
          text: "Created Courses",
        },
        {
          href: " /learn?page=Projects",
          icon: FolderGit2,
          text: "Projects",
        },
        {
          href: "/learn/recall",
          icon: BookOpen,
          text: "Recall",
        },
        {
          href: " /learn?page=DayRemains",
          icon: BookOpenCheck,
          text: "30 days preparation",
        },
        {
          href: " /learn?page=ToolsCompanyUse",
          icon: BookOpenCheck,
          text: "Tool company use",
        },
        {
          href: "/learn?page=ResumeExtractor",
          icon: BookOpenCheck,
          text: "Check my Resume",
        },
      ],
    },
    {
      category: "Phase 3 :Interview Preparation",
      items: [
        {
          href: "/preparation/softskill",
          icon: Brain,
          text: "Soft Skill Interview",
        },

        {
          href: " /preparation?page=AptitudeExam",
          icon: FileSpreadsheet,
          text: "Aptitude Exam",
        },

        {
          href: "/preparation/mockinterview",
          icon: PenTool,
          text: "Mock Interview",
        },

        {
          href: " /preparation?page=CodingRound",
          icon: Code,
          text: "Coding Round",
        },
      ],
    },
    {
      category: "For Companies",
      items: [
        {
          href: "/company?page=HiringTalent",
          icon: Brain,
          text: "Hire Talents",
        },
        {
          href: "/company?page=TakeAssisment",
          icon: FileSpreadsheet,
          text: "Arrange Assessment",
        },
        {
          href: "/company?page=CompanyProblem",
          icon: FileSpreadsheet,
          text: "Company Problem",
        },
      ],
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-12">
            AI Powered Career Coach for Job Preparation
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {navigationItems.map((category, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  {category.category}
                </h2>
                <div className="space-y-3">
                  {category.items.map((item, itemIdx) => (
                    <Link
                      key={itemIdx}
                      href={item.href}
                      className="flex items-center p-2 rounded-md hover:bg-gray-50 transition-colors duration-150 text-gray-700 hover:text-gray-900"
                    >
                      <item.icon className="w-5 h-5 mr-3 text-blue-600" />
                      <span>{item.text}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <ChatBot />
          </div>
        </div>
      </div>
    </>
  );
}
