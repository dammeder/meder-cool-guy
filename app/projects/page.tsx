import Link from "next/link";

export default function ProjectsPage() {
  return (
    <div className="placeholder">
      <div className="placeholder-inner">
        <div className="placeholder-prompt">
          <span className="who">meder@home:~$</span> ls projects/
        </div>
        <div className="placeholder-msg">
          drwxr-xr-x  (coming soon)
          <br />
          <br />
          <Link href="/">← home</Link>
        </div>
      </div>
    </div>
  );
}
