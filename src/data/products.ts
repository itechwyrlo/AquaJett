import aquajettExtremePhoto from '../assets/images/products/AQUAJET_EXTREME.jpg';
import aquajettSupremeV2Photo from '../assets/images/products/AQUAJET_SUPREME_V2.jpg';
import aquajettSupremeBlackEditionPhoto from '../assets/images/products/AQUAJET_SUPREME_BLACK_EDITION.jpg';

export interface ColorVariant {
  id: string;
  label: string;
  swatchColor: string;
  checkColor: string;
  image: string;
}

export interface VersionOption {
  id: string;
  label: string;
  colors: ColorVariant[];
}

export interface ProductLine {
  id: string;
  name: string;
  intendedUse: string;
  features: string[];
  versions: VersionOption[];
}

const supremeFeatures = [
  'Fully automatic operation',
  'Minimum to maximum temperature selector',
  'Temperature indicator',
  'Set at your desired temperature',
  'Tempered glass',
  'Touch temperature selector (easy to operate)',
  'Free shower accessories',
];

const extremeFeatures = [
  'Fully automatic operation',
  'Hot water for rain shower, teleshower, faucet, and lavatory sink',
  'Minimum to maximum temperature selector',
  'Elegant design',
  'ELCB (ground protector)',
  'Temperature indicator',
  'Set at your desired temperature',
];

export const productLines: ProductLine[] = [
  {
    id: 'aquajett-supreme',
    name: 'Aquajett Supreme',
    intendedUse: 'Comfortable, reliable hot water with an easy-to-use touch control panel.',
    features: supremeFeatures,
    versions: [
      {
        id: 'v2',
        label: 'V2',
        colors: [
          { id: 'white', label: 'White', swatchColor: '#F5F6F7', checkColor: '#1C1C1E', image: aquajettSupremeV2Photo },
          {
            id: 'black',
            label: 'Black Edition',
            swatchColor: '#1C1C1E',
            checkColor: '#FFFFFF',
            image: aquajettSupremeBlackEditionPhoto,
          },
        ],
      },
    ],
  },
  {
    id: 'aquajett-extreme',
    name: 'Aquajett Extreme',
    intendedUse: 'Hot water for the rain shower, teleshower, faucet, and lavatory sink — all from one unit.',
    features: extremeFeatures,
    versions: [
      {
        id: 'v2',
        label: 'V2',
        colors: [
          { id: 'white', label: 'White', swatchColor: '#F5F6F7', checkColor: '#1C1C1E', image: aquajettExtremePhoto },
        ],
      },
    ],
  },
];
