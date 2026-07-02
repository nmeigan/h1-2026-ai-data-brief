# Learning Notes — `build_carousel.js`

Reference notes for studying how this script generates the 5-slide LinkedIn carousel programmatically (no manual PowerPoint/Canva editing).

## Libraries used and why

| Library | Role in this script |
|---|---|
| `pptxgenjs` | The core engine — builds a real `.pptx` file in code: slides, shapes, text boxes, images, positioning (all in inches, via `x`/`y`/`w`/`h`). |
| `react` + `react-dom/server` | Used only to render icon components to static SVG markup (`ReactDOMServer.renderToStaticMarkup`) — not for any UI/DOM, just as an SVG-generation trick. |
| `react-icons/fa` | Icon set (Font Awesome via React components) — e.g. `FaBalanceScale`, `FaShieldAlt`. Each icon is a React component that renders to SVG. |
| `sharp` | Converts the rendered SVG string into a PNG buffer, base64-encoded, so `pptxgenjs` can embed it as an image (`pptxgenjs` doesn't accept raw SVG). |

**Pipeline for one icon:** React icon component → `renderToStaticMarkup()` → SVG string → `sharp().png().toBuffer()` → base64 PNG → `slide.addImage({ data: ... })`.

## Program structure (read top to bottom)

1. **Palette constants** (lines ~11–20) — every color used anywhere in the deck is declared once as a hex string (`BG`, `PANEL`, `GOLD`, etc.) and referenced by name everywhere else. Change a palette here, the whole deck restyles.
2. **`icon()` helper** — the React→SVG→PNG conversion pipeline described above, wrapped in one reusable async function.
3. **`chrome()` helper** — draws the repeating footer (page number, running title, swipe arrow) so every slide calls one function instead of repeating layout code 5 times.
4. **`kicker()` / `title()` helpers** — same idea for the repeating header pattern (small label + big serif heading).
5. **One block per slide** (`SLIDE 1 — COVER`, `SLIDE 2 — GUARDRAILS`, etc.) — each creates a slide, sets its background, then calls the shared helpers plus slide-specific shapes/text/images.
6. **`P.writeFile(...)`** at the end — renders everything to `H1-2026-AI-Reset-Carousel.pptx`.

## Patterns worth reusing in your own scripts

- **Named constants over magic values** — colors, spacing, and fonts are declared once at the top, not hardcoded per-slide. This is the single biggest thing that makes the deck easy to restyle later (see the branding-variant discussion in the main README).
- **Small helper functions for repeating layout** (`chrome`, `kicker`, `title`) — turns "5 slides with a consistent header/footer" into "5 slides that each call 2 one-line functions," which is both less code and structurally guarantees consistency.
- **Data-driven loops for repeated content blocks** — e.g. slide 2's timeline (`tl.forEach(...)`) and slide 4's platform rows (`rows.forEach(...)`) are arrays of `[label, text]` pairs looped over, rather than copy-pasted blocks per row. Add a row by adding one array entry.
- **SVG→PNG bridge pattern** — whenever a tool (here, `pptxgenjs`) doesn't accept a format you want to use (SVG icons), look for a conversion library (`sharp`) rather than switching your icon source. This pattern (render → convert → embed) generalizes to lots of "tool A doesn't take format X" problems.

## How to run it yourself

```bash
npm install pptxgenjs react react-dom react-icons sharp
node build_carousel.js
# → writes H1-2026-AI-Reset-Carousel.pptx in the same folder
```

Export slides as JPG/PNG for LinkedIn by opening the `.pptx` and using File → Export, or a headless conversion tool (e.g. LibreOffice `soffice --headless --convert-to png`).

---

*Author: Enun Ismath Naina Mohamed — [LinkedIn](https://www.linkedin.com/in/enun)*
