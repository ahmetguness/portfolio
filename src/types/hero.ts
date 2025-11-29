export interface HeroContent {
  line1: string;
  name: string;
  line2: string;
  description: string;
  buttonText: string;
  cvButtonText: string;
}

export interface HeroContextType {
  heroContent: HeroContent;
  setHeroContent: (content: HeroContent) => void;
}
