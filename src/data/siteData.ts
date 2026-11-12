// All editable site copy and product data lives here.
// Replace every [BRACKETED] placeholder with your real details.

export const BRAND = {
  name: 'Aralu Organics',
  kannadaName: 'ಅರಳು',
  tagline: 'Rooted in nature. Made to bloom.',
  // [WHATSAPP_NUMBER] digits only, with country code, e.g. 919876543210
  whatsappNumber: '919481526703',
  // [PHONE] e.g. +91 98765 43210
  phone: '+91 9481526703',
  // [EMAIL] e.g. hello@aralu.in
  email: 'araluorganics@gmail.com',
  // [INSTAGRAM_URL] e.g. https://instagram.com/aralu.organics
  instagramUrl: 'https://instagram.com/araluorganic',
  // [ADDRESS] full postal address
  address: 'Bengaluru, Karnataka, India',
  // [DELIVERY_AREAS] e.g. Bengaluru, Mysuru and across India
  deliveryAreas: 'Bengaluru, Mysuru and across India',
  // [LICENCE_NO] FSSAI licence number
  licenceNo: '21224190000123',
  // [COMBO_PRICE] price for the hair care trio
  comboPrice: '299',
};

export type Product = {
  id: string;
  name: string;
  kannadaName?: string;
  size: string;
  description: string;
  bestFor: string[];
  // [PRICE] replace with the rupee amount, e.g. 245
  price: string;
  // Placeholder art. To use a real photo, set image to a path such as '/images/castor-oil.jpg'.
  art: 'bottle' | 'pouch';
  image?: string;
  // Used in the SEO product schema and the WhatsApp order message.
  keywords: string;
};

export const PRODUCTS: Product[] = [
  {
    id: 'castor-oil',
    name: 'Pure Cold-Pressed Castor Oil',
    kannadaName: 'ಹರಳೆಣ್ಣೆ',
    size: '200 ml',
    description:
      'Thick, golden castor oil pressed without heat. Warm it slightly, then massage into scalp, skin, brows and lashes.',
    bestFor: ['Hair & scalp', 'Skin', 'Brows & lashes'],
    price: '150',
    art: 'bottle',
    keywords: 'cold pressed castor oil 200ml',
  },
  {
    id: 'rosemary-powder',
    name: 'Rosemary Powder',
    size: '100 g packet',
    description:
      'Finely ground dried rosemary leaves. Mix into a herbal hair mask with curd, water or oil.',
    bestFor: ['Herbal hair mask', 'Scalp care'],
    price: '120',
    art: 'pouch',
    keywords: 'rosemary powder 100g',
  },
  {
    id: 'shikakai-powder',
    name: 'Shikakai Powder',
    size: '100 g packet',
    description:
      'Fine powder from dried shikakai pods, traditionally used as a gentle natural hair cleanser.',
    bestFor: ['Gentle cleansing', 'Everyday wash'],
    price: '80',
    art: 'pouch',
    keywords: 'shikakai powder 100g',
  },
];

export const COMBO = {
  title: 'Hair care trio',
  items: 'Castor oil + rosemary + shikakai',
};

export const BENEFITS = [
  {
    icon: 'leaf' as const,
    title: 'Hair & scalp',
    text: 'Castor oil is traditionally used to massage the scalp and keep hair feeling soft.',
  },
  {
    icon: 'seed' as const,
    title: 'Skin',
    text: 'A light oil that helps dry skin feel softer and more supple.',
  },
  {
    icon: 'pod' as const,
    title: 'Brows & lashes',
    text: 'Traditionally used to condition brows and lashes with a few drops nightly.',
  },
  {
    icon: 'drop' as const,
    title: 'Deep moisture',
    text: 'Its thick texture supports long-lasting moisture on hair ends and dry patches.',
  },
  {
    icon: 'leaf' as const,
    title: 'Gentle natural cleansing',
    text: 'Shikakai is traditionally used as a mild, natural wash for the hair.',
  },
  {
    icon: 'seed' as const,
    title: 'Herbal hair mask',
    text: 'Rosemary powder is a popular herbal ingredient in home-made hair masks.',
  },
];

export const STEPS = [
  {
    product: 'Castor oil',
    steps: [
      'Warm 1 to 2 tsp of oil between your palms.',
      'Massage gently into the scalp or skin for 5 minutes.',
      'Leave on for 30 minutes or overnight, then wash out.',
    ],
  },
  {
    product: 'Shikakai powder',
    steps: [
      'Mix 2 tbsp of powder with warm water into a smooth paste.',
      'Apply to wet hair and scalp, and massage lightly.',
      'Rinse thoroughly with water. Do not use soap afterwards.',
    ],
  },
  {
    product: 'Rosemary powder',
    steps: [
      'Mix 2 tbsp of powder with curd, water or oil until smooth.',
      'Apply as a mask to the hair and scalp.',
      'Leave for 30 minutes, then rinse with water.',
    ],
  },
];

export const WHY_POINTS = [
  {
    title: 'Single ingredient and pure',
    text: 'Zero mineral oils, artificial fragrances, parabens, or preservatives. 100% unadulterated botanical care straight from nature.',
  },
  {
    title: 'Small-batch care',
    text: 'Crafted and cold-pressed in limited monthly batches to guarantee peak freshness, potent aroma, and nutrient density.',
  },
  {
    title: 'Made in India',
    text: 'Ethically harvested and packed locally in Karnataka, honoring traditional heritage practices and supporting local farmers.',
  },
];

export const FAQS = [
  {
    q: 'What is the shelf life?',
    a: '12 months from packing date for the cold-pressed castor oil, and 18 months for the dried herbal powders.',
  },
  {
    q: 'How should I store it?',
    a: 'Keep in a cool, dry place away from direct sunlight. Close the lid or packet tightly after each use.',
  },
  {
    q: 'Who can use these products?',
    a: 'Most adults and older children can use them. Patch-test before first use. Stop use if irritation occurs and consult a doctor for any medical concern.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Orders are dispatched within 24 hours. Delivery takes 2 to 4 working days across South India and 4 to 7 days nationwide.',
  },
  {
    q: 'What payment options do you accept?',
    a: 'We accept UPI (GPay, PhonePe, Paytm, QR) and cash on delivery (COD) in selected areas. Orders are confirmed on WhatsApp.',
  },
];

// Buy 2 Castor Oil → free gift offer
export const CASTOR_OIL_OFFER = {
  triggerProductId: 'castor-oil',
  triggerQty: 2,
  badgeLabel: 'Buy 2 — Get Free Gifts!',
  freebies: [
    { name: 'Shikakai Powder', size: '30 g sample' },
    { name: 'Rosemary Powder', size: '30 g sample' },
  ],
  summary: '30 g Shikakai Powder + 30 g Rosemary Powder',
  whatsappLine: '🎁 Free Gift Included: 30 g Shikakai Powder + 30 g Rosemary Powder',
};

export const ABOUT = {
  kannadaWord: 'ಅರಳು',
  meaning: 'Aralu (ಅರಳು) is a Kannada word meaning "to bloom", the way a flower opens.',
  story:
    'Aralu Organics was born from a simple belief: the best care comes from nature, kept pure.\nWe grew up watching grandmothers press castor seeds and brew herbal rinses — rituals passed down not as routines, but as acts of love.\nToday, we make those same ingredients available in their most honest form. No blends, no fillers. Just one ingredient, handled with care and packed in small batches.',
};
