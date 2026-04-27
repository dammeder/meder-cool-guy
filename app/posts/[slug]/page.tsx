import Link from "next/link";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="placeholder">
      <div className="placeholder-inner">
        <div className="placeholder-prompt">
          <span className="who">meder@home:~$</span> cat posts/{slug}.md
        </div>
        <div className="placeholder-msg">
          (coming soon)
          <br />
          <br />
          <Link href="/">← home</Link>
        </div>
      </div>
    </div>
  );
}
