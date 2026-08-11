$path = "C:\Users\XS\Documents\GitHub\bhramarraut\index.html"
$text = [System.IO.File]::ReadAllText($path, [Text.Encoding]::UTF8)
$bad = [char]0xFFFD
$before = ($text.ToCharArray() | Where-Object { $_ -eq $bad }).Count

# Unicode constants
$em = [char]0x2014
$en = [char]0x2013
$dot = [char]0x00B7
$arr = [char]0x2192
$ell = [char]0x2026
$ne = [char]0x2260

function Fix-Line($s) {
  if ($s -notmatch [regex]::Escape([string]$bad)) { return $s }

  # CSS comment separators
  $s = $s -replace [regex]::Escape("TOKENS $bad LIME"), "TOKENS $em LIME"
  $s = $s -replace [regex]::Escape("VIZ $bad CIRCLES"), "VIZ $em CIRCLES"
  $s = $s -replace [regex]::Escape("VIZ $bad BARS"), "VIZ $em BARS"
  $s = $s -replace [regex]::Escape("VIZ $bad TIMELINE"), "VIZ $em TIMELINE"

  # Ellipsis patterns
  $s = $s -replace "Search$bad", "Search$ell"
  $s = $s -replace "articles$bad", "articles$ell"
  $s = $s -replace "tools$bad", "tools$ell"
  $s = $s -replace "status code$bad", "status code$ell"
  $s = $s -replace "Go to$bad 2\. Click$bad", "Go to$ell 2. Click$ell"

  # Date ranges (en dash)
  $s = $s -replace "(\d{4})$bad(\d{4})", "`$1$en`$2"
  $s = $s -replace "(Apr)$bad(Jul)", "`$1$en`$2"
  $s = $s -replace "(Nov 2024)$bad(Mar 2025)", "`$1$en`$2"
  $s = $s -replace "(Sep 2022)$bad(Jan 2025)", "`$1$en`$2"
  $s = $s -replace "(Dec 2021)$bad(Jun 2022)", "`$1$en`$2"
  $s = $s -replace "2016$bad2018", "2016$en2018"
  $s = $s -replace "2018$bad2022", "2018$en2022"
  $s = $s -replace "2022$en25", "2022$en25" # already ok if fixed

  # Title suffix patterns (em dash before Bhramar or Product etc)
  $s = $s -replace "Bhramar Raut $bad Product", "Bhramar Raut $em Product"
  $s = $s -replace "Bhramar Raut $bad Former", "Bhramar Raut $em Former"
  $s = $s -replace "'([^']+) $bad Bhramar Raut'", "'`$1 $em Bhramar Raut'"
  $s = $s -replace "Case Study $bad Bhramar", "Case Study $em Bhramar"
  $s = $s -replace "Knowledge Center $bad Bhramar", "Knowledge Center $em Bhramar"
  $s = $s -replace "Recruiter Mode $bad Bhramar", "Recruiter Mode $em Bhramar"
  $s = $s -replace "Not Found $bad Bhramar", "Not Found $em Bhramar"
  $s = $s -replace "Profile $bad Bhramar", "Profile $em Bhramar"
  $s = $s -replace "Experience $bad Bhramar", "Experience $em Bhramar"
  $s = $s -replace "Projects $bad Bhramar", "Projects $em Bhramar"
  $s = $s -replace "Capabilities $bad Bhramar", "Capabilities $em Bhramar"
  $s = $s -replace "Toolbox $bad Bhramar", "Toolbox $em Bhramar"
  $s = $s -replace "Certifications $bad Bhramar", "Certifications $em Bhramar"
  $s = $s -replace "Research $bad Bhramar", "Research $em Bhramar"
  $s = $s -replace "Learning $bad Bhramar", "Learning $em Bhramar"
  $s = $s -replace "Support Lab $bad Bhramar", "Support Lab $em Bhramar"

  # Em dash contrasts
  $s = $s -replace "demonstrations $bad not", "demonstrations $em not"
  $s = $s -replace "expansion $bad not", "expansion $em not"
  $s = $s -replace "Proof of work $bad digital", "Proof of work $em digital"
  $s = $s -replace "validation $bad 6\+", "validation $em 6+"
  $s = $s -replace "role-aware validation\.$", "role-aware validation."
  $s = $s -replace "modules $bad 7 role", "modules $dot 7 role"
  $s = $s -replace "Co-authored$bad ", "Co-authored $em "
  $s = $s -replace "Co-author $bad ", "Co-author $em "
  $s = $s -replace "agreements $bad they", "agreements $em they"
  $s = $s -replace "defensive $bad no", "defensive $em no"
  $s = $s -replace "open source $bad my", "open source $em my"
  $s = $s -replace "cause of one or more incidents $bad focuses", "cause of one or more incidents $em focuses"
  $s = $s -replace "Training $bad production", "Training $ne production"
  $s = $s -replace "state $bad not guesses", "state $em not guesses"
  $s = $s -replace "What OWASP ZAP Is $bad and What", "What OWASP ZAP Is $em and What"
  $s = $s -replace "security testing $bad useful", "security testing $em useful"
  $s = $s -replace "alternatives exist $bad choice", "alternatives exist $em choice"
  $s = $s -replace "linking requirements to reviewable implementation checkpoints\.$", "linking requirements to reviewable implementation checkpoints."
  $s = $s -replace "delivery visibility $bad linking", "delivery visibility $em linking"
  $s = $s -replace "employment\.$", "employment."
  $s = $s -replace "not conventional full-time software development employment\.$", "not conventional full-time software development employment."

  # Hero / product lines (middot)
  $s = $s -replace "Product Support $bad Application Support $bad Implementation", "Product Support $dot Application Support $dot Implementation"
  $s = $s -replace "Former Wipro Project Engineer $bad PSM I $bad 2026", "Former Wipro Project Engineer $dot PSM I $dot 2026"
  $s = $s -replace "Scrum\.org $bad 2026 $bad Verified", "Scrum.org $dot 2026 $dot Verified"
  $s = $s -replace "Earned 2023 $bad Expired", "Earned 2023 $dot Expired Apr 2026"
  $s = $s -replace "SQL $bad APIs $bad Postman", "SQL $dot APIs $dot Postman"
  $s = $s -replace "ITSM $bad Linux", "ITSM $dot Linux"
  $s = $s -replace "Integrations $bad Monitoring", "Integrations $dot Monitoring"
  $s = $s -replace "Implementation $bad Solutions", "Implementation $dot Solutions"
  $s = $s -replace "Product Support $bad Implementation", "Product Support $dot Implementation"
  $s = $s -replace "Application Support $bad Implementation", "Application Support $dot Implementation"
  $s = $s -replace "Target: Product Support $bad Application Support $bad Implementation", "Target: Product Support $dot Application Support $dot Implementation"
  $s = $s -replace "EdTech $bad Project-based $bad 2026", "EdTech $dot Project-based $dot 2026"
  $s = $s -replace "Admissions ops $bad Project-based $bad 2026", "Admissions ops $dot Project-based $dot 2026"
  $s = $s -replace "Case study $bad Project-based $bad 2026", "Case study $dot Project-based $dot 2026"
  $s = $s -replace "Earned 2023 $bad Credential expired", "Earned 2023 $dot Expired Apr 2026"
  $s = $s -replace "Coursera $bad Wipro Velocity", "Coursera $dot Wipro Velocity"
  $s = $s -replace "IBM SQL \(Coursera\) $bad Java", "IBM SQL (Coursera), Java"
  $s = $s -replace "PSM I \(Scrum\.org, 2026\) $bad AWS", "PSM I (Scrum.org, 2026) $dot AWS"
  $s = $s -replace "expired Apr 2026\) $bad IBM", "expired Apr 2026) $dot IBM"
  $s = $s -replace "StackRoute/Wipro\)$", "StackRoute/Wipro)"

  # Contact / links (middot)
  $s = $s -replace "LinkedIn</a> $bad <a", "LinkedIn</a> $dot <a"
  $s = $s -replace "GitHub</a> $bad <a", "GitHub</a> $dot <a"
  $s = $s -replace "raut\.bhramar@gmail\.com $bad \+91", "raut.bhramar@gmail.com $dot +91"
  $s = $s -replace "\+91 89894 12921 $bad Pandhurna", "+91 89894 12921 $dot Pandhurna"
  $s = $s -replace "Bhramar Raut $bad Pandhurna", "Bhramar Raut $dot Pandhurna"
  $s = $s -replace "bhramarraut\.github\.io $bad LinkedIn", "bhramarraut.github.io $dot LinkedIn"
  $s = $s -replace "linkedin\.com/in/bhramarraut $bad GitHub", "linkedin.com/in/bhramarraut $dot GitHub"

  # Recruiter experience lines
  $s = $s -replace "\) $bad AI-Assisted", ") $em AI-Assisted"
  $s = $s -replace "\) $bad Business Operations", ") $em Business Operations"
  $s = $s -replace "\) $bad Project Engineer", ") $em Project Engineer"
  $s = $s -replace "\) $bad Project Engineering", ") $em Project Engineering"
  $s = $s -replace "Skillverse\.in</strong> $bad 6\+", "Skillverse.in</strong> $em 6+"
  $s = $s -replace "Catalyx</strong> $bad 10\+", "Catalyx</strong> $em 10+"
  $s = $s -replace "documentation $bad Workflow", "documentation $dot Workflow"
  $s = $s -replace "validation $bad Requirements", "validation $dot Requirements"
  $s = $s -replace "decomposition $bad Fix", "decomposition $dot Fix"
  $s = $s -replace "validation $bad Process", "validation $dot Process"
  $s = $s -replace "documentation $bad OpenProject", "documentation $dot OpenProject"
  $s = $s -replace "tracking $bad AI-assisted", "tracking $dot AI-assisted"
  $s = $s -replace "accountability $bad Technology", "accountability $dot Technology"

  # Project / case study tool chains (middot)
  $s = $s -replace "Cursor $bad Codex $bad Antigravity $bad Ollama $bad OpenProject", "Cursor $dot Codex $dot Antigravity $dot Ollama $dot OpenProject"
  $s = $s -replace "Requirements $bad workflow definition $bad validation $bad OpenProject", "Requirements $dot workflow definition $dot validation $dot OpenProject"
  $s = $s -replace "Requirements decomposition $bad role/access behavior $bad validation $bad documentation", "Requirements decomposition $dot role/access behavior $dot validation $dot documentation"
  $s = $s -replace "Branch-level restrictions $bad auditability $bad lead lifecycle $bad follow-up aging", "Branch-level restrictions $dot auditability $dot lead lifecycle $dot follow-up aging"
  $s = $s -replace "Lead management $bad Tasks $bad Follow-ups $bad Counselors $bad Branches $bad Campaigns $bad Reporting $bad Notifications $bad Audit log $bad Admin $bad Permissions $bad Settings", "Lead management $dot Tasks $dot Follow-ups $dot Counselors $dot Branches $dot Campaigns $dot Reporting $dot Notifications $dot Audit log $dot Admin $dot Permissions $dot Settings"

  # Education
  $s = $s -replace "Engineering $bad Civil Engineering", "Engineering $em Civil Engineering"
  $s = $s -replace "Burhanpur $bad Science", "Burhanpur $dot Science"
  $s = $s -replace "Hands-on = directly used in project work $bad Foundation", "Hands-on = directly used in project work $dot Foundation"
  $s = $s -replace "Foundation = formally learned or previously certified $bad Learning", "Foundation = formally learned or previously certified $dot Learning"
  $s = $s -replace "Learning = actively building $bad Awareness", "Learning = actively building $dot Awareness"

  # Article flow arrows
  $s = $s -replace "Reproduce $bad Observe $bad Isolate $bad Document $bad Validate", "Reproduce $arr Observe $arr Isolate $arr Document $arr Validate"
  $s = $s -replace "pending $bad active $bad suspended", "pending $arr active $arr suspended"
  $s = $s -replace "roles $bad actions $bad resources", "roles $arr actions $arr resources"
  $s = $s -replace "Stability $bad freshness $bad convenience", "Stability $dot freshness $dot convenience"
  $s = $s -replace "Define requirement</strong> $bad what", "Define requirement</strong> $arr what"
  $s = $s -replace "Permission boundaries $bad can role", "Permission boundaries: can role"
  $s = $s -replace "<code>ipconfig</code> $bad View", "<code>ipconfig</code> $em View"
  $s = $s -replace "<code>ping</code> $bad Test", "<code>ping</code> $em Test"
  $s = $s -replace "<code>tracert</code> $bad Trace", "<code>tracert</code> $em Trace"
  $s = $s -replace "<code>nslookup</code> $bad DNS", "<code>nslookup</code> $em DNS"
  $s = $s -replace "<code>netstat</code> $bad Active", "<code>netstat</code> $em Active"
  $s = $s -replace "<code>tasklist</code> / <code>taskkill</code> $bad Process", "<code>tasklist</code> / <code>taskkill</code> $em Process"
  $s = $s -replace "<code>sfc /scannow</code> $bad System", "<code>sfc /scannow</code> $em System"
  $s = $s -replace "<code>DISM</code> $bad Image", "<code>DISM</code> $em Image"
  $s = $s -replace "<code>chkdsk</code> $bad Disk", "<code>chkdsk</code> $em Disk"
  $s = $s -replace "Module $bad Role $bad Permission", "Module $arr Role $arr Permission"
  $s = $s -replace "Workflow $bad Expected Behavior", "Workflow $arr Expected Behavior"
  $s = $s -replace "Validation $bad Documentation", "Validation $arr Documentation"

  # UAT demo
  $s = $s -replace "demonstration $bad mark", "demonstration $em mark"

  # JS article meta - will fix separately with escapes

  # Remaining single bad chars - default to em dash before space+capital word patterns
  $s = $s -replace "$bad ", "$em "

  # Remaining bad at end or between words
  $s = $s -replace "$bad", "$em"

  return $s
}

$lines = $text -split "`n"
$fixed = ($lines | ForEach-Object { Fix-Line $_ }) -join "`n"

$after = ($fixed.ToCharArray() | Where-Object { $_ -eq $bad }).Count
[System.IO.File]::WriteAllText($path, $fixed, [Text.UTF8Encoding]::new($false))
Write-Output "Before: $before After: $after"
