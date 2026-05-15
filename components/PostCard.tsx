import type { Post } from "@/lib/types";
import { projectBySlug, statusVar } from "@/lib/data";

interface Props {
  post: Post;
  index: number;
}

export default function PostCard({ post, index }: Props) {
  const project = projectBySlug(post.projectSlug);
  const headerStyle = index % 2 === 0 ? "h-cyan" : "h-yellow";

  return (
    <article className={`post ${headerStyle}`}>
      <header className="post-head">
        <span className="meta">
          <b>{post.date.slice(5)}</b> · {post.time}
        </span>
        <span className={`post-filed ${project ? "" : "standalone"}`}>
          {project ? (
            <>
              filed: <span style={{ color: statusVar(project.status) }}>●</span>{" "}
              <b>{project.name}</b>
            </>
          ) : (
            "standalone"
          )}
        </span>
      </header>
      <div className="post-body">
        {post.body}
        {post.hasCode && post.codeSnippet && (
          <pre className="post-code">{post.codeSnippet.replace(/\r\n/g, "\n")}</pre>
        )}
      </div>
    </article>
  );
}
