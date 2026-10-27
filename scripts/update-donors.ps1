# Suma las donaciones de las ediciones de la Ditman Cup en Matcherino y guarda
# data/donors.json, que lee el Home. Matcherino no permite leer su API desde el
# navegador (CORS), por eso esto lo corre GitHub Actions cada 30 min
# (.github/workflows/update-donors.yml) y la pagina lee el JSON ya armado.
#
# Para sumar una edicion nueva (ej. la de 2027): agregar su ID a $Tournaments
# (es el numero de la URL matcherino.com/tournaments/<ID>).
$ErrorActionPreference = 'Stop'
$Tournaments = @(175467, 66141)   # 2026, 2022

$out = Join-Path $PSScriptRoot '..\data\donors.json'
$byName = @{}
$sources = @()
$totalCents = [int64]0

foreach ($id in $Tournaments) {
  $b = (Invoke-RestMethod -Uri "https://api.matcherino.com/__api/bounties/findById?id=$id").body
  $cents = [int64]0
  $local = @{}
  foreach ($tx in @($b.transactions)) {
    if ($tx.action -ne 'donate') { continue }
    # Se agrupa por nombre (sin mayusculas): una misma persona puede tener 2 cuentas
    $key = ([string]$tx.displayName).Trim().ToLower()
    if (-not $byName.ContainsKey($key)) { $byName[$key] = @{ name = ([string]$tx.displayName).Trim(); cents = [int64]0; count = 0 } }
    $byName[$key].cents += [int64]$tx.amount
    $byName[$key].count += 1
    $cents += [int64]$tx.amount
    if (-not $local.ContainsKey($key)) { $local[$key] = @{ name = ([string]$tx.displayName).Trim(); cents = [int64]0; count = 0; tx = @() } }
    $local[$key].cents += [int64]$tx.amount
    $local[$key].count += 1
    # Cada donacion por separado (fecha UTC + monto) para mostrar la cronologia
    $local[$key].tx += ,[ordered]@{ date = ([datetime]$tx.createdAt).ToUniversalTime().ToString('yyyy-MM-ddTHH:mm:ssZ'); amount = [math]::Round([int64]$tx.amount / 100, 2) }
  }
  $perDonors = @($local.Values | Sort-Object @{ Expression = { $_.cents }; Descending = $true }, @{ Expression = { $_.name } } |
    ForEach-Object { [ordered]@{ name = $_.name; total = [math]::Round($_.cents / 100, 2); count = $_.count; donations = @($_.tx | Sort-Object { $_.date }) } })
  $sources += [ordered]@{ id = $id; title = $b.title; startAt = $b.startAt; status = $b.status; raised = [math]::Round($cents / 100, 2); donorCount = $perDonors.Count; donors = $perDonors }
  $totalCents += $cents
}

$donors = @($byName.Values | Sort-Object @{ Expression = { $_.cents }; Descending = $true }, @{ Expression = { $_.name } } |
  ForEach-Object { [ordered]@{ name = $_.name; total = [math]::Round($_.cents / 100, 2); count = $_.count } })

$core = [ordered]@{
  currency   = 'USD'
  total      = [math]::Round($totalCents / 100, 2)
  donorCount = $donors.Count
  sources    = $sources
  donors     = $donors
}
$coreJson = $core | ConvertTo-Json -Depth 8

# Si nada cambio, no se toca el archivo (evita commits vacios en Actions)
if (Test-Path $out) {
  $old = Get-Content -Raw -Encoding UTF8 $out | ConvertFrom-Json
  $old.PSObject.Properties.Remove('updatedAt')
  if (($old | ConvertTo-Json -Depth 8) -eq $coreJson) { Write-Host 'Sin cambios.'; exit 0 }
}

$core['updatedAt'] = (Get-Date).ToUniversalTime().ToString('yyyy-MM-ddTHH:mm:ssZ')
[System.IO.File]::WriteAllText($out, ($core | ConvertTo-Json -Depth 8), (New-Object System.Text.UTF8Encoding $false))
Write-Host "OK: $($donors.Count) donadores, total $($core.total) USD"
