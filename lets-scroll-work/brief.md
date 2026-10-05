# VedAI lets-scroll build — brief (100% FREE, manual asset path)

## Intake record
- SUBJECT: VedAI — Vedic astrology platform. "From birth data to cosmic clarity."
- BRAND_NAME: VedAI
- PALETTE: deep space navy #0B1120 (scene BG), temple gold #D4A24C (accent), cosmic indigo #3B5BDB, moon cream #F7F7F5, slate #1A2338
- TONE: premium, mystical, calm
- STYLE: neon-night clay diorama (matches ved-ai dark/gold brand)
- SECTIONS (N=2, teaser):
  1. `observatory` — "Cosmic Observatory" — eyebrow: FROM BIRTH DATA / title: "It starts with the sky." / body: "Enter your birth details and ancient math maps the heavens at that exact moment." / tags: Real astronomy, Vedic wisdom
  2. `hero` — "Your Living Chart" — eyebrow: TO COSMIC CLARITY / title: "Your chart, alive." / body: "Sixteen AI guides read your dashas, transits and yogas — free, forever." / tags: 16 AI providers, Free forever / CTA: primary "Get my chart" → /onboarding, secondary "Chat now" → /chat
- CAMERA: one continuous walkthrough (arch A — free browser video tools accept a START frame only, no end-frame, so connectors are impossible; walkthrough needs none)
- MOBILE: yes — native 9:16 portrait stills + portrait legs, wired as clipMobile/stillMobile
- ASSET_SOURCE: manual free (no Monid/Higgsfield on this PC; 2 GB GPU rules out local models)

## Stills spec — render FREE, save into lets-scroll-work/

| Prompt file | Output file | Size | Free tool suggestion |
|---|---|---|---|
| prompts/still_observatory.txt | still_observatory.png | 3:2, ≥1536px wide | Pollinations `?width=1536&height=1024&model=flux&nologo=true`, or Dezgo free SDXL |
| prompts/still_hero.txt | still_hero.png | 3:2, ≥1536px wide | same |
| prompts/still_observatory_portrait.txt | still_observatory_portrait.png | 9:16, ≥768x1365 | Pollinations `?width=768&height=1365&model=flux&nologo=true` |
| prompts/still_hero_portrait.txt | still_hero_portrait.png | 9:16, ≥768x1365 | same |

Rules: solid #0B1120 background, no text in image, focal subject centred, nothing essential at edges.

## Legs spec — render FREE image-to-video with START frame

| Prompt file | Start frame | Output file | Spec | Free tool suggestion |
|---|---|---|---|---|
| prompts/leg_0.txt | still_observatory.png | leg_0.mp4 | 16:9, 6-8s, 720p+, no audio | Hailuo (10 free/day, img2vid) / PixVerse (5/day) / wan2.video |
| prompts/leg_0_portrait.txt (same text, portrait note) | still_observatory_portrait.png | leg_0_portrait.mp4 | 9:16 portrait mode, 6-8s | PixVerse portrait / Hailuo portrait |
| prompts/leg_1.txt | leg_0_last.png (I extract + hand over after leg_0 lands) | leg_1.mp4 | 16:9, 6-8s, 720p+, no audio | same |
| prompts/leg_1_portrait.txt | leg_0_portrait_last.png | leg_1_portrait.mp4 | 9:16 portrait | same |

Acceptance: frame 0 of each leg MUST match its start frame (I verify with ffmpeg). No end-frame needed (arch A).

## Assembly (me, when files land)
1. Validate count/size/aspect + frame-0 match.
2. Encode: desktop `ffmpeg -i src -an -vf unsharp -c:v libx264 -preset slow -crf 20 -g 8 +faststart`; mobile 720-wide `-g 4 -crf 23`.
3. Wire into /journey (scaffold ready, stills-only mode now), QA seams + mobile checklist.
