import classicSpPhoto from '../assets/images/products/aquajett-classic-sp.png';
import deluxeMpPhoto from '../assets/images/products/aquajett-deluxe-mp.png';
import extremeSpPhoto from '../assets/images/products/aquajett-extreme-sp.png';
import grandeMpPhoto from '../assets/images/products/aquajett-grande-mp.png';
import grandeSpPhoto from '../assets/images/products/aquajett-grande-sp.png';
import paradigmSpPhoto from '../assets/images/products/aquajett-paradigm-sp.png';
import premiumMpPhoto from '../assets/images/products/aquajett-premium-mp.png';
import supremeMpPhoto from '../assets/images/products/aquajett-supreme-mp.png';
import supremeSpPhoto from '../assets/images/products/aquajett-supreme-sp.png';

export interface VersionOption {
  id: string;
  label: string;
  image: string;
  details: string;
}

export interface ProductLine {
  id: string;
  name: string;
  intendedUse: string;
  versions: VersionOption[];
}

export const productLines: ProductLine[] = [
  {
    id: 'aquajett-classic',
    name: 'Aquajett Classic',
    intendedUse: 'A dependable singlepoint shower heater that comes complete with shower accessories.',
    versions: [
      {
        id: 'sp',
        label: 'SP',
        image: classicSpPhoto,
        details:
          'Singlepoint unit for shower only, fully automatic with low/medium/high temperature selection. 3.5 kW, 4 litres/minute, 12" x 4" x 8", and comes with a shower head, riser bar, and soap dish. With power light indicator, high-grade composite plastic heating chamber, good performance across low and high water pressure, splash-proof IPX4 casing, and a pressure relief valve.',
      },
    ],
  },
  {
    id: 'aquajett-deluxe',
    name: 'Aquajett Deluxe',
    intendedUse: 'A compact multipoint heater built for homes with limited installation space.',
    versions: [
      {
        id: 'mp',
        label: 'MP',
        image: deluxeMpPhoto,
        details:
          'Multipoint unit for shower, faucet & sink, fully automatic with push-button, stepless temperature control. 5.0 kW, 4 litres/minute, 8" x 3.5" x 7". With digital temperature display, auto cut-off at your desired setting, a nickel chromium heating element, good performance across low and high water pressure, splash-proof IPX4 casing, and a compact design for tight spaces.',
      },
    ],
  },
  {
    id: 'aquajett-extreme',
    name: 'Aquajett Extreme',
    intendedUse: 'An elegant singlepoint shower heater with a built-in ground protector for extra safety.',
    versions: [
      {
        id: 'sp',
        label: 'SP',
        image: extremeSpPhoto,
        details:
          'Singlepoint unit for shower only, fully automatic with stepless temperature control. 3.5 kW, 4 litres/minute, 8.5" x 3" x 13", and comes with a shower head, riser bar, and soap dish. High-grade composite plastic heating chamber, with ELCB ground protector, set at your desired temperature, good performance across low and high water pressure, and splash-proof IPX4 casing.',
      },
    ],
  },
  {
    id: 'aquajett-grande',
    name: 'Aquajett Grande',
    intendedUse: 'A powerful heater available in both multipoint and singlepoint configurations.',
    versions: [
      {
        id: 'mp',
        label: 'MP',
        image: grandeMpPhoto,
        details:
          'Multipoint unit for shower, faucet & sink, fully automatic with push-button, stepless temperature control. 4.0–5.5 kW, 4 litres/minute, 9" x 3" x 13". With digital temperature display and power light indicator, auto cut-off, high-grade composite plastic heating chamber, good performance across low and high water pressure, splash-proof IPX4 casing, and a built-in temperature stabilizer.',
      },
      {
        id: 'sp',
        label: 'SP',
        image: grandeSpPhoto,
        details:
          'Singlepoint unit for shower only, fully automatic with push-button, stepless temperature control. 4.0 kW, 4 litres/minute, 9" x 3" x 13", and comes with a shower head, riser bar, and soap dish. With temperature display and power light indicator, auto cut-off, high-grade composite plastic heating chamber, good performance across low and high water pressure, splash-proof IPX4 casing, and a built-in temperature stabilizer.',
      },
    ],
  },
  {
    id: 'aquajett-paradigm',
    name: 'Aquajett Paradigm',
    intendedUse: 'A slim singlepoint shower heater with stepless minimum-to-maximum temperature control.',
    versions: [
      {
        id: 'sp',
        label: 'SP',
        image: paradigmSpPhoto,
        details:
          'Singlepoint unit for shower only, fully automatic with minimum-to-maximum stepless temperature control. 3.5 kW, 2 litres/minute, 8.5" x 4" x 12", and comes with a shower head, riser bar, and soap dish. With power light indicator, high-grade composite plastic heating chamber, good performance across low and high water pressure, splash-proof IP25 casing, and a built-in temperature stabilizer.',
      },
    ],
  },
  {
    id: 'aquajett-premium',
    name: 'Aquajett Premium',
    intendedUse: 'A wall-mounted multipoint heater built for fast, tidy installation.',
    versions: [
      {
        id: 'mp',
        label: 'MP',
        image: premiumMpPhoto,
        details:
          'Multipoint unit for shower, faucet & sink, fully automatic with push-button, stepless temperature control. 5.0 kW, 4 litres/minute, 8.5" x 3" x 12". With digital temperature display, auto cut-off at your desired setting, a nickel chromium heating element, good performance across low and high water pressure, splash-proof IPX4 casing, and a wall mount bracket for easy installation.',
      },
    ],
  },
  {
    id: 'aquajett-supreme',
    name: 'Aquajett Supreme',
    intendedUse: "Aquajett's flagship line, with an easy-to-use touch control panel — available multipoint or singlepoint.",
    versions: [
      {
        id: 'mp',
        label: 'MP',
        image: supremeMpPhoto,
        details:
          'Multipoint unit for shower, faucet & sink, fully automatic with push-button, stepless temperature control. 5.5 kW, 4 litres/minute, 7.5" x 3" x 12". With digital temperature display and power light indicator, auto cut-off at your desired setting, good performance across low and high water pressure, splash-proof IPX4 casing, and an earth leakage circuit breaker (ELCB).',
      },
      {
        id: 'sp',
        label: 'SP',
        image: supremeSpPhoto,
        details:
          'Singlepoint unit for shower, fully automatic with push-button, stepless temperature control. 3.5 kW, 4 litres/minute, 7.5" x 3" x 12", and comes with a shower head, riser bar, and soap dish. With digital temperature display and power light indicator, auto cut-off at your desired setting, good performance across low and high water pressure, splash-proof IPX4 casing, and an earth leakage circuit breaker (ELCB).',
      },
    ],
  },
];
