import Link from "next/link";
import Marquee from "@/components/Marquee";
import Sidebar from "@/components/Sidebar";
import PostCard from "@/components/PostCard";
import Scanlines from "@/components/Scanlines";
import { db } from "@/lib/db";

export default async function JournalPage() {
  const posts = await db.post.findMany({ orderBy: { id: "desc" } });
  return (
    <div className="page">
      <Marquee />
      <Sidebar />

      <main className="main">
        <div className="tabs">
          <Link href="/" className="tab">home.html</Link>
          <span className="tab active">● journal/</span>
          <Link href="/projects" className="tab">projects/</Link>
          <span className="tab-spacer" />
          <span className="tab live">📡 live</span>
        </div>

        <div className="journal-head">
          <span className="label">
            <span className="dollar">$</span> cat journal/
          </span>
        </div>

        {posts.length === 0 ? (
          <p style={{ color: "var(--dim)", fontSize: "12px", padding: "12px 0" }}>no posts yet.</p>
        ) : (
          posts.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} />
          ))
        )}

        <div className="prompt-line">
          <span className="who">meder@home:~$</span> _<span className="cur">|</span>
        </div>
      </main>

      <Scanlines />
    </div>
  );
}
