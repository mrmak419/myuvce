// types/blogger.ts
export interface Post {
  id: string;
  title: string;
  content: string;
  slug: string;       // We will generate this from the URL
  published: string;
  labels: string[];   // Categories
  author: {
    displayName: string;
    image: { url: string };
  };
}