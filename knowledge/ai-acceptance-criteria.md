---
title: "AI Does Not Remove the Need for Acceptance Criteria"
slug: "ai-acceptance-criteria"
description: "Generation becomes useful only when the expected behavior can be tested."
category: "ai"
label: "EXPLAINER"
tags:
  - "AI"
  - "acceptance criteria"
  - "requirements"
status: "published"
featured: false
start_here: false
order: 122
created: 2026-08-01
updated: 2026-08-12
reading_time: auto
level: "learning"
related:
  - "ai-assisted-requirements"
  - "requirement-to-work-items"
---

# AI Does Not Remove the Need for Acceptance Criteria

“Create a good login page” sounds clear until the result arrives.

Should it support email only or phone numbers too? What happens after five failed attempts? Where does a user return after signing in? How should an expired session behave? Which message is safe to show for an unknown account?

An AI can fill these gaps with plausible choices. Plausible is not the same as agreed.

## Criteria give generation a finish line

Acceptance criteria describe observable conditions that must be true for a specific piece of work to be accepted. They help the human, the agent, and the tester share one target.

Without them, review becomes a taste argument: “This is not what I imagined.” With them, review can ask: “Does the behavior pass the stated scenario?”

## From vague prompt to testable outcome

Vague: “Add a course search.”

More useful context: “A student should be able to find published courses by title or skill. Draft courses must never appear.”

Testable criteria:

- Given published courses, when the student searches by a word in the title, matching courses appear.
- Search ignores leading and trailing spaces.
- A query with no matches shows a clear empty state and a way to clear the search.
- Draft and archived courses do not appear in results.
- Clearing the query restores the default published list.
- Keyboard focus and labels make the search usable without a mouse.

Now the agent can implement against boundaries, and the reviewer can test something concrete.

## Include the uncomfortable paths

AI-generated demos often look strongest on the happy path. Real products spend much of their life in other states:

- Empty data.
- Invalid input.
- Slow or failed network requests.
- Expired sessions.
- Duplicate clicks.
- Disallowed roles.
- Very long names or translated text.
- Small screens and keyboard navigation.

Acceptance criteria make these states part of the request instead of late surprises.

## Do not turn criteria into implementation instructions

“Use a `useEffect` hook and store the results in `filteredCourses`” dictates one technical approach. It may be appropriate in a design note, but it is not user-facing acceptance criteria.

Criteria should usually describe externally observable behavior. Technical constraints—approved libraries, performance budgets, security rules, supported browsers—can be recorded separately.

## The review loop I use

1. Write the user, outcome, and business rule.
2. Add positive, negative, empty, and boundary cases.
3. Tell the agent which files or systems are in scope.
4. Ask it to restate assumptions before a broad change.
5. Review the diff against each criterion.
6. Run the workflow and keep evidence.
7. Add a regression check for important behavior.

If a criterion is impossible to verify, it probably needs clearer language.

## A useful closing question

Before accepting generated work, I ask: **What evidence would convince someone who did not write the prompt?**

That may be a passing test, a recorded role matrix, a screenshot at a supported mobile width, or a repeatable manual check. The form depends on risk; the need for evidence does not.

> AI can generate an answer to an ambiguous request. Acceptance criteria let us decide whether it is the right answer.

