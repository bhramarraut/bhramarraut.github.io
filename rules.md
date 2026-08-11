Yes. For your project, I would make `rules.md` much more than a style guide. It should act as the **engineering constitution of the repository**—architecture, DRY rules, file constraints, responsive behavior, accessibility, truthfulness, SEO, testing, and how the AI agent is allowed to modify the site.

One important detail: because you want the **GitHub repository itself to contain only `.git`, `.gitignore`, `index.html`, photos and PDFs**, keep `rules.md` locally and add `rules.md` to `.gitignore`. Cursor can still read it locally, but it will not be pushed to GitHub.

Use this:

````markdown
# Bhramar Raut Portfolio — Engineering Rules

> Local AI/developer engineering constitution for `bhramarraut.github.io`.
>
> This file defines the architecture, coding standards, repository constraints,
> quality gates, and implementation philosophy for this project.
>
> These rules are NON-NEGOTIABLE unless Bhramar Raut explicitly overrides them.

---

# 0. ROLE AND ENGINEERING STANDARD

Act as a:

- Principal Frontend Engineer
- Staff Software Engineer
- Senior UI Engineer
- Accessibility Engineer
- Performance Engineer
- Technical SEO Engineer
- Design Systems Engineer

The quality bar is not:

> "Make it work."

The quality bar is:

> "Would a senior/staff engineer confidently ship, maintain, debug, review,
> and defend this implementation in production?"

Every change must optimize for:

1. Correctness
2. Maintainability
3. Simplicity
4. Reusability
5. Performance
6. Accessibility
7. Responsiveness
8. Semantic HTML
9. Predictable behavior
10. Honest content
11. Recruiter usability
12. Long-term extensibility

Do not write code merely because it works visually.

Write code that is structurally correct.

---

# 1. ABSOLUTE REPOSITORY CONSTRAINT

This is intentionally a SINGLE-FILE static website.

The production Git repository MUST remain extremely small.

The production repository may contain ONLY:

```text
.git/
.gitignore
index.html

Profile Pic/
    image files only

Certification/
    PDF/image credential files only
````

`rules.md` is LOCAL-ONLY and MUST be ignored by Git.

Recommended `.gitignore` entry:

```gitignore
rules.md
```

No other production files may be created without explicit permission.

---

# 1.1 PACKAGE MANAGER & TOOLING RULE

Always use **`pnpm`** instead of `npm` (or `yarn` / `npx`) for all package management, script execution, and CLI tooling:

- Use `pnpm` for any package installations, executions, or scripts (`pnpm add`, `pnpm run`, `pnpm exec`, `pnpm dlx`).
- **DO NOT use `npm` or `npx`** under any circumstances.

---

# 2. NEVER CREATE THESE FILES OR DIRECTORIES

DO NOT create:

```text
package.json
package-lock.json
yarn.lock
pnpm-lock.yaml

src/
public/
dist/
build/
out/

css/
styles/
scss/
sass/

js/
scripts/

components/
pages/
layouts/

assets/
fonts/

node_modules/

vendor/

tests/
test/
__tests__/

docs/

.vscode/
.cursor/

vite.config.*
webpack.config.*
rollup.config.*
babel.config.*
eslint.config.*
prettier.config.*

robots.txt
sitemap.xml
manifest.json
site.webmanifest
service-worker.js

README.generated.md
CHANGELOG.md

temporary HTML files
backup HTML files
duplicate HTML files

index-old.html
index-backup.html
index-v2.html
index-final.html
index-final-final.html
```

unless Bhramar explicitly requests one.

Do not solve architecture problems by creating additional files.

Solve them cleanly INSIDE `index.html`.

---

# 3. SINGLE-FILE DOES NOT MEAN SPAGHETTI CODE

`index.html` is one physical file.

It must still behave as though it were a professionally organized application.

The file should internally contain clearly separated architecture:

```text
HTML

HEAD
  metadata
  structured data
  fonts
  icons
  external libraries

STYLE
  tokens
  reset
  typography
  shell
  navigation
  components
  page-specific styles
  responsive rules
  accessibility
  print

BODY
  global shell
  navigation
  topbar/mobile header
  templates/views
  dialogs
  semantic fallback content

SCRIPT
  configuration
  application data
  utilities
  state
  theme
  routing
  rendering
  components
  knowledge system
  toolbox
  certifications
  support lab
  dialogs
  command palette
  animation
  accessibility helpers
  initialization
```

One file must never become one giant undifferentiated blob.

---

# 4. GOLDEN RULE — SINGLE SOURCE OF TRUTH

Never maintain the same information manually in multiple locations if the
information can have one canonical source.

Bad:

```html
<a href="mailto:raut.bhramar@gmail.com">...</a>

...

<a href="mailto:raut.bhramar@gmail.com">...</a>

...

const email = "raut.bhramar@gmail.com";
```

Good:

```js
const CONFIG = {
    email: 'raut.bhramar@gmail.com'
};
```

and derive reusable behavior from that source.

The same principle applies to:

* name
* phone
* email
* LinkedIn
* GitHub
* location
* availability
* navigation
* projects
* employment
* certifications
* tools
* articles
* skills
* social links
* contact links
* credentials
* project metrics
* routes

If changing one fact requires editing five unrelated locations,
the architecture is wrong.

---

# 5. DRY — DO NOT REPEAT YOURSELF

Before writing new markup or JavaScript, search the existing file.

Ask:

> Does this component, value, selector, function, object or behavior already exist?

If yes:

REUSE IT.

Do not create:

```js
openMenu()
openMobileMenu()
showMobileMenu()
displayMenu()
```

when one correct function can serve all cases.

Prefer:

```js
function setMenuOpen(open) {
    ...
}
```

Likewise:

Bad:

```css
.card-a { border-radius:22px; }
.card-b { border-radius:22px; }
.card-c { border-radius:22px; }
```

Better:

```css
.surface-card {
    border-radius: var(--radius-module);
}
```

---

# 6. BUT DO NOT OVER-ABSTRACT

DRY does NOT mean converting every three lines into a function.

A senior engineer avoids BOTH:

* repetition
* unnecessary abstraction

Do not create a generic abstraction unless:

1. behavior genuinely repeats,
2. the abstraction makes the code easier to understand,
3. future changes become safer,
4. it has a clear responsibility.

Prefer:

```js
renderCredential()
```

over:

```js
createGenericReusableUniversalComponentFactory()
```

Clarity beats cleverness.

---

# 7. REPEATED UI MUST BE DATA-DRIVEN

Repeated objects should normally be represented as data.

Example:

```js
const CERTIFICATIONS = [
    {
        id: 'psm1',
        name: 'Professional Scrum Master I',
        issuer: 'Scrum.org',
        year: 2026,
        status: 'valid',
        file: './Certification/...pdf'
    }
];
```

Then rendered through ONE component function:

```js
function renderCertification(cert) {
    return `...`;
}
```

Do not manually copy/paste the same card six times.

Use this approach for:

* certifications
* toolbox items
* knowledge articles
* projects
* navigation
* social links
* career signals
* skills
* support examples

---

# 8. REUSE HTML STRUCTURE WITH `<template>` WHEN APPROPRIATE

Because frameworks are forbidden, native browser primitives should be used
when they improve maintainability.

For reusable DOM structures, prefer:

```html
<template id="credential-template">
    ...
</template>
```

and clone it with JavaScript.

Use `<template>` where it is cleaner than long template-string HTML.

Do not introduce React/Vue/Svelte/etc. merely to gain components.

Native Web Platform first.

---

# 9. NAVIGATION MUST HAVE ONE CANONICAL DEFINITION

Do NOT manually maintain separate navigation structures for desktop,
mobile and command palette.

Prefer ONE source:

```js
const NAVIGATION = [
    {
        group: 'Work',
        items: [
            {
                route: 'experience',
                label: 'Experience',
                icon: 'bi-briefcase'
            }
        ]
    }
];
```

Generate or derive:

* desktop sidebar
* mobile menu
* command-palette navigation

from the same canonical information whenever practical.

If three navigation systems can become inconsistent,
the architecture is wrong.

---

# 10. CONFIGURATION MUST BE CENTRALIZED

Use one top-level configuration object.

Example:

```js
const CONFIG = Object.freeze({
    name: 'Bhramar Raut',
    email: 'raut.bhramar@gmail.com',
    phone: '+918989412921',
    location: 'Pandhurna, Madhya Pradesh, India',

    linkedin: 'https://www.linkedin.com/in/bhramarraut',
    github: 'https://github.com/bhramarraut',

    site: 'https://bhramarraut.github.io/',

    profileImage: './Profile Pic/Profile_Pic.jpg'
});
```

Do not scatter these values across application logic.

---

# 11. DATA SHOULD BE IMMUTABLE BY DEFAULT

Static site data should preferably use:

```js
Object.freeze(...)
```

where useful.

Application state should be separate from source data.

Example:

```js
const STATE = {
    route: 'home',
    theme: 'auto',
    knowledgeCategory: 'all',
    knowledgeSearch: '',
    knowledgeVisibleCount: 12
};
```

Do NOT mutate:

```js
CERTIFICATIONS
ARTICLES
PROJECTS
NAVIGATION
```

to represent temporary UI state.

---

# 12. STATE MUST HAVE ONE OWNER

Avoid independent variables representing the same thing.

Bad:

```js
let currentRoute;
let activePage;
let selectedRoute;
```

Good:

```js
const STATE = {
    route: 'home'
};
```

A given piece of application state must have one authoritative owner.

---

# 13. SEPARATE DATA, STATE, RENDERING AND EVENTS

Use this conceptual architecture:

```text
DATA
↓
STATE
↓
RENDER
↓
DOM
↑
EVENTS
```

Do not mix everything inside click handlers.

Bad:

```js
button.onclick = () => {
    const data = ...
    document.querySelector(...).innerHTML = ...
    localStorage...
    navigate...
    animate...
};
```

Better:

```js
button.addEventListener('click', handleThing);

function handleThing() {
    updateThingState();
    renderThing();
}
```

---

# 14. HTML SHOULD DESCRIBE STRUCTURE

HTML decides:

> What exists?

CSS decides:

> How does it look?

JavaScript decides:

> How does it behave?

Never use JavaScript to repair basic layout that should have existed in HTML.

BAD:

```js
const wrapper = document.createElement('div');
wrapper.className = 'layout';

element.parentNode.insertBefore(wrapper, element);
wrapper.append(element);
```

when the wrapper can simply exist in HTML.

Runtime DOM surgery for ordinary layout is prohibited.

---

# 15. SEMANTIC HTML FIRST

Use semantic elements correctly:

```html
<header>
<nav>
<main>
<section>
<article>
<aside>
<footer>
<button>
<a>
<form>
<label>
time
dialog
```

Do not turn the entire website into:

```html
<div>
<div>
<div>
<div>
```

Use headings hierarchically:

```text
H1 = page subject
H2 = major sections
H3 = subsections
```

Never choose heading levels based on font size.

CSS controls appearance.

HTML controls meaning.

---

# 16. BUTTON VS LINK RULE

If the user navigates somewhere:

```html
<a>
```

If the user performs an action:

```html
<button type="button">
```

Never use:

```html
<div onclick="...">
```

for interactive functionality.

Never use:

```html
<a href="#">
```

for actions that are not navigation.

---

# 17. NEVER USE INLINE EVENT HANDLERS

Forbidden:

```html
<button onclick="openMenu()">
```

Use:

```js
button.addEventListener('click', openMenu);
```

All behavior belongs in JavaScript.

---

# 18. MINIMIZE INLINE STYLES

Avoid:

```html
<div style="margin-top:24px;color:red">
```

Prefer semantic classes.

Allowed inline style cases include genuinely data-driven properties such as:

```js
element.style.setProperty('--progress', value);
```

Do not use inline styles to compensate for weak CSS architecture.

---

# 19. CSS MUST USE DESIGN TOKENS

Never scatter magic design values everywhere.

Use variables:

```css
:root {
    --color-accent: ...;
    --surface: ...;
    --text-primary: ...;

    --space-1: ...;
    --space-2: ...;

    --radius-control: ...;
    --radius-module: ...;

    --duration-fast: ...;
}
```

If the same visual value appears repeatedly,
it should probably be a token.

---

# 20. NO MAGIC NUMBERS WITHOUT REASON

Avoid arbitrary values like:

```css
margin-left:37px;
top:13px;
width:83%;
```

unless the value has a legitimate visual or mathematical reason.

Prefer:

* token spacing
* grid
* flexbox
* clamp()
* min()
* max()
* minmax()
* aspect-ratio

Layout must be systematic.

---

# 21. USE MODERN CSS LAYOUT

Primary layout tools:

```text
CSS Grid
Flexbox
gap
minmax()
clamp()
auto-fit
auto-fill
container-aware sizing where appropriate
```

Avoid excessive:

```text
absolute positioning
negative margins
fixed pixel widths
manual coordinates
```

Absolute positioning is reserved for genuinely layered UI.

---

# 22. DO NOT USE ABSOLUTE POSITIONING AS A LAYOUT ENGINE

Forbidden pattern:

```css
left:342px;
top:182px;
width:417px;
```

for general page layout.

The site must survive:

* different phones
* tablets
* laptops
* browser zoom
* larger fonts
* longer text
* system font differences

---

# 23. MOBILE-FIRST COMPONENT BEHAVIOR

A component must have a sensible single-column/default layout.

Enhance for larger screens.

Canonical responsive architecture:

```text
Phone:        <= 767px
Tablet:       768–1023px
Desktop:      >= 1024px
Small phone:  <= 480px
Tiny phone:   <= 360px
```

Do not create contradictory breakpoints such as:

```text
mobile shell below 1024px
desktop component above 900px
```

There must never be a hybrid undefined range.

---

# 24. RESPONSIVE BREAKPOINTS MUST BE CONSISTENT

Do not invent arbitrary breakpoints for individual components unless there is
a demonstrated need.

Preferred boundaries:

```css
@media (min-width:1024px) { ... }

@media (max-width:1023px) { ... }

@media (max-width:767px) { ... }

@media (max-width:480px) { ... }

@media (max-width:360px) { ... }
```

Responsive architecture should be understandable by reading one section.

---

# 25. MOBILE MUST NOT BE SHRUNK DESKTOP

Phone UX must be intentionally designed.

On mobile:

* one primary vertical document flow
* large touch targets
* single-column content where appropriate
* no tiny dashboard metrics
* no microscopic timelines
* no nested vertical scroll traps
* no horizontal page overflow
* compact portrait
* readable typography
* predictable drawer navigation

---

# 26. ONE MOBILE SCROLL OWNER

On phone/tablet:

the browser page should normally own vertical scrolling.

Do not create nested scrolling containers unless absolutely necessary.

Desktop application shell may use:

```text
fixed shell
+
internal workspace scrolling
```

Mobile may use:

```text
normal document scrolling
```

This behavior must be deliberate.

---

# 27. NO HORIZONTAL PAGE OVERFLOW

Release requirement:

```js
document.documentElement.scrollWidth <=
document.documentElement.clientWidth
```

at supported mobile widths.

Every flex/grid child should use:

```css
min-width:0;
```

where necessary.

Long content must wrap safely.

---

# 28. USE DYNAMIC VIEWPORT UNITS

For mobile viewport-bound UI use:

```css
100dvh
```

with reasonable fallback if required.

Especially:

* drawer
* fullscreen dialogs
* modal layouts

Do not depend entirely on `100vh` on mobile browsers.

---

# 29. SAFE AREA SUPPORT

Mobile full-screen controls should respect:

```css
env(safe-area-inset-top)
env(safe-area-inset-right)
env(safe-area-inset-bottom)
env(safe-area-inset-left)
```

where appropriate.

---

# 30. ACCESSIBILITY IS NOT OPTIONAL

Every interactive component must be usable with:

* mouse
* keyboard
* touch
* screen reader where practical

Use:

```text
aria-current
aria-expanded
aria-controls
aria-selected
aria-hidden
aria-labelledby
role
```

only when semantically appropriate.

Do not add ARIA merely to appear accessible.

Native HTML semantics are preferred over ARIA.

---

# 31. TOUCH TARGETS

Interactive controls should normally be at least:

```text
44 × 44 CSS pixels
```

especially on mobile.

---

# 32. FOCUS MUST ALWAYS BE VISIBLE

Never write:

```css
outline:none;
```

without replacing it with a strong accessible focus indicator.

Use `:focus-visible`.

Focus indication must work in:

* light mode
* dark mode

---

# 33. DIALOG FOCUS MANAGEMENT

When opening a dialog:

1. remember triggering element,
2. move focus appropriately,
3. provide an accessible close control,
4. Escape must work,
5. restore focus after closing.

Do not leave keyboard focus behind the modal.

---

# 34. MOBILE DRAWER STATE MUST BE DETERMINISTIC

Drawer should have ONE state controller.

Prefer:

```js
function setMenuOpen(open) {
    ...
}
```

Instead of independent:

```js
openMenu()
closeMenu()
toggleMenu()
repairMenu()
```

State must synchronously update:

```text
CSS class
aria-hidden
aria-expanded
body scroll lock
focus
overlay
```

Closing the menu must always fully restore the page.

---

# 35. EVENT LISTENERS MUST NOT BE DUPLICATED

Before adding a listener, verify that the same element is not already bound.

Use event delegation for repeated dynamically generated items when practical.

Example:

```js
container.addEventListener('click', event => {
    const item = event.target.closest('[data-action]');
    if (!item) return;

    ...
});
```

This is preferable to adding hundreds of nearly identical listeners.

---

# 36. INITIALIZATION MUST RUN ONCE

Application initialization must be idempotent.

Never create an architecture where:

```js
init()
```

can accidentally bind duplicate listeners,
render duplicate components,
or execute entrance animations multiple times.

Where necessary use explicit initialization guards.

---

# 37. ROUTING MUST HAVE ONE RENDER PATH

Hash routing should flow through one clear pipeline:

```text
URL
↓
parseRoute()
↓
resolveRoute()
↓
render/show route
↓
update navigation
↓
update metadata
↓
reset correct scroll owner
↓
optional animation
```

Do not render a route once inside `navigate()`
and again from `hashchange`.

One navigation event should produce one render.

---

# 38. ROUTE DATA MUST BE EXPLICIT

Do not derive application logic by parsing presentation strings.

Bad:

```js
title.split('—')[0]
```

Good:

```js
const ROUTES = {
    experience: {
        label: 'Experience',
        title: 'Experience — Bhramar Raut',
        view: 'view-experience'
    }
};
```

Data should describe itself explicitly.

---

# 39. FUNCTIONS MUST DO ONE THING

Prefer:

```js
parseRoute()
showRoute()
updateNav()
updateMetadata()
resetScroll()
```

over one 150-line function performing all operations.

A function should normally have one reason to change.

---

# 40. FUNCTION NAMES MUST DESCRIBE INTENT

Good:

```js
renderCertifications()
setMenuOpen()
updateKnowledgeResults()
resetWorkspaceScroll()
openCertificateDialog()
```

Bad:

```js
doIt()
handleStuff()
process()
func2()
newFunction()
fixThing()
```

---

# 41. VARIABLE NAMES MUST BE SELF-DOCUMENTING

Prefer:

```js
activeKnowledgeCategory
certificateDialogLastFocus
workspaceScroller
visibleArticles
```

Avoid:

```js
x
foo
tmp
arr2
a1
thing
data2
```

except very small local contexts where obvious.

---

# 42. BOOLEAN NAMES SHOULD READ LIKE QUESTIONS

Use:

```js
isMobile
isOpen
hasResults
shouldAnimate
isActive
```

not:

```js
mobile
open
flag
check
```

where ambiguity exists.

---

# 43. USE EARLY RETURNS

Prefer:

```js
function renderSomething() {
    const root = $('#root');
    if (!root) return;

    ...
}
```

over deeply nested conditionals.

---

# 44. AVOID DEEP NESTING

If code looks like:

```js
if (...) {
    if (...) {
        if (...) {
            if (...) {
```

refactor.

Prefer:

* early returns
* helper functions
* data mapping

---

# 45. NEVER SILENTLY SWALLOW REAL ERRORS

Do not write:

```js
try {
   ...
} catch {}
```

for meaningful application logic.

Handle errors deliberately.

For optional browser features, graceful feature detection is preferred.

---

# 46. FEATURE DETECTION OVER USER-AGENT DETECTION

Prefer:

```js
if ('showModal' in HTMLDialogElement.prototype)
```

over detecting:

```text
Chrome
Firefox
Brave
Android
```

Build for browser capabilities.

---

# 47. PROGRESSIVE ENHANCEMENT

The site should remain understandable even if:

* GSAP fails
* icons fail
* JavaScript partially fails
* animations are disabled
* reduced motion is enabled

Critical content must not depend on animation.

Base CSS represents the final visible state.

---

# 48. ANIMATION MUST NEVER CONTROL VISIBILITY STATE

Never leave content permanently dependent on:

```css
opacity:0;
```

waiting for JavaScript.

Animations should temporarily animate FROM an initial state TO the naturally
visible CSS state.

Prefer:

```js
gsap.fromTo(
    element,
    { opacity:0, y:12 },
    {
        opacity:1,
        y:0,
        clearProps:'opacity,transform'
    }
);
```

After the animation the DOM should return to clean CSS-driven state.

---

# 49. KILL OLD TWEENS BEFORE REANIMATING

When rerendering/re-entering animated views:

```js
gsap.killTweensOf(targets);
```

before applying a new tween where necessary.

Never permit competing animations to fight over the same property.

---

# 50. MOBILE ANIMATION IS SECONDARY

On mobile:

reliability

>

animation

Large route/card entrance animation may be disabled on <=1023px.

Do not animate dozens of elements on a recruiter-facing mobile page.

---

# 51. RESPECT REDUCED MOTION

Always honor:

```css
@media (prefers-reduced-motion: reduce)
```

and equivalent JS:

```js
window.matchMedia(
    '(prefers-reduced-motion: reduce)'
).matches
```

---

# 52. PERFORMANCE RULE — DO LESS WORK

Before optimizing microseconds:

reduce unnecessary work.

Avoid:

* duplicate DOM queries
* duplicate listeners
* duplicate rendering
* duplicate network libraries
* rendering hidden huge lists
* reflow-heavy JS
* repeatedly rebuilding static content

---

# 53. CACHE REPEATED DOM REFERENCES WHEN USEFUL

If one function repeatedly accesses the same element:

Bad:

```js
$('#thing')
$('#thing')
$('#thing')
$('#thing')
```

Prefer:

```js
const thing = $('#thing');
if (!thing) return;
```

Do not over-cache globally.

Keep references near their usage.

---

# 54. USE DOCUMENT FRAGMENTS FOR LARGE DOM INSERTIONS

When generating many DOM nodes programmatically,
prefer building off-DOM first where it materially improves performance.

Do not trigger layout after every inserted item.

---

# 55. USE `textContent` FOR PLAIN USER-VISIBLE TEXT

Prefer:

```js
element.textContent = value;
```

instead of:

```js
element.innerHTML = value;
```

when HTML is not required.

This is safer and clearer.

---

# 56. ESCAPE DYNAMIC HTML

Whenever using template strings with dynamic HTML,
escape values that are not trusted static markup.

Keep/use one reusable helper such as:

```js
function escapeHtml(value) {
    ...
}
```

Do not create several escaping implementations.

---

# 57. DO NOT USE `innerHTML` FOR EVERYTHING

Use:

* semantic static HTML where possible
* `<template>`
* DOM APIs
* `textContent`

Use `innerHTML` where templated static application data makes it genuinely
simpler and remains safe.

---

# 58. EXTERNAL DEPENDENCIES MUST BE MINIMAL

Current philosophy:

HTML + CSS + Vanilla JavaScript

Permitted external frontend utilities when justified:

* GSAP
* Bootstrap Icons
* Google Fonts

Do not add another library when native browser APIs can solve the problem.

No jQuery.

No Bootstrap framework.

No React.

No Vue.

No Angular.

No Tailwind runtime.

No unnecessary UI kits.

---

# 59. EVERY DEPENDENCY MUST HAVE A PURPOSE

Before adding a CDN/library ask:

1. Is it already available?
2. Can native browser functionality do it cleanly?
3. Is the dependency worth the network cost?
4. Will failure break critical content?

If dependency failure breaks basic site readability,
architecture is wrong.

---

# 60. CSS NAMING MUST EXPRESS COMPONENT PURPOSE

Prefer:

```css
.hero-module
.experience-entry
.credential-card
.knowledge-row
.support-lab
.mobile-header
```

Avoid meaningless:

```css
.box1
.box2
.leftthing
.newcard
.test
.final-card
```

---

# 61. NO VERSION-NAMED CSS

Forbidden:

```css
/* final fixes */
/* phase 2 fixes */
/* new card fix */
/* temporary override */
/* latest mobile fixes */
```

Fix the canonical selector where it belongs.

Do not endlessly append patches at the bottom of the stylesheet.

---

# 62. NO CSS PATCH PILE

Before adding a new rule for an existing component:

SEARCH for that component's existing CSS.

Modify or consolidate the canonical rule.

Do not create:

```css
.card {...}

...

.card {...}

...

.card {...}
```

unless the later definitions are deliberate responsive/theme overrides.

---

# 63. `!important` IS EXCEPTIONAL

Do not use `!important` as normal conflict resolution.

Before using it:

1. inspect specificity,
2. inspect source order,
3. inspect architecture,
4. remove conflicting/dead rules.

Acceptable uses include limited:

* utility states
* print
* accessibility fallback
* emergency CSS fail-safe where justified

---

# 64. REMOVE DEAD CODE

Whenever architecture changes:

remove obsolete:

* CSS selectors
* event listeners
* functions
* variables
* comments
* markup
* animation targets

Do not leave abandoned implementations inside `index.html`.

Before deleting:
search references first.

---

# 65. COMMENTS EXPLAIN WHY, NOT WHAT

Bad:

```js
// Increment count
count++;
```

Good:

```js
// Reset visible results when the active filter changes so
// "Load more" never mixes states from a previous query.
knowledgeVisibleCount = 12;
```

Code should explain WHAT.

Comments should explain WHY.

---

# 66. NO COMMENTED-OUT DEAD CODE

Do not preserve:

```js
// oldFunction();
// const previousImplementation = ...
```

Git already provides history.

Delete dead code.

---

# 67. FORMATTING MUST BE HUMAN-READABLE

Do NOT minify `index.html`.

Avoid giant one-line CSS declarations.

Bad:

```css
.module{background:#fff;padding:20px;border-radius:20px;display:grid;gap:10px}
```

Preferred:

```css
.module {
    display: grid;
    gap: var(--space-3);
    padding: var(--space-5);
    background: var(--surface);
    border-radius: var(--radius-module);
}
```

This project values maintainability over saving a few kilobytes.

---

# 68. CONSISTENT INDENTATION

Use:

```text
2 spaces
```

or:

```text
4 spaces
```

consistently.

Do not mix tabs and spaces.

For this project prefer:

```text
2 spaces for HTML/CSS
2 spaces for JavaScript
```

unless the existing file is intentionally reformatted as a whole.

---

# 69. LINE LENGTH

Avoid extremely long source lines.

Break long:

* arrays
* function calls
* template strings
* selectors
* conditions

into readable forms.

Do not obsess over an exact 80-character limit.

Readability is the priority.

---

# 70. JS SECTION ORDER

JavaScript should remain ordered approximately:

```text
01 CONFIG
02 STATIC DATA
03 DOM UTILITIES
04 GENERIC UTILITIES
05 APP STATE
06 THEME
07 ROUTER
08 NAVIGATION
09 METADATA / SEO
10 HOME
11 EXPERIENCE
12 PROJECTS
13 CAPABILITIES
14 KNOWLEDGE
15 TOOLBOX
16 LEARNING
17 CERTIFICATIONS
18 SUPPORT LAB
19 COMMAND PALETTE
20 DIALOGS
21 CONTACT / VCARD
22 ANIMATIONS
23 ACCESSIBILITY
24 INITIALIZATION
```

Do not scatter related functions randomly.

---

# 71. CSS SECTION ORDER

CSS should remain ordered approximately:

```text
01 TOKENS
02 RESET
03 BASE
04 TYPOGRAPHY
05 ACCESSIBILITY
06 APP SHELL
07 DESKTOP NAVIGATION
08 TOPBAR
09 MOBILE HEADER / DRAWER
10 LAYOUT SYSTEM
11 SHARED COMPONENTS
12 HOME
13 EXPERIENCE
14 PROJECTS
15 CAPABILITIES
16 KNOWLEDGE
17 TOOLBOX
18 LEARNING
19 SUPPORT LAB
20 CERTIFICATIONS
21 RESEARCH
22 RECRUITER MODE
23 CONTACT
24 DIALOGS
25 ANIMATIONS
26 DARK THEME SPECIAL CASES
27 TABLET
28 PHONE
29 SMALL PHONE
30 PRINT
```

---

# 72. DON'T BUILD A FRAMEWORK INSIDE INDEX.HTML

We want architecture.

We do NOT want a home-grown React clone.

Avoid building:

* virtual DOM
* giant component inheritance system
* custom state framework
* custom CSS framework
* dependency injection system

Use boring, strong browser-native patterns.

---

# 73. NO COPY-PASTE COMPONENTS

If the same component appears 3+ times,
investigate whether it should become:

* shared CSS
* data + renderer
* `<template>`
* utility
* event delegation

Not every repeated paragraph requires abstraction,
but repeated UI structures usually do.

---

# 74. PREFER COMPOSITION OVER SPECIAL CASES

Instead of:

```css
.card-a
.card-b
.card-c
.card-d
```

prefer:

```html
<article class="module module-light">
```

or:

```html
<article class="module module-dark">
```

Reusable primitives should compose.

---

# 75. DESIGN SYSTEM PRIMITIVES

Maintain reusable primitives for:

```text
module
surface
button
icon button
pill
status
label
page header
section header
dialog
form field
chip
list row
metric
content grid
```

Page components should compose primitives rather than reinventing them.

---

# 76. BUT AVOID "CARD EVERYTHING"

Not every piece of information belongs in a rounded rectangle.

Use:

* whitespace
* typography
* separators
* lists
* timelines
* editorial layouts
* matrices
* process tracks
* tables
* rows

to create hierarchy.

A senior interface does not solve every problem with another card.

---

# 77. CONTENT MUST REMAIN FACTUALLY DEFENSIBLE

Never fabricate:

* work responsibilities
* production ownership
* ticket volume
* client ownership
* revenue impact
* performance percentages
* user counts
* team sizes
* SLA numbers
* project metrics
* promotions
* awards
* certifications
* active certification status
* testimonials
* salary
* offers

If information is uncertain:
use conservative wording.

Credibility is more important than impressive wording.

---

# 78. DO NOT VISUALIZE FAKE NUMBERS

Never create decorative graphs whose lengths imply measured values.

Forbidden:

```text
SQL 85%
Communication 92%
Catalyx 90%
Career progress 85%
```

unless there is a real defensible measurement.

Conceptual relationships should use:

* equal cells
* diagrams
* flow arrows
* matrices
* process stages

not fake percentages.

---

# 79. SKILLS NEED TRUTH LABELS

Maintain distinction between:

```text
Hands-on
Used
Working Knowledge
Foundation
Refreshing
Learning
Awareness
```

Do not visually imply all listed tools are professional-level skills.

---

# 80. CREDENTIAL LANGUAGE MUST BE PRECISE

Differentiate:

```text
Professional certification
Course completion
Training certificate
Previous/expired certification
Learning credential
```

Example:

AWS Cloud Practitioner:

```text
Earned 2023
Expired Apr 2026
```

Never imply it is currently active if expired.

---

# 81. RECRUITER-FIRST INFORMATION ARCHITECTURE

Every page should answer:

> Why should someone care?

before:

> How fancy is the UI?

Home should quickly communicate:

```text
Who?
What roles?
Prior enterprise background?
Proof?
What can he do?
Availability?
How to contact?
```

Do not bury these under decorative content.

---

# 82. SIX-SECOND HOME TEST

At normal desktop and mobile viewport,
within approximately six seconds a recruiter should understand:

```text
Bhramar Raut

Product Support
Application Support
Implementation

Former Wipro Project Engineer
PSM I

Immediate joiner

Project evidence available
```

If not, Home hierarchy needs work.

---

# 83. SEO — DO NOT KEYWORD STUFF

Search optimization comes from:

* semantic HTML
* descriptive headings
* useful content
* correct metadata
* structured data
* real evidence
* clear relationships
* accessible text

Never insert invisible keyword blocks.

Never repeat phrases unnaturally.

Never fabricate organizations/names merely for search ranking.

---

# 84. HASH ROUTING SEO LIMITATION

This is one `index.html`.

Hash routes like:

```text
#/knowledge/article
```

are not equivalent to separate crawlable HTML pages.

Do not claim otherwise.

Within the one-file constraint:

* include important semantic content in initial HTML
* maintain structured data
* maintain accurate metadata
* maintain useful visible text

Do not promise guaranteed ranking.

---

# 85. SEO METADATA MUST HAVE ONE OWNER

Route metadata should be driven by route/article data.

Do not manually maintain disconnected:

```text
document.title
description
OG title
OG description
Twitter title
Twitter description
```

Implement one metadata updater.

Example architecture:

```js
function updatePageMetadata(meta) {
    ...
}
```

---

# 86. CHARACTER ENCODING MUST REMAIN UTF-8

File encoding:

```text
UTF-8
```

must never change.

There must be ZERO:

```text
 
```

replacement characters.

Use HTML entities or Unicode escapes when useful for punctuation:

```text
&mdash;
&ndash;
&middot;
&rarr;
&hellip;
```

JavaScript equivalents:

```js
'\u2014'
'\u2013'
'\u00B7'
'\u2192'
'\u2026'
```

---

# 87. NEVER BLIND-REPLACE CORRUPTED CHARACTERS

Do not assume every:

```text
 
```

means:

```text
—
```

Recover intended punctuation from surrounding meaning or Git history.

---

# 88. IMAGE RULES

All locally stored images must live in:

```text
Profile Pic/
```

unless Bhramar explicitly approves another image folder.

Do not create:

```text
assets/images/
img/
images/
```

If a purely decorative visual can be generated with:

* CSS
* inline SVG
* existing icon library

prefer that over another image file.

---

# 89. SVG RULE

When custom simple graphics are required,
inline SVG is allowed INSIDE `index.html`.

Do not create standalone `.svg` files unless explicitly permitted.

SVG must be:

* accessible where meaningful
* `aria-hidden="true"` where decorative
* responsive
* minimal

---

# 90. PDF RULE

Certificate/research PDFs must remain in the approved PDF folder.

Do not duplicate a PDF to create alternate filenames.

One credential should map to one canonical file whenever possible.

PDFs load on demand.

Do not embed all PDFs during initial load.

---

# 91. IMAGE LOADING

Critical hero/profile image:

```html
loading="eager"
fetchpriority="high"
```

where appropriate.

Noncritical images:

```html
loading="lazy"
```

Do not lazy-load the primary first-screen portrait if it damages LCP.

---

# 92. LINKS

External links should normally use:

```html
target="_blank"
rel="noopener noreferrer"
```

where opening in a new tab is intentional.

Email:

```text
mailto:
```

Phone:

```text
tel:
```

Never create fake placeholder links.

---

# 93. BROKEN LINKS ARE RELEASE BLOCKERS

Before finishing:

verify every:

* internal hash route
* LinkedIn URL
* GitHub URL
* email link
* phone link
* certificate PDF
* research URL
* project URL if present

A clickable element that leads nowhere damages credibility.

---

# 94. COMMAND PALETTE MUST DERIVE FROM REAL DATA

Command palette should derive:

* routes
* projects
* articles
* credentials where useful

from canonical data.

Do not manually maintain a second independent command list.

---

# 95. SEARCH MUST NOT DESTROY STATE

Search/filter systems must preserve deliberate UI state.

For Knowledge:

```text
active category
search string
visible count
```

must behave predictably.

"Load more" must not reset category/search.

---

# 96. RENDER FUNCTIONS MUST BE DETERMINISTIC

Given the same:

```text
data
+
state
```

a render function should produce the same output.

Avoid hidden mutations inside renderer functions.

---

# 97. DO NOT MIX RENDERING WITH DATA CREATION

Bad:

```js
function renderTools() {
    TOOLBOX.push(...);
    ...
}
```

Rendering must not mutate canonical datasets.

---

# 98. COMPONENT FUNCTIONS SHOULD RETURN ONE CONCEPT

Good:

```js
renderToolRow(tool)
renderCredentialCard(cert)
renderKnowledgeRow(article)
```

Then:

```js
renderToolbox()
```

may compose them.

---

# 99. USE HELPER FUNCTIONS FOR REPEATED DOM OPERATIONS

Maintain concise utilities where useful:

```js
const $ = (selector, root = document) =>
    root.querySelector(selector);

const $$ = (selector, root = document) =>
    [...root.querySelectorAll(selector)];
```

Do not reinvent DOM querying repeatedly.

---

# 100. `$` AND `$$` HAVE DIFFERENT CONTRACTS

`$()`:

```text
one element or null
```

`$$()`:

```text
array of elements
```

Never use:

```js
$('#something').length
```

expecting multiple nodes.

Use:

```js
$$('.something')
```

---

# 101. NULL-SAFE DOM ACCESS

Dynamic routes may not contain every element.

Use reasonable guards:

```js
const element = $('#thing');
if (!element) return;
```

Do not let optional components cause global runtime failures.

---

# 102. DO NOT HIDE REAL PROGRAMMING ERRORS WITH OPTIONAL CHAINING

This is bad when an element MUST exist:

```js
$('#critical-button')?.addEventListener(...)
```

because a missing required element silently fails.

For required components:

```js
const button = $('#critical-button');

if (!button) {
    console.error('Critical button missing');
    return;
}
```

Use optional chaining only when absence is genuinely valid.

---

# 103. CONSOLE MUST BE CLEAN

Production site should have:

```text
zero uncaught exceptions
zero GSAP invalid targets
zero missing asset 404s under our control
zero duplicate-ID errors
zero debug logs
zero temporary warnings
```

Intentional third-party browser/CDN warnings may be unavoidable,
but our application should remain clean.

---

# 104. NO `console.log` IN FINAL PRODUCTION

Temporary debugging is allowed.

Remove debug logging before completion.

Use console errors/warnings only for meaningful exceptional conditions.

---

# 105. NO `alert()`

Do not use native blocking:

```js
alert()
confirm()
prompt()
```

for normal UX.

Use existing toast/dialog systems if interaction is needed.

---

# 106. LOCAL STORAGE SHOULD BE MINIMAL

Only persist genuine user preference where useful.

Example:

```text
theme
```

Do not persist transient:

```text
route
search
open modal
menu state
animation state
```

without a strong reason.

---

# 107. THEME MUST USE TOKENS

Components should not contain unnecessary explicit light/dark colors.

Bad:

```css
.card {
    background:white;
}
```

Prefer:

```css
.card {
    background:var(--surface);
}
```

Dark mode should primarily work by changing tokens.

---

# 108. DARK MODE IS NOT COLOR INVERSION

Audit:

* contrast
* surfaces
* muted text
* charts
* dialogs
* inputs
* chips
* dark feature modules

Do not blindly invert colors.

---

# 109. SYSTEM/AUTO THEME

`auto` must track system preference.

Theme architecture should support exactly:

```text
auto
light
dark
```

unless explicitly changed.

Do not create duplicate theme state.

---

# 110. FORMS

Every input needs a label.

Placeholder text is NOT a label.

Use:

```html
<label for="...">
```

where applicable.

Form fields must remain keyboard accessible.

---

# 111. OUTPUTS NEED APPROPRIATE LIVE REGIONS

For dynamically generated status/result text,
use:

```html
aria-live="polite"
```

when useful.

Do not make the whole site an aggressive live region.

---

# 112. TABLES ARE FOR TABULAR DATA

If data is naturally rows/columns,
a semantic table may be better than building a fake grid of divs.

Do not avoid `<table>` merely because cards feel modern.

---

# 113. NO FAKE DASHBOARD

Portfolio visual language may resemble premium SaaS interfaces.

But content is NOT imaginary analytics.

Do not add:

* fake charts
* fake notifications
* fake dashboards
* fake user growth
* fake performance

Design serves information.

---

# 114. CSS TRANSITIONS

Transition only properties intentionally.

Avoid:

```css
transition: all .3s;
```

Prefer:

```css
transition:
    transform var(--dur-fast) var(--ease-out),
    background-color var(--dur-fast);
```

This avoids unexpected expensive transitions.

---

# 115. ANIMATE COMPOSITOR-FRIENDLY PROPERTIES

Prefer:

```text
transform
opacity
```

Avoid frequent animation of:

```text
width
height
top
left
margin
padding
```

when possible.

---

# 116. HOVER MUST NOT BE REQUIRED

Anything important must work without hover.

Phone users have no hover.

Hover is enhancement.

---

# 117. CONTENT ORDER MUST MATCH DOM ORDER

Do not use CSS positioning to display content in a radically different order
than the DOM.

Screen readers and keyboard users should experience the same logical flow.

---

# 118. RESPONSIVE CONTENT SHOULD NOT DUPLICATE

Avoid maintaining:

```text
desktop version of content
mobile version of same content
```

in separate markup.

Use one semantic source and adapt layout through CSS.

---

# 119. TEST WITH LONGER CONTENT

Do not assume every title remains short.

Components must survive:

* long certification names
* long article titles
* long company names
* wrapping job titles
* 200% browser zoom

No clipped text.

---

# 120. NO FIXED HEIGHT FOR TEXT CONTENT

Avoid:

```css
height:120px;
```

for text cards unless overflow behavior is intentionally designed.

Prefer:

```css
min-height
```

or natural height.

---

# 121. MODALS MUST FIT MOBILE

Dialogs must never exceed:

```text
100vw
100dvh
```

On small phones they may become fullscreen.

Content must remain reachable.

---

# 122. PDF VIEWER FALLBACK

Embedded PDF viewer must always include a clear fallback:

```text
Open certificate PDF
```

because mobile browsers may not render embedded PDFs consistently.

---

# 123. PRINT MODE IS A REAL OUTPUT

Recruiter Mode must print cleanly.

Print CSS should remove:

* navigation
* topbar
* decorative backgrounds
* unnecessary UI
* interactive-only controls

and retain:

* name
* target roles
* experience
* project proof
* credentials
* contact information
* URLs where useful

---

# 124. NO CONTENT-SPECIFIC PRINT HACKS WITHOUT TESTING

Do not force fixed page heights.

Test real print preview.

Avoid clipping between pages.

Use:

```css
break-inside: avoid;
```

where appropriate.

---

# 125. SECURITY BASICS

External links:

```html
rel="noopener noreferrer"
```

Escape dynamic text.

Do not embed secrets.

Never place:

* API keys
* passwords
* private tokens
* credentials
* private email passwords
* analytics secrets

inside `index.html`.

Everything in this repository is PUBLIC.

---

# 126. NEVER COMMIT SECRETS

Before every commit,
mentally treat the repository as public internet content.

There is no backend.

Anything in HTML/JS can be read by anyone.

---

# 127. NO TRACKING WITHOUT EXPLICIT PERMISSION

Do not introduce:

* Google Analytics
* Meta Pixel
* Hotjar
* tracking pixels
* session replay
* telemetry

without explicit approval.

---

# 128. EXTERNAL RESEARCH

If editing content that depends on current facts:

verify from authoritative sources when tools permit.

For technical claims:
prefer official documentation.

Do not copy long copyrighted text.

Summarize in original wording.

---

# 129. DO NOT MODIFY PERSONAL FACTS CASUALLY

Before changing:

* employment dates
* salary
* credentials
* education
* company
* role titles
* project scope
* locations

ensure the change is explicitly supported.

Do not "improve" facts for marketing.

---

# 130. GIT DISCIPLINE

Before editing:

```text
inspect current code
understand architecture
search existing implementations
identify root cause
```

Do not blindly patch.

After editing:

```text
review diff
test affected routes
test responsive behavior
test console
```

Commit should describe the real change.

Examples:

```text
Fix mobile navigation and responsive layout
Refactor certification rendering to shared data source
Harden route rendering and scroll behavior
```

Avoid:

```text
Update
Fix stuff
Final
Final final
```

---

# 131. NEVER CREATE BACKUP FILES

Do NOT create:

```text
index-copy.html
index-old.html
index-backup.html
index-before-fix.html
```

Git is the backup system.

Use:

```text
git diff
git log
git checkout
git restore
```

instead.

---

# 132. EDIT THE EXISTING FILE

When asked to fix the site:

EDIT:

```text
index.html
```

Do not produce a separate alternate implementation.

---

# 133. BEFORE ADDING CODE, SEARCH FIRST

Mandatory workflow:

```text
1. Search for relevant selector/function/component.
2. Understand existing implementation.
3. Determine root cause.
4. Modify canonical implementation.
5. Remove obsolete implementation.
6. Test.
```

Never:

```text
see bug
→ append random override
```

---

# 134. ROOT CAUSE OVER PATCH

Example:

If mobile content is transparent because GSAP runs twice:

WRONG:

```css
opacity:1!important;
```

as the only fix.

RIGHT:

```text
fix duplicate animation execution
+
add safe CSS final state
```

Fallbacks are fine.

Root-cause repair is mandatory.

---

# 135. CHANGE THE SMALLEST CORRECT SURFACE

Do not rewrite 700 lines when a properly understood 20-line change solves it.

But do not avoid a necessary architectural refactor simply because it is larger.

Choose the smallest CORRECT change.

---

# 136. DO NOT REWRITE WORKING SYSTEMS FOR STYLE

If:

* routing works
* theme works
* certificate modal works

and the requested change concerns Toolbox,

do not rewrite routing/theme/certificates without a justified reason.

Minimize regression surface.

---

# 137. REGRESSION TESTING IS MANDATORY

After modifying one system,
test neighboring systems that could be affected.

Changing responsive CSS requires checking:

* Home
* Projects
* Knowledge
* Support Lab
* dialogs
* navigation

not only the component edited.

---

# 138. REQUIRED VIEWPORT QA

At minimum test:

```text
320 × 568
360 × 800
390 × 844
430 × 932
768 × 1024
1023 × 768
1024 × 768
1366 × 768
1440 × 900
1920 × 1080
```

Also test breakpoint edges when responsive code changes.

---

# 139. REQUIRED ROUTE QA

Test:

```text
#/home
#/profile
#/experience
#/projects
#/projects/skillverse
#/projects/catalyx
#/capabilities
#/knowledge
#/toolbox
#/learning
#/support-lab
#/certifications
#/research
#/recruiter
#/contact
```

and:

```text
at least one knowledge article
invalid route
Back
Forward
refresh on deep route
```

---

# 140. REQUIRED INTERACTION QA

Test:

```text
desktop navigation
mobile drawer
theme switching
command palette
knowledge search
knowledge filters
load more
project links
certificate viewer
certificate close
Support Lab tabs
Support Lab controls
contact actions
print recruiter mode
```

---

# 141. REQUIRED MOBILE MENU QA

Perform:

```text
Open
Close via X
Open
Close via overlay
Open
Navigate
Back
Forward
Resize
Rotate
Return from browser history
```

After closing:

```text
drawer class = closed
overlay class = closed
aria-hidden = true
aria-expanded = false
body scroll unlocked
```

---

# 142. REQUIRED ACCESSIBILITY QA

Keyboard:

```text
Tab
Shift+Tab
Enter
Space
Escape
Arrow keys where component semantics require them
```

Verify:

```text
focus visible
menu reachable
dialogs reachable
tabs reachable
buttons correctly labelled
```

---

# 143. REQUIRED THEME QA

Verify:

```text
Light
Dark
Auto + system light
Auto + system dark
```

on:

```text
Home
Projects
Knowledge
Support Lab
Certificates
dialogs
```

---

# 144. REQUIRED CONSOLE QA

Release requires:

```text
0 uncaught exceptions
0 syntax errors
0 invalid selector errors
0 duplicate dialog errors
0 application-created 404s
0 GSAP invalid-target errors
```

---

# 145. REQUIRED ENCODING QA

Search whole `index.html` for:

```text
 
```

Count must equal:

```text
0
```

Also inspect punctuation in:

```text
title
description
OG metadata
Twitter metadata
structured data
Home
projects
credentials
articles
Support Lab
```

---

# 146. REQUIRED HTML QA

Check:

* duplicate IDs
* malformed nesting
* missing labels
* missing alt text
* missing button `type`
* broken heading hierarchy
* empty links
* invalid dialog relationships

No duplicate ID is acceptable.

---

# 147. REQUIRED PERFORMANCE QA

Verify:

* critical portrait loads efficiently
* PDFs are lazy/on-demand
* no duplicate CDN loads
* no duplicate libraries
* no huge hidden DOM unnecessarily rendered
* no repeated render loops
* no accidental repeated GSAP initialization

---

# 148. QUALITY GATE — NO TODO LEFT BEHIND

Do not finish with:

```text
TODO
FIXME
TEMP
HACK
later
```

inside production source unless explicitly intentional/documented.

Solve it or report the limitation.

---

# 149. QUALITY GATE — NO FAKE "DONE"

Never claim:

```text
Fixed
Tested
Complete
Production ready
```

unless actually validated.

If something cannot be tested:

say:

```text
Not verified in real browser environment.
```

Accuracy over confidence.

---

# 150. QUALITY GATE — FINAL CODE SHOULD LOOK INTENTIONAL

A senior engineer reviewing `index.html` should be able to answer:

```text
Where is configuration?
Where is data?
Where is state?
Where is routing?
Where are components?
Where is responsive CSS?
Where is mobile navigation?
Where is Knowledge rendering?
Where is certificate logic?
Where are animations initialized?
```

within minutes.

If finding these requires random searching through thousands of unrelated lines,
organization must improve.

---

# 151. PRINCIPAL-ENGINEER SIMPLICITY RULE

Prefer boring, obvious, robust code over impressive-looking abstraction.

The goal is not:

> "Look how clever this implementation is."

The goal is:

> "This implementation is so clear that another senior engineer
> immediately understands it."

---

# 152. THREE-STRIKES ABSTRACTION RULE

When the same structural pattern appears:

1st time:
implement clearly.

2nd time:
notice repetition.

3rd time:
strongly consider extracting a shared abstraction.

Do not copy-paste the fourth implementation.

---

# 153. ONE CONCEPT, ONE IMPLEMENTATION

There should ideally be one authoritative implementation for:

```text
navigation
theme
dialogs
buttons
status pills
page header
route handling
social links
credentials
tool listing
knowledge listing
scroll reset
animation entry
```

Do not maintain parallel competing systems.

---

# 154. CSS SHOULD BE COMPOSITIONAL

Example:

```html
<section class="module module-dark project-feature">
```

rather than inventing an entirely isolated visual system for every page.

Shared visual behavior belongs in primitives.

Unique page behavior belongs in page/component classes.

---

# 155. DO NOT CREATE A UNIVERSAL `.card`

A single `.card` class used for everything often produces generic UI.

Prefer meaningful components:

```text
project-spread
credential-row
knowledge-row
experience-entry
tool-shelf
capability-system
```

They may share lower-level surface tokens.

---

# 156. THE WEBSITE IS A PRODUCT, NOT A RESUME DUMP

Every component must have:

* purpose
* hierarchy
* evidence
* readable flow

Do not add content merely because there is empty space.

Intentional whitespace is better than filler.

---

# 157. DESKTOP EXPERIENCE

Desktop >=1024px should preserve the approved application concept:

```text
lime outer canvas
charcoal sidebar
warm-gray workspace
topbar
rounded application shell
internal workspace scroll
```

Do not casually redesign this system.

---

# 158. MOBILE EXPERIENCE

Mobile should feel like a native responsive portfolio:

```text
charcoal sticky header
drawer navigation
single-column content
normal browser scroll
compact modules
large touch controls
```

Do not preserve desktop framing when it damages phone usability.

---

# 159. DESIGN TOKENS ARE THE API OF THE DESIGN SYSTEM

When changing:

```text
accent
radius
spacing
surface
text
animation duration
```

modify tokens whenever the change is globally intended.

Do not manually edit twenty selectors.

---

# 160. CONTENT WIDTH

Long text should use readable line lengths.

Use concepts such as:

```css
max-width:72ch;
```

for article text.

Do not stretch paragraphs 1500px across desktop monitors.

---

# 161. IMAGES MUST NEVER DISTORT

Use:

```css
object-fit:cover;
```

or:

```css
object-fit:contain;
```

appropriately.

Never alter aspect ratio unintentionally.

---

# 162. CLS / LAYOUT SHIFT

Provide image:

```text
width
height
aspect-ratio
```

where practical.

Avoid large layout shifts after page load.

---

# 163. NO AUTO-PLAY AUDIO

Do not introduce background music or sound that automatically plays.

If audio is ever added:

* explicit user action
* visible controls
* muted/paused default
* accessible

Recruiter portfolio must never surprise the user with audio.

---

# 164. NO DARK PATTERNS

Do not:

* trap users
* auto-download files
* force external tabs unnecessarily
* fake notifications
* create misleading urgency
* disable browser behavior
* hijack scrolling

---

# 165. BROWSER BEHAVIOR SHOULD REMAIN NATIVE

Avoid interfering with:

```text
Back
Forward
Refresh
Open in new tab
Copy link
Text selection
Zoom
Find in page
Print
```

unless the application genuinely requires it.

---

# 166. DON'T DISABLE ZOOM

Never include:

```html
user-scalable=no
maximum-scale=1
```

The viewport should remain:

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0">
```

---

# 167. SEO TEXT MUST BE HUMAN-READABLE

Do not create giant hidden text blocks solely for indexing.

Anything written for search engines should also make sense to a human visitor.

---

# 168. INLINE STRUCTURED DATA

Because extra JSON files are forbidden,
JSON-LD may remain inline in `<head>`.

It must stay:

* valid JSON
* factual
* synchronized with visible information

---

# 169. NO FAKE SCHEMA

Never add:

```text
Review
AggregateRating
Award
EmployerReview
Offer
Salary
```

unless truthful source data exists.

Schema markup does not justify inventing data.

---

# 170. ARTICLE ARCHITECTURE

Knowledge articles should live in ONE canonical `ARTICLES` dataset.

Each article object should contain fields such as:

```js
{
    slug,
    title,
    category,
    type,
    summary,
    minutes,
    keywords,
    sections
}
```

Do not maintain one article title in:

```text
card HTML
article body HTML
command palette
SEO data
```

independently.

Derive wherever practical.

---

# 171. PROJECT ARCHITECTURE

Projects should have canonical data where practical.

Example:

```js
const PROJECTS = {
    skillverse: {
        ...
    },

    catalyx: {
        ...
    }
};
```

Use source values for:

* project index
* project cards
* command palette
* metrics
* case study headings

Avoid conflicting copies.

---

# 172. CERTIFICATION ARCHITECTURE

One canonical certificate object should provide:

```text
name
issuer
year
status
file
credential type
description
```

The homepage preview and Certifications route should derive from the same data.

---

# 173. SOCIAL LINK ARCHITECTURE

Define social links once.

Example:

```js
const SOCIAL_LINKS = [
    {
        key: 'linkedin',
        label: 'LinkedIn',
        url: CONFIG.linkedin,
        icon: 'bi-linkedin'
    },
    ...
];
```

Reuse for:

* header
* footer
* contact
* recruiter view

where practical.

---

# 174. DO NOT DUPLICATE PERSONAL CONTACT DATA

Phone/email/location must have one canonical value.

Do not manually update several page copies.

If visible static SEO markup requires duplication,
add a clear comment noting canonical source and verify synchronization.

---

# 175. SEO VS DRY EXCEPTION

Pure DRY is not more important than semantic/static accessibility.

Some critical human-readable content may intentionally exist in initial HTML
instead of being rendered only by JavaScript.

When static duplication is necessary for:

* SEO
* no-JS fallback
* structured data

document why.

Do not sacrifice discoverability merely to eliminate every duplicate string.

---

# 176. NO-JS FALLBACK

Critical portfolio information should remain available without JavaScript
where reasonably practical.

At minimum:

* identity
* target role
* major experience
* project evidence
* credentials
* contact
* knowledge content

must not completely disappear.

---

# 177. BUILD FOR FAILURE

Assume one day:

```text
GSAP CDN fails
Google Fonts fails
Bootstrap Icons fails
PDF embed fails
localStorage unavailable
```

The site should still remain understandable and usable.

Enhancement failure must not equal site failure.

---

# 178. FONT FALLBACK

Every custom font declaration needs good system fallback.

Example:

```css
font-family:
    'Inter',
    system-ui,
    -apple-system,
    'Segoe UI',
    sans-serif;
```

---

# 179. ICONS MUST NOT CARRY MEANING ALONE

Icon-only buttons need:

```html
aria-label
```

Decorative icons use:

```html
aria-hidden="true"
```

---

# 180. DON'T BUILD WITH SCREENSHOTS

If a design can be implemented in HTML/CSS,
do not use screenshots to fake interface sections.

UI must remain:

* responsive
* accessible
* selectable
* semantic

---

# 181. NO CANVAS FOR NORMAL UI

Do not use `<canvas>` for:

* cards
* typography
* timelines
* common diagrams

unless a genuine visualization requires it.

Prefer semantic HTML/CSS/SVG.

---

# 182. USE INLINE SVG FOR CUSTOM DIAGRAMS

For conceptual diagrams,
inline SVG may be appropriate.

Keep it:

* simple
* responsive
* accessible
* data-honest

No fake quantitative axes.

---

# 183. NO FRAMEWORK-LIKE CLASS SOUP

Avoid enormous utility-class strings.

This is not Tailwind.

Prefer semantic class names:

```html
<section class="project-spread project-spread--skillverse">
```

over:

```html
<div class="flex mt-4 p-6 rounded-3xl ...">
```

---

# 184. SPECIFICITY SHOULD REMAIN LOW

Prefer simple selectors:

```css
.project-spread h2
```

Avoid:

```css
body .app-shell .workspace main section.view
.project-container .project-card > div h2
```

Do not create specificity wars.

---

# 185. DO NOT STYLE BY ID EXCEPT WHEN JUSTIFIED

IDs are primarily for:

* unique anchors
* JS hooks
* accessibility relationships

Use classes for reusable styling.

---

# 186. DATA ATTRIBUTES ARE FOR BEHAVIOR/STATE

Use:

```text
data-route
data-action
data-filter
data-project
data-cert-id
```

for JavaScript behavior.

Avoid coupling JS to arbitrary visual classes when a semantic data hook is cleaner.

---

# 187. JS SHOULD PREFER DATA HOOKS

Better:

```js
event.target.closest('[data-action="open-cert"]')
```

than:

```js
event.target.closest('.purple-rounded-card')
```

Behavior should not break because design class names change.

---

# 188. CSS SHOULD NOT DEPEND ON JS-SPECIFIC IDS

Keep style and behavior responsibilities separated when practical.

---

# 189. STATUS CLASSES MUST BE SEMANTIC

Use:

```text
status-valid
status-expired
status-learning
status-foundation
```

not:

```text
green
yellow
purple
```

Meaning survives theme changes.

---

# 190. ACCESSIBLE COLOR

Never rely on color alone to communicate:

```text
valid
expired
learning
active
error
```

Also provide:

* label
* text
* icon
* pattern

as appropriate.

---

# 191. MODALS MUST NOT CAUSE BACKGROUND INTERACTION

While dialog/drawer is open:

background interaction must be appropriately blocked.

When closed:
the blocking state must be fully removed.

No stuck dim overlay.

---

# 192. ONE OVERLAY SYSTEM AT A TIME

Opening:

* certificate dialog
* command palette

should close the mobile drawer first if open.

Avoid stacked uncontrolled overlays.

---

# 193. NEVER USE Z-INDEX RANDOMLY

Maintain intentional layers using tokens:

```text
content
sticky header
overlay
drawer
dialog
toast
```

Do not solve overlap bugs by adding:

```css
z-index:999999999;
```

---

# 194. COMPONENTS MUST HANDLE EMPTY STATES

Examples:

Knowledge:

```text
No matching notes.
Clear search
```

Support Lab:

```text
Select or use default scenario
```

Certificates:

reasonable fallback if file unavailable.

Never leave a blank box without explanation.

---

# 195. COMPONENTS MUST HANDLE LOADING FAILURE

Especially:

* images
* PDFs
* external libraries

Provide graceful fallback.

---

# 196. NEVER PLACE CRITICAL INFORMATION ONLY IN TOOLTIP

Mobile users may never see hover tooltip.

Tooltips are supplementary only.

---

# 197. COPY SHOULD BE CONCISE

UI labels should be short.

Long explanation belongs in:

* article
* case study
* evidence section

not buttons or navigation.

---

# 198. BUTTON LABELS SHOULD DESCRIBE ACTION

Good:

```text
View project
Open credential
Copy email
Recruiter view
```

Bad:

```text
Click here
More
Go
Button
```

---

# 199. EMPTY VISUAL SPACE IS NOT A BUG BY ITSELF

Do not add filler content simply to occupy the viewport.

Whitespace is acceptable when hierarchy is intentional.

Fix accidental empty space caused by broken layout,
not intentional breathing room.

---

# 200. FINAL ENGINEERING PRINCIPLE

For every change ask:

```text
Can this be simpler?

Can this reuse something?

Is there already a source of truth?

Will this work on mobile?

Will this work without animation?

Will this remain accessible?

Can another engineer understand it?

Can the recruiter understand it?

Am I fixing the root cause?

Am I creating future maintenance debt?

Am I making an unsupported claim?
```

If the answer exposes a problem:

fix the design before committing the implementation.

---

# 201. MANDATORY AGENT WORKFLOW

Every AI coding task must follow this order:

```text
UNDERSTAND
↓
INSPECT
↓
SEARCH EXISTING CODE
↓
IDENTIFY ROOT CAUSE
↓
DESIGN MINIMAL CORRECT SOLUTION
↓
REUSE EXISTING SYSTEMS
↓
IMPLEMENT
↓
REMOVE OBSOLETE CODE
↓
TEST
↓
CHECK RESPONSIVE
↓
CHECK ACCESSIBILITY
↓
CHECK CONSOLE
↓
CHECK REGRESSIONS
↓
REPORT
```

Never use:

```text
PROMPT
↓
WRITE RANDOM CODE
↓
HOPE
```

---

# 202. BEFORE WRITING A NEW FUNCTION

The agent MUST search for:

```text
same function purpose
same component
same state
same utility
same DOM operation
```

If equivalent functionality already exists:

extend or reuse it.

Do not duplicate it.

---

# 203. BEFORE WRITING NEW CSS

The agent MUST search:

```text
same component selector
parent component
existing breakpoint
existing design token
existing state class
```

Modify the canonical implementation.

Do not append arbitrary override blocks.

---

# 204. BEFORE ADDING NEW MARKUP

The agent MUST ask:

```text
Is this reusable?
Should it come from data?
Does a native semantic element exist?
Does the same information already exist elsewhere?
Can the existing component be composed?
```

---

# 205. BEFORE ADDING A NEW FILE

STOP.

The answer is NO unless Bhramar explicitly authorizes it.

Production architecture remains:

```text
index.html
+
existing photos
+
existing PDFs
+
.gitignore
```

---

# 206. FINAL REPOSITORY AUDIT

Before declaring release-ready,
run/check repository contents.

Expected production structure:

```text
.git/
.gitignore
index.html
Profile Pic/
Certification/
```

Local development may additionally contain:

```text
rules.md
```

but `rules.md` must be ignored and not pushed.

If any unapproved file exists:

remove it before release.

---

# 207. ABSOLUTE FINAL RULE

Never trade engineering quality for AI-generated speed.

Never trade truth for impressive wording.

Never trade maintainability for clever code.

Never trade mobile usability for desktop decoration.

Never trade accessibility for animation.

Never create a second implementation when one reusable implementation
can correctly serve the system.

Build the portfolio as if another senior engineer will review every line
and a recruiter will judge Bhramar Raut from the result.

Because both should be able to.

````

### One addition to `.gitignore`

Since the rule file itself should guide Cursor but **not appear on GitHub**, add this near the bottom of your `.gitignore`:

```gitignore
# Local AI / engineering instructions
rules.md
.cursor/
.vscode/
````

Then your **local working directory** can contain `rules.md`, while your **public GitHub repository** stays effectively:

```text
bhramarraut.github.io/
├── .gitignore
├── index.html
├── Profile Pic/
└── Certification/
```

This also establishes the coding philosophy you were asking about: **one source of truth → data-driven components → reusable renderers/templates → centralized state → shared CSS primitives → event delegation → semantic HTML**, instead of copying the same HTML/CSS/JS again and again.
