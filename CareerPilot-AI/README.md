# CareerPilot AI - Interview Preparation Platform

An AI-powered comprehensive career preparation platform with modular architecture.

## 🎉 **PROJECT STATUS: FULLY CONFIGURED & RUNNING**

### ✅ **All Systems Operational**

- **Main Platform**: Running on http://localhost:3003
- **Grammar & QnA Module**: Running on http://localhost:9002
- **Online IDE Module**: Running on http://localhost:3000
- **All API Keys**: Configured and Active
- **Authentication**: Working with Clerk
- **AI Features**: Powered by Google Gemini AI
- **Code Execution**: Enabled via RapidAPI Judge0

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- API keys for external services

### Installation

1. **Clone and navigate to the project**

```bash
git clone <repository-url>
cd CareerPilot-AI
```

2. **Install dependencies for all modules**

```bash
# Main application
cd mentorafinal
npm install
cd ..

# Grammar & QnA module
cd grammar-qna-module
npm install
cd ..

# Online IDE module
cd online-ide
npm install
cd ..
```

3. **Set up environment variables**

Create `.env.local` files in each module directory:

**mentorafinal/.env.local:**

```env
# Google AI Studio API Key for Gemini AI
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key_here
CLERK_SECRET_KEY=your_clerk_secret_here

# RapidAPI Key for Judge0 (Code Execution)
NEXT_PUBLIC_RAPIDAPI_KEY=your_rapidapi_key_here

# ZegoCloud for Video/Audio Calls
NEXT_PUBLIC_ZEGO_APP_ID=your_zego_app_id_here
NEXT_PUBLIC_ZEGO_SERVER_SECRET=your_zego_server_secret_here

# Google AI Genkit Configuration
GOOGLE_GENAI_API_KEY=your_gemini_api_key_here
```

**grammar-qna-module/.env.local:**

```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
GOOGLE_GENAI_API_KEY=your_gemini_api_key_here
```

**online-ide/.env.local:**

```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_RAPIDAPI_KEY=your_rapidapi_key_here
```

4. **Start all applications**

Open 3 terminals and run:

```bash
# Terminal 1 - Main Application (Port 3002)
cd mentorafinal
npm run dev

# Terminal 2 - Grammar Module (Port 9002)
cd grammar-qna-module
npm run dev

# Terminal 3 - Online IDE (Port 3001)
cd online-ide
npm run dev
```

## 🌐 Access Points - **CURRENTLY RUNNING**

- **Main Platform**: ✅ http://localhost:3001 _(Running with Real API Keys)_
- **Grammar & QnA Module**: ✅ http://localhost:9003 _(Running with Real API Keys)_
- **Online IDE**: ✅ http://localhost:3000 _(Running with Real API Keys)_
- **Integration Hub**: http://localhost:3001/integrations
- **Setup Guide**: http://localhost:3001/setup

## 🔑 **API Keys Status - ✅ CONFIGURED**

### ✅ **Active API Keys (Configured)**

- **Google AI Studio (Gemini)**: `AIzaSyDOAtf0gqqMJpu5nVaSEbutTOpK_GZN7mo` _(Active)_
- **Clerk Authentication**: `pk_test_bGFyZ2Utcm9iaW4tOTkuY2xlcmsuYWNjb3VudHMuZGV2JA` _(Active)_
- **RapidAPI (Judge0)**: `f8e6af91d7msh84d886d235f6c6bp1ebc1ajsn05a8d6036e61` _(Active)_
- **LemonSqueezy**: Configured with payment processing capabilities

### 🎯 **All Features Now Working:**

- ✅ AI-powered grammar checking
- ✅ Code execution in online IDE
- ✅ User authentication system
- ✅ Payment processing ready

## 🏗️ Project Structure

```
CareerPilot-AI/
├── mentorafinal/              # Main application
│   ├── src/
│   │   ├── app/              # Next.js app router pages
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── ai/               # AI/Genkit configurations
│   │   └── hooks/            # Custom React hooks
│   └── package.json
├── grammar-qna-module/        # Grammar checking & Q&A
│   ├── src/
│   │   ├── ai/flows/         # Genkit AI flows
│   │   └── app/              # Next.js pages
│   └── package.json
├── online-ide/                # Live coding environment
│   ├── src/
│   │   ├── AiIDE/           # AI-powered IDE components
│   │   └── app/             # Next.js pages
│   └── package.json
└── README.md
```

## 🔑 Required API Keys

### Google AI Studio (Gemini) - **Required**

- Get your API key: https://aistudio.google.com/
- Used for: AI-powered features, grammar checking, Q&A generation

### RapidAPI (Judge0) - **Required for IDE**

- Get your API key: https://rapidapi.com/judge0-official/api/judge0-ce/
- Used for: Code execution in the online IDE

### Clerk - **Configured**

- Authentication service
- Get your keys: https://clerk.com/

### ZegoCloud - **Optional**

- Get your keys: https://www.zegocloud.com/
- Used for: Video/audio calling features

## 🔧 Features

### Main Application (mentorafinal)

- 🏠 Landing page with platform overview
- 👤 User authentication via Clerk
- 📊 Dashboard for interview preparation
- 🎯 Mock interview sessions
- 🧘 Focus mode with study materials
- 🔗 Integration hub for all modules

### Grammar & QnA Module

- ✅ Grammar checking and correction
- ❓ Q&A generation and validation
- 🎤 Extempore topic generation
- 📝 Topic validation and suggestions

### Online IDE

- 💻 Live code editor (Monaco Editor)
- 🌐 Multiple programming languages
- 🤖 AI-powered problem generation
- ⚡ Real-time code execution
- 🎯 Difficulty-based coding challenges

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18/19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **AI**: Google Gemini AI, Genkit
- **Authentication**: Clerk
- **Code Editor**: Monaco Editor
- **Code Execution**: Judge0 API
- **UI Components**: Radix UI, Lucide Icons

## 📚 API Documentation

### Grammar Module Endpoints

- `/api/grammar-check` - Grammar checking
- `/api/topic-query` - Topic-based queries
- `/api/validate-topic` - Topic validation
- `/api/extempore-topic` - Generate speaking topics

### Main Application Features

- Mock interview simulation
- AI-powered feedback analysis
- Study content generation
- Focus timer and ambient music

## 🚨 Troubleshooting

### Common Issues

1. **Port conflicts**: Applications will automatically use alternate ports
2. **API key missing**: Check environment variables in `.env.local` files
3. **Build errors**: Ensure all dependencies are installed with `npm install`

### Error Messages

- "Missing Clerk Publishable Key" → Add Clerk keys to environment
- "Gemini API Error" → Verify Google AI Studio API key
- "Code execution failed" → Check RapidAPI Judge0 key

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test all modules
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For setup help, visit: http://localhost:3002/setup
For integrations, visit: http://localhost:3002/integrations
