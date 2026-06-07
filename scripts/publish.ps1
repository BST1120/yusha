# GitHub Pages 公開用（yusha-site）
# 使い方: .\scripts\publish.ps1 -Message "update lyrics"
# 初回のみ: GitHub で BST1120/yusha リポジトリを作成し、Pages を main / (root) に設定

param(
    [string]$Message = "update site"
)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $Root

$configPath = Join-Path $Root "site.config.json"
if (-not (Test-Path $configPath)) {
    Write-Error "site.config.json が見つかりません: $configPath"
}

$config = Get-Content $configPath -Raw | ConvertFrom-Json
$remote = "https://github.com/$($config.githubUser)/$($config.repoName).git"

if (-not (Test-Path (Join-Path $Root ".git"))) {
    git init -b $config.deployBranch
}

$existingRemote = git remote get-url origin 2>$null
if (-not $existingRemote) {
    git remote add origin $remote
    Write-Host "remote origin を追加: $remote"
} elseif ($existingRemote -ne $remote) {
    git remote set-url origin $remote
    Write-Host "remote origin を更新: $remote"
}

git add -A
$status = git status --porcelain
if (-not $status) {
    Write-Host "変更なし。push のみ実行します。"
} else {
    $gitName = if ($config.gitUserName) { $config.gitUserName } else { $config.githubUser }
    $gitEmail = if ($config.gitUserEmail) { $config.gitUserEmail } else { ($config.githubUser + '@users.noreply.github.com') }
    git -c "user.name=$gitName" -c "user.email=$gitEmail" commit -m $Message
}

git push -u origin $config.deployBranch

Write-Host ""
Write-Host "公開URL: $($config.pagesUrl)"
Write-Host "Pages 未設定の場合: GitHub → Settings → Pages → Branch: $($config.deployBranch) / (root)"
