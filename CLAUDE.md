# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio website for indie game creator "天野あまね" (Amano Amane).
- Domain: amano-amane.com
- Single-page application with anchor navigation (#hero, #about, #works, #skills, #links, #contact)
- Design concept: Kawaii Pop × Cyber (vivid colors, pink × navy)
- Anonymous operation (no real name/company disclosed)

## Tech Stack

- **Frontend**: Vue.js 3 + TypeScript + Vite + SCSS + vite-ssg (SSG)
- **Infrastructure**: Cloudflare Workers + Cloudflare DNS/CDN/SSL
- **Icons**: Phosphor Icons (Vue) + custom SVG for brand logos

## Development Commands

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (includes TypeScript check)
npm run build

# Manual deploy to Cloudflare Workers
npx wrangler deploy
```

## Pre-Commit Workflow

**IMPORTANT**: Always run `npm run build` before committing to catch TypeScript errors. The build includes `vue-tsc` which enforces strict type checking (`noUnusedLocals`, `noUnusedParameters`).

```bash
cd frontend && npm run build && cd .. && git add -A && git commit -m "message"
```

## Deployment

- **Automatic**: Push to `main` branch triggers Cloudflare Workers auto-deploy
- **Manual**: `cd frontend && npx wrangler deploy`

## Architecture

- Single-page application with section-based navigation (no Vue Router)
- Static data stored in TypeScript files under `src/data/`
- SSG (Static Site Generation) via vite-ssg for performance
- Font preload generation script runs automatically on build

## Design System

Primary colors (defined in `frontend/src/assets/styles/_variables.scss`):
- Mem Pink: `#FF1493` (main accent)
- Cyber Navy: `#1A1B3A` (base/text)
- Electric Cyan: `#00D4FF` (highlight/links)

## Important Notes

- All documentation in `docs/` is in Japanese
- TypeScript strict mode is enabled - unused variables cause build failures
- `docs/06_aws_setup.md` is deprecated (migrated to Cloudflare)
- Current Cloudflare setup documented in `docs/08_cloudflare_migration.md`
