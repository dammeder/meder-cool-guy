import { PROJECTS } from "@/lib/data";
import ComposeForm from "./ComposeForm";

export default function AdminPage() {
  return (
    <ComposeForm
      projects={PROJECTS.map((p) => ({ slug: p.slug, name: p.name }))}
    />
  );
}
