"use client";
import { Menu, Target, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect, useRef, useContext } from "react";
import ThemeToggle from "./ThemeToggle";
import { ThemeContext } from "./ThemeContext";
import { usePathname } from "next/navigation";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRefs = useRef([]);
  const { isDarkMode } = useContext(ThemeContext);
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Planning",
      submenu: [
        {
          name: "Department Roles",
          href: "/careerplanning?page=DepartmentJobRoles",
        },
        { name: "Role Selection", href: "/careerplanning/checkcareer" },
        { name: "Role Roadmap", href: "/careerplanning?page=RoleRoadMap" },
        { name: "Course Roadmap", href: "/careerplanning?page=CourseRoadmap" },
      ],
    },
    {
      name: "Learn",
      submenu: [
        { name: "Courses", href: "/learn/course" },
        { name: "Projects", href: "/learn?page=Projects" },
        { name: "Recall", href: "/learn/recall" },
        { name: "30 days Preparation", href: "/learn?page=DayRemains" },
        { name: "Tool Company Use", href: "/learn?page=ToolsCompanyUse" },
        { name: "Check my Resume", href: "/learn?page=ResumeExtractor" },
      ],
    },
    {
      name: "Preparation",
      submenu: [
        {
          name: "Aptitude Preparation",
          href: "/preparation?page=AptitudeExam",
        },
        {
          name: "Coding Preparation",
          href: "/preparation?page=CodingRound",
        },
        { name: "Mock interview", href: "/preparation/mockinterview" },
        { name: "Softskill", href: "/preparation/softskill" },
      ],
    },
    {
      name: "For Company",
      submenu: [
        {
          name: "Prepare for jobskill",
          href: "/company?page=PrepareForJob",
        },
        { name: "Company Problem", href: "/company?page=CompanyProblem" },
        { name: "Hire Talent", href: "/company?page=HiringTalent" },
        { name: "Take Assisment", href: "/company?page=TakeAssisment" },
      ],
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRefs.current.every((ref) => ref && !ref.contains(event.target))
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const handleDropdownToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleMobileMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    // Close any open dropdowns when toggling mobile menu
    setActiveDropdown(null);
  };

  const handleLinkClick = () => {
    // Close mobile menu and dropdowns when a link is clicked
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <nav className={`relative z-50 ${isDarkMode 
      ? "bg-gray-900/90 backdrop-blur-md border-b border-gray-700" 
      : "bg-black/10 backdrop-blur-md border-b border-white/10 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div
            onClick={() => {
              window.location.href = "/";
            }}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
           -1/*   isDarkMode 
              ? "bg-gradient-to-r from-amber-400 to-amber-600" 
              : "bg-gradient-to-r from-purple-400 to-pink-400"
            }`}>
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">
              CareerPilot AI
              {/* <span className={`text-xs ml-2 ${isDarkMode ? "text-amber-400" : "text-yellow-300"}`}>
                {isDarkMode ? "DARK" : "LIGHT"}
              </span> */}
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href={"/home"}
              className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors duration-200 py-2"
            >
              <span>Home</span>
            </Link>
            {menuItems.map((item, index) => (
              <div
                key={item.name}
                className="relative"
                ref={(el) => (dropdownRefs.current[index] = el)}
              >
                <button
                  className={`flex items-center space-x-1 text-gray-300 hover:text-white transition-colors duration-200 py-2 ${
                    isDarkMode && activeDropdown === index ? "text-amber-400" : ""
                  }`}
                  onClick={() => handleDropdownToggle(index)}
                  onMouseEnter={() => setActiveDropdown(index)}
                >
                  <span>{item.name}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Desktop Dropdown */}
                {activeDropdown === index && (
                  <div
                    className={`absolute top-full left-0 mt-1 w-56 shadow-xl py-2 animate-in fade-in slide-in-from-top-2 duration-200 ${
                      isDarkMode 
                      ? "bg-gray-800 border border-amber-700/30" 
                      : "bg-black/95 backdrop-blur-md border border-white/10"
                    }`}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.submenu.map((subItem) => (
                      <a
                        key={subItem.name}
                        href={subItem.href}
                        className={`block px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200 ${
                          isDarkMode ? "hover:bg-gray-700 hover:text-amber-400" : "hover:bg-white/10"
                        }`}
                        onClick={handleLinkClick}
                      >
                        {subItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {/* Theme Toggle */}
            <div className="flex items-center">
              <ThemeToggle />
            </div>
            <Link
              href={"/careerplanning?page=DepartmentJobRoles"}
              className={`text-white px-6 py-2 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg ${
                isDarkMode
                ? "bg-amber-500 hover:bg-amber-600"
                : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              }`}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
          <button
              className={`text-white p-2 rounded-lg transition-colors duration-200 ${
                isDarkMode ? "hover:bg-gray-700" : "hover:bg-white/10"
              }`}
            onClick={handleMobileMenuToggle}
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`md:hidden border-t animate-in slide-in-from-top duration-200 ${
          isDarkMode 
          ? "bg-gray-800/95 border-amber-700/30" 
          : "bg-black/95 backdrop-blur-md border-white/10"
        }`}>
          <div className="px-4 py-4 space-y-3 max-h-96 overflow-y-auto">
            {menuItems.map((item, index) => (
              <div
                key={item.name}
                className={`border-b pb-3 last:pb-0 last:border-b-0 ${
                  isDarkMode ? "border-amber-700/20" : "border-white/5"
                }`}
              >
                <button
                  className={`flex items-center justify-between w-full text-gray-300 hover:text-white transition-colors duration-200 py-2 ${
                    isDarkMode && activeDropdown === index ? "text-amber-400" : ""
                  }`}
                  onClick={() => handleDropdownToggle(index)}
                >
                  <span className="font-medium">{item.name}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Mobile Submenu */}
                {activeDropdown === index && (
                  <div className="mt-2 ml-4 space-y-1 animate-in slide-in-from-top duration-200">
                    {item.submenu.map((subItem) => (
                      <a
                        key={subItem.name}
                        href={subItem.href}
                        className={`block text-gray-400 hover:text-white transition-colors duration-200 py-2 px-2 rounded ${
                          isDarkMode ? "hover:bg-gray-700 hover:text-amber-400" : "hover:bg-white/5"
                        }`}
                        onClick={handleLinkClick}
                      >
                        {subItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button
              className={`w-full text-white px-6 py-3 rounded-full transition-all duration-200 shadow-lg mt-4 ${
                isDarkMode
                ? "bg-amber-500 hover:bg-amber-600"
                : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              }`}
              onClick={handleLinkClick}
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
