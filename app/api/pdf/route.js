// app/api/pdf/route.js
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import pdf from "pdf-parse";

export async function POST(request) {
  console.log("PDF API: Request received");
  
  try {
    if (!request.body) {
      console.log("PDF API: No request body provided");
      return NextResponse.json({ 
        success: false, 
        error: "No request body" 
      }, { status: 400 });
    }

    const formData = await request.formData();
    const file = formData.get("pdf");

    if (!file) {
      console.log("PDF API: No PDF file uploaded");
      return NextResponse.json(
        { 
          success: false,
          error: "No PDF file uploaded" 
        },
        { status: 400 }
      );
    }

    // Log file details for debugging
    console.log("PDF API: Received file:", {
      type: file.type,
      size: file.size,
      name: file.name,
    });

    // Validate file type
    if (!file.type || !file.type.includes("pdf")) {
      console.log("PDF API: Invalid file type:", file.type);
      return NextResponse.json(
        { 
          success: false,
          error: "Invalid file type. Please upload a PDF." 
        },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log("PDF API: File converted to buffer, size:", buffer.length);

    // Process PDF directly from buffer
    try {
      console.log("PDF API: Starting PDF parsing");
      const data = await pdf(buffer);
      console.log("PDF API: PDF parsed successfully, pages:", data.numpages);

      // Extract text content and metadata
      const extractedText = data.text;
      const metadata = {
        pages: data.numpages,
        info: {
          ...data.info,
          // Convert Date objects to strings for JSON serialization
          CreationDate: data.info?.CreationDate?.toString() || null,
          ModDate: data.info?.ModDate?.toString() || null,
        }
      };

      // Get a preview of the text (first 200 chars)
      const textPreview = extractedText.substring(0, 200) + (extractedText.length > 200 ? '...' : '');
      console.log("PDF API: Text preview:", textPreview);

      return NextResponse.json({
        success: true,
        text: extractedText,
        info: metadata,
        textLength: extractedText.length,
      });
    } catch (error) {
      console.error("PDF API: Error processing PDF:", error);
      return NextResponse.json(
        { 
          success: false,
          error: "Error processing PDF", 
          message: error.message 
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
        message: error.message 
      },
      { status: 500 }
    );
  }
}

// Configure segment size for larger files
export const config = {
  api: {
    bodyParser: false,
    responseLimit: "50mb",
  },
};
