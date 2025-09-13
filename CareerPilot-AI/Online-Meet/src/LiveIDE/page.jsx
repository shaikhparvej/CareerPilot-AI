"use client";

import Editor from "@monaco-editor/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { runJavaScriptLocally, runPythonLike } from "../utils/localRunner";

const LANGUAGE_ID = {
  javascript: 63,
  python: 71,
  java: 62,
  c: 48,
  cpp: 52,
};

const DEFAULT_CODE = {
  javascript: 'console.log("Hello, World!");',
  python: 'print("Hello, World!")',
  java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
  c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
  cpp: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}',
};

export default function LiveIDE() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(DEFAULT_CODE["javascript"]);
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState("vs-dark");
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function handleEditorChange(value, event) {
    setCode(value);
  }

  const runCode = async () => {
    setIsLoading(true);
    setOutput("Running...");

    // Try running locally first for supported languages
    if (language === 'javascript' || language === 'python') {
      try {
        let result;
        if (language === 'javascript') {
          result = runJavaScriptLocally(code);
        } else if (language === 'python') {
          result = runPythonLike(code);
        }

        if (result.success) {
          setOutput(`✅ Local execution successful:\n\n${result.output}`);
          setIsLoading(false);
          return; // Exit early if local execution succeeded
        }
      } catch (localError) {
        console.log("Local execution failed, continuing with online execution:", localError);
        // Continue with online execution
      }
    }

    try {
      // Try the free Judge0 CE instance first
      setOutput("Trying free Judge0 instance...");

      try {
        const fallbackResponse = await axios.post(
          "https://ce.judge0.com/submissions",
          {
            source_code: code,
            language_id: LANGUAGE_ID[language],
            stdin: "",
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const token = fallbackResponse.data.token;
        let result;
        let attempts = 0;
        const maxAttempts = 10;

        while (attempts < maxAttempts) {
          await new Promise((resolve) => setTimeout(resolve, 1500));

          const resultResponse = await axios.get(
            `https://ce.judge0.com/submissions/${token}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          result = resultResponse.data;

          if (result.status && result.status.id > 2) {
            break;
          }

          attempts++;
        }

        let outputText = "";

        if (result.status && result.status.id === 3) {
          outputText =
            result.stdout || "Program executed successfully with no output";
        } else if (result.status && result.status.id === 6) {
          outputText =
            result.compile_output || "Compilation error (no details available)";
        } else if (result.stderr) {
          outputText = result.stderr;
        } else if (result.compile_output) {
          outputText = result.compile_output;
        } else if (result.message) {
          outputText = result.message;
        } else {
          outputText = "An unknown error occurred during execution";
        }

        if (result.status) {
          outputText = `Status: ${result.status.description}\n\n${outputText}`;
        }

        setOutput(`✅ Executed via free Judge0 instance:\n\n${outputText}`);
        setIsLoading(false);
        return; // Exit early if this worked
      } catch (fallbackError) {
        console.error("Free Judge0 instance error:", fallbackError);
        // Continue with RapidAPI attempt
      }
      // Finally try RapidAPI Judge0
      try {
        const response = await axios.post(
          "https://judge0-ce.p.rapidapi.com/submissions",
          {
            source_code: code,
            language_id: LANGUAGE_ID[language],
            stdin: "",
          },
          {
            headers: {
              "Content-Type": "application/json",
              "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
              "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            },
          }
        );

        const token = response.data.token;
        let result;
        let attempts = 0;
        const maxAttempts = 10;

        while (attempts < maxAttempts) {
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const resultResponse = await axios.get(
            `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
            {
              headers: {
                "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
                "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
              },
            }
          );

          result = resultResponse.data;

          if (result.status && result.status.id > 2) {
            break;
          }

          attempts++;
        }

        let outputText = "";

        if (result.status && result.status.id === 3) {
          outputText =
            result.stdout || "Program executed successfully with no output";
        } else if (result.status && result.status.id === 6) {
          outputText =
            result.compile_output || "Compilation error (no details available)";
        } else if (result.stderr) {
          outputText = result.stderr;
        } else if (result.compile_output) {
          outputText = result.compile_output;
        } else if (result.message) {
          outputText = result.message;
        } else {
          outputText = "An unknown error occurred during execution";
        }

        if (result.status) {
          outputText = `Status: ${result.status.description}\n\n${outputText}`;
        }

        setOutput(outputText);
      } catch (rapidApiError) {
        console.error("RapidAPI error:", rapidApiError);

        // If we get here, both free Judge0 and RapidAPI failed
        setOutput(
          `❌ Code execution failed.\n\n` +
          `We tried multiple execution methods but encountered errors:\n\n` +
          `Error: ${rapidApiError.message}\n\n` +
          `Solutions:\n` +
          `1. For JavaScript/Python: Use the "Run Locally" button\n` +
          `2. Try again later - service may be temporarily unavailable\n` +
          `3. Try simpler code\n` +
          `4. Contact administrator if the issue persists\n\n` +
          `Current code:\n${code}`
        );
      }
    } catch (error) {
      console.error("Overall execution error:", error);
      setOutput(
        `❌ Error executing code: ${error.message}\n\n${
          error.response?.data?.message || ""
        }\n\nIf this persists, try the "Run Locally" button for JavaScript/Python.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const runCodeLocally = () => {
    setIsLoading(true);
    setOutput("Running locally...");

    try {
      let result;
      if (language === 'javascript') {
        result = runJavaScriptLocally(code);
      } else if (language === 'python') {
        result = runPythonLike(code);
      } else {
        setOutput(`❌ Local execution not supported for ${language}.\nPlease use the "Run Code" button for online execution.`);
        return;
      }

      if (result.success) {
        setOutput(`✅ Local execution successful:\n\n${result.output}`);
      } else {
        setOutput(`❌ Local execution failed:\n\n${result.output}`);
      }
    } catch (error) {
      setOutput(`❌ Local runner error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCode(DEFAULT_CODE[language] || "");
  }, [language]);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <div className="p-4 bg-gray-800 flex justify-between items-center">
        <div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-700 text-white p-2 rounded mr-4"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
          </select>

          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="bg-gray-700 text-white p-2 rounded"
          >
            <option value="vs-dark">Dark</option>
            <option value="light">Light</option>
            <option value="hc-black">High Contrast</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button
            onClick={runCodeLocally}
            disabled={isLoading || (language !== 'javascript' && language !== 'python')}
            className={`px-4 py-2 rounded ${
              isLoading ? "bg-gray-600" :
              (language === 'javascript' || language === 'python') ?
                "bg-green-600 hover:bg-green-700" : "bg-gray-600"
            }`}
            title={
              (language === 'javascript' || language === 'python') ?
              "Run directly in browser (recommended)" :
              "Only available for JavaScript and Python"
            }
          >
            {isLoading ? "Running..." : "Run Locally (Fast)"}
          </button>

          <button
            onClick={runCode}
            disabled={isLoading}
            className={`px-4 py-2 rounded ${
              isLoading ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
            }`}
            title="Run code on Judge0 server (supports all languages)"
          >
            {isLoading ? "Running..." : "Run Online"}
          </button>
        </div>
      </div>

      <div className="flex flex-grow">
        <div className="flex-1 p-2">
            <Editor
              height="100%"
              defaultLanguage={language}
              language={language}
              theme={theme}
              value={code}
              onChange={handleEditorChange}
              onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
        </div>

        <div className="flex-1 p-4 bg-gray-800 overflow-auto">
          <h3 className="text-lg font-semibold mb-2">Output</h3>
          <pre
            className={`whitespace-pre-wrap p-3 rounded text-sm font-mono ${
              output.includes("error") ||
              output.includes("Error") ||
              output.includes("fail")
                ? "bg-red-900 text-red-100"
                : "bg-gray-900 text-white"
            }`}
          >
            {output}
          </pre>
        </div>
      </div>
    </div>
  );
}
