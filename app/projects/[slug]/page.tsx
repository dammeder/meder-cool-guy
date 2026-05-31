import Link from "next/link";
import { notFound } from "next/navigation";
import Marquee from "@/components/Marquee";
import Sidebar from "@/components/Sidebar";
import PostCard from "@/components/PostCard";
import Scanlines from "@/components/Scanlines";
import NavTabs from "@/components/NavTabs";
import { projectBySlug, statusVar } from "@/lib/data";
import { db } from "@/lib/db";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectBySlug(slug);

  if (!project) notFound();

  const posts = await db.post.findMany({
    where: { projectSlug: slug },
    orderBy: { id: "desc" },
  });

  return (
    <div className="page">
      <Marquee />
      <Sidebar />

      <main className="main">
        <NavTabs active="projects" />

        <div className="journal-head">
          <span className="label">
            <span className="dollar">$</span> cat projects/{slug}/README.md
          </span>
          <Link href="/projects" className="see-all">← all projects</Link>
        </div>

        <div className="panel" style={{ marginBottom: "20px" }}>
          <div className="panel-head">
            <span style={{ color: "var(--cyan)" }}>{project.name}</span>
            <span style={{ color: statusVar(project.status) }}>● {project.status}</span>
          </div>
          <div className="panel-body" style={{ fontSize: "12px", lineHeight: "1.8" }}>
            <div style={{ marginBottom: "6px" }}>{project.desc}</div>
            <div style={{ color: "var(--dim)" }}>
              <span style={{ color: "var(--cyan)" }}>repo</span>: {project.repo}
              &nbsp;·&nbsp;
              <span style={{ color: "var(--yellow)" }}>★</span> {project.stars}
              &nbsp;·&nbsp;
              {project.year}
            </div>
          </div>
        </div>

        <div className="journal-head">
          <span className="label">
            <span className="dollar">$</span> tail -f projects/{slug}/journal/
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
