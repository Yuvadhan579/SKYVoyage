$Host.UI.RawUI.WindowTitle = "SkyVoyage - Flight Booking System"

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  SkyVoyage - Complete Flight Booking Application" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Verify Node.js
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] Node.js is not found on your system!" -ForegroundColor Red
    Write-Host "Please download and install Node.js (version 22.5 or newer) from:" -ForegroundColor Yellow
    Write-Host "  https://nodejs.org/" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit..."
    exit 1
}

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptDir

# 2. Check dependencies
if (-not (Test-Path "$scriptDir\node_modules")) {
    Write-Host "[INFO] First-time setup: Installing dependencies via npm..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] npm install encountered an error!" -ForegroundColor Red
        Read-Host "Press Enter to exit..."
        exit 1
    }
    Write-Host "[INFO] Dependencies installed successfully!" -ForegroundColor Green
    Write-Host ""
}

# 3. Launch application
Write-Host "[INFO] Starting SkyVoyage servers..." -ForegroundColor Green
npm start

if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Application exited with error code $LASTEXITCODE." -ForegroundColor Red
    Read-Host "Press Enter to exit..."
}
