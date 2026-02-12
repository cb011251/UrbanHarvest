export const postCategories = [
  { id: "recipes", label: "Recipes" },
  { id: "guides", label: "Guides" },
  { id: "tips", label: "Tips" },
  { id: "stories", label: "Stories" },
];

export const posts = [
  {
    id: "post-001",
    slug: "one-pan-seasonal-veggie-bowl",
    title: "One-pan seasonal veggie bowl (zero-waste friendly)",
    category: "recipes",
    date: "2026-01-30",
    author: "Urban Harvest Team",
    readTime: "4 min",
    excerpt: "A flexible, tasty bowl that uses whatever vegetables you already have — perfect for reducing food waste.",
    tags: ["zero-waste", "meal-prep", "plant-based"],
    coverImage: "https://picsum.photos/seed/uh-post-001/900/600",
    content: [
      "Start by chopping leftover vegetables (carrots, beans, pumpkin, greens).",
      "Toss with olive oil, salt, pepper, and any spice mix you like.",
      "Roast or pan-sear until tender and slightly browned.",
      "Serve over rice, quinoa, or even leftover noodles.",
      "Top with a quick dressing: lemon + tahini + a splash of water.",
    ],
    callout: {
      title: "Sustainability tip",
      text: "Keep a “fridge clean-out” box. Cook whatever’s inside before buying new produce.",
    },
  },
  {
    id: "post-002",
    slug: "how-to-start-a-kitchen-compost-setup",
    title: "How to start composting in a small kitchen",
    category: "guides",
    date: "2026-02-02",
    author: "Community Contributor",
    readTime: "6 min",
    excerpt:
      "No garden? No problem. A simple countertop setup can reduce your food waste and keep your bin smell-free.",
    tags: ["compost", "beginner", "home"],
    coverImage: "https://picsum.photos/seed/uh-post-002/900/600",
    content: [
      "Pick a container with a lid (or a compost caddy).",
      "Line it with newspaper or a compostable bag to reduce mess.",
      "Add browns: dry leaves, shredded paper, cardboard (small pieces).",
      "Add greens: fruit/veg peels, coffee grounds, tea leaves.",
      "Avoid: meat, oily food, and dairy in a small setup.",
      "Empty to a community compost point or compost service weekly.",
    ],
    callout: {
      title: "Quick win",
      text: "Coffee grounds are great for balancing wet scraps — and they reduce odors.",
    },
  },
  {
    id: "post-003",
    slug: "refill-vs-single-use-the-math",
    title: "Refill vs single-use: the simple math behind it",
    category: "tips",
    date: "2026-02-05",
    author: "Urban Harvest Team",
    readTime: "5 min",
    excerpt:
      "Refills often cost less over time and cut packaging waste dramatically. Here’s a simple way to compare options.",
    tags: ["refill", "plastic", "budget"],
    coverImage: "https://picsum.photos/seed/uh-post-003/900/600",
    content: [
      "Compare the price per 100ml/100g rather than the sticker price.",
      "Check packaging type: glass, aluminum, recycled plastic, compostable.",
      "Estimate how many bottles you use per month.",
      "Refill packs typically reduce packaging weight and volume.",
      "If available, choose local refills to reduce shipping emissions.",
    ],
    callout: {
      title: "Try this",
      text: "Take a photo of unit prices while shopping — it helps you spot the best value fast.",
    },
  },
  {
    id: "post-004",
    slug: "community-spotlight-local-makers",
    title: "Community spotlight: local makers doing it right",
    category: "stories",
    date: "2026-02-07",
    author: "Community Contributor",
    readTime: "7 min",
    excerpt:
      "Meet a few of our small suppliers and learn how they reduce waste, support fair wages, and keep quality high.",
    tags: ["community", "local", "suppliers"],
    coverImage: "https://picsum.photos/seed/uh-post-004/900/600",
    content: [
      "Small-batch production reduces overstock and landfill waste.",
      "Transparent sourcing makes it easier to verify ethical practices.",
      "Durable packaging (or take-back programs) improves reusability.",
      "Local networks reduce transport distance and emissions.",
      "Community feedback helps makers improve products quickly.",
    ],
    callout: {
      title: "Support local",
      text: "Buying small-batch often means fewer additives and better traceability.",
    },
  },
];

export const featuredPost = posts[0];
