# VitaQera Mobile Agent Guidelines

This is the VitaQera Expo/React Native mobile application.

Prioritize mobile-first patterns, performance, accessibility, and cross-platform compatibility. Follow the existing monorepo architecture and project conventions.

## Expo Documentation

Expo ships breaking changes across SDK releases. Do not rely on remembered APIs.

Before writing code that touches Expo, EAS, or React Native APIs:

1. Read the Expo major version in `package.json`.
2. Consult the matching versioned documentation: `https://docs.expo.dev/versions/v<major>.0.0/`
3. Consult `https://docs.expo.dev/llms.txt` when additional documentation context is needed.
4. Verify APIs against documentation matching the installed SDK.

## Package Manager

This project uses **pnpm through Corepack**.

Always run commands from the monorepo root unless a command explicitly requires another working directory.

```bash
pnpm install

pnpm mobile:start
pnpm mobile:android
pnpm mobile:lint
pnpm mobile:typecheck
pnpm mobile:check
```

### Dependency Management

Use `pnpm --filter @vitaqera/mobile exec expo install <package>` for Expo and React Native dependencies so compatible versions are selected for the installed SDK.

Check Expo dependency compatibility with:

```bash
pnpm mobile:check
```

Before adding dependencies, inspect the existing package configuration and check Expo compatibility.

Run lint and TypeScript checks before declaring a task complete.

## Monorepo Structure

- `apps/mobile/`: Expo mobile application.
- `apps/api/`: Backend application.
- `packages/`: Shared packages.
- `infrastructure/`: Infrastructure configuration.
- `docs/`: Project documentation.

Do not create shared packages inside `apps/mobile/src/`.

## Navigation and Routing

- Use Expo Router for navigation.
- Routes live in `src/app/`.
- `_layout.tsx` files define navigators and layouts.
- Keep reusable components, hooks, utilities, and business logic outside `src/app/`.
- Use route groups such as `(auth)`, `(onboarding)`, and `(tabs)` where appropriate.
- Use components for modals that do not need their own navigable route.

Documentation: https://docs.expo.dev/router/introduction/

## Native Development

- If `ios/` and `android/` directories do not exist, Expo Continuous Native Generation manages them.
- Do not create or edit generated native directories manually.
- Configure native behavior through `app.json` and Expo config plugins.
- Expo Go only supports native modules included in its installed runtime. Some dependencies require a development build.

Documentation: https://docs.expo.dev/develop/development-builds/introduction/

## EAS

Use EAS for cloud builds, submissions, and OTA updates when the project is ready.

Run EAS CLI through pnpm:

```bash
pnpm dlx eas-cli@latest <command>
```

Documentation: https://docs.expo.dev/eas/

## Project Rules

- Inspect existing code before modifying it.
- Avoid unnecessary architecture changes or duplicate implementations.
- Follow the existing TypeScript and StyleSheet conventions.
- Reuse centralized design tokens from `src/theme/theme.ts`.
- Keep secrets in environment variables. Never commit credentials or private keys.
- Do not commit, push, or change branches unless explicitly requested.
- Do not implement future phases before the current phase is approved and completed.
- Verify changes with relevant tests, lint, and type checks.
