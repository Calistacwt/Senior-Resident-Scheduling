@echo off

setlocal
rem Path to your portable Node.js folder
set NODE_HOME=%~dp0\nodebinary

rem Add Node.js to the PATH
set PATH=%NODE_HOME%;%PATH%

rem Open Chrome browser with the specified URL
start chrome "http://localhost:3000"

rem Run npm start
cd /d %~dp0
npm.cmd start

rem Prevent the terminal from closing immediately
pause
