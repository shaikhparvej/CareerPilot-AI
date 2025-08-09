$replacements = @{
    "@/components/ui/" = ""
    "@/app/components/" = ""
    "@/app/data/" = ""
    "@/lib/" = ""
    "@/config/" = ""
    "@/app/" = ""
}

function Get-RelativePath {
    param(
        [string]$currentFile,
        [string]$importPath
    )

    $currentDir = Split-Path $currentFile -Parent
    $levels = ($currentDir -split '\\').Count - 1  # Subtract 1 for root

    if ($importPath.StartsWith("@/components/ui/")) {
        $componentPath = $importPath -replace "@/components/ui/", ""
        return ("..\" * $levels) + "components\ui\$componentPath"
    }
    elseif ($importPath.StartsWith("@/components/")) {
        $componentPath = $importPath -replace "@/components/", ""
        return ("..\" * $levels) + "components\$componentPath"
    }
    elseif ($importPath.StartsWith("@/app/components/")) {
        $componentPath = $importPath -replace "@/app/components/", ""
        return ("..\" * ($levels - 1)) + "components\$componentPath"
    }
    elseif ($importPath.StartsWith("@/app/data/")) {
        $dataPath = $importPath -replace "@/app/data/", ""
        return ("..\" * ($levels - 1)) + "data\$dataPath"
    }
    elseif ($importPath.StartsWith("@/config/")) {
        $configPath = $importPath -replace "@/config/", ""
        return ("..\" * $levels) + "config\$configPath"
    }
    elseif ($importPath.StartsWith("@/lib/")) {
        $libPath = $importPath -replace "@/lib/", ""
        return ("..\" * $levels) + "lib\$libPath"
    }
    elseif ($importPath.StartsWith("@/app/")) {
        $appPath = $importPath -replace "@/app/", ""
        return ("..\" * ($levels - 1)) + $appPath
    }

    return $importPath
}

$files = Get-ChildItem -Path "app" -Recurse -Filter "*.js" | Where-Object { $_.FullName -notlike "*CareerPilot AI*" }

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content

    # Find all @/ imports
    $matches = [regex]::Matches($content, 'import\s+.*?from\s+["\'](@/[^"\']+)["\']')

    foreach ($match in $matches) {
        $oldImport = $match.Groups[1].Value
        $newImport = Get-RelativePath -currentFile $file.FullName -importPath $oldImport
        $newImport = $newImport -replace '\\', '/'
        $content = $content -replace [regex]::Escape($oldImport), $newImport
    }

    # Also handle dynamic imports
    $dynamicMatches = [regex]::Matches($content, 'import\s*\(\s*["\'](@/[^"\']+)["\']\s*\)')
    foreach ($match in $dynamicMatches) {
        $oldImport = $match.Groups[1].Value
        $newImport = Get-RelativePath -currentFile $file.FullName -importPath $oldImport
        $newImport = $newImport -replace '\\', '/'
        $content = $content -replace [regex]::Escape($oldImport), $newImport
    }

    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Fixed imports in: $($file.FullName)"
    }
}

Write-Host "Import fixing complete!"
