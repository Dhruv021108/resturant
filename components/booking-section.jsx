"use client";

import { useState } from "react";
import { useApp } from "@/components/app-provider";
import { SectionTitle } from "@/components/section-title";

export function BookingSection({ standalone = false }) {
  const { createBooking } = useApp();
  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState({
    date: "",
    time: "",
    guests: 2,
    name: "",
    phone: "",
    request: ""
  });
  const [confirmation, setConfirmation] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    const entry = createBooking(form);
    setConfirmation(entry);
    setForm({ date: "", time: "", guests: 2, name: "", phone: "", request: "" });
  };

  return (
    <section className={`section ${standalone ? "container" : ""}`}>
      <div className={standalone ? "" : "container"}>
        <SectionTitle
          eyebrow="Table Booking"
          title="Reserve your dining experience"
          text="Choose date, time, guests, and special requests with instant confirmation."
        />
        <form className="booking-form glass-card" onSubmit={submit}>
          <input type="date" min={today} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
          <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} required />
          <input
            type="number"
            min="1"
            value={form.guests}
            onChange={(e) => setForm({ ...form, guests: e.target.value })}
            required
          />
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" required />
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone number" required />
          <textarea
            value={form.request}
            onChange={(e) => setForm({ ...form, request: e.target.value })}
            placeholder="Special requests"
          />
          <button className="button button--gold" type="submit">
            Confirm Booking
          </button>
        </form>
        {confirmation && (
          <div className="glass-card confirmation-card">
            <strong>Booking confirmed</strong>
            <p>
              {confirmation.name}, your table for {confirmation.guests} on {confirmation.date} at {confirmation.time} is confirmed.
            </p>
            <p>We look forward to hosting you at Amazing Chinese Restaurant.</p>
          </div>
        )}
      </div>
    </section>
  );
}
