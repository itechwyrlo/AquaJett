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
      'Aquajett Water Heaters Trading supplies water heaters and installation services in the South, Metro Manila, and nationwide.',
  },
  {
    id: 'singlepoint-vs-multipoint',
    question: "What's the difference between Singlepoint and Multipoint installation?",
    answer:
      'A Singlepoint installation supplies hot water to one fixture, such as a shower. A Multipoint installation can supply multiple fixtures — like a rain shower, teleshower, faucet, and lavatory sink — from a single unit. Either the Supreme or Extreme line can be set up either way; ask Aquajett which fits your home.',
  },
  {
    id: 'installation',
    question: 'Does Aquajett install the water heaters it sells?',
    answer:
      'Yes. Aquajett provides delivery and installation services after you choose a model and discuss your needs with the team.',
  },
  {
    id: 'features',
    question: 'What features do Aquajett water heaters have?',
    answer:
      'Every model is fully automatic with a minimum-to-maximum temperature selector, a temperature indicator, and lets you set your desired temperature. The Supreme line adds tempered glass, a touch temperature selector, and free shower accessories. The Extreme line adds an ELCB (ground protector) and hot water for the rain shower, teleshower, faucet, and lavatory sink from one unit.',
  },
  {
    id: 'pricing-warranty',
    question: 'What about pricing, warranty, or payment options?',
    answer:
      "Pricing, warranty terms, and payment options aren't published here. Call, message, or email Aquajett directly and the team will walk you through current details.",
  },
  {
    id: 'contact',
    question: 'How can I reach Aquajett?',
    answer:
      'Call (049) 539 5785, mobile/message +63 915 500 0830, email aquajett.sales@gmail.com, or message the Aquajett Facebook page.',
  },
];
