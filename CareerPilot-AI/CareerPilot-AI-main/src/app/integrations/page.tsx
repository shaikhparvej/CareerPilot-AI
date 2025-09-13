'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Code, ExternalLink, MessageSquare } from 'lucide-react';

export default function IntegrationsPage() {
  const integrations = [
    {
      title: 'Grammar & QnA Module',
      description: 'Advanced grammar checking and Q&A capabilities',
      url: 'http://localhost:9002',
      port: 9002,
      icon: MessageSquare,
      features: ['Grammar Check', 'Topic Queries', 'Extempore Topics', 'Validation']
    },
    {
      title: 'Online IDE',
      description: 'Live coding environment with AI assistance',
      url: 'http://localhost:3001',
      port: 3001,
      icon: Code,
      features: ['Live Code Editor', 'Multiple Languages', 'AI Problem Generation', 'Code Execution']
    },
    {
      title: 'Main CareerPilot Platform',
      description: 'Complete interview preparation platform',
      url: 'http://localhost:3002',
      port: 3002,
      icon: Brain,
      features: ['Mock Interviews', 'Focus Mode', 'Dashboard', 'User Management']
    }
  ];

  const openInNewTab = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            CareerPilot Integration Hub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Access all modules of the CareerPilot AI platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {integrations.map((integration, index) => {
            const IconComponent = integration.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <IconComponent className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    <div>
                      <CardTitle className="text-lg">{integration.title}</CardTitle>
                      <CardDescription>Port: {integration.port}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {integration.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-2">
                      Features:
                    </h4>
                    <ul className="space-y-1">
                      {integration.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    onClick={() => openInNewTab(integration.url)}
                    className="w-full"
                    variant="default"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Module
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            API Endpoints & Documentation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                Grammar Module API
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li><code>/api/grammar-check</code> - Grammar checking</li>
                <li><code>/api/topic-query</code> - Topic queries</li>
                <li><code>/api/validate-topic</code> - Topic validation</li>
                <li><code>/api/extempore-topic</code> - Generate topics</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                IDE Module Features
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>Monaco Editor integration</li>
                <li>Multi-language support</li>
                <li>AI-powered problem generation</li>
                <li>Code execution via Judge0 API</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
