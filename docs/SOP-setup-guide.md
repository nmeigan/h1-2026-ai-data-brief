# SOP — Reproducing This Brief

This is a research/analyst brief, not a codebase — "setup" here means the repeatable process used to produce it, so you (or your team) can regenerate an equivalent brief for H2 2026 or any future period.

## Phase 1 — Signal Collection

1. Scan subscribed AI/data newsletters (Gmail or equivalent inbox) over the target period. Target sources that mix practitioner opinion (Substack-style) with structured news roundups.
2. Tag every item touching: job market/role signal, regulatory/compliance news, model releases and benchmarks, compute/infrastructure deals.
3. Do not trust newsletter claims at face value — every number or date that will appear in the brief must be re-verified against a primary source in Phase 2.

**Common issue:** newsletter aggregators often restate older news as current. **Fix:** cross-check publish dates against the primary source's own dateline before including.

## Phase 2 — Live Web Verification

1. For every claim flagged in Phase 1, find the primary source: vendor blog post, regulatory text, benchmark leaderboard, or a reputable analyst writeup that itself cites primaries.
2. Record the source URL alongside the claim.
3. Where sources disagree (e.g., differing EU AI Act deadline interpretations), prefer the regulator's own published text or a law-firm client alert over secondary commentary.

**Common issue:** regulatory deadlines shift (e.g., the EU AI Act's "Digital Omnibus" deferral). **Fix:** always check for the most recent amendment before publishing; note the deferral explicitly rather than citing only the original deadline.

## Phase 3 — Synthesis

1. Group verified findings into thematic sections (this brief used: jobs, top trends, guardrails/regulation, comparative model analysis).
2. For any head-to-head technical comparison (this brief used Nemotron 3 vs. Gemma 4 12B), build a like-for-like table: design intent, sizes, architecture, context window, efficiency, openness/license, release date, best-fit use.
3. Write an explicit "analyst verdict" for each section — the synthesis step is what separates a brief from a link-dump. State a position, not just a summary.

## Phase 4 — Distribution Artefacts

1. Convert the brief into a LinkedIn post following the Gartner-analyst voice/structure (hook → reframe → sourced proof points → dated strategic planning assumption → recommendations → engagement close).
2. Build a companion visual carousel (5 slides) summarizing the same arc for social distribution.
3. Publish the full brief + comparative tables to a public GitHub repo for readers who want the sourced detail behind the post.
4. Draft a 3-comment thread: reproducible detail (Comment 1, pinned), enterprise/regulatory framing (Comment 2), and an identity/CTA comment (Comment 3, held until traction signal).

## Troubleshooting Table

| Issue | Cause | Fix |
|---|---|---|
| Claim can't be traced to a primary source | Newsletter paraphrased or aggregated | Soften to qualitative language or cut the claim |
| Regulatory deadline conflicting across sources | Amendment/deferral published after original source | Cite the regulator's own most recent text; note the deferral explicitly |
| Comparative table feels unbalanced | Only one model's marketing material used | Pull architecture/benchmark facts from both vendors' own technical blogs, not just press releases |
| Post exceeds LinkedIn's 3,000-character limit | Full brief detail copied into post body | Move detail to Comment 1 / GitHub repo; keep post to hook + reframe + proof points |

---

*Companion document to `README.md`. Author: Enun Ismath Naina Mohamed — [LinkedIn](https://www.linkedin.com/in/enun)*
