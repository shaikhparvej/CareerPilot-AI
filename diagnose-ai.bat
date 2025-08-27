@echo off
echo ==========================================
echo   CareerPilot AI - Gemini API Diagnostics
echo ==========================================
echo.

echo Checking MentorX AI configuration...
echo.

echo 1. Testing AI API endpoint...
echo GET http://localhost:3003/api/test-ai
echo.

powershell -Command "try { $response = Invoke-RestMethod -Uri 'http://localhost:3003/api/test-ai' -Method GET; Write-Host 'API Response:'; $response | ConvertTo-Json -Depth 3 } catch { Write-Host 'Error:' $_.Exception.Message }"

echo.
echo 2. Checking environment variables...
echo.

if defined GOOGLE_GENAI_API_KEY (
    echo ✅ GOOGLE_GENAI_API_KEY is set
    echo Key length:
    powershell -Command "Write-Host $env:GOOGLE_GENAI_API_KEY.Length"
) else (
    echo ❌ GOOGLE_GENAI_API_KEY is not set
)

if defined NEXT_PUBLIC_GEMINI_API_KEY (
    echo ✅ NEXT_PUBLIC_GEMINI_API_KEY is set
    echo Key length:
    powershell -Command "Write-Host $env:NEXT_PUBLIC_GEMINI_API_KEY.Length"
) else (
    echo ❌ NEXT_PUBLIC_GEMINI_API_KEY is not set
)

echo.
echo 3. Checking server status...
echo.

netstat -ano | findstr :3003 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ MentorX AI server is running on port 3003
) else (
    echo ❌ MentorX AI server is not running on port 3003
)

netstat -ano | findstr :9002 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Grammar QnA server is running on port 9002
) else (
    echo ❌ Grammar QnA server is not running on port 9002
)

echo.
echo ==========================================
echo          Diagnostic Results Summary
echo ==========================================
echo.
echo If you see API errors, try:
echo 1. Check your internet connection
echo 2. Verify API key is valid at https://makersuite.google.com/app/apikey
echo 3. Restart the servers: npm run dev
echo 4. Try alternative model: gemini-1.5-pro
echo.
pause
