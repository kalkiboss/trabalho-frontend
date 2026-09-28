---
version: alpha
colors:
  primary: "#294b49"
  primaryDark: "#1e3836"
  background: "#f6f8f5"
  surface: "#ffffff"
  mutedSurface: "#eaf1ed"
  text: "#233331"
  secondaryText: "#546965"
  border: "#d4e1da"
typography:
  display:
    fontFamily: 'Georgia, "Times New Roman", serif'
  body:
    fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif'
rounded:
  card: "18px"
  control: "9px"
omitted:
  - section: spacing
    reason: "Responsive spacing uses clamp in the single stylesheet."
  - section: components
    reason: "Component rules are defined in the single stylesheet."
---

## Overview
Tulassi is an academic demonstration of a Brazilian wellness session planner. The interface resembles a quiet reception desk: clear task language, restrained botanical color, and one serif heading per surface. It must never suggest real bookings or authentication.

## Colors
The color values above map to `assets/css/style.css` variables `--pine`, `--pine-dark`, `--paper`, `--white`, `--mist`, `--ink`, `--muted`, and `--line`, in that order. Error and success colors are semantic CSS tokens.

## Typography
Georgia is reserved for headings and the brand; system UI text supports controls and tables in Portuguese.

## Layout
Content widths cap at 1160px. The dashboard and form use a two-column layout on wide screens and one column below 850px. Tables scroll horizontally when necessary.

## Elevation & Depth
Cards use subtle shadows; the page and muted advice card use distinct backgrounds. Avoid stacked shadows and decorative imagery.

## Shapes
Cards use an 18px radius; controls use roughly 9–10px. The brand mark is circular.

## Components
Native select, date, and time controls are intentional; their open popup appearance is owned by the platform. Fields have visible labels and errors. Navigation is consistent across the two signed-in demonstration pages.

## Do's and Don'ts
Describe saved appointments as local requests. Do not call them confirmed appointments. Preserve focus visibility and reflow on mobile.
