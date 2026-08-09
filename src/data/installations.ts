import uptownPlaceTower3 from '../assets/images/installations/UPTOWN_PLACE_TOWER_3_BGC_Taguig_City.jpg';
import regencyExecutiveTownhomes from '../assets/images/installations/REGENCY_EXECUTIVE_TOWNHOMES_Dasmariñas_Cavite.jpg';
import pawsAndPlayPetHotel from '../assets/images/installations/PAWS_&_PLAY_PET_HOTEL_BY_VILLAGE_VET.jpg';
import green2Residences from '../assets/images/installations/RESIDENCES_BY_SMDC_Dasmariñas_Cavite.jpg';
import bellavitaSubdivision from '../assets/images/installations/BELLAVITA_SUBDIVISION_General_Trias_Cavite.jpg';
import northGreenhills from '../assets/images/installations/NORTH_GREENHILLS_San_Juan_City.jpg';
import margaretHomes from '../assets/images/installations/MARGARET_HOMES_Sta_Maria_Bulacan.jpg';
import staRosaHeights from '../assets/images/installations/STA_ROSA_HEIGHTS_SUBDIVISION_Silang_Cavite.jpg';
import tagaytayCountryHomes3 from '../assets/images/installations/TAGAYTAY_COUNTRY_HOMES_3.jpg';
import kaytambog from '../assets/images/installations/KAYTAMBOG_INDANG_CAVITE.jpg';
import windResidencesTagaytay from '../assets/images/installations/WIND_RESIDENCES_TAGAYTAY.jpg';
import project4 from '../assets/images/installations/PROJECT_4_QUEZON_CITY.jpg';
import fairwaySubdivision from '../assets/images/installations/Fairway_Subdivision_Dasmariñas_Cavite.jpg';
import parkplaceVillage from '../assets/images/installations/PARKPLACE_VILLAGE_Anabu_Imus_Cavite.jpg';
import sanMiguelVillage from '../assets/images/installations/SAN_MIGUEL_VILLAGE_MAKATI_CITY.jpg';
import scandiaSuites2 from '../assets/images/installations/SCANDIA_SUITES_2_CONDOMINIUM_BRGY_INCHICAN_SILANG_CAVITE.jpg';
import villaLigayaSubdivision from '../assets/images/installations/VILLA_LIGAYA_SUBDIVISION_Antipolo_City.jpg';

export interface Installation {
  id: string;
  location: string;
  area: string;
  image?: string;
}

export const installations: Installation[] = [
  { id: 'uptown-place-tower-3', location: 'Uptown Place Tower 3', area: 'BGC, Taguig City', image: uptownPlaceTower3 },
  {
    id: 'regency-executive-townhomes',
    location: 'Regency Executive Townhomes',
    area: 'Dasmariñas, Cavite',
    image: regencyExecutiveTownhomes,
  },
  {
    id: 'paws-and-play-pet-hotel',
    location: 'Paws & Play Pet Hotel by Village Vet',
    area: 'South Forbes, Silang, Cavite',
    image: pawsAndPlayPetHotel,
  },
  { id: 'royale-tagaytay-estates', location: 'Royale Tagaytay Estates', area: 'Alfonso, Cavite' },
  {
    id: 'green-2-residences',
    location: 'Green 2 Residences by SMDC',
    area: 'Dasmariñas, Cavite',
    image: green2Residences,
  },
  {
    id: 'bellavita-subdivision',
    location: 'Bellavita Subdivision',
    area: 'General Trias, Cavite',
    image: bellavitaSubdivision,
  },
  { id: 'north-greenhills', location: 'North Greenhills', area: 'San Juan City', image: northGreenhills },
  { id: 'margaret-homes', location: 'Margaret Homes', area: 'Sta. Maria, Bulacan', image: margaretHomes },
  {
    id: 'sta-rosa-heights',
    location: 'Sta. Rosa Heights Subdivision',
    area: 'Silang, Cavite',
    image: staRosaHeights,
  },
  {
    id: 'tagaytay-country-homes-3',
    location: 'Tagaytay Country Homes 3',
    area: 'Tagaytay',
    image: tagaytayCountryHomes3,
  },
  { id: 'kaytambog', location: 'Kaytambog', area: 'Indang, Cavite', image: kaytambog },
  {
    id: 'wind-residences-tagaytay',
    location: 'Wind Residences Tagaytay',
    area: 'Tagaytay',
    image: windResidencesTagaytay,
  },
  { id: 'project-4', location: 'Project 4', area: 'Quezon City', image: project4 },
  { id: 'kasa-luntian-tagaytay', location: 'Kasa Luntian Tagaytay by Alveo Land', area: 'Tagaytay' },
  {
    id: 'fairway-subdivision',
    location: 'Fairway Subdivision',
    area: 'Dasmariñas, Cavite',
    image: fairwaySubdivision,
  },
  {
    id: 'parkplace-village',
    location: 'ParkPlace Village',
    area: 'Anabu, Imus, Cavite',
    image: parkplaceVillage,
  },
  { id: 'san-miguel-village', location: 'San Miguel Village', area: 'Makati City', image: sanMiguelVillage },
  {
    id: 'scandia-suites-2',
    location: 'Scandia Suites 2 Condominium',
    area: 'Brgy. Inchican, Silang, Cavite',
    image: scandiaSuites2,
  },
  {
    id: 'villa-ligaya-subdivision',
    location: 'Villa Ligaya Subdivision',
    area: 'Antipolo City',
    image: villaLigayaSubdivision,
  },
];
