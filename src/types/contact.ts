export interface ContactSectionContent {
  preTitle: string;
  title: string;
  paragraph: string;
  buttonText: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
}

export interface ContactSectionContextType {
  contactSectionContent: ContactSectionContent;
  setContactSectionContent: (content: ContactSectionContent) => void;
}
