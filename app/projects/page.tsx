import Link from "next/link";
import Marquee from "@/components/Marquee";
import Sidebar from "@/components/Sidebar";
import Scanlines from "@/components/Scanlines";
import { PROJECTS, statusVar } from "@/lib/data";

export default function ProjectsPage() {
  return (
    <div className="page">
      <Marquee />
      <Sidebar />

      <main className="main">
        <div className="tabs">
          <Link href="/" className="tab">home.html</Link>
          <Link href="/journal" className="tab">journal/</Link>
          <span className="tab active">● projects/</span>
          <span className="tab-spacer" />
          <span className="tab live">📡 live</span>
        </div>

        <div className="journal-head">
          <span className="label">
            <span className="dollar">$</span> ls -la projects/
          </span>
        </div>

        {PROJECTS.map((p, i) => {
          const headerClass = i % 2 === 0 ? "h-cyan" : "h-yellow";
          return (
            <Link key={p.slug} href={`/projects/${p.slug}`} className="proj-card-link">
              <article className={`post ${headerClass}`}>
                <header className="post-head">
                  <span className="meta"><b>{p.year}</b></span>
                  <span style={{ color: statusVar(p.status) }}>● {p.status}</span>
                  <span style={{ color: "var(--dim)" }}>★ {p.stars}</span>
                </header>
                <div className="post-body">
                  <div className="proj-card-name">{p.name}</div>
                  <div className="proj-card-desc">{p.desc}</div>
                  <div className="proj-card-footer">
                    <span>{p.posts} posts · last: {p.lastPost}</span>
                    <span className="arrow">→</span>
                  </div>
                </div>
              </article>
            </Link>
          );
        })}

        <div className="prompt-line">
          <span className="who">meder@home:~$</span> _<span className="cur">|</span>
        </div>
      </main>

      <Scanlines />
    </div>
  );
}
