import { NextResponse } from "next/server";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";

// Modern Route Segment Config
export const dynamic = 'force-dynamic'; // Ensure dynamic handling
export const maxDuration = 30; // Set max execution time (seconds)
export const runtime = 'nodejs'; // Explicit Node.js runtime
export const fetchCache = 'force-no-store'; // Disable caching for this route

// Configure PDF.js for server-side rendering
if (typeof window === 'undefined') {
  // Server-side: disable worker
  pdfjsLib.GlobalWorkerOptions.workerSrc = null;
}

export async function POST(request) {
  console.log("PDF API: Request received");

  try {
    // Verify content type
    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('multipart/form-data')) {
      console.log("PDF API: Invalid content type");
      return NextResponse.json(
        { success: false, error: "Content-Type must be multipart/form-data" },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("pdf");

    // Validate file exists
    if (!file || typeof file === 'string') {
      console.log("PDF API: No PDF file uploaded");
      return NextResponse.json(
        { success: false, error: "No PDF file uploaded" },
        { status: 400 }
      );
    }

    // Log file metadata for debugging
    console.log("PDF API: Received file metadata:", {
      name: file.name,
      type: file.type,
      size: file.size,
    });

    // Validate file type
    if (!file.type || !file.type.includes("pdf")) {
      console.log("PDF API: Invalid file type:", file.type);
      return NextResponse.json(
        { success: false, error: "Invalid file type. Please upload a PDF." },
        { status: 400 }
      );
    }

    // Convert file to buffer with size validation
    const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: "File size exceeds 50MB limit" },
        { status: 413 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log("PDF API: File processing started. Size:", buffer.length, "bytes");

    // Process PDF with timeout protection
    try {
      console.log("PDF API: Starting PDF parsing");
      
      // Extract text using PDF.js
      const pdfDocument = await Promise.race([
        pdfjsLib.getDocument({
          data: buffer,
          verbosity: 0 // Reduce logging
        }).promise,
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("PDF processing timeout")), 25000)
        )
      ]);

      console.log("PDF API: PDF loaded successfully. Pages:", pdfDocument.numPages);

      let extractedText = "";
      
      // Extract text from all pages
      for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
        const page = await pdfDocument.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        extractedText += pageText + '\n';
      }

      // Get document info
      const info = await pdfDocument.getMetadata();

      // Sanitize metadata
      const metadata = {
        pages: pdfDocument.numPages,
        info: {
          title: info.info?.Title || null,
          author: info.info?.Author || null,
          creator: info.info?.Creator || null,
          creationDate: info.info?.CreationDate?.toString() || null,
          modDate: info.info?.ModDate?.toString() || null,
        }
      };

      // Sanitize extracted text
      const cleanText = extractedText.replace(/[\x00-\x1F\x7F-\x9F]/g, "");

      return NextResponse.json({
        success: true,
        text: cleanText,
        metadata: metadata,
        textLength: cleanText.length,
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      });

    } catch (error) {
      console.error("PDF API: PDF processing error:", error);
      return NextResponse.json(
        {
          success: false,
          error: error.message.includes("timeout")
            ? "PDF processing timed out"
            : "Error processing PDF",
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("PDF API: Server error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}
