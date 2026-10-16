<div align="center">

<img src="docs/logo.svg" width="96" alt="Taksu Tech reception robots logo">

# Taksu Reception Robots web

**The product site for Taksu Tech's reception robots in Bali: a line-up drawn to the robots' real
heights, a page and a kiosk demo for each robot, a side-by-side comparison, Aksara Bali signage,
and the Pawukon calendar, in Indonesian and English.**

[![CI](https://github.com/DarmawanWeb/reception-robot-web/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/DarmawanWeb/reception-robot-web/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/DarmawanWeb/reception-robot-web?label=release&color=26338a)](https://github.com/DarmawanWeb/reception-robot-web/releases)
![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-6%20strict-3178C6?logo=typescript&logoColor=white)
![Aksara Bali](https://img.shields.io/badge/Aksara-Bali-1d7466)
![Languages](https://img.shields.io/badge/UI-Indonesia%20%7C%20English-e6bd52)
[![License](https://img.shields.io/badge/license-proprietary-26338a)](LICENSE)

[Features](#features) · [Structure](#structure) · [Documentation](#documentation) · [Develop](#develop)

</div>

---

Part of [Taksu Tech](https://github.com/DarmawanWeb/TaksuTech), which deploys it as `robot` at
[taksu-robot.agus-darmawan.com](https://taksu-robot.agus-darmawan.com). The line is made for Bali:
Snow and Timo in a Bali Edition, and Taksu Kiosk, a static kiosk Taksu Tech builds itself.
Next.js 16 (App Router), React 19, Tailwind 4 and next-intl. The robots and their specs come from
`@taksu/content`, so this repository builds inside the workspace, as `apps/robot`. v1.0.0 is the
version built in the Taksu Tech monorepo; its history came along when it moved here.

The robots' screens run the [kiosk app](https://github.com/DarmawanWeb/reception-robot-kiosk), which
the demo links open. There is no backend: a demo request leaves as a WhatsApp message or an email.

## Features

**Robots**
- **Home**: Om Swastiastu in Aksara Bali, the line-up, the kiosk app's screens, why the robots stay
  in daily use, today's Pawukon day, venues by use case, and how installation works.
- **Line-up**: the three robots on one floor line, drawn to their real heights, each with its
  height, escort, printer, price tier, and demo.
- **Robot pages** (`/snow`, `/timo`, `/kiosk`): summary, specifications, local content, features,
  Balinese touches, ideal venues, and the robot's own start screen next to its demo.
- **Compare** (`/compare`): the three side by side, from form and printing to TKDN and price tier.

**Bali**
- **Aksara Bali** (`/aksara-bali`): the rule (Pergub Bali 80/2018, Perda Bali 1/2018), a live sign
  with Aksara Bali above the Latin, a guest-name writer, and the review note for official signs.
- **Pawukon**: today's day, its holy day, and the next one, worked out in the browser in Bali time.

**Demos**
- **Screens**: kiosk app captures in both languages behind tabs: main menu, conversation, queue,
  guest book, directions, and a name in Aksara Bali.
- **Demo** (`/demo`): each robot at its sample venue, the Studio, and the kiosk launcher.

**Contact and reach**
- **Contact** (`/contact`): a demo request form that opens as a WhatsApp message or an email.
- A not-found page, a sitemap, robots rules, and a social card per language.

## Structure

```
src/
  app/[locale]/        pages: home, [robot], compare, aksara-bali, demo, contact, [...rest]
  components/          layout, robots (line-up, screen tabs, why venues, use cases), contact, shared
  lib/                 kiosk, company, WhatsApp, and mail links; screens; metadata; site config
  i18n/                routing (/id and /en), request, navigation
  assets/              the robot images; kiosk app captures in screens/id and screens/en
messages/              id.json and en.json; a test keeps their keys equal
public/og/             social cards, 1200 x 630, one per language
```

Colours, type, poleng bands, and the mark come from `@taksu/ui` (`theme.css`, the reception line's
Bali theme). Bali styling belongs only to this line and the kiosk; the education robots and the
[company profile](https://github.com/DarmawanWeb/company-profile) stay plain.

## Documentation

| Document | Contents |
|---|---|
| [Architecture](docs/architecture.md) | Stack, routes and languages, where the robot facts come from, Aksara Bali and the Bali theme, kiosk captures and demo links, the demo request, metadata and sitemap, configuration |
| [Development](docs/development.md) | Running inside the workspace, scripts, commits, recipes for a page, a string, a robot or spec, an Aksara Bali text, and a screen capture, design rules, CI |

## Develop

```bash
git clone --recursive https://github.com/DarmawanWeb/TaksuTech.git && cd TaksuTech
pnpm install                       # the workspace, plus this submodule's commit hooks
cp apps/robot/.env.example apps/robot/.env.local
pnpm dev:robot                     # http://localhost:3004/id
pnpm dev:kiosk                     # http://localhost:3001/id, for the demo links
pnpm --filter @taksu/robot test    # message keys and links
```

CI ([ci.yml](.github/workflows/ci.yml)) checks out the TaksuTech workspace, puts this commit at
`apps/robot`, and runs Biome, the typecheck, the tests, and the build. The images
(`ghcr.io/darmawanweb/reception-robot-web`) are built by the TaksuTech repository.

Proprietary. Copyright (c) 2026 Taksu Tech, part of Ezra Robotics. All rights reserved.
