"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/components/app-provider";

const links = [
  ["Home", "/"],
  ["Menu", "/menu"],
  ["Order", "/order"],
  ["Booking", "/booking"],
  ["Reviews", "/reviews"],
  ["About", "/about"]
];

export function SiteHeader() {
  const pathname = usePathname();
  const { language, setLanguage, theme, setTheme, user, logout, cart } = useApp();

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
          <Link href="/order" className="cart-pill">
            Cart {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </Link>
          {user ? (
            <>
              <Link href={`/dashboard/${user.role}`} className="button button--small button--gold">
                {user.role}
              </Link>
              <button className="button button--small button--outline" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="button button--small button--gold">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
