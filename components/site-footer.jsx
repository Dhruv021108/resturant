"use client";

import Link from "next/link";
import { useApp } from "@/components/app-provider";

export function SiteFooter() {
  const { restaurant } = useApp();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h3>{restaurant.name}</h3>
          <p>{restaurant.address}</p>
          <p>{restaurant.mapCode}</p>
          <p>{restaurant.phone}</p>
        </div>
        <div>
          <h4>Explore</h4>
          <Link href="/menu">Menu</Link>
          <Link href="/booking">Book a Table</Link>
          <Link href="/about">About Us</Link>
        </div>
        <div>
          <h4>Social</h4>
          <a href="https://instagram.com" target="_blank">Instagram</a>
          <a href="https://facebook.com" target="_blank">Facebook</a>
          <a href="https://wa.me/917718069555" target="_blank">WhatsApp</a>
        </div>
        <div>
          <h4>Contact</h4>
          <p>Email: {restaurant.email}</p>
          <p>{restaurant.hours}</p>
          <p>{restaurant.status}</p>
        </div>
      </div>
    </footer>
  );
}
