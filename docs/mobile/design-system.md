# VitaQera — Mobile Design System

## 1. Purpose

This document defines the visual design language, interaction patterns, and user experience standards for the VitaQera mobile application.

It provides a shared reference for the UI/UX Designer, Mobile Engineer, and QA Engineer.

The goal is to deliver a consistent, accessible, polished, and maintainable Android-first experience.

## 2. Design Direction

VitaQera's approved visual direction:

- **Style:** Modern, minimal, clean, and premium.
- **Primary appearance:** Light ocean-blue visual identity.
- **Layout:** Flat, structured, and easy to navigate.
- **Typography:** Sora for headings and Manrope for body text.
- **Experience:** Friendly, upbeat, motivating, and approachable.
- **Platform priority:** Android first, with future iOS compatibility.

The design should feel polished without unnecessary decoration or visual complexity.

## 3. Design Principles

### Clarity

- Make important information easy to understand.
- Use clear labels and predictable interactions.
- Avoid unnecessary visual elements.
- Keep important actions discoverable.

### Consistency

- Reuse approved design tokens and components.
- Maintain consistent spacing, typography, and interaction patterns.
- Avoid introducing competing visual styles.

### Motivation

- Encourage healthy habits and progress.
- Use positive, supportive language.
- Avoid guilt, shame, or judgment around weight, food, fitness, and missed goals.

### Accessibility

- Maintain readable typography and sufficient contrast.
- Support accessible touch targets.
- Provide meaningful labels for interactive elements.
- Do not communicate important information through color alone.

### Maintainability

- Prefer reusable components.
- Keep design tokens centralized.
- Avoid duplicated styling values.
- Separate design decisions from screen-specific implementation.

## 4. Design Tokens

The mobile application's `src/theme/theme.ts` is the single source of truth for design tokens.

Do not introduce separate competing token systems.

The token system should cover:

| Token Group | Responsibility                                                   |
| ----------- | ---------------------------------------------------------------- |
| Colors      | Brand, backgrounds, surfaces, text, borders, and semantic states |
| Typography  | Font families, sizes, weights, and line heights                  |
| Spacing     | Consistent layout and component spacing                          |
| Radius      | Corner rounding                                                  |
| Elevation   | Surface hierarchy and shadows                                    |
| Sizing      | Component dimensions and layout constraints                      |
| Opacity     | Consistent transparency values                                   |
| Motion      | Animation durations and interaction timing                       |

Exact token values must be taken from the approved implementation, not invented in documentation.

## 5. Color System

The approved visual direction uses a light ocean-blue identity.

The color system should provide semantic roles for:

- Primary brand color.
- Secondary brand color.
- Screen background.
- Surface and elevated surface.
- Primary text.
- Secondary text.
- Muted text.
- Borders and dividers.
- Success.
- Warning.
- Error.
- Informational feedback.
- Disabled states.

### Color Rules

- Prefer semantic token names over raw hexadecimal values.
- Maintain readable contrast.
- Use semantic colors consistently.
- Avoid introducing new colors without design review.
- Support future dark mode without duplicating screen-specific styling.

## 6. Typography

Approved font families:

| Usage     | Font    |
| --------- | ------- |
| Headings  | Sora    |
| Body text | Manrope |

Typography hierarchy should distinguish:

- Display headings.
- Screen titles.
- Section headings.
- Card titles.
- Body text.
- Secondary descriptions.
- Captions.
- Button labels.
- Form labels.
- Numeric metrics.

### Typography Rules

- Use consistent font weights and line heights.
- Avoid excessive font-size variations.
- Maintain readability at different accessibility font scales.
- Use tabular or aligned numeric presentation where appropriate for metrics.
- Avoid relying on font weight alone to communicate meaning.

## 7. Spacing and Layout

Use the centralized spacing tokens.

Layout standards:

- Maintain consistent screen margins.
- Use predictable spacing between sections.
- Group related content.
- Keep important actions visually accessible.
- Avoid overcrowded screens.
- Use scrolling for content that cannot reasonably fit.
- Account for Android system bars, safe areas, and keyboard behavior.

Do not introduce arbitrary spacing values when an approved token already exists.

## 8. Components

Reusable components should follow consistent visual and behavioral standards.

Expected component categories include:

### Buttons

Support appropriate variants such as:

- Primary.
- Secondary.
- Outline.
- Text.
- Destructive.
- Disabled.
- Loading.

Buttons must communicate their action clearly and prevent accidental repeated submissions where relevant.

### Inputs

Support:

- Clear labels.
- Helpful placeholders.
- Validation messages.
- Disabled and read-only states.
- Appropriate keyboard types.
- Password visibility controls when applicable.

### Cards

Use cards to group related information, metrics, and actions.

Avoid unnecessary nesting and excessive decoration.

### Modals and Dialogs

- Use clear titles and descriptions.
- Provide understandable actions.
- Prevent accidental destructive operations.
- Support Android back-button behavior where appropriate.

### Feedback Components

Define consistent patterns for:

- Loading indicators.
- Empty states.
- Success messages.
- Error messages.
- Confirmation dialogs.
- Offline and network states.

## 8.1 Reusable Component Architecture

Reusable components are a core requirement of VitaQera's mobile architecture.

The application must prioritize reusable, composable, and maintainable UI components instead of duplicating interface implementations across screens.

### Component Organization

Use three conceptual layers:

**1. Base UI Components**

Generic components that provide consistent appearance and behavior.

Examples:

- Button
- Text
- TextInput
- Icon
- Card
- Divider
- Avatar
- Badge
- Spinner
- Checkbox
- RadioButton
- Switch
- ProgressBar
- Skeleton
- BottomSheet
- Modal
- EmptyState
- ErrorState

**2. Shared Composite Components**

Components combining base UI components to support repeated interface patterns.

Examples:

- ScreenHeader
- SearchBar
- FormField
- PasswordField
- ConfirmationDialog
- SectionHeader
- MetricCard
- ProgressCard
- LoadingState
- ErrorStateView
- EmptyStateView
- DatePickerField

**3. Feature-Specific Components**

Components belonging to a particular product feature.

Examples:

- Nutrition: MacroCard, MealCard, FoodItem, CalorieSummary
- Fitness: WorkoutCard, ExerciseItem, SetRow, RestTimer
- Hydration: WaterProgress, WaterLogItem
- Progress: WeightChart, MeasurementCard, MilestoneCard
- Profile: ProfileHeader, ProfileInformationCard

Feature-specific components should reuse base UI components whenever practical.

### Component Rules

- Build reusable components before duplicating the same UI pattern across screens.
- Keep components focused on a clear responsibility.
- Prefer composition over large components with many unrelated responsibilities.
- Support appropriate variants and states through typed props.
- Use centralized design tokens.
- Provide accessible labels and interaction behavior.
- Avoid embedding feature-specific business logic inside generic UI components.
- Keep API requests and database operations outside presentational components.
- Avoid unnecessary abstractions for components used only once without a clear reuse requirement.
- Do not create multiple components that perform the same role without justification.

### Component Ownership

| Component Layer  | Ownership                |
| ---------------- | ------------------------ |
| Base UI          | Shared mobile components |
| Shared Composite | Shared mobile components |
| Feature-Specific | Relevant feature module  |
| Screen           | Expo Router screen       |

The exact folder structure must follow the existing mobile architecture and be verified before implementation.

### Component Quality Requirements

Every reusable component should be reviewed for:

- Clear responsibility.
- Typed props.
- Consistent styling.
- Supported variants and states.
- Accessibility.
- Responsive behavior.
- Reusability.
- Testability.
- Documentation when its behavior is not self-explanatory.

### Component Change Control

Before creating a new shared component, inspect existing components to avoid duplication.

Changes to shared components must consider their impact on every screen and feature that uses them.

The Mobile Engineer owns implementation, the UI/UX Designer owns design consistency, and QA validates component behavior.

## 9. Screen Layout Standards

Screens should follow a consistent structure:

1. System-safe screen area.
2. Screen header or title.
3. Main content.
4. Supporting sections.
5. Contextual actions or navigation.

The exact structure may vary depending on the screen's purpose.

### Dashboard

Prioritize the most useful daily information, including relevant nutrition, activity, hydration, and progress summaries.

### Profile and Onboarding

Use clear forms, logical grouping, and understandable explanations.

### Nutrition

Present calories, macronutrients, food information, and meal records clearly.

### Fitness

Make workout instructions, sets, repetitions, weights, and rest information easy to follow.

### Progress

Present trends and milestones in a readable, encouraging way.

Avoid presenting health or fitness metrics in a judgmental manner.

## 10. Navigation and Interaction

- Use predictable navigation patterns.
- Maintain clear active and inactive navigation states.
- Avoid unnecessary navigation depth.
- Preserve appropriate screen state when navigating.
- Prevent accidental loss of unsaved input.
- Provide clear back-navigation behavior.
- Support Android hardware and system navigation conventions.

Navigation architecture must remain consistent with the approved Expo Router implementation.

## 11. Forms and Validation

Forms should:

- Use clear labels.
- Group related fields.
- Explain validation errors.
- Preserve user input when appropriate.
- Use suitable keyboard types.
- Prevent invalid submissions.
- Communicate loading and submission states.

Validation should be consistent with backend rules.

Client-side validation must not replace backend validation.

## 12. Accessibility

Accessibility requirements include:

- Meaningful accessible labels.
- Appropriate screen-reader descriptions.
- Sufficient text and control contrast.
- Accessible touch targets.
- Logical focus order.
- Support for text scaling.
- Clear validation and error announcements.
- Reduced-motion considerations.
- No color-only communication.

QA should include accessibility checks during component and screen testing.

## 13. Motion and Haptic Feedback

Motion should support usability rather than distract from it.

Use animations for meaningful transitions, feedback, and state changes.

Guidelines:

- Keep animations purposeful.
- Avoid excessive movement.
- Respect reduced-motion preferences.
- Avoid blocking important interactions.
- Use haptic feedback only when it adds meaningful confirmation.
- Keep timing and behavior consistent.

## 14. Icons, Images, and Assets

- Use a consistent icon family and visual style.
- Prefer recognizable icons.
- Provide accessible labels for meaningful icons.
- Use appropriate image formats and sizes.
- Optimize image assets for mobile performance.
- Avoid unnecessary decorative assets.
- Do not use unlicensed assets.
- Keep asset naming and organization consistent.

## 15. Inspiration Review and Approval

Design inspiration may come from:

- Screenshots.
- Mobile applications.
- Websites.
- Figma files.
- Design systems.
- Images and visual references.

The UI/UX Designer must evaluate submitted inspiration before implementation.

### Review Criteria

- Visual quality.
- Usability.
- Accessibility.
- Compatibility with VitaQera's identity.
- Technical feasibility.
- Performance implications.
- Consistency with existing design decisions.

### Review Outcomes

1. **Approved:** Inspiration can guide the proposed design.
2. **Approved with Modifications:** Selected ideas may be adapted.
3. **Rejected:** Inspiration should not be used as the implementation direction.

Approval of inspiration does not automatically authorize implementation.

The user must separately approve proposed project changes.

## 16. Figma and Design Handoff

When Figma is used:

- Organize screens and components clearly.
- Use reusable components where appropriate.
- Apply consistent naming.
- Document component states.
- Include relevant interaction behavior.
- Keep designs aligned with approved tokens.
- Identify assets and implementation requirements.

The Mobile Engineer should review the handoff before implementation.

## 17. Design Implementation Rules

- Use `theme.ts` as the token source of truth.
- Follow the existing project architecture.
- Prefer reusable components.
- Avoid duplicated styles.
- Keep screen-specific styles close to their relevant components.
- Follow approved typography and color usage.
- Avoid introducing new UI libraries without approval.
- Preserve existing accessibility behavior.
- Validate the implementation against approved designs.

## 18. Design Quality Review

Before a screen is considered complete, review:

- Visual consistency.
- Typography.
- Spacing and alignment.
- Component behavior.
- Loading, empty, error, and disabled states.
- Accessibility.
- Android device compatibility.
- Keyboard and navigation behavior.
- Performance.
- Consistency with approved designs.

QA should verify both functionality and visual behavior.

## 19. Change Control

- The UI/UX Designer proposes design changes.
- The Mobile Engineer evaluates implementation implications.
- The Project Architect coordinates cross-project changes.
- The QA Engineer validates completed screens.
- The user retains final approval authority for project modifications.

Significant design-system changes should be recorded through an Architecture Decision Record when appropriate.

## 20. Maintenance

Update this document when approved changes affect:

- Visual identity.
- Design tokens.
- Typography.
- Reusable components.
- Navigation patterns.
- Accessibility standards.
- Motion behavior.
- Design handoff requirements.

Keep documentation aligned with the actual implementation.
