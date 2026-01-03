export interface Species {
  id: string;
  commonName: string;
  scientificName: string;
  group: string;
  timePeriod?: string;
  whyItMatters: string;
  keyIdea: string;
}

export const SPECIES_DATA: Species[] = [
  {
    id: 'tiktaalik',
    commonName: 'Tiktaalik',
    scientificName: 'Tiktaalik roseae',
    group: 'Transitional fish–tetrapod',
    timePeriod: '~375 million years ago',
    whyItMatters: 'Tiktaalik represents a pivotal moment in vertebrate history. Its fin contains bones arranged like a limb, capable of supporting weight. This structure foreshadows the forelimbs of all land vertebrates—including your hand.',
    keyIdea: 'This is where fins began behaving like arms.',
  },
  {
    id: 'coelacanth',
    commonName: 'Coelacanth',
    scientificName: 'Latimeria chalumnae',
    group: 'Lobe-finned fish',
    timePeriod: '~400 million years ago (lineage)',
    whyItMatters: 'Coelacanths possess fleshy, lobed fins with internal bones that resemble the early blueprint of limbs. These structures show that the foundations of arms and hands evolved long before animals left the water.',
    keyIdea: "Limbs didn't appear suddenly—they were already hiding in fins.",
  },
  {
    id: 'hairyfrog',
    commonName: 'Hairy Frog',
    scientificName: 'Trichobatrachus robustus',
    group: 'Amphibian',
    whyItMatters: "Amphibians were among the first vertebrates to use limb-based movement on land. The hairy frog's forelimb shows a clear transition toward weight-bearing, jointed limbs while retaining its aquatic ancestry.",
    keyIdea: 'The same bones now solve two worlds: water and land.',
  },
  {
    id: 'bat',
    commonName: 'Bat',
    scientificName: 'Desmodus rotundus',
    group: 'Mammal',
    whyItMatters: 'Bat wings are built from the same bones found in the human hand—but stretched and reshaped to support flight. The fingers become the structure itself, demonstrating how evolution repurposes existing anatomy for entirely new functions.',
    keyIdea: "Flight didn't require new bones—just new proportions.",
  },
  {
    id: 'rat',
    commonName: 'Rat',
    scientificName: 'Lenothrix canus',
    group: 'Mammal',
    whyItMatters: 'The rat forelimb represents a generalized mammalian hand. It balances flexibility and strength, making it well-suited for grasping, climbing, and manipulation. This form closely resembles the underlying structure of the human hand.',
    keyIdea: 'This is the versatile default—adaptable, efficient, familiar.',
  },
  {
    id: 'tortoise',
    commonName: 'Tortoise',
    scientificName: 'Terrapene carolina',
    group: 'Reptile',
    whyItMatters: 'Tortoise forelimbs are modified for stability and support. While the same core bones remain, they are shortened and reinforced to suit a life built around protection, weight-bearing, and slow, deliberate movement.',
    keyIdea: 'Sometimes evolution favors strength over speed.',
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
