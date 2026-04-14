$lines = @(Get-Content src/App.tsx)
$result = @($lines[0..42]) + @($lines[309..($lines.Length-1)])
$result | Set-Content src/App.tsx
Write-Host "Deleted lines 44-308"
