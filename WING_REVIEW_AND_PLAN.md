# GeekHaven Website: Wing Review and Build Plan (GameDev + AI/ML)

Date: 2026-02-06
Scope: Review existing work, especially CyberSec, then define a high-impact direction for GameDev and AI/ML wings.

## 1. Current State Snapshot

From `src/app/page.tsx`:

- Live routes:
  - `CyberSec` -> `/cybersec`
  - `Design` -> `/design`
- Placeholder routes (`#`):
  - `WebD`
  - `AppD`
  - `Competitive Coding`
  - `AI/ML`

Note: Home currently lists 6 wings, while the target for the final project is 9 wings.

## 2. What CyberSec Wing Has Built

### Structure

- Entry page renders terminal directly:
  - `src/app/cybersec/page.tsx`
- Main UI logic:
  - `src/app/cybersec/components/Terminal.tsx`
- Command system:
  - `src/app/cybersec/lib/commands.ts`
- Data:
  - `src/app/cybersec/data/society.ts`
  - `src/app/cybersec/data/themes.ts`
- Support components:
  - `HistoryDisplay.tsx`, `CommandInput.tsx`, `FloatingButtons.tsx`

### Experience implemented

- Full terminal-style interface with command input and history.
- Startup banner (`banner` command auto-runs once).
- Command history navigation (ArrowUp/ArrowDown).
- Ctrl+L and `clear` to wipe terminal output.
- Mobile-focused tweaks (100dvh layout, focus handling, padding).
- Framer Motion animations for command entries and floating quick actions.

### Commands and content implemented

- Core commands: `help`, `about`, `team`, `info-coordinators`, `info-members`, `whoami`, `date`, `neofetch`, `exit`.
- Fun/system commands: `matrix`, `hack`, `scan`, `ping`, `curl`, `sudo`.
- Theme command with persistence in localStorage:
  - `theme ls`
  - `theme set <name>`
- Todo subsystem with persistence:
  - `todo add|ls|done|rm|clear`
- Profile-image rendering via output protocol:
  - Output line prefixed with `IMAGE:` is rendered as `<img>`.

### Data model status

- `Member` model includes `name`, `role`, `wing`, `email`, `github`, `linkedin`, `image`, `bio`.
- CyberSec currently uses sample/fake member data (not real team data yet).

### Gaps to fix (important)

1. Missing team images:
- Data references `/team/*.jpg`, but `public/team` does not exist.
- Result: image display commands will show broken images.

2. Social links are stored but not surfaced in command output:
- `info-coordinators`/`info-members` print name, role, email, bio.
- `github` and `linkedin` fields are not printed/clickable yet.

3. Some commands are placeholder quality:
- `weather` returns static "Weather unavailable.".
- `curl`/`ping` are mock text only.

4. App metadata still terminal-centric:
- `src/app/layout.tsx` title/description still describe a terminal project.

## 3. Direction for Your Assigned Wings

Constraint from your team: WebD will be done later by all 4 people together.

## 4. GameDev Wing Concept (Recommended)

Recommended concept name: `The Forge`

Goal: Make a 3D-first page that feels like a playable game lobby, not a static portfolio grid.

### Core experience loop

1. Landing shot: cinematic camera fly-in over a low-poly scene (arena/workshop/city block).
2. Interactive hotspots: click objects to reveal wing content.
3. Member reveal: each hotspot opens coordinator/member cards with social links.
4. Projects board: cards appear as "quest cards" with tags (Unity, Unreal, Godot, Blender).
5. Final CTA: "Join GameDev" terminal-like prompt or Discord button.

### Hotspot mapping idea

- Arcade Cabinet -> Ongoing projects
- Trophy Shelf -> Achievements
- Control Room Screen -> Coordinators
- Character Select Podium -> Member cards

### Stack

- `three`
- `@react-three/fiber`
- `@react-three/drei`
- existing `framer-motion` for 2D overlays

### Quality bar

- Maintain 60fps on average laptops.
- Use compressed textures and low-poly assets.
- Provide fallback mode: if WebGL fails, show a clean non-3D wing page.

## 5. AI/ML Wing Representation Ideas

AI/ML should not look like "just floating neural network lines". It should tell a story of data -> training -> inference -> impact.

### Option A (Recommended): `Pipeline Observatory`

A 4-stage vertical/horizontal interactive pipeline:

1. Data Ingestion
2. Model Training
3. Evaluation
4. Deployment

Each stage unlocks:
- coordinators/members working in that area,
- featured projects,
- tools used (PyTorch, TensorFlow, HuggingFace, OpenCV, LangChain, etc.).

### Option B: `Model Zoo Command Center`

- Cards as "model pods" (CV, NLP, GenAI, Recsys).
- Hover/click runs fake inference animation with sample outputs.
- Member cards grouped by expertise pod.

### Option C: `AI Lab Wall`

- Interactive wall of experiments (tiles).
- Opening a tile reveals experiment summary, metrics, member owners, repo/demo links.

### AI/ML visual language guidance

- Use clean scientific palette (not hacker palette).
- Add subtle data-flow animation and confidence meter visuals.
- Avoid overusing matrix-like effects (already covered by CyberSec style).

## 6. Shared Content/Data Spec for All Wings

Use one consistent schema to keep all wing pages uniform:

```ts
export type WingMember = {
  id: string;
  name: string;
  role: string;            // Coordinator, Member, Lead, etc.
  wing: string;
  image: string;           // local path or trusted URL
  email?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  twitter?: string;
  bio?: string;
  tags?: string[];         // Unity, CV, NLP, etc.
};
```

Content checklist per person:

- Full name
- Wing + role
- Image (uniform ratio, recommended 1:1)
- LinkedIn URL
- Optional: GitHub, portfolio, X/Twitter
- 1-line bio

## 7. Suggested Implementation Plan (Next Phase)

1. Create routes:
- `src/app/gamedev/page.tsx`
- `src/app/aiml/page.tsx`

2. Add shared wing data layer:
- `src/data/wings/gamedev.ts`
- `src/data/wings/aiml.ts`

3. Build GameDev MVP first:
- Hero 3D scene + 3 clickable hotspots + member modal panel.

4. Build AI/ML MVP second:
- Pipeline section + member/project cards + social links.

5. Update home route cards:
- Wire `GameDev` and `AI/ML` from `#` to real routes.

6. Backfill real member/coordinator data for both wings.

7. Validate:
- Mobile layout
- Keyboard accessibility for clickable sections
- Performance (LCP and interaction smoothness)

## 8. Immediate Action Items Before Coding Your Wings

- Confirm exact list of real GameDev and AI/ML coordinators/members.
- Collect real image assets and social URLs.
- Decide single visual concept for GameDev (`The Forge` recommended).
- Decide single visual concept for AI/ML (`Pipeline Observatory` recommended).
- Keep WebD untouched for now as team agreed.

