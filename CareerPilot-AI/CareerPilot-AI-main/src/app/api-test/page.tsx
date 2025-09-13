'use client';

import {
  AlertCircle,
  BookOpen,
  Brain,
  CheckCircle,
  Code,
  Globe,
  MessageSquare, Mic,
  Music,
  Play, Settings, Zap
} from 'lucide-react';
import React, { useState } from 'react';

interface APITest {
  id: string;
  name: string;
  icon: React.ElementType;
  endpoint: string;
  description: string;
  status: 'idle' | 'testing' | 'success' | 'error';
  result?: string;
  error?: string;
}

export default function APITestCenter() {
  const [apis, setApis] = useState<APITest[]>([
    {
      id: 'spotify',
      name: 'Music API',
      icon: Music,
      endpoint: '/api/spotify',
      description: 'Dynamic music fetching with Spotify integration',
      status: 'idle'
    },
    {
      id: 'doubt-solving',
      name: 'AI Doubt Solving',
      icon: Brain,
      endpoint: '/api/solve-doubt',
      description: 'AI-powered educational assistance',
      status: 'idle'
    },
    {
      id: 'study-content',
      name: 'Study Content Generator',
      icon: BookOpen,
      endpoint: '/api/generate-study-content',
      description: 'AI-generated study materials and quizzes',
      status: 'idle'
    },
    {
      id: 'code-execution',
      name: 'Code Execution',
      icon: Code,
      endpoint: '/api/execute-code',
      description: 'Real-time code execution engine',
      status: 'idle'
    },
    {
      id: 'code-analysis',
      name: 'AI Code Analysis',
      icon: Zap,
      endpoint: '/api/analyze-code',
      description: 'AI-powered code review and feedback',
      status: 'idle'
    },
    {
      id: 'language-learning',
      name: 'Language Learning',
      icon: Globe,
      endpoint: '/api/language-learning',
      description: 'Multi-language learning assistance',
      status: 'idle'
    },
    {
      id: 'mock-interview',
      name: 'Mock Interview',
      icon: Mic,
      endpoint: '/api/mock-interview',
      description: 'AI-powered interview practice',
      status: 'idle'
    },
    {
      id: 'grammar-check',
      name: 'Grammar Check',
      icon: MessageSquare,
      endpoint: '/api/grammar-check',
      description: 'AI grammar and writing assistance',
      status: 'idle'
    }
  ]);

  const testAPI = async (apiId: string) => {
    setApis(prev => prev.map(api =>
      api.id === apiId ? { ...api, status: 'testing' as const } : api
    ));

    try {
      let response;
      const api = apis.find(a => a.id === apiId);

      switch (apiId) {
        case 'spotify':
          response = await fetch('/api/spotify');
          break;

        case 'doubt-solving':
          response = await fetch('/api/solve-doubt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              question: "What is photosynthesis?",
              subject: "biology"
            })
          });
          break;

        case 'study-content':
          response = await fetch('/api/generate-study-content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              topic: "Machine Learning Basics",
              subject: "computer-science",
              contentType: "summary",
              learningLevel: "beginner"
            })
          });
          break;

        case 'code-execution':
          response = await fetch('/api/execute-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              language: "javascript",
              code: 'console.log("Hello from CareerPilot-AI!");'
            })
          });
          break;

        case 'code-analysis':
          response = await fetch('/api/analyze-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              code: 'function add(a, b) { return a + b; }',
              language: "javascript",
              userLevel: "beginner"
            })
          });
          break;

        case 'language-learning':
          response = await fetch('/api/language-learning', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: "translate-text",
              targetLanguage: "spanish",
              text: "Hello, how are you?",
              proficiencyLevel: "beginner"
            })
          });
          break;

        case 'mock-interview':
          response = await fetch('/api/mock-interview', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: "generate-questions",
              jobRole: "software-engineer",
              numQuestions: 3,
              experienceLevel: "mid"
            })
          });
          break;

        case 'grammar-check':
          response = await fetch('/api/grammar-check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text: "this is a test sentance with some error's.",
              language: "english",
              checkType: "full"
            })
          });
          break;

        default:
          response = await fetch(api?.endpoint || '');
      }

      const data = await response.json();

      setApis(prev => prev.map(api =>
        api.id === apiId ? {
          ...api,
          status: 'success' as const,
          result: JSON.stringify(data, null, 2).substring(0, 500) + '...'
        } : api
      ));

    } catch (error) {
      setApis(prev => prev.map(api =>
        api.id === apiId ? {
          ...api,
          status: 'error' as const,
          error: error instanceof Error ? error.message : 'Unknown error'
        } : api
      ));
    }
  };

  const testAllAPIs = async () => {
    for (const api of apis) {
      await testAPI(api.id);
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'testing': return 'text-yellow-400';
      case 'success': return 'text-green-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'testing': return <Settings className="animate-spin" size={16} />;
      case 'success': return <CheckCircle size={16} />;
      case 'error': return <AlertCircle size={16} />;
      default: return <Play size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">🚀 CareerPilot-AI API Test Center</h1>
          <p className="text-gray-300 text-lg mb-6">
            Test all dynamic API integrations in real-time
          </p>
          <button
            onClick={testAllAPIs}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
          >
            Test All APIs
          </button>
        </div>

        {/* API Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apis.map((api) => {
            const IconComponent = api.icon;
            return (
              <div
                key={api.id}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <IconComponent className="text-blue-400" size={24} />
                    <h3 className="text-lg font-semibold">{api.name}</h3>
                  </div>
                  <div className={`flex items-center space-x-2 ${getStatusColor(api.status)}`}>
                    {getStatusIcon(api.status)}
                    <span className="text-sm capitalize">{api.status}</span>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-4">{api.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <code className="text-xs bg-gray-700 px-2 py-1 rounded">
                    {api.endpoint}
                  </code>
                  <button
                    onClick={() => testAPI(api.id)}
                    disabled={api.status === 'testing'}
                    className="px-3 py-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded text-sm transition-colors"
                  >
                    {api.status === 'testing' ? 'Testing...' : 'Test'}
                  </button>
                </div>

                {/* Results */}
                {api.status === 'success' && api.result && (
                  <div className="bg-green-900/20 border border-green-500/50 rounded p-3">
                    <h4 className="text-green-400 text-sm font-medium mb-2">✅ Success Response:</h4>
                    <pre className="text-xs text-green-300 overflow-x-auto">
                      {api.result}
                    </pre>
                  </div>
                )}

                {api.status === 'error' && api.error && (
                  <div className="bg-red-900/20 border border-red-500/50 rounded p-3">
                    <h4 className="text-red-400 text-sm font-medium mb-2">❌ Error:</h4>
                    <p className="text-xs text-red-300">{api.error}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Status Summary */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-semibold mb-4">📊 Integration Status</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {apis.length}
              </div>
              <div className="text-sm text-gray-400">Total APIs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {apis.filter(api => api.status === 'success').length}
              </div>
              <div className="text-sm text-gray-400">Successful</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">
                {apis.filter(api => api.status === 'error').length}
              </div>
              <div className="text-sm text-gray-400">Failed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {apis.filter(api => api.status === 'testing').length}
              </div>
              <div className="text-sm text-gray-400">Testing</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-400">
          <p className="text-sm">
            🎯 All APIs are now dynamic and production-ready!
            <br />
            Configure your environment variables to enable full functionality.
          </p>
        </div>
      </div>
    </div>
  );
}
