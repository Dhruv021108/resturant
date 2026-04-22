"use client";

import { useApp } from "@/components/app-provider";
import { SectionTitle } from "@/components/section-title";

export function AdminPanel() {
  const {
    adminAuthenticated,
    restaurant,
    updateRestaurantField,
    menuItems,
    updateMenuItem,
    bookings,
    updateBookingStatus,
    galleryShots,
    updateGalleryShot
  } = useApp();

  if (!adminAuthenticated) {
    return (
      <section className="section container">
        <SectionTitle
          eyebrow="Admin Only"
          title="Please log in as admin first"
          text="Only authenticated admins can manage bookings, details, and photos."
        />
      </section>
    );
  }

  return (
    <section className="section container">
      <SectionTitle
        eyebrow="Admin Panel"
        title="Manage reservations, details, and photos"
        text="Changes are saved on the website itself and reflected immediately on the public pages."
      />

      <div className="dashboard-section">
        <h3>Restaurant Details</h3>
        <div className="menu-admin-form glass-card">
          <input value={restaurant.name} onChange={(e) => updateRestaurantField("name", e.target.value)} placeholder="Restaurant name" />
          <input value={restaurant.hindiName} onChange={(e) => updateRestaurantField("hindiName", e.target.value)} placeholder="Hindi name" />
          <input value={restaurant.category} onChange={(e) => updateRestaurantField("category", e.target.value)} placeholder="Category" />
          <input value={restaurant.rating} onChange={(e) => updateRestaurantField("rating", e.target.value)} placeholder="Rating" />
          <input value={restaurant.priceRange} onChange={(e) => updateRestaurantField("priceRange", e.target.value)} placeholder="Price range" />
          <input value={restaurant.phone} onChange={(e) => updateRestaurantField("phone", e.target.value)} placeholder="Phone" />
          <input value={restaurant.email || ""} onChange={(e) => updateRestaurantField("email", e.target.value)} placeholder="Email" />
          <input value={restaurant.address} onChange={(e) => updateRestaurantField("address", e.target.value)} placeholder="Address" />
          <input value={restaurant.mapCode} onChange={(e) => updateRestaurantField("mapCode", e.target.value)} placeholder="Map code" />
          <input value={restaurant.status} onChange={(e) => updateRestaurantField("status", e.target.value)} placeholder="Status" />
          <input value={restaurant.hours} onChange={(e) => updateRestaurantField("hours", e.target.value)} placeholder="Hours" />
          <input value={restaurant.heroImage || ""} onChange={(e) => updateRestaurantField("heroImage", e.target.value)} placeholder="Hero image URL" />
        </div>
      </div>

      <div className="dashboard-section">
        <h3>Reservations</h3>
        <div className="dashboard-list">
          {bookings.map((booking) => (
            <article key={booking.id} className="glass-card dashboard-card">
              <div>
                <strong>{booking.name}</strong>
                <p>{booking.date} | {booking.time} | {booking.guests} guests</p>
                <span>{booking.phone} | {booking.request || "No special requests"}</span>
              </div>
              <select value={booking.status} onChange={(e) => updateBookingStatus(booking.id, e.target.value)}>
                <option>Confirmed</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            </article>
          ))}
        </div>
      </div>

      <div className="dashboard-section">
        <h3>Menu Photos and Details</h3>
        <div className="dashboard-list">
          {menuItems.map((item) => (
            <article key={item.id} className="glass-card admin-edit-card">
              <input value={item.name} onChange={(e) => updateMenuItem(item.id, "name", e.target.value)} />
              <input value={item.description} onChange={(e) => updateMenuItem(item.id, "description", e.target.value)} />
              <input value={item.image} onChange={(e) => updateMenuItem(item.id, "image", e.target.value)} placeholder="Image URL" />
              <input value={item.price} onChange={(e) => updateMenuItem(item.id, "price", Number(e.target.value) || 0)} />
            </article>
          ))}
        </div>
      </div>

      <div className="dashboard-section">
        <h3>Gallery Photos</h3>
        <div className="dashboard-list">
          {galleryShots.map((shot) => (
            <article key={shot.id} className="glass-card admin-edit-card">
              <input value={shot.caption} onChange={(e) => updateGalleryShot(shot.id, "caption", e.target.value)} />
              <input value={shot.image} onChange={(e) => updateGalleryShot(shot.id, "image", e.target.value)} placeholder="Image URL" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
