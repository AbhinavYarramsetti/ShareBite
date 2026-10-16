# ShareBite — Turning Surplus Food into Shared Meals

**ShareBite** is a Chennai-centric food redistribution platform concept designed to connect restaurants with surplus prepared food to children's homes, care institutions, and shelters. It demonstrates how surplus meals can be listed, matched with recipient institutions, and tracked through a structured pickup and delivery workflow.

🌐 **Live Demo:** [https://sharebite-psi.vercel.app/](https://sharebite-psi.vercel.app/)

💻 **GitHub Repository:** [https://github.com/AbhinavYarramsetti/ShareBite](https://github.com/AbhinavYarramsetti/ShareBite)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Application Workflow](#application-workflow)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Running Locally](#running-locally)
- [Building for Production](#building-for-production)
- [Demo Data and Limitations](#demo-data-and-limitations)
- [Deployment](#deployment)
- [Future Enhancements](#future-enhancements)

## Overview

Food surplus and food insecurity often coexist within the same city. ShareBite explores a digital workflow that helps make surplus food redistribution more organised and transparent.

The application uses a Chennai-centric demonstration dataset featuring restaurant locations, neighbourhoods, and child-care institutions. It provides interactive interfaces for exploring donations, matching surplus meals with recipient institutions, and tracking the handover process.

ShareBite is built as a frontend application with local browser storage, making it easy to run, demonstrate, and extend without requiring a backend service.

## Features

- **Restaurant Dashboard:** Explore the restaurant-side donation workflow and manage sample surplus-food listings.
- **Donation Management:** Create and review sample food donations.
- **Recipient Matching:** Explore potential matches between surplus meals and recipient institutions.
- **Institution Dashboard:** Demonstrate the recipient-side experience for reviewing available donations.
- **Logistics Tracking:** Follow a structured pickup and delivery progression.
- **Completion Workflow:** Demonstrate the final handover and donation-completion experience.
- **Chennai-Centric Dataset:** Use restaurant branches and neighbourhood-based sample data relevant to Chennai.
- **Role Switching:** Switch between available demonstration roles to explore different user journeys.
- **Persistent Demo State:** Store supported application state in browser localStorage.
- **Responsive Interface:** Access the application through a modern web browser on supported desktop and mobile screen sizes.

## Application Workflow

The main demonstration journey follows these stages:

1. **List surplus food:** A restaurant creates a sample donation with relevant food and quantity details.
2. **Explore matches:** The application presents potential recipient institutions using the available demonstration data and matching logic.
3. **Review and accept:** The recipient-side workflow demonstrates reviewing and accepting a suitable donation.
4. **Track logistics:** The application progresses through the pickup and delivery stages.
5. **Complete the handover:** The final screen demonstrates completion of the donation workflow.

The workflow is intended to demonstrate the product experience rather than process actual food donations.

## Technology Stack

| Technology | Purpose |
|---|---|
| React | Component-based user interface |
| TypeScript | Type-safe application development |
| Vite | Development server and production build tooling |
| Tailwind CSS | Utility-first styling and design implementation |
| Lucide React | Interface icons |
| Browser localStorage | Persistence of supported demonstration state |
| Vercel | Web application deployment |
| Git and GitHub | Version control and source-code hosting |

## Getting Started

### Prerequisites

Install the following on your system:

- [Node.js](https://nodejs.org/) — preferably a supported LTS release
- npm, included with Node.js
- [Git](https://git-scm.com/) for version control

### Clone the Repository

```bash
git clone https://github.com/AbhinavYarramsetti/ShareBite.git
cd ShareBite
```

### Install Dependencies

```bash
npm install
```

## Running Locally

Start the Vite development server:

```bash
npm run dev
```

Open the local URL printed in the terminal, usually:

`http://localhost:5173/`

To stop the development server, press `Ctrl + C` in the terminal.

## Building for Production

Create an optimised production build:

```bash
npm run build
```

Vite generates the production output in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

Open the local preview URL printed by Vite.

## Demo Data and Limitations

ShareBite is currently a frontend demonstration application.

- Restaurant and institution information is used to provide a Chennai-centric demonstration experience.
- Donations, quantities, availability, matching activity, and delivery progress may be sample data.
- The application does not establish real partnerships with listed restaurants or institutions.
- Application state stored in localStorage is specific to the browser and device. It is not shared between users or synchronised across devices.
- There is no production backend, central database, live dispatch system, or real-time mapping integration.
- Distances and route information should not be interpreted as live navigation or real-time travel estimates.
- The demonstration does not itself arrange actual food collection, transportation, or delivery.

## Deployment

ShareBite is deployed on Vercel.

**Live application:** [https://sharebite-psi.vercel.app/](https://sharebite-psi.vercel.app/)

The deployment is connected to the GitHub repository. After committing and pushing changes to the `main` branch, Vercel can automatically build and deploy the updated application.

Typical update commands:

```bash
git add .
git commit -m "Update ShareBite"
git push origin main
```

The production deployment updates after Vercel successfully completes the build.

## Future Enhancements

Potential future improvements include:

- Backend integration and secure user authentication.
- Persistent, shared donation and institution records.
- More advanced donation-to-institution matching.
- Verified route-distance and delivery-planning integrations.
- Notifications for donation acceptance and handover progress.
- Reporting and analytics for food redistribution activity.
- Production-grade access control and data validation.

These are potential enhancements, not claims about functionality already implemented.

---

*ShareBite — Making surplus meals easier to share.*