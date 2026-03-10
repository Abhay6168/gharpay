# CRM System - Run Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting CRM System" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if dependencies are installed
if (-not (Test-Path "backend\node_modules") -or -not (Test-Path "frontend\node_modules")) {
    Write-Host "⚠️  Dependencies not installed. Running setup first..." -ForegroundColor Yellow
    .\setup.ps1
}

# Check if MongoDB is running
Write-Host "Checking MongoDB connection..." -ForegroundColor Yellow
$mongoRunning = Test-NetConnection -ComputerName localhost -Port 27017 -InformationLevel Quiet -ErrorAction SilentlyContinue -WarningAction SilentlyContinue

if (-not $mongoRunning) {
    Write-Host "❌ MongoDB is not running!" -ForegroundColor Red
    Write-Host "Please start MongoDB first by running 'mongod' in a separate terminal" -ForegroundColor Yellow
    Write-Host "Or press Enter if you're using MongoDB Atlas..." -ForegroundColor Yellow
    pause
}

Write-Host ""
Write-Host "🚀 Starting Backend Server..." -ForegroundColor Green
Write-Host "   Backend will run on http://localhost:5000" -ForegroundColor White
Write-Host ""

# Start backend in a new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; Write-Host '🔧 Backend Server Starting...' -ForegroundColor Cyan; npm start"

# Wait a bit for backend to start
Write-Host "⏳ Waiting for backend to initialize..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host ""
Write-Host "🚀 Starting Frontend Server..." -ForegroundColor Green
Write-Host "   Frontend will run on http://localhost:3000" -ForegroundColor White
Write-Host ""

# Start frontend in a new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\frontend'; Write-Host '⚛️  Frontend Server Starting...' -ForegroundColor Cyan; npm start"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  CRM System is Starting!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ Backend:  http://localhost:5000" -ForegroundColor Green
Write-Host "✅ Frontend: http://localhost:3000" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Access Points:" -ForegroundColor Yellow
Write-Host "   • Customer Lead Form: http://localhost:3000/form" -ForegroundColor White
Write-Host "   • Agent/Admin Login:  http://localhost:3000/login" -ForegroundColor White
Write-Host "   • Dashboard:          http://localhost:3000/dashboard" -ForegroundColor White
Write-Host ""
Write-Host "🔐 First Time Setup:" -ForegroundColor Yellow
Write-Host "   1. Register an agent at the login page" -ForegroundColor White
Write-Host "   2. Submit a test lead from the form" -ForegroundColor White
Write-Host "   3. Login and view your dashboard" -ForegroundColor White
Write-Host ""
Write-Host "The application will open automatically in your browser..." -ForegroundColor Cyan
Write-Host "Press Ctrl+C in the terminal windows to stop the servers" -ForegroundColor Yellow
Write-Host ""
