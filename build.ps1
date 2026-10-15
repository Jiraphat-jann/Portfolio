# ========================================================
# PORTFOLIO BUILD SCRIPT
# Combines modular components into a standalone dist/ folder
# ========================================================

$baseDir = $PSScriptRoot
$distDir = Join-Path $baseDir "dist"

Write-Host "Creating dist directory..." -ForegroundColor Cyan
if (!(Test-Path $distDir)) {
    New-Item -ItemType Directory -Path $distDir | Out-Null
}

# 1. Read base index.html
$indexContent = Get-Content (Join-Path $baseDir "index.html") -Raw -Encoding UTF8

# 2. Components list
$components = @(
    @{ id = "navbar-container"; file = "components/navbar.html" },
    @{ id = "hero-container"; file = "components/Profile.html" },
    @{ id = "Profile-container"; file = "components/Profile.html" },
    @{ id = "about-container"; file = "components/about.html" },
    @{ id = "skills-container"; file = "components/skills.html" },
    @{ id = "projects-container"; file = "components/projects.html" },
    @{ id = "experience-container"; file = "components/experience.html" },
    @{ id = "certificates-container"; file = "components/certificates.html" },
    @{ id = "contact-container"; file = "components/contact.html" },
    @{ id = "footer-container"; file = "components/footer.html" }
)

Write-Host "Injecting components..." -ForegroundColor Cyan
foreach ($item in $components) {
    $compFile = Join-Path $baseDir $item.file
    if (Test-Path $compFile) {
        $compHtml = Get-Content $compFile -Raw -Encoding UTF8
        $pattern = "(?i)<div\s+id\s*=\s*[`"']$($item.id)[`"']\s*>\s*</div>"
        $safeReplacement = "<div id=`"$($item.id)`">`r`n$compHtml`r`n</div>".Replace('$', '$$')
        $indexContent = [regex]::Replace($indexContent, $pattern, $safeReplacement)
        Write-Host "  + Injected $($item.file) into #$($item.id)" -ForegroundColor Green
    }
}

# 3. Write compiled dist/index.html
$outHtml = Join-Path $distDir "index.html"
Set-Content -Path $outHtml -Value $indexContent -Encoding UTF8
Write-Host "Generated $outHtml successfully!" -ForegroundColor Green

# 4. Copy assets to dist/
$distAssets = Join-Path $distDir "assets"
if (Test-Path $distAssets) {
    Remove-Item -Recurse -Force $distAssets
}
Copy-Item -Path (Join-Path $baseDir "assets") -Destination $distAssets -Recurse -Force
Write-Host "Copied assets to $distAssets" -ForegroundColor Green

Write-Host "`nBuild complete! Standalone portfolio is ready inside 'dist/' folder." -ForegroundColor Yellow
Write-Host "You can double-click 'dist/index.html' to open directly in your browser without any server!`n" -ForegroundColor Yellow
