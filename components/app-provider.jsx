"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  adminCredentials,
  defaultMenuItems,
  initialBookings,
  instagramShots,
  restaurant,
  translations
} from "@/lib/data";

const AppContext = createContext(null);

const STORAGE_KEYS = {
  theme: "acr-theme",
  language: "acr-language",
  mode: "acr-mode",
  adminAuth: "acr-admin-auth",
  restaurant: "acr-restaurant",
  menu: "acr-menu",
  bookings: "acr-bookings",
  gallery: "acr-gallery"
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
  const [siteMode, setSiteMode] = useState(null);
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [restaurantInfo, setRestaurantInfo] = useState(restaurant);
  const [menuItems, setMenuItems] = useState(defaultMenuItems);
  const [bookings, setBookings] = useState(initialBookings);
  const [galleryShots, setGalleryShots] = useState(instagramShots);

  useEffect(() => {
    setTheme(readStorage(STORAGE_KEYS.theme, "dark"));
    setLanguage(readStorage(STORAGE_KEYS.language, "en"));
    setSiteMode(readStorage(STORAGE_KEYS.mode, null));
    setAdminAuthenticated(readStorage(STORAGE_KEYS.adminAuth, false));
    setRestaurantInfo(readStorage(STORAGE_KEYS.restaurant, restaurant));
    setMenuItems(readStorage(STORAGE_KEYS.menu, defaultMenuItems));
    setBookings(readStorage(STORAGE_KEYS.bookings, initialBookings));
    setGalleryShots(readStorage(STORAGE_KEYS.gallery, instagramShots));
  }, []);

  useEffect(() => {
    document.body.dataset.theme = theme;
    writeStorage(STORAGE_KEYS.theme, theme);
  }, [theme]);

  useEffect(() => writeStorage(STORAGE_KEYS.language, language), [language]);
  useEffect(() => writeStorage(STORAGE_KEYS.mode, siteMode), [siteMode]);
  useEffect(() => writeStorage(STORAGE_KEYS.adminAuth, adminAuthenticated), [adminAuthenticated]);
  useEffect(() => writeStorage(STORAGE_KEYS.restaurant, restaurantInfo), [restaurantInfo]);
  useEffect(() => writeStorage(STORAGE_KEYS.menu, menuItems), [menuItems]);
  useEffect(() => writeStorage(STORAGE_KEYS.bookings, bookings), [bookings]);
  useEffect(() => writeStorage(STORAGE_KEYS.gallery, galleryShots), [galleryShots]);

  const t = (key) => translations[language]?.[key] || translations.en[key] || key;

  const chooseMode = (mode) => {
    setSiteMode(mode);
    if (mode !== "admin") {
      setAdminAuthenticated(false);
    }
  };

  const adminLogin = ({ id, password }) => {
    const isValid = id === adminCredentials.id && password === adminCredentials.password;
    setAdminAuthenticated(isValid);
    if (isValid) {
      setSiteMode("admin");
    }
    return isValid;
  };

  const adminLogout = () => {
    setAdminAuthenticated(false);
    setSiteMode(null);
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

  const updateBookingStatus = (bookingId, status) => {
    setBookings((current) =>
      current.map((booking) => (booking.id === bookingId ? { ...booking, status } : booking))
    );
  };

  const updateRestaurantField = (field, value) => {
    setRestaurantInfo((current) => ({ ...current, [field]: value }));
  };

  const updateMenuItem = (itemId, field, value) => {
    setMenuItems((current) =>
      current.map((item) => (item.id === itemId ? { ...item, [field]: value } : item))
    );
  };

  const updateGalleryShot = (shotId, field, value) => {
    setGalleryShots((current) =>
      current.map((shot) => (shot.id === shotId ? { ...shot, [field]: value } : shot))
    );
  };

  const contextValue = useMemo(
    () => ({
      t,
      theme,
      setTheme,
      language,
      setLanguage,
      siteMode,
      chooseMode,
      adminAuthenticated,
      adminLogin,
      adminLogout,
      restaurant: restaurantInfo,
      updateRestaurantField,
      menuItems,
      updateMenuItem,
      bookings,
      createBooking,
      updateBookingStatus,
      galleryShots,
      updateGalleryShot
    }),
    [theme, language, siteMode, adminAuthenticated, restaurantInfo, menuItems, bookings, galleryShots]
  );

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
