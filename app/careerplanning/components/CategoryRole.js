"use client";
import { ArrowLeft, Briefcase, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";

const JobsRole = ({ setConform, setRole }) => {
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState(null);
  const [jobRoll, setJobRoll] = useState(null);
  // const [roadmap, setroadmap] = useState(false);

  useEffect(() => {
    const jobs = localStorage.getItem("jobs");
    const branch = localStorage.getItem("branch");

    if (jobs) {
      try {
        const parsedJobs = JSON.parse(jobs);
        console.log("CategoryRole: Raw data from localStorage:", parsedJobs);
        console.log("CategoryRole: Current branch:", branch);

        // Transform the data structure to match what the component expects
        let transformedData = parsedJobs;

        // Check if data has the new AI format
        const firstKey = Object.keys(parsedJobs)[0];

        if (firstKey && firstKey.includes("Job Roles") && Array.isArray(parsedJobs[firstKey])) {
          // Transform from AI format to component format
          transformedData = {
            jobRoles: parsedJobs[firstKey].map((item, index) => {
              // Handle different possible property names (case variations)
              const category = item.Category || item.category || item.CATEGORY || `Category ${index + 1}`;
              const roles = item.Roles || item.roles || item.ROLES || [];

              return {
                category: category,
                roles: Array.isArray(roles) ? roles : []
              };
            }),
            branch: firstKey.replace(" Job Roles", "")
          };
        } else if (firstKey && Array.isArray(parsedJobs[firstKey])) {
          // Handle case where the data is an array but doesn't have "Job Roles" in the key
          transformedData = {
            jobRoles: parsedJobs[firstKey].map((item, index) => {
              const category = item.Category || item.category || item.CATEGORY || `Category ${index + 1}`;
              const roles = item.Roles || item.roles || item.ROLES || [];
              return {
                category: category,
                roles: Array.isArray(roles) ? roles : []
              };
            }),
            branch: firstKey
          };
        } else {
          // Try to handle legacy format or direct jobRoles array
          if (parsedJobs.jobRoles && Array.isArray(parsedJobs.jobRoles)) {
            transformedData = parsedJobs;
          } else {
            // Convert whatever format we have to the expected format
            transformedData = {
              jobRoles: Object.entries(parsedJobs).map(([key, value]) => ({
                category: key,
                roles: Array.isArray(value) ? value : []
              })),
              branch: branch || Object.keys(parsedJobs)[0] || "Engineering"
            };
          }
        }

        console.log("CategoryRole: Final transformed data:", transformedData);
        setSkills(transformedData);
        setJobRoll(transformedData?.branch || branch || "Engineering");
      } catch (error) {
        console.error("Error parsing jobs from localStorage:", error);
      }
    } else {
      console.log("CategoryRole: No jobs data found in localStorage");
    }
    setLoading(false);
  }, []);

  // Add listener for localStorage changes to reload when new data is available
  useEffect(() => {
    const handleStorageChange = () => {
      // Force reload of data when localStorage changes
      const jobs = localStorage.getItem("jobs");
      const branch = localStorage.getItem("branch");

      if (jobs) {
        try {
          const parsedJobs = JSON.parse(jobs);
          console.log("CategoryRole: Storage changed, reloading data:", parsedJobs);

          // Apply the same transformation logic
          let transformedData = parsedJobs;
          const firstKey = Object.keys(parsedJobs)[0];

          if (firstKey && firstKey.includes("Job Roles") && Array.isArray(parsedJobs[firstKey])) {
            transformedData = {
              jobRoles: parsedJobs[firstKey].map((item, index) => {
                const category = item.Category || item.category || item.CATEGORY || `Category ${index + 1}`;
                const roles = item.Roles || item.roles || item.ROLES || [];
                return {
                  category: category,
                  roles: Array.isArray(roles) ? roles : []
                };
              }),
              branch: firstKey.replace(" Job Roles", "")
            };
          } else if (firstKey && Array.isArray(parsedJobs[firstKey])) {
            transformedData = {
              jobRoles: parsedJobs[firstKey].map((item, index) => {
                const category = item.Category || item.category || item.CATEGORY || `Category ${index + 1}`;
                const roles = item.Roles || item.roles || item.ROLES || [];
                return {
                  category: category,
                  roles: Array.isArray(roles) ? roles : []
                };
              }),
              branch: firstKey
            };
          } else {
            if (parsedJobs.jobRoles && Array.isArray(parsedJobs.jobRoles)) {
              transformedData = parsedJobs;
            } else {
              transformedData = {
                jobRoles: Object.entries(parsedJobs).map(([key, value]) => ({
                  category: key,
                  roles: Array.isArray(value) ? value : []
                })),
                branch: branch || Object.keys(parsedJobs)[0] || "Engineering"
              };
            }
          }

          setSkills(transformedData);
          setJobRoll(transformedData?.branch || branch || "Engineering");
        } catch (error) {
          console.error("Error parsing updated jobs from localStorage:", error);
        }
      }
    };

    // Listen for custom storage events
    window.addEventListener('jobsUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('jobsUpdated', handleStorageChange);
    };
  }, []);

  if (!skills) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Oops! No skills data available
          </h2>
          <p className="text-gray-600 mb-6">
            Please go back and select a job role to view skills.
          </p>
          <Button
            onClick={() =>
              (window.location.href = "/jobPreparation/departmentjobs")
            }
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
          >
            <ArrowLeft className="mr-2" size={16} />
            Go Back
          </Button>
        </Card>
      </div>
    );
  }
  const handleRoleClick = (job) => {
    localStorage.setItem("role", job);
    setConform(true);
  };

  return (
    <div className="container mx-auto p-6 ">
      <Card className="w-full max-w-4xl mx-auto shadow-xl overflow-hidden rounded-lg">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8">
          <div className="flex items-center space-x-4 mb-4">
            <Briefcase size={32} className="text-blue-200" />
            <h2 className="text-4xl font-extrabold">{jobRoll} Career Paths</h2>
          </div>
          <p className="text-blue-100 text-lg">
            Discover exciting roles and opportunities in the world of {jobRoll}
          </p>
        </CardHeader>
        <CardContent className="p-8 mt-5">
          {skills?.jobRoles?.map((role, index) => (
            <div key={index} value={role.category}>
              <p className="text-xl font-bold mb-2 text-blue-600 mt-5">
                {index + 1}. {role.category || ""}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {role.roles?.map((job, idx) => (
                  <Card
                    key={idx}
                    className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    onClick={() => {
                      handleRoleClick(job);
                      setRole(job);
                    }}
                  >
                    <CardContent className="p-4 flex items-center space-x-4 cursor-pointer">
                      <Badge
                        variant="secondary"
                        className="h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold"
                      >
                        {idx + 1}
                      </Badge>
                      <span className="font-medium text-base">{job || ""}</span>
                      <ChevronRight className="ml-auto text-blue-500" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
          <Input
            className="mt-5 p-5 space-x-4 w-1/2"
            placeholder="Add missing roles"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default JobsRole;
