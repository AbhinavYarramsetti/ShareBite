import { DonationItem, RecipientInstitution, DeliveryMission, RestaurantBranch } from '../types';

/**
 * ShareBite — Chennai Seed Data (v2)
 *
 * Restaurant branches and recipient institutions use publicly listed addresses
 * from official websites, verified business directories, and supplied seed records.
 * These records are for demonstration purposes only.
 * Listings do not imply affiliation, participation or endorsement.
 */

// ────────────────────────────────────────────────────────────────
// RESTAURANT BRANCHES
// 10 Existing Verified Branches + 29 User-Supplied Seed Branches
// ────────────────────────────────────────────────────────────────

export const INITIAL_RESTAURANTS: RestaurantBranch[] = [
  // ── Existing 10 Verified Branches ─────────────────────────────
  {
    id: 'restaurant-mathsya-tnagar',
    name: 'Mathsya Restaurant',
    branch: 'T. Nagar',
    cuisine: 'South Indian Vegetarian',
    neighbourhood: 'T. Nagar',
    address: 'No. 29/31, Thanikachalam Road, Parthasarathi Puram, T. Nagar, Chennai – 600 017',
    pinCode: '600017',
  },
  {
    id: 'restaurant-mathsya-egmore',
    name: 'Mathsya Restaurant',
    branch: 'Egmore',
    cuisine: 'South Indian Vegetarian',
    neighbourhood: 'Egmore',
    address: '1, Tamil Salai, KVN Puram, Egmore, Chennai – 600 008',
    pinCode: '600008',
  },
  {
    id: 'restaurant-mathsya-adyar',
    name: 'Mathsya Restaurant',
    branch: 'Adyar',
    cuisine: 'South Indian Vegetarian',
    neighbourhood: 'Adyar',
    address: 'No. 53 (Old No. 26), 1st Main Road, Gandhi Nagar, Adyar, Chennai – 600 020',
    pinCode: '600020',
  },
  {
    id: 'restaurant-a2b-tnagar',
    name: 'Adyar Ananda Bhavan (A2B)',
    branch: 'T. Nagar',
    cuisine: 'Vegetarian Restaurant & Sweets',
    neighbourhood: 'T. Nagar',
    address: 'No. 87, Pondy Bazaar, Thyagaraya Road, T. Nagar, Chennai – 600 017',
    pinCode: '600017',
  },
  {
    id: 'restaurant-a2b-adyar',
    name: 'Adyar Ananda Bhavan (A2B)',
    branch: 'Adyar',
    cuisine: 'Vegetarian Restaurant & Sweets',
    neighbourhood: 'Adyar',
    address: 'No. 9, L.B. Road, Shastri Nagar, Adyar, Chennai – 600 020',
    pinCode: '600020',
  },
  {
    id: 'restaurant-saravanaa-egmore',
    name: 'Hotel Saravanaa Bhavan',
    branch: 'Egmore',
    cuisine: 'South Indian Vegetarian',
    neighbourhood: 'Egmore',
    address: '21, Kennet Lane, Egmore, Chennai – 600 008',
    pinCode: '600008',
  },
  {
    id: 'restaurant-saravanaa-anna-nagar',
    name: 'Hotel Saravanaa Bhavan',
    branch: 'Anna Nagar',
    cuisine: 'South Indian Vegetarian',
    neighbourhood: 'Anna Nagar',
    address: 'No. 1958, 1st Street, G Block, Ranganathan Garden, Anna Nagar, Chennai – 600 040',
    pinCode: '600040',
  },
  {
    id: 'restaurant-anjappar-anna-nagar',
    name: 'Anjappar Chettinad',
    branch: 'Anna Nagar East',
    cuisine: 'Chettinad / Non-Vegetarian',
    neighbourhood: 'Anna Nagar East',
    address: 'No. 100/2, T Block, 3rd Avenue, Anna Nagar East, Chennai – 600 102',
    pinCode: '600102',
  },
  {
    id: 'restaurant-anjappar-adyar',
    name: 'Anjappar Chettinad',
    branch: 'Adyar',
    cuisine: 'Chettinad / Non-Vegetarian',
    neighbourhood: 'Adyar',
    address: 'No. 5, Dev Apartments, 1st Main Road, K.B. Nagar, Adyar, Chennai – 600 020',
    pinCode: '600020',
  },
  {
    id: 'restaurant-coffee-shastra-tnagar',
    name: 'Coffee Shastra',
    branch: 'T. Nagar',
    cuisine: 'Café & South Indian',
    neighbourhood: 'T. Nagar',
    address: '45, Bazulla Road, T. Nagar, Chennai – 600 017',
    pinCode: '600017',
  },

  // ── 29 User-Supplied Seed Branches ────────────────────────────
  {
    id: 'restaurant-focaccia-teynampet',
    name: 'Focaccia',
    cuisine: 'Italian',
    neighbourhood: 'Teynampet',
    address: '365, Anna Salai, Rostrevor Garden, Chennai 600018',
    pinCode: '600018',
  },
  {
    id: 'restaurant-porca-vaca-alwarpet',
    name: 'Porca & Vaca',
    cuisine: 'Italian, American',
    neighbourhood: 'Alwarpet',
    address: '42, Sriram Colony, Bheemanna Garden Street, Chennai',
  },
  {
    id: 'restaurant-tuscan-table-rapuram',
    name: 'The Tuscan Table',
    cuisine: 'Italian, Mediterranean',
    neighbourhood: 'Alwarpet / R.A. Puram',
    address: 'Old 27A, New 60, R.A. Puram, Govindaswamy Nagar, 4th Main Road, Chennai',
  },
  {
    id: 'restaurant-mezze-alwarpet',
    name: 'Mezze',
    cuisine: 'Middle Eastern',
    neighbourhood: 'Alwarpet',
    address: 'Abhinav Center, Old No. 19, New No. 14, Cooperative Colony, Chennai 600018',
    pinCode: '600018',
  },
  {
    id: 'restaurant-mexe-alwarpet',
    name: 'Mexe',
    cuisine: 'Mexican',
    neighbourhood: 'Alwarpet',
    address: '2/13, West Street, Cooperative Colony, Sri Ram Nagar, Chennai 600018',
    pinCode: '600018',
  },
  {
    id: 'restaurant-double-roti-teynampet',
    name: 'Double Roti – Teynampet',
    cuisine: 'American, Italian-inspired',
    neighbourhood: 'Alwarpet / Teynampet',
    address: '4/27, First Street, Cenotaph Road, Sri Ram Nagar, Chennai 600018',
    pinCode: '600018',
  },
  {
    id: 'restaurant-hard-rock-cafe-nungambakkam',
    name: 'Hard Rock Cafe Chennai',
    cuisine: 'American',
    neighbourhood: 'Nungambakkam',
    address: '144, Sterling Road, Chennai 600034',
    pinCode: '600034',
  },
  {
    id: 'restaurant-high-joint-shenoy-nagar',
    name: 'The High Joint',
    cuisine: 'American',
    neighbourhood: 'Shenoy Nagar',
    address: '25, opposite Green Trends, Tamilar Nagar, Chennai 600030',
    pinCode: '600030',
  },
  {
    id: 'restaurant-little-soi-anna-nagar',
    name: 'Little Soi',
    cuisine: 'Pan-Asian',
    neighbourhood: 'Anna Nagar East',
    address: '2nd Floor, J B Khanna Jag Tirth, A2, 2nd Avenue, Chennai 600102',
    pinCode: '600102',
  },
  {
    id: 'restaurant-asian-hive-anna-nagar',
    name: 'Asian Hive',
    cuisine: 'Pan-Asian',
    neighbourhood: 'Anna Nagar East',
    address: 'No. 3/1, 6th Street, D Block, Chennai 600102',
    pinCode: '600102',
  },
  {
    id: 'restaurant-taste-of-italy-anna-nagar',
    name: 'Taste of Italy',
    cuisine: 'Italian',
    neighbourhood: 'Anna Nagar',
    address: '753, 2nd Street, 1st Street, Chennai 600040',
    pinCode: '600040',
  },
  {
    id: 'restaurant-mexipop-anna-nagar',
    name: 'Mexipop',
    cuisine: 'Mexican',
    neighbourhood: 'Anna Nagar',
    address: 'AG-69, 3rd Cross Street, AG Block, River View Colony, Chennai 600040',
    pinCode: '600040',
  },
  {
    id: 'restaurant-ottimo-cucina-guindy',
    name: 'Ottimo Cucina Italiana',
    cuisine: 'Italian',
    neighbourhood: 'Guindy',
    address: 'ITC Grand Chola, 63, Anna Salai, Little Mount, Chennai 600032',
    pinCode: '600032',
  },
  {
    id: 'restaurant-flying-elephant-guindy',
    name: 'The Flying Elephant',
    cuisine: 'International / Western',
    neighbourhood: 'Guindy',
    address: 'Park Hyatt Chennai, 39, Velachery Main Road, Chennai 600032',
    pinCode: '600032',
  },
  {
    id: 'restaurant-sky-residency-tnagar',
    name: 'SKY – Curated Asian Dining',
    cuisine: 'Asian',
    neighbourhood: 'T. Nagar',
    address: 'The Residency Towers, 115, Sir Thyagaraya Road, Chennai 600017',
    pinCode: '600017',
  },
  {
    id: 'restaurant-aruvi-uthandi-ecr',
    name: 'Aruvi Restaurant',
    cuisine: 'Multicuisine / Continental',
    neighbourhood: 'Uthandi, ECR',
    address: 'No. 11, VGP 3rd Main Road, ECR Main Road, Chennai 600119',
    pinCode: '600119',
  },
  {
    id: 'restaurant-beach-terrace-injambakkam',
    name: 'The Beach Terrace',
    cuisine: 'Continental, Asian',
    neighbourhood: 'Injambakkam, ECR',
    address: '5/159, ECR, VGP Salai, Injambakkam, Chennai',
  },
  {
    id: 'restaurant-char-injambakkam',
    name: 'Char',
    cuisine: 'American, Continental',
    neighbourhood: 'Injambakkam, ECR',
    address: 'No. 5/159, ECR, Injambakkam, Chennai',
  },
  {
    id: 'restaurant-east-coast-madras-square',
    name: 'East Coast at Madras Square',
    cuisine: 'Global cuisine',
    neighbourhood: 'Neelankarai, ECR',
    address: '2/520, Sundeep Avenue, Sakthimoorthiamman Nagar, Chennai 600041',
    pinCode: '600041',
  },
  {
    id: 'restaurant-roll-away-injambakkam',
    name: 'Roll Away – ECR',
    cuisine: 'Rolls, kebabs, curries',
    neighbourhood: 'Injambakkam, ECR',
    address: 'VGP Wonder World, Stall No. 7, Plot No. 25, Jagjeevan Ram Avenue, Chennai 600115',
    pinCode: '600115',
  },
  {
    id: 'restaurant-kipling-cafe-akkarai',
    name: 'Kipling Café',
    cuisine: 'Thai, Continental, Italian',
    neighbourhood: 'Akkarai, ECR',
    address: '16, L Jey Avenue, Akkarai, East Coast Road, Chennai',
  },
  {
    id: 'restaurant-pedrenos-perungudi',
    name: "Pedreno's",
    cuisine: 'Continental, Italian, Asian, Mexican, Japanese',
    neighbourhood: 'Perungudi, OMR',
    address: 'Kamarajar Street, Rajiv Gandhi Salai, Perungudi, Chennai',
  },
  {
    id: 'restaurant-pause-kitchen-perungudi',
    name: 'Pause Kitchen',
    cuisine: 'Continental, Italian, Oriental, Mexican',
    neighbourhood: 'Perungudi, OMR',
    address: '10, OMR Food Street, MGR Road, Perungudi, Chennai',
  },
  {
    id: 'restaurant-barbeque-nation-thoraipakkam',
    name: 'Barbeque Nation – Thoraipakkam',
    cuisine: 'Barbecue, Indian',
    neighbourhood: 'Thoraipakkam, OMR',
    address: 'Ground Floor, Ramaniyam Isha, Block 1, 11, Rajiv Gandhi Salai, Customs Colony, Chennai 600097',
    pinCode: '600097',
  },
  {
    id: 'restaurant-flower-drum-thoraipakkam',
    name: 'Flower Drum',
    cuisine: 'Chinese, Thai',
    neighbourhood: 'Thoraipakkam, OMR',
    address: 'No. 3, Rajiv Gandhi Salai, Annani Indira Nagar, Chennai 600097',
    pinCode: '600097',
  },
  {
    id: 'restaurant-basil-with-a-twist-omr',
    name: 'Basil with a Twist – OMR',
    cuisine: 'Multicuisine',
    neighbourhood: 'Sholinganallur, OMR',
    address: 'No. 9, Kamala Street, OMR, ELCOT SEZ, Chennai 600119',
    pinCode: '600119',
  },
  {
    id: 'restaurant-the-square-novotel-omr',
    name: 'The Square – Novotel Chennai OMR',
    cuisine: 'International / Continental',
    neighbourhood: 'Sholinganallur, OMR',
    address: 'Novotel Chennai OMR, Old Mahabalipuram Road, Chennai 600119',
    pinCode: '600119',
  },
  {
    id: 'restaurant-palomar-capella-akkarai',
    name: 'The Palomar by Crossway – Capella',
    cuisine: 'Global cuisine',
    neighbourhood: 'Akkarai / Sholinganallur, ECR',
    address: '4A2, East Coast Road, Akkarai, Sholinganallur, Chennai 600119',
    pinCode: '600119',
  },
  {
    id: 'restaurant-spotted-deer-akkarai',
    name: 'The Spotted Deer',
    cuisine: 'Gastropub / international',
    neighbourhood: 'Akkarai / Sholinganallur, ECR',
    address: '4A2, East Coast Road, Akkarai, Sholinganallur, Chennai 600119',
    pinCode: '600119',
  },
];

// ────────────────────────────────────────────────────────────────
// RECIPIENT INSTITUTIONS
// All addresses sourced from official organisation websites.
// ────────────────────────────────────────────────────────────────

export const INITIAL_RECIPIENTS: RecipientInstitution[] = [
  {
    id: 'institution-bala-mandir-tnagar',
    name: 'Bala Mandir Kamaraj Trust',
    type: "Children's Residential Home",
    capacityChildren: 60,
    address: 'No. 8, G.N. Chetty Road, T. Nagar, Chennai – 600 017',
    distanceKm: 1.2,
    etaMinutes: 6,
    verified: false,
    contactPerson: 'Programme Coordinator',
    dietaryPreferences: ['Vegetarian only', 'Warm meals preferred', 'South Indian cuisine'],
    openHours: 'Open 8:00 AM – 8:00 PM',
  },
  {
    id: 'institution-arunodayam-boys-kolathur',
    name: 'Sri Arunodayam — Boys Home',
    type: 'Residential Care Centre (Intellectual Disabilities)',
    capacityChildren: 45,
    address: '79, Senai Thaliavar Nagar, Madanankuppam, Kolathur, Chennai – 600 099',
    distanceKm: 9.0,
    etaMinutes: 28,
    verified: false,
    contactPerson: 'Care Home Manager',
    dietaryPreferences: ['Vegetarian', 'Soft meals when possible', 'Mild spices'],
    openHours: 'Open 7:00 AM – 9:00 PM',
  },
  {
    id: 'institution-all-children-karapakkam',
    name: 'All The Children Trust — Karapakkam Home',
    type: "Integrated Children's Home & Adoption Centre",
    capacityChildren: 35,
    address: 'No. 2, Eswaran Street, Karapakkam, OMR, Chennai – 600 097',
    distanceKm: 18.0,
    etaMinutes: 38,
    verified: false,
    contactPerson: 'Home Coordinator',
    dietaryPreferences: ['Vegetarian & Mixed accepted', 'Standard portions'],
    openHours: 'Open 8:00 AM – 7:00 PM',
  },
  {
    id: 'institution-hope-ambattur',
    name: 'Hope Public Charitable Trust',
    type: 'Special Education & Rehabilitation Centre',
    capacityChildren: 50,
    address: 'No. 6B/26, Sarangapani Street, Krishnapuram, Ambattur O.T., Chennai – 600 053',
    distanceKm: 8.5,
    etaMinutes: 24,
    verified: false,
    contactPerson: 'Centre In-charge',
    dietaryPreferences: ['Vegetarian & Mixed accepted', 'Warm meals', 'Nut-free'],
    openHours: 'Open 8:30 AM – 6:00 PM (Weekdays)',
  },
  {
    id: 'institution-all-children-vyasarpadi',
    name: 'All The Children Trust — Vyasarpadi Home',
    type: "Residential Shelter & Children's Home",
    capacityChildren: 28,
    address: 'No. 39/40, 2nd Palla Street, Kennedy Nagar, Vyasarpadi, Chennai – 600 039',
    distanceKm: 11.5,
    etaMinutes: 32,
    verified: false,
    contactPerson: 'Home Manager',
    dietaryPreferences: ['Vegetarian preferred', 'South Indian meals'],
    openHours: 'Open 7:30 AM – 8:00 PM',
  },
];

// ────────────────────────────────────────────────────────────────
// SEED DONATIONS
// Restaurant branches use publicly listed addresses from verified
// business directories. Menu items are illustrative demo data.
// ────────────────────────────────────────────────────────────────

export const INITIAL_DONATIONS: DonationItem[] = [
  {
    // Active fresh donation — used as the primary demo donation for the restaurant dashboard
    id: 'don-ch-101',
    donorName: 'Mathsya Restaurant',
    donorBranch: 'T. Nagar',
    donorType: 'South Indian Restaurant',
    donorAddress: '29/31, Thanikachalam Road, Parthasarathi Puram, T. Nagar, Chennai – 600 017',
    title: 'Idli, Sambar & Coconut Chutney',
    description:
      'Freshly steamed idlis with sambar packed in food-grade stainless containers. Surplus from lunchtime service.',
    quantity: 30,
    dietaryType: 'vegetarian',
    prepTimeMinutesAgo: 28,
    minutesRemaining: 52,
    urgency: 'fresh',
    temperatureStatus: 'Hot holding – ≥ 65°C',
    packagingType: 'Thermal sealed stainless trays',
    status: 'submitted',
    distanceKm: 1.2,
    etaMinutes: 6,
    createdAt: '2024-10-14T07:30:00Z',
    deliveryTimeline: {},
  },
  {
    // Time-sensitive donation
    id: 'don-ch-102',
    donorName: 'Adyar Ananda Bhavan (A2B)',
    donorBranch: 'T. Nagar',
    donorType: 'Vegetarian Restaurant & Sweets',
    donorAddress: 'No. 87, Pondy Bazaar, Thyagaraya Road, T. Nagar, Chennai – 600 017',
    title: 'Lemon Rice & Curd Rice',
    description: 'Buffet surplus from afternoon service. Pre-portioned in insulated meal boxes.',
    quantity: 20,
    dietaryType: 'vegetarian',
    prepTimeMinutesAgo: 62,
    minutesRemaining: 28,
    urgency: 'time-sensitive',
    temperatureStatus: 'Insulated containers – 60–65°C',
    packagingType: 'Insulated food-grade meal boxes',
    status: 'submitted',
    distanceKm: 1.5,
    etaMinutes: 7,
    createdAt: '2024-10-14T07:00:00Z',
    deliveryTimeline: {},
  },
  {
    // Accepted / in-progress donation shown in the delivery tracker
    id: 'don-ch-103',
    donorName: 'Hotel Saravanaa Bhavan',
    donorBranch: 'Egmore',
    donorType: 'South Indian Restaurant',
    donorAddress: '21, Kennet Lane, Egmore, Chennai – 600 008',
    title: 'Vegetable Biryani & Raita',
    description:
      'Corporate lunch surplus from event catering. Sealed eco-foil containers. High-priority dispatch.',
    quantity: 40,
    dietaryType: 'vegetarian',
    prepTimeMinutesAgo: 75,
    minutesRemaining: 15,
    urgency: 'urgent',
    temperatureStatus: 'Insulated warm container – 62°C',
    packagingType: 'Eco-foil sealed trays',
    status: 'accepted',
    claimedBy: 'Bala Mandir Kamaraj Trust',
    claimedAt: '10 min ago',
    volunteerName: 'Kavya Rajan (ShareBite Volunteer)',
    distanceKm: 4.2,
    etaMinutes: 15,
    createdAt: '2024-10-14T06:45:00Z',
    deliveryTimeline: {
      acceptedAt: '07:30',
      pickupAt: '07:38',
    },
  },
  {
    // Expired donation — shows the expired state in UI
    id: 'don-ch-104',
    donorName: 'Coffee Shastra',
    donorBranch: 'T. Nagar',
    donorType: 'Café & Bakery',
    donorAddress: '45, Bazulla Road, T. Nagar, Chennai – 600 017',
    title: 'Paneer Rolls & Sandwiches',
    description: 'Café surplus from morning service. Freshness window has elapsed.',
    quantity: 12,
    dietaryType: 'vegetarian',
    prepTimeMinutesAgo: 145,
    minutesRemaining: 0,
    urgency: 'expired',
    temperatureStatus: 'Safety window elapsed',
    packagingType: 'Paper-lined snack boxes',
    status: 'expired',
    distanceKm: 0.8,
    etaMinutes: 0,
    createdAt: '2024-10-14T05:30:00Z',
  },
];

// ────────────────────────────────────────────────────────────────
// ACTIVE DELIVERY MISSION
// Pre-seeded mission matching don-ch-103
// ────────────────────────────────────────────────────────────────

export const INITIAL_MISSION: DeliveryMission = {
  id: 'SL-2410',
  donationId: 'don-ch-103',
  donationTitle: 'Vegetable Biryani & Raita',
  donorName: 'Hotel Saravanaa Bhavan – Egmore',
  donorAddress: '21, Kennet Lane, Egmore, Chennai – 600 008',
  recipientName: 'Bala Mandir Kamaraj Trust',
  recipientAddress: 'No. 8, G.N. Chetty Road, T. Nagar, Chennai – 600 017',
  quantity: 40,
  dietaryType: 'vegetarian',
  minutesRemaining: 15,
  urgency: 'urgent',
  step: 'transit',
  safetyChecks: {
    packagingIntact: true,
    foodLabelled: true,
    preparedTimeVerified: true,
    recipientDetailsConfirmed: true,
  },
};

// ────────────────────────────────────────────────────────────────
// IMPACT METRICS
// Sample platform activity — not verified real-world outcomes.
// ────────────────────────────────────────────────────────────────

export const IMPACT_METRICS = {
  totalMealsRescued: 8_240,
  activeInstitutions: 14,
  donorPartners: 31,
  averageDispatchMinutes: 19,
  co2PreventedKg: 18_600,
};

// ────────────────────────────────────────────────────────────────
// DATA VERSION — used for localStorage migration
// ────────────────────────────────────────────────────────────────

export const SEED_DATA_VERSION = 'sharebite-v2-chennai-2024';
