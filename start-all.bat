@echo off
cls
echo.
echo ====echo.
echo ================================================
echo           ALL MODULES STARTING UP!
echo ================================================
echo.
echo ✅ Spotify API Removed - Using Simple Music API
echo ✅ No External Dependencies Required  
echo ✅ All modules starting in separate windows
echo.
echo 🌐 Access URLs (wait 30-60 seconds for full startup):
echo.
echo 🎯 Main CareerPilot AI:     http://localhost:3001
echo 🎥 Online-Meet Module:      http://localhost:3004
echo 📝 Grammar Check Module:    http://localhost:9002
echo.
echo ================================================
echo              FEATURES AVAILABLE
echo ================================================
echo.
echo 🤖 AI Code Practice
echo 🎤 Mock Interview System
echo 💻 Online IDE
echo ❓ Q&A System
echo 📝 Grammar Check
echo 🎵 Simple Music Player (No Spotify required)
echo 🗣️ Speech Recognition
echo 🎨 Theme Support
echo 📊 Dashboard
echo 🎯 Real Interview Prep
echo.
echo 🎉 CareerPilot AI is now fully operational!
echo    Check the individual CMD windows for detailed logs.
echo.
pause===============================
echo        CAREERPILOT AI - COMPLETE STARTUP  
echo ================================================
echo.

echo 🚀 Starting ALL CareerPilot AI modules with Simple Music API...
echo.

REM Kill any existing processes
echo Step 1: Cleaning up existing processes...
taskkill /f /im node.exe > nul 2>&1
taskkill /f /im npm.cmd > nul 2>&1

echo Step 2: Starting Main CareerPilot AI...
cd /d "d:\All Projects\CareerPilot AI\CareerPilot-AI\CareerPilot-AI-main"
start "Main-CareerPilot-AI" cmd /k "echo 🎯 Main CareerPilot AI Starting... && npm run dev"

timeout /t 5 /nobreak > nul

echo Step 3: Starting Online-Meet Module...
cd /d "d:\All Projects\CareerPilot AI\CareerPilot-AI\Online-Meet"
start "Online-Meet-Module" cmd /k "echo 🎥 Online-Meet Starting... && npm run dev -- --port 3004"

timeout /t 5 /nobreak > nul

echo Step 4: Starting Softskills-Grammar Module...
cd /d "d:\All Projects\CareerPilot AI\CareerPilot-AI\Softskills-Grammar"
start "Grammar-Module" cmd /k "echo 📝 Grammar Module Starting... && npm run dev -- --port 9002"

echo.
echo ============================================
echo   All modules are starting up...
echo   Please wait for all services to be ready
echo ============================================
echo.
echo Access URLs:
echo - Main Platform: http://localhost:3000
echo - Online-Meet Module: http://localhost:3004
echo - Softskills-Grammar: http://localhost:9002
echo - CareerPilot-AI-Main: http://localhost:3003
echo.
pause
