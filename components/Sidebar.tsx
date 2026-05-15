import Image from "next/image";
import { ME, PROJECTS, statusVar } from "@/lib/data";

function Photo() {
  return (
    <div className="panel">
      <div className="panel-head">
        <span style={{ color: "var(--pink)" }}>▸ me.png</span>
              </div>
      <div className="panel-body">
        <div className="photo">
          <Image src="/meder.jpg" alt="meder" fill sizes="240px" style={{ objectFit: "cover" }} />
        </div>
        <div className="me-info">
          <div><span className="key">name</span>: {ME.name}</div>
          <div><span className="key">loc </span>: {ME.location}</div>
          <div><span className="key">vibe</span>: humble</div>
        </div>
      </div>
    </div>
  );
}

function Files() {
  return (
    <div className="panel hide-mobile">
      <div className="panel-head">
        <span style={{ color: "var(--cyan)" }}>▸ explorer</span>
              </div>
      <div className="panel-body">
        <div className="file-tree">
          <div className="root">📁 ~/meder/</div>
          <div className="indent">
            <div className="item"><span className="arrow-active">›</span> home.html</div>
            <div className="item dim">› journal/</div>
            <div className="item dim">› projects/</div>
            <div className="item dim">› about.md</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <div className="panel">
      <div className="panel-head">
        <span style={{ color: "var(--lime)" }}>▸ my projects</span>
              </div>
      <div className="panel-body">
        {PROJECTS.map((p) => (
          <div key={p.slug} className="proj-row">
            <div className="proj-row-top">
              <span className="proj-row-name">{p.name}</span>
              <span
                className="proj-row-status"
                style={{
                  color: statusVar(p.status),
                  textShadow: `0 0 4px ${statusVar(p.status)}`,
                }}
              >
                ● {p.status}
              </span>
            </div>
            <div className="proj-row-meta">
              {p.year} · {p.posts} posts
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Currently() {
  return (
    <div className="panel">
      <div className="panel-head">
        <span style={{ color: "var(--yellow)" }}>▸ im currently</span>
              </div>
      <div className="panel-body">
        <div className="currently">
          <div className="row">
            <span className="blink" style={{ background: "var(--pink)" }} />
            ♪ {ME.nowListening.artist}
          </div>
          <div className="row">
            <span className="blink" style={{ background: "var(--cyan)" }} />
            ⚒ {ME.nowBuilding}
          </div>
          <div className="row">
            <span className="blink" style={{ background: "var(--lime)" }} />
            📖 {ME.nowReading}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <Photo />
      <Files />
      <Projects />
      <Currently />
    </aside>
  );
}
