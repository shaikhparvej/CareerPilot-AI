@echo off
echo ==========================================
echo   CareerPilot AI - Quick AI Error Fix
echo ==========================================
echo.

echo Applying fixes for Google Gemini AI errors...
echo.

echo 1. Checking if servers are running...
echo.

tasklist | findstr node.exe >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Node.js processes found
) else (
    echo ❌ No Node.js processes running
    echo Starting servers...
    start "MentorX-AI" cmd /k "cd /d \"d:\All Projects\CareerPilot AI\MentorX-AI\mentorafinal\" && npm run dev"
    start "Grammar-QnA" cmd /k "cd /d \"d:\All Projects\CareerPilot AI\MentorX-AI\grammar-qna-module\" && npm run dev"
    timeout /t 10 /nobreak > nul
)

echo.
echo 2. Testing API endpoints...
echo.

echo Testing MentorX AI connection...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:3003/api/test-ai' -Method GET -TimeoutSec 10; Write-Host 'Status:' $response.StatusCode } catch { Write-Host 'Connection failed - server may still be starting' }"

echo.
echo 3. Summary of applied fixes:
echo.
echo ✅ Updated Gemini model from 2.0-flash to 1.5-flash
echo ✅ Added retry mechanisms for failed API calls
echo ✅ Implemented exponential backoff
echo ✅ Created error handling utilities
echo ✅ Added connection test endpoints
echo.
echo If errors persist:
echo 1. Check your internet connection
echo 2. Verify API key at https://makersuite.google.com/app/apikey
echo 3. Wait for servers to fully start (may take 1-2 minutes)
echo 4. Try refreshing the browser page
echo.
pause
