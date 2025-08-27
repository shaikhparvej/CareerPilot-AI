import { NextResponse } from "next/server";

// Replace this with your Gemini API logic
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";
  const level = searchParams.get("level") || "";

  // Example: Call Gemini API here (replace with your real Gemini logic)
  // This is a mock. Replace with Gemini API call and response mapping.
  // You can use fetch or an SDK to call Gemini.
  // Example Gemini API call (pseudo):
  // const geminiRes = await fetchGeminiCourses(query, level);
  // const courses = await geminiRes.json();

  // For now, return a mock response
  const mockCourses = [
    {
      id: 1,
      title: "Full Stack Web Development (India)",
      description: "Learn MERN stack, REST APIs, and deployment with real Indian startup case studies.",
      duration: "12 weeks",
      level: "Beginner",
      instructor: "Ankita Sharma",
      category: "Programming",
      students: 3200,
      rating: 4.9,
      price: "₹4999"
    },
    {
      id: 2,
      title: "Data Science & AI with Python",
      description: "From Python basics to advanced ML, with projects on Indian datasets (Aadhaar, UPI, etc).",
      duration: "16 weeks",
      level: "Intermediate",
      instructor: "Dr. Ravi Kumar",
      category: "Data Science",
      students: 4100,
      rating: 4.8,
      price: "₹5999"
    },
    {
      id: 3,
      title: "Digital Marketing for Indian Businesses",
      description: "SEO, SEM, and social media marketing with a focus on Indian brands and platforms.",
      duration: "8 weeks",
      level: "Beginner",
      instructor: "Priya Singh",
      category: "Marketing",
      students: 2100,
      rating: 4.7,
      price: "₹2999"
    },
    {
      id: 4,
      title: "Cloud Computing with AWS & Azure",
      description: "Deploy scalable apps on AWS/Azure, with Indian cloud compliance and billing tips.",
      duration: "10 weeks",
      level: "Advanced",
      instructor: "Suresh Patil",
      category: "Cloud Computing",
      students: 1800,
      rating: 4.8,
      price: "₹6999"
    }
  ];

  // Filter mock data by query and level for demonstration
  let filtered = mockCourses;
  if (query) {
    filtered = filtered.filter(
      (c) =>
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.description.toLowerCase().includes(query.toLowerCase()) ||
        c.category.toLowerCase().includes(query.toLowerCase())
    );
  }
  if (level && level !== "all") {
    filtered = filtered.filter(
      (c) => c.level.toLowerCase() === level.toLowerCase()
    );
  }

  return NextResponse.json(filtered);
}
