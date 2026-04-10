$file = 'src/App.jsx'
$content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

# Replace all corrupted sequences
$content = $content.Replace([char]0xF0 + [char]0x9F + '"' + [char]0x96, '📖')
$content = $content.Replace([char]0xE2 + [char]0x9C + [char]0x93, '✓')
$content = $content.Replace([char]0xE2 + [char]0x8C, '❌')
$content = $content.Replace([char]0xF0 + [char]0x9F + [char]0x91 + [char]0x8B, '👋')
$content = $content.Replace([char]0xF0 + [char]0x9F + [char]0x92 + [char]0xB0, '💰')
$content = $content.Replace([char]0xE2 + [char]0x86 + [char]0x92, '→')
$content = $content.Replace([char]0xE2 + [char]0x9C + [char]0x95, '✕')
$content = $content.Replace([char]0xF0 + [char]0x9F + [char]0x93 + [char]0xB1, '📱')
$content = $content.Replace([char]0xE2 + [char]0xA1 + [char]0x94, '⚔️')
$content = $content.Replace([char]0xF0 + [char]0x9F + [char]0x92 + [char]0xA1, '💡')

[System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)
Write-Host "All unicode fixed"
