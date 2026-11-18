@echo off
setlocal
title SkyVoyage - Flight Booking System

echo ============================================================
echo   SkyVoyage - Complete Flight Booking Application
echo ============================================================
echo.

:: 1. Verify Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Node.js is not installed or not in your PATH.
    echo Please download and install Node.js v22.5 or newer from:
    echo   https://nodejs.org/
    echo.
    pause
    exit /b 1
)

:: 2. Check and install dependencies if node_modules is missing
if not exist "%~dp0node_modules" (
    echo [INFO] First-time setup: Installing dependencies via npm...
    echo Please wait a moment...
    cd /d "%~dp0"
    call npm install
    if %ERRORLEVEL% neq 0 (
        echo [ERROR] npm install encountered an error.
        pause
        exit /b 1
    )
    echo [INFO] Dependencies installed successfully!
    echo.
)

:: 3. Launch both Backend and Frontend servers
cd /d "%~dp0"
echo [INFO] Starting SkyVoyage servers...
if "%~1"=="" (
    call npm start
) else (
    call npm start -- %*
)

if %ERRORLEVEL% neq 0 (
    echo.
    echo [ERROR] Application exited unexpectedly.
    pause
)
