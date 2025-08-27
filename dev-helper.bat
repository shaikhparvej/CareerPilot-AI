@echo off
echo CareerPilot AI Development Helper
echo =================================

echo Checking for processes on port 3000...
netstat -ano | findstr :3000
if %errorlevel% equ 0 (
    echo Port 3000 is in use. The development server will use port 3001.
) else (
    echo Port 3000 is available.
)

echo.
echo Starting development server...
npm run dev
