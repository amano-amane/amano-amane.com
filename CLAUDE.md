# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio website for indie game creator "天野あまね" (Amano Amane).
- Domain: amano-amane.com
- Single-page application with anchor navigation (#hero, #about, #works, #skills, #links, #contact)
- Design concept: Kawaii Pop × Cyber (vivid colors, pink × navy)
- Anonymous operation (no real name/company disclosed)

## Tech Stack

- **Frontend**: Vue.js 3 + TypeScript + Vite + SCSS
- **Infrastructure**: AWS (S3 + CloudFront + Route 53 + ACM)

## Development Commands

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to S3 (requires AWS CLI configured)
aws s3 sync dist/ s3://amano-amane.com --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id [DISTRIBUTION_ID] --paths "/*"
```

## Project Structure

```
mem-portfolio/
├── docs/                    # Project documentation (Japanese)
│   ├── 01_overview.md       # Project overview
│   ├── 02_requirements.md   # Functional requirements
│   ├── 03_design.md         # Design guidelines (colors, typography)
│   ├── 04_content.md        # Content plan
│   ├── 05_technical_spec.md # Technical specifications
│   ├── 06_aws_setup.md      # AWS setup instructions
│   └── 07_development_plan.md
└── frontend/                # Vue.js application
    └── src/
        ├── components/
        │   ├── layout/      # AppHeader, AppFooter
        │   ├── sections/    # HeroSection, AboutSection, etc.
        │   └── ui/          # WorkCard, SkillIcon, LinkButton
        ├── data/            # Static data (works.ts, skills.ts, links.ts)
        ├── types/           # TypeScript type definitions
        └── assets/styles/   # SCSS (_variables.scss, global.scss)
```

## Architecture

- Single-page application with section-based navigation
- No Vue Router needed (anchor links only)
- Static data stored in TypeScript files under `src/data/`
- AWS S3 for static hosting, CloudFront for CDN/SSL

## Design System

Primary colors (defined in `docs/03_design.md`):
- Mem Pink: `#FF6B9D` (main accent)
- Cyber Navy: `#1A1B3A` (base/text)
- Electric Cyan: `#00D4FF` (highlight/links)

## Important Notes

- All documentation is in Japanese
- Code will be published publicly on GitHub
- ACM certificates must be created in `us-east-1` for CloudFront
