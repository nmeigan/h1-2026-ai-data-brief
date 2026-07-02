const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const {
  FaBalanceScale, FaShieldAlt, FaGlobeAsia, FaLayerGroup,
  FaMicrochip, FaLaptopCode, FaSnowflake, FaDatabase,
  FaServer, FaProjectDiagram, FaArrowRight, FaBolt
} = require("react-icons/fa");

// ---- palette (Midnight Executive, premium dark-throughout) ----
const BG      = "0E1330";   // deep navy background
const PANEL   = "1B2350";   // card panel
const PANEL2  = "232C63";   // lighter card
const INK     = "EAF0FF";   // primary light text
const MUTE    = "9AA7D4";   // muted text
const GOLD    = "F4B740";   // accent / stats
const GREEN   = "4ADE80";   // Nemotron
const BLUE    = "5AA9FF";   // Gemma
const TEAL    = "34D8C4";   // sovereignty accent

async function icon(Cmp, color, size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(Cmp, { color, size: String(size) })
  );
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + png.toString("base64");
}
const shadow = () => ({ type: "outer", color: "000000", blur: 9, offset: 3, angle: 90, opacity: 0.35 });

(async () => {
  const P = new pptxgen();
  P.defineLayout({ name: "SQ", width: 10, height: 10 });
  P.layout = "SQ";
  P.author = "Enun Ismath Naina Mohamed";
  P.title = "H1 2026 AI Reset — Carousel";

  const ic = {
    scale: await icon(FaBalanceScale, "#" + GOLD),
    shield: await icon(FaShieldAlt, "#" + TEAL),
    globe: await icon(FaGlobeAsia, "#" + TEAL),
    layers: await icon(FaLayerGroup, "#" + GOLD),
    chip: await icon(FaMicrochip, "#" + GREEN),
    laptop: await icon(FaLaptopCode, "#" + BLUE),
    snow: await icon(FaSnowflake, "#" + BLUE),
    db: await icon(FaDatabase, "#" + GOLD),
    server: await icon(FaServer, "#" + TEAL),
    graph: await icon(FaProjectDiagram, "#" + GREEN),
    arrow: await icon(FaArrowRight, "#" + GOLD),
    bolt: await icon(FaBolt, "#" + GOLD),
  };

  // helper: page number + swipe motif
  function chrome(slide, n, showSwipe = true) {
    slide.addText(`0${n}`, { x: 0.55, y: 9.15, w: 1, h: 0.5, fontFace: "Arial",
      fontSize: 13, bold: true, color: GOLD, align: "left", margin: 0 });
    slide.addText("H1 2026 · AI RESET", { x: 3.5, y: 9.15, w: 3, h: 0.5, fontFace: "Arial",
      fontSize: 10, color: MUTE, align: "center", charSpacing: 2, margin: 0 });
    if (showSwipe) {
      slide.addText("SWIPE", { x: 7.7, y: 9.15, w: 1.3, h: 0.5, fontFace: "Arial",
        fontSize: 10, bold: true, color: MUTE, align: "right", charSpacing: 2, margin: 0 });
      slide.addImage({ data: ic.arrow, x: 9.02, y: 9.19, w: 0.32, h: 0.32 });
    }
  }
  function kicker(slide, txt) {
    slide.addText(txt, { x: 0.6, y: 0.62, w: 8.8, h: 0.4, fontFace: "Arial",
      fontSize: 12, bold: true, color: GOLD, charSpacing: 3, margin: 0 });
  }
  function title(slide, txt, y = 1.02, size = 33) {
    slide.addText(txt, { x: 0.6, y, w: 8.8, h: 1.1, fontFace: "Cambria",
      fontSize: size, bold: true, color: INK, margin: 0, lineSpacingMultiple: 0.98 });
  }

  // ============ SLIDE 1 — COVER ============
  let s = P.addSlide(); s.background = { color: BG };
  s.addText("MID-YEAR INSIGHT", { x: 0.6, y: 0.9, w: 8.8, h: 0.4, fontFace: "Arial",
    fontSize: 13, bold: true, color: GOLD, charSpacing: 4, margin: 0 });
  s.addText([
    { text: "THE AI", options: { breakLine: true } },
    { text: "RESET", options: {} },
  ], { x: 0.55, y: 1.5, w: 9, h: 2.7, fontFace: "Cambria", fontSize: 76, bold: true,
    color: INK, margin: 0, lineSpacingMultiple: 0.92 });
  s.addText("Guardrails  ·  Sovereignty  ·  Efficiency", { x: 0.6, y: 4.25, w: 8.8, h: 0.5,
    fontFace: "Arial", fontSize: 20, italic: true, color: TEAL, margin: 0 });

  s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 5.35, w: 8.8, h: 2.5,
    fill: { color: PANEL }, rectRadius: 0.12, shadow: shadow() });
  s.addImage({ data: ic.bolt, x: 1.0, y: 5.75, w: 0.6, h: 0.6 });
  s.addText([
    { text: "The winner in 2026 isn't the biggest model.\n", options: { color: INK, bold: true } },
    { text: "It's the ", options: { color: MUTE } },
    { text: "safest, cheapest one you actually own and control.", options: { color: GOLD, bold: true } },
  ], { x: 1.0, y: 6.45, w: 8.0, h: 1.2, fontFace: "Cambria", fontSize: 23, margin: 0,
    lineSpacingMultiple: 1.05 });

  s.addText([
    { text: "Enun Ismath Naina Mohamed", options: { color: INK, bold: true } },
    { text: "  ·  Chief Data & AI Officer / CTO", options: { color: MUTE } },
  ], { x: 0.6, y: 8.35, w: 8.8, h: 0.4, fontFace: "Arial", fontSize: 12, margin: 0 });
  chrome(s, 1);

  // ============ SLIDE 2 — GUARDRAILS ============
  s = P.addSlide(); s.background = { color: BG };
  kicker(s, "REGULATION");
  s.addImage({ data: ic.scale, x: 8.35, y: 0.85, w: 1.05, h: 1.05 });
  title(s, "Guardrails went from\nslideware to statute");
  s.addText("The EU AI Act is the clock every AI roadmap is now syncing to.", {
    x: 0.6, y: 2.35, w: 8.0, h: 0.5, fontFace: "Arial", fontSize: 15, color: MUTE, margin: 0 });

  const tl = [
    ["2 AUG 2026", "Full application. Transparency rules bite — disclose AI-generated content and “you’re talking to an AI.”"],
    ["2 DEC 2026", "New hard bans take effect on abusive synthetic imagery."],
    ["2 DEC 2027", "High-risk-system deadline (deferred under the May “Digital Omnibus”)."],
  ];
  let y = 3.05;
  tl.forEach(([d, t]) => {
    s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: 0.6, y, w: 8.8, h: 1.35,
      fill: { color: PANEL }, rectRadius: 0.1, shadow: shadow() });
    s.addText(d, { x: 0.95, y: y + 0.18, w: 2.5, h: 1.0, fontFace: "Cambria", fontSize: 22,
      bold: true, color: GOLD, valign: "middle", margin: 0 });
    s.addText(t, { x: 3.5, y: y + 0.12, w: 5.6, h: 1.1, fontFace: "Arial", fontSize: 14.5,
      color: INK, valign: "middle", margin: 0, lineSpacingMultiple: 1.02 });
    y += 1.55;
  });
  s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: y + 0.05, w: 8.8, h: 0.95,
    fill: { color: "3A2A12" }, rectRadius: 0.1 });
  s.addText([
    { text: "TEETH:  ", options: { color: GOLD, bold: true } },
    { text: "fines up to €35M or 7% of global turnover.", options: { color: INK, bold: true } },
  ], { x: 0.95, y: y + 0.05, w: 8.1, h: 0.95, fontFace: "Arial", fontSize: 16, valign: "middle", margin: 0 });
  chrome(s, 2);

  // ============ SLIDE 3 — SOVEREIGNTY ============
  s = P.addSlide(); s.background = { color: BG };
  kicker(s, "DATA SOVEREIGNTY & RESIDENCY");
  s.addImage({ data: ic.shield, x: 8.35, y: 0.85, w: 1.05, h: 1.05 });
  title(s, "The sovereignty pendulum\nis swinging back");

  // big stat + note
  s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 2.5, w: 4.25, h: 2.15,
    fill: { color: PANEL2 }, rectRadius: 0.12, shadow: shadow() });
  s.addText("~51%", { x: 0.8, y: 2.65, w: 3.85, h: 1.1, fontFace: "Cambria", fontSize: 60,
    bold: true, color: TEAL, margin: 0 });
  s.addText("of enterprises now run hybrid-sovereign: sensitive data local, heavy lifting global.",
    { x: 0.85, y: 3.75, w: 3.75, h: 0.85, fontFace: "Arial", fontSize: 13, color: INK, margin: 0,
      lineSpacingMultiple: 1.0 });

  s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: 5.15, y: 2.5, w: 4.25, h: 2.15,
    fill: { color: PANEL }, rectRadius: 0.12, shadow: shadow() });
  s.addText("Residency ≠ compliance", { x: 5.4, y: 2.72, w: 3.8, h: 0.5, fontFace: "Cambria",
    fontSize: 21, bold: true, color: GOLD, margin: 0 });
  s.addText("Location tells you where data rests — not how it’s governed as it moves across GPU clouds, training and inference. Govern data in motion.",
    { x: 5.4, y: 3.28, w: 3.8, h: 1.3, fontFace: "Arial", fontSize: 13, color: INK, margin: 0,
      lineSpacingMultiple: 1.03 });

  s.addText("HOW THE MAP IS EVOLVING", { x: 0.6, y: 4.95, w: 8.8, h: 0.4, fontFace: "Arial",
    fontSize: 12, bold: true, color: MUTE, charSpacing: 2, margin: 0 });
  const regions = [
    ["EUROPE (EU)", "Sovereign infrastructure to match the AI Act — keeping critical workloads in-jurisdiction."],
    ["ASEAN", "A pragmatic “diverse cloud” mix — local providers plus global hyperscalers, by workload."],
    ["MIDDLE EAST", "Bold national-AI ambition and homegrown champions — e.g. the UAE’s Falcon models and G42."],
  ];
  let rx = 0.6;
  regions.forEach(([h, t]) => {
    s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: rx, y: 5.45, w: 2.8, h: 2.95,
      fill: { color: PANEL }, rectRadius: 0.1, shadow: shadow() });
    s.addImage({ data: ic.globe, x: rx + 0.25, y: 5.7, w: 0.5, h: 0.5 });
    s.addText(h, { x: rx + 0.25, y: 6.3, w: 2.35, h: 0.5, fontFace: "Cambria", fontSize: 16.5,
      bold: true, color: TEAL, margin: 0 });
    s.addText(t, { x: rx + 0.25, y: 6.82, w: 2.35, h: 1.45, fontFace: "Arial", fontSize: 12.5,
      color: INK, margin: 0, lineSpacingMultiple: 1.03 });
    rx += 2.9;
  });
  chrome(s, 3);

  // ============ SLIDE 4 — PLATFORM CONVERGENCE ============
  s = P.addSlide(); s.background = { color: BG };
  kicker(s, "ARCHITECTURE");
  s.addImage({ data: ic.layers, x: 8.35, y: 0.85, w: 1.05, h: 1.05 });
  title(s, "Data & AI platforms\nare converging");
  s.addText("The stacks are collapsing into one — from opposite starting points.", {
    x: 0.6, y: 2.35, w: 8.5, h: 0.5, fontFace: "Arial", fontSize: 15, color: MUTE, margin: 0 });

  const rows = [
    [ic.snow, "Snowflake", "Data platform pushing INTO AI — Cortex runs models in-perimeter; data never leaves."],
    [ic.graph, "Databricks", "AI/ML-first pushing INTO governance + data — the lakehouse & Unity Catalog."],
    [ic.server, "EDB / Postgres", "Both cloud AND on-prem — now vector-native for AI workloads."],
    [ic.db, "Vector DBs", "Cloud-only (Pinecone) → hybrid & self-host (Qdrant, Weaviate, Milvus, pgvector) for sovereignty."],
  ];
  let ry = 3.0;
  rows.forEach(([im, h, t]) => {
    s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: ry, w: 8.8, h: 1.32,
      fill: { color: PANEL }, rectRadius: 0.1, shadow: shadow() });
    s.addShape(P.shapes.OVAL, { x: 0.9, y: ry + 0.32, w: 0.68, h: 0.68, fill: { color: PANEL2 } });
    s.addImage({ data: im, x: 1.04, y: ry + 0.46, w: 0.4, h: 0.4 });
    s.addText(h, { x: 1.85, y: ry + 0.14, w: 3.0, h: 0.5, fontFace: "Cambria", fontSize: 18,
      bold: true, color: GOLD, valign: "middle", margin: 0 });
    s.addText(t, { x: 1.85, y: ry + 0.6, w: 7.25, h: 0.62, fontFace: "Arial", fontSize: 13.5,
      color: INK, margin: 0, lineSpacingMultiple: 1.0 });
    ry += 1.5;
  });
  chrome(s, 4);

  // ============ SLIDE 5 — MODEL SHOWDOWN + CTA ============
  s = P.addSlide(); s.background = { color: BG };
  kicker(s, "OPEN-MODEL SHOWDOWN");
  title(s, "Small, open & efficient\nredefined the game");

  // Nemotron column
  s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 2.45, w: 4.25, h: 4.35,
    fill: { color: PANEL }, rectRadius: 0.12, shadow: shadow() });
  s.addImage({ data: ic.chip, x: 0.9, y: 2.72, w: 0.6, h: 0.6 });
  s.addText("NVIDIA Nemotron 3", { x: 1.62, y: 2.72, w: 3.1, h: 0.6, fontFace: "Cambria",
    fontSize: 18, bold: true, color: GREEN, valign: "middle", margin: 0 });
  s.addText("The “agent fleet”", { x: 0.9, y: 3.4, w: 3.7, h: 0.35, fontFace: "Arial",
    fontSize: 13, italic: true, color: MUTE, margin: 0 });
  s.addText("Ultra (500B) unveiled by Jensen Huang at GTC Taipei @ COMPUTEX 2026 (Jun 1–4).",
    { x: 0.9, y: 3.74, w: 3.7, h: 0.75, fontFace: "Arial", fontSize: 12, color: GOLD, margin: 0,
      lineSpacingMultiple: 1.0 });
  s.addText([
    { text: "Up to 5× throughput, 4× faster inference", options: { bullet: true, breakLine: true } },
    { text: "A 3B-active model matching 120B-class work", options: { bullet: true, breakLine: true } },
    { text: "1M context; fully open weights, data AND recipes → audit-ready", options: { bullet: true } },
  ], { x: 0.95, y: 4.6, w: 3.65, h: 2.05, fontFace: "Arial", fontSize: 13, color: INK, margin: 0,
    paraSpaceAfter: 8, lineSpacingMultiple: 1.0 });

  // Gemma column
  s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: 5.15, y: 2.45, w: 4.25, h: 4.35,
    fill: { color: PANEL }, rectRadius: 0.12, shadow: shadow() });
  s.addImage({ data: ic.laptop, x: 5.45, y: 2.72, w: 0.6, h: 0.6 });
  s.addText("Google Gemma 4 12B", { x: 6.17, y: 2.72, w: 3.1, h: 0.6, fontFace: "Cambria",
    fontSize: 18, bold: true, color: BLUE, valign: "middle", margin: 0 });
  s.addText("“AI on your laptop”", { x: 5.45, y: 3.4, w: 3.7, h: 0.35, fontFace: "Arial",
    fontSize: 13, italic: true, color: MUTE, margin: 0 });
  s.addText("Unified multimodal model — released 3 Jun 2026, under Apache 2.0.",
    { x: 5.45, y: 3.74, w: 3.7, h: 0.75, fontFace: "Arial", fontSize: 12, color: GOLD, margin: 0,
      lineSpacingMultiple: 1.0 });
  s.addText([
    { text: "Runs on just 16GB VRAM", options: { bullet: true, breakLine: true } },
    { text: "256K context — roughly 8× Gemma 3", options: { bullet: true, breakLine: true } },
    { text: "~26B-model performance at under half the memory", options: { bullet: true } },
  ], { x: 5.5, y: 4.6, w: 3.65, h: 2.05, fontFace: "Arial", fontSize: 13, color: INK, margin: 0,
    paraSpaceAfter: 8, lineSpacingMultiple: 1.0 });

  // CTA band
  s.addShape(P.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 7.05, w: 8.8, h: 1.75,
    fill: { color: PANEL2 }, rectRadius: 0.12, shadow: shadow() });
  s.addText([
    { text: "The 2026 KPI flipped: from “how big?” to ", options: { color: INK, bold: true } },
    { text: "“how safe, how cheap, how sovereign?”", options: { color: GOLD, bold: true } },
  ], { x: 0.95, y: 7.2, w: 8.1, h: 0.7, fontFace: "Cambria", fontSize: 18, valign: "middle",
    margin: 0, lineSpacingMultiple: 1.0 });
  s.addText("Which lever matters most to your roadmap — guardrails, sovereignty, or platform convergence?",
    { x: 0.95, y: 7.95, w: 8.1, h: 0.72, fontFace: "Arial", fontSize: 14, color: MUTE, valign: "middle",
      margin: 0, lineSpacingMultiple: 1.0 });
  chrome(s, 5, false);
  s.addText("Enun Ismath Naina Mohamed — follow for the H2 read →", { x: 3.4, y: 9.12, w: 6.0, h: 0.5, fontFace: "Arial",
    fontSize: 11, bold: true, color: GOLD, align: "right", margin: 0 });

  await P.writeFile({ fileName: "H1-2026-AI-Reset-Carousel.pptx" });
  console.log("WROTE H1-2026-AI-Reset-Carousel.pptx");
})();
