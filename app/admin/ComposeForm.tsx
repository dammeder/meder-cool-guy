"use client";

import { useActionState, useState } from "react";
import { createPost, type PostState } from "./actions";
import type { Project } from "@/lib/types";

interface Props {
  projects: Pick<Project, "slug" | "name">[];
}

const initialState: PostState = {};

export default function ComposeForm({ projects }: Props) {
  const [showCode, setShowCode] = useState(false);
  const [state, action, pending] = useActionState(createPost, initialState);

  return (
    <div className="admin-page">
      <div className="admin-inner">
        <div className="placeholder-prompt" style={{ marginBottom: "16px" }}>
          <span className="who">meder@home:~$</span> vim journal/new.md
        </div>

        <form action={action} className="admin-form">
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

          {state.error && <p className="admin-error">{state.error}</p>}

          <button type="submit" className="admin-btn" disabled={pending}>
            {pending ? "posting..." : '$ git commit -m "post"'}
          </button>
        </form>
      </div>
    </div>
  );
}
