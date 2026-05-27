# Fix broken template literals in all serviceCarDetails JSX files
# These files have template literals that lost their backticks during generation

$files = Get-ChildItem -Path "src\serviceCarDetails" -Recurse -Filter "*.jsx" -Exclude "*servicesDetails*"

$fixCount = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $original = $content

    # 1. Fix: alt={${service.name} ... view }  ->  alt={`${service.name} \u2013 view`}
    # Pattern: alt={${service.name} followed by some text and closing }
    $content = $content -replace 'alt=\{\$\{service\.name\} ([^\}]+?) \}', 'alt={`${service.name} $1`}'

    # 2. Fix: aria-label={View image }  ->  aria-label={`View image ${i + 1}`}
    $content = $content -replace 'aria-label=\{View image \}', 'aria-label={`View image ${i + 1}`}'

    # 3. Fix thumbnail strip className with broken backtick:
    # className={\flex-1 aspect-square overflow-hidden rounded transition-all duration-200 focus:outline-none
    #                         }
    # Should be: className={`flex-1 aspect-square overflow-hidden rounded transition-all duration-200 focus:outline-none ${i === activeImg ? 'ring-2 ring-pink-500 opacity-100' : 'opacity-60 hover:opacity-90'}`}
    $content = $content -replace 'className=\{\\flex-1 aspect-square overflow-hidden rounded transition-all duration-200 focus:outline-none\r?\n\s+\}', 'className={`flex-1 aspect-square overflow-hidden rounded transition-all duration-200 focus:outline-none ${i === activeImg ? ''ring-2 ring-pink-500 opacity-100'' : ''opacity-60 hover:opacity-90''}`}'

    # 4. Fix: alt={Thumbnail }  ->  alt={`Thumbnail ${i + 1}`}
    $content = $content -replace 'alt=\{Thumbnail \}', 'alt={`Thumbnail ${i + 1}`}'

    # 5. Fix: href={\tel:+91}  ->  href={`tel:+91${phone}`}
    $content = $content -replace 'href=\{\\tel:\+91\}', 'href={`tel:+91${phone}`}'

    # 6. Fix: href={https://wa.me/91}  ->  href={`https://wa.me/91${phone}`}
    $content = $content -replace 'href=\{https://wa\.me/91\}', 'href={`https://wa.me/91${phone}`}'

    # 7. Fix: to={$(/path/)+${s.id}}  ->  to={`/path/service/${s.id}`}
    # Pattern varies by city. e.g. to={$(/andhra-pradesh/anakapalli/service/)+${s.id}}
    $content = $content -replace 'to=\{\$\(([^\)]+)\)\+\$\{s\.id\}\}', 'to={`${1}${s.id}`}'

    # 8. Fix gallery className with broken backtick:
    # className={\relative overflow-hidden rounded-xl aspect-square focus:outline-none transition-all duration-200
    #                     }
    $content = $content -replace 'className=\{\\relative overflow-hidden rounded-xl aspect-square focus:outline-none transition-all duration-200\r?\n\s+\}', 'className={`relative overflow-hidden rounded-xl aspect-square focus:outline-none transition-all duration-200 ${i === activeImg ? ''ring-2 ring-pink-500'' : ''}`}'

    if ($content -ne $original) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        $fixCount++
        Write-Output "Fixed: $($file.FullName)"
    }
}

Write-Output "`nTotal files fixed: $fixCount"
