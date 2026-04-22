"use client";

export function DishCard({ item, compact = false }) {
  return (
    <article className="dish-card">
      <div className="dish-card__image" style={{ backgroundImage: `url(${item.image})` }}>
        {item.bestseller && <span className="dish-card__tag">Bestseller</span>}
        {item.recommended && <span className="dish-card__tag dish-card__tag--alt">Recommended</span>}
      </div>
      <div className="dish-card__body">
        <div className="dish-card__topline">
          <h3>{item.name}</h3>
          <span className={`badge ${item.type === "Veg" ? "badge--veg" : "badge--nonveg"}`}>{item.type}</span>
        </div>
        <p>{item.description}</p>
        <div className="dish-card__footer">
          <strong>Rs.{item.price}</strong>
          {!compact && <span className="dish-card__note">Chef favorite</span>}
        </div>
      </div>
    </article>
  );
}
