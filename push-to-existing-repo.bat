@echo off
echo ========================================
echo   Pushing to Existing GitHub Repository
echo ========================================
echo.

cd /d "C:\Users\Admin\Downloads\Cottage Ragati"

echo Adding remote repository...
"C:\Program Files\Git\bin\git.exe" remote add origin https://github.com/Lavyuela/cottage-ragati.git 2>nul
if errorlevel 1 (
    echo Remote already exists, updating URL...
    "C:\Program Files\Git\bin\git.exe" remote set-url origin https://github.com/Lavyuela/cottage-ragati.git
)

echo.
echo Pushing to GitHub...
echo You will need to authenticate with GitHub.
echo Use your Personal Access Token as password.
echo.
pause

"C:\Program Files\Git\bin\git.exe" push -u origin master

echo.
echo ========================================
echo   Done!
echo ========================================
echo.
echo Check your repository: https://github.com/Lavyuela/cottage-ragati
echo.
pause
