import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const db = new PrismaClient({ adapter });

const posts = [
  {
    date: "2026-04-25",
    time: "14:32",
    projectSlug: "mcg",
    body: "figured out the stack, pages, and overall vibe of the website. the next thing woudl be deciding whetehr i want to go more y2k or more modern like twitter. maybe a mix of both? but a mix of both in what areas? thinking of using claude deisgn but its prone to be bugginnng OMD (on mai dead).",
    hasCode: false,
    codeSnippet: null,
  },
  {
    date: "2026-04-25",
    time: "11:08",
    projectSlug: "mcg",
    body: "ok so the whole point of this site: write the post WHILE im building, not after. capture the thinking, not the diff. inspired by the opening of the social network where mark blogs on livejournal while building facemash at the same time. that energy.",
    hasCode: false,
    codeSnippet: null,
  },
  {
    date: "2026-04-24",
    time: "23:11",
    projectSlug: "mcg",
    body: "spent 4 hours trying to get a sidebar to not jump 2px on hover. claude kept generating perfectly correct code that did not fix it. eventually i noticed the parent had a 1px border that disappeared on focus. on mai dead.",
    hasCode: true,
    codeSnippet: ".sidebar:focus-within { border: 1px solid transparent; }\n/* ^^ the bug. invisible until you stare at it. */",
  },
  {
    date: "2026-04-23",
    time: "09:47",
    projectSlug: null,
    body: "standalone thought, not project-related: i think the best personal sites feel like you walked into someone's room. theres stuff on the walls. its not for you. you can leave whenever. but while youre there you learn something about the person.\n\nthats the bar.",
    hasCode: false,
    codeSnippet: null,
  },
  {
    date: "2026-04-22",
    time: "17:20",
    projectSlug: "kettle",
    body: "kettle v1.0 shipped. 47 stars overnight which is wild for a markdown cms that fits in a gist. main thing i learned is people will install almost anything if the readme is funny. signing off.",
    hasCode: false,
    codeSnippet: null,
  },
];

async function main() {
  const count = await db.post.count();
  if (count > 0) {
    console.log(`Already has ${count} posts — skipping seed.`);
    return;
  }
  for (const post of posts) {
    await db.post.create({ data: post });
  }
  console.log(`Seeded ${posts.length} posts.`);
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
