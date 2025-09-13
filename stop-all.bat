@echo off
echo ============================================
echo    Stopping CareerPilot AI Complete Suite
echo ============================================
echo.

echo Checking for running Node.js processes...
tasklist | findstr node.exe

echo.
echo Stopping all development servers...

echo Killing processes on port 3000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do taskkill /PID %%a /F 2>nul

echo Killing processes on port 3004...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3004') do taskkill /PID %%a /F 2>nul

echo Killing processes on port 9002...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :9002') do taskkill /PID %%a /F 2>nul

echo Killing processes on port 3003...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3003') do taskkill /PID %%a /F 2>nul

echo.
echo ============================================
echo     All CareerPilot AI services stopped
echo ============================================
echo.
pause
