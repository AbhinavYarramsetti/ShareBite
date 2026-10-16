# ServeLink Information Architecture & Navigation Flow

This document details the navigation architecture, role-switching mechanics, and responsive viewport hierarchy.

---

## 1. Global Navigation Tree

```text
ServeLink Root
│
├── Landing Page (Public Overview)
│   ├── Hero Section ("Turn Surplus Meals Into Shared Meals")
│   ├── Visual Process Diagram (Restaurant → Fresh Meals → ServeLink → Child-Care)
│   ├── Audited Impact Metrics
│   └── Verification & Safety Protocols
│
├── Role 1: Restaurant / Donor Portal
│   ├── Operational Dashboard
│   │   ├── Dominant Primary CTA ("Create Donation")
│   │   ├── Compact Impact Summary
│   │   ├── Active Rescue Spotlight (Section 36 Visual Hierarchy)
│   │   └── All Today's Kitchen Donations List
│   ├── Create Donation Modal (Selection Pills over typing)
│   └── Explainable Match Recommendation Modal (Scoring & Reasons)
│
├── Role 2: Recipient Institution Portal
│   ├── Institution Dashboard
│   │   ├── Verified Care Center Badge
│   │   ├── Dietary Filtering Bar (All, Veg, Non-Veg, Mixed)
│   │   └── Available Fresh Meals Feed
│   └── Acceptance Confirmation Modal (Portion, ETA & Caregiver Acknowledgment)
│
├── Role 3: Volunteer Logistics & Dispatch
│   ├── Dispatch Route Overview
│   ├── Simulated 5-Step Timeline (Accepted → Pickup → In Transit → Arriving → Delivered)
│   ├── Mandatory 4-Point Safety Checklist
│   └── Dignified Completion Experience (Impact Counter & Purpose Reinforcement)
│
└── Role 4: Design System Showcase
    ├── Design Tokens & Color Palette (WCAG Contrast Ratios)
    ├── Typographic Hierarchy (Inter Scale)
    ├── Action Button Hierarchy (Primary, Secondary, Tertiary)
    ├── Freshness Visualization System (Interactive State Switcher)
    └── HCI Quality & Accessibility Checklist
```

---

## 2. Role-Switching Mechanics

- **Desktop Header:** Fixed-top banner featuring direct navigational buttons for all four demo roles, plus an instant `Reset Demo` button to clear `localStorage` and reseed initial data.
- **Mobile Bottom Navigation:** Fixed 5-column navigation bar adhering to Section 42 & 43 with minimum $48\text{px}$ touch targets, vertical icon-label alignment, and active state indicators.
- **Contextual Cross-Navigation:**
  - Landing CTA `Log Surplus Meal` routes directly to Restaurant Portal.
  - Restaurant card action `Track Active Dispatch` routes directly to Logistics Tracker.
  - Recipient action `Active Deliveries` routes directly to Logistics Tracker.

---

## 3. Responsive Navigation Adaptations

| Element | Desktop ($\ge 768\text{px}$) | Mobile ($< 768\text{px}$) |
| :--- | :--- | :--- |
| **Top Navigation** | Horizontal icon + text pill group | Compact brand logo + `Reset Demo` icon button |
| **Bottom Navigation** | Hidden | Persistent 5-tab bar with large touch zones |
| **Card Layouts** | Multi-column grid with side-by-side metadata | Single-column linear flow prioritizing Freshness & CTA |
| **Modal Dialogs** | Centered elevated modal with backdrop blur | Full-width bottom/centered sheet with accessible exit |
