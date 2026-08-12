# Support Lab scenarios

Practice simulations for `#/support-lab`.

## Architecture

| Piece | Role |
|--------|------|
| `data/support-lab.json` | Scenario logic, actions, evidence |
| `index.html` | Lab engine + UI |
| Knowledge Markdown | Theory / reference (not branching logic) |

## Add a scenario

1. Append an object to `scenarios` in `data/support-lab.json`.
2. Set `status` to `available`, `building`, or `planned`.
3. Provide `actions` for available labs (branching investigation choices).
4. Link `relatedKnowledge` / `relatedProjects` by slug.
5. Reload the site over HTTP (no build step required for JSON).

## Schema (conceptual)

- `slug`, `title`, `category`, `difficulty`, `status`
- `summary`, `report`, `objective`, `impact`, `environment`
- `layers`, `skills`, `tools`
- `triage[]`, `hypotheses[]`, `actions[]`
- `completion`: `{ minEvidence, unlockNote, unlockValidation?, fixMessage? }`
- `relatedKnowledge[]`, `relatedProjects[]`, `note?`

### Action fields

- `id`, `label`, `value` (`high` | `useful` | `low` | `premature`)
- `feedback`, `result`, optional `snippet`
- `evidence`, optional `hypothesisEffects`, optional `phase`

## Truthfulness

Scenarios are **simulations**. Do not describe them as production incidents.
Project links mean “related workflow thinking,” not “this ticket happened there.”
