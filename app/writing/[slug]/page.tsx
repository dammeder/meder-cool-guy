import Link from "next/link";
import Marquee from "@/components/Marquee";
import Scanlines from "@/components/Scanlines";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { db } from "@/lib/db";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await db.article.findUnique({ where: { slug } });

  if (!article) {
    return (
      <div className="placeholder">
        <div className="placeholder-inner">
          <div className="placeholder-prompt">
            <span className="who">meder@home:~$</span> cat writing/{slug}.md
          </div>
          <div className="placeholder-msg">
            bash: writing/{slug}.md: No such file or directory
            <br />
            <br />
            <Link href="/writing">← writing</Link>
          </div>
        </div>
      </div>
    );
  }

  const dateStr = article.publishedAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="page reading">
      <Marquee />

      <main className="main">
        <div className="tabs">
          <Link href="/" className="tab">home.html</Link>
          <Link href="/writing" className="tab active">● writing/</Link>
          <Link href="/projects" className="tab">projects/</Link>
          <span className="tab-spacer" />
          <span className="tab live">📡 live</span>
        </div>

        <div className="article-container">
          <div className="journal-head">
            <span className="label">
              <span className="dollar">$</span> cat writing/{slug}.md
            </span>
            <Link href="/writing" className="see-all">← writing</Link>
          </div>

          <h1 className="article-title">{article.title}</h1>
          <div className="article-date">{dateStr}</div>

          <div className="article-body">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                pre({ children }) {
                  return <pre className="post-code">{children}</pre>;
                },
                code({ className, children, ...props }) {
                  const hasLang = Boolean(className?.startsWith("language-"));
                  const hasNewline = String(children).includes("\n");
                  const isBlock = hasLang || hasNewline;
                  if (isBlock) {
                    return <code className={className} {...props}>{children}</code>;
                  }
                  return <code className="article-inline-code" {...props}>{children}</code>;
                },
              }}
            >
              {article.body}
            </ReactMarkdown>
          </div>
        </div>

        <div className="prompt-line">
          <span className="who">meder@home:~$</span> _<span className="cur">|</span>
        </div>
      </main>

      <Scanlines />
    </div>
  );
}
