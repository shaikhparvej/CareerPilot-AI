@echo off
echo CareerPilot AI Process Cleanup
echo ==============================

echo Checking for Node.js processes...
tasklist | findstr node.exe

echo.
echo Checking ports 3000 and 3001...
netstat -ano | findstr :3000
netstat -ano | findstr :3001

echo.
echo To kill a specific process, use: taskkill /PID [process_id] /F
echo Example: taskkill /PID 1234 /F

pause
