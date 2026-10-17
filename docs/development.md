# Development

## Setup

The web app builds inside the [TaksuTech](https://github.com/DarmawanWeb/TaksuTech) workspace,
which holds the lockfile and the shared packages (`@taksu/content`, `@taksu/ui`, `@taksu/bali`,
`@taksu/typescript-config`).

```bash
git clone --recursive https://github.com/DarmawanWeb/TaksuTech.git && cd TaksuTech
corepack enable                 # pnpm 10, Node 22.12 or newer
pnpm install                    # also points this submodule's git hooks at the workspace's
cp apps/robot/.env.example apps/robot/.env.local
pnpm dev:robot                  # http://localhost:3104/id
pnpm dev:kiosk                  # http://localhost:3101/id, for the demo links
```

The example file points the demo links at the local kiosk app and the footer at a local company
profile. Set `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local` to try the WhatsApp side of the demo
request; with it empty the form sends email only.

## Scripts

Run from the workspace root (`pnpm --filter @taksu/robot <script>`) or from `apps/robot`.

| Script | Does |
|---|---|
| `dev` | Next.js dev server on port 3104 |
| `build`, `start` | Production build (standalone) and server on port 3104 |
| `typecheck` | `next typegen`, then `tsc --noEmit` |
| `test` | Vitest: the two message files have the same keys; kiosk, company, WhatsApp, and mail links |
| `lint` | Biome lint |

`pnpm check` at the workspace root runs `biome ci .` and every typecheck and test.

## Commits

This is its own repository: commit inside `apps/robot` and push it, then record the new commit in
the workspace (`git add apps/robot`, `chore: update robot`). The workspace's hooks run here too:
lint-staged formats the staged files with Biome, and commitlint checks the message (Conventional
Commits, lower-case subject). This app's scope is `robot`.

## Recipes

**A page.** Add `src/app/[locale]/<path>/page.tsx` with `generateMetadata` using
`localeFromParams(params)` and `pageMetadata({ locale, path, title, description })`, and
`resolveLocale(params)` in the page. Robot pages sit at the top level, so the path must not be a
robot's slug. Link to it with `Link` from `@/i18n/navigation`, add it to the menus in
`site-header.tsx` and `site-footer.tsx` if it belongs there, and add it to `staticPaths` in
`src/app/sitemap.ts`.

**A string in both languages.** Add the key to both `messages/id.json` and `messages/en.json`. The
typecheck rejects a key missing from `id.json`, and the messages test rejects files whose keys
differ. Use ICU arguments for counts and choices, as `Home.bali.nextHoly` and `Robots.price` do.
Never type the line's name: pass `names.robot` in as `{brand}`.

**A robot or a spec.** Change `packages/content/src/reception.ts` in the workspace, not this app:
specs, features, Balinese touches, heights, price tiers, and the `comparison` rows live there, with
every text in both languages. The line-up, the compare table, the robot pages, the menus, the
sitemap, the contact form, and `/demo` pick the change up.
- A height above 175 cm needs a taller ruler (`RULER_CM` in `components/robots/lineup.tsx`).
- A new robot also needs its slug in `RobotSlug`, a value in every `comparison` row (a content test
  checks this), a `demoSite` that exists in `packages/content/src/sites`, its illustration in
  `@taksu/ui` (`RobotIllustration`), a crop in `lineup.tsx`, its image in `[robot]/page.tsx`, and
  its start screen in `src/lib/screens.ts`. The line-up and the demo cards are laid out for three.

**An Aksara Bali text.** Use `<AksaraText latin="..." />` from `@taksu/ui/brand/aksara-text`, or the
`aksara` prop of `SectionHeading` for a line above a heading. Write `é` for the taling sound; plain
`e` reads as pepet. Mark a line that repeats Latin text already on screen as `decorative`. Pass a
phrase with an established spelling as `aksara`, as the hero does with `OM_SWASTIASTU`. A word that
comes out wrong is fixed in `@taksu/bali` (`packages/bali/src/aksara.ts`, which has a small lexicon
for names), with a test in `aksara.test.ts`. Official signage text must be reviewed by a Balinese
language adviser.

**A screen capture.**
1. Run the kiosk app (`pnpm dev:kiosk`) and open the screen at its demo venue in both languages.
2. Capture it at the size of the existing files: 1600 x 900 for Snow's and Timo's screens,
   900 x 1600 for the Taksu Kiosk totem. Save it as WebP under the same name in
   `src/assets/screens/id/` and `src/assets/screens/en/`.
3. To replace a capture, overwrite both files. A new one is imported in `src/lib/screens.ts` and
   added to `screens` under a new key; the typecheck requires it in each language. A new tab on
   the home page also needs its id in `showcaseScreens` and a `title`, `body`, and `alt` under
   `Home.showcase.screens` in both message files.
4. The note under the tabs says the captures come from the Timo demo at a public service office,
   with sample data. Keep it true.

## Design rules

- Tokens, not hex codes: `bg-background`, `bg-surface`, `text-primary`, `text-muted-foreground`,
  `border-border`, `text-subak`, and `font-display` from `@taksu/ui/theme.css`. A night-indigo band
  is `dark bg-background`. Raw colours only inside illustrations, such as the screen frames around
  the captures and the sign board on `/aksara-bali`.
- Bali styling stays here: Aksara Bali, the poleng band, and the candi bentar mark belong to this
  line and the kiosk. The company profile (`company.css`) and the education robots (`taksu.css`
  in `packages/edu-ui`) stay plain.
- Keyboard focus stays visible; motion respects `prefers-reduced-motion`; decorative Aksara lines
  are hidden from screen readers; every image has an alt text in both languages or `alt=""` when
  it is decorative; a link that opens a demo says it opens a new tab.
- Honest copy: Taksu Tech label only, with no OEM brand names or model codes in copy, specs, or
  images. No TKDN percentage for Taksu Kiosk before certification. Sample venue data is labelled
  as sample data.

## CI

[ci.yml](../.github/workflows/ci.yml) checks out the TaksuTech workspace with its submodules,
replaces `apps/robot` with the commit under test, installs, and runs Biome, the typecheck, the
tests, and the build for `@taksu/robot`. On pull requests it also runs commitlint. Images are
built by the workspace repository and published as `ghcr.io/darmawanweb/reception-robot-web`.
