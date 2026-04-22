import { restaurant } from "@/lib/data";

export function FloatingActions() {
  return (
    <div className="floating-actions">
      <a href={`tel:${restaurant.phone}`} className="floating-actions__button">
        Call Now
      </a>
      <a href="https://wa.me/917718069555?text=Hi%20I%20want%20to%20order%20food" className="floating-actions__button floating-actions__button--whatsapp" target="_blank">
        WhatsApp
      </a>
    </div>
  );
}
