import { NextResponse } from "next/server";

// Modern Route Segment Config
export const dynamic = 'force-dynamic'; // Ensure dynamic handling
export const maxDuration = 30; // Set max execution time (seconds)
export const runtime = 'nodejs'; // Explicit Node.js runtime
export const fetchCache = 'force-no-store'; // Disable caching for this route

// TEMPORARY: PDF route disabled due to build issues with test files in dependencies
// TODO: Re-enable once PDF processing dependencies are fixed
export async function POST(request) {
  console.log("PDF API: Route temporarily disabled");

  return NextResponse.json({
    message: "PDF route temporarily disabled",
    success: false,
    error: "PDF processing is temporarily disabled due to build compatibility issues. This will be re-enabled soon.",
    timestamp: new Date().toISOString()
  }, {
    status: 503, // Service Temporarily Unavailable
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
  });
}

export async function GET(request) {
  return NextResponse.json({
    message: "PDF route temporarily disabled",
    status: "disabled",
    reason: "Build compatibility issues with PDF dependencies"
  });
}
