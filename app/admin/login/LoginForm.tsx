"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = {};

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initialState);

  return (
    <div className="placeholder">
      <div className="placeholder-inner">
        <div className="placeholder-prompt">
          <span className="who">meder@home:~$</span> sudo -i
        </div>
        <div className="placeholder-msg">
          <form action={action} style={{ marginTop: "12px" }}>
            <div style={{ marginBottom: "10px", fontSize: "12px" }}>
              <label htmlFor="password" style={{ color: "var(--dim)" }}>
                [sudo] password for meder:{" "}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoFocus
                className="admin-input"
                style={{ width: "160px" }}
              />
            </div>
            {state.error && <p className="admin-error">{state.error}</p>}
            <button type="submit" className="admin-btn" disabled={pending}>
              {pending ? "checking..." : "→ enter"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
