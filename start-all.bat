@echo off
echo ============================================
echo    Starting CareerPilot AI Complete Suite
echo ============================================
echo.

echo Starting all modules...
echo.

echo 1. Starting Main CareerPilot AI (Port 3000)...
start "CareerPilot-Main" cmd /k "cd /d \"d:\All Projects\CareerPilot AI\" && npm run dev"

timeout /t 3 /nobreak > nul

echo 2. Starting MentorX AI Main (Port 3003)...
start "MentorX-Main" cmd /k "cd /d \"d:\All Projects\CareerPilot AI\MentorX-AI\mentorafinal\" && npm run dev"

timeout /t 3 /nobreak > nul

echo 3. Starting Grammar & QnA Module (Port 9002)...
start "Grammar-QnA" cmd /k "cd /d \"d:\All Projects\CareerPilot AI\MentorX-AI\grammar-qna-module\" && npm run dev"

timeout /t 3 /nobreak > nul

echo 4. Starting Online IDE (Port 3004)...
start "Online-IDE" cmd /k "cd /d \"d:\All Projects\CareerPilot AI\MentorX-AI\online-ide\" && npm run dev"

echo.
echo ============================================
echo   All modules are starting up...
echo   Please wait for all services to be ready
echo ============================================
echo.
echo Access URLs:
echo - Main Platform: http://localhost:3000
echo - MentorX AI: http://localhost:3003
echo - Grammar Module: http://localhost:9002
echo - Online IDE: http://localhost:3004
echo.
pause
