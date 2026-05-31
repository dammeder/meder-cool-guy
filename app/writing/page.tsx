import Link from "next/link";
import Marquee from "@/components/Marquee";
import Sidebar from "@/components/Sidebar";
import Scanlines from "@/components/Scanlines";
import NavTabs from "@/components/NavTabs";
import { db } from "@/lib/db";
import { formatShort } from "@/lib/date";

export const metadata = { title: "writing" };
export const revalidate = 60;

export default async function WritingPage() {
  const articles = await db.article.findMany({
    orderBy: { publishedAt: "desc" },
    take: 50,
  });

  return (
    <div className="page">
      <Marquee />
      <Sidebar />

      <main className="main">
        <NavTabs active="writing" />

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
                    {formatShort(article.publishedAt)}
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
