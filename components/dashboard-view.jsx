"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useApp } from "@/components/app-provider";
import { SectionTitle } from "@/components/section-title";

function RevenueCard({ orders }) {
  const revenue = orders.reduce((sum, order) => sum + order.total, 0);
  return (
    <div className="metric-card">
      <span>Revenue</span>
      <strong>Rs.{revenue}</strong>
    </div>
  );
}

export function DashboardView({ role, allowed }) {
  const {
    user,
    orders,
    bookings,
    reviews,
    menuItems,
    updateOrderStatus,
    updateBookingStatus,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    coupons,
    addCoupon,
    notifications,
    accounts
  } = useApp();
  const isAllowed = user ? (user.role === "owner" ? true : user.role === role) : false;
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: 149,
    type: "Veg",
    category: "Starters",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80",
    bestseller: false,
    recommended: true,
    available: true
  });
  const [couponForm, setCouponForm] = useState({ code: "", discountPercent: 10, active: true });

  const customerOrders = useMemo(() => orders.filter((order) => order.customerId === user?.id), [orders, user]);

  if (!isAllowed) {
    return (
      <section className="section container">
        <SectionTitle
          eyebrow="Restricted"
          title="Please log in with the correct role"
          text="Owner can access all dashboards. Managers and customers can access only their own area."
        />
        <Link href="/login" className="button button--gold">Go to Login</Link>
      </section>
    );
  }

  const canManageMenu = role === "owner" || role === "manager";
  const canManageOrders = role === "owner" || role === "manager";
  return (
    <section className="section container">
      <SectionTitle
        eyebrow={`${role} dashboard`}
        title={`Welcome ${user?.name || role}`}
        text="Role-based panels for operations, revenue insights, bookings, feedback, and customer engagement."
      />

      <div className="metrics-grid">
        <div className="metric-card"><span>Total Orders</span><strong>{orders.length}</strong></div>
        <div className="metric-card"><span>Bookings</span><strong>{bookings.length}</strong></div>
        <RevenueCard orders={orders} />
        <div className="metric-card"><span>Reviews</span><strong>{reviews.length}</strong></div>
      </div>

      {canManageOrders && (
        <div className="dashboard-section">
          <h3>Orders</h3>
          <div className="dashboard-list">
            {orders.map((order) => (
              <article key={order.id} className="glass-card dashboard-card">
                <div>
                  <strong>{order.id}</strong>
                  <p>{order.customerName} | Rs.{order.total}</p>
                  <span>{order.address}</span>
                </div>
                <select value={order.status} onChange={(e) => updateOrderStatus(order.id, e.target.value)}>
                  <option>Preparing</option>
                  <option>Out for Delivery</option>
                  <option>Delivered</option>
                  <option>Rejected</option>
                </select>
              </article>
            ))}
          </div>
        </div>
      )}

      {(role === "owner" || role === "manager") && (
        <div className="dashboard-section">
          <h3>Bookings</h3>
          <div className="dashboard-list">
            {bookings.map((booking) => (
              <article key={booking.id} className="glass-card dashboard-card">
                <div>
                  <strong>{booking.name}</strong>
                  <p>{booking.date} | {booking.time} | {booking.guests} guests</p>
                  <span>{booking.request || "No special requests"}</span>
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
      )}

      {canManageMenu && (
        <div className="dashboard-section">
          <h3>Menu Management</h3>
          <form className="menu-admin-form glass-card" onSubmit={(e) => {
            e.preventDefault();
            createMenuItem(newItem);
            setNewItem({ ...newItem, name: "", description: "" });
          }}>
            <input value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} placeholder="Item name" required />
            <input value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} placeholder="Description" required />
            <input type="number" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })} placeholder="Price" />
            <select value={newItem.type} onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}>
              <option>Veg</option>
              <option>Non-Veg</option>
            </select>
            <button className="button button--gold" type="submit">Add Item</button>
          </form>
          <div className="dashboard-list">
            {menuItems.map((item) => (
              <article key={item.id} className="glass-card dashboard-card">
                <div>
                  <strong>{item.name}</strong>
                  <p>Rs.{item.price} | {item.category}</p>
                  <span>{item.available ? "Available" : "Unavailable"}</span>
                </div>
                <div className="dashboard-actions">
                  <button className="button button--small button--outline" onClick={() => updateMenuItem({ ...item, available: !item.available })}>
                    Toggle Availability
                  </button>
                  {role === "owner" && (
                    <button className="button button--small button--danger" onClick={() => deleteMenuItem(item.id)}>
                      Delete
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {role === "owner" && (
        <>
          <div className="dashboard-section">
            <h3>Coupons & Offers</h3>
            <form className="menu-admin-form glass-card" onSubmit={(e) => {
              e.preventDefault();
              addCoupon(couponForm);
              setCouponForm({ code: "", discountPercent: 10, active: true });
            }}>
              <input value={couponForm.code} onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value })} placeholder="Coupon code" required />
              <input type="number" value={couponForm.discountPercent} onChange={(e) => setCouponForm({ ...couponForm, discountPercent: Number(e.target.value) })} />
              <button className="button button--gold" type="submit">Create Coupon</button>
            </form>
            <div className="dashboard-list">
              {coupons.map((coupon) => (
                <article key={coupon.id} className="glass-card dashboard-card">
                  <div>
                    <strong>{coupon.code}</strong>
                    <p>{coupon.discountPercent}% off</p>
                    <span>{coupon.active ? "Active" : "Inactive"}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="dashboard-section">
            <h3>Staff Accounts & Announcements</h3>
            <div className="dashboard-list">
              {accounts.filter((account) => account.role !== "customer").map((account) => (
                <article key={account.id} className="glass-card dashboard-card">
                  <div>
                    <strong>{account.name}</strong>
                    <p>{account.role}</p>
                    <span>{account.email}</span>
                  </div>
                </article>
              ))}
            </div>
            <div className="glass-card">
              <p>Announcement Center</p>
              <p>Promote weekend combos, seasonal desserts, and delivery offers across the site.</p>
            </div>
          </div>
        </>
      )}

      {role === "customer" && (
        <>
          <div className="dashboard-section">
            <h3>Your Orders</h3>
            <div className="dashboard-list">
              {customerOrders.map((order) => (
                <article key={order.id} className="glass-card dashboard-card">
                  <div>
                    <strong>{order.id}</strong>
                    <p>{order.status}</p>
                    <span>Total Rs.{order.total}</span>
                  </div>
                  <Link href="/order" className="button button--small button--gold">Reorder</Link>
                </article>
              ))}
            </div>
          </div>
          <div className="dashboard-section">
            <h3>Loyalty & Notifications</h3>
            <div className="metrics-grid">
              <div className="metric-card">
                <span>Loyalty Points</span>
                <strong>{user?.loyaltyPoints || 0}</strong>
              </div>
            </div>
            <div className="dashboard-list">
              {notifications.map((note) => (
                <article key={note.id} className="glass-card dashboard-card">
                  <div>
                    <strong>{note.message}</strong>
                    <span>{note.time}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </>
      )}

      {(role === "owner" || role === "manager") && (
        <div className="dashboard-section">
          <h3>Customer Feedback</h3>
          <div className="dashboard-list">
            {reviews.map((review) => (
              <article key={review.id} className="glass-card dashboard-card">
                <div>
                  <strong>{review.name}</strong>
                  <p>{review.rating} stars</p>
                  <span>{review.comment}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
