@echo off
echo =========================================
echo   CareerPilot AI - Complete Platform
echo =========================================
echo.

echo Checking all running services...
echo.

echo 📊 Main CareerPilot AI Platform:
netstat -ano | findstr :3000 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Running on http://localhost:3000
) else (
    echo ❌ Not running on port 3000
)

echo.
echo 🧠 MentorX AI Main Application:
netstat -ano | findstr :3003 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Running on http://localhost:3003
) else (
    echo ❌ Not running on port 3003
)

echo.
echo 📝 Grammar & QnA Module:
netstat -ano | findstr :9002 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Running on http://localhost:9002
) else (
    echo ❌ Not running on port 9002
)

echo.
echo 💻 Online IDE Module:
netstat -ano | findstr :3004 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Running on http://localhost:3004
) else (
    echo ❌ Not running on port 3004
)

echo.
echo =========================================
echo           🎯 Quick Access URLs
echo =========================================
echo Main Platform:     http://localhost:3000
echo MentorX AI:         http://localhost:3003
echo Grammar & QnA:      http://localhost:9002
echo Online IDE:         http://localhost:3004
echo =========================================
echo.

pause
