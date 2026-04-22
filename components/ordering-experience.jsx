"use client";

import { useMemo, useState } from "react";
import { useApp } from "@/components/app-provider";
import { SectionTitle } from "@/components/section-title";
import { DishCard } from "@/components/dish-card";

export function OrderingExperience() {
  const { menuItems, cart, updateCartQuantity, placeOrder, savedAddresses, saveAddress, coupons } = useApp();
  const [address, setAddress] = useState(savedAddresses[0] || "");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [couponCode, setCouponCode] = useState("WOK10");
  const [lastOrder, setLastOrder] = useState(null);

  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const coupon = coupons.find(
      (entry) => entry.code.toLowerCase() === couponCode.toLowerCase() && entry.active
    );
    const discount = coupon ? Math.floor((subtotal * coupon.discountPercent) / 100) : 0;
    return { subtotal, discount, total: subtotal - discount };
  }, [cart, couponCode, coupons]);

  const handleCheckout = () => {
    if (!cart.length || !address.trim()) return;
    saveAddress(address);
    const order = placeOrder({ address, paymentMethod, couponCode });
    setLastOrder(order);
  };

  return (
    <section className="section container">
      <SectionTitle
        eyebrow="Online Ordering"
        title="Checkout built for conversion"
        text="Customers can add items, choose payment mode, save addresses, and track orders from the same dashboard."
      />
      <div className="order-layout">
        <div>
          <div className="card-grid">
            {menuItems.slice(0, 8).map((item) => (
              <DishCard key={item.id} item={item} />
            ))}
          </div>
        </div>
        <aside className="checkout-panel glass-card">
          <h3>Your Cart</h3>
          {cart.length ? (
            cart.map((item) => (
              <div key={item.id} className="cart-line">
                <div>
                  <strong>{item.name}</strong>
                  <span>Rs.{item.price}</span>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => updateCartQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateCartQuantity(item.id, 1)}>+</button>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter delivery address"
          />
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option>Cash on Delivery</option>
            <option>UPI</option>
            <option>Card</option>
          </select>
          <input
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Coupon code"
          />
          <div className="totals">
            <p>Subtotal <strong>Rs.{totals.subtotal}</strong></p>
            <p>Discount <strong>Rs.{totals.discount}</strong></p>
            <p>Total <strong>Rs.{totals.total}</strong></p>
          </div>
          <button className="button button--gold" onClick={handleCheckout}>
            Place Order
          </button>
          {lastOrder && (
            <div className="tracking-card">
              <h4>Order Confirmed: {lastOrder.id}</h4>
              <div className="tracking-steps">
                {["Preparing", "Out for Delivery", "Delivered"].map((step) => (
                  <span key={step} className={lastOrder.status === step ? "active" : ""}>
                    {step}
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
