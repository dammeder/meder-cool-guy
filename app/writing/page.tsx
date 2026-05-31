import Link from "next/link";
import Marquee from "@/components/Marquee";
import Sidebar from "@/components/Sidebar";
import Scanlines from "@/components/Scanlines";
import { db } from "@/lib/db";

export default async function WritingPage() {
  const articles = await db.article.findMany({ orderBy: { publishedAt: "desc" } });

  return (
    <div className="page">
      <Marquee />
      <Sidebar />

      <main className="main">
        <div className="tabs">
          <Link href="/" className="tab">home.html</Link>
          <span className="tab active">● writing/</span>
          <Link href="/projects" className="tab">projects/</Link>
          <span className="tab-spacer" />
          <span className="tab live">📡 live</span>
        </div>

        <div className="journal-head">
          <span className="label">
            <span className="dollar">$</span> ls -la writing/
          </span>
        </div>

        {articles.length === 0 ? (
          <p style={{ color: "var(--dim)", fontSize: "12px", padding: "12px 0" }}>
            no articles yet.
          </p>
        ) : (
          <ul className="writing-list">
            {articles.map((article) => (
              <li key={article.id}>
                <Link href={`/writing/${article.slug}`} className="writing-row">
                  <span className="writing-row-date">
                    {article.publishedAt.toISOString().slice(5, 10)}
                  </span>
                  <span className="writing-row-title">{article.title}</span>
                  <span className="writing-row-arrow">→</span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="prompt-line">
          <span className="who">meder@home:~$</span> _<span className="cur">|</span>
        </div>
      </main>

      <Scanlines />
    </div>
  );
}
