@echo off
cd /d "F:\Work\Cryoto\Kite scan rank"
echo Starting server from: %CD%
echo Files in directory:
dir *.html
echo.
echo Starting http-server...
npx http-server -p 8001 -o
pause
