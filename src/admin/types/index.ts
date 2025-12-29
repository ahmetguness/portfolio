export interface BlogPost {
  id: string;
  title: string;
  shortDescription: string;
  image: string;
  mediumUrl: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  image: string;
  githubUrl: string;
  liveUrl?: string;
  techTags: string[];
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface HomeContent {
  heroTitle: string;
  heroSubtitle: string;
  ctaText: string;
  aboutText: string;
  socials: SocialLink[];
}

export interface User {
  username: string;
  isAdmin: boolean;
}
