"use client";

import Link from "next/link";
import { useApp } from "@/components/app-provider";
import { restaurant, testimonials, featuredDishes, instagramShots } from "@/lib/data";
import { SectionTitle } from "@/components/section-title";
import { DishCard } from "@/components/dish-card";
import { MapSection } from "@/components/map-section";

export default function HomePage() {
  const { t } = useApp();

  return (
    <div>
      <section className="hero">
        <div className="hero__content container">
          <div className="hero__copy">
            <span className="eyebrow">{restaurant.category}</span>
            <h1>{restaurant.name}</h1>
            <p className="hero__native">{restaurant.hindiName}</p>
            <p className="hero__tagline">{t("tagline")}</p>
            <p className="hero__subtext">
              Crafted wok-fresh noodles, spicy gravies, sizzling momos, and family-style
              comfort meals in the heart of Dombivli / Kopar East.
            </p>
            <div className="hero__actions">
              <Link href="/order" className="button button--gold">
                {t("orderNow")}
              </Link>
              <Link href="/booking" className="button button--ghost">
                {t("bookTable")}
              </Link>
              <Link href="/menu" className="button button--outline">
                {t("viewMenu")}
              </Link>
            </div>
            <div className="hero__stats">
              <div>
                <strong>{restaurant.rating}</strong>
                <span>{restaurant.reviewsCount} reviews</span>
              </div>
              <div>
                <strong>{restaurant.hours}</strong>
                <span>{restaurant.status}</span>
              </div>
              <div>
                <strong>{restaurant.priceRange}</strong>
                <span>per person</span>
              </div>
            </div>
          </div>
          <div className="hero__visual">
            <div className="hero__card glass-card">
              <p>Open now</p>
              <h3>Closes 11:30 PM</h3>
              <span>{restaurant.address}</span>
              <a href={`tel:${restaurant.phone}`} className="button button--small button--gold">
                Call {restaurant.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section container">
        <SectionTitle
          eyebrow="Popular Dishes"
          title="Signature plates your guests keep reordering"
          text="Fast-loading visuals, clear pricing, and bestselling highlights help drive more orders."
        />
        <div className="card-grid">
          {featuredDishes.map((dish) => (
            <DishCard key={dish.id} item={dish} />
          ))}
        </div>
      </section>

      <section className="section section--dark">
        <div className="container split">
          <div>
            <SectionTitle
              eyebrow="Why Choose Us"
              title="Premium dining with delivery speed"
              text="Every touchpoint is designed for discovery, trust, and repeat orders."
            />
            <div className="feature-list">
              <article className="glass-card">
                <h3>Fresh ingredients</h3>
                <p>Daily-prepped vegetables, sauces, and proteins for better flavor and consistency.</p>
              </article>
              <article className="glass-card">
                <h3>Hygiene promise</h3>
                <p>Clean kitchen standards, careful packing, and quality checks before dispatch.</p>
              </article>
              <article className="glass-card">
                <h3>Family dining</h3>
                <p>Comfortable seating, shareable combos, and menu variety for every age group.</p>
              </article>
            </div>
          </div>
          <div className="glass-card review-spotlight">
            <p className="eyebrow">Customer Love</p>
            {testimonials.slice(0, 3).map((review) => (
              <div className="review-snippet" key={review.id}>
                <strong>{review.name}</strong>
                <span>{review.rating} / 5</span>
                <p>{review.comment}</p>
              </div>
            ))}
            <Link href="/reviews" className="text-link">
              Explore all reviews
            </Link>
          </div>
        </div>
      </section>

      <section className="section container">
        <SectionTitle
          eyebrow="Ordering Experience"
          title="Built to increase online orders"
          text="WhatsApp quick actions, coupon-ready checkout, live order tracking, and loyalty points all in one flow."
        />
        <div className="info-grid">
          <article className="info-card">
            <h3>Quick order</h3>
            <p>Add items, edit quantity, apply coupons, and check out with COD, UPI, or Card.</p>
          </article>
          <article className="info-card">
            <h3>Live tracking</h3>
            <p>Customers can follow each order through Preparing, Out for Delivery, and Delivered.</p>
          </article>
          <article className="info-card">
            <h3>Bookings</h3>
            <p>Reserve tables by date, time, party size, and special request with instant confirmation.</p>
          </article>
          <article className="info-card">
            <h3>Bot support</h3>
            <p>Menu discovery, combo suggestions, location answers, and booking help from the built-in chat assistant.</p>
          </article>
        </div>
      </section>

      <MapSection />

      <section className="section container">
        <SectionTitle
          eyebrow="Extras"
          title="QR menu, direct contact, and offer capture"
          text="Useful business tools are surfaced prominently so guests can order faster and stay engaged."
        />
        <div className="info-grid">
          <article className="info-card">
            <h3>QR Menu</h3>
            <p>Display this block on tables or packaging so customers can scan and open the live menu instantly.</p>
            <div className="qr-card">
              <div className="qr-pattern" />
              <span>Scan for Menu</span>
            </div>
          </article>
          <article className="info-card">
            <h3>Contact Form</h3>
            <p>Email inquiries, catering requests, and customer messages can be collected from the website.</p>
            <form className="mini-contact-form">
              <input placeholder="Your email" />
              <textarea placeholder="Tell us how we can help" />
              <button type="button" className="button button--gold">Send Inquiry</button>
            </form>
          </article>
          <article className="info-card">
            <h3>Loyalty & Deals</h3>
            <p>Reward repeat customers with points, coupon drops, and timely promo announcements.</p>
            <ul className="simple-list">
              <li>Coupon: WOK10</li>
              <li>Loyalty: 1 point per Rs.10 spent</li>
              <li>Notifications for order and offers</li>
            </ul>
          </article>
          <article className="info-card">
            <h3>Payments Ready</h3>
            <p>UI is prepared for Cash on Delivery, UPI, Card, and later Razorpay or Stripe integration.</p>
            <ul className="simple-list">
              <li>Checkout with address saving</li>
              <li>Discount-aware totals</li>
              <li>Delivery status updates</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section container">
        <SectionTitle
          eyebrow="Instagram Gallery"
          title="A feed-ready brand presence"
          text="Use these sections to showcase atmosphere, signature dishes, and social proof."
        />
        <div className="gallery-grid">
          {instagramShots.map((shot) => (
            <div
              key={shot.id}
              className="gallery-tile"
              style={{ backgroundImage: `linear-gradient(180deg, transparent, rgba(0,0,0,0.65)), url(${shot.image})` }}
            >
              <span>{shot.caption}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
