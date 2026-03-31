# One-off: fetch Figma MCP asset URLs into public/images/ with detected extension.
$ErrorActionPreference = "Stop"
$root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$outDir = Join-Path $root "public\images"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$map = [ordered]@{
  "hero-portrait"            = "https://www.figma.com/api/mcp/asset/76154cc9-f8a4-45d2-a9d0-820b6016dc60"
  "hero-cta-arrow"           = "https://www.figma.com/api/mcp/asset/339b92e4-d618-4afd-a645-2b18ae97c116"
  "nav-ellipse-home"         = "https://www.figma.com/api/mcp/asset/305890bb-d15b-4f0a-b870-0b19df0f88b9"
  "nav-ellipse-projects"     = "https://www.figma.com/api/mcp/asset/b7a38eb5-b9f9-45b9-abce-6b50fb0e1461"
  "home-project-school"      = "https://www.figma.com/api/mcp/asset/bc1434ff-c35a-4b95-99a9-38a335a7a714"
  "home-project-dash"        = "https://www.figma.com/api/mcp/asset/af5f1bea-019a-4dd4-945d-efd880907c3d"
  "home-project-fixora"      = "https://www.figma.com/api/mcp/asset/c1ae7696-3cea-4705-a3f1-1182e3cc9fea"
  "home-project-nursery"     = "https://www.figma.com/api/mcp/asset/470e1d9f-255c-4276-b256-f4fb988b3c16"
  "projects-cta-arrow"       = "https://www.figma.com/api/mcp/asset/45f6c834-c78c-4c90-94c8-1223aac137c6"
  "projects-page-school"     = "https://www.figma.com/api/mcp/asset/acdaa451-9eb2-46fb-9ed9-45d43a504eb7"
  "projects-page-dash"       = "https://www.figma.com/api/mcp/asset/af61b0a8-251a-4752-b4c4-4f1139cf763b"
  "projects-page-nursery"    = "https://www.figma.com/api/mcp/asset/52fda70f-0da4-4ac3-ba03-64f48ba49c9f"
  "projects-page-mechanic"   = "https://www.figma.com/api/mcp/asset/3ad20599-aca7-4a1d-9513-759ed2a01ab8"
  "projects-page-link-arrow" = "https://www.figma.com/api/mcp/asset/8a501291-b65d-44ab-b8a0-170e1e22269f"
  "case-process-arrow-1"     = "https://www.figma.com/api/mcp/asset/b0c216ea-1e96-4f92-af41-22aa7f8dfe80"
  "case-process-arrow-2"     = "https://www.figma.com/api/mcp/asset/1c1f421c-58cb-4789-a2a9-46d0dc8ae7b4"
  "case-link-arrow"          = "https://www.figma.com/api/mcp/asset/8f0b93b5-b98f-4854-8a64-668da99e99eb"
  "case-wide"                = "https://www.figma.com/api/mcp/asset/2756a265-1692-4d50-aba6-9ae70ea98afd"
  "case-hand-bg"             = "https://www.figma.com/api/mcp/asset/6e76f01c-4ff3-49d8-b33c-01d6d6802613"
  "case-hand-phone"          = "https://www.figma.com/api/mcp/asset/72e14ce7-410a-419c-b113-8534721f79bc"
  "unavailable-cta-icon"     = "https://www.figma.com/api/mcp/asset/aac9a7a3-82db-4754-8c13-0213a2a539d4"
  "contact-chevron"          = "https://www.figma.com/api/mcp/asset/1aaf6974-b469-4287-a94b-b4f8af56c548"
  "contact-submit-arrow"     = "https://www.figma.com/api/mcp/asset/89c05232-d4d8-41c5-b6da-db6e87d74f84"
  "services-plus"            = "https://www.figma.com/api/mcp/asset/553a5ff2-6a79-49a5-9848-08161a1054ad"
  "footer-mark"              = "https://www.figma.com/api/mcp/asset/d1c0e636-74d3-4a42-80b6-5779bc3be6c5"
  "footer-dribbble-0"        = "https://www.figma.com/api/mcp/asset/7144508c-a995-4b00-9f33-28f0a3fea0c5"
  "footer-dribbble-1"        = "https://www.figma.com/api/mcp/asset/73cbfe5e-e895-475d-9a4c-d2a8158194c8"
  "footer-dribbble-2"        = "https://www.figma.com/api/mcp/asset/f72e76fb-777d-4804-901a-8704541d7195"
  "footer-dribbble-3"        = "https://www.figma.com/api/mcp/asset/3a9e62c3-190e-4f34-9540-cee6c7f1e45c"
  "footer-linkedin-0"        = "https://www.figma.com/api/mcp/asset/bd2d1839-f029-406a-b82a-2663b584ccb5"
  "footer-linkedin-1"        = "https://www.figma.com/api/mcp/asset/7c8686e6-a812-4f2c-aaba-2d9086899fa5"
  "footer-linkedin-2"        = "https://www.figma.com/api/mcp/asset/7bc9b216-fd74-4785-b7fa-72e0db5009ad"
  "footer-behance-0"         = "https://www.figma.com/api/mcp/asset/12325e0d-4756-4698-8bae-8a6c27913d2c"
  "footer-behance-1"         = "https://www.figma.com/api/mcp/asset/02cb92b3-189a-4a24-bb63-7d0e33626157"
}

function Get-ImageExtension([byte[]]$bytes) {
  if ($bytes.Length -lt 4) { return ".bin" }
  if ($bytes[0] -eq 0xFF -and $bytes[1] -eq 0xD8) { return ".jpg" }
  if ($bytes[0] -eq 0x89 -and $bytes[1] -eq 0x50 -and $bytes[2] -eq 0x4E -and $bytes[3] -eq 0x47) { return ".png" }
  if ($bytes[0] -eq 0x47 -and $bytes[1] -eq 0x49 -and $bytes[2] -eq 0x46) { return ".gif" }
  if ($bytes[0] -eq 0x52 -and $bytes[1] -eq 0x49 -and $bytes[2] -eq 0x46 -and $bytes[3] -eq 0x46) { return ".webp" }
  $take = [Math]::Min(256, $bytes.Length)
  $snippet = [System.Text.Encoding]::UTF8.GetString($bytes, 0, $take).TrimStart()
  if ($snippet.StartsWith("<") -or $snippet.StartsWith("<?xml")) { return ".svg" }
  return ".bin"
}

foreach ($key in $map.Keys) {
  $url = $map[$key]
  $tmp = Join-Path $env:TEMP ("figma-" + $key + ".dl")
  Write-Host "Downloading $key ..."
  Invoke-WebRequest -Uri $url -OutFile $tmp -MaximumRedirection 5 -UseBasicParsing
  $bytes = [System.IO.File]::ReadAllBytes($tmp)
  $ext = Get-ImageExtension $bytes
  $dest = Join-Path $outDir ($key + $ext)
  Move-Item -LiteralPath $tmp -Destination $dest -Force
}

Write-Host "Done. Update src/assets/siteImages.ts paths if any extension differs."
