import type { Me, Project, Post, Link } from "./types";

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

export const POSTS: Post[] = [
  {
    id: 5,
    date: "2026-04-25",
    time: "14:32",
    project: "mcg",
    body: "figured out the stack, pages, and overall vibe of the website. the next thing woudl be deciding whetehr i want to go more y2k or more modern like twitter. maybe a mix of both? but a mix of both in what areas? thinking of using claude deisgn but its prone to be bugginnng OMD (on mai dead).",
  },
  {
    id: 4,
    date: "2026-04-25",
    time: "11:08",
    project: "mcg",
    body: "ok so the whole point of this site: write the post WHILE im building, not after. capture the thinking, not the diff. inspired by the opening of the social network where mark blogs on livejournal while building facemash at the same time. that energy.",
  },
  {
    id: 3,
    date: "2026-04-24",
    time: "23:11",
    project: "mcg",
    body: "spent 4 hours trying to get a sidebar to not jump 2px on hover. claude kept generating perfectly correct code that did not fix it. eventually i noticed the parent had a 1px border that disappeared on focus. on mai dead.",
    hasCode: true,
    codeSnippet:
      ".sidebar:focus-within { border: 1px solid transparent; }\n/* ^^ the bug. invisible until you stare at it. */",
  },
  {
    id: 2,
    date: "2026-04-23",
    time: "09:47",
    project: null,
    body: "standalone thought, not project-related: i think the best personal sites feel like you walked into someone's room. theres stuff on the walls. its not for you. you can leave whenever. but while youre there you learn something about the person.\n\nthats the bar.",
  },
  {
    id: 1,
    date: "2026-04-22",
    time: "17:20",
    project: "kettle",
    body: "kettle v1.0 shipped. 47 stars overnight which is wild for a markdown cms that fits in a gist. main thing i learned is people will install almost anything if the readme is funny. signing off.",
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
