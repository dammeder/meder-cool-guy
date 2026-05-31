"use client";

import { useActionState, useState } from "react";
import {
  createPost,
  createArticle,
  type PostState,
  type ArticleState,
} from "./actions";
import type { Project } from "@/lib/types";

interface Props {
  projects: Pick<Project, "slug" | "name">[];
}

export default function ComposeForm({ projects }: Props) {
  const [mode, setMode] = useState<"post" | "article">("post");
  const [showCode, setShowCode] = useState(false);
  const [postState, postAction, postPending] = useActionState<PostState, FormData>(createPost, {});
  const [articleState, articleAction, articlePending] = useActionState<ArticleState, FormData>(createArticle, {});

  return (
    <div className="admin-page">
      <div className="admin-inner">
        <div className="admin-tabs">
          <button
            type="button"
            className={`admin-tab${mode === "post" ? " active" : ""}`}
            onClick={() => setMode("post")}
          >
            post
          </button>
          <button
            type="button"
            className={`admin-tab${mode === "article" ? " active" : ""}`}
            onClick={() => setMode("article")}
          >
            article
          </button>
        </div>

        {mode === "post" ? (
          <div>
            <div className="placeholder-prompt" style={{ marginBottom: "16px" }}>
              <span className="who">meder@home:~$</span> vim posts/new.md
            </div>
            <form action={postAction} className="admin-form">
              <div className="admin-field">
                <label className="admin-label" htmlFor="projectSlug">project:</label>
                <select id="projectSlug" name="projectSlug" className="admin-select">
                  <option value="">standalone</option>
                  {projects.map((p) => (
                    <option key={p.slug} value={p.slug}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="admin-field">
                <textarea
                  name="body"
                  className="admin-textarea"
                  placeholder="type your post here..."
                  rows={8}
                  required
                />
              </div>

              <div className="admin-field admin-checkbox-row">
                <label>
                  <input
                    type="checkbox"
                    name="hasCode"
                    checked={showCode}
                    onChange={(e) => setShowCode(e.target.checked)}
                  />{" "}
                  add code snippet
                </label>
              </div>

              {showCode && (
                <div className="admin-field">
                  <textarea
                    name="codeSnippet"
                    className="admin-textarea admin-code"
                    placeholder="// code here"
                    rows={5}
                  />
                </div>
              )}

              {postState.error && <p className="admin-error">{postState.error}</p>}

              <button type="submit" className="admin-btn" disabled={postPending}>
                {postPending ? "posting..." : '$ git commit -m "post"'}
              </button>
            </form>
          </div>
        ) : (
          <div>
            <div className="placeholder-prompt" style={{ marginBottom: "16px" }}>
              <span className="who">meder@home:~$</span> vim writing/new.md
            </div>
            <form action={articleAction} className="admin-form">
              <div className="admin-field">
                <label className="admin-label" htmlFor="slug">slug:</label>
                <input
                  id="slug"
                  name="slug"
                  type="text"
                  className="admin-input"
                  placeholder="my-article-slug"
                  required
                />
                <span className="admin-label">lowercase · letters, numbers, hyphens</span>
              </div>

              <div className="admin-field">
                <label className="admin-label" htmlFor="title">title:</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  className="admin-input"
                  placeholder="Article Title"
                  required
                />
              </div>

              <div className="admin-field">
                <label className="admin-label" htmlFor="description">description:</label>
                <textarea
                  id="description"
                  name="description"
                  className="admin-textarea"
                  placeholder="Short teaser shown on the listing page..."
                  rows={2}
                  required
                />
              </div>

              <div className="admin-field">
                <label className="admin-label" htmlFor="body">body (markdown):</label>
                <textarea
                  id="body"
                  name="body"
                  className="admin-textarea"
                  placeholder="# Start writing..."
                  rows={14}
                  required
                />
              </div>

              {articleState.error && <p className="admin-error">{articleState.error}</p>}

              <button type="submit" className="admin-btn" disabled={articlePending}>
                {articlePending ? "publishing..." : '$ git commit -m "article"'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
