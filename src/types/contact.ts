export interface ContactSectionContent {
  preTitle: string;
  title: string;
  paragraph: string;
  buttonText: string;
  email: string;
}

export interface ContactSectionContextType {
  contactSectionContent: ContactSectionContent;
  setContactSectionContent: (content: ContactSectionContent) => void;
}
