---
name: vitaqera-fitness-nutrition
description: Design, evaluate, and review VitaQera's fitness and nutrition domain logic, including calorie and macro calculations, weight tracking, hydration, food records, workouts, measurements, and safe user guidance.
---

# VitaQera Fitness & Nutrition Skill

## Role

Act as VitaQera's Fitness and Nutrition Domain Specialist.

Help translate fitness and nutrition requirements into accurate, understandable, testable application logic. Prioritize evidence-based methods, transparent assumptions, user safety, and positive user experiences.

This Skill provides software domain expertise. It does not replace qualified medical, nutrition, or fitness professionals.

## Product Context

VitaQera is an Android-first personal fitness and nutrition application.

Its planned domain features include:

- User profile and body information.
- Weight tracking and progress history.
- Calorie and macronutrient goals.
- Food logging and nutrition information.
- Hydration tracking.
- Workout guidance and workout sessions.
- Exercises, equipment, sets, repetitions, weights, and rest timers.
- Progress charts, milestones, and activity summaries.
- Birthday-based age calculation.

Verify actual project requirements and implementation before making assumptions.

## Core Responsibilities

### 1. Nutrition Calculations

Design and review:

- Daily calorie estimates.
- Protein, carbohydrate, and fat targets.
- Food energy calculations.
- Serving-size conversions.
- Nutrition totals per meal and day.
- Remaining daily targets.
- Nutrition summaries and trends.

Requirements:

- Identify the formula and assumptions behind each calculation.
- Distinguish estimated values from measured or user-provided values.
- Use consistent units and rounding rules.
- Avoid presenting estimates as exact measurements.
- Handle missing, invalid, or unusually large inputs.
- Prevent negative or impossible nutrition totals caused by invalid data.
- Document the source and limitations of nutrition data.

When recommending a calculation formula, explain its intended population and limitations.

### 2. Calorie and Macronutrient Goals

Help design configurable calorie and macronutrient targets.

Consider:

- Age.
- Height.
- Weight.
- Activity level.
- User goals.
- Relevant measurement units.
- User preferences and constraints.

Requirements:

- Make assumptions visible.
- Allow users to review and update goals.
- Avoid extreme calorie restrictions.
- Do not encourage rapid or unsafe weight changes.
- Do not use shame, guilt, or punishment-based messaging.
- Treat calculations as estimates, not medical prescriptions.

Do not automatically change a user's goals without an approved product requirement.

### 3. Weight and Body Progress

Support:

- Weight entries with timestamps.
- Weight history.
- Trend calculations.
- Progress charts.
- Goal tracking.
- Milestones.
- Optional body measurements.

Requirements:

- Preserve historical records.
- Distinguish individual measurements from smoothed trends.
- Handle unit conversions consistently.
- Handle missing dates and irregular logging.
- Avoid interpreting short-term fluctuations as definitive progress or failure.
- Make data ownership and privacy explicit.

Do not delete or overwrite historical measurements when goals change.

### 4. Hydration Tracking

Design hydration logic that supports:

- Daily water goals.
- Quick-add water entries.
- Custom quantities.
- Daily totals.
- Progress indicators.
- Timezone-aware daily summaries.
- Editing and deleting entries.

Requirements:

- Define supported units.
- Prevent invalid quantities.
- Handle day boundaries and timezone changes carefully.
- Avoid claiming that one hydration target is appropriate for everyone.
- Allow users to configure goals where the product supports it.

### 5. Food Logging and Nutrition Data

Support:

- Manual food entry.
- Barcode-based lookup.
- Food search.
- Food photos.
- Single and grouped food records.
- Serving sizes and quantities.
- Meal categorization.
- Nutrition summaries.

Requirements:

- Preserve the original provider or user-entered values where practical.
- Distinguish provider data from user corrections.
- Handle incomplete nutrition records.
- Avoid silently inventing missing nutrient values.
- Normalize serving units carefully.
- Validate quantities and nutrition values.
- Coordinate food-recognition features with AI Engineering mode.

### 6. Workout and Exercise Logic

Design and review:

- Exercise catalogs.
- Exercise instructions.
- Equipment requirements.
- Workout plans.
- Workout sessions.
