# Sync workspace/output/latest.txt -> assets/text (publish paths)

param(
    [string[]]$Only = @(),
    [switch]$DryRun
)

$ErrorActionPreference = "Stop"
$WorkspaceRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$SiteRoot = Split-Path -Parent $WorkspaceRoot

$manifestPath = Join-Path $WorkspaceRoot "manifest.json"
$manifest = Get-Content $manifestPath -Raw -Encoding UTF8 | ConvertFrom-Json

$synced = 0
$skipped = 0

foreach ($item in $manifest.items) {
    if ($Only.Count -gt 0 -and ($Only -notcontains $item.id)) {
        continue
    }

    if ($item.publish -eq $false) {
        Write-Host "[skip] $($item.id) - draft only (not published to web)"
        $skipped++
        continue
    }

    if (-not $item.publishPath) {
        Write-Host "[skip] $($item.id) - no publishPath"
        $skipped++
        continue
    }

    $relDir = $item.workspaceDir -replace "^workspace/", ""
    $source = Join-Path $WorkspaceRoot (Join-Path $relDir "output\latest.txt")
    $dest = Join-Path $SiteRoot ($item.publishPath -replace "/", "\")

    if (-not (Test-Path $source)) {
        Write-Host "[skip] $($item.id) - no output/latest.txt"
        $skipped++
        continue
    }

    $content = Get-Content $source -Raw -Encoding UTF8
    if (-not $content.Trim()) {
        Write-Host "[skip] $($item.id) - empty file"
        $skipped++
        continue
    }

    if ($DryRun) {
        Write-Host "[dry-run] $($item.id) -> $($item.publishPath)"
    } else {
        $destDir = Split-Path -Parent $dest
        if (-not (Test-Path $destDir)) {
            New-Item -ItemType Directory -Path $destDir -Force | Out-Null
        }
        [System.IO.File]::WriteAllText($dest, $content.TrimEnd() + "`n", [System.Text.UTF8Encoding]::new($false))
        Write-Host "[sync] $($item.id) -> $($item.publishPath)"
    }
    $synced++
}

Write-Host ""
Write-Host "synced: $synced / skipped: $skipped"
if (-not $DryRun -and $synced -gt 0) {
    Write-Host "next: ..\scripts\publish.ps1 -Message ""update production notes"""
}
