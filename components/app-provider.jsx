"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  defaultCoupons,
  defaultMenuItems,
  defaultOrders,
  initialAccounts,
  initialBookings,
  initialNotifications,
  loyaltyRules,
  restaurant,
  testimonials,
  translations
} from "@/lib/data";

const AppContext = createContext(null);

const STORAGE_KEYS = {
  theme: "acr-theme",
  language: "acr-language",
  cart: "acr-cart",
  user: "acr-user",
  accounts: "acr-accounts",
  menu: "acr-menu",
  orders: "acr-orders",
  bookings: "acr-bookings",
  reviews: "acr-reviews",
  coupons: "acr-coupons",
  notifications: "acr-notifications",
  addresses: "acr-addresses"
};

function readStorage(key, fallback) {
  if (typeof window === "undefined") return fallback;
  const value = window.localStorage.getItem(key);
  return value ? JSON.parse(value) : fallback;
}

function writeStorage(key, value) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function AppProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("en");
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState(initialAccounts);
  const [menuItems, setMenuItems] = useState(defaultMenuItems);
  const [orders, setOrders] = useState(defaultOrders);
  const [bookings, setBookings] = useState(initialBookings);
  const [reviews, setReviews] = useState(testimonials);
  const [coupons, setCoupons] = useState(defaultCoupons);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [savedAddresses, setSavedAddresses] = useState([]);

  useEffect(() => {
    setTheme(readStorage(STORAGE_KEYS.theme, "dark"));
    setLanguage(readStorage(STORAGE_KEYS.language, "en"));
    setCart(readStorage(STORAGE_KEYS.cart, []));
    setUser(readStorage(STORAGE_KEYS.user, null));
    setAccounts(readStorage(STORAGE_KEYS.accounts, initialAccounts));
    setMenuItems(readStorage(STORAGE_KEYS.menu, defaultMenuItems));
    setOrders(readStorage(STORAGE_KEYS.orders, defaultOrders));
    setBookings(readStorage(STORAGE_KEYS.bookings, initialBookings));
    setReviews(readStorage(STORAGE_KEYS.reviews, testimonials));
    setCoupons(readStorage(STORAGE_KEYS.coupons, defaultCoupons));
    setNotifications(readStorage(STORAGE_KEYS.notifications, initialNotifications));
    setSavedAddresses(readStorage(STORAGE_KEYS.addresses, []));
  }, []);

  useEffect(() => {
    document.body.dataset.theme = theme;
    writeStorage(STORAGE_KEYS.theme, theme);
  }, [theme]);

  useEffect(() => writeStorage(STORAGE_KEYS.language, language), [language]);
  useEffect(() => writeStorage(STORAGE_KEYS.cart, cart), [cart]);
  useEffect(() => writeStorage(STORAGE_KEYS.user, user), [user]);
  useEffect(() => writeStorage(STORAGE_KEYS.accounts, accounts), [accounts]);
  useEffect(() => writeStorage(STORAGE_KEYS.menu, menuItems), [menuItems]);
  useEffect(() => writeStorage(STORAGE_KEYS.orders, orders), [orders]);
  useEffect(() => writeStorage(STORAGE_KEYS.bookings, bookings), [bookings]);
  useEffect(() => writeStorage(STORAGE_KEYS.reviews, reviews), [reviews]);
  useEffect(() => writeStorage(STORAGE_KEYS.coupons, coupons), [coupons]);
  useEffect(() => writeStorage(STORAGE_KEYS.notifications, notifications), [notifications]);
  useEffect(() => writeStorage(STORAGE_KEYS.addresses, savedAddresses), [savedAddresses]);

  const t = (key) => translations[language]?.[key] || translations.en[key] || key;

  const addToCart = (item) => {
    setCart((current) => {
      const existing = current.find((entry) => entry.id === item.id);
      if (existing) {
        return current.map((entry) =>
          entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry
        );
      }
      return [...current, { ...item, quantity: 1 }];
    });
  };

  const updateCartQuantity = (itemId, amount) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === itemId ? { ...item, quantity: Math.max(item.quantity + amount, 0) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const placeOrder = ({ address, paymentMethod, couponCode }) => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const matchedCoupon = coupons.find(
      (coupon) => coupon.code.toLowerCase() === couponCode.toLowerCase() && coupon.active
    );
    const discount = matchedCoupon ? Math.floor((subtotal * matchedCoupon.discountPercent) / 100) : 0;
    const total = subtotal - discount;
    const pointsEarned = Math.floor(total / loyaltyRules.pointsPerRupee);
    const newOrder = {
      id: `ORD-${Date.now()}`,
      customerName: user?.name || "Guest",
      customerId: user?.id || "guest",
      items: cart,
      subtotal,
      discount,
      total,
      status: "Preparing",
      paymentMethod,
      address,
      createdAt: new Date().toLocaleString(),
      couponCode,
      pointsEarned
    };
    setOrders((current) => [newOrder, ...current]);
    if (user) {
      setAccounts((current) =>
        current.map((account) =>
          account.id === user.id
            ? { ...account, loyaltyPoints: (account.loyaltyPoints || 0) + pointsEarned }
            : account
        )
      );
      setUser((current) =>
        current ? { ...current, loyaltyPoints: (current.loyaltyPoints || 0) + pointsEarned } : current
      );
    }
    setNotifications((current) => [
      {
        id: `note-${Date.now()}`,
        message: `New order placed: ${newOrder.id}`,
        time: "Just now"
      },
      ...current
    ]);
    setCart([]);
    return newOrder;
  };

  const createBooking = (booking) => {
    const entry = {
      id: `BK-${Date.now()}`,
      ...booking,
      status: "Confirmed"
    };
    setBookings((current) => [entry, ...current]);
    return entry;
  };

  const addReview = (review) => {
    const entry = {
      id: `RV-${Date.now()}`,
      ...review
    };
    setReviews((current) => [entry, ...current]);
  };

  const signup = ({ name, phone, email, password }) => {
    const account = {
      id: `USR-${Date.now()}`,
      name,
      phone,
      email,
      password,
      role: "customer",
      loyaltyPoints: 0
    };
    setAccounts((current) => [...current, account]);
    setUser(account);
    return account;
  };

  const login = ({ email, password, role }) => {
    const match = accounts.find(
      (account) =>
        account.email.toLowerCase() === email.toLowerCase() &&
        account.password === password &&
        account.role === role
    );
    if (!match) return null;
    setUser(match);
    return match;
  };

  const logout = () => setUser(null);

  const saveAddress = (address) => {
    if (!address) return;
    setSavedAddresses((current) => Array.from(new Set([address, ...current])));
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders((current) => current.map((order) => (order.id === orderId ? { ...order, status } : order)));
  };

  const updateBookingStatus = (bookingId, status) => {
    setBookings((current) =>
      current.map((booking) => (booking.id === bookingId ? { ...booking, status } : booking))
    );
  };

  const updateMenuItem = (nextItem) => {
    setMenuItems((current) => current.map((item) => (item.id === nextItem.id ? nextItem : item)));
  };

  const createMenuItem = (item) => {
    const nextItem = { ...item, id: `MENU-${Date.now()}` };
    setMenuItems((current) => [nextItem, ...current]);
  };

  const deleteMenuItem = (itemId) => {
    setMenuItems((current) => current.filter((item) => item.id !== itemId));
  };

  const addCoupon = (coupon) => {
    setCoupons((current) => [{ ...coupon, id: `CP-${Date.now()}` }, ...current]);
  };

  const contextValue = useMemo(
    () => ({
      restaurant,
      t,
      theme,
      setTheme,
      language,
      setLanguage,
      cart,
      addToCart,
      updateCartQuantity,
      placeOrder,
      user,
      signup,
      login,
      logout,
      menuItems,
      createMenuItem,
      updateMenuItem,
      deleteMenuItem,
      orders,
      updateOrderStatus,
      bookings,
      createBooking,
      updateBookingStatus,
      reviews,
      addReview,
      coupons,
      addCoupon,
      notifications,
      savedAddresses,
      saveAddress,
      accounts
    }),
    [
      language,
      theme,
      cart,
      user,
      menuItems,
      orders,
      bookings,
      reviews,
      coupons,
      notifications,
      savedAddresses,
      accounts
    ]
  );

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
