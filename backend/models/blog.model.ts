export interface Blog {
  id: number;
  title: string;
  slug: string;
  tags: string[];
  image: string;
  content: string;
  date: Date;
}
