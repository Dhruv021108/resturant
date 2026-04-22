"use client";

import Link from "next/link";
import { useApp } from "@/components/app-provider";
import { testimonials } from "@/lib/data";
import { SectionTitle } from "@/components/section-title";
import { DishCard } from "@/components/dish-card";
import { MapSection } from "@/components/map-section";

export default function HomePage() {
  const { t, restaurant, menuItems, galleryShots } = useApp();
  const featuredDishes = menuItems.slice(0, 4);

  return (
    <div>
      <section className="hero" style={{ "--hero-image": `url(${restaurant.heroImage})` }}>
        <div className="hero__content container">
          <div className="hero__copy">
            <span className="eyebrow">{restaurant.category}</span>
            <h1>{restaurant.name}</h1>
            <p className="hero__native">{restaurant.hindiName}</p>
            <p className="hero__tagline">{t("tagline")}</p>
            <p className="hero__subtext">
              A warm Chinese dining destination in Dombivli with signature noodles, sizzling
              starters, comforting family meals, and an atmosphere made for evening outings.
            </p>
            <div className="hero__actions">
              <Link href="/booking" className="button button--gold">
                Reserve Your Table
              </Link>
              <Link href="/menu" className="button button--ghost">
                Explore Menu
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
              <p>{restaurant.status}</p>
              <h3>{restaurant.hours}</h3>
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
          eyebrow="Menu Highlights"
          title="Signature plates your guests keep reordering"
          text="A curated overview of the dishes that define the restaurant, from crisp starters to wok-tossed noodles."
        />
        <div className="card-grid">
          {featuredDishes.map((dish) => (
            <DishCard key={dish.id} item={dish} compact />
          ))}
        </div>
        <div className="section-cta">
          <Link href="/menu" className="button button--outline">
            View Full Menu
          </Link>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container split">
          <div>
            <SectionTitle
              eyebrow="Restaurant Overview"
              title="A premium dining space with bold Chinese flavors"
              text="Designed for family dinners, casual celebrations, and comforting evening meals with consistent quality and warm service."
            />
            <div className="feature-list">
              <article className="glass-card">
                <h3>Fresh ingredients</h3>
                <p>Daily-prepped vegetables, aromatic sauces, and balanced spice in every dish.</p>
              </article>
              <article className="glass-card">
                <h3>Family dining</h3>
                <p>Comfortable seating, shareable portions, and a welcoming atmosphere for every guest.</p>
              </article>
              <article className="glass-card">
                <h3>Hygiene promise</h3>
                <p>Clean kitchen standards, careful preparation, and a service experience built on trust.</p>
              </article>
            </div>
          </div>
          <div className="glass-card review-spotlight">
            <p className="eyebrow">Guest Impressions</p>
            {testimonials.slice(0, 3).map((review) => (
              <div className="review-snippet" key={review.id}>
                <strong>{review.name}</strong>
                <span>{review.rating} / 5</span>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <SectionTitle
          eyebrow="Reservation Experience"
          title="Simple seat reservation for lunch and dinner"
          text="Choose your date, time, guest count, and any special request in a smooth booking flow."
        />
        <div className="info-grid">
          <article className="info-card">
            <h3>Easy booking</h3>
            <p>Select your date, preferred time, and party size in just a few steps.</p>
          </article>
          <article className="info-card">
            <h3>Special requests</h3>
            <p>Share birthday setups, seating preferences, or family dining needs with the team.</p>
          </article>
          <article className="info-card">
            <h3>Direct contact</h3>
            <p>Call the restaurant directly for urgent reservations or large group arrangements.</p>
          </article>
          <article className="info-card">
            <h3>Ideal for evenings</h3>
            <p>Perfect for casual dining, weekend family meals, and cozy Chinese comfort food outings.</p>
          </article>
        </div>
        <div className="section-cta">
          <Link href="/booking" className="button button--gold">
            Book Your Seat
          </Link>
        </div>
      </section>

      <MapSection />

      <section className="section container">
        <SectionTitle
          eyebrow="Gallery"
          title="A look at the food and atmosphere"
          text="Showcase signature dishes, table moments, and the warm visual identity of the restaurant."
        />
        <div className="gallery-grid">
          {galleryShots.map((shot) => (
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
