# VitaQera Mobile

VitaQera is a personal fitness and nutrition application built with React Native and Expo. The mobile application is developed Android-first.

## Technology Stack

- Expo SDK 58
- React Native 0.88
- React 19
- TypeScript
- Expo Router
- Zustand
- StyleSheet
- Drizzle ORM and SQLite (planned integration)
- Better Auth (planned integration)

## Prerequisites

- Node.js (compatible with the project dependencies)
- Corepack enabled
- pnpm
- Android device with Expo Go or an Android emulator

## Installation

Run commands from the monorepo root:

```bash
pnpm install
```

## Development

Start the Expo development server:

```bash
pnpm mobile:start
```

Start with Android:

```bash
pnpm mobile:android
```

## Quality Checks

Run ESLint:

```bash
pnpm mobile:lint
```

Run TypeScript checks:

```bash
pnpm mobile:typecheck
```

Check Expo dependency compatibility:

```bash
pnpm mobile:check
```

## Project Structure

```text
apps/mobile/
├── assets/
│   ├── fonts/
│   └── images/
├── src/
│   ├── app/          # Expo Router routes and layouts
│   ├── components/   # Reusable UI components
│   ├── features/     # Feature-specific modules
│   ├── lib/          # Shared utilities and configurations
│   ├── services/     # API and external service integrations
│   ├── stores/       # Zustand stores
│   └── theme/        # Design tokens and theme
├── app.json
├── package.json
└── tsconfig.json
```

## Development Guidelines

- Follow the existing monorepo structure.
- Keep shared packages in the root `packages/` directory.
- Use Expo Router for navigation.
- Keep feature-specific components inside their respective feature modules.
- Use the centralized theme for colors, typography, spacing, and other design tokens.
- Prioritize accessibility, performance, and cross-platform compatibility.
- Do not introduce dependencies without checking Expo SDK compatibility.
