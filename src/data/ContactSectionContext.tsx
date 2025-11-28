import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ContactSectionContent {
  preTitle: string;
  title: string;
  paragraph: string;
  buttonText: string;
  email: string;
}

interface ContactSectionContextType {
  contactSectionContent: ContactSectionContent;
  setContactSectionContent: (content: ContactSectionContent) => void;
}

const contactSectionInitialState: ContactSectionContent = {
  preTitle: "04. What's Next?",
  title: 'Get In Touch',
  paragraph: 'Although I’m not currently looking for any new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I’ll try my best to get back to you!',
  buttonText: 'Say Hello',
  email: 'ahmetgunes.ceng@gmail.com',
};

const ContactSectionContext = createContext<ContactSectionContextType | undefined>(undefined);

export const ContactSectionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [contactSectionContent, setContactSectionContent] = useState<ContactSectionContent>(contactSectionInitialState);

  return (
    <ContactSectionContext.Provider value={{ contactSectionContent, setContactSectionContent }}>
      {children}
    </ContactSectionContext.Provider>
  );
};

export const useContactSection = () => {
  const context = useContext(ContactSectionContext);
  if (context === undefined) {
    throw new Error('useContactSection must be used within a ContactSectionProvider');
  }
  return context;
};
