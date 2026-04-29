import { ME } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";

export default function Marquee() {
  const items = [
    { color: "var(--cyan)", text: "welcome to my page" },
    { color: "var(--pink)", text: `♪ ${ME.nowListening.artist} — ${ME.nowListening.track}` },
    { color: "var(--lime)", text: `⚒ ${ME.nowBuilding}` },
    { color: "var(--yellow)", text: "v0.1 alpha" },
    { color: "var(--cyan)", text: "★ hi :)" },
  ];

  return (
    <div className="marquee">
      <div className="marquee-inner">
      <div className="marquee-track">
        {[0, 1].map((dup) => (
          <span key={dup}>
            {items.map((item, i) => (
              <span key={i} className="marquee-item" style={{ color: item.color }}>
                <span className="blink" style={{ background: item.color }} />
                {item.text}
              </span>
            ))}
          </span>
        ))}
      </div>
      </div>
      <ThemeToggle />
    </div>
  );
}
