"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/components/app-provider";

const links = [
  ["Home", "/"],
  ["Menu", "/menu"],
  ["Booking", "/booking"],
  ["About", "/about"]
];

export function SiteHeader() {
  const pathname = usePathname();
  const { language, setLanguage, theme, setTheme, siteMode, adminAuthenticated, adminLogout } = useApp();

  return (
    <header className="site-header">
      <div className="container header-row">
        <Link href="/" className="brand">
          <span className="brand__mark">福</span>
          <div>
            <strong>Amazing Chinese Restaurant</strong>
            <span>अमेजिंग चाइनीस रेस्टोरेंट</span>
          </div>
        </Link>

        <nav className="nav">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className={pathname === href ? "active" : ""}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <select value={language} onChange={(e) => setLanguage(e.target.value)} aria-label="Language">
            <option value="en">EN</option>
            <option value="hi">हिंदी</option>
            <option value="mr">मराठी</option>
          </select>
          <button className="mode-toggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          {siteMode === "admin" && adminAuthenticated && (
            <Link href="/admin" className="button button--small button--outline">
              Admin Panel
            </Link>
          )}
          <Link href="/booking" className="button button--small button--gold">
            Reserve Table
          </Link>
          {siteMode === "admin" && adminAuthenticated && (
            <button className="button button--small button--ghost" onClick={adminLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
