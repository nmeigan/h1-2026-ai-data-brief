# Solution Architecture — The Governed Fleet Pattern

## 1. Layer Diagram

```
                        ┌─────────────────────────────┐
                        │   POLICY-AS-CODE GUARDRAILS  │
                        │  (EU AI Act / SAMA / MAS /   │
                        │   BNM obligations, encoded)  │
                        └───────────────┬─────────────┘
                                        │  governs
                ┌───────────────────────┼───────────────────────┐
                │                       │                       │
        ┌───────▼───────┐      ┌────────▼────────┐     ┌────────▼────────┐
        │  EDGE / PRIVATE │      │  AGENT FLEET     │     │  FRONTIER API    │
        │  Gemma 4 12B     │      │  Nemotron 3      │     │  Claude Fable 5  │
        │  16GB VRAM       │      │  Nano/Super/Ultra│     │  95.0% SWE-bench │
        │  256K context    │      │  1M context      │     │  used sparingly  │
        │  Apache 2.0      │      │  open weights +  │     │  for escalation  │
        │                  │      │  data + recipes  │     │  only            │
        └──────────────────┘      └──────────────────┘     └──────────────────┘
                │                       │                       │
                └───────────────────────┼───────────────────────┘
                                        │
                        ┌───────────────▼───────────────┐
                        │  DATA LAYER — sovereign, vector │
                        │  native (Postgres/pgvector,     │
                        │  Qdrant/Weaviate, Snowflake      │
                        │  Cortex, Databricks Unity)       │
                        └──────────────────────────────────┘
```

## 2. Data Flow

1. **Request enters** at the edge (private/on-device) or agent-fleet tier by default.
2. **Policy-as-code guardrails** check the request against encoded EU AI Act / regional regulator obligations (transparency disclosure, use-case register membership, data residency) before any inference runs.
3. **Small models handle the majority of work.** Nemotron-class agents route most tasks; Gemma-class edge models handle private/on-device multimodal work.
4. **Escalation to frontier API is deliberate, not default.** Only tasks that exceed the small-model capability envelope escalate to Claude Fable 5 / Opus 4.8 — keeping the frontier vendor as a capability backstop, not a dependency.
5. **All layers read/write through a sovereign, vector-native data layer** — data never has to leave the governed perimeter regardless of which model tier serves the request.

## 3. Memory / Compute Analysis

| Tier | Params (active) | Context | Memory footprint | Throughput characteristic |
|---|---|---|---|---|
| Gemma 4 12B | ~11.95B dense | 256K | 16GB VRAM | Single-node, on-device capable |
| Nemotron 3 Nano | 3B active / 30B total | Up to 1M | Low — SLM-first | High throughput, agent-fleet default |
| Nemotron 3 Super | 12B active / 120B total | 1M | Mid | ~5x throughput vs. dense equivalent |
| Nemotron 3 Ultra | 50B active / 500B total | 1M | High | Long-running agent orchestration |
| Claude Fable 5 / Opus 4.8 | API (undisclosed) | Large | N/A (hosted) | Escalation only — cost-gated by design |

**Implication:** the governed fleet pattern deliberately shifts the compute/memory curve down and to the left — most inference happens on infrastructure the enterprise owns or tightly controls, with frontier API spend reserved for the tasks that actually need it.

## 4. Enterprise Scale Pattern

For a regulated bank or financial services institution in GCC, Singapore, or Malaysia:

- **Model risk / audit teams** get a fully inspectable stack for the majority of production traffic (Nemotron's open weights + data + training recipes satisfy "how does this work" diligence questions that a hosted frontier API cannot).
- **Data residency teams** get a data layer that never leaves the sovereign perimeter, satisfying SAMA/MAS/BNM expectations that data is governed *as it moves*, not just where it's stored.
- **Compliance/legal teams** get policy-as-code guardrails that convert EU AI Act (or equivalent regional) obligations into automated gates ahead of production, rather than manual review after the fact.
- **Engineering teams** get a cost curve that scales sublinearly — small models absorb volume, frontier API is a controlled, budgeted escalation path rather than the default cost base.

**The pattern generalises beyond AI Act deadlines** — any regulator that expects data governance and model explainability (SAMA, MAS, BNM, ADGM) is served by the same architecture.

---

*Companion document to `README.md`. Author: Enun Ismath Naina Mohamed — [LinkedIn](https://www.linkedin.com/in/enun)*
