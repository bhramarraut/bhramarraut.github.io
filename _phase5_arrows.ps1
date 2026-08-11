$path = "C:\Users\XS\Documents\GitHub\bhramarraut\index.html"
$text = [System.IO.File]::ReadAllText($path, [Text.Encoding]::UTF8)
$arr = [char]0x2192
$ne = [char]0x2260
$dot = [char]0x00B7

$text = $text.Replace('workflow-connector">?</div>', "workflow-connector">$arr</div>")
$text = $text.Replace('process-arrow">?</div>', "process-arrow">$arr</div>")
$text = $text.Replace('Open case study ?', "Open case study $arr")
$text = $text.Replace('Case study ?', "Case study $arr")
$text = $text.Replace('Requirements ? workflows ? validation ? documentation', "Requirements $arr Workflows $arr Validation $arr Documentation")
$text = $text.Replace('Requirements ? workflows ? AI-assisted output ? validation', "Requirements $arr workflows $arr AI-assisted output $arr validation")
$text = $text.Replace('Module ? Role ? Permission', "Module $arr Role $arr Permission")
$text = $text.Replace('Workflow ? Expected Behavior', "Workflow $arr Expected Behavior")
$text = $text.Replace('pending ? active ? suspended', "pending $arr active $arr suspended")
$text = $text.Replace('Reproduce ? Observe ? Isolate ? Document ? Validate', "Reproduce $arr Observe $arr Isolate $arr Document $arr Validate")
$text = $text.Replace('PSM I ? professional', "PSM I $ne professional")
$text = $text.Replace('ITSM · Linux — Networking', "ITSM $dot Linux $dot Networking")
$text = $text.Replace('Expired Apr 2026 Apr 2026', 'Expired Apr 2026')
$text = $text.Replace("not just —can login— but —can this role see/modify this lead in this branch?—", "not just 'can login' but 'can this role see/modify this lead in this branch?'")

[System.IO.File]::WriteAllText($path, $text, [Text.UTF8Encoding]::new($false))
Write-Output "Arrow fixes done"
