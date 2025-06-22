"use client";
import { useState, useEffect } from "react";
import Tesseract from "tesseract.js";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AiResumeAnalyzer } from "../../../../config/AllAiModels";
import { IoIosArrowForward } from "react-icons/io";

export default function ResumeExtractor() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [fileName, setFileName] = useState("");
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [miss, setMiss] = useState("");
  const [message, setMessage] = useState("");
  const [load, setLoad] = useState(false);

  // Ensure the component only runs on the client
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url
      ).toString();
    }
  }, []);

  const extractTextFromPDF = async (file) => {
    // Reset previous state
    setText("");
    setError("");
    setProgress(0);

    // Check if the file is a PDF
    if (!file || file.type !== "application/pdf") {
      setError("Please upload a valid PDF file.");
      return;
    }

    setFileName(file.name);
    setLoading(true);
    const reader = new FileReader();

    reader.onload = async function () {
      try {
        const typedArray = new Uint8Array(this.result);
        const pdf = await getDocument({ data: typedArray }).promise;
        const numPages = pdf.numPages;
        let extractedText = "";

        for (let i = 1; i <= numPages; i++) {
          const page = await pdf.getPage(i);
          const scale = 2;
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          const renderContext = { canvasContext: context, viewport };
          await page.render(renderContext).promise;

          const dataUrl = canvas.toDataURL();
          const {
            data: { text },
          } = await Tesseract.recognize(dataUrl, "eng", {
            logger: (m) => {
              if (m.status === "recognizing text") {
                setProgress(
                  Math.round(((i - 1 + m.progress) * 100) / numPages)
                );
              }
            },
          });

          extractedText += text + "\n";
          setProgress(Math.round((i * 100) / numPages));
        }

        setText(extractedText);
      } catch (err) {
        console.error(err);
        setError("Error processing the PDF. Please try again.");
      } finally {
        setLoading(false);
        setProgress(0);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      extractTextFromPDF(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      extractTextFromPDF(e.target.files[0]);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text).then(
      () => {
        // Show a temporary success message (you could add state for this)
        const copyBtn = document.getElementById("copy-btn");
        const originalText = copyBtn.innerText;
        copyBtn.innerText = "Copied!";
        setTimeout(() => {
          copyBtn.innerText = originalText;
        }, 2000);
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const handleAnalyzeWithJob = async () => {
    setLoad(true);
    const prompt = `Compare my resume with the given job description and provide the following:
  Missing Skills – Skills required in the job description that are not present in my resume.
  Skills to Refresh – Skills mentioned in my resume that match the job description but may need revision or improvement.
  Resume: "${text}"
  Job Description:"${message}".include missing_skills:list of skill.refreshing_skill:skill that i have to recall.in json formate.`;
    try {
      const result = await AiResumeAnalyzer.sendMessage(prompt);
      const data = await result.response.text();
      const json = JSON.parse(data);
      console.log(json);
      setMiss(json);
      // console.log(prompt);
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  };

  if (!isClient) return null; // Prevent server-side rendering issues

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Resume Text Extractor
      </h1>

      {/* File Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 mb-6 text-center ${
          dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="mb-4">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4h-8m-12 0H8m12 0a4 4 0 01-4-4v-4m4 4h12a4 4 0 004-4v-4m-4 4h-8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="mb-2 text-sm text-gray-500">
          <span className="font-semibold">Click to upload</span> or drag and
          drop
        </p>
        <p className="text-xs text-gray-500">PDF files only</p>

        <input
          id="file-upload"
          name="file-upload"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="sr-only"
        />
        <label
          htmlFor="file-upload"
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
        >
          Select PDF
        </label>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="mb-6">
          <p className="mb-2 text-sm font-medium text-gray-700">
            Processing {fileName}...
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="mt-2 text-xs text-gray-500 text-right">
            {progress}% complete
          </p>
        </div>
      )}

      {/* Results Area */}
      {text && !loading && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Extracted Text
            </h2>
            <button
              id="copy-btn"
              onClick={copyToClipboard}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg
                className="h-4 w-4 mr-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                />
              </svg>
              Copy to Clipboard
            </button>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
              {text}
            </pre>
          </div>
        </div>
      )}
      <div className="grid w-full gap-1.5">
        <Label htmlFor="message">Job description here</Label>
        <Textarea
          placeholder="Type your Job description here..."
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <Button
        onClick={() => handleAnalyzeWithJob()}
        className="mt-4"
        disabled={!text || !message || miss}
      >
        {load ? "Analyazing..." : "Analyaze with Job description"}
      </Button>
      {miss && (
        <div className="mt-5 flex gap-5 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div>
            <p className="font-bold">Courses & points to be done</p>
            {miss?.missing_skills?.map((skill, index) => (
              <div
                key={index}
                className="cursor-pointer border mt-2 rounded-xl bg-blue-500 text-white text-center"
              >
                <p
                  className="p-2 mt-2 flex gap-2 items-center justify-center"
                  onClick={() => {
                    window.location.href = `/course?skill=${encodeURIComponent(
                      skill
                    )}`;
                  }}
                >
                  {skill} <IoIosArrowForward />
                </p>
              </div>
            ))}
          </div>
          <div>
            <p className="font-bold">Courses & points to be Recall</p>
            {miss?.skills_to_refresh?.map((skill, index) => (
              <div
                key={index}
                className="cursor-pointer border mt-2 rounded-xl bg-blue-500 text-white text-center"
              >
                <p className="p-2 mt-2 flex gap-2 items-center justify-center">
                  {skill}
                  <IoIosArrowForward />
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
