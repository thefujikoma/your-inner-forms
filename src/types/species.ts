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
  { id: 'humerus', name: 'Humerus', color: '#a855f7', cssVar: '--bone-humerus' },
  { id: 'radius', name: 'Radius', color: '#3b82f6', cssVar: '--bone-radius' },
  { id: 'ulna', name: 'Ulna', color: '#14b8a6', cssVar: '--bone-ulna' },
  { id: 'carpals', name: 'Carpals', color: '#eab308', cssVar: '--bone-carpals' },
  { id: 'metacarpals', name: 'Metacarpals', color: '#f97316', cssVar: '--bone-metacarpals' },
  { id: 'phalanges', name: 'Phalanges', color: '#ec4899', cssVar: '--bone-phalanges' },
];
