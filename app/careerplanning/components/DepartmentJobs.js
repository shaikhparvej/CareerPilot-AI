"use client";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
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
      const storedBranch = localStorage.getItem("branch");

      // Only load cached data if it matches current selection
      if (jobs && storedBranch && (storedBranch === selectedBranch || storedBranch === customBranch)) {
        setSubmittedValue(JSON.parse(jobs));
        setTree(true);
      } else {
        // Clear stale data if branch doesn't match
        localStorage.removeItem("jobs");
        localStorage.removeItem("branch");
        setTree(false);
        setSubmittedValue(null);
      }

      if (localrole) {
        setLocalRole(localrole);
      }
    }
  }, [selectedBranch, customBranch]);  // Add dependencies to re-run when selection changes

  const handleBranchChange = (e) => {
    const newBranch = e.target.value;
    setSelectedBranch(newBranch);

    // Clear cached data when branch changes
    if (typeof window !== "undefined") {
      const storedBranch = localStorage.getItem("branch");
      if (storedBranch && storedBranch !== newBranch) {
        localStorage.removeItem("jobs");
        localStorage.removeItem("branch");
        setTree(false);
        setSubmittedValue(null);
      }
    }
  };

  const handleCustomBranchChange = (e) => {
    const newCustomBranch = e.target.value;
    setCustomBranch(newCustomBranch);

    // Clear cached data when custom branch changes
    if (typeof window !== "undefined") {
      const storedBranch = localStorage.getItem("branch");
      if (storedBranch && storedBranch !== newCustomBranch) {
        localStorage.removeItem("jobs");
        localStorage.removeItem("branch");
        setTree(false);
        setSubmittedValue(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted - starting handleSubmit");

    // Clear old data to prevent stale state
    setTree(false);
    setSubmittedValue(null);

    setLoading(true);
    const inputValue =
      selectedBranch === "Other" ? customBranch : selectedBranch;

    console.log("Selected department:", inputValue);

    if (!inputValue.trim()) {
      alert("Please select or enter a department");
      setLoading(false);
      return;
    }

    const BASIC_PROMPT = `generate which type of job roll are available in branch ${inputValue},it include category,role in json formate`;
    console.log("About to call AI service with prompt:", BASIC_PROMPT);

    try {
      console.log("Calling JobRolls.sendMessage...");
      const result = await JobRolls.sendMessage(BASIC_PROMPT);
      console.log("AI service response received:", result);

      const responseText = result.response.text();  // Remove await - it's not async
      console.log("Response text:", responseText);

      // Validate response text
      if (!responseText || typeof responseText !== 'string') {
        throw new Error('Invalid response from AI service');
      }

      // Clean the response text by removing markdown code blocks
      let cleanedText = responseText.trim();
      if (cleanedText.startsWith('```json')) {
        cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanedText.startsWith('```')) {
        cleanedText = cleanedText.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }
      console.log("Cleaned text for parsing:", cleanedText);

      // Validate JSON before parsing
      if (!cleanedText || cleanedText.length === 0) {
        throw new Error('Empty response from AI service');
      }

      let parsedResult;
      try {
        parsedResult = JSON.parse(cleanedText);
      } catch (parseError) {
        console.error("JSON parsing failed:", parseError);
        console.log("Raw response that failed to parse:", cleanedText);

        // Provide a fallback response if JSON parsing fails
        parsedResult = {
          [`${inputValue} Job Roles`]: [
            {
              Category: 'Technical Roles',
              Roles: ['Engineer', 'Developer', 'Analyst', 'Specialist', 'Consultant']
            },
            {
              Category: 'Management Roles',
              Roles: ['Project Manager', 'Team Lead', 'Technical Manager', 'Director', 'VP Engineering']
            }
          ]
        };
        console.log("Using fallback job roles due to parsing error");
      }

      console.log("Parsed result:", parsedResult);

      if (typeof window !== "undefined") {
        localStorage.setItem("jobs", JSON.stringify(parsedResult));
        localStorage.setItem("branch", inputValue);
        console.log("Data saved to localStorage");

        // Dispatch custom event to notify CategoryRole component of data update
        window.dispatchEvent(new CustomEvent('jobsUpdated', {
          detail: { jobs: parsedResult, branch: inputValue }
        }));
      }

      setSubmittedValue(parsedResult);
      setTree(true);
      console.log("State updated, showing results");

      // Update URL for better SEO without page reload
      const newUrl = new URL(window.location);
      newUrl.searchParams.set("department", encodeURIComponent(inputValue));
      window.history.pushState({}, "", newUrl);
      // Remove reload to prevent state loss
      // window.location.reload();
    } catch (error) {
      console.error("Error in handleSubmit:", error);

      // Provide detailed error information
      if (error.message.includes('500')) {
        alert("Server error occurred. Please check your internet connection and try again.");
      } else if (error.message.includes('Failed to fetch')) {
        alert("Network error. Please check your internet connection and try again.");
      } else {
        alert(`Something went wrong: ${error.message}. Please try again.`);
      }
    } finally {
      setLoading(false);
      console.log("handleSubmit completed");
    }
  };

  const handleRoadMap = async () => {
    setStatus(true);
    const prompt = `Create a comprehensive career roadmap for "${role}". Include the following sections:
    Learning Path (beginner to expert), Required Skills by Level, Timeline and Milestones, Educational Requirements, Certification Paths, Experience Levels, Project Ideas, Networking Opportunities, Salary Progression, Career Advancement Steps. Provide response in valid JSON format only.`;

    try {
      console.log("Generating career roadmap for:", role);
      const result = await AiRoleMoreInfo.sendMessage(prompt);
      const roadmapData = result.response.text();
      console.log("Raw AI roadmap response:", roadmapData);

      // Validate response
      if (!roadmapData || typeof roadmapData !== 'string') {
        throw new Error('Invalid response from AI service');
      }

      // Clean the response text by removing markdown code blocks and extra text
      let cleanedText = roadmapData.trim();

      // Remove markdown code blocks
      if (cleanedText.startsWith('```json')) {
        cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanedText.startsWith('```')) {
        cleanedText = cleanedText.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }

      // Remove any leading non-JSON text
      const jsonStart = cleanedText.indexOf('{');
      const jsonEnd = cleanedText.lastIndexOf('}');

      if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
        cleanedText = cleanedText.substring(jsonStart, jsonEnd + 1);
      }

      console.log("Cleaned roadmap text for parsing:", cleanedText);

      // Validate that we have something that looks like JSON
      if (!cleanedText.startsWith('{') || !cleanedText.endsWith('}')) {
        throw new Error('Response does not contain valid JSON');
      }

      let roadmapJson;
      try {
        roadmapJson = JSON.parse(cleanedText);
      } catch (parseError) {
        console.error("JSON parsing failed for roadmap:", parseError);
        console.log("Failed roadmap text:", cleanedText);

        // Provide a fallback roadmap structure
        roadmapJson = {
          "Role": role,
          "Learning Path": {
            "Beginner (0-1 years)": [
              "Learn fundamental concepts and basics",
              "Complete introductory courses and tutorials",
              "Build simple projects to practice skills",
              "Join online communities and forums"
            ],
            "Intermediate (1-3 years)": [
              "Work on more complex projects",
              "Learn advanced tools and techniques",
              "Contribute to open-source projects",
              "Seek mentorship and guidance"
            ],
            "Advanced (3-5 years)": [
              "Lead projects and teams",
              "Specialize in specific domains",
              "Mentor junior colleagues",
              "Stay updated with industry trends"
            ],
            "Expert (5+ years)": [
              "Become thought leader in the field",
              "Speak at conferences and events",
              "Write technical articles and blogs",
              "Drive innovation and research"
            ]
          },
          "Required Skills by Level": {
            "Entry Level": ["Basic technical skills", "Communication", "Problem-solving", "Time management"],
            "Mid Level": ["Advanced technical expertise", "Leadership", "Project management", "Strategic thinking"],
            "Senior Level": ["Domain expertise", "Team leadership", "Business acumen", "Innovation mindset"]
          },
          "Timeline and Milestones": [
            "Month 1-6: Foundation building and basic skills",
            "Month 6-18: Practical experience and intermediate skills",
            "Year 2-3: Specialization and advanced capabilities",
            "Year 3-5: Leadership and expert-level contributions",
            "Year 5+: Industry recognition and thought leadership"
          ],
          "Educational Requirements": [
            "Bachelor's degree in relevant field",
            "Relevant certifications and courses",
            "Continuous learning and upskilling",
            "Advanced degree (optional but beneficial)"
          ],
          "Certification Paths": [
            "Industry-recognized professional certifications",
            "Technology-specific certifications",
            "Leadership and management certifications",
            "Continuous education programs"
          ],
          "Experience Levels": {
            "Entry Level": "0-2 years experience",
            "Mid Level": "2-5 years experience",
            "Senior Level": "5-8 years experience",
            "Lead Level": "8+ years experience"
          },
          "Project Ideas": [
            "Personal projects to showcase skills",
            "Open-source contributions",
            "Industry-relevant case studies",
            "Innovation and research projects"
          ],
          "Networking Opportunities": [
            "Professional associations and societies",
            "Industry conferences and meetups",
            "Online communities and forums",
            "Alumni networks and mentorship programs"
          ],
          "Salary Progression": {
            "Entry Level": "₹3,00,000 - ₹6,00,000 per annum",
            "Mid Level": "₹6,00,000 - ₹12,00,000 per annum",
            "Senior Level": "₹12,00,000 - ₹25,00,000 per annum",
            "Lead Level": "₹25,00,000+ per annum"
          },
          "Career Advancement Steps": [
            "Build strong foundational skills",
            "Gain practical experience through projects",
            "Develop leadership and soft skills",
            "Stay updated with industry trends",
            "Build professional network",
            "Seek growth opportunities and challenges"
          ]
        };
        console.log("Using fallback roadmap due to parsing error");
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("roadmap", JSON.stringify(roadmapJson));
        localStorage.setItem("roadmapRole", role);
      }

      console.log("Career roadmap processed successfully:", roadmapJson);
      window.location.href = "/careerplanning?page=RoleRoadMap";
    } catch (error) {
      console.error("Error in handleRoadMap:", error);
      alert(`Failed to generate career roadmap: ${error.message}. Please try again.`);
    } finally {
      setConform(false);
      setStatus(false);
    }
  };

  const handleMoreInfo = async () => {
    setStatus(true);
    const prompt = `Describe the role of "${role}". Include detailed information on the following aspects:
    Core Responsibilities, Skills and Qualifications, latest Tools and Technologies, Work Environment, Career Path, Challenges and Rewards, Industry Relevance, companies hire, average salary (in rupees). Provide response in valid JSON format only.`;

    try {
      console.log("Fetching role information for:", role);
      const result = await AiRoleMoreInfo.sendMessage(prompt);
      const roleData = result.response.text();
      console.log("Raw AI response:", roleData);

      // Validate response
      if (!roleData || typeof roleData !== 'string') {
        throw new Error('Invalid response from AI service');
      }

      // Clean the response text by removing markdown code blocks and extra text
      let cleanedText = roleData.trim();

      // Remove markdown code blocks
      if (cleanedText.startsWith('```json')) {
        cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanedText.startsWith('```')) {
        cleanedText = cleanedText.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }

      // Remove any leading non-JSON text (like "I'd be happy to help...")
      const jsonStart = cleanedText.indexOf('{');
      const jsonEnd = cleanedText.lastIndexOf('}');

      if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
        cleanedText = cleanedText.substring(jsonStart, jsonEnd + 1);
      }

      console.log("Cleaned text for parsing:", cleanedText);

      // Validate that we have something that looks like JSON
      if (!cleanedText.startsWith('{') || !cleanedText.endsWith('}')) {
        throw new Error('Response does not contain valid JSON');
      }

      let json;
      try {
        json = JSON.parse(cleanedText);
      } catch (parseError) {
        console.error("JSON parsing failed:", parseError);
        console.log("Failed text:", cleanedText);

        // Provide a fallback response structure
        json = {
          "Role": role,
          "Core Responsibilities": [
            "Primary duties and tasks for this role",
            "Key responsibilities in daily work",
            "Main objectives and goals"
          ],
          "Skills and Qualifications": [
            "Required technical skills",
            "Educational background needed",
            "Professional certifications"
          ],
          "Tools and Technologies": [
            "Industry-standard software and tools",
            "Programming languages (if applicable)",
            "Hardware and platforms used"
          ],
          "Work Environment": "Description of typical work setting and conditions",
          "Career Path": [
            "Entry-level positions",
            "Mid-level advancement",
            "Senior and leadership roles"
          ],
          "Challenges and Rewards": {
            "Challenges": ["Common difficulties in this role"],
            "Rewards": ["Benefits and satisfying aspects"]
          },
          "Industry Relevance": "Current demand and future outlook for this role",
          "Companies": [
            "Major employers in this field",
            "Types of organizations that hire",
            "Industry sectors"
          ],
          "Average Salary": "Salary range information (location dependent)"
        };
        console.log("Using fallback role information due to parsing error");
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("moreInfo", JSON.stringify(json));
        localStorage.setItem("role", role);
      }

      console.log("Role information processed successfully:", json);
      window.location.href = "/careerplanning?page=MoreInfoRole";
    } catch (error) {
      console.error("Error in handleMoreInfo:", error);
      alert(`Failed to fetch role information: ${error.message}. Please try again.`);
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
                onChange={handleBranchChange}
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
                  onChange={handleCustomBranchChange}
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
            <JobsRole
              key={`${selectedBranch === "Other" ? customBranch : selectedBranch}`}
              setConform={setConform}
              setRole={setRole}
            />
          </section>
        )}

        <AlertDialog open={conform}>
          <AlertDialogContent>
            <AlertDialogTitle>Explore Career Information</AlertDialogTitle>
            <AlertDialogDescription>
              Would you like to get detailed information about this role or continue with the career roadmap?
            </AlertDialogDescription>
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
                onClick={handleRoadMap}
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
