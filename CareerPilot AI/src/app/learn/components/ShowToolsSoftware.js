import React, { useState } from "react";
import { Search, Laptop, Grid3X3, List } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function ShowToolsSoftware({ tools, value }) {
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTools = tools.tools_and_software.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.use.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className=" dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-50 to-cyan-200 bg-clip-text text-transparent">
                Engineering Tools
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Essential software for professionals
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg ${
                  viewMode === "grid"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                <Grid3X3 size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg ${
                  viewMode === "list"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative max-w-2xl">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search tools and software..."
              className="w-full pl-12 pr-4 py-3 border-0 rounded-xl bg-white dark:bg-gray-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Tools Grid/List */}
        <div
          className={`
          ${
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }`}
        >
          {filteredTools?.map((tool, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                      {tool.name}
                    </CardTitle>
                    <CardDescription className="text-blue-600 dark:text-blue-400 font-medium mt-1">
                      {tool.use}
                    </CardDescription>
                  </div>
                  <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg">
                    <Laptop
                      size={20}
                      className="text-blue-600 dark:text-blue-400"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 group-hover:line-clamp-none transition-all">
                  {tool.description}
                </p>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Top Users:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {tool.top_companies_uses.map((company, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                      >
                        {company}
                      </span>
                    ))}
                  </div>
                  <Button
                    onClick={() => {
                      window.location.href = `/course?course=${encodeURIComponent(
                        tool.name
                      )}&role=${encodeURIComponent(value)}`;
                    }}
                  >
                    Get Course
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowToolsSoftware;
