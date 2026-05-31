import Link from "next/link";
import Marquee from "@/components/Marquee";
import Sidebar from "@/components/Sidebar";
import PostCard from "@/components/PostCard";
import Scanlines from "@/components/Scanlines";
import { ME } from "@/lib/data";
import { db } from "@/lib/db";

export default async function Home() {
  const posts = await db.post.findMany({ orderBy: { id: "desc" }, take: 5 });
  return (
    <div className="page">
      <Marquee />
      <Sidebar />

      <main className="main">
        <div className="tabs">
          <span className="tab active">● home.html</span>
          <Link href="/writing" className="tab">writing/</Link>
          <Link href="/projects" className="tab">projects/</Link>
          <span className="tab-spacer" />
          <span className="tab live">📡 live</span>
        </div>

        <section className="hero">
          <div className="hero-prompt">
            <span className="user">meder@home</span>
            <span className="at">:</span>
            <span className="path">~</span>
            <span className="at">$ </span>
            cat about.md
          </div>
          <h1 className="hero-title">
            hi, i&apos;m <span className="accent">meder</span>
            <span className="hero-cursor" aria-hidden="true" />
          </h1>
          <p className="hero-line">
            <span className="gt">&gt; </span>
            {ME.bio}
          </p>
          <p className="hero-manifesto">
            <span className="gt">&gt; </span>
            {ME.manifesto}
          </p>
        </section>

        <div className="journal-head">
          <span className="label">
            <span className="dollar">$</span> tail -f posts/
          </span>
        </div>

        {posts.map((post, i) => (
          <PostCard key={post.id} post={post} index={i} />
        ))}

        <div className="prompt-line">
          <span className="who">meder@home:~$</span> _<span className="cur">|</span>
        </div>
      </main>

      <Scanlines />
    </div>
  );
}
