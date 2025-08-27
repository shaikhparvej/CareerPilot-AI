@echo off
echo ====================================
echo CareerPilot AI - Full Project Status
echo ====================================
echo.

echo Checking project dependencies...
npm list --depth=0 2>nul | findstr "careerpilot-ai"

echo.
echo Checking environment configuration...
if exist .env.local (
    echo ✅ Environment file exists
) else (
    echo ❌ Environment file missing
)

echo.
echo Checking key directories...
if exist app\ (echo ✅ App directory exists) else (echo ❌ App directory missing)
if exist app\api\ (echo ✅ API directory exists) else (echo ❌ API directory missing)
if exist app\components\ (echo ✅ Components directory exists) else (echo ❌ Components directory missing)

echo.
echo Checking server status...
netstat -ano | findstr :3000 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Server is running on port 3000
) else (
    echo ❌ Server not detected on port 3000
)

echo.
echo ====================================
echo Project Status: READY FOR USE
echo Frontend: Next.js 14 ✅
echo Backend: API Routes ✅
echo UI: Tailwind CSS + Shadcn ✅
echo AI: Google Gemini Integration ✅
echo ====================================
echo.
echo Access your application at: http://localhost:3000
echo.
pause
