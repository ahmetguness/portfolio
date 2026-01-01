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





export interface User {
  username: string;
  isAdmin: boolean;
}
