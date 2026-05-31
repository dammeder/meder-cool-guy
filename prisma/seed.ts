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
  } else {
    for (const post of posts) {
      await db.post.create({ data: post });
    }
    console.log(`Seeded ${posts.length} posts.`);
  }

  const articleCount = await db.article.count();
  if (articleCount > 0) {
    console.log(`Already has ${articleCount} articles — skipping article seed.`);
    return;
  }

  await db.article.create({
    data: {
      slug: "llm-wiki",
      title: "LLM + Wiki: A Match Made in Second Brain Heaven",
      description:
        "What happens when you give a language model permanent memory backed by a living document. Why wikis and LLMs are a more natural fit than RAG hype would have you believe.",
      body: `I've been obsessed with a question lately: what if your LLM actually *knew* things?

Not retrieved things. Not hallucinated things. *Known* things — the way you know your own apartment layout, or your project's weird quirks, or which APIs break on Tuesdays.

The standard answer is RAG (retrieval-augmented generation). You embed your documents, you retrieve chunks on-demand, you inject context. It works. But there's something fundamentally off about it.

## The Problem with RAG

RAG treats knowledge like a filing cabinet. You query it, you get a drawer, you read the drawer. The model never *absorbs* anything — it's always reaching.

The result: answers that feel assembled rather than understood. The model knows what the document says. It doesn't know what you *meant* when you wrote it at 2am with three browser tabs open and a half-formed intuition about the architecture.

## Wikis Are Different

A wiki isn't a filing cabinet. A wiki is a *mind map* with timestamps.

Good wikis have:
- **Bidirectional links** — ideas know each other
- **Edit history** — you can see how understanding evolved
- **Density gradients** — some pages are stubs, some are dense, and that signal matters
- **Author voice** — you can tell which pages someone cared about

These are exactly the things RAG ignores. Chunk size is uniform. Retrieval is cosine similarity. The shape of the knowledge graph is invisible.

## What I'm Building

The idea: treat an Obsidian vault as a **first-class knowledge layer** for an LLM, not just a document store.

Concretely:
1. Parse the vault graph (links, backlinks, tags, frontmatter)
2. Build a weighted context selector — not by similarity but by *relevance topology*
3. Feed the model not chunks but **knowledge paths** — the chain of links between the query and the answer

\`\`\`
query: "why did we switch from prisma to drizzle?"
→ find: /decisions/db-migration.md
→ traverse: backlinks, tagged #architecture
→ path: db-migration → performance-notes → prisma-limitations
→ context: three connected notes, ordered by reasoning flow
\`\`\`

The model gets a *story*, not a pile of chunks.

## Why This Matters

This isn't just a retrieval improvement. It's a different theory of what "memory" means for an AI assistant.

RAG says: memory is lookup.
Wiki-native says: memory is *structure*.

The difference shows up in output quality. A model with structure can reason forward. It can notice contradictions between your old and new notes. It can tell you when your decisions.md hasn't been updated since you changed direction three weeks ago.

That's not retrieval. That's understanding.

---

More to come as I build this out. The Obsidian vault this site runs on is the first test case.`,
    },
  });

  console.log("Seeded 1 article.");
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
