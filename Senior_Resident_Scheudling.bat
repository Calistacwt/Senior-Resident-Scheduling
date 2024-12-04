@echo off

:: Open Chrome browser with the specified URL
start chrome "http://localhost:3000"

:: Run npm start
npm start

:: Prevent the terminal from closing immediately
pause
