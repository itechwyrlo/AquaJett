export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: 'Products', href: '#products' },
  { label: 'Services', href: '#installation-process' },
  { label: 'Installations', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export const contactInfo = {
  phone: '(049) 539 5785',
  phoneHref: 'tel:+63495395785',
  mobile: '+63 915 500 0830',
  mobileHref: 'tel:+639155000830',
  email: 'aquajett.sales@gmail.com',
  emailHref: 'mailto:aquajett.sales@gmail.com',
  facebook: 'https://www.facebook.com/aquajett.tagaytay/',
  address:
    'Unit R Level 2 CM 1 Amable Bldg., Sta. Rosa Heights, Brgy. Puting Kahoy, Silang, Cavite (Sta. Rosa - Tagaytay Road)',
  mapsHref:
    'https://www.google.com/maps/search/?api=1&query=Amable+Bldg+Sta+Rosa+Heights+Brgy+Puting+Kahoy+Silang+Cavite',
} as const;
