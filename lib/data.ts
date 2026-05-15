import type { Me, Project, Link } from "./types";

export const ME: Me = {
  handle: "medercoolguy",
  url: "meder-cool-guy.com",
  name: "MEDER",
  bio: "charasmatic, funny, intellegent, tall, gorgeous, money smart, brilliant, but most importanly, humble",
  tagline: "this is my corner of the internet.",
  manifesto:
    "i build things and write about them while i build them. thats the whole site. anyone can ship a repo — i wanted somewhere to show the thinking too.",
  location: "IL",
  nowBuilding: "this site",
  nowReading: "the social network screenplay (again)",
  nowListening: { artist: "mitski", track: "working for the knife" },
};

export const LINKS: Link[] = [
  { label: "github", handle: "/medercoolguy", kind: "gh" },
  { label: "email", handle: "meder@meder-cool-guy.com", kind: "mail" },
  { label: "twitter", handle: "@medercoolguy", kind: "tw" },
  { label: "rss", handle: "/feed.xml", kind: "rss" },
];

export const PROJECTS: Project[] = [
  {
    slug: "mcg",
    name: "meder-cool-guy.com",
    status: "in progress",
    desc: "this site. a journal that documents itself.",
    repo: "medercoolguy/mcg",
    posts: 5,
    lastPost: "4m ago",
    stars: 12,
    year: "2026",
  },
  {
    slug: "tne",
    name: "TNE",
    status: "in progress",
    desc: "the next experiment. tbd.",
    repo: "medercoolguy/tne",
    posts: 12,
    lastPost: "2d ago",
    stars: 3,
    year: "2026",
  },
  {
    slug: "kettle",
    name: "kettle",
    status: "shipped",
    desc: "a tiny markdown cms that fits in a gist.",
    repo: "medercoolguy/kettle",
    posts: 8,
    lastPost: "3 weeks ago",
    stars: 47,
    year: "2025",
  },
  {
    slug: "low-stakes",
    name: "low-stakes",
    status: "in progress",
    desc: "card game for two friends and a bottle of wine.",
    repo: "medercoolguy/low-stakes",
    posts: 4,
    lastPost: "1 week ago",
    stars: 1,
    year: "2025",
  },
  {
    slug: "rotorua",
    name: "rotorua",
    status: "abandoned",
    desc: "maps client that only shows weird stuff. shelved for now.",
    repo: "medercoolguy/rotorua",
    posts: 6,
    lastPost: "4 months ago",
    stars: 22,
    year: "2024",
  },
];

export const projectBySlug = (slug: string | null): Project | null =>
  slug ? PROJECTS.find((p) => p.slug === slug) ?? null : null;

export const statusVar = (s: import("./types").ProjectStatus): string =>
  s === "in progress"
    ? "var(--status-prog)"
    : s === "shipped"
    ? "var(--status-shipped)"
    : "var(--status-aban)";
