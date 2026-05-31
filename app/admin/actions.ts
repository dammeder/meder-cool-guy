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
  if (projectSlug) revalidatePath(`/projects/${projectSlug}`);
  redirect("/");
}

export type ArticleState = { error?: string };

export async function createArticle(
  _prevState: ArticleState,
  formData: FormData
): Promise<ArticleState> {
  const slug = (formData.get("slug") as string | null)?.trim().toLowerCase();
  const title = (formData.get("title") as string | null)?.trim();
  const description = (formData.get("description") as string | null)?.trim();
  const body = (formData.get("body") as string | null)?.trim();

  if (!slug) return { error: "slug is required." };
  if (!/^[a-z0-9-]+$/.test(slug))
    return { error: "slug: lowercase letters, numbers, and hyphens only." };
  if (!title) return { error: "title is required." };
  if (!description) return { error: "description is required." };
  if (!body) return { error: "body can't be empty." };

  try {
    await db.article.create({ data: { slug, title, description, body } });
  } catch (e: unknown) {
    if ((e as { code?: string }).code === "P2002") {
      return { error: `slug "${slug}" already exists.` };
    }
    throw e;
  }

  revalidatePath("/writing");
  redirect(`/writing/${slug}`);
}
