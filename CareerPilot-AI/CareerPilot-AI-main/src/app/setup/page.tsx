'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, Key, Settings, Zap } from 'lucide-react';

export default function SetupPage() {
  const apiKeys = [
    {
      name: 'Google AI Studio (Gemini)',
      envVar: 'NEXT_PUBLIC_GEMINI_API_KEY',
      description: 'Required for AI-powered features like grammar checking, Q&A, and content generation',
      url: 'https://aistudio.google.com/',
      icon: Settings,
      status: 'Required'
    },
    {
      name: 'RapidAPI (Judge0)',
      envVar: 'NEXT_PUBLIC_RAPIDAPI_KEY',
      description: 'Required for code execution in the online IDE',
      url: 'https://rapidapi.com/judge0-official/api/judge0-ce/',
      icon: Zap,
      status: 'Required'
    },
    {
      name: 'Clerk Authentication',
      envVar: 'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
      description: 'User authentication and management',
      url: 'https://clerk.com/',
      icon: Key,
      status: 'Configured'
    },
    {
      name: 'ZegoCloud',
      envVar: 'NEXT_PUBLIC_ZEGO_APP_ID',
      description: 'Video and audio calling for interviews',
      url: 'https://www.zegocloud.com/',
      icon: Database,
      status: 'Optional'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Required':
        return 'destructive';
      case 'Configured':
        return 'default';
      case 'Optional':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Setup & Configuration
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Configure API keys and environment variables for CareerPilot
          </p>
        </div>

        <Alert className="mb-8">
          <Settings className="h-4 w-4" />
          <AlertDescription>
            To fully utilize all features of CareerPilot, you&apos;ll need to configure the following API keys in your
            <code className="mx-1 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">.env.local</code> files.
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          {apiKeys.map((api, index) => {
            const IconComponent = api.icon;
            return (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <IconComponent className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      <div>
                        <CardTitle className="text-lg">{api.name}</CardTitle>
                        <CardDescription>
                          <code className="text-xs">{api.envVar}</code>
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant={getStatusColor(api.status)}>
                      {api.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {api.description}
                  </p>
                  <a
                    href={api.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                  >
                    Get API Key →
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Environment Configuration
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Main Application (.env.local)
              </h3>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
{`# Google AI Studio API Key for Gemini AI
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
GOOGLE_GENAI_API_KEY=your_gemini_api_key_here`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Project Structure
              </h3>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <pre className="text-sm text-gray-700 dark:text-gray-300">
{`📁 CareerPilot-AI/
├── 📁 mentorafinal/           # Main application (Port 3002)
├── 📁 grammar-qna-module/     # Grammar & QnA (Port 9002)
├── 📁 online-ide/             # Online IDE (Port 3001)
└── 📄 README.md`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Running the Applications
              </h3>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <pre className="text-sm text-gray-700 dark:text-gray-300">
{`# Terminal 1 - Main Application
cd mentorafinal
npm run dev

# Terminal 2 - Grammar Module
cd grammar-qna-module
npm run dev

# Terminal 3 - Online IDE
cd online-ide
npm run dev`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
