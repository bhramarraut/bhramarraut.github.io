---
title: "Agentic Coding vs Conventional Coding"
slug: "agentic-vs-conventional-coding"
description: "What changes when an AI agent can inspect, edit, run, and iterate across a codebase."
category: "ai"
label: "LEARNING NOTE"
tags:
  - "AI"
  - "coding"
  - "validation"
status: "published"
featured: false
start_here: false
order: 121
created: 2026-08-01
updated: 2026-08-12
reading_time: auto
level: "learning"
related:
  - "ai-agents-without-fake-coding"
  - "ai-acceptance-criteria"
---

# Agentic Coding vs Conventional Coding

In conventional coding, I might open a file, write a function, run the program, read the error, and make the next change. The feedback loop is visible because I am moving through it one decision at a time.

With an agentic coding tool, I can describe an outcome and allow the agent to inspect several files, propose a plan, edit code, run checks, and respond to failures. The loop can move much faster—and become much easier to misunderstand.

## The real difference is the size of delegated action

Autocomplete predicts a line or block. A chat assistant may explain an approach. An agent can often take a multi-step task through the repository and tools available to it.

That changes the human job. The bottleneck moves from typing every character toward:

- Defining the outcome and constraints.
- Providing the right project context.
- Reviewing architecture and trade-offs.
- Checking the diff, not only the final screen.
- Running meaningful tests.
- Deciding whether the evidence is enough to accept the change.

Faster generation increases the need for disciplined verification; it does not remove it.

## A relatable feature example

Suppose the request is “add role-based filtering to the lead list.”

An agent may produce a polished filter quickly. But several product questions still exist:

- Is filtering only visual, or enforced by the service?
- Does Admin see all branches or only the selected tenant?
- What happens to a copied direct URL?
- Are exports filtered too?
- Does changing a user’s role affect an existing session?
- What is the expected empty state?

If these questions are absent from the task, the generated solution can look complete while implementing the wrong boundary.

## Conventional work still matters

Manual coding builds direct familiarity with syntax, control flow, debugging, and system behavior. Those skills make agent review stronger. Without them, a convincing diff can feel correct merely because it is readable.

I do not treat the two modes as enemies. A useful workflow can move between them:

1. Understand the requirement manually.
2. Let the agent inspect and propose.
3. Review the plan and narrow the scope.
4. Use the agent for implementation and routine checks.
5. Trace critical behavior manually.
6. Test the user journey and negative cases.
7. Ask the agent to explain or revise anything I cannot defend.

## New failure modes to watch

- A broad task causes unrelated files to change.
- Existing project conventions are missed.
- Tests pass but do not cover the requirement.
- The agent solves a symptom with duplicated logic.
- Generated comments confidently describe behavior the code does not guarantee.
- A dependency or API is invented or used incorrectly.
- The reviewer accepts a large diff because redoing it feels expensive.

Smaller tasks and explicit acceptance criteria reduce these risks.

## My honest boundary

I use AI-assisted and agentic tools as part of project-based learning and delivery. I do not describe their generated implementation as code I manually authored line by line. My contribution is better represented by the requirements I clarified, the constraints I set, the output I inspected, the workflows I tested, the defects I documented, and the corrections I validated.

## Reference

[Official OpenAI documentation](https://developers.openai.com/) describes Codex as a coding agent for understanding codebases, building and testing features, fixing bugs, and reviewing changes.

> Agentic coding can compress execution time. It cannot compress the need to know what “correct” means.

