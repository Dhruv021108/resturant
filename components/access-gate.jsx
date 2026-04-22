"use client";

import Link from "next/link";
import { useState } from "react";
import { useApp } from "@/components/app-provider";

export function AccessGate() {
  const { siteMode, chooseMode, adminAuthenticated, adminLogin } = useApp();
  const [credentials, setCredentials] = useState({ id: "", password: "" });
  const [error, setError] = useState("");

  if (siteMode === "guest" || (siteMode === "admin" && adminAuthenticated)) {
    return null;
  }

  const submitAdminLogin = (e) => {
    e.preventDefault();
    const ok = adminLogin(credentials);
    if (!ok) {
      setError("Invalid admin ID or password.");
    }
  };

  return (
    <div className="access-gate">
      <div className="access-gate__panel glass-card">
        {!siteMode && (
          <>
            <p className="eyebrow">Choose Access</p>
            <h2>Welcome to Amazing Chinese Restaurant</h2>
            <p>Select how you want to enter the website.</p>
            <div className="access-gate__actions">
              <button className="button button--gold" onClick={() => chooseMode("guest")}>
                Continue as Guest
              </button>
              <button className="button button--outline" onClick={() => chooseMode("admin")}>
                Admin Login
              </button>
            </div>
          </>
        )}

        {siteMode === "admin" && !adminAuthenticated && (
          <>
            <p className="eyebrow">Admin Login</p>
            <h2>Manage reservations and website content</h2>
            <form className="booking-form" onSubmit={submitAdminLogin}>
              <input
                value={credentials.id}
                onChange={(e) => setCredentials({ ...credentials, id: e.target.value })}
                placeholder="Admin ID"
                required
              />
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                placeholder="Password"
                required
              />
              <button className="button button--gold" type="submit">
                Login as Admin
              </button>
            </form>
            {error && <p className="auth-message">{error}</p>}
            <div className="access-gate__actions">
              <button className="button button--ghost" onClick={() => chooseMode(null)}>
                Back
              </button>
              <Link href="/" className="text-link" onClick={() => chooseMode("guest")}>
                Enter as Guest Instead
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
