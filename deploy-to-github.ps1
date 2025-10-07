# Cottage Ragati - GitHub Deployment Script
# Simple version for pushing to GitHub

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Cottage Ragati - GitHub Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is installed
Write-Host "Checking Git installation..." -ForegroundColor Yellow
$gitInstalled = $false
try {
    $gitVersion = git --version 2>&1
    if ($gitVersion -match "git version") {
        Write-Host "✓ Git is installed: $gitVersion" -ForegroundColor Green
        $gitInstalled = $true
    }
}
catch {
    Write-Host "✗ Git is not installed!" -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

if (-not $gitInstalled) {
    Write-Host "✗ Git is not installed!" -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Step 1: Create GitHub Repository" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Please follow these steps:" -ForegroundColor Yellow
Write-Host "1. Go to: https://github.com/new" -ForegroundColor White
Write-Host "2. Repository name: cottage-ragati" -ForegroundColor White
Write-Host "3. Make it PUBLIC (required for free hosting)" -ForegroundColor White
Write-Host "4. Do NOT check 'Add a README file'" -ForegroundColor White
Write-Host "5. Click 'Create repository'" -ForegroundColor White
Write-Host ""

Read-Host "Press Enter when you have created the repository"

Write-Host ""
$githubUsername = Read-Host "Enter your GitHub username"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Step 2: Pushing Code to GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Initialize git if not already
Write-Host "Initializing Git repository..." -ForegroundColor Yellow
if (-not (Test-Path ".git")) {
    git init
    Write-Host "✓ Git initialized" -ForegroundColor Green
}
else {
    Write-Host "✓ Git already initialized" -ForegroundColor Green
}

# Add all files
Write-Host "Adding files..." -ForegroundColor Yellow
git add .
Write-Host "✓ Files added" -ForegroundColor Green

# Commit
Write-Host "Creating commit..." -ForegroundColor Yellow
git commit -m "Initial commit - Cottage Ragati website"
Write-Host "✓ Commit created" -ForegroundColor Green

# Set branch to main
Write-Host "Setting branch to main..." -ForegroundColor Yellow
git branch -M main
Write-Host "✓ Branch set to main" -ForegroundColor Green

# Add remote
Write-Host "Adding GitHub remote..." -ForegroundColor Yellow
$repoUrl = "https://github.com/$githubUsername/cottage-ragati.git"

$remoteExists = git remote get-url origin 2>&1
if ($remoteExists -match "https://") {
    Write-Host "Remote already exists, updating..." -ForegroundColor Yellow
    git remote set-url origin $repoUrl
    Write-Host "✓ Remote updated" -ForegroundColor Green
}
else {
    git remote add origin $repoUrl
    Write-Host "✓ Remote added" -ForegroundColor Green
}

# Push to GitHub
Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "You may need to enter your GitHub credentials..." -ForegroundColor Cyan
Write-Host ""

git push -u origin main

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  ✓ SUCCESS!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Your code is now on GitHub!" -ForegroundColor Green
Write-Host "Repository: https://github.com/$githubUsername/cottage-ragati" -ForegroundColor White
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Next Steps" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "STEP 2: Deploy Backend to Render" -ForegroundColor Yellow
Write-Host "1. Go to: https://render.com/dashboard" -ForegroundColor White
Write-Host "2. Click 'New +' button → 'Web Service'" -ForegroundColor White
Write-Host "3. Click 'Connect account' to link GitHub" -ForegroundColor White
Write-Host "4. Select your 'cottage-ragati' repository" -ForegroundColor White
Write-Host "5. Configure:" -ForegroundColor White
Write-Host "   - Name: cottage-ragati-api" -ForegroundColor White
Write-Host "   - Root Directory: server" -ForegroundColor White
Write-Host "   - Build Command: npm install" -ForegroundColor White
Write-Host "   - Start Command: node server.js" -ForegroundColor White
Write-Host "   - Instance Type: Free" -ForegroundColor White
Write-Host "6. Add Environment Variables:" -ForegroundColor White
Write-Host "   - PORT = 5000" -ForegroundColor White
Write-Host "   - AIRBNB_ICAL_URL = (your Airbnb calendar URL)" -ForegroundColor White
Write-Host "   - BOOKING_ICAL_URL = (your Booking.com calendar URL)" -ForegroundColor White
Write-Host "7. Click 'Create Web Service'" -ForegroundColor White
Write-Host "8. COPY YOUR BACKEND URL (e.g., https://cottage-ragati-api.onrender.com)" -ForegroundColor Yellow
Write-Host ""
Write-Host "STEP 3: Deploy Frontend to Vercel" -ForegroundColor Yellow
Write-Host "1. Go to: https://vercel.com/new" -ForegroundColor White
Write-Host "2. Click 'Import Git Repository'" -ForegroundColor White
Write-Host "3. Find and import 'cottage-ragati'" -ForegroundColor White
Write-Host "4. Configure:" -ForegroundColor White
Write-Host "   - Root Directory: client" -ForegroundColor White
Write-Host "   - Framework Preset: Vite" -ForegroundColor White
Write-Host "5. Add Environment Variable:" -ForegroundColor White
Write-Host "   - VITE_API_URL = (your Render backend URL from Step 2)" -ForegroundColor White
Write-Host "6. Click 'Deploy'" -ForegroundColor White
Write-Host ""
Write-Host "📖 For detailed instructions, see: DEPLOY_NOW.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
