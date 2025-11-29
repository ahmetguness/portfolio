import React, { createContext, useContext, useState, ReactNode } from 'react';
import { HeroContent, HeroContextType } from '../types/hero';

const heroInitialState: HeroContent = {
  line1: 'Hi, my name is',
  name: 'Ahmet.',
  line2: 'I build things for the web.',
  description: "I'm a frontend engineer specializing in building (and occasionally designing) exceptional digital experiences. Currently, I’m focused on building accessible, human-centered products.",
  buttonText: 'Get In Touch',
  cvButtonText: 'Download CV',
};

const HeroContext = createContext<HeroContextType | undefined>(undefined);

export const HeroProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [heroContent, setHeroContent] = useState<HeroContent>(heroInitialState);

  return (
    <HeroContext.Provider value={{ heroContent, setHeroContent }}>
      {children}
    </HeroContext.Provider>
  );
};

export const useHero = () => {
  const context = useContext(HeroContext);
  if (context === undefined) {
    throw new Error('useHero must be used within a HeroProvider');
  }
  return context;
};
