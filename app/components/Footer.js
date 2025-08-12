"use client";
import { ArrowDown, ArrowUp, Target } from "lucide-react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

const Footer = () => {
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show buttons when scrolled more than 400px
      setShowScrollButtons(scrollY > 400);

      // Check if at top (within 100px of top)
      setIsAtTop(scrollY < 100);

      // Check if at bottom (within 100px of bottom)
      setIsAtBottom(scrollY + windowHeight >= documentHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  };

  return (
    <footer className={`relative py-16 ${
      isDarkMode
        ? "bg-gray-900 text-gray-300"
        : "bg-gradient-to-br from-slate-50 via-white to-blue-50 text-white font-bold"
    }`}>
      {/* Subtle top border gradient for visual separation */}
      <div className={`absolute top-0 left-0 right-0 h-px ${
        isDarkMode
          ? "bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"
          : "bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
      }`} />

      {/* Shadow effect for better separation */}
      <div className={`absolute top-0 left-0 right-0 h-8 ${
        isDarkMode
          ? "bg-gradient-to-b from-black/5 to-transparent"
          : "bg-gradient-to-b from-slate-200/20 to-transparent"
      }`} />

      <div className="container mx-auto px-6 md:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* CareerPilot AI Section - Enhanced visual appeal */}
          <div className="lg:pr-8">
            <div className="flex items-center space-x-3 mb-6">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300 ${
                  isDarkMode
                    ? "bg-gradient-to-br from-amber-400 to-amber-600 shadow-amber-500/25"
                    : "bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/25"
                }`}
              >
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3
                className={`text-2xl font-bold tracking-tight ${
                  isDarkMode ? "text-amber-400" : "text-white font-bold"
                }`}
                style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", lineHeight: '1.2', fontWeight: 'bold' }}
              >
                CareerPilot AI
              </h3>
            </div>
            <p className={`mb-8 text-base leading-relaxed font-bold ${
              isDarkMode ? "text-gray-300" : "text-white"
            }`}
            style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", lineHeight: '1.6', fontWeight: 'bold' }}>
              Your AI-powered career companion helping you navigate your professional
              journey with confidence and achieve your goals.
            </p>

            {/* Enhanced Social Media Icons with Brand Colors */}
            <div className="flex space-x-4">
              {/* Facebook */}
              <a
                href="#"
                className={`group p-3 rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${
                  isDarkMode
                    ? "text-gray-400 hover:text-white bg-gray-800/50 hover:bg-[#1877F2] hover:shadow-lg hover:shadow-blue-500/25"
                    : "text-white hover:text-gray-100 bg-gray-100 hover:bg-[#1877F2] hover:shadow-lg hover:shadow-blue-500/25"
                }`}
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>

              {/* Twitter/X */}
              <a
                href="#"
                className={`group p-3 rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${
                  isDarkMode
                    ? "text-gray-400 hover:text-white bg-gray-800/50 hover:bg-[#1DA1F2] hover:shadow-lg hover:shadow-blue-400/25"
                    : "text-white hover:text-gray-100 bg-gray-100 hover:bg-[#1DA1F2] hover:shadow-lg hover:shadow-blue-400/25"
                }`}
                aria-label="Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                className={`group p-3 rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${
                  isDarkMode
                    ? "text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gradient-to-r hover:from-[#E4405F] hover:to-[#FD5949] hover:shadow-lg hover:shadow-pink-500/25"
                    : "text-white hover:text-gray-100 bg-gray-100 hover:bg-gradient-to-r hover:from-[#E4405F] hover:to-[#FD5949] hover:shadow-lg hover:shadow-pink-500/25"
                }`}
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/wajid-daud-tamboli-3217b031a"
                target="_blank"
                rel="noopener noreferrer"
                className={`group p-3 rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${
                  isDarkMode
                    ? "text-gray-400 hover:text-white bg-gray-800/50 hover:bg-[#0077B5] hover:shadow-lg hover:shadow-blue-600/25"
                    : "text-white hover:text-gray-100 bg-gray-100 hover:bg-[#0077B5] hover:shadow-lg hover:shadow-blue-600/25"
                }`}
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Section - Enhanced with proper spacing and animations */}
          <div className="lg:px-4">
            <h3
              className={`text-xl font-bold mb-8 ${
                isDarkMode ? "text-amber-400" : "text-white font-bold"
              }`}
              style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", lineHeight: '1.2', fontWeight: 'bold' }}
            >
              Quick Links
            </h3>
            <nav>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/"
                    className={`group inline-block text-base transition-all duration-300 relative font-bold ${
                      isDarkMode
                        ? "text-gray-300 hover:text-amber-400"
                        : "!text-white hover:!text-gray-100"
                    }`}
                    style={{
                      fontFamily: "'Inter', 'Segoe UI', sans-serif",
                      lineHeight: '1.5',
                      fontWeight: 'bold',
                      color: isDarkMode ? undefined : '#FFFFFF !important'
                    }}
                  >
                    Home
                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                      isDarkMode ? "bg-amber-400" : "bg-gray-100"
                    }`}></span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careerplanning"
                    className={`group inline-block text-base transition-all duration-300 relative font-bold ${
                      isDarkMode
                        ? "text-gray-300 hover:text-amber-400"
                        : "!text-white hover:!text-gray-100"
                    }`}
                    style={{
                      fontFamily: "'Inter', 'Segoe UI', sans-serif",
                      lineHeight: '1.5',
                      fontWeight: 'bold',
                      color: isDarkMode ? undefined : '#FFFFFF !important'
                    }}
                  >
                    Career Planning
                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                      isDarkMode ? "bg-amber-400" : "bg-gray-100"
                    }`}></span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/preparation"
                    className={`group inline-block text-base transition-all duration-300 relative font-bold ${
                      isDarkMode
                        ? "text-gray-300 hover:text-amber-400"
                        : "!text-white hover:!text-gray-100"
                    }`}
                    style={{
                      fontFamily: "'Inter', 'Segoe UI', sans-serif",
                      lineHeight: '1.5',
                      fontWeight: 'bold',
                      color: isDarkMode ? undefined : '#FFFFFF !important'
                    }}
                  >
                    Job Preparation
                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                      isDarkMode ? "bg-amber-400" : "bg-gray-100"
                    }`}></span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/learn"
                    className={`group inline-block text-base transition-all duration-300 relative font-bold ${
                      isDarkMode
                        ? "text-gray-300 hover:text-amber-400"
                        : "!text-white hover:!text-gray-100"
                    }`}
                    style={{
                      fontFamily: "'Inter', 'Segoe UI', sans-serif",
                      lineHeight: '1.5',
                      fontWeight: 'bold',
                      color: isDarkMode ? undefined : '#FFFFFF !important'
                    }}
                  >
                    Learning Resources
                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                      isDarkMode ? "bg-amber-400" : "bg-gray-100"
                    }`}></span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/company"
                    className={`group inline-block text-base transition-all duration-300 relative font-bold ${
                      isDarkMode
                        ? "text-gray-300 hover:text-amber-400"
                        : "!text-white hover:!text-gray-100"
                    }`}
                    style={{
                      fontFamily: "'Inter', 'Segoe UI', sans-serif",
                      lineHeight: '1.5',
                      fontWeight: 'bold',
                      color: isDarkMode ? undefined : '#FFFFFF !important'
                    }}
                  >
                    For Companies
                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                      isDarkMode ? "bg-amber-400" : "bg-gray-100"
                    }`}></span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact Us Section - Enhanced with clickable interactions */}
          <div className="lg:pl-4">
            <h3
              className={`text-xl font-bold mb-8 ${
                isDarkMode ? "text-amber-400" : "text-white font-bold"
              }`}
              style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", lineHeight: '1.2', fontWeight: 'bold' }}
            >
              Contact Us
            </h3>
            <ul className="space-y-6">
              {/* Location */}
              <li className="flex items-start space-x-4 group">
                <div
                  className={`p-3 rounded-xl transition-all duration-300 group-hover:scale-105 ${
                    isDarkMode ? "bg-gray-800/70 group-hover:bg-gray-700" : "bg-white/20 group-hover:bg-white/30 backdrop-blur-sm"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={isDarkMode ? "text-amber-400" : "text-blue-700"}
                    style={{ color: isDarkMode ? undefined : '#1d4ed8' }}
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <span className={`text-base leading-relaxed font-bold ${
                  isDarkMode ? "text-gray-300" : "text-white"
                }`}
                style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", lineHeight: '1.5', fontWeight: 'bold' }}>
                  N.K. Orchid College of Engineering & Technology, Solapur
                </span>
              </li>

              {/* Phone - Clickable */}
              <li className="flex items-center space-x-4 group">
                <div
                  className={`p-3 rounded-xl transition-all duration-300 group-hover:scale-105 ${
                    isDarkMode ? "bg-gray-800/70 group-hover:bg-gray-700" : "bg-white/20 group-hover:bg-white/30 backdrop-blur-sm"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={isDarkMode ? "text-amber-400" : "text-blue-700"}
                    style={{ color: isDarkMode ? undefined : '#1d4ed8' }}
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <a
                  href="tel:+919667033839"
                  className={`text-base transition-all duration-300 hover:scale-105 font-bold ${
                    isDarkMode ? "text-gray-300 hover:text-amber-400" : "!text-white hover:!text-gray-100"
                  }`}
                  style={{
                    fontFamily: "'Inter', 'Segoe UI', sans-serif",
                    lineHeight: '1.5',
                    fontWeight: 'bold',
                    color: isDarkMode ? undefined : '#FFFFFF !important'
                  }}
                >
                  +91 9667033839
                </a>
              </li>

              {/* Email - Clickable */}
              <li className="flex items-center space-x-4 group">
                <div
                  className={`p-3 rounded-xl transition-all duration-300 group-hover:scale-105 ${
                    isDarkMode ? "bg-gray-800/70 group-hover:bg-gray-700" : "bg-white/20 group-hover:bg-white/30 backdrop-blur-sm"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={isDarkMode ? "text-amber-400" : "text-blue-700"}
                    style={{ color: isDarkMode ? undefined : '#1d4ed8' }}
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <a
                  href="mailto:wajidtamboli@orchidengg.ac.in"
                  className={`text-base transition-all duration-300 hover:scale-105 break-all font-bold ${
                    isDarkMode ? "text-gray-300 hover:text-amber-400" : "!text-white hover:!text-gray-100"
                  }`}
                  style={{
                    fontFamily: "'Inter', 'Segoe UI', sans-serif",
                    lineHeight: '1.5',
                    fontWeight: 'bold',
                    color: isDarkMode ? undefined : '#FFFFFF !important'
                  }}
                >
                  wajidtamboli@orchidengg.ac.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div
          className={`mt-16 pt-8 border-t text-center ${
            isDarkMode ? "border-gray-700 text-gray-400" : "border-slate-200 text-white"
          }`}
        >
          <p className="text-sm font-bold"
             style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", lineHeight: '1.5', fontWeight: 'bold' }}>
            &copy; {new Date().getFullYear()} CareerPilot AI. All rights reserved.
          </p>
        </div>
      </div>

      {/* Dual Scroll Buttons - Top & Bottom */}
      {showScrollButtons && (
        <div className="fixed bottom-8 right-8 flex flex-col space-y-3 z-50">
          {/* Scroll to Top Button */}
          {!isAtTop && (
            <button
              onClick={scrollToTop}
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 group ${
                isDarkMode
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-amber-500/25 hover:shadow-amber-500/40"
                  : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-blue-500/25 hover:shadow-blue-500/40"
              }`}
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
            </button>
          )}

          {/* Scroll to Bottom Button */}
          {!isAtBottom && (
            <button
              onClick={scrollToBottom}
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 group ${
                isDarkMode
                  ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-amber-600/25 hover:shadow-amber-600/40"
                  : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-indigo-500/25 hover:shadow-indigo-500/40"
              }`}
              aria-label="Scroll to bottom"
            >
              <ArrowDown className="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
            </button>
          )}
        </div>
      )}
    </footer>
  );
};

export default Footer;
