import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AboutContextType {
  aboutText: string;
  setAboutText: (text: string) => void;
}

const aboutMeInitialState = `Hello! I'm Ahmet, a creative developer with a passion for bridging the gap
between design and technology. My journey into web development started back in 2020
when I decided to build a custom dashboard for a game I loved — turns out hacking
together a UI taught me a lot about HTML & CSS!

Fast-forward to today, I've had the privilege of working at a creative agency, a start-up,
and a huge corporation. My main focus these days is building accessible, inclusive products
and digital experiences for a variety of clients.`;

const AboutContext = createContext<AboutContextType | undefined>(undefined);

export const AboutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [aboutText, setAboutText] = useState<string>(aboutMeInitialState);

  return (
    <AboutContext.Provider value={{ aboutText, setAboutText }}>
      {children}
    </AboutContext.Provider>
  );
};

export const useAbout = () => {
  const context = useContext(AboutContext);
  if (context === undefined) {
    throw new Error('useAbout must be used within a AboutProvider');
  }
  return context;
};
