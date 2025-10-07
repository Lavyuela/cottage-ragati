@echo off
cd /d "C:\Users\Admin\Downloads\Cottage Ragati"

echo Pushing to GitHub...
"C:\Program Files\Git\bin\git.exe" push -f origin master

if errorlevel 1 (
    echo.
    echo Push failed. Trying with main branch...
    "C:\Program Files\Git\bin\git.exe" branch -M main
    "C:\Program Files\Git\bin\git.exe" push -f origin main
)

echo.
echo Done! Check your repository at:
echo https://github.com/Lavyuela/cottage-ragati
echo.
pause
