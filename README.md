# ShareBite

> **Turn Surplus Meals Into Shared Meals.**  
> A web application connecting commercial restaurant kitchens in Chennai with local children's homes, care institutions, and shelters to safely redirect surplus food before it loses freshness.

[![Build Status](https://img.shields.io/badge/Build-Passing-285943)](https://github.com/AbhinavYarramsetti/sharebite)
[![License: MIT](https://img.shields.io/badge/License-MIT-7FA58A.svg)](https://opensource.org/licenses/MIT)
[![Chennai-Centric Dataset](https://img.shields.io/badge/Data-Chennai%20Metropolitan-173D2B)](#)

---

## 1. Overview & Core Mission

Commercial restaurants and catering establishments in Chennai regularly produce fresh, hygienic surplus food. However, they have limited time before prepared food exceeds its safe freshness window. Meanwhile, care institutions, children's homes, and shelters across the city require nutritious, wholesome meals.

Traditional food donation workflows often struggle with:
- **Time Sensitivity:** Surplus food must be logged, matched, and transported within a strict freshness window.
- **Coordination Overhead:** Manual phone calls and uncertain logistics lead to wasted food.
- **Dietary & Capacity Mismatch:** Meals must match institution dietary preferences and facility size.

**ShareBite** streamlines this process:
- **Tracked Freshness Windows:** Real-time visibility into remaining safe consumption buffers.
- **Deterministic Explainable Matching:** Connects restaurants with nearby care institutions based on freshness, capacity, dietary preferences, and travel estimates.
- **Standardized Safety Checklists:** Volunteer handovers confirm hygienic packaging, temperature status, and timely transfer.
- **Client-Side Persistence:** Fully browser-based with `localStorage` state management and instant demo reset.

> **Demonstration Notice:**  
> ShareBite uses publicly available organisation and business information for demonstration purposes. Listings do not imply affiliation, participation or endorsement by any of the listed entities. See [`docs/chennai-data-sources.md`](./docs/chennai-data-sources.md) for data sources and verification details.

---

## 2. Technology Stack

- **Framework:** React 18+ (Hooks & Functional Architecture)
- **Language:** TypeScript 5+
- **Bundler:** Vite
- **Styling:** Tailwind CSS with dedicated design tokens
- **Iconography:** Lucide React
- **Persistence:** Browser `localStorage` (No external database, backend, or API keys required)
- **Deployment:** Vercel-ready static application

---

## 3. Getting Started

### Prerequisites
Node.js 18+ and npm installed.

### Installation & Local Run
```bash
# Clone the repository
git clone https://github.com/AbhinavYarramsetti/sharebite.git

# Navigate to project directory
cd servelink

# Install dependencies
npm install

# Start local development server
npm run dev
```
Open your browser to `http://localhost:5173`.

### Production Build
```bash
# Typecheck and build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 4. Key Workflows & User Roles

ShareBite includes a sample account switcher in the top navigation to experience the platform from different perspectives:

1. **Public Overview (Landing Page):**
   - Clear value proposition and visual surplus redirection flow.
   - Live donation preview card featuring verified Chennai locations.
   - Impact summary and food safety standards.

2. **Restaurant Operations (e.g., Mathsya — T. Nagar):**
   - Dominant action: **Create Donation**.
   - Input surplus details using fast selection pills for dietary classification and portion quantity.
   - Explainable recipient matching showing reasons (freshness buffer, dietary match, capacity fit, proximity).

3. **Care Institution Portal (e.g., Bala Mandir Kamaraj Trust):**
   - Dietary filtering (`All Diets`, `Vegetarian Only`, `Non-Vegetarian`, `Mixed`).
   - Feed of available fresh meal donations with countdowns.
   - One-click acceptance modal with receiving facility confirmation.

4. **Delivery Partner View (e.g., Kavya Rajan):**
   - Step-by-step delivery progress: `Accepted` $\to$ `Pickup Confirmed` $\to$ `In Transit` $\to$ `Arriving Soon` $\to$ `Delivered`.
   - Mandatory volunteer safety checklist (packaging, labelling, freshness window, recipient confirmation).
   - Direct handover completion summary.

---

## 5. Design System

ShareBite employs a restrained, accessible design palette inspired by freshness, sustainability, and community trust:

| Token | Hex | Semantic Role |
| :--- | :--- | :--- |
| **Primary (Forest Green)** | `#285943` | Primary action buttons, active navigation, brand elements |
| **Primary Dark (Deep Forest)** | `#173D2B` | Headings, hero emphasis, dark text accents |
| **Secondary (Sage)** | `#7FA58A` | Secondary badges, soft borders, subtle highlights |
| **Background (Warm Cream)** | `#F7F5EF` | Main application canvas |
| **Surface (White)** | `#FFFFFF` | Cards, modals, dialog surfaces |
| **Text Primary (Charcoal)** | `#1F2933` | Primary readable text |
| **Text Secondary (Slate)** | `#667085` | Metadata, timestamps, supporting copy |
| **Status: Success** | `#2E7D5B` | Completed deliveries, verified stages |
| **Status: Urgent (Amber)** | `#C88719` | Time-sensitive freshness alerts (15–30 min remaining) |
| **Status: Critical** | `#B54747` | Expired freshness windows |

---

## 6. Research & Chennai Dataset

For full documentation on verified Chennai restaurants, care institutions, route approximations, and methodology, see:
- [`docs/chennai-data-sources.md`](./docs/chennai-data-sources.md)

---

## 7. State Management & Demo Reset

All application state is saved locally in the browser via `localStorage`.

To reset the application to its seeded state at any time:
- Open the user account dropdown in the top right corner.
- Click **Reset demo data**.

---

## 8. License

Distributed under the MIT License.
