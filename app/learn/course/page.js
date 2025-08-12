"use client";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useEffect, useState, Suspense } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import BasicData from "./components/BasicData";
import EditCourse from "./components/EditCourse";
import PreviewCourse from "./components/PreviewCourse";
import ProgressSteps from "./components/ProgressStep";

const CreateCoursePage = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [content, setContent] = useState();
  // const localStorageContent = localStorage.getItem("content");
  const [localStorageContent, setLocalStorageContent] = useState();

  useEffect(() => {
    if (localStorageContent) {
      setContent(JSON.parse(localStorageContent));
    }
    if (content) {
      setLocalStorageContent(JSON.stringify(content));
    }
  }, []);

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    localStorage.removeItem("content");
    setActiveStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-blue-700 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/400')] opacity-10 bg-cover bg-center" />
        <div className="container mx-auto px-4 relative">
          <h1 className="text-4xl font-bold text-white mb-2">
            Create New Course
          </h1>
          <div className="flex items-center space-x-2 text-blue-100">
            <span className="text-sm">Course Creation</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-sm font-medium">
              {activeStep === 1
                ? "Basic Details"
                : activeStep === 2
                ? "Content"
                : "Review"}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <ProgressSteps activeStep={activeStep} />

      {activeStep == 1 && (
        <div>
          <Suspense fallback={<div>Loading course data...</div>}>
            <BasicData
              activeStep={activeStep}
              handleBack={handleBack}
              handleNext={handleNext}
              setContent={setContent}
            />
          </Suspense>

          <div className="container mx-auto px-4 py-8">
            <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
              <p className="text-center font-extrabold">OR</p>

              <h2 className="text-2xl font-semibold mb-4">Join a Course</h2>

              <div className="mb-4">
                <Label htmlFor="courseId">Course ID</Label>
                <Input
                  id="courseId"
                  placeholder="Enter your course ID"
                  className="mt-2"
                />
              </div>

              <div className="max-w-3xl flex justify-between mt-6">
                <Button
                  onClick={() => {
                    window.location.href = "/course/start";
                  }}
                  className="flex items-center"
                >
                  Join Course
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="mt-6 text-sm text-gray-600">
                <p>
                  Don't have a course ID? Ask your instructor for the specific
                  course ID to join their course.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeStep == 2 && (
        <EditCourse
          content={content}
          activeStep={activeStep}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      )}
      {activeStep === 3 && (
        <PreviewCourse
          content={content}
          activeStep={activeStep}
          handleBack={handleBack}
        />
      )}
    </div>
  );
};

export default CreateCoursePage;
