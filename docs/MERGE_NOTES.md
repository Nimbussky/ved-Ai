# Ved AI — Unified Merge Notes

Merged 6 repos into ONE on 2026-10-05. Base = `Nimbussky/vedai-app` (newest).

## Sources
| Repo | Commits | Src files | Status |
|------|---------|-----------|--------|
| vedai-app | 21 | 54 | BASE — v0.1.3, React 19, OmniRouter Engine 2, glass UI, universal deploy |
| -vedai-app- | 7 | 50 | Merged — all overlapping files already in base; 18 files differ but base is newer/better |
| vedai-app-v1 | 1 | 51 | Merged — same code snapshot, no unique src files |
| ved-Ai | 2 | 0 | Empty shell (config only) — nothing to merge |
| veed-aiv001 | 1 | 0 | Empty shell (config only) — nothing to merge |
| VedAi-v0.1. | 1 | 0 | Empty shell (config only) — QA outputs preserved below |

## What base already had extra (not in others)
- src/components/Dashboard/PanchangSection.tsx
- src/components/Dashboard/TransitsSection.tsx
- src/hooks/useAstrology.ts
- src/lib/ai/providers/free-routes.ts (8 extra free providers: zenMux, kimi, qwen, tokenRouterDeepSeek, miniMax, claude, gpt, huggingFace)
- OmniRouter Engine 2 registry (16 providers vs old 8)
- vercel.json universal deploy config

## Preserved from old repos
- docs/legacy-archive/qa_output*.md, qa_task_input.txt (from VedAi-v0.1.)
- docs/legacy-archive/legacy-prisma-schema.prisma, legacy-schema.sql (from vedai-app-v1, obsolete — project uses Drizzle + D1 now)

## Key content upgrades in base vs -vedai-app-
- lib/ai/providers/index.ts: 16-provider OmniRouter cascade
- lib/ai/engine.ts: +36/-24 lines (failover engine v2)
- lib/ai/providers/openrouter.ts: rewritten multi-model router (1213 → 1962 bytes)
- components/Hero.tsx, Features.tsx, Footer.tsx: glassmorphism redesign
- package.json: React 18 → 19, version 0.1.0 → 0.1.3
