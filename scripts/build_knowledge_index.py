#!/usr/bin/env python3
"""
Build knowledge-index.json from knowledge/*.md (Obsidian-compatible vault).

Usage:
  python scripts/build_knowledge_index.py

Outputs:
  knowledge-index.json  — catalog + rendered HTML for the portfolio UI
"""

from __future__ import annotations

import hashlib
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
KNOWLEDGE_DIR = ROOT / "knowledge"
OUT_PATH = ROOT / "knowledge-index.json"

# Prefer PyYAML + markdown when available; fall back to minimal parsers.
try:
    import yaml  # type: ignore
except ImportError:  # pragma: no cover
    yaml = None

try:
    import markdown as md_lib  # type: ignore
except ImportError:  # pragma: no cover
    md_lib = None


FRONTMATTER_RE = re.compile(r"^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?", re.M)
WIKI_RE = re.compile(r"\[\[([^\]|#]+)(?:\|([^\]]+))?\]\]")
TAG_RE = re.compile(r"(?<!\w)#([A-Za-z0-9/_-]+)")
HTML_BLOCK_RE = re.compile(
    r"<!--\s*portfolio:html\s*-->([\s\S]*?)<!--\s*/portfolio:html\s*-->",
    re.I,
)
WORD_RE = re.compile(r"[A-Za-z0-9']+")


def die(msg: str, code: int = 1) -> None:
    print(f"[build_knowledge_index] ERROR: {msg}", file=sys.stderr)
    sys.exit(code)


def parse_frontmatter(text: str) -> tuple[dict, str]:
    m = FRONTMATTER_RE.match(text)
    if not m:
        return {}, text
    raw = m.group(1)
    body = text[m.end() :]
    if yaml is not None:
        data = yaml.safe_load(raw) or {}
        if not isinstance(data, dict):
            die("Frontmatter must be a mapping")
        return data, body
    # Minimal fallback YAML (scalars / simple lists only)
    data: dict = {}
    key = None
    for line in raw.splitlines():
        if not line.strip() or line.strip().startswith("#"):
            continue
        if re.match(r"^\s*-\s+", line) and key:
            val = line.strip()[1:].strip().strip('"').strip("'")
            data.setdefault(key, [])
            if not isinstance(data[key], list):
                data[key] = [data[key]]
            data[key].append(val)
            continue
        km = re.match(r"^([A-Za-z0-9_]+):\s*(.*)$", line)
        if not km:
            continue
        key = km.group(1)
        val = km.group(2).strip()
        if val == "" or val == "[]":
            data[key] = [] if val == "[]" else []
            continue
        if val.lower() in ("true", "false"):
            data[key] = val.lower() == "true"
            continue
        if re.fullmatch(r"-?\d+", val):
            data[key] = int(val)
            continue
        if (val.startswith('"') and val.endswith('"')) or (
            val.startswith("'") and val.endswith("'")
        ):
            data[key] = val[1:-1]
        else:
            data[key] = val
    return data, body


def estimate_minutes(text: str, override=None) -> int:
    if override not in (None, "", "auto"):
        try:
            return max(1, int(override))
        except (TypeError, ValueError):
            pass
    words = len(WORD_RE.findall(re.sub(r"<[^>]+>", " ", text)))
    return max(1, round(words / 220) or 1)


def slugify(value: str) -> str:
    s = value.strip().lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")


def resolve_wiki_links(md: str, known_slugs: set[str]) -> str:
    def repl(match: re.Match) -> str:
        target = match.group(1).strip()
        label = (match.group(2) or target).strip()
        slug = slugify(target)
        # Allow Obsidian note titles that match slug or title-ish
        if slug not in known_slugs:
            # try as literal slug
            cand = target.strip()
            if cand in known_slugs:
                slug = cand
            else:
                return label  # unresolved: leave plain text
        return f'<a href="#/knowledge/{slug}" data-nav-link="knowledge/{slug}">{label}</a>'

    return WIKI_RE.sub(repl, md)


def markdown_to_html(md: str) -> str:
    # Extract preserved HTML blocks first
    html_parts: list[str] = []

    def stash(match: re.Match) -> str:
        html_parts.append(match.group(1).strip())
        return f"\n\n@@HTMLBLOCK{len(html_parts) - 1}@@\n\n"

    md = HTML_BLOCK_RE.sub(stash, md)

    if md_lib is not None:
        html = md_lib.markdown(
            md,
            extensions=["extra", "sane_lists", "tables", "fenced_code", "toc"],
            output_format="html5",
        )
    else:
        html = naive_markdown(md)

    for i, block in enumerate(html_parts):
        html = html.replace(f"<p>@@HTMLBLOCK{i}@@</p>", block)
        html = html.replace(f"@@HTMLBLOCK{i}@@", block)
    return html


def naive_markdown(md: str) -> str:
    """Tiny fallback converter for environments without the markdown package."""
    lines = md.replace("\r\n", "\n").split("\n")
    out: list[str] = []
    in_ul = False
    in_ol = False
    para: list[str] = []

    def flush_para() -> None:
        nonlocal para
        if para:
            text = " ".join(para)
            text = inline_format(text)
            out.append(f"<p>{text}</p>")
            para = []

    def close_lists() -> None:
        nonlocal in_ul, in_ol
        if in_ul:
            out.append("</ul>")
            in_ul = False
        if in_ol:
            out.append("</ol>")
            in_ol = False

    for line in lines:
        if not line.strip():
            flush_para()
            close_lists()
            continue
        hm = re.match(r"^(#{1,3})\s+(.*)$", line)
        if hm:
            flush_para()
            close_lists()
            level = len(hm.group(1))
            out.append(f"<h{level}>{inline_format(hm.group(2))}</h{level}>")
            continue
        if re.match(r"^[-*]\s+", line):
            flush_para()
            if in_ol:
                out.append("</ol>")
                in_ol = False
            if not in_ul:
                out.append("<ul>")
                in_ul = True
            out.append(f"<li>{inline_format(re.sub(r'^[-*]\\s+', '', line))}</li>")
            continue
        if re.match(r"^\d+\.\s+", line):
            flush_para()
            if in_ul:
                out.append("</ul>")
                in_ul = False
            if not in_ol:
                out.append("<ol>")
                in_ol = True
            out.append(f"<li>{inline_format(re.sub(r'^\\d+\\.\\s+', '', line))}</li>")
            continue
        if line.strip().startswith(">"):
            flush_para()
            close_lists()
            out.append(f"<blockquote><p>{inline_format(line.lstrip('> ').strip())}</p></blockquote>")
            continue
        para.append(line.strip())

    flush_para()
    close_lists()
    return "\n".join(out)


def inline_format(text: str) -> str:
    text = re.sub(r"`([^`]+)`", r"<code>\1</code>", text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)", r"<em>\1</em>", text)
    text = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r'<a href="\2">\1</a>', text)
    return text


def load_articles() -> list[dict]:
    if not KNOWLEDGE_DIR.exists():
        die(f"Missing directory: {KNOWLEDGE_DIR}")

    files = sorted(KNOWLEDGE_DIR.glob("*.md"))
    if not files:
        die(f"No Markdown files found in {KNOWLEDGE_DIR}")

    # First pass: collect slugs
    drafts = []
    for path in files:
        text = path.read_text(encoding="utf-8")
        meta, body = parse_frontmatter(text)
        slug = str(meta.get("slug") or path.stem).strip()
        drafts.append((path, meta, body, slug))

    known = {slug for _, _, _, slug in drafts}

    articles = []
    for path, meta, body, slug in drafts:
        status = str(meta.get("status", "published")).lower()
        if status in ("draft", "private", "hidden"):
            continue

        title = str(meta.get("title") or slug)
        description = str(meta.get("description") or meta.get("summary") or "")
        category = str(meta.get("category") or "tools").lower()
        label = str(meta.get("label") or "NOTE")
        tags = meta.get("tags") or []
        if isinstance(tags, str):
            tags = [t.strip() for t in tags.split(",") if t.strip()]
        tags = [str(t) for t in tags]

        related = meta.get("related") or []
        if isinstance(related, str):
            related = [related]
        related = [str(r).strip() for r in related if str(r).strip()]

        body_linked = resolve_wiki_links(body, known)
        # Strip leading duplicate H1 matching title
        body_linked = re.sub(
            rf"^#\s+{re.escape(title)}\s*\n+", "", body_linked, count=1, flags=re.I
        )
        html = markdown_to_html(body_linked)

        minutes = estimate_minutes(body + " " + description, meta.get("reading_time"))
        updated = meta.get("updated") or meta.get("created") or ""
        if hasattr(updated, "isoformat"):
            updated = updated.isoformat()
        updated = str(updated)

        created = meta.get("created") or ""
        if hasattr(created, "isoformat"):
            created = created.isoformat()
        created = str(created)

        # Obsidian inline tags only — ignore hash routes and numeric IDs
        md_for_tags = HTML_BLOCK_RE.sub(" ", body)
        md_for_tags = re.sub(r"```[\s\S]*?```", " ", md_for_tags)
        for tag in TAG_RE.findall(md_for_tags):
            if not tag or tag.startswith("/") or tag.isdigit():
                continue
            if tag not in tags:
                tags.append(tag)

        articles.append(
            {
                "slug": slug,
                "title": title,
                "description": description,
                "summary": description,
                "category": category,
                "label": label,
                "tags": tags,
                "keywords": tags,
                "status": "published",
                "featured": bool(meta.get("featured", False)),
                "start_here": bool(meta.get("start_here", False)),
                "order": int(meta.get("order") or 999),
                "created": created,
                "updated": updated,
                "minutes": minutes,
                "level": str(meta.get("level") or "learning"),
                "aliases": meta.get("aliases") or [],
                "related": related,
                "deck": str(meta.get("deck") or description),
                "path": f"knowledge/{path.name}",
                "bodyHtml": html,
                "content_hash": hashlib.sha1(
                    (title + description + body).encode("utf-8")
                ).hexdigest()[:12],
            }
        )

    articles.sort(key=lambda a: (a["order"], a["title"].lower()))
    return articles


def main() -> None:
    articles = load_articles()
    start_here = [a["slug"] for a in articles if a["start_here"]]
    start_here.sort(
        key=lambda s: next(a["order"] for a in articles if a["slug"] == s)
    )
    categories = sorted({a["category"] for a in articles})

    payload = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "generator": "scripts/build_knowledge_index.py",
        "count": len(articles),
        "categories": categories,
        "start_here": start_here,
        "articles": articles,
    }

    OUT_PATH.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(f"[build_knowledge_index] Wrote {OUT_PATH} ({len(articles)} articles)")
    print(f"[build_knowledge_index] Categories: {', '.join(categories)}")
    print(f"[build_knowledge_index] Start here: {', '.join(start_here) or '(none)'}")


if __name__ == "__main__":
    main()
