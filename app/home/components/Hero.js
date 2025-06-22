"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { ThemeContext } from "../../components/ThemeContext";

function Hero() {
  const { isDarkMode } = useContext(ThemeContext);
  
  return (
    <>
      <div className={`${isDarkMode 
        ? "bg-gray-900 border-b border-amber-700/30" 
        : "bg-indigo-700"} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
                Your Journey from Campus to Company Starts Here
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                Personalized career paths, skills development, interview
                preparation and job opportunities tailored for students.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/"
                  className={`${isDarkMode 
                    ? "bg-amber-500 hover:bg-amber-600 text-gray-900" 
                    : "bg-white text-indigo-600 hover:bg-gray-100"} 
                    font-bold px-6 py-3 rounded-md transition flex items-center justify-center`}
                >
                  Explore Career Paths <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
                <a
                  href="#"
                  className={`border-2 ${isDarkMode 
                    ? "border-amber-500 text-white hover:bg-amber-500 hover:text-gray-900" 
                    : "border-white text-white hover:bg-white hover:text-indigo-600"} 
                    font-bold px-6 py-3 rounded-md transition flex items-center justify-center`}
                >
                  View Job Listings
                </a>
              </div>
            </div>
            <div className="hidden md:block md:w-1/2">
              <Image
                src={"/interview.png"}
                width={800}
                height={800}
                alt="Students exploring career options"
                className={`rounded-lg ${isDarkMode ? "border border-amber-700/30" : "shadow-xl"}`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
