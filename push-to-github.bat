@echo off
echo ========================================
echo   Pushing Cottage Ragati to GitHub
echo ========================================
echo.

cd /d "c:\Users\Admin\Downloads\Cottage Ragati"

echo Initializing Git repository...
git init

echo Configuring Git...
git config user.email "ivy.waliaula@gmail.com"
git config user.name "Lavyuela"

echo Adding files...
git add .

echo Creating commit...
git commit -m "Initial commit - Cottage Ragati website"

echo Setting branch to main...
git branch -M main

echo Adding GitHub remote...
git remote add origin https://github.com/Lavyuela/cottage-ragati.git

echo.
echo ========================================
echo   Pushing to GitHub...
echo ========================================
echo You will need to authenticate with GitHub.
echo Use your GitHub Personal Access Token as password.
echo.
echo If you don't have a token:
echo 1. Go to: https://github.com/settings/tokens
echo 2. Generate new token (classic)
echo 3. Select 'repo' scope
echo 4. Copy the token and use it as password
echo.
pause

git push -u origin main

echo.
echo ========================================
echo   SUCCESS!
echo ========================================
echo.
echo Your code is now on GitHub!
echo Repository: https://github.com/Lavyuela/cottage-ragati
echo.
echo Next: Deploy to Render and Vercel
echo See: MANUAL_DEPLOYMENT_STEPS.md for instructions
echo.
pause
