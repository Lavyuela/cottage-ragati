# Cottage Ragati - Deployment Setup Script
# This script helps you prepare for deployment

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Cottage Ragati Deployment Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is installed
Write-Host "Checking Git installation..." -ForegroundColor Yellow
try {
    $gitVersion = git --version
    Write-Host "✓ Git is installed: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Git is not installed!" -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Step 1: GitHub Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Ask for GitHub username
$githubUsername = Read-Host "Enter your GitHub username"

Write-Host ""
Write-Host "Great! Now go to GitHub and create a new repository:" -ForegroundColor Yellow
Write-Host "1. Go to: https://github.com/new" -ForegroundColor White
Write-Host "2. Repository name: cottage-ragati" -ForegroundColor White
Write-Host "3. Make it PUBLIC (required for free hosting)" -ForegroundColor White
Write-Host "4. Do NOT initialize with README" -ForegroundColor White
Write-Host "5. Click 'Create repository'" -ForegroundColor White
Write-Host ""

$ready = Read-Host "Have you created the repository? (yes/no)"

if ($ready -eq "yes" -or $ready -eq "y") {
    Write-Host ""
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    
    # Initialize git if not already
    if (-not (Test-Path ".git")) {
        git init
        Write-Host "✓ Git initialized" -ForegroundColor Green
    } else {
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
    
    # Add remote
    Write-Host "Adding GitHub remote..." -ForegroundColor Yellow
    $repoUrl = "https://github.com/$githubUsername/cottage-ragati.git"
    
    try {
        git remote add origin $repoUrl
        Write-Host "✓ Remote added" -ForegroundColor Green
    } catch {
        Write-Host "Remote already exists, updating..." -ForegroundColor Yellow
        git remote set-url origin $repoUrl
        Write-Host "✓ Remote updated" -ForegroundColor Green
    }
    
    # Push to GitHub
    Write-Host ""
    Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
    Write-Host "You may need to enter your GitHub credentials..." -ForegroundColor Cyan
    
    git branch -M main
    git push -u origin main
    
    Write-Host ""
    Write-Host "✓ Code pushed to GitHub successfully!" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "  Next Steps" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Your code is now on GitHub!" -ForegroundColor Green
    Write-Host "Repository: https://github.com/$githubUsername/cottage-ragati" -ForegroundColor White
    Write-Host ""
    Write-Host "Now follow these steps:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "STEP 2: Deploy Backend to Render" -ForegroundColor Cyan
    Write-Host "1. Go to: https://render.com/dashboard" -ForegroundColor White
    Write-Host "2. Click 'New +' → 'Web Service'" -ForegroundColor White
    Write-Host "3. Connect your GitHub repository" -ForegroundColor White
    Write-Host "4. Configure:" -ForegroundColor White
    Write-Host "   - Root Directory: server" -ForegroundColor White
    Write-Host "   - Build Command: npm install" -ForegroundColor White
    Write-Host "   - Start Command: node server.js" -ForegroundColor White
    Write-Host "5. Add environment variables (Airbnb & Booking.com URLs)" -ForegroundColor White
    Write-Host "6. Click 'Create Web Service'" -ForegroundColor White
    Write-Host ""
    Write-Host "STEP 3: Deploy Frontend to Vercel" -ForegroundColor Cyan
    Write-Host "1. Go to: https://vercel.com/new" -ForegroundColor White
    Write-Host "2. Import your GitHub repository" -ForegroundColor White
    Write-Host "3. Configure:" -ForegroundColor White
    Write-Host "   - Root Directory: client" -ForegroundColor White
    Write-Host "   - Framework: Vite" -ForegroundColor White
    Write-Host "4. Add environment variable: VITE_API_URL (your Render URL)" -ForegroundColor White
    Write-Host "5. Click 'Deploy'" -ForegroundColor White
    Write-Host ""
    Write-Host "📖 For detailed instructions, see: DEPLOY_NOW.md" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "🎉 You're almost there!" -ForegroundColor Green
    
} else {
    Write-Host ""
    Write-Host "No problem! When you're ready:" -ForegroundColor Yellow
    Write-Host "1. Create the repository on GitHub" -ForegroundColor White
    Write-Host "2. Run this script again" -ForegroundColor White
    Write-Host ""
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
