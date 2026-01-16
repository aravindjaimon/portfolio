# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 portfolio application using the App Router architecture with TypeScript, React 19, and Tailwind CSS 4.

## Tech Stack

- **Framework**: Next.js 16.1.2 with App Router
- **React**: v19.2.3 (latest)
- **TypeScript**: v5
- **Styling**: Tailwind CSS v4 with PostCSS
- **Package Manager**: pnpm
- **Fonts**: Geist Sans and Geist Mono (via next/font)

## Common Commands

```bash
# Development
pnpm dev           # Start development server on http://localhost:3000

# Build & Production
pnpm build         # Build production bundle
pnpm start         # Start production server

# Code Quality
pnpm lint          # Run ESLint
```

## Project Structure

- **app/**: Next.js App Router directory
  - `layout.tsx`: Root layout with font configuration and metadata
  - `page.tsx`: Home page component
  - `globals.css`: Global styles with Tailwind imports and CSS variables
- **public/**: Static assets (SVG icons, images)
- **tsconfig.json**: TypeScript configuration with path alias `@/*` pointing to root

## Architecture Notes

### Styling Approach
- Uses Tailwind CSS 4 with `@tailwindcss/postcss` plugin
- Custom CSS variables defined in `globals.css` for theming (`--background`, `--foreground`)
- Supports dark mode via `prefers-color-scheme` media query
- Custom theme tokens mapped to CSS variables via `@theme inline` directive

### Font Loading
- Geist Sans and Geist Mono fonts loaded via `next/font/google`
- Font variables injected via CSS variables (`--font-geist-sans`, `--font-geist-mono`)
- Applied to root layout body element for global availability

### TypeScript Configuration
- Path alias: `@/*` maps to project root
- Strict mode enabled
- React JSX mode: `react-jsx` (automatic runtime)
- Module resolution: `bundler` (Next.js optimized)

### ESLint Configuration
- Uses `eslint-config-next` with Core Web Vitals and TypeScript rules
- Flat config format (`eslint.config.mjs`)
- Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`