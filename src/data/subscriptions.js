export const subscriptionPlans = [
  {
    id: "plan-starter",
    name: "Starter",
    price: 0,
    currency: "USD",
    period: "month",
    description: "Perfect for browsing and saving favorites.",
    features: [
      "Save products to favorites",
      "Basic sustainability tips",
      "Monthly newsletter",
      "Access to public community posts",
    ],
    highlighted: false,
    badge: "Free",
  },
  {
    id: "plan-plus",
    name: "Plus",
    price: 7,
    currency: "USD",
    period: "month",
    description: "For everyday low-waste habits and recipes.",
    features: [
      "Weekly recipe drops",
      "Seasonal swaps & shopping list",
      "Community comments & reactions",
      "Early access to new product launches",
    ],
    highlighted: true,
    badge: "Most popular",
  },
  {
    id: "plan-green",
    name: "Green",
    price: 19,
    currency: "USD",
    period: "month",
    description: "Best for refills and carbon-aware routines.",
    features: [
      "Monthly refill bundle options",
      "Carbon footprint estimate per order",
      "Priority customer support",
      "Exclusive guides & workshops",
    ],
    highlighted: false,
    badge: "Best value",
  },
];

export const subscriptionFaq = [
  {
    id: "faq-1",
    question: "Can I cancel anytime?",
    answer:
      "Yes. You can cancel at any time from your dashboard, and your plan will remain active until the end of the billing period.",
  },
  {
    id: "faq-2",
    question: "Do you offer student discounts?",
    answer:
      "We occasionally run student and community discounts. Check the subscription page banner or newsletter for current offers.",
  },
  {
    id: "faq-3",
    question: "How do refills work?",
    answer:
      "Refills ship in reduced packaging. You reuse your main container and replace only what’s needed each month.",
  },
];

export const getPlanById = (planId) => subscriptionPlans.find((p) => p.id === planId) || null;

export const planIds = subscriptionPlans.map((p) => p.id);
