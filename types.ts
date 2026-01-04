
export enum AnimalType {
  TIGER = 'TIGER',       // Dominance
  PEACOCK = 'PEACOCK',   // Extroversion
  KOALA = 'KOALA',       // Patience
  OWL = 'OWL',           // Conformity
  CHAMELEON = 'CHAMELEON' // Adaptability
}

export interface Question {
  id: number;
  text: string;
  category: AnimalType;
}

export interface ScoreProfile {
  [AnimalType.TIGER]: number;
  [AnimalType.PEACOCK]: number;
  [AnimalType.KOALA]: number;
  [AnimalType.OWL]: number;
  [AnimalType.CHAMELEON]: number;
}

export interface TestResult {
  primaryType: AnimalType;
  scores: ScoreProfile;
  analysis: string;
}
