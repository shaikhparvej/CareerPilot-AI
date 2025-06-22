import { NextResponse } from "next/server";
import pdf from "pdf-parse";

// Modern Route Segment Config
export const dynamic = 'force-dynamic'; // Ensure dynamic handling
export const maxDuration = 30; // Set max execution time (seconds)
export const runtime = 'nodejs'; // Explicit Node.js runtime
export const fetchCache = 'force-no-store'; // Disable caching for this route

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
      const data = await Promise.race([
        pdf(buffer),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error("PDF processing timeout")), 25000)
      ]);

      console.log("PDF API: PDF parsed successfully. Pages:", data.numpages);

      // Sanitize metadata
      const metadata = {
        pages: data.numpages,
        info: {
          title: data.info?.Title || null,
          author: data.info?.Author || null,
          creator: data.info?.Creator || null,
          creationDate: data.info?.CreationDate?.toString() || null,
          modDate: data.info?.ModDate?.toString() || null,
        }
      };

      // Sanitize extracted text
      const extractedText = data.text.replace(/[\x00-\x1F\x7F-\x9F]/g, "");

      return NextResponse.json({
        success: true,
        text: extractedText,
        metadata: metadata,
        textLength: extractedText.length,
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