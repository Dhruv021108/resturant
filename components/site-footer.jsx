import Link from "next/link";
import { restaurant } from "@/lib/data";

export function SiteFooter() {
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
          <p>Email: hello@amazingchinese.in</p>
          <p>Open daily until 11:30 PM</p>
          <p>Premium dining, delivery, and family combos.</p>
        </div>
      </div>
    </footer>
  );
}
