@echo off
echo ================================================
echo    Restarting MentorX AI with Speech Fix
echo ================================================
echo.

echo Stopping MentorX AI on port 3003...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3003') do taskkill /PID %%a /F 2>nul

timeout /t 2 /nobreak > nul

echo Starting MentorX AI with updated speech recognition...
cd "d:\All Projects\CareerPilot AI\MentorX-AI\mentorafinal"
start "MentorX-AI-Fixed" cmd /k "npm run dev"

echo.
echo ================================================
echo   MentorX AI restarting with speech fixes...
echo   Access at: http://localhost:3003
echo ================================================
echo.
echo Speech recognition errors should now be handled properly:
echo - No more "no-speech" console errors
echo - Better error messages for users
echo - Automatic timeout after 30 seconds
echo - Graceful error recovery
echo.
pause
