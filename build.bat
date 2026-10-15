@echo off
title Building Standalone Portfolio...
echo ========================================================
echo Building Standalone Portfolio (Combining Components)...
echo ========================================================

powershell -ExecutionPolicy Bypass -File "%~dp0build.ps1"

echo.
pause
