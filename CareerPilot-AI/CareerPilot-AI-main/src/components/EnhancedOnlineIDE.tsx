'use client';

import Editor from '@monaco-editor/react';
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Code,
  Download,
  FileText,
  Play,
  Settings,
  Square,
  Terminal,
  Upload,
  Zap
} from 'lucide-react';
import { useCallback, useRef, useState } from 'react';

interface ExecutionResult {
  output: string;
  error?: string;
  executionTime: number;
  language: string;
  timestamp: string;
}

const LANGUAGE_CONFIGS = {
  javascript: {
    name: 'JavaScript',
    extension: 'js',
    defaultCode: `// Welcome to CareerPilot-AI Online IDE
console.log("Hello, World!");

// Try some JavaScript features
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log("Doubled numbers:", doubled);

// Function example
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log("Fibonacci(10):", fibonacci(10));`,
    monacoLanguage: 'javascript'
  },
  python: {
    name: 'Python',
    extension: 'py',
    defaultCode: `# Welcome to CareerPilot-AI Online IDE
print("Hello, World!")

# Try some Python features
numbers = [1, 2, 3, 4, 5]
doubled = [n * 2 for n in numbers]
print("Doubled numbers:", doubled)

# Function example
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print("Fibonacci(10):", fibonacci(10))

# Class example
class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade

    def study(self):
        return f"{self.name} is studying!"

student = Student("Alice", 90)
print(student.study())`,
    monacoLanguage: 'python'
  },
  java: {
    name: 'Java',
    extension: 'java',
    defaultCode: `// Welcome to CareerPilot-AI Online IDE
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");

        // Array example
        int[] numbers = {1, 2, 3, 4, 5};
        System.out.println("Array length: " + numbers.length);

        // Method example
        System.out.println("Factorial(5): " + factorial(5));
    }

    public static int factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }
}`,
    monacoLanguage: 'java'
  },
  cpp: {
    name: 'C++',
    extension: 'cpp',
    defaultCode: `// Welcome to CareerPilot-AI Online IDE
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    cout << "Hello, World!" << endl;

    // Vector example
    vector<int> numbers = {1, 2, 3, 4, 5};
    cout << "Vector size: " << numbers.size() << endl;

    // STL algorithm example
    auto max_element = *max_element(numbers.begin(), numbers.end());
    cout << "Max element: " << max_element << endl;

    return 0;
}`,
    monacoLanguage: 'cpp'
  },
  c: {
    name: 'C',
    extension: 'c',
    defaultCode: `// Welcome to CareerPilot-AI Online IDE
#include <stdio.h>
#include <stdlib.h>

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    printf("Hello, World!\\n");

    // Array example
    int numbers[] = {1, 2, 3, 4, 5};
    int size = sizeof(numbers) / sizeof(numbers[0]);
    printf("Array size: %d\\n", size);

    // Function example
    printf("Factorial(5): %d\\n", factorial(5));

    return 0;
}`,
    monacoLanguage: 'c'
  },
  go: {
    name: 'Go',
    extension: 'go',
    defaultCode: `// Welcome to CareerPilot-AI Online IDE
package main

import (
    "fmt"
    "sort"
)

func main() {
    fmt.Println("Hello, World!")

    // Slice example
    numbers := []int{5, 2, 8, 1, 9}
    fmt.Println("Original:", numbers)

    sort.Ints(numbers)
    fmt.Println("Sorted:", numbers)

    // Function example
    fmt.Println("Fibonacci(10):", fibonacci(10))
}

func fibonacci(n int) int {
    if n <= 1 {
        return n
    }
    return fibonacci(n-1) + fibonacci(n-2)
}`,
    monacoLanguage: 'go'
  }
};

export default function EnhancedOnlineIDE() {
  const [language, setLanguage] = useState<keyof typeof LANGUAGE_CONFIGS>('javascript');
  const [code, setCode] = useState(LANGUAGE_CONFIGS.javascript.defaultCode);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [theme, setTheme] = useState('vs-dark');
  const [fontSize, setFontSize] = useState(14);
  const [showSettings, setShowSettings] = useState(false);

  const editorRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleLanguageChange = useCallback((newLanguage: keyof typeof LANGUAGE_CONFIGS) => {
    setLanguage(newLanguage);
    setCode(LANGUAGE_CONFIGS[newLanguage].defaultCode);
    setOutput('');
    setExecutionResult(null);
  }, []);

  const runCode = async () => {
    if (!code.trim()) {
      setOutput('Error: No code to execute');
      return;
    }

    setIsRunning(true);
    setOutput('Executing code...');

    try {
      const response = await fetch('/api/execute-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language,
          code,
          input
        }),
      });

      const result = await response.json();

      if (result.success) {
        setExecutionResult(result.data);
        setOutput(result.data.output || 'No output');
      } else {
        setOutput(`Error: ${result.error}`);
        setExecutionResult(null);
      }
    } catch (error) {
      setOutput(`Network Error: ${error instanceof Error ? error.message : 'Failed to execute code'}`);
      setExecutionResult(null);
    } finally {
      setIsRunning(false);
    }
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${LANGUAGE_CONFIGS[language].extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setCode(content);
      };
      reader.readAsText(file);
    }
  };

  const clearOutput = () => {
    setOutput('');
    setExecutionResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Code className="text-blue-400" size={32} />
            <h1 className="text-2xl font-bold">CareerPilot-AI Online IDE</h1>
          </div>
          <div className="text-sm text-gray-400">
            Real-time code execution with AI assistance
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-gray-800 rounded-lg">
          {/* Language Selection */}
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-300">Language:</label>
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value as keyof typeof LANGUAGE_CONFIGS)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(LANGUAGE_CONFIGS).map(([key, config]) => (
                <option key={key} value={key}>
                  {config.name}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={runCode}
              disabled={isRunning}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-md transition-colors"
            >
              {isRunning ? (
                <>
                  <Square size={16} />
                  <span>Running...</span>
                </>
              ) : (
                <>
                  <Play size={16} />
                  <span>Run Code</span>
                </>
              )}
            </button>

            <button
              onClick={downloadCode}
              className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              <Download size={16} />
              <span>Download</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center space-x-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded-md transition-colors"
            >
              <Upload size={16} />
              <span>Upload</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              onChange={uploadFile}
              accept=".js,.py,.java,.cpp,.c,.go"
              className="hidden"
            />

            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center space-x-2 px-3 py-2 bg-gray-600 hover:bg-gray-700 rounded-md transition-colors"
            >
              <Settings size={16} />
              <span>Settings</span>
            </button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Editor Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Theme</label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="vs-dark">Dark</option>
                  <option value="light">Light</option>
                  <option value="hc-black">High Contrast</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Font Size</label>
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-center text-sm text-gray-400 mt-1">{fontSize}px</div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={clearOutput}
                  className="flex items-center space-x-2 px-3 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                >
                  <Terminal size={16} />
                  <span>Clear Output</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Editor */}
          <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
            <div className="flex items-center justify-between p-3 bg-gray-700 border-b border-gray-600">
              <div className="flex items-center space-x-2">
                <FileText size={16} className="text-blue-400" />
                <span className="font-medium">Editor</span>
                <span className="text-sm text-gray-400">({LANGUAGE_CONFIGS[language].name})</span>
              </div>
              <div className="text-xs text-gray-400">
                Lines: {code.split('\\n').length}
              </div>
            </div>
            <div className="h-96">
              <Editor
                height="100%"
                language={LANGUAGE_CONFIGS[language].monacoLanguage}
                value={code}
                onChange={(value) => setCode(value || '')}
                onMount={handleEditorDidMount}
                theme={theme}
                options={{
                  fontSize,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  wordWrap: 'on'
                }}
              />
            </div>
          </div>

          {/* Output Panel */}
          <div className="space-y-4">
            {/* Input Section */}
            <div className="bg-gray-800 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between p-3 bg-gray-700 border-b border-gray-600">
                <div className="flex items-center space-x-2">
                  <Terminal size={16} className="text-green-400" />
                  <span className="font-medium">Input</span>
                </div>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter input for your program (if needed)..."
                className="w-full h-24 p-3 bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none"
              />
            </div>

            {/* Output Section */}
            <div className="bg-gray-800 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between p-3 bg-gray-700 border-b border-gray-600">
                <div className="flex items-center space-x-2">
                  <Terminal size={16} className="text-yellow-400" />
                  <span className="font-medium">Output</span>
                </div>
                {executionResult && (
                  <div className="flex items-center space-x-4 text-sm">
                    {executionResult.error ? (
                      <div className="flex items-center space-x-1 text-red-400">
                        <AlertCircle size={14} />
                        <span>Error</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 text-green-400">
                        <CheckCircle size={14} />
                        <span>Success</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1 text-gray-400">
                      <Clock size={14} />
                      <span>{executionResult.executionTime}ms</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="h-64 overflow-y-auto">
                <pre className="p-3 text-sm font-mono text-white whitespace-pre-wrap">
                  {output || 'Run your code to see output here...'}
                  {executionResult?.error && (
                    <div className="mt-2 p-2 bg-red-900/20 border border-red-500/50 rounded text-red-300">
                      <strong>Error:</strong> {executionResult.error}
                    </div>
                  )}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Zap className="text-yellow-400" size={20} />
              <span className="font-medium">CareerPilot-AI Code Execution Engine</span>
            </div>
            <div className="text-sm text-gray-400">
              Supported: JavaScript, Python, Java, C++, C, Go
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Features: Real-time execution, syntax highlighting, error detection, code download/upload, and AI assistance.
          </div>
        </div>
      </div>
    </div>
  );
}
