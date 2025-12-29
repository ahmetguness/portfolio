import { HomeContent } from '../types';

const STORAGE_KEY = 'admin_home_content';

const defaultContent: HomeContent = {
  heroTitle: "Hi There!",
  heroSubtitle: "I'M Ahmet Güneş",
  ctaText: "Contact Me",
  aboutText: "I love the process of changing a raw idea into a website or a product that impacts lives.",
  socials: [
    { platform: "Github", url: "https://github.com/ahmetguness" },
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/ahmet-g%C3%BCne%C5%9F-52381b27a/" }
  ]
};

export const contentService = {
  get: async (): Promise<HomeContent> => {
    return new Promise((resolve) => {
      const data = localStorage.getItem(STORAGE_KEY);
      setTimeout(() => resolve(data ? JSON.parse(data) : defaultContent), 300);
    });
  },

  update: async (content: HomeContent): Promise<HomeContent> => {
    return new Promise((resolve) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
      setTimeout(() => resolve(content), 500);
    });
  }
};
