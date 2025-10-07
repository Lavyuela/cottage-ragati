@echo off
echo Initializing Git repository...
cd /d "C:\Users\Admin\Downloads\Cottage Ragati"

"C:\Program Files\Git\bin\git.exe" init
"C:\Program Files\Git\bin\git.exe" config user.email "ivy.waliaula@gmail.com"
"C:\Program Files\Git\bin\git.exe" config user.name "Lavyuela"
"C:\Program Files\Git\bin\git.exe" add .
"C:\Program Files\Git\bin\git.exe" commit -m "Initial commit - Cottage Ragati website"

echo.
echo ========================================
echo Git repository initialized!
echo ========================================
echo.
echo Now go back to GitHub Desktop and try again.
echo.
pause
