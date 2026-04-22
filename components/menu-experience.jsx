"use client";

import { useMemo, useState } from "react";
import { useApp } from "@/components/app-provider";
import { categories } from "@/lib/data";
import { SectionTitle } from "@/components/section-title";
import { DishCard } from "@/components/dish-card";

export function MenuExperience() {
  const { menuItems } = useApp();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesQuery = `${item.name} ${item.description}`.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, menuItems, query]);

  return (
    <section className="section container">
      <SectionTitle
        eyebrow="Interactive Menu"
        title="Search, filter, and order your favorites"
        text="Browse starters, noodles, soups, combos, desserts, and more with clear badges and price visibility."
      />
      <div className="menu-toolbar">
        <input
          className="search-input"
          placeholder="Search menu..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="filter-row">
          {["All", ...categories].map((entry) => (
            <button
              key={entry}
              className={category === entry ? "filter-pill active" : "filter-pill"}
              onClick={() => setCategory(entry)}
            >
              {entry}
            </button>
          ))}
        </div>
      </div>
      <div className="card-grid">
        {filteredItems.map((item) => (
          <DishCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
