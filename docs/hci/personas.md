# ServeLink HCI Personas

## 1. Restaurant Operator Persona

### Identity & Context
- **Name:** Chef Rajesh Verma
- **Role:** Head Chef & Catering Director at *Green Leaf Kitchen*
- **Environment:** Busy commercial kitchen during post-lunch & post-banquet service transitions.
- **Tools Used:** Mobile tablet at kitchen line or smartphone while supervising kitchen closing.

### Goals & Motivations
- Rapidly divert 20–60 wholesome, freshly prepared surplus meals rather than discard them.
- Protect restaurant reputation with verifiable temperature, hygiene, and safe handover standards.
- Minimize staff time required to coordinate charitable food handovers.

### Pain Points & Constraints
- **Time Sensitivity:** Every passing minute reduces the safe food consumption window.
- **Cognitive Overhead:** Complex forms, typing itemized ingredient descriptions, or waiting on hold with NGOs leads to abandoned donation attempts.
- **Uncertainty:** Unreliable couriers who fail to arrive before kitchen staff departure.

### Design Implications for ServeLink
- Single dominant primary action (`Create Donation`) positioned prominently.
- Replaced typing with pre-configured selection pills (`[Vegetarian]`, `[15 / 30 / 50 Meals]`, `[15m / 30m / 45m ago]`).
- Instant deterministic matching with verified local institutions and live countdowns.

---

## 2. Recipient Institution Coordinator Persona

### Identity & Context
- **Name:** Sister Margaret
- **Role:** Director & Operations Lead at *Sunrise Child Care Centre* (42 children in care)
- **Environment:** Multitasking between childcare management, administrative compliance, and dietary planning.
- **Tools Used:** Desktop office PC or smartphone while on the facility floor.

### Goals & Motivations
- Provide safe, nutritious, warm meals for children under care.
- Reduce institutional food procurement costs while upholding strict food safety rules.
- Predict exact delivery arrival times so caregivers are prepared to serve meals promptly.

### Pain Points & Constraints
- **Nutritional Safety:** Cannot accept expired, improperly stored, or unverified food items.
- **Dietary Restrictions:** Strict requirement for vegetarian meals and nut-free handling.
- **Operational Bandwidth:** Small staff cannot manage complex logistical tracking or delayed arrivals.

### Design Implications for ServeLink
- Clear visual hierarchy prioritizing freshness window, portion count, and dietary classification.
- One-click acceptance with arrival ETA and caregiver verification acknowledgment.
- Real-time simulated status tracking (`Accepted → Pickup → In Transit → Arriving Soon`).

---

## 3. Volunteer Courier / Logistics Persona

### Identity & Context
- **Name:** Aarav Sharma
- **Role:** Community Food Rescue Volunteer & Courier
- **Environment:** Urban transit (scooter/bike with thermal insulated courier bag).
- **Tools Used:** Mobile smartphone mounted or held.

### Goals & Motivations
- Execute safe, fast transit from donor commercial kitchen to child-care institution within the 30–45 minute window.
- Ensure full safety compliance before departure and at physical handover.
- Feel a direct sense of community purpose and achievement.

### Pain Points & Constraints
- **Error Vulnerability:** Picking up the wrong container or failing to confirm dietary seals.
- **Unclear Handover Instructions:** Wasted time finding the correct loading dock or caregiver.
- **Complex Interfaces:** Interfaces requiring extensive typing while navigating urban streets.

### Design Implications for ServeLink
- Mandatory 4-item visual checklist (`Packaging intact`, `Food labelled`, `Prepared time verified`, `Recipient details confirmed`).
- Clear step-by-step advance button with high-contrast text and minimum $44 \times 44\text{px}$ touch targets.
- Positive emotional reinforcement upon delivery completion (`"30 meals reached the recipient institution"`).
