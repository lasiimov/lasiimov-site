# auto_deploy_vercel.ps1
# Script para deploy automático do site para Vercel

# Caminho do teu site
$sitePath = "C:\Users\sandr\Desktop\lasiimov_site"

# Entrar na pasta do site
Set-Location $sitePath

# Guardar timestamps iniciais dos arquivos
$files = Get-ChildItem -Recurse
$hashes = @{}
foreach ($file in $files) {
    if (!$file.PSIsContainer) {
        $hashes[$file.FullName] = (Get-FileHash $file.FullName).Hash
    }
}

Write-Host "Monitorização iniciada em $sitePath. Pressiona Ctrl+C para parar."

# Loop infinito de monitorização
while ($true) {
    Start-Sleep -Seconds 1

    $changed = $false
    $files = Get-ChildItem -Recurse
    foreach ($file in $files) {
        if (!$file.PSIsContainer) {
            $hash = (Get-FileHash $file.FullName).Hash
            if ($hashes[$file.FullName] -ne $hash) {
                $hashes[$file.FullName] = $hash
                $changed = $true
            }
        }
    }

    if ($changed) {
        Write-Host "Alterações detectadas! Enviando para Vercel..."
        vercel --prod
        Write-Host "Deploy concluído."
    }
}
