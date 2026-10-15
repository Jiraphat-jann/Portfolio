@echo off
title Portfolio Local Server
echo ========================================================
echo Starting Portfolio Local Web Server...
echo Opening http://localhost:8080 in your browser...
echo ========================================================

start http://localhost:8080

where python >nul 2>&1
if %errorlevel% == 0 (
    python -m http.server 8080
    goto end
)

where npx >nul 2>&1
if %errorlevel% == 0 (
    npx serve -l 8080 .
    goto end
)

echo Using PowerShell Native Web Server...
powershell -ExecutionPolicy Bypass -Command "& { $listener = New-Object System.Net.HttpListener; $listener.Prefixes.Add('http://localhost:8080/'); $listener.Start(); Write-Host 'Server running at http://localhost:8080. Press Ctrl+C to stop.'; while ($listener.IsListening) { $context = $listener.GetContext(); $req = $context.Request; $res = $context.Response; $path = $req.Url.LocalPath.TrimStart('/'); if ([string]::IsNullOrEmpty($path)) { $path = 'index.html' }; $fullPath = Join-Path (Get-Location) $path; if (Test-Path $fullPath) { $bytes = [System.IO.File]::ReadAllBytes($fullPath); if ($path.EndsWith('.html')) { $res.ContentType = 'text/html; charset=utf-8' } elseif ($path.EndsWith('.css')) { $res.ContentType = 'text/css' } elseif ($path.EndsWith('.js')) { $res.ContentType = 'application/javascript' }; $res.OutputStream.Write($bytes, 0, $bytes.Length) } else { $res.StatusCode = 404 }; $res.Close() } }"

:end
pause
