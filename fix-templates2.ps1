# Fix remaining broken template literals: className={\... and href={\tel:...
# These have backslash characters that were treated as escape sequences

$files = Get-ChildItem -Path "src\serviceCarDetails" -Recurse -Filter "*.jsx" -Exclude "*servicesDetails*"

$fixCount = 0

foreach ($file in $files) {
    $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
    $content = [System.Text.Encoding]::UTF8.GetString($bytes)
    $original = $content

    # Fix className={\flex-1 aspect-square... (thumbnail strip)
    # The \f is a form-feed character (0x0C)
    $pattern1 = "className={" + [char]0x0C + "lex-1 aspect-square overflow-hidden rounded transition-all duration-200 focus:outline-none`r`n                        }"
    $replacement1 = "className={``flex-1 aspect-square overflow-hidden rounded transition-all duration-200 focus:outline-none `${i === activeImg ? 'ring-2 ring-pink-500 opacity-100' : 'opacity-60 hover:opacity-90'}``}"
    $content = $content.Replace($pattern1, $replacement1)

    # Also try without \r
    $pattern1b = "className={" + [char]0x0C + "lex-1 aspect-square overflow-hidden rounded transition-all duration-200 focus:outline-none`n                        }"
    $content = $content.Replace($pattern1b, $replacement1)

    # Fix className={\relative overflow-hidden... (gallery button)
    # The \r might just be literal backslash-r but let's check
    $pattern2 = "className={" + [char]0x5C + "relative overflow-hidden rounded-xl aspect-square focus:outline-none transition-all duration-200`r`n                    }"
    $replacement2 = "className={``relative overflow-hidden rounded-xl aspect-square focus:outline-none transition-all duration-200 `${i === activeImg ? 'ring-2 ring-pink-500' : ''}``}"
    $content = $content.Replace($pattern2, $replacement2)

    $pattern2b = "className={" + [char]0x5C + "relative overflow-hidden rounded-xl aspect-square focus:outline-none transition-all duration-200`n                    }"
    $content = $content.Replace($pattern2b, $replacement2)

    # Fix href={\tel:+91} - the \t is a tab character (0x09)
    $pattern3 = "href={" + [char]0x09 + "el:+91}"
    $replacement3 = "href={``tel:+91`${phone}``}"
    $content = $content.Replace($pattern3, $replacement3)

    # Also try literal backslash-t
    $pattern3b = "href={" + [char]0x5C + "tel:+91}"
    $content = $content.Replace($pattern3b, $replacement3)

    if ($content -ne $original) {
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        $fixCount++
        Write-Output "Fixed: $($file.Name)"
    }
}

Write-Output "`nTotal files fixed: $fixCount"
