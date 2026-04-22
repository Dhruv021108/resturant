"use client";

import { useMemo, useState } from "react";
import { useApp } from "@/components/app-provider";
import { SectionTitle } from "@/components/section-title";

export function ReviewsSection({ standalone = false }) {
  const { reviews, addReview } = useApp();
  const [form, setForm] = useState({ name: "", rating: 5, comment: "" });

  const averageRating = useMemo(() => {
    return (reviews.reduce((sum, review) => sum + Number(review.rating), 0) / reviews.length).toFixed(1);
  }, [reviews]);

  const submit = (e) => {
    e.preventDefault();
    addReview(form);
    setForm({ name: "", rating: 5, comment: "" });
  };

  return (
    <section className={`section ${standalone ? "container" : ""}`}>
      <div className={standalone ? "" : "container"}>
        <SectionTitle
          eyebrow="Guest Reviews"
          title={`${averageRating} star experience from real diners`}
          text="Highlight social proof and let customers add feedback directly from the website."
        />
        <div className="review-layout">
          <div className="review-list">
            {reviews.map((review) => (
              <article key={review.id} className="glass-card">
                <strong>{review.name}</strong>
                <span>{review.rating} ⭐</span>
                <p>{review.comment}</p>
              </article>
            ))}
          </div>
          <form className="booking-form glass-card" onSubmit={submit}>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" required />
            <select value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })}>
              <option value="5">5 stars</option>
              <option value="4">4 stars</option>
              <option value="3">3 stars</option>
            </select>
            <textarea
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              placeholder="Share your experience"
              required
            />
            <button className="button button--gold" type="submit">
              Add Review
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
