import Link from "next/link";
import { notFound } from "next/navigation";
import Marquee from "@/components/Marquee";
import Scanlines from "@/components/Scanlines";
import NavTabs from "@/components/NavTabs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { db } from "@/lib/db";
import { formatLong } from "@/lib/date";

export const revalidate = 3600;

export async function generateStaticParams() {
  const articles = await db.article.findMany({ select: { slug: true } });
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await db.article.findUnique({
    where: { slug },
    select: { title: true, description: true },
  });
  if (!article) return { title: "404" };
  return { title: article.title, description: article.description };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await db.article.findUnique({ where: { slug } });
  if (!article) notFound();

  const dateStr = formatLong(article.publishedAt);

  return (
    <div className="page reading">
      <Marquee />

      <main className="main">
        <NavTabs active="writing" />

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
                code({ className, children, node, ...props }) {
                  void node;
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
