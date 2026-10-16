# ServeLink HCI Scenarios

## Scenario A — Restaurant Surplus Donation

### Context
Chef Rajesh at *Green Leaf Kitchen* finishes a conference luncheon service at 2:30 PM. The catering line has 30 untouched, steaming-hot portions of Vegetable Rice & Dal Makhani sealed in food-grade trays. Per kitchen policy, hot surplus can be held at $\ge 65^\circ\text{C}$ for a maximum of 90 minutes before it must be discarded.

### User Goal
Quickly donate the 30 portions to a verified nearby child-care facility with minimal manual effort and maximum speed.

### Trigger
Kitchen service concludes and surplus portions are verified untouched.

### User Actions & System Response
1. **Trigger Action:** Rajesh opens ServeLink on the kitchen tablet. The dashboard displays the single dominant CTA: `Create Donation`.
2. **Input:** Clicks `Create Donation`. The modal appears instantly:
   - Selects `[Vegetarian]` (1 tap, defaults to vegetarian).
   - Selects `[30 Meals]` (1 tap).
   - Confirms meal title (`Vegetable Rice & Dal Makhani`).
   - Selects `[30 min ago]` (1 tap).
   - Confirms two hygiene safety checkboxes (`Temperature maintained` & `Hygienic seals`).
3. **Submit:** Clicks `Publish Donation (30 Meals)`.
4. **Matching:** The system calculates compatibility and displays the `Recommended Recipient Institutions` modal with *Sunrise Child Care Centre* ranked #1 (`98% Compatibility • High capacity 42 children, accepts vegetarian, 1.8 km / 8 min ETA`).
5. **Selection:** Rajesh clicks `Select & Route to Sunrise Child Care Centre`.

### Expected Outcome
The surplus is queued in the matching/dispatch network in under 45 seconds with zero free-text typing required.

---

## Scenario B — Institution Accepts Donation

### Context
Sister Margaret at *Sunrise Child Care Centre* receives a high-priority push notification at 2:35 PM indicating fresh vegetarian meals have been matched from *Green Leaf Kitchen*. Afternoon study hours finish at 3:30 PM, so receiving hot meals for early dinner fits their schedule ideally.

### User Goal
Inspect the meal details, confirm nutritional and dietary suitability, verify freshness margin, and accept the donation.

### Trigger
Alert received regarding available surplus meals within 2 km.

### User Actions & System Response
1. **Inspection:** Margaret opens the Child-Care Portal. The top card immediately highlights:
   - Freshness window: `✓ FRESH — 48 min remaining`
   - Portion size: `30 Meals`
   - Dietary tag: `Vegetarian`
   - Distance & ETA: `1.8 km away • Transit Estimate: ~8 mins`
2. **Decision:** Margaret clicks `Accept Donation`.
3. **Confirmation Modal:** Displays summary of portions, safety guarantees, and receiving facility details. Margaret confirms caregiver availability and clicks `Confirm & Dispatch Courier`.
4. **Feedback:** A green toast confirms: *"Donation accepted. The restaurant has been notified and courier dispatched."*

### Expected Outcome
The institution accepts verified food with certainty regarding arrival time and dietary suitability.

---

## Scenario C — Volunteer Courier Pickup & Safe Handover

### Context
Aarav Sharma, a registered ServeLink volunteer on his electric scooter, accepts the rescue dispatch mission at 2:38 PM. He is equipped with an insulated thermal transport carrier.

### User Goal
Navigate to Green Leaf Kitchen, perform mandatory hygiene checks, transport the consignment within the freshness cutoff, and complete verified handover at Sunrise Child Care Centre.

### Trigger
Volunteer dispatch assignment arrives on mobile smartphone.

### User Actions & System Response
1. **Pickup & Safety Inspection:** Aarav arrives at Green Leaf Kitchen. The interface presents the 4-item mandatory checklist:
   - `✓ Packaging intact and sanitary`
   - `✓ Food labelled with menu items & dietary tags`
   - `✓ Prepared time verified (within 90-minute safety window)`
   - `✓ Recipient details and caregiver arrival confirmed`
2. **Transit:** Aarav checks all 4 boxes and taps `Confirm Pickup & Begin Route`. The simulated timeline updates to `In Transit ●`.
3. **Arrival:** Aarav arrives at Sunrise Child Care Centre and taps `Mark Arriving Soon`.
4. **Handover:** Margaret inspects the tamper seals and takes custody. Aarav taps `Confirm Handover & Complete`.
5. **Completion Experience:** The screen displays:
   - `✓ Delivery Completed`
   - `30 meals reached Sunrise Child Care Centre.`
   - `Food was shared while it was still fresh.`
   - Impact counter: `30 meals shared • 1 recipient supported • 0 kg food wasted`.

### Expected Outcome
Food safety protocols are enforced without cognitive friction, and the volunteer receives positive purpose-driven emotional feedback.
