export type ProjectStatus = "in progress" | "shipped" | "abandoned";

export interface Project {
  slug: string;
  name: string;
  status: ProjectStatus;
  desc: string;
  repo: string;
  posts: number;
  lastPost: string;
  stars: number;
  year: string;
}

export interface Post {
  id: number;
  date: string;
  time: string;
  projectSlug: string | null;
  body: string;
  hasCode: boolean;
  codeSnippet: string | null;
  createdAt?: Date;
}

export interface Me {
  handle: string;
  url: string;
  name: string;
  bio: string;
  tagline: string;
  manifesto: string;
  location: string;
  nowBuilding: string;
  nowReading: string;
  nowListening: { artist: string; track: string };
}

export interface Link {
  label: string;
  handle: string;
  kind: "gh" | "mail" | "tw" | "rss";
}
