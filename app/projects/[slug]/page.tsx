import Link from "next/link";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="placeholder">
      <div className="placeholder-inner">
        <div className="placeholder-prompt">
          <span className="who">meder@home:~$</span> cat projects/{slug}/README.md
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
