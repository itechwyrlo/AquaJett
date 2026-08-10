export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    id: 'coverage',
    question: 'What areas does Aquajett serve?',
    answer:
      'Aquajett Water Heaters supplies water heaters and installation services in the South, Metro Manila, and nationwide.',
  },
  {
    id: 'singlepoint-vs-multipoint',
    question: "What's the difference between Singlepoint and Multipoint installation?",
    answer:
      'A Singlepoint installation supplies hot water to one fixture, such as a shower. A Multipoint installation can supply multiple fixtures — like a rain shower, teleshower, faucet, and lavatory sink — from a single unit. Ask Aquajett which fits your home.',
  },
  {
    id: 'installation',
    question: 'Does Aquajett install the water heaters?',
    answer:
      'Yes. Aquajett provides delivery and installation services in selected areas of NCR, South Luzon, and North Luzon.',
  },
  {
    id: 'pricing-warranty',
    question: 'What about pricing, warranty, or payment options?',
    answer:
      'All units come with a 1-year product warranty. Payment can be made via Cash on Delivery or Online Payment. Contact Aquajett directly for current pricing.',
  },
  {
    id: 'contact',
    question: 'How can I reach Aquajett?',
    answer:
      'Call (049) 539 5785, mobile/message +63 915 500 0830, email aquajett.sales@gmail.com, or message the Aquajett Facebook page.',
  },
];
