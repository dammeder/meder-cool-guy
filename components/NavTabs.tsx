import Link from "next/link";

type Active = "home" | "writing" | "projects";

const TABS: { key: Active; label: string; href: string }[] = [
  { key: "home", label: "home.html", href: "/" },
  { key: "writing", label: "writing/", href: "/writing" },
  { key: "projects", label: "projects/", href: "/projects" },
];

export default function NavTabs({ active }: { active: Active }) {
  return (
    <div className="tabs">
      {TABS.map((t) =>
        t.key === active ? (
          <span key={t.key} className="tab active" aria-current="page">
            ● {t.label}
          </span>
        ) : (
          <Link key={t.key} href={t.href} className="tab">
            {t.label}
          </Link>
        )
      )}
      <span className="tab-spacer" />
      <span className="tab live">📡 live</span>
    </div>
  );
}
