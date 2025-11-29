export interface Post {
    slug: string;
    date: string;
    title: string;
    tags: string[];
    url: string;
    image: string;
    content: string; // Markdown content
}

export interface BlogContextType {
  posts: Post[];
  addPost: (post: Post) => void;
  deletePost: (slug: string) => void;
  updatePost: (slug: string, post: Post) => void;
}

export interface BlogSectionContent {
  title: string;
  buttonText: string;
}

export interface BlogSectionContextType {
  blogSectionContent: BlogSectionContent;
  setBlogSectionContent: (content: BlogSectionContent) => void;
}
