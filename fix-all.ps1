$file = 'src/App.jsx'
$content = Get-Content $file -Raw -Encoding UTF8

# Line 252
$content = $content -Replace 'ðŸ"– Event Details', '📖 Event Details'

# Lines 600, 623, 648, 677, 692, 716, 737 - All checkmark messages
$content = $content -Replace 'message: `Hero Data Found! âœ"', 'message: `Hero Data Found! ✓'
$content = $content -Replace 'message: `Item Found! âœ"', 'message: `Item Found! ✓'
$content = $content -Replace 'message: `Agent Found! âœ"', 'message: `Agent Found! ✓'
$content = $content -Replace 'message: `Character Found! âœ"', 'message: `Character Found! ✓'
$content = $content -Replace 'message: `Champion Found! âœ"', 'message: `Champion Found! ✓'

# Line 766 - Error mark
$content = $content -Replace 'setMlCheckError\(`âŒ', 'setMlCheckError(`❌'

# Line 796 - Wave emoji
$content = $content -Replace 'ðŸ'‹ This website is for', '👋 This website is for'

# Line 800 - Money emoji
$content = $content -Replace '<strong>ðŸ'° Actual Transaction:', '<strong>💰 Actual Transaction:'

# Line 803 - Checkmark and arrows
$content = $content -Replace '<strong>âœ" How it works:</strong> Browse prices â†' Ask Details on social media â†' Complete transaction there', '<strong>✓ How it works:</strong> Browse prices → Ask Details on social media → Complete transaction there'

# Line 829 - Browse arrow
$content = $content -Replace "Got it! Let's Browse â†'", "Got it! Let's Browse →"

# Line 843 - Book emoji for wiki
$content = $content -Replace 'ðŸ" Game Fandom Wiki', '📖 Game Fandom Wiki'

# Line 865 - X mark
$content = $content -Replace 'âœ•\n', "✕\n"

# Line 913 - Phone emoji and sword emoji
$content = $content -Replace '"ðŸ"« Valorant"', '"📱 Valorant"'
$content = $content -Replace '"âš"ï¸ LoL"', '"⚔️ LoL"'

# Line 929 - Lightbulb emoji
$content = $content -Replace 'ðŸ'¡ Did you mean:', '💡 Did you mean:'

# Line 960 - Book emoji
$content = $content -Replace 'ðŸ" {mlSuggestion.name}', '📖 {mlSuggestion.name}'

# Line 977 - Checkmark in message
$content = $content -Replace 'âœ" {mlCheckResult.message}', '✓ {mlCheckResult.message}'

# Line 997 - Scroll emoji
$content = $content -Replace 'ðŸ"‹ Overview', '📋 Overview'

Set-Content $file $content -Encoding UTF8
Write-Host "✓ Fixed all corrupted unicode sequences"
