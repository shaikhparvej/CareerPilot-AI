# CareerPilot AI - An AI Powered Career Coach

A full-stack AI-powered career planning and job preparation platform built with Next.js 14, Tailwind CSS, and Google Gemini AI.

## 🚀 Launch Your Career Journey

**N.K. Orchid College of Engineering and Technology, Hipparagaha, Solapur**

## Features

- 🎯 AI-powered career guidance
- 📊 Interactive job role exploration
- 🎓 Learning and skill development
- 💼 Interview preparation
- 🏢 Company insights
- 📈 Career roadmaps
- ✅ Real-Time Resume & Feedback Analysis
- ✅ Mock Interviews & Coding Rounds
- ✅ Gamification with Badges & Rewards
- ✅ Department-wise Job Roadmaps
- ✅ Multi-language Support

## Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **UI Components**: Shadcn UI, Radix UI
- **AI Integration**: Google Gemini Flash 1.5 API
- **Styling**: Tailwind CSS with dark/light theme support
- **Icons**: Lucide React, Heroicons
- **Deployment**: Vercel

## 🔑 API Key Setup (Required for AI Features)

To use the AI-powered course generation and other AI features, you need a Google Gemini API key:

### 1. **Get your Gemini API key**:

- Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
- Sign in with your Google account
- Click "Create API Key"
- Copy the generated key (starts with `AIzaSy...`)

### 2. **Configure the API key**:

- Open `.env.local` in your project root
- Replace the placeholder with your real API key:

```bash
GOOGLE_GEMINI_API_KEY=AIzaSyYourActualKeyHere
```

### 3. **Restart the development server**:

```bash
npm run dev
```

### 4. **Test the AI integration**:

- Visit http://localhost:3000/learn?page=Courses
- You should see AI-generated course content
- Click "Regenerate" to get new AI-generated courses

**Important**: Without a valid API key, the app will show sample courses instead of dynamic AI-generated content.

3. **Optional: Firebase Setup**:

   - Firebase is optional and only needed for certain database features
   - If you don't configure Firebase, the app will use mock database functionality
   - To enable Firebase (optional):
     ```bash
     NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
     NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
     ```

4. **Important Security Notes**:
   - Never commit your API key to version control
   - Keep your `.env.local` file private
   - The key is only used server-side for security

> ⚠️ **Without a valid API key, the app will use fallback responses instead of real AI**

## Getting Started

### Prerequisites

- Node.js 18.17.0 or higher
- npm 9.0.0 or higher
- Google Gemini API Key

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/careerpilot-ai.git
cd careerpilot-ai
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Add your Google Gemini API key to `.env.local`:

```bash
GOOGLE_GEMINI_API_KEY=your_actual_api_key_here
```

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable                | Description                           | Required |
| ----------------------- | ------------------------------------- | -------- |
| `GOOGLE_GEMINI_API_KEY` | Google Gemini API key for AI features | Yes      |

## Deployment

This project is optimized for deployment on Vercel. See the deployment guide below.

<pre>

🧑‍💼 User (Job Seeker)
      │
      ▼
🚪 Entry Point (Sign Up / Guest)
      │
      ▼
🎯 Identify Career Intent
      │
      ▼
🧭 Department & Interest Mapping
      │
      ▼
🧠 Ikigai-Based Role Alignment
      │
      ▼
🧬 Role Recommendation
      │
      ▼
🛣️ Learning Path Generation
      │
      ▼
📚 Skill Gap Analyzer
      │
      ▼
📘 Learning Recommendation
      │
      ▼
🧪 Project Suggestions
      │
      ▼
📄 Resume Optimization
      │
      ▼
🔧 Career Toolbox
      │
      ▼
💼 Job Matching Engine
      │
      ▼
🧠 Job Fit Assessment
 ┌────────────────────┬────────────────────┐
 ▼                    ▼
🎉 Job Matched    📝 Shortlisted for Roles

</pre>
</div>

---

## 🧩 Execution Plan

![Execution Plan](./public/projectshot/Copy%20of%20Team_GCOEY.png)

### 🔹 Phase 1: Career Planning

- Dept-wise Roles
- Check My Role
- Roadmaps
- Course Roadmap

### 🔹 Phase 2: Learning & Development

- Explore Courses
- Create Courses
- Projects
- Recall
- 30-Day Targeted Prep
- Tools Companies Use
- Check My Resume

### 🔹 Phase 3: Interview Preparation

- Soft Skills Interview
- Aptitude Exam
- Mock Interviews
- Coding Practice

### 🔹 Phase 4: Ecosystem Integration

- Company Dashboard
- Assessments
- Post Jobs & Hire
- Company Problem Challenges

---

## 🧠 System Architecture & Workflow

![System Architecture](./public/projectshot/4.png)

---

## 🔬 Innovations

![Innovation Highlights](./public/projectshot/2.png)

---

## ⚙️ Tech Stack

| Layer      | Technology            |
| ---------- | --------------------- |
| Frontend   | Next.js, Tailwind CSS |
| Backend    | Next.js (API routes)  |
| UI Library | Shadcn                |
| AI Engine  | Gemini Flash 1.5 API  |

---

## 🧠 Core Algorithms

- AI Career Path Recommender
- Resume Evaluation & Optimization
- Skill Gap Analyzer
- AI Mock Interview Engine
- AI-Assisted Coding Platform
- Language Barrier Remover

---

## 🛠 Run Instructions

```bash
git clone https://github.com/wajiddaudtamboli/
npm install
```

Create `.env` file with:

```
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyCNYe0btYtX9rZnd5Dg0kmnWRZw5I2byNI
NEXT_PUBLIC_YOUTUBE_API_KEY=your_key_here
```

Start the dev server:

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🔭 Future Scope

- 📱 Mobile App (Multi-language + Offline Support)
- 🧠 Advanced ML-based Feedback Loop
- 🏛 Government Scheme Integration
- 🧑‍🏫 Human-AI Hybrid Validation
- 🎯 Micro-certifications & Career Tests

---

## 📌 Utility & Impact

| Sector         | Use Case                              |
| -------------- | ------------------------------------- |
| 🎓 Colleges    | T&P Cell integrations for placements  |
| 💻 EdTech      | Plug-in AI Career Coach for LMS       |
| 🏢 Companies   | Early talent mapping & assessments    |
| 🏛 Government   | Skill development for rural students  |
| 🔍 Job Portals | Resume-JD Mapping + Auto-Optimization |

---

## 👨‍💻 Authors

| Name                   | Role                    | GitHub                                                                                                                                        | LinkedIn                                                                                                                                                                                                                                                                       |
| ---------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Wajid Daud Tamboli** | 💻 Full Stack Developer | [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/wajiddaudtamboli/) | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/wajid-daud-tamboli-3217b031a)                                                                                                        |
| **Laxmi Javalkote**    | 🎨 Frontend Developer   | [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)]()                                     | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/laxmi-javalkote-9a8626259?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bsc9ZxXccT2ioXSTTG%2BZ8sQ%3D%3D)     |
| **Shaikh Parvej**      | ⚙️ Backend Developer    | [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/shaikhparvej)      | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shaikh-parvej-ab570427a?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BEaB%2BmIaaRy%2BB%2Bh%2FB03gGFw%3D%3D) |
| **Sakshi Madgundi**    | 🎯 UI/UX Designer       | [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)]()                                     | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)]()                                                                                                                                                                |
| **Bagwan Zaid**        | 🔬 Research             | [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)]()                                     | [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/zaid-bagwan-bb3127289?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B3jhfQCkZTtmjyN3nSA%2Bbyw%3D%3D)         |

## 💭 Thoughts of Team

> "A degree ≠ a job, but with the right skills and direction, it can be."

we believe that every student deserves a fair shot at success, regardless of their background or college tier. Our goal is to bridge the gap between academic learning and industry expectations using the power of AI and personalized education.

We built this platform to:

Empower students to discover their true potential

Provide tools that make job preparation smarter and more accessible

> _ "Don’t just get placed. Get prepared. Get empowered......"_

---

> Built with ❤ by Wajid Daud Tamboli

---
