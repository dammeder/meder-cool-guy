"use client";

import { usePathname } from "next/navigation";

const ITEMS: { label: string; match: (p: string) => boolean }[] = [
  { label: "home.html", match: (p) => p === "/" },
  { label: "writing/", match: (p) => p.startsWith("/writing") },
  { label: "projects/", match: (p) => p.startsWith("/projects") },
  { label: "about.md", match: () => false },
];

export default function SidebarFiles() {
  const pathname = usePathname() ?? "/";
  return (
    <div className="panel hide-mobile">
      <div className="panel-head">
        <span style={{ color: "var(--cyan)" }}>▸ explorer</span>
      </div>
      <div className="panel-body">
        <div className="file-tree">
          <div className="root">📁 ~/meder/</div>
          <div className="indent">
            {ITEMS.map((item) => {
              const active = item.match(pathname);
              return (
                <div key={item.label} className={active ? "item" : "item dim"}>
                  {active ? <span className="arrow-active">›</span> : "›"} {item.label}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
