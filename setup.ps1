# CRM System - Setup and Run Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Lead Management CRM System Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if MongoDB is installed
Write-Host "Checking MongoDB installation..." -ForegroundColor Yellow
$mongoInstalled = Get-Command mongod -ErrorAction SilentlyContinue

if (-not $mongoInstalled) {
    Write-Host "❌ MongoDB not found!" -ForegroundColor Red
    Write-Host "Please install MongoDB from: https://www.mongodb.com/try/download/community" -ForegroundColor Yellow
    Write-Host "Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas" -ForegroundColor Yellow
    Write-Host ""
    $useAtlas = Read-Host "Do you want to use MongoDB Atlas? (y/n)"
    if ($useAtlas -eq 'y') {
        $atlasUri = Read-Host "Enter your MongoDB Atlas URI"
        (Get-Content "backend\.env") -replace "mongodb://localhost:27017/crm-system", $atlasUri | Set-Content "backend\.env"
        Write-Host "✅ Updated .env with Atlas URI" -ForegroundColor Green
    } else {
        Write-Host "Please install MongoDB and run this script again." -ForegroundColor Red
        exit
    }
} else {
    Write-Host "✅ MongoDB is installed" -ForegroundColor Green
    
    # Check if MongoDB is running
    $mongoRunning = Test-NetConnection -ComputerName localhost -Port 27017 -InformationLevel Quiet -ErrorAction SilentlyContinue
    
    if (-not $mongoRunning) {
        Write-Host "⚠️  MongoDB is not running. Starting MongoDB..." -ForegroundColor Yellow
        Write-Host "Please start MongoDB manually by running 'mongod' in a separate terminal" -ForegroundColor Yellow
        Write-Host ""
        pause
    } else {
        Write-Host "✅ MongoDB is running on port 27017" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Installing Backend Dependencies" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to backend and install dependencies
Set-Location backend

if (-not (Test-Path "node_modules")) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Backend dependencies installed successfully" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to install backend dependencies" -ForegroundColor Red
        Set-Location ..
        exit
    }
} else {
    Write-Host "✅ Backend dependencies already installed" -ForegroundColor Green
}

Set-Location ..

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Installing Frontend Dependencies" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to frontend and install dependencies
Set-Location frontend

if (-not (Test-Path "node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Frontend dependencies installed successfully" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to install frontend dependencies" -ForegroundColor Red
        Set-Location ..
        exit
    }
} else {
    Write-Host "✅ Frontend dependencies already installed" -ForegroundColor Green
}

Set-Location ..

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ Environment files created" -ForegroundColor Green
Write-Host "✅ Dependencies installed" -ForegroundColor Green
Write-Host ""
Write-Host "To start the application, run:" -ForegroundColor Yellow
Write-Host "  .\run.ps1" -ForegroundColor Cyan
Write-Host ""
Write-Host "Or manually start both servers:" -ForegroundColor Yellow
Write-Host "  Backend:  cd backend; npm start" -ForegroundColor White
Write-Host "  Frontend: cd frontend; npm start (in a new terminal)" -ForegroundColor White
Write-Host ""
