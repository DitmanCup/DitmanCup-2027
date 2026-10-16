# Baja la miniatura de cada clip de Twitch listado en CLIPS (js/script.js) y la
# guarda como assets/clips/<slug>.jpg (480px de ancho). La pagina las usa como
# vista previa de cada clip. Salta las que ya existen, asi que se puede volver a
# correr cada vez que se agregan clips nuevos.
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$root = Split-Path $PSScriptRoot -Parent
$out = Join-Path $root 'assets\clips'
New-Item -ItemType Directory -Force $out | Out-Null

$js = Get-Content (Join-Path $root 'js\script.js') -Raw -Encoding UTF8
$slugs = [regex]::Matches($js, "\{ s: '([A-Za-z0-9_-]+)'") | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique
$todo = @($slugs | Where-Object { -not (Test-Path (Join-Path $out "$_.jpg")) })
Write-Host "Clips: $($slugs.Count) | faltan miniaturas: $($todo.Count)"

$headers = @{ 'Client-ID' = 'kimne78kx3ncx6brgo4mv6wki5h1ko' }
$jpeg = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$enc = New-Object System.Drawing.Imaging.EncoderParameters 1
$enc.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 82L

$ok = 0; $missing = @()
for ($i = 0; $i -lt $todo.Count; $i += 20) {
  $chunk = @($todo[$i..([math]::Min($i + 19, $todo.Count - 1))])
  $body = ConvertTo-Json -Compress -InputObject @($chunk | ForEach-Object { @{ query = "query { clip(slug: `"$_`") { slug thumbnailURL } }" } })
  $res = Invoke-RestMethod -Uri 'https://gql.twitch.tv/gql' -Method Post -Headers $headers -Body $body -ContentType 'application/json'
  for ($k = 0; $k -lt $chunk.Count; $k++) {
    $slug = $chunk[$k]; $clip = $res[$k].data.clip
    if (-not $clip -or -not $clip.thumbnailURL) { $missing += $slug; continue }
    try {
      $bytes = (Invoke-WebRequest -Uri $clip.thumbnailURL -UseBasicParsing).Content
      $src = [System.Drawing.Image]::FromStream((New-Object System.IO.MemoryStream (,$bytes)))
      $w = 480; $h = [int][math]::Round($src.Height * $w / $src.Width)
      $bmp = New-Object System.Drawing.Bitmap $w, $h
      $g = [System.Drawing.Graphics]::FromImage($bmp)
      $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $g.DrawImage($src, 0, 0, $w, $h); $g.Dispose()
      $bmp.Save((Join-Path $out "$slug.jpg"), $jpeg, $enc)
      $bmp.Dispose(); $src.Dispose(); $ok++
    } catch { $missing += $slug }
  }
}
Write-Host "Descargadas: $ok | sin miniatura (clip borrado?): $($missing.Count)"
$missing | ForEach-Object { Write-Host "  - $_" }
