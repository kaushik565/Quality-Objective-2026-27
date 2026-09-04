$file = 'D:\MRMNEW-master\KAushikMRMNEW-master\src\slides\EmptySlide.jsx'
$lines = Get-Content -Path $file -Encoding UTF8
$output = @()
$i = 0

while ($i -lt $lines.Count) {
    $line = $lines[$i]
    
    # Check if this is the first SITE-I CA card's h4 tag
    if ($line -match "margin: '0 0 12px 0'" -and $i -gt 400 -and $i -lt 430) {
        # Replace this h4 line
        $output += $line -replace "margin: '0 0 12px 0'", "margin: 0" -replace ", textAlign: 'center'" , ", textAlign: 'center'"]
        $output += $line -replace "margin: '0 0 12px 0'", "margin: 0" -replace "Corrective Actions", "Corrective Actions" -replace "fontSize: '0.95em'", "fontSize: '0.95em', textAlign: 'center'"
        
        # Skip the next 4 data divs
        $i++
        while ($i -lt $lines.Count -and $i -lt 435) {
            if ($lines[$i] -match "</div>" -and $lines[$i-1] -notmatch "style=") {
                $output += $lines[$i]
                break
            }
            $i++
        }
    } else {
        $output += $line
    }
    
    $i++
}

Set-Content -Path $file -Value $output -Encoding UTF8
Write-Host "Fixed SITE-I CA card"
