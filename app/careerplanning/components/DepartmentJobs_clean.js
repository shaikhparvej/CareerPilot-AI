"use client";
import { useEffect, useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
} from "../../../components/ui/alert-dialog";
import { Button } from "../../../components/ui/button";
import { AiCareerFieldResult } from "../../../config/AiModels";
import LoadingDialog from "../../components/LoadingDialog";
import JobsRole from "./CategoryRole";

// Define AI models for this component
const JobRolls = AiCareerFieldResult;
const AiRoleMoreInfo = AiCareerFieldResult;

// SEO Meta Component
const SEOHead = ({ department, jobRoles }) => {
  useEffect(() => {
    // Update document title
    const title = department
      ? `${department} Job Roles & Career Opportunities | Find Your Dream Job`
      : "Engineering Job Roles & Career Finder | Discover Your Perfect Career Path";
    document.title = title;

    // Update meta description
    const description = department
      ? `Explore ${department} job roles, career paths, salaries, and opportunities. Find your perfect career match with detailed role information and requirements.`
      : "Discover engineering job roles across Computer, Mechanical, Civil, Electrical, and Chemical engineering. Get detailed career information, salary insights, and roadmaps.";

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);

    // Update meta keywords
    const keywords = [
      "engineering jobs",
      "career finder",
      "job roles",
      department?.toLowerCase(),
      "career guidance",
      "engineering careers",
      "job opportunities",
      "career roadmap",
      "engineering salaries",
      "tech jobs",
    ]
      .filter(Boolean)
      .join(", ");

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute("content", keywords);

    // Add Open Graph tags
    const ogTags = [
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: window.location.href },
      { property: "og:site_name", content: "Career Finder" },
    ];

    ogTags.forEach((tag) => {
      let existingTag = document.querySelector(
        `meta[property="${tag.property}"]`
      );
      if (!existingTag) {
        existingTag = document.createElement("meta");
        existingTag.setAttribute("property", tag.property);
        document.head.appendChild(existingTag);
      }
      existingTag.setAttribute("content", tag.content);
    });

    // Add Twitter Card tags
    const twitterTags = [
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ];

    twitterTags.forEach((tag) => {
      let existingTag = document.querySelector(`meta[name="${tag.name}"]`);
      if (!existingTag) {
        existingTag = document.createElement("meta");
        existingTag.setAttribute("name", tag.name);
        document.head.appendChild(existingTag);
      }
      existingTag.setAttribute("content", tag.content);
    });

    // Add canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", window.location.href);

    // Add structured data (JSON-LD)
    if (jobRoles && jobRoles.length > 0) {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        description: description,
        url: window.location.href,
        mainEntity: {
          "@type": "ItemList",
          name: `${department} Job Roles`,
          itemListElement: jobRoles.map((role, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "JobPosting",
              title: role.title || role.name,
              description:
                role.description ||
                `Career opportunities in ${role.title || role.name}`,
              employmentType: "FULL_TIME",
              industry: department,
            },
          })),
        },
      };

      let jsonLd = document.querySelector("#structured-data");
      if (!jsonLd) {
        jsonLd = document.createElement("script");
        jsonLd.setAttribute("type", "application/ld+json");
        jsonLd.setAttribute("id", "structured-data");
        document.head.appendChild(jsonLd);
      }
      jsonLd.textContent = JSON.stringify(structuredData);
    }
  }, [department, jobRoles]);

  return null;
};

export default function DepartmentJobRoles() {
  const [selectedBranch, setSelectedBranch] = useState("");
  const [customBranch, setCustomBranch] = useState("");
  const [submittedValue, setSubmittedValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [tree, setTree] = useState(false);
  const [status, setStatus] = useState(false);
  const [role, setRole] = useState("");
  const [conform, setConform] = useState(false);
  const [localrole, setLocalRole] = useState("");

  // Get current department for SEO
  const currentDepartment =
    selectedBranch === "Other" ? customBranch : selectedBranch;
  const storedBranch =
    typeof window !== "undefined" ? localStorage.getItem("branch") : null;
  const seoGepartment = currentDepartment || storedBranch;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const jobs = localStorage.getItem("jobs");
      const localrole = localStorage.getItem("role");
      if (jobs) {
        setSubmittedValue(JSON.parse(jobs));
        setTree(true);
      }
      if (localrole) {
        setLocalRole(localrole);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const inputValue =
      selectedBranch === "Other" ? customBranch : selectedBranch;

    if (!inputValue.trim()) {
      alert("Please select or enter a department");
      setLoading(false);
      return;
    }

    const BASIC_PROMPT = `generate which type of job roll are available in branch ${inputValue},it include category,role in json formate`;

    try {
      const result = await JobRolls.sendMessage(BASIC_PROMPT);
      const responseText = await result.response.text();
      const parsedResult = JSON.parse(responseText);

      if (typeof window !== "undefined") {
        localStorage.setItem("jobs", JSON.stringify(parsedResult));
        localStorage.setItem("branch", inputValue);
      }

      setSubmittedValue(parsedResult);
      setTree(true);

      // Update URL for better SEO without page reload
      const newUrl = new URL(window.location);
      newUrl.searchParams.set("department", encodeURIComponent(inputValue));
      window.history.pushState({}, "", newUrl);
      window.location.reload();
    } catch (error) {
      console.error("Error parsing JSON:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleMoreInfo = async () => {
    setStatus(true);
    const prompt = `Describe the role of "${role}". Include detailed information on the following aspects:
    Core Responsibilities, Skills and Qualifications, latest Tools and Technologies ,Work Environment, Career Path, Challenges and Rewards, Industry Relevance,companies hire,average salery(in rupees).in json formate.`;

    try {
      const result = await AiRoleMoreInfo.sendMessage(prompt);
      const roleData = await result.response.text();
      const json = JSON.parse(roleData);

      if (typeof window !== "undefined") {
        localStorage.setItem("moreInfo", JSON.stringify(json));
        localStorage.setItem("role", role);
      }

      console.log(json);
      window.location.href = "/careerplanning?page=MoreInfoRole";
    } catch (error) {
      console.error("Error parsing JSON:", error);
      alert("Failed to fetch role information. Please try again.");
    } finally {
      setConform(false);
      setStatus(false);
    }
  };

  // Extract job roles for structured data
  const jobRoles =
    submittedValue && typeof submittedValue === "object"
      ? Object.values(submittedValue).flat().filter(Boolean)
      : [];

  return (
    <>
      <SEOHead department={seoGepartment} jobRoles={jobRoles} />

      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <section className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md mt-5">
          <header className="text-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              Find Your Dream Job Roles
            </h1>
            <p className="text-gray-600 text-sm">
              Discover career opportunities in engineering and technology fields
            </p>
          </header>

          <form
            onSubmit={handleSubmit}
            role="form"
            aria-label="Job role finder form"
          >
            <div className="mb-6">
              <label
                htmlFor="branchSelect"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Department:
              </label>
              <select
                id="branchSelect"
                value={selectedBranch}
                title="Select your engineering department"
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                aria-describedby="department-help"
                required
              >
                <option value="" disabled>
                  I am from...
                </option>
                <option value="Computer Science and Engineering">
                  Computer Science and Engineering
                </option>
                <option value="Electrical engineering">
                  Electrical Engineering
                </option>
                <option value="Mechanical engineering">
                  Mechanical Engineering
                </option>
                <option value="Civil engineering">Civil Engineering</option>
                <option value="Electronics and Telecommunication engineering">
                  Electronics and Telecommunication Engineering
                </option>
                <option value="Chemical engineering">
                  Chemical Engineering
                </option>
                <option value="Other">Other (Please specify)</option>
              </select>
              <small
                id="department-help"
                className="text-gray-500 text-xs mt-1 block"
              >
                Choose your field of study or work
              </small>
            </div>

            {selectedBranch === "Other" && (
              <div className="mb-6">
                <label
                  htmlFor="customBranchInput"
                  className="block text-gray-600 text-sm font-medium mb-2"
                >
                  Custom Department:
                </label>
                <input
                  type="text"
                  id="customBranchInput"
                  name="customDepartment"
                  value={customBranch}
                  onChange={(e) => setCustomBranch(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Enter your department here..."
                  aria-describedby="custom-dept-help"
                  required={selectedBranch === "Other"}
                />
                <small
                  id="custom-dept-help"
                  className="text-gray-500 text-xs mt-1 block"
                >
                  Specify your field of study or expertise
                </small>
              </div>
            )}

            <Button
              type="submit"
              title="Generate job roles for your department"
              className={`w-full py-3 rounded-lg text-white font-semibold transition duration-200 ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
              }`}
              disabled={loading}
              aria-describedby="submit-help"
            >
              {loading
                ? "Generating Job Roles..."
                : "Find Career Opportunities"}
            </Button>
            <small
              id="submit-help"
              className="text-gray-500 text-xs mt-2 block text-center"
            >
              Click to discover available job roles in your field
            </small>
          </form>
        </section>

        {loading && (
          <div role="status" aria-live="polite" aria-label="Loading job roles">
            <LoadingDialog loading={loading} />
          </div>
        )}

        {tree && (
          <section
            aria-label="Job roles results"
            className="w-full max-w-4xl mt-6"
          >
            <JobsRole setConform={setConform} setRole={setRole} />
          </section>
        )}

        <AlertDialog open={conform} aria-describedby="role-dialog-description">
          <AlertDialogContent>
            <div id="role-dialog-description">
              <h2 className="text-lg font-semibold mb-2">
                Explore Career Information
              </h2>
              <p>
                Would you like to get detailed information about this role or
                continue with the career roadmap?
              </p>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => setConform(false)}
                disabled={status}
                aria-label="Cancel and close dialog"
              >
                Cancel
              </AlertDialogCancel>
              {localrole === role ? (
                <Button
                  onClick={() => {
                    window.location.href = "/careerplanning/checkcareer";
                  }}
                  aria-label="View detailed role information"
                >
                  View Detailed Info
                </Button>
              ) : (
                <Button
                  onClick={handleMoreInfo}
                  disabled={status}
                  aria-label="Get more information about this role"
                >
                  {status ? "Loading Information..." : "Get Role Details"}
                </Button>
              )}
              <AlertDialogAction
                onClick={() => {
                  window.location.href =
                    "/careerplanning/page?page=RoleRoadMap";
                }}
                disabled={status}
                aria-label="Continue to career roadmap"
              >
                View Career Roadmap
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Schema.org structured data for better SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Career Finder - Engineering Job Roles",
              description:
                "Find engineering job roles and career opportunities across various departments",
              url: typeof window !== "undefined" ? window.location.href : "",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
      </main>
    </>
  );
}
