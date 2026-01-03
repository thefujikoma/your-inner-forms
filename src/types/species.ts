export interface Species {
  id: string;
  commonName: string;
  scientificName: string;
  category: string;
  description: string;
  era: string;
  period: string;
}

export const SPECIES_DATA: Species[] = [
  {
    id: 'tiktaalik',
    commonName: 'Tiktaalik',
    scientificName: 'Tiktaalik roseae',
    category: 'Fish Ancestor',
    description: 'Lobe-finned transition',
    era: 'Devonian',
    period: '375 MYA',
  },
  {
    id: 'bat',
    commonName: 'Bat',
    scientificName: 'Chiroptera',
    category: 'Flying Mammal',
    description: 'Wing adaptation',
    era: 'Eocene',
    period: '52 MYA',
  },
  {
    id: 'human',
    commonName: 'Human',
    scientificName: 'Homo sapiens',
    category: 'Primate',
    description: 'Grasping hand',
    era: 'Quaternary',
    period: '300 KYA',
  },
  {
    id: 'tortoise',
    commonName: 'Tortoise',
    scientificName: 'Testudinidae',
    category: 'Reptile',
    description: 'Walking limb',
    era: 'Triassic',
    period: '220 MYA',
  },
];

export interface BoneGroup {
  id: string;
  name: string;
  color: string;
  cssVar: string;
}

export const BONE_GROUPS: BoneGroup[] = [
  { id: 'humerus', name: 'Humerus', color: '#3157FF', cssVar: '--bone-humerus' },
  { id: 'radius', name: 'Radius', color: '#D0F18D', cssVar: '--bone-radius' },
  { id: 'ulna', name: 'Ulna', color: '#84B1C8', cssVar: '--bone-ulna' },
  { id: 'carpals', name: 'Carpals / Radials', color: '#CD4D79', cssVar: '--bone-carpals' },
  { id: 'carpometacarpus', name: 'Carpometacarpus / Ulnare', color: '#E9E963', cssVar: '--bone-carpometacarpus' },
  { id: 'phalanges', name: 'Phalanges / Mesomeres', color: '#FFAAC9', cssVar: '--bone-phalanges' },
  { id: 'radioulna', name: 'Radioulna', color: '#67BE91', cssVar: '--bone-radioulna' },
  { id: 'intermedium', name: 'Intermedium', color: '#9A9A9A', cssVar: '--bone-intermedium' },
  { id: 'finrays', name: 'Fin Rays', color: '#A96CC9', cssVar: '--bone-finrays' },
];
