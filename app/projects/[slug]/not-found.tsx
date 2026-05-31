import Link from "next/link";
import Marquee from "@/components/Marquee";
import Sidebar from "@/components/Sidebar";
import Scanlines from "@/components/Scanlines";
import NavTabs from "@/components/NavTabs";

export const metadata = { title: "404" };

export default function NotFound() {
  return (
    <div className="page">
      <Marquee />
      <Sidebar />

      <main className="main">
        <NavTabs active="projects" />

        <div className="placeholder">
          <div className="placeholder-inner">
            <div className="placeholder-prompt">
              <span className="who">meder@home:~$</span> cat projects/404/README.md
            </div>
            <div className="placeholder-msg">
              bash: no such project
              <br />
              <br />
              <Link href="/projects">← projects</Link>
            </div>
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
