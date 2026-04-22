"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/components/app-provider";
import { SectionTitle } from "@/components/section-title";

export function AuthPanel() {
  const router = useRouter();
  const { login, signup } = useApp();
  const [mode, setMode] = useState("login");
  const [loginForm, setLoginForm] = useState({ email: "", password: "", role: "customer" });
  const [signupForm, setSignupForm] = useState({ name: "", phone: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const account = login(loginForm);
    if (!account) {
      setMessage("Invalid credentials for the selected role.");
      return;
    }
    router.push(`/dashboard/${account.role}`);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const account = signup(signupForm);
    router.push(`/dashboard/${account.role}`);
  };

  return (
    <section className="section container auth-layout">
      <div>
        <SectionTitle
          eyebrow="Secure Access"
          title="Customer, manager, and owner accounts"
          text="This demo includes role-based flows and sample accounts for quick exploration."
        />
        <div className="glass-card demo-credentials">
          <p><strong>Owner:</strong> owner@amazingchinese.in / owner123</p>
          <p><strong>Manager:</strong> manager@amazingchinese.in / manager123</p>
          <p><strong>Customer:</strong> customer@amazingchinese.in / customer123</p>
        </div>
      </div>
      <div className="glass-card auth-card">
        <div className="tab-row">
          <button className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>Login</button>
          <button className={mode === "signup" ? "active" : ""} onClick={() => setMode("signup")}>Signup</button>
        </div>
        {mode === "login" ? (
          <form className="booking-form" onSubmit={handleLogin}>
            <input value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} placeholder="Email" required />
            <input type="password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} placeholder="Password" required />
            <select value={loginForm.role} onChange={(e) => setLoginForm({ ...loginForm, role: e.target.value })}>
              <option value="customer">Customer</option>
              <option value="manager">Manager</option>
              <option value="owner">Owner</option>
            </select>
            <button className="button button--gold" type="submit">Login</button>
          </form>
        ) : (
          <form className="booking-form" onSubmit={handleSignup}>
            <input value={signupForm.name} onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })} placeholder="Name" required />
            <input value={signupForm.phone} onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })} placeholder="Phone" required />
            <input value={signupForm.email} onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })} placeholder="Email" required />
            <input type="password" value={signupForm.password} onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })} placeholder="Password" required />
            <button className="button button--gold" type="submit">Create account</button>
          </form>
        )}
        {message && <p className="auth-message">{message}</p>}
        <Link href="/" className="text-link">Back to home</Link>
      </div>
    </section>
  );
}
