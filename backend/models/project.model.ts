export interface Project {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  content: string;
  tech_stack: string[];
  github_url: string;
  image: string;
  date: Date;
}
