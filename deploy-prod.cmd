@echo off
cd /d "%~dp0"
echo Deploying with Vercel (no npm.ps1)...
node scripts\run-vercel.mjs --prod
if errorlevel 1 pause
exit /b %errorlevel%
