"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export type PostState = { error?: string };

export async function createPost(
  _prevState: PostState,
  formData: FormData
): Promise<PostState> {
  const body = (formData.get("body") as string | null)?.trim();
  if (!body) return { error: "post body can't be empty." };

  const projectSlug = (formData.get("projectSlug") as string | null) || null;
  const hasCode = formData.get("hasCode") === "on";
  const codeSnippet = hasCode
    ? ((formData.get("codeSnippet") as string | null) || null)
    : null;

  const now = new Date();
  const date = now.toISOString().slice(0, 10);
  const time = now.toTimeString().slice(0, 5);

  await db.post.create({
    data: { date, time, body, projectSlug, hasCode, codeSnippet },
  });

  revalidatePath("/");
  revalidatePath("/journal");
  if (projectSlug) revalidatePath(`/projects/${projectSlug}`);
  redirect("/journal");
}
