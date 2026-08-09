export interface Installation {
  id: string;
  location: string;
  area: string;
  image?: string;
}

export const installations: Installation[] = [
  { id: 'uptown-place-tower-3', location: 'Uptown Place Tower 3', area: 'BGC, Taguig City' },
  { id: 'regency-executive-townhomes', location: 'Regency Executive Townhomes', area: 'Dasmariñas, Cavite' },
  { id: 'paws-and-play-pet-hotel', location: 'Paws & Play Pet Hotel by Village Vet', area: 'South Forbes, Silang, Cavite' },
  { id: 'royale-tagaytay-estates', location: 'Royale Tagaytay Estates', area: 'Alfonso, Cavite' },
  { id: 'green-2-residences', location: 'Green 2 Residences by SMDC', area: 'Dasmariñas, Cavite' },
  { id: 'bellavita-subdivision', location: 'Bellavita Subdivision', area: 'General Trias, Cavite' },
  { id: 'north-greenhills', location: 'North Greenhills', area: 'San Juan City' },
  { id: 'margaret-homes', location: 'Margaret Homes', area: 'Sta. Maria, Bulacan' },
  { id: 'sta-rosa-heights', location: 'Sta. Rosa Heights Subdivision', area: 'Silang, Cavite' },
  { id: 'tagaytay-country-homes-3', location: 'Tagaytay Country Homes 3', area: 'Tagaytay' },
  { id: 'kaytambog', location: 'Kaytambog', area: 'Indang, Cavite' },
  { id: 'wind-residences-tagaytay', location: 'Wind Residences Tagaytay', area: 'Tagaytay' },
  { id: 'project-4', location: 'Project 4', area: 'Quezon City' },
  { id: 'kasa-luntian-tagaytay', location: 'Kasa Luntian Tagaytay by Alveo Land', area: 'Tagaytay' },
];
