# Remote Worker — Design system

## Purpose

Learning and course discovery for Indonesian adults exploring remote work. Maintain a clear, honest journey with visible class status and a restrained neon accent.

## Visual identity

- Ink #171914; paper #F7F8F0; neon lime #D0FF58; lavender #C9C5FF; peach #FFD7BC.
- Display: Space Grotesk. Reading text: DM Sans, with system fallbacks.
- Dark panels and lime highlights support a contemporary creative identity. Do not replace this with a children's education aesthetic.
- Give content generous spacing, restrained motion, and a consistent rounded button shape.

## Interaction and accessibility

- Use semantic landmarks, one H1, ordered heading levels, and a visible keyboard focus indicator.
- Support a skip link, keyboard navigation, Escape to close menus, and meaningful accessible labels.
- Aim for interactive targets of at least 44×44 CSS pixels with adequate spacing.
- Normal body text targets 16px with at least 1.5 line height; meet 4.5:1 contrast for normal text.
- Support reduced motion, screen zoom, responsive layouts, and no horizontal overflow.
- Use vector icons rather than emoji for functional controls. Decorative visual elements must not add noise for screen readers.
- Do not invent enrollment numbers, testimonials, instructors, dates, job guarantees, or a working payment flow.

## Implementation

Design tokens live in app/globals.css. Mobile navigation is in components/mobile-nav.tsx. Figma is an editable design reference; changes require implementation and testing in the codebase.

This document applies the relevant accessibility, navigation and responsive recommendations from ui-ux-pro-max to the user-approved brand direction.
